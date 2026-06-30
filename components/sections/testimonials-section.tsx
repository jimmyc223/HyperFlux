"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      {/* Large Text Statement */}
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-5xl text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Hyperflux batteries combine <span className="text-primary font-bold">lithium-ion high-drain cells</span> with precision engineering —
          built for pilots, builders, and competitors who demand every watt from their system.
        </p>
      </div>

      {/* About Image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/images/fpv-pilot.jpg"
          alt="FPV pilot flying on a Hyperflux-powered build"
          fill
          className="object-cover"
        />
        {/* Fade gradient overlay - white at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
}
