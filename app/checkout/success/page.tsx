import Link from "next/link";
import type Stripe from "stripe";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ClearCartOnMount } from "@/components/cart/clear-cart-on-mount";
import { getStripe } from "@/lib/stripe";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let session: Stripe.Checkout.Session | null = null;
  if (session_id) {
    try {
      session = await getStripe().checkout.sessions.retrieve(session_id, {
        expand: ["line_items"],
      });
    } catch {
      session = null;
    }
  }

  const paid = session?.payment_status === "paid";
  const email = session?.customer_details?.email ?? null;
  const lineItems = session?.line_items?.data ?? [];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      {paid && <ClearCartOnMount />}

      <section className="px-6 pt-40 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-xl text-center">
          {paid ? (
            <>
              <p className="text-xs uppercase tracking-widest text-primary mb-4">
                Order Confirmed
              </p>
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground">
                Thank you for your order.
              </h1>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                We&apos;ve received your payment and a confirmation
                {email ? ` has been sent to ${email}` : " email is on its way"}.
                Your Hyperflux gear is being prepared for dispatch.
              </p>

              {lineItems.length > 0 && (
                <div className="mt-10 rounded-2xl border border-border p-6 text-left">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    Order Summary
                  </p>
                  <ul className="space-y-3">
                    {lineItems.map((li) => (
                      <li
                        key={li.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-foreground">
                          {li.description}
                          <span className="text-muted-foreground">
                            {" "}
                            × {li.quantity}
                          </span>
                        </span>
                        <span className="text-foreground">
                          {formatPrice(li.amount_total, li.currency ?? "nzd")}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {typeof session?.amount_total === "number" && (
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm font-medium">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">
                        {formatPrice(
                          session.amount_total,
                          session.currency ?? "nzd",
                        )}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground">
                We couldn&apos;t confirm this order.
              </h1>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                If you completed payment, your confirmation email is the source
                of truth — please check your inbox. Otherwise your cart is still
                saved.
              </p>
            </>
          )}

          <Link
            href="/shop"
            className="mt-10 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Continue Shopping
          </Link>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
