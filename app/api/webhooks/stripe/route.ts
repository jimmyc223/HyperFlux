import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";

import { getStripe } from "@/lib/stripe";
import { recordCompletedCheckout } from "@/lib/orders";

// firebase-admin needs the Node.js runtime (not Edge).
export const runtime = "nodejs";
// Never cache; always process the live event.
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return new NextResponse("Missing webhook signature or secret", {
      status: 400,
    });
  }

  // Signature verification requires the raw, unparsed request body.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Reconstruct purchased items from the metadata we set at checkout.
    let items: { productId: string; quantity: number }[] = [];
    try {
      const parsed = JSON.parse(session.metadata?.items ?? "[]") as {
        id: string;
        qty: number;
      }[];
      items = parsed.map((i) => ({ productId: i.id, quantity: i.qty }));
    } catch {
      items = [];
    }

    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent?.id ?? null);

    // Shipping address if collected, else fall back to the entered address.
    const shipping =
      (session.collected_information as { shipping_details?: { address?: unknown } } | null)
        ?.shipping_details?.address ??
      session.customer_details?.address ??
      null;

    try {
      await recordCompletedCheckout({
        eventId: event.id,
        sessionId: session.id,
        paymentIntentId,
        email: session.customer_details?.email ?? null,
        customerName: session.customer_details?.name ?? null,
        shippingAddress: (shipping as Record<string, unknown>) ?? null,
        amountTotalCents: session.amount_total ?? 0,
        currency: session.currency ?? "nzd",
        items,
      });
    } catch (err) {
      // Return 500 so Stripe retries; the handler is idempotent.
      console.error("Failed to record order:", err);
      return new NextResponse("Failed to record order", { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
