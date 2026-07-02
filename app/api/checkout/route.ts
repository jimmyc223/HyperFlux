import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import type Stripe from "stripe";

import { getStripe } from "@/lib/stripe";
import { getProductsByIds } from "@/lib/products";

const bodySchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive().max(99),
      }),
    )
    .min(1),
});

const FREE_SHIPPING_THRESHOLD_CENTS = 5000; // free standard shipping over $50
const STANDARD_SHIPPING_CENTS = 799;
const EXPRESS_SHIPPING_CENTS = 1299;

export async function POST(req: NextRequest) {
  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Resolve authoritative product data from Firestore — never trust prices or
  // names sent by the client.
  const ids = parsed.items.map((i) => i.productId);
  const products = await getProductsByIds(ids);
  const byId = new Map(products.map((p) => [p.id, p]));

  const origin = req.headers.get("origin") ?? req.nextUrl.origin;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let subtotalCents = 0;
  const orderItems: { id: string; qty: number }[] = [];

  for (const item of parsed.items) {
    const product = byId.get(item.productId);
    if (!product || !product.active) {
      return NextResponse.json(
        { error: `Product no longer available: ${item.productId}` },
        { status: 400 },
      );
    }
    if (product.stock < item.quantity) {
      return NextResponse.json(
        { error: `Not enough stock for ${product.name}.` },
        { status: 409 },
      );
    }

    subtotalCents += product.priceCents * item.quantity;
    orderItems.push({ id: product.id, qty: item.quantity });

    lineItems.push({
      quantity: item.quantity,
      price_data: {
        currency: product.currency || "nzd",
        unit_amount: product.priceCents,
        product_data: {
          name: product.name,
          images: product.image ? [`${origin}${product.image}`] : undefined,
          metadata: { productId: product.id },
        },
      },
    });
  }

  const standardShippingCents =
    subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : STANDARD_SHIPPING_CENTS;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ["NZ"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: standardShippingCents, currency: "nzd" },
            display_name:
              standardShippingCents === 0
                ? "Standard Shipping (Free)"
                : "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: EXPRESS_SHIPPING_CENTS, currency: "nzd" },
            display_name: "Express Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 2 },
            },
          },
        },
      ],
      // Compact record of what was bought, so the webhook can create the order
      // and decrement stock without re-deriving line items.
      metadata: { items: JSON.stringify(orderItems) },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session creation failed:", err);
    return NextResponse.json(
      { error: "Could not start checkout." },
      { status: 500 },
    );
  }
}
