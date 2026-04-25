/* ============================================================
   Navbar — سُرّة | SURRAH
   Layout (LTR visual order): Logo (left) | Nav Links (center) | CTA Button (right)
   Nav order: من نحن | مجتمعاتنا▼ | خدماتنا▼ | المركز الاعلامي | عضويات | دليل سُرّة | المتجر
   Dropdowns: مجتمعاتنا (5 communities), خدماتنا (4 services)
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

const F = "'ManchetteFine', sans-serif";

const communities = [
  { href: "/communities/basar", label: "بصر", labelEn: "Basar", color: "#C4622D" },
  { href: "/communities/sifr", label: "صفر", labelEn: "Sifr", color: "#c8c4bc" },
  { href: "/communities/sada", label: "سدى", labelEn: "Sada", color: "#7B4F8E" },
  { href: "/communities/mada", label: "مدى", labelEn: "Mada", color: "#c8c4bc" },
  { href: "/communities/maqam", label: "مقام", labelEn: "Maqam", color: "#C4622D" },
];

const services = [
  { href: "/services#communities", label: "صناعة المجتمعات" },
  { href: "/services#programs", label: "إنشاء البرامج الثقافية" },
  { href: "/services#events", label: "تنظيم الفعاليات الحية" },
  { href: "/services#audience", label: "توفير الجمهور المستهدف" },
];

const memberships = [
  { href: "/join?type=member", label: "عضو في المجتمع", desc: "انضم إلى مجتمع سُرّة" },
  { href: "/join?type=partner", label: "شريك", desc: "كن شريكاً في الأثر" },
  { href: "/join?type=volunteer", label: "متطوع", desc: "تطوّع معنا" },
  { href: "/join?type=team", label: "فريق سُرّة", desc: "انضم إلى فريق العمل" },
  { href: "/join?type=initiative", label: "مبادرة", desc: "شاركنا مبادرتك" },
];

const mediaItems = [
  { href: "/media/news", label: "أحدث الأخبار" },
  { href: "/media/identity", label: "هوية سُرّة" },
];

const navLinks = [
  { href: "/about", label: "عن سُرّة" },
  { href: "/communities", label: "مجتمعاتنا", dropdown: "communities" },
  { href: "/services", label: "خدماتنا", dropdown: "services" },
  { href: "/media", label: "المركز الإعلامي", dropdown: "media" },
  { href: "/join", label: "عضويات", dropdown: "memberships" },
  { href: "/directory", label: "دليل سُرّة" },
  { href: "/store", label: "المتجر", placeholder: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [location] = useLocation();
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setActiveDropdown(null); }, [location]);

  const handlePlaceholderClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    toast.info(`${label} — قريباً`);
  };

  const openDropdown = (key: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(key);
  };

  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const keepDropdown = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
  };

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: "50%",
    transform: "translateX(50%)",
    background: "rgba(10,10,10,0.98)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.1)",
    minWidth: "200px",
    zIndex: 100,
    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
  };

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between" style={{ height: "96px" }}>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" style={{ marginRight: "-0.5rem" }}>
            <img
              src="/manus-storage/Surrah-White_308323ba.png"
              alt="سُرّة SURRAH"
              style={{ height: '95px', width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5 flex-1 justify-start" style={{ paddingRight: "2rem" }}>
            {navLinks.map((link) => {
              if (link.dropdown) {
                const items = link.dropdown === "communities" ? communities : link.dropdown === "services" ? services : link.dropdown === "media" ? mediaItems : memberships;
                return (
                  <div
                    key={link.href}
                    style={{ position: "relative" }}
                    onMouseEnter={() => openDropdown(link.dropdown!)}
                    onMouseLeave={closeDropdown}
                  >
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: F,
                        fontWeight: 700,
                        fontSize: "17px",
                        color: "rgba(255,255,255,0.85)",
                        textDecoration: "none",
                        letterSpacing: "0.02em",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        cursor: "pointer",
                      }}
                    >
                      {link.label}
                      <span style={{ fontSize: "10px", opacity: 0.6, marginTop: "1px" }}>▾</span>
                    </Link>

                    {/* Dropdown Panel */}
                    {activeDropdown === link.dropdown && (
                      <div style={dropdownStyle} onMouseEnter={keepDropdown} onMouseLeave={closeDropdown}>
                        {link.dropdown === "communities" ? (
                          <>
                            {(items as typeof communities).map((item) => (
                              <Link key={item.href} href={item.href}
                                style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: F, fontSize: "0.95rem", fontWeight: 500, color: "#ffffff", padding: "0.75rem 1.25rem", textDecoration: "none", borderRight: "2px solid transparent", transition: "background 0.15s, border-color 0.15s" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.borderRightColor = item.color; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderRightColor = "transparent"; }}
                              >
                                <span>{item.label}</span>
                                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginRight: "auto" }}>{item.labelEn}</span>
                              </Link>
                            ))}
                          </>
                        ) : link.dropdown === "media" ? (
                          <>
                            {(items as typeof mediaItems).map((item) => (
                              <a key={item.href} href={item.href}
                                onClick={(e) => { e.preventDefault(); toast.info(`${item.label} — قريباً`); }}
                                style={{ display: "block", fontFamily: F, fontSize: "0.95rem", fontWeight: 500, color: "#ffffff", padding: "0.75rem 1.25rem", textDecoration: "none", borderRight: "2px solid transparent", transition: "background 0.15s, border-color 0.15s", cursor: "pointer" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.borderRightColor = "#C4622D"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderRightColor = "transparent"; }}
                              >
                                {item.label}
                              </a>
                            ))}
                          </>
                        ) : link.dropdown === "services" ? (
                          <>
                            {(items as typeof services).map((item) => (
                              <Link key={item.href} href={item.href}
                                style={{ display: "block", fontFamily: F, fontSize: "0.95rem", fontWeight: 500, color: "#ffffff", padding: "0.75rem 1.25rem", textDecoration: "none", borderRight: "2px solid transparent", transition: "background 0.15s, border-color 0.15s" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.borderRightColor = "#C4622D"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderRightColor = "transparent"; }}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </>
                        ) : (
                          <>
                            <div style={{ padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                              <Link href="/join" style={{ display: "block", fontFamily: F, fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", padding: "0.5rem 1.25rem", textDecoration: "none", letterSpacing: "0.15em" }}>جميع العضويات</Link>
                            </div>
                            {(items as typeof memberships).map((item) => (
                              <Link key={item.href} href={item.href}
                                style={{ display: "block", fontFamily: F, fontSize: "0.95rem", fontWeight: 500, color: "#ffffff", padding: "0.65rem 1.25rem", textDecoration: "none", borderRight: "2px solid transparent", transition: "background 0.15s, border-color 0.15s" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.borderRightColor = "#C4622D"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderRightColor = "transparent"; }}
                              >
                                <span style={{ display: "block" }}>{item.label}</span>
                                <span style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontWeight: 300, marginTop: "1px" }}>{item.desc}</span>
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              if (link.placeholder) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handlePlaceholderClick(e, link.label)}
                    style={{
                      fontFamily: F,
                      fontWeight: 700,
                      fontSize: "17px",
                      color: "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      cursor: "pointer",
                    }}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: F,
                    fontWeight: 700,
                    fontSize: "17px",
                    color: "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center flex-shrink-0" style={{ marginLeft: "-0.5rem" }}>
            <Link
              href="/create-community"
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
          style={{ maxHeight: menuOpen ? "700px" : "0", opacity: menuOpen ? 1 : 0 }}
        >
          <div
            className="flex flex-col pb-6 pt-2 border-t"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            {navLinks.map((link) => {
              if (link.dropdown) {
                const items = link.dropdown === "communities" ? communities : services;
                const isExpanded = mobileExpanded === link.dropdown;
                return (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : link.dropdown!)}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontFamily: F,
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: "rgba(255,255,255,0.85)",
                        background: "none",
                        border: "none",
                        padding: "0.75rem 0.75rem 0.75rem 0",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        cursor: "pointer",
                        textAlign: "right",
                      }}
                    >
                      {link.label}
                      <span style={{ fontSize: "10px", opacity: 0.5, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
                    </button>
                    {isExpanded && (
                      <div style={{ background: "rgba(255,255,255,0.02)", paddingRight: "1rem" }}>
                        <Link
                          href={link.href}
                          style={{ display: "block", fontFamily: F, fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", padding: "0.5rem 0.75rem", textDecoration: "none", letterSpacing: "0.1em" }}
                        >
                          {link.dropdown === "communities" ? "جميع المجتمعات" : "جميع الخدمات"}
                        </Link>
                        {link.dropdown === "communities"
                          ? (items as typeof communities).map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: F, fontSize: "0.9rem", color: "#ffffff", padding: "0.6rem 0.75rem", textDecoration: "none" }}
                            >
                              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.color }} />
                              {item.label}
                            </Link>
                          ))
                          : (items as typeof services).map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              style={{ display: "block", fontFamily: F, fontSize: "0.9rem", color: "#ffffff", padding: "0.6rem 0.75rem", textDecoration: "none" }}
                            >
                              {item.label}
                            </Link>
                          ))
                        }
                      </div>
                    )}
                  </div>
                );
              }

              if (link.placeholder) {
                return (
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
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    fontFamily: F,
                    fontWeight: location === link.href ? 700 : 500,
                    fontSize: "1rem",
                    color: location === link.href ? "#C4622D" : "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    borderRight: location === link.href ? "3px solid #C4622D" : "3px solid transparent",
                    paddingRight: "0.75rem",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div style={{ marginTop: "1rem" }}>
              <Link href="/create-community" className="btn-surrah-primary" style={{ width: "100%", justifyContent: "center" }}>
                أنشئ مجتمعك
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
