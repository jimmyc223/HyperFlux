import { FadeImage } from "@/components/fade-image";
import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export async function CollectionSection() {
  const products = await getAllProducts();

  return (
    <section id="products" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-16">
        <p className="text-xs uppercase tracking-widest text-primary mb-3">Black Series</p>
        <h2 className="text-3xl font-bold tracking-widest uppercase text-foreground md:text-4xl">
          The <span className="text-primary">Range</span>
        </h2>
      </div>

      {/* Product Grid */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {products.map((product) => (
            <div key={product.id} className="group flex-shrink-0 w-[80vw] snap-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Desktop: 4-column Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 md:px-12 lg:px-20">
          {products.map((product) => (
            <div key={product.id} className="group">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <>
      {/* Image — white studio card to suit the product-on-white photography */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white border border-border">
        <FadeImage
          src={product.image || "/placeholder.svg"}
          alt={product.homeName}
          fill
          className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
        />
        {/* Series badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary px-3 py-1 text-xs font-bold tracking-widest uppercase text-white">
            {product.homeSeries}
          </span>
        </div>
        {/* Discharge badge — only for batteries */}
        {product.discharge && (
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <span className="flex-1 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-2 text-center">
              <span className="block text-xs uppercase tracking-widest text-muted-foreground">Continuous</span>
              <span className="block text-lg font-bold text-primary">{product.discharge.continuous}</span>
            </span>
            <span className="flex-1 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-2 text-center">
              <span className="block text-xs uppercase tracking-widest text-muted-foreground">Burst</span>
              <span className="block text-lg font-bold text-white">{product.discharge.burst}</span>
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-5 pb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold uppercase tracking-tight text-foreground leading-snug">
              {product.homeName}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {product.homeDescription}
            </p>
          </div>
          <span className="text-xl font-bold text-foreground shrink-0">
            {formatPrice(product.priceCents, product.currency)}
          </span>
        </div>

        {/* Spec grid */}
        <div className="grid grid-cols-4 border-t border-border pt-4">
          {product.specs.map((spec) => (
            <div key={spec.label} className="text-center border-r border-border last:border-r-0 px-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{spec.label}</p>
              <p className="text-sm font-bold text-foreground">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
