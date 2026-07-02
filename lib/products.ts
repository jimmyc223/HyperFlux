import "server-only";

import { cache } from "react";

import { db } from "./firebase-admin";
import type { Product } from "./types";

/**
 * Firestore read layer for the product catalog. All reads happen server-side
 * via the Admin SDK; pages call these from Server Components and pass plain
 * data down to client components.
 */

function toProduct(id: string, data: FirebaseFirestore.DocumentData): Product {
  return {
    id,
    category: data.category,
    priceCents: data.priceCents,
    currency: data.currency ?? "nzd",
    image: data.image,
    stock: data.stock ?? 0,
    active: data.active ?? true,
    sortOrder: data.sortOrder ?? 0,
    name: data.name,
    tagline: data.tagline ?? null,
    description: data.description ?? "",
    badge: data.badge ?? null,
    features: data.features ?? [],
    homeSeries: data.homeSeries ?? "",
    homeName: data.homeName ?? "",
    homeDescription: data.homeDescription ?? "",
    specs: data.specs ?? [],
    discharge: data.discharge ?? null,
  };
}

/**
 * All active products, ordered for display. Wrapped in React.cache so multiple
 * Server Components in one render pass share a single Firestore query.
 */
export const getAllProducts = cache(async (): Promise<Product[]> => {
  const snap = await db
    .collection("products")
    .where("active", "==", true)
    .orderBy("sortOrder")
    .get();
  return snap.docs.map((doc) => toProduct(doc.id, doc.data()));
});

export async function getProductById(id: string): Promise<Product | null> {
  const doc = await db.collection("products").doc(id).get();
  return doc.exists ? toProduct(doc.id, doc.data()!) : null;
}

/** Resolve a set of ids to products, preserving Firestore's stored fields. */
export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const refs = ids.map((id) => db.collection("products").doc(id));
  const snaps = await db.getAll(...refs);
  return snaps
    .filter((s) => s.exists)
    .map((s) => toProduct(s.id, s.data()!));
}
