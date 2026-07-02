"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CartIcon } from "@/components/cart/cart-icon";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md rounded-full border border-white/10" : "bg-transparent"}`}
      style={{
        boxShadow: isScrolled
          ? "0 0 0 1px rgba(204,0,0,0.15), 0 8px 32px rgba(0,0,0,0.6)"
          : "none",
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-2 pl-5 py-2">
        {/* Logo — mark and wordmark as separate images, sized independently for legibility */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5 transition-opacity duration-300 hover:opacity-80">
          <Image
            src="/images/logo-mark.png"
            alt="Hyperflux"
            width={376}
            height={161}
            priority
            className="h-8 w-auto md:h-10"
          />
          <Image
            src="/images/HyperFlux Text only.png"
            alt="Hyperflux High Power"
            width={376}
            height={83}
            priority
            className="h-8 w-auto md:h-10"
          />
        </Link>

        {/* Nav + CTA group — kept together so it stays pinned to the right edge,
            with its own gap from the logo and a controlled gap before Shop Now. */}
        <div className="hidden items-center gap-10 lg:flex">
          <nav className="flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm tracking-wider uppercase transition-colors ${
                  pathname === href
                    ? "text-white font-semibold"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <CartIcon className="text-white/70 hover:text-white" />

          <Link
            href="/shop"
            className="px-4 py-2 text-sm font-bold tracking-widest uppercase transition-all rounded-full bg-primary text-white hover:bg-red-700"
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile: cart + menu button */}
        <div className="flex items-center gap-5 lg:hidden">
          <CartIcon className="text-white/70 hover:text-white" />
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="transition-colors text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-8 lg:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-lg tracking-widest uppercase text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/shop"
              className="mt-4 bg-primary px-5 py-3 text-center text-sm font-bold tracking-widest uppercase text-white rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
