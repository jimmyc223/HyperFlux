import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import Image from "next/image";

const values = [
  {
    title: "Relentless Innovation",
    body: "We obsess over every milliohm, every amp, every gram. Our packs are engineered with high-drain lithium-ion cells and precision BMS so you can push your build to the limit.",
    icon: "◎",
  },
  {
    title: "Uncompromising Reliability",
    body: "Built to deliver under load. Every pack is tested for sustained 70A discharge, 250A burst, and thermal stability before it ever leaves the bench.",
    icon: "◈",
  },
  {
    title: "Made in New Zealand",
    body: "Designed and assembled in NZ, not mass-produced offshore. Tight quality control, honest specs, and packs built to last more cycles — not replacement cycles.",
    icon: "◇",
  },
  {
    title: "Builder Community",
    body: "From FPV racers to robotics teams, every piece of feedback shapes what we build next. Our community of pilots and builders is our most important R&D team.",
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
            We Build Power
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
                Hyperflux was born out of frustration.
              </p>
              <p>
                We&apos;re a team of engineers who have been deeply involved in the
                RC, FPV, and high-performance hobby scene in New Zealand since 2016.
                After years of custom builds, the shortfall always seemed to be the
                affordability of long-lasting, high-power options. We got sick of
                choosing between overpriced gear and low-quality parts that didn&apos;t
                last.
              </p>
              <p className="text-foreground font-medium">
                So we created the solution ourselves.
              </p>
              <p>
                Hyperflux delivers high-performance, high-quality parts that are
                designed, tested, and proudly made right here in New Zealand. Every
                product is rigorously tested by engineers who actually use and race
                the same gear, ensuring real-world reliability and performance you can
                trust.
              </p>
              <p>
                No inflated markups. No compromising on quality. Just properly
                engineered, high-performance hardware at fair prices.
              </p>
              <p>
                Whether you&apos;re building your first quad or chasing competitive
                times, we&apos;ve got your back with gear built by Kiwis, for Kiwis.
              </p>
              <p className="text-foreground font-medium">
                Welcome to the Hyperflux family.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
            <Image
              src="https://images.unsplash.com/photo-1556537902-16b47f40c55c?q=80&w=1400"
              alt="HyperFlux Black Series powering an FPV build"
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
            &ldquo;High-drain cells and precision engineering — built for pilots,
            builders, and competitors who refuse to compromise on power or
            reliability.&rdquo;
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
            Join the Team
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm leading-relaxed">
            We&apos;re a small team building ambitious products. If you&apos;re obsessed with
            power electronics and high-performance flight, we want to hear from you.
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
