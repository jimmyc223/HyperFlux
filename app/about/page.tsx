import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import Image from "next/image";

const values = [
  {
    title: "Relentless Innovation",
    body: "We obsess over every gram, every degree, every signal. Our gear is engineered using aerospace-grade materials and cutting-edge technology so you can focus on the adventure ahead.",
    icon: "◎",
  },
  {
    title: "Uncompromising Durability",
    body: "Built to outlast the harshest conditions on earth. Every product is stress-tested across extreme temperatures, elevation changes, and sustained impact before it ever reaches your pack.",
    icon: "◈",
  },
  {
    title: "Minimal Footprint",
    body: "We design for longevity, not replacement cycles. Carbon-neutral manufacturing, recycled packaging, and gear built to last a lifetime — because protecting wild places starts before you leave the trailhead.",
    icon: "◇",
  },
  {
    title: "Explorer Community",
    body: "From beta testers on Denali to weekend hikers in the Cascades, every piece of feedback shapes what we build next. Our community of explorers is our most important R&D team.",
    icon: "◉",
  },
];

const team = [
  { name: "Mia Larsen", role: "Founder & CEO", image: "/images/placeholder-user.jpg" },
  { name: "Kai Oduya", role: "Head of Engineering", image: "/images/placeholder-user.jpg" },
  { name: "Sienna Park", role: "Lead Industrial Designer", image: "/images/placeholder-user.jpg" },
  { name: "Renzo Mbeki", role: "Director of Operations", image: "/images/placeholder-user.jpg" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="px-6 pt-36 pb-20 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5">
            About Us
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground leading-none">
            We Build Gear
            <br />
            That Goes Further.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="px-6 pb-24 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text */}
          <div className="lg:pt-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Our Story
            </p>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-xl text-foreground font-medium leading-relaxed">
                HyperFlux was born on a failed summit attempt in the Himalayas —
                when the wrong gear turned a manageable situation into a dangerous one.
              </p>
              <p>
                Our founders came back from that trip with one question: why does
                outdoor gear still feel like it&apos;s built for the 1990s? GPS units,
                thermal systems, and lighting are separate objects — heavy, redundant,
                and prone to failure.
              </p>
              <p>
                We spent three years working with aerospace engineers, materials
                scientists, and a community of professional guides to build a unified
                system. The result is Alpine and Forest — gear that thinks with you,
                not against you.
              </p>
              <p>
                Today, HyperFlux products have been carried to the summit of every
                continent. We&apos;re just getting started.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
            <Image
              src="/images/product-backpack.png"
              alt="HyperFlux Alpine in the field"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-foreground px-6 py-24 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed">
            &ldquo;Aerospace-grade materials and cutting-edge technology — designed
            for explorers who refuse to compromise on quality or performance
            in the wild.&rdquo;
          </p>
          <p className="mt-8 text-sm text-white/40 uppercase tracking-widest">
            HyperFlux Design Manifesto
          </p>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="px-6 py-24 md:px-12 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-16">
          What We Stand For
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {values.map((v) => (
            <div key={v.title}>
              <span className="text-3xl text-muted-foreground">{v.icon}</span>
              <h3 className="mt-4 text-xl font-medium text-foreground">{v.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" className="px-6 py-24 border-t border-border md:px-12 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-16">
          The Team
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {team.map((member) => (
            <div key={member.name}>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-sm font-medium text-foreground">{member.name}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Careers callout */}
      <section
        id="careers"
        className="mx-6 mb-24 md:mx-12 lg:mx-20 rounded-2xl bg-secondary px-8 py-16 md:px-14 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground">
            Join the Expedition
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm leading-relaxed">
            We&apos;re a small team building ambitious products. If you&apos;re obsessed with
            the intersection of technology and the outdoors, we want to hear from you.
          </p>
        </div>
        <a
          href="mailto:careers@hyperflux.co"
          className="shrink-0 bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full hover:opacity-80 transition-opacity"
        >
          View Open Roles
        </a>
      </section>

      <FooterSection />
    </main>
  );
}
