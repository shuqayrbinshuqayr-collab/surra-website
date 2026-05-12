/* ============================================================
   Footer Component — سُرّة
   Font: ManchetteFine
     - Brand name: weight 900 (Black)
     - Section headings: weight 700 (Bold)
     - Links & body: weight 400 (Regular)
     - Copyright: weight 400 (Regular)
   ============================================================ */

import { Link } from "wouter";

const footerLinks = {
  about: [
    { href: "/about", label: "من نحن" },
    { href: "/about#vision", label: "رؤيتنا" },
    { href: "/about#mission", label: "رسالتنا" },
    { href: "/about#values", label: "قيمنا" },
  ],
  services: [
    { href: "/services#communities", label: "صناعة المجتمعات" },
    { href: "/services#programs", label: "البرامج الثقافية" },
    { href: "/services#events", label: "تنظيم الفعاليات" },
    { href: "/services#audience", label: "توفير الجمهور" },
  ],
  communities: [
    { href: "/communities/basar", label: "بصر" },
    { href: "/communities/sifr", label: "صفر" },
    { href: "/communities/sada", label: "سدى" },
    { href: "/communities/mada", label: "مدى" },
    { href: "/communities/maqam", label: "مقام" },
  ],
  quickLinks: [
    { href: "/join", label: "انضم إلينا" },
    { href: "/directory", label: "دليل سُرّة" },
    { href: "/store", label: "المتجر" },
    { href: "/contact", label: "تواصل معنا" },
  ],
};

const socialLinks = [
  { href: "https://x.com/SurrahComm", label: "X (تويتر)", icon: "𝕏" },
  { href: "https://www.instagram.com/surrah.comm/", label: "إنستجرام", icon: "◎" },
  { href: "https://www.linkedin.com/company/surrah-comm", label: "لينكدإن", icon: "in" },
];

const fontBase = "'ManchetteFine', sans-serif";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--surrah-page-bg)",
        borderTop: "1px solid rgba(240, 235, 225, 0.1)",
      }}
    >
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <img
                src="/manus-storage/Surrah-White_c79141b5.png"
                alt="سُرّة SURRAH"
                style={{ height: "42px", width: "auto", objectFit: "contain", marginBottom: "1rem", display: "block" }}
              />
            </Link>
            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: fontBase,
                fontWeight: 400,
                lineHeight: "1.8",
              }}
            >
              كيان سعودي متخصص في تصميم وبناء وتشغيل المجتمعات الثقافية والإبداعية. نصنع المجتمعات ونمنح الأفكار حياة.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center text-sm transition-all duration-200"
                  style={{
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: fontBase,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#C4622D";
                    (e.currentTarget as HTMLElement).style.color = "#C4622D";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* About Links */}
          <div>
            <h4
              className="mb-5"
              style={{
                color: "#C4622D",
                fontFamily: fontBase,
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.05em",
              }}
            >
              من نحن
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontFamily: fontBase,
                      fontWeight: 400,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#C4622D";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4
              className="mb-5"
              style={{
                color: "#C4622D",
                fontFamily: fontBase,
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.05em",
              }}
            >
              خدماتنا
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontFamily: fontBase,
                      fontWeight: 400,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#C4622D";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Communities Links */}
          <div>
            <h4
              className="mb-5"
              style={{
                color: "#C4622D",
                fontFamily: fontBase,
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.05em",
              }}
            >
              مجتمعاتنا
            </h4>
            <ul className="space-y-3">
              {footerLinks.communities.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontFamily: fontBase,
                      fontWeight: 400,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#C4622D";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Quick Links */}
          <div>
            <h4
              className="mb-5"
              style={{
                color: "#C4622D",
                fontFamily: fontBase,
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.05em",
              }}
            >
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontFamily: fontBase,
                      fontWeight: 400,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#C4622D";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex items-center justify-between flex-wrap gap-4"
          style={{ borderTop: "1px solid rgba(240, 235, 225, 0.1)" }}
        >
          <p
            className="text-xs"
            style={{
              color: "rgba(255,255,255,0.45)",
              fontFamily: fontBase,
              fontWeight: 400,
            }}
          >
            جميع الحقوق محفوظة لسُرّة الثقافية © 2025 صُنع بحب في الدرعية
          </p>
        </div>
      </div>
    </footer>
  );
}
