"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Eased progress as the pinned section scrolls (distance = 200vh − 100vh).
  // Drives the two product panels sliding in and the title fading out.
  const progress = useScrollProgress(sectionRef, () => {
    const el = sectionRef.current;
    return el ? el.offsetHeight - window.innerHeight : 1;
  });

  // 4S panel slides in from the left, 6S from the right; title fades as they meet.
  const alpineTranslateX = (1 - progress) * -100;
  const forestTranslateX = (1 - progress) * 100;
  const titleOpacity = 1 - progress;

  return (
    <section id="products" className="bg-background">
      {/* Scroll-Animated Product Grid */}
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full">
            {/* Title - positioned behind the blocks */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="text-[12vw] font-bold leading-[0.95] tracking-widest text-foreground md:text-[10vw] lg:text-[8vw] text-center px-6 uppercase">
                Meet <span className="text-primary">4S</span> & <span className="text-primary">6S</span>.
              </h2>
            </div>

            {/* Product Grid */}
            <div className="relative z-10 grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-20">
              {/* 4S Image - comes from left */}
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white border border-border"
                style={{
                  transform: `translate3d(${alpineTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${alpineTranslateX}%, 0, 0)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <Image
                  src="/images/hyperflux-6s-pack.png"
                  alt="4S Black Series Battery"
                  fill
                  className="object-contain p-8"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-primary px-3 py-1 text-xs font-bold tracking-widest uppercase text-white">4S · Black Series</span>
                </div>
              </div>

              {/* 6S Image - comes from right */}
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white border border-border"
                style={{
                  transform: `translate3d(${forestTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${forestTranslateX}%, 0, 0)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <Image
                  src="/images/hyperflux-6s-pack.png"
                  alt="6S Black Series Battery"
                  fill
                  className="object-contain p-8"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-primary px-3 py-1 text-xs font-bold tracking-widest uppercase text-white">6S · Black Series</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-primary">
            Black Series
          </p>
          <p className="mt-8 leading-relaxed text-muted-foreground text-3xl text-center">
            The 4S and 6S Black Series deliver 70A continuous and 250A burst discharge —
            engineered for maximum performance in FPV, robotics, and high-drain applications.
          </p>
        </div>
      </div>
    </section>
  );
}
