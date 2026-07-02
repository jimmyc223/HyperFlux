import "server-only";

import { FieldValue } from "firebase-admin/firestore";

import { db } from "./firebase-admin";
import type { Order, OrderStatus } from "./types";

interface RecordCheckoutParams {
  eventId: string;
  sessionId: string;
  paymentIntentId: string | null;
  email: string | null;
  customerName: string | null;
  shippingAddress: Record<string, unknown> | null;
  amountTotalCents: number;
  currency: string;
  items: { productId: string; quantity: number }[];
}

/**
 * Idempotently record a completed checkout: create the order document (keyed by
 * the Stripe session id), snapshot the purchased items, and decrement stock —
 * all in one transaction. If the Stripe event has already been processed (it can
 * be redelivered), this is a no-op.
 */
export async function recordCompletedCheckout(
  params: RecordCheckoutParams,
): Promise<void> {
  const eventRef = db.collection("processedStripeEvents").doc(params.eventId);
  const orderRef = db.collection("orders").doc(params.sessionId);
  const productRefs = params.items.map((i) =>
    db.collection("products").doc(i.productId),
  );

  await db.runTransaction(async (tx) => {
    // --- All reads first (Firestore transaction requirement) ---
    const eventSnap = await tx.get(eventRef);
    if (eventSnap.exists) return; // already handled

    const productSnaps = productRefs.length
      ? await tx.getAll(...productRefs)
      : [];
    const productMap = new Map(productSnaps.map((s) => [s.id, s]));

    // --- Writes ---
    const orderItems = params.items.map((i) => {
      const data = productMap.get(i.productId)?.data();
      return {
        productId: i.productId,
        productName: data?.name ?? i.productId,
        priceCents: data?.priceCents ?? 0,
        quantity: i.quantity,
      };
    });

    tx.set(orderRef, {
      stripePaymentIntentId: params.paymentIntentId,
      email: params.email,
      customerName: params.customerName,
      shippingAddress: params.shippingAddress,
      amountTotalCents: params.amountTotalCents,
      currency: params.currency,
      status: "PAID" satisfies OrderStatus,
      items: orderItems,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    for (const i of params.items) {
      const snap = productMap.get(i.productId);
      if (snap?.exists) {
        tx.update(snap.ref, { stock: FieldValue.increment(-i.quantity) });
      }
    }

    tx.set(eventRef, { createdAt: FieldValue.serverTimestamp() });
  });
}

function toIso(value: unknown): string {
  // Firestore Timestamp has a toDate(); guard for safety.
  const ts = value as { toDate?: () => Date } | undefined;
  return ts?.toDate ? ts.toDate().toISOString() : "";
}

/** All orders, newest first — for the admin view. */
export async function listOrders(): Promise<Order[]> {
  const snap = await db
    .collection("orders")
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      stripePaymentIntentId: data.stripePaymentIntentId ?? null,
      email: data.email ?? null,
      customerName: data.customerName ?? null,
      shippingAddress: data.shippingAddress ?? null,
      amountTotalCents: data.amountTotalCents ?? 0,
      currency: data.currency ?? "nzd",
      status: (data.status ?? "PENDING") as OrderStatus,
      items: data.items ?? [],
      createdAt: toIso(data.createdAt),
      updatedAt: toIso(data.updatedAt),
    };
  });
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<void> {
  await db.collection("orders").doc(orderId).update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
  });
}
