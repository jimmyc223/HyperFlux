"use client";

const specs = [
  { label: "Capacity", value: "5000mAh" },
  { label: "Continuous", value: "70A" },
  { label: "Burst", value: "250A" },
  { label: "Cells", value: "4S / 6S" },
];

export function EditorialSection() {
  return (
    <section className="bg-background">
      {/* Newsletter Banner */}
      

      {/* Decorative Icons */}
      <div className="flex items-center justify-center gap-6 pb-20">
        
        
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-primary">
              {spec.label}
            </p>
            <p className="font-bold text-foreground text-4xl tracking-tight">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {/* Full-width Video */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://videos.pexels.com/video-files/18326002/18326002-hd_1280_720_60fps.mp4"
        />
      </div>
    </section>
  );
}
