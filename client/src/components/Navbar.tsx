/* ============================================================
   Navbar Component — سُرّة
   Design: Dark sticky nav, transparent → solid on scroll
   RTL Arabic layout, gold CTA button
   ============================================================ */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "خدماتنا" },
  { href: "/communities", label: "مجتمعاتنا" },
  { href: "/join", label: "أنشئ مجتمعك" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "oklch(0.08 0.01 60 / 95%)"
          : "linear-gradient(to bottom, oklch(0.05 0.01 60 / 80%), transparent)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.25 0.02 75 / 20%)" : "none",
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between py-4 gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span
              className="text-2xl font-bold tracking-wide"
              style={{
                fontFamily: "'Noto Naskh Arabic', serif",
                color: "oklch(0.72 0.12 75)",
                letterSpacing: "0.05em",
              }}
            >
              سُرّة
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  color:
                    location === link.href
                      ? "oklch(0.72 0.12 75)"
                      : "oklch(0.80 0.01 80)",
                  fontWeight: location === link.href ? "500" : "400",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <Link href="/contact" className="btn-gold text-sm py-2 px-5">
              تواصل معنا
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: "oklch(0.72 0.12 75)",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: "oklch(0.72 0.12 75)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: "oklch(0.72 0.12 75)",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }}
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-400"
          style={{
            maxHeight: menuOpen ? "400px" : "0",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <div
            className="flex flex-col gap-1 pb-6 pt-2 border-t"
            style={{ borderColor: "oklch(0.25 0.02 75 / 20%)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-2 text-base transition-colors duration-200"
                style={{
                  color:
                    location === link.href
                      ? "oklch(0.72 0.12 75)"
                      : "oklch(0.80 0.01 80)",
                  fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                  fontWeight: location === link.href ? "500" : "400",
                  borderBottom: "1px solid oklch(0.25 0.02 75 / 15%)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-gold mt-4 text-sm justify-center">
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
