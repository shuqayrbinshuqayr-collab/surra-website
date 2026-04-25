/* ============================================================
   Navbar — سُرّة | SURRAH
   Layout (LTR visual order): CTA Button (left) | Nav Links (center) | Logo (right)
   In RTL: Logo appears on the right, CTA on the left
   Nav order: من نحن | مجتمعاتنا | خدماتنا | أنشئ مجتمعك | المركز الاعلامي | عضويات
   ============================================================ */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

const navLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/communities", label: "مجتمعاتنا" },
  { href: "/services", label: "خدماتنا" },
  { href: "/media", label: "المركز الاعلامي", placeholder: true },
  { href: "/membership", label: "عضويات", placeholder: true },
];

const F = "'ThmanyahSerifText', sans-serif";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handlePlaceholderClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    toast.info(`${label} — قريباً`);
  };

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10, 10, 10, 0.98)" : "rgba(10, 10, 10, 0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between" style={{ height: "96px" }}>

          {/* LEFT: Official Logo — on the far left visually, close to edge */}
          <Link href="/" className="flex-shrink-0" style={{ marginRight: "-0.5rem" }}>
            <img
              src="/manus-storage/Surrah-White_308323ba.png"
              alt="سُرّة SURRAH"
              style={{ height: '95px', width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* CENTER: Desktop Nav Links — aligned toward CTA button (left side) */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-start" style={{ paddingRight: "2rem" }}>
            {navLinks.map((link) => (
              link.placeholder ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handlePlaceholderClick(e, link.label)}
                  style={{
                    fontFamily: F,
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    borderBottom: "2px solid transparent",
                    paddingBottom: "2px",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: F,
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    borderBottom: "2px solid transparent",
                    paddingBottom: "2px",
                  }}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* RIGHT: CTA Button — on the far right visually, close to edge */}
          <div className="hidden md:flex items-center flex-shrink-0" style={{ marginLeft: "-0.5rem" }}>
            <Link
              href="/join"
              className="btn-surrah-primary"
              style={{ fontSize: "1rem", padding: "0.7rem 1.8rem", color: "#ffffff", backgroundColor: "#212121", border: "1px solid #ffffff" }}
            >
              أنشئ مجتمعك
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  transform:
                    i === 0 && menuOpen ? "rotate(45deg) translate(4px, 4px)" :
                    i === 2 && menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: menuOpen ? "500px" : "0", opacity: menuOpen ? 1 : 0 }}
        >
          <div
            className="flex flex-col pb-6 pt-2 border-t"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            {navLinks.map((link) => (
              link.placeholder ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handlePlaceholderClick(e, link.label)}
                  style={{
                    display: "block",
                    fontFamily: F,
                    fontWeight: 500,
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    borderRight: "3px solid transparent",
                    paddingRight: "0.75rem",
                    opacity: 0.75,
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    fontFamily: F,
                    fontWeight: location === link.href ? 700 : 500,
                    fontSize: "1rem",
                    color: location === link.href ? "#E8A89C" : "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    borderRight: location === link.href ? "3px solid #E8A89C" : "3px solid transparent",
                    paddingRight: "0.75rem",
                  }}
                >
                  {link.label}
                </Link>
              )
            ))}
            <div style={{ marginTop: "1rem" }}>
              <Link href="/join" className="btn-surrah-primary" style={{ width: "100%", justifyContent: "center" }}>
                أنشئ مجتمعك
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
