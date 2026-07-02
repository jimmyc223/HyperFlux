/**
 * Seed the Firestore `products` collection with the canonical Hyperflux catalog.
 *
 * Run with:  pnpm seed
 * (which is `tsx --env-file=.env.local scripts/seed.ts`)
 *
 * Requires FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY in
 * .env.local (a service-account key downloaded from the Firebase console), OR a
 * running Firestore emulator with FIRESTORE_EMULATOR_HOST set.
 *
 * This is idempotent: it upserts by document id (set + merge), so re-running it
 * refreshes copy/price without creating duplicates. It intentionally does NOT
 * overwrite `stock` on an existing doc, so real inventory counts entered later
 * in the Firebase console survive a re-seed.
 */
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import type { Product } from "../lib/types";

const usingEmulator = !!process.env.FIRESTORE_EMULATOR_HOST;
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!usingEmulator && (!projectId || !clientEmail || !privateKey)) {
  console.error(
    "\n✗ Missing Firebase credentials.\n" +
      "  Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY\n" +
      "  in .env.local (from your service-account key), or start the Firestore\n" +
      "  emulator and set FIRESTORE_EMULATOR_HOST.\n",
  );
  process.exit(1);
}

if (!getApps().length) {
  initializeApp(
    usingEmulator
      ? { projectId: projectId ?? "demo-hyperflux" }
      : { credential: cert({ projectId, clientEmail, privateKey }) },
  );
}

const db = getFirestore();

// The 4 canonical SKUs. Copy/specs/discharge/images are lifted verbatim from the
// current app/shop/page.tsx and components/sections/collection-section.tsx so the
// rendered pages stay pixel-identical after switching to the DB source.
const products: Product[] = [
  {
    id: "4s-black-series",
    category: "batteries",
    priceCents: 8900,
    currency: "nzd",
    image: "/images/hyperflux-6s-pack.png",
    stock: 100,
    active: true,
    sortOrder: 0,
    name: "4S Black Series",
    tagline: "5000mAh Li-Ion Pack",
    description:
      "Nominal 14.4V with 70A continuous and 250A burst discharge. Engineered for 4S FPV, robotics, and high-drain builds that demand sustained current without voltage sag.",
    badge: "Bestseller",
    features: ["70A Continuous", "250A Burst", "14.4V Nominal", "72Wh"],
    homeSeries: "4S · Black Series",
    homeName: "5000mAh Li-Ion Pack",
    homeDescription:
      "Nominal 14.4V. Engineered for 4S applications demanding sustained high-current output.",
    specs: [
      { label: "Capacity", value: "5000mAh" },
      { label: "Nominal", value: "14.4V" },
      { label: "Max", value: "16.8V" },
      { label: "Energy", value: "72Wh" },
    ],
    discharge: { continuous: "70A", burst: "250A" },
  },
  {
    id: "6s-black-series",
    category: "batteries",
    priceCents: 11900,
    currency: "nzd",
    image: "/images/hyperflux-6s-pack.png",
    stock: 100,
    active: true,
    sortOrder: 1,
    name: "6S Black Series",
    tagline: "5000mAh Li-Ion Pack",
    description:
      "Nominal 21.6V for maximum energy density where peak power is non-negotiable. The same 70A continuous / 250A burst output, tuned for demanding 6S platforms.",
    badge: "Max Power",
    features: ["70A Continuous", "250A Burst", "21.6V Nominal", "108Wh"],
    homeSeries: "6S · Black Series",
    homeName: "5000mAh Li-Ion Pack",
    homeDescription:
      "Nominal 21.6V. Maximum energy density for 6S builds where peak power is non-negotiable.",
    specs: [
      { label: "Capacity", value: "5000mAh" },
      { label: "Nominal", value: "21.6V" },
      { label: "Max", value: "25.2V" },
      { label: "Energy", value: "108Wh" },
    ],
    discharge: { continuous: "70A", burst: "250A" },
  },
  {
    id: "iflight-strap-150mm",
    category: "accessories",
    priceCents: 900,
    currency: "nzd",
    image: "/images/iflight-battery-strap.webp",
    stock: 100,
    active: true,
    sortOrder: 2,
    name: "150mm iFlight Battery Strap",
    tagline: null,
    description:
      "Microfiber PU leather strap, 15mm wide, with an iron buckle for a secure, non-slip pack mount on compact frames. 5-pack.",
    badge: null,
    features: [],
    homeSeries: "Accessory",
    homeName: "150mm iFlight Battery Strap",
    homeDescription:
      "Microfiber PU leather strap with an iron buckle for a secure, non-slip pack mount on compact frames.",
    specs: [
      { label: "Width", value: "15mm" },
      { label: "Length", value: "150mm" },
      { label: "Material", value: "PU Leather" },
      { label: "Pack", value: "5x" },
    ],
    discharge: null,
  },
  {
    id: "iflight-strap-250mm",
    category: "accessories",
    priceCents: 1100,
    currency: "nzd",
    image: "/images/iflight-battery-strap.webp",
    stock: 100,
    active: true,
    sortOrder: 3,
    name: "250mm iFlight Battery Strap",
    tagline: null,
    description:
      "Microfiber PU leather strap, 15mm wide, with an iron buckle for a secure, non-slip pack mount on larger frames. 5-pack.",
    badge: null,
    features: [],
    homeSeries: "Accessory",
    homeName: "250mm iFlight Battery Strap",
    homeDescription:
      "Microfiber PU leather strap with an iron buckle for a secure, non-slip pack mount on larger frames.",
    specs: [
      { label: "Width", value: "15mm" },
      { label: "Length", value: "250mm" },
      { label: "Material", value: "PU Leather" },
      { label: "Pack", value: "5x" },
    ],
    discharge: null,
  },
];

async function seed() {
  console.log(`Seeding ${products.length} products…`);
  for (const product of products) {
    const { stock, ...rest } = product;
    const ref = db.collection("products").doc(product.id);
    const snap = await ref.get();
    // Preserve an existing stock value; only set the placeholder on first create.
    const data = snap.exists ? rest : { ...rest, stock };
    await ref.set(data, { merge: true });
    console.log(`  ✓ ${product.id}`);
  }
  console.log("Done.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
