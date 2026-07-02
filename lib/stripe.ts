import "server-only";

import Stripe from "stripe";

/**
 * Lazily-constructed Stripe client. Building the client is deferred until first
 * use (inside a request handler) so that importing this module during
 * `next build` — when STRIPE_SECRET_KEY may be absent — does not throw.
 */
let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (client) return client;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  client = new Stripe(key);
  return client;
}
