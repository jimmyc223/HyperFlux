/**
 * Unified product model — the single source of truth backing the shop page,
 * the home-page collection grid, the cart, and checkout.
 *
 * The shop page and the home collection historically displayed the same SKU
 * with *different* label structures (the shop uses name/tagline/badge/features;
 * the home grid uses series/homeName/specs/discharge). To keep both pages
 * pixel-identical after consolidation, the document carries the superset of
 * both presentations. Prices are integer cents.
 */

export type ProductCategory = "batteries" | "accessories";

export interface Spec {
  label: string;
  value: string;
}

export interface Discharge {
  continuous: string;
  burst: string;
}

export interface Product {
  id: string; // canonical slug, e.g. "4s-black-series"
  category: ProductCategory;
  priceCents: number;
  currency: string; // "nzd"
  image: string;
  stock: number;
  active: boolean;
  sortOrder: number;

  // Shop-page presentation
  name: string; // e.g. "4S Black Series" / "150mm iFlight Battery Strap"
  tagline: string | null; // e.g. "5000mAh Li-Ion Pack" (null for accessories)
  description: string; // shop-page long description
  badge: string | null; // e.g. "Bestseller" / "Max Power" (null for accessories)
  features: string[]; // shop-page spec pills (empty for accessories)

  // Home collection-grid presentation
  homeSeries: string; // e.g. "4S · Black Series" / "Accessory"
  homeName: string; // e.g. "5000mAh Li-Ion Pack" / "150mm iFlight Battery Strap"
  homeDescription: string; // shorter home-grid description
  specs: Spec[]; // home-grid spec table
  discharge: Discharge | null; // home-grid discharge badges (null for accessories)
}

export type OrderStatus = "PENDING" | "PAID" | "FULFILLED" | "CANCELLED";

export interface OrderItem {
  productId: string;
  productName: string;
  priceCents: number;
  quantity: number;
}

export interface Order {
  id: string; // = Stripe checkout session id
  stripePaymentIntentId: string | null;
  email: string | null;
  customerName: string | null;
  shippingAddress: Record<string, unknown> | null;
  amountTotalCents: number;
  currency: string;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string; // ISO string (serialised for client components)
  updatedAt: string;
}

/** The minimal shape the cart persists in localStorage. */
export interface CartLine {
  productId: string;
  quantity: number;
  // Display snapshot so the drawer can render without a DB round-trip.
  name: string;
  priceCents: number;
  image: string;
}
