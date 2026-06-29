"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState("100vh");
  const [maxScroll, setMaxScroll] = useState(0);

  const images = [
    { src: "https://images.unsplash.com/photo-1765100479165-de189b95572b?q=80&w=1600", alt: "Cinewhoop FPV drone on rock" },
    { src: "https://images.unsplash.com/photo-1580287925446-7ed8ce2709c3?q=80&w=1600", alt: "FPV drones at sunset" },
    { src: "https://images.unsplash.com/photo-1529611934128-376c7bb1c88a?q=80&w=1600", alt: "Drone in flight over water" },
    { src: "https://images.unsplash.com/photo-1592318348310-f31b61a931c8?q=80&w=1600", alt: "Battery pack powering an e-bike" },
    { src: "https://images.unsplash.com/photo-1487304655522-c039cc299c9d?q=80&w=1600", alt: "Folding quadcopter drone" },
    { src: "https://images.unsplash.com/photo-1541617434114-48c3a51d0ab2?q=80&w=1600", alt: "FPV drone and controller" },
    { src: "https://images.unsplash.com/photo-1742899273038-67ff67477663?q=80&w=1600", alt: "High-capacity battery cells" },
    { src: "https://images.unsplash.com/photo-1557941051-78cc6cd3cae8?q=80&w=1600", alt: "Drone flying over terrain" },
  ];

  // Measure how far the strip must travel horizontally, and make the section
  // tall enough that vertical scroll drives that full travel.
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.scrollWidth;
      const distance = Math.max(0, containerWidth - window.innerWidth);
      setMaxScroll(distance);
      setSectionHeight(`${window.innerHeight + distance}px`);
    };

    // Small delay to ensure the container has laid out.
    const timer = setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Eased horizontal position derived from how far we've scrolled the section.
  const progress = useScrollProgress(galleryRef, () => maxScroll || 1);
  const translateX = -(progress * maxScroll);

  return (
    <section 
      id="gallery"
      ref={galleryRef}
      className="relative bg-background"
      style={{ height: sectionHeight }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full items-center">
          {/* Horizontal scrolling container */}
          <div 
            ref={containerRef}
            className="flex gap-6 px-6"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              WebkitTransform: `translate3d(${translateX}px, 0, 0)`,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitPerspective: 1000,
              touchAction: 'pan-y',
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative h-[70vh] w-[85vw] flex-shrink-0 overflow-hidden rounded-2xl md:w-[60vw] lg:w-[45vw]"
                style={{
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
