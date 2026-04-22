/* ============================================================
   Navbar — سُرّة | SURRAH
   Brand: cream/off-white background, dark navy text, official logo image
   Nav order (RTL): من نحن | مجتمعاتنا | خدماتنا | أنشئ مجتمعك | المركز الاعلامي | عضويات
   CTA button "أنشئ مجتمعك" separated on the left side
   ============================================================ */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

const navLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/communities", label: "مجتمعاتنا" },
  { href: "/services", label: "خدماتنا" },
  { href: "/join", label: "أنشئ مجتمعك" },
  { href: "/media", label: "المركز الاعلامي", placeholder: true },
  { href: "/membership", label: "عضويات", placeholder: true },
];

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
        background: scrolled ? "rgba(250, 248, 244, 0.97)" : "rgba(250, 248, 244, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(28, 43, 58, 0.12)" : "1px solid rgba(28, 43, 58, 0.06)",
        boxShadow: scrolled ? "0 2px 20px rgba(28, 43, 58, 0.08)" : "none",
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between" style={{ height: "72px" }}>

          {/* LEFT: CTA Button (separated, on the far left) */}
          <div className="hidden md:flex items-center">
            <Link
              href="/join"
              className="btn-surrah-primary"
              style={{ fontSize: "0.85rem", padding: "0.55rem 1.4rem" }}
            >
              أنشئ مجتمعك
            </Link>
          </div>

          {/* CENTER: Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => (
              link.placeholder ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handlePlaceholderClick(e, link.label)}
                  style={{
                    fontFamily: "'TheYearofHandicrafts', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.88rem",
                    color: "#1C2B3A",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    transition: "color 0.2s ease",
                    borderBottom: "2px solid transparent",
                    paddingBottom: "2px",
                    cursor: "pointer",
                    opacity: 0.75,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#B5453A";
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#1C2B3A";
                    (e.currentTarget as HTMLElement).style.opacity = "0.75";
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'TheYearofHandicrafts', sans-serif",
                    fontWeight: location === link.href ? 700 : 500,
                    fontSize: "0.88rem",
                    color: location === link.href ? "#B5453A" : "#1C2B3A",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    transition: "color 0.2s ease",
                    borderBottom: location === link.href ? "2px solid #B5453A" : "2px solid transparent",
                    paddingBottom: "2px",
                  }}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* RIGHT: Official Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/manus-storage/Surrah-Black_97bb663c.png"
              alt="سُرّة SURRAH"
              style={{ height: "36px", width: "auto", objectFit: "contain" }}
            />
          </Link>

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
                  background: "#1C2B3A",
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
            style={{ borderColor: "rgba(28, 43, 58, 0.1)" }}
          >
            {navLinks.map((link) => (
              link.placeholder ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handlePlaceholderClick(e, link.label)}
                  style={{
                    display: "block",
                    fontFamily: "'TheYearofHandicrafts', sans-serif",
                    fontWeight: 500,
                    fontSize: "1rem",
                    color: "#1C2B3A",
                    textDecoration: "none",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(28, 43, 58, 0.08)",
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
                    fontFamily: "'TheYearofHandicrafts', sans-serif",
                    fontWeight: location === link.href ? 700 : 500,
                    fontSize: "1rem",
                    color: location === link.href ? "#B5453A" : "#1C2B3A",
                    textDecoration: "none",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(28, 43, 58, 0.08)",
                    borderRight: location === link.href ? "3px solid #B5453A" : "3px solid transparent",
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
