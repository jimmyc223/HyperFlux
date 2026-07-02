import { getAllProducts } from "@/lib/products";
import ShopClient from "./shop-client";

// Catalog is read from Firestore per request (no DB creds at build time).
export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const all = await getAllProducts();
  const products = all.filter((p) => p.category === "batteries");
  const accessories = all.filter((p) => p.category === "accessories");

  return <ShopClient products={products} accessories={accessories} />;
}
