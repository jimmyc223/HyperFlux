"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { FadeImage } from "@/components/fade-image";
import { useState } from "react";

const products = [
  {
    id: "alpine",
    name: "Alpine",
    tagline: "The Expedition Backpack",
    description:
      "Engineered for extreme terrain. Ultra-light carbon frame with integrated GPS tracking, built-in LED flashlight, and weather-resistant construction that performs in any conditions.",
    price: "$299",
    image: "/images/product-backpack.png",
    badge: "Bestseller",
    features: ["GPS Tracking", "LED Flashlight", "Carbon Frame", "Weather-Resistant"],
    category: "bottles",
  },
  {
    id: "forest",
    name: "Forest",
    tagline: "The Smart Thermal",
    description:
      "Self-heating technology meets aerospace-grade insulation. Keeps drinks at your exact target temperature for 24 hours — from summit to basecamp.",
    price: "$199",
    image: "/images/product-forest.png",
    badge: "New",
    features: ["Self-Heating", "Smart Temp Control", "24hr Insulation", "Lightweight"],
    category: "bottles",
  },
];

const accessories = [
  {
    id: 1,
    name: "Wireless Charging Stand",
    description: "Induction charging dock for effortless power",
    price: "$89",
    image: "/images/accessory-charger.png",
  },
  {
    id: 2,
    name: "Protective Silicone Sleeve",
    description: "Textured grip sleeve for enhanced durability",
    price: "$45",
    image: "/images/accessory-sleeve.png",
  },
  {
    id: 3,
    name: "Carbon Fiber Bike Mount",
    description: "Ultra-light mounting system for cycling",
    price: "$129",
    image: "/images/accessory-bike-mount.png",
  },
  {
    id: 4,
    name: "Premium Carry Strap",
    description: "Adjustable strap with quick-release clips",
    price: "$39",
    image: "/images/accessory-strap.png",
  },
  {
    id: 5,
    name: "Carabiner Clip System",
    description: "Secure attachment for hands-free carrying",
    price: "$29",
    image: "/images/accessory-carabiner.png",
  },
  {
    id: 6,
    name: "Bluetooth Speaker Base",
    description: "High-fidelity audio dock with grip stabilizers",
    price: "$149",
    image: "/images/accessory-speaker-base.png",
  },
];

type Filter = "all" | "bottles" | "accessories";

export default function ShopPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const showProducts = filter === "all" || filter === "bottles";
  const showAccessories = filter === "all" || filter === "accessories";

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-foreground pt-36 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-5">
            The Collection
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-none">
            Gear Built
            <br />
            for the Wild.
          </h1>
          <p className="mt-6 text-base text-white/50 max-w-sm leading-relaxed">
            Premium outdoor technology designed for explorers who refuse to
            compromise.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="px-6 md:px-12 lg:px-20 py-4 flex items-center gap-2">
          {(["all", "bottles", "accessories"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all capitalize ${
                filter === f
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All Products" : f === "bottles" ? "Bottles" : "Accessories"}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      {showProducts && (
        <section className="px-6 pt-16 pb-8 md:px-12 lg:px-20">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-10">
            Core Products
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
