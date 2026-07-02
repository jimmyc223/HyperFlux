"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { FadeImage } from "@/components/fade-image";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { useState } from "react";

type Filter = "all" | "batteries" | "accessories";

export default function ShopClient({
  products,
  accessories,
}: {
  products: Product[];
  accessories: Product[];
}) {
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
                {/* Image — white studio card to suit the product-on-white photography */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white">
                  <FadeImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 group-hover:scale-105"
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
                      {formatPrice(product.priceCents, product.currency)}
                    </span>
                  </div>
                  <AddToCartButton
                    productId={product.id}
                    name={product.name}
                    priceCents={product.priceCents}
                    image={product.image}
                    className="mt-6 w-full bg-foreground text-background text-sm font-medium py-3 rounded-full hover:opacity-80 transition-opacity"
                  />
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
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-white">
                  <FadeImage
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-8 group-hover:scale-105"
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
                      {formatPrice(item.priceCents, item.currency)}
                    </span>
                  </div>
                  <AddToCartButton
                    productId={item.id}
                    name={item.name}
                    priceCents={item.priceCents}
                    image={item.image}
                    className="mt-4 w-full border border-border text-foreground text-sm font-medium py-2.5 rounded-full hover:bg-foreground hover:text-background transition-all"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {accessories.map((item) => (
              <div key={item.id} className="group">
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-white">
                  <FadeImage
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-8 group-hover:scale-105"
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
                      {formatPrice(item.priceCents, item.currency)}
                    </span>
                  </div>
                  <AddToCartButton
                    productId={item.id}
                    name={item.name}
                    priceCents={item.priceCents}
                    image={item.image}
                    className="mt-4 w-full border border-border text-foreground text-sm font-medium py-2.5 rounded-full hover:bg-foreground hover:text-background transition-all"
                  />
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
