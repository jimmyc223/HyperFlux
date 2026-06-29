"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { FadeImage } from "@/components/fade-image";
import { useState } from "react";

const products = [
  {
    id: "4s-black-series",
    name: "4S Black Series",
    tagline: "5000mAh Li-Ion Pack",
    description:
      "Nominal 14.4V with 70A continuous and 250A burst discharge. Engineered for 4S FPV, robotics, and high-drain builds that demand sustained current without voltage sag.",
    price: "$89",
    image: "https://images.unsplash.com/photo-1662793962594-8842ff287640?q=80&w=1200",
    badge: "Bestseller",
    features: ["70A Continuous", "250A Burst", "14.4V Nominal", "72Wh"],
    category: "batteries",
  },
  {
    id: "6s-black-series",
    name: "6S Black Series",
    tagline: "5000mAh Li-Ion Pack",
    description:
      "Nominal 21.6V for maximum energy density where peak power is non-negotiable. The same 70A continuous / 250A burst output, tuned for demanding 6S platforms.",
    price: "$119",
    image: "https://images.unsplash.com/photo-1774553988130-ccda57774818?q=80&w=1200",
    badge: "Max Power",
    features: ["70A Continuous", "250A Burst", "21.6V Nominal", "108Wh"],
    category: "batteries",
  },
];

const accessories = [
  {
    id: 1,
    name: "Battery Strap",
    description: "Heavy-duty 25mm velcro strap for a secure, vibration-resistant pack mount. 250mm, 2-pack.",
    price: "$12",
    image: "https://images.unsplash.com/photo-1701120286678-7cb81e752725?q=80&w=1200",
  },
];

type Filter = "all" | "batteries" | "accessories";

export default function ShopPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const showProducts = filter === "all" || filter === "batteries";
  const showAccessories = filter === "all" || filter === "accessories";

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-foreground pt-36 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-5">
            The Range
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-none">
            Power Built
            <br />
            for the Build.
          </h1>
          <p className="mt-6 text-base text-white/50 max-w-sm leading-relaxed">
            High-power lithium-ion packs engineered for FPV, robotics, and
            high-drain applications. Made in New Zealand.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="px-6 md:px-12 lg:px-20 py-4 flex items-center gap-2">
          {(["all", "batteries", "accessories"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all capitalize ${
                filter === f
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All Products" : f === "batteries" ? "Batteries" : "Accessories"}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      {showProducts && (
        <section className="px-6 pt-16 pb-8 md:px-12 lg:px-20">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-10">
            Black Series
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {products.map((product) => (
              <div key={product.id} id={product.id} className="group">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
                  <FadeImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-background text-foreground text-xs px-3 py-1 rounded-full font-medium">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="pt-6 pb-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                        {product.tagline}
                      </p>
                      <h2 className="text-2xl font-medium text-foreground">
                        {product.name}
                      </h2>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
                        {product.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.features.map((f) => (
                          <span
                            key={f}
                            className="text-xs border border-border rounded-full px-3 py-1 text-muted-foreground"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-2xl font-medium text-foreground shrink-0">
                      {product.price}
                    </span>
                  </div>
                  <button className="mt-6 w-full bg-foreground text-background text-sm font-medium py-3 rounded-full hover:opacity-80 transition-opacity">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Accessories */}
      {showAccessories && (
        <section id="accessories" className="px-6 pt-16 pb-24 md:px-12 lg:px-20">
          {showProducts && (
            <div className="border-t border-border mb-16" />
          )}
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-10">
            Essential Accessories
          </p>

          {/* Mobile: carousel */}
          <div className="flex gap-6 overflow-x-auto pb-4 md:hidden snap-x snap-mandatory">
            {accessories.map((item) => (
              <div key={item.id} className="group flex-shrink-0 w-[75vw] snap-center">
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                  <FadeImage
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105"
                  />
                </div>
                <div className="py-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-medium text-foreground leading-snug">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-base font-medium text-foreground shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <button className="mt-4 w-full border border-border text-foreground text-sm font-medium py-2.5 rounded-full hover:bg-foreground hover:text-background transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {accessories.map((item) => (
              <div key={item.id} className="group">
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                  <FadeImage
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105"
                  />
                </div>
                <div className="py-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-medium text-foreground leading-snug">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-xl font-medium text-foreground shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <button className="mt-4 w-full border border-border text-foreground text-sm font-medium py-2.5 rounded-full hover:bg-foreground hover:text-background transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <FooterSection />
    </main>
  );
}
