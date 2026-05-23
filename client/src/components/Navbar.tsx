/* ============================================================
   Navbar — سُرّة | SURRAH
   Layout (LTR visual order): Logo (left) | Nav Links (center) | CTA Button (right)
   Nav order: عن سُرّة | مجتمعاتنا▼ | خدماتنا▼ | المركز الاعلامي▼ | عضويات▼ | دليل سُرّة | المتجر
   Dropdowns: مجتمعاتنا (6 communities), خدماتنا (4 services), المركز الإعلامي (2), عضويات (4)
   Right side: Language switcher (AR/EN/中) + Theme toggle + CTA
   ============================================================ */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

const F = "'ManchetteFine', sans-serif";

const communities = [
  { href: "/communities/basar", label: "بصر", labelEn: "Basar", labelZh: "巴萨尔", color: "#C4622D", logoWhite: "/manus-storage/Basar-White_7d406934.png", logoBlack: "/manus-storage/Basar-Black_b4fc3a42.png", invertOnDark: false },
  { href: "/communities/sifr", label: "صفر", labelEn: "Sifr", labelZh: "西弗尔", color: "#c8c4bc", logoWhite: "/manus-storage/Sifr-Black_c3ab7e46.webp", logoBlack: "/manus-storage/Sifr-Black_c3ab7e46.webp", invertOnDark: true },
  { href: "/communities/sada", label: "سدى", labelEn: "Sada", labelZh: "萨达", color: "#7B4F8E", logoWhite: "/manus-storage/Sudaa-White_d1defc89.png", logoBlack: "/manus-storage/Sudaa-Black_1236663e.png", invertOnDark: false },
  { href: "/communities/mada", label: "مدى", labelEn: "Mada", labelZh: "马达", color: "#c8c4bc", logoWhite: "/manus-storage/Mada-White_c8cc9bc8.png", logoBlack: "/manus-storage/Mada-Black_b72e306f.png", invertOnDark: false },
  { href: "/communities/maqam", label: "مقام", labelEn: "Maqam", labelZh: "马卡姆", color: "#C4622D", logoWhite: "/manus-storage/Maqam-White_10f58ea8.png", logoBlack: "/manus-storage/Maqam-Black_5a9b19ac.png", invertOnDark: false },
  { href: "/communities/umla", label: "عُملة", labelEn: "Umlah", labelZh: "乌姆拉", color: "#C9A84C", logoWhite: "/manus-storage/Umlah-White-Final_92329db8.png", logoBlack: "/manus-storage/Umlah-White-Final_92329db8.png", invertOnDark: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const isAr = lang === "ar";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setActiveDropdown(null); setLangOpen(false); }, [location]);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

  // Nav links — translated
  const navLinks = [
    { href: "/about", label: t("nav.about") },
    { href: "/communities", label: t("nav.communities"), dropdown: "communities" },
    { href: "/services", label: t("nav.services"), dropdown: "services" },
    { href: "/media", label: t("nav.media"), dropdown: "media" },
    { href: "/join", label: t("nav.memberships"), dropdown: "memberships" },
    { href: "/directory", label: t("nav.directory") },
    { href: "/store", label: t("nav.store") },
  ];

  const services = [
    { href: "/services#communities", label: t("service.communities") },
    { href: "/services#programs", label: t("service.programs") },
    { href: "/services#events", label: t("service.events") },
    { href: "/services#audience", label: t("service.audience") },
  ];

  const memberships = [
    { href: "/join#bidaya", label: t("membership.bidaya") },
    { href: "/join#wasl", label: t("membership.wasl") },
    { href: "/join#nukhba", label: t("membership.nukhba") },
    { href: "/join#majlis", label: t("membership.majlis") },
  ];

  const mediaItems = [
    { href: "/media", label: t("nav.news") },
    { href: "/media#identity", label: t("nav.identity") },
  ];

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: "50%",
    transform: "translateX(50%)",
    background: "var(--dropdown-bg, rgba(10,10,10,0.98))",
    backdropFilter: "blur(16px)",
    border: "1px solid var(--dropdown-border, rgba(255,255,255,0.1))",
    minWidth: "200px",
    zIndex: 100,
    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
  };

  // Language switcher options
  const langs: { code: Language; label: string; full: string }[] = [
    { code: "ar", label: "ع", full: "العربية" },
    { code: "en", label: "EN", full: "English" },
    { code: "zh", label: "中", full: "中文" },
  ];

  const currentLang = langs.find((l) => l.code === lang) || langs[0];

  const isDark = theme === "dark";
  const navBg = isDark
    ? (menuOpen ? "#000000" : scrolled ? "rgba(10,10,10,0.92)" : "transparent")
    : (menuOpen ? "var(--surrah-nav-bg)" : scrolled ? "var(--surrah-nav-bg)" : "transparent");
  const navBorder = scrolled
    ? (isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(28,43,58,0.12)")
    : "none";
  const navTextColor = isDark ? "rgba(255,255,255,0.85)" : "var(--surrah-nav-text)";
  const navMutedColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(28,43,58,0.55)";
  const dropBg = isDark ? "rgba(10,10,10,0.98)" : "rgba(250,248,244,0.98)";
  const dropBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(28,43,58,0.12)";
  const dropHoverBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(28,43,58,0.04)";
  const burgerColor = isDark ? "rgba(255,255,255,0.85)" : "var(--surrah-nav-text)";
  const langBorder = isDark ? "rgba(255,255,255,0.2)" : "rgba(28,43,58,0.2)";
  const langInactiveColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(28,43,58,0.55)";
  const themeBtnBorder = isDark ? "rgba(255,255,255,0.25)" : "rgba(28,43,58,0.25)";
  const themeBtnColor = isDark ? "rgba(255,255,255,0.85)" : "var(--surrah-nav-text)";

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      style={{
        background: navBg,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: navBorder,
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.15)" : "none",
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between" style={{ height: "96px" }}>

          {/* Logo — swap white/dark based on theme */}
          <Link href="/" className="flex-shrink-0" style={{ marginRight: "-0.5rem" }}>
            <img
              src={isDark ? "/manus-storage/Surrah-White_308323ba.png" : "/manus-storage/Surrah-Black_2341eb6c.png"}
              alt="سُرّة SURRAH"
              style={{ height: '95px', width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5 flex-1 justify-start" style={{ paddingRight: "2rem" }}>
            {navLinks.map((link) => {
              if (link.dropdown) {
                const items = link.dropdown === "communities" ? communities
                  : link.dropdown === "services" ? services
                  : link.dropdown === "media" ? mediaItems
                  : memberships;
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
                        color: navTextColor,
                        textDecoration: "none",
                        letterSpacing: "0.02em",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {link.label}
                      <span style={{ fontSize: "10px", opacity: 0.6, marginTop: "1px" }}>▾</span>
                    </Link>

                    {/* Dropdown Panel */}
                    {activeDropdown === link.dropdown && (
                      <div style={dropdownStyle} onMouseEnter={keepDropdown} onMouseLeave={closeDropdown}>
                        {link.dropdown === "communities" ? (
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", padding: "0.5rem" }}>
                            {(items as typeof communities).map((item) => (
                              <Link key={item.href} href={item.href}
                                style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.75rem 1rem", textDecoration: "none", borderRadius: "4px", transition: "background 0.15s", border: "1px solid transparent" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = dropHoverBg; (e.currentTarget as HTMLElement).style.borderColor = dropBorder; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "transparent"; }}
                              >
                                <img src={item.invertOnDark ? item.logoBlack : item.logoWhite} alt={item.label} style={{ height: "36px", width: "auto", objectFit: "contain", filter: item.invertOnDark ? "invert(1) brightness(2)" : "none" }} />
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <>
                            {(items as { href: string; label: string }[]).map((item) => (
                              <Link key={item.href} href={item.href}
                                style={{ display: "block", fontFamily: F, fontSize: "0.95rem", fontWeight: 500, color: "var(--surrah-text-primary)", padding: "0.75rem 1.25rem", textDecoration: "none", borderRight: "2px solid transparent", transition: "background 0.15s, border-color 0.15s", whiteSpace: "nowrap" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = dropHoverBg; (e.currentTarget as HTMLElement).style.borderRightColor = "#C4622D"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderRightColor = "transparent"; }}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
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
                    color: navTextColor,
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Language Switcher + Theme Toggle + CTA */}
          <div className="hidden md:flex items-center flex-shrink-0 gap-2" style={{ marginLeft: "-0.5rem" }}>
            {/* Language Switcher — Dropdown */}
            <div ref={langRef} style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                style={{
                  fontFamily: F,
                  fontSize: "13px",
                  fontWeight: 700,
                  padding: "0.35rem 0.75rem",
                  background: langOpen ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(28,43,58,0.08)") : "transparent",
                  color: isDark ? "rgba(255,255,255,0.85)" : "var(--surrah-nav-text)",
                  border: `1px solid ${langBorder}`,
                  borderRadius: "3px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontSize: "15px", lineHeight: 1 }}>{currentLang.label}</span>
                <svg
                  width="9" height="6" viewBox="0 0 9 6" fill="none"
                  style={{ transition: "transform 0.2s", transform: langOpen ? "rotate(180deg)" : "none", opacity: 0.6 }}
                >
                  <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dropdown panel */}
              {langOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    left: "auto",
                    background: isDark ? "rgba(12,12,12,0.97)" : "rgba(250,248,244,0.98)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(28,43,58,0.12)"}`,
                    borderRadius: "6px",
                    overflow: "hidden",
                    minWidth: "130px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    zIndex: 200,
                  }}
                >
                  {langs.map((l, idx) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontFamily: F,
                        fontSize: "13px",
                        fontWeight: lang === l.code ? 700 : 500,
                        padding: "0.6rem 1rem",
                        background: lang === l.code ? "rgba(196,98,45,0.15)" : "transparent",
                        color: lang === l.code ? "#C4622D" : (isDark ? "rgba(255,255,255,0.75)" : "rgba(28,43,58,0.75)"),
                        border: "none",
                        borderBottom: idx < langs.length - 1 ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(28,43,58,0.08)"}` : "none",
                        cursor: "pointer",
                        transition: "background 0.15s, color 0.15s",
                        textAlign: "left",
                        letterSpacing: "0.02em",
                      }}
                      onMouseEnter={(e) => { if (lang !== l.code) (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(28,43,58,0.05)"; }}
                      onMouseLeave={(e) => { if (lang !== l.code) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <span style={{ fontSize: "16px", width: "20px", textAlign: "center", flexShrink: 0 }}>{l.label}</span>
                      <span>{l.full}</span>
                      {lang === l.code && (
                        <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="#C4622D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>


            <Link
              href="/create-community"
              className="btn-surrah-primary"
              style={{ fontSize: "0.95rem", padding: "0.65rem 1.5rem", color: "var(--surrah-text-primary)", backgroundColor: "transparent", border: "1px solid #ffffff", whiteSpace: "nowrap" }}
            >
              {t("nav.create_community")}
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Switcher */}
            <div style={{ position: "relative" }} ref={langRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                style={{
                  fontFamily: F,
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "0.3rem 0.6rem",
                  background: "transparent",
                  color: isDark ? "rgba(255,255,255,0.85)" : "var(--surrah-nav-text)",
                  border: `1px solid ${langBorder}`,
                  borderRadius: "3px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {currentLang.label}
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ transition: "transform 0.2s", transform: langOpen ? "rotate(180deg)" : "none", opacity: 0.6 }}>
                  <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {langOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: isAr ? "0" : "auto",
                    left: isAr ? "auto" : "0",
                    background: isDark ? "rgba(12,12,12,0.97)" : "rgba(250,248,244,0.98)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(28,43,58,0.12)"}`,
                    borderRadius: "6px",
                    overflow: "hidden",
                    minWidth: "120px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                    zIndex: 200,
                  }}
                >
                  {langs.map((l, idx) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontFamily: F,
                        fontSize: "12px",
                        fontWeight: lang === l.code ? 700 : 500,
                        padding: "0.55rem 0.85rem",
                        background: lang === l.code ? "rgba(196,98,45,0.15)" : "transparent",
                        color: lang === l.code ? "#C4622D" : (isDark ? "rgba(255,255,255,0.75)" : "rgba(28,43,58,0.75)"),
                        border: "none",
                        borderBottom: idx < langs.length - 1 ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(28,43,58,0.08)"}` : "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ fontSize: "14px", width: "18px", textAlign: "center" }}>{l.label}</span>
                      <span>{l.full}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="القائمة"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-6 h-0.5 transition-all duration-300"
                  style={{
                    background: burgerColor,
                    transform:
                      i === 0 && menuOpen ? "rotate(45deg) translate(4px, 4px)" :
                      i === 2 && menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
                    opacity: i === 1 && menuOpen ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: menuOpen ? "800px" : "0", opacity: menuOpen ? 1 : 0 }}
        >
          <div
            className="flex flex-col pb-6 pt-2 border-t"
            style={{ borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(28,43,58,0.12)", background: "var(--surrah-page-bg)" }}
          >
            {navLinks.map((link) => {
              if (link.dropdown) {
                const items = link.dropdown === "communities" ? communities
                  : link.dropdown === "services" ? services
                  : link.dropdown === "media" ? mediaItems
                  : memberships;
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
                        color: navTextColor,
                        background: "none",
                        border: "none",
                        padding: "0.75rem 0.75rem 0.75rem 0",
                        borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(28,43,58,0.1)",
                        cursor: "pointer",
                        textAlign: isAr ? "right" : "left",
                      }}
                    >
                      {link.label}
                      <span style={{ fontSize: "10px", opacity: 0.5, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
                    </button>
                    {isExpanded && (
                      <div style={{ background: "rgba(255,255,255,0.02)", paddingRight: isAr ? "1rem" : "0", paddingLeft: isAr ? "0" : "1rem" }}>
                        {link.dropdown === "communities"
                          ? (items as typeof communities).map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.6rem 0.75rem", textDecoration: "none" }}
                            >
                              <img src={item.invertOnDark ? item.logoBlack : item.logoWhite} alt={item.label} style={{ height: "28px", width: "auto", objectFit: "contain", filter: item.invertOnDark ? "invert(1) brightness(2)" : "none" }} />
                            </Link>
                          ))
                          : (items as { href: string; label: string }[]).map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              style={{ display: "block", fontFamily: F, fontSize: "0.9rem", color: "var(--surrah-text-primary)", padding: "0.6rem 0.75rem", textDecoration: "none" }}
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
                    borderRight: isAr && location === link.href ? "3px solid #C4622D" : isAr ? "3px solid transparent" : "none",
                    borderLeft: !isAr && location === link.href ? "3px solid #C4622D" : !isAr ? "3px solid transparent" : "none",
                    paddingRight: isAr ? "0.75rem" : "0",
                    paddingLeft: isAr ? "0" : "0.75rem",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div style={{ marginTop: "1rem" }}>
              <Link href="/create-community" className="btn-surrah-primary" style={{ width: "100%", justifyContent: "center" }}>
                {t("nav.create_community")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
