/* ============================================================
   Footer Component — سُرّة | Multilingual + Theme-aware
   ============================================================ */
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const fontBase = "'ManchetteFine', sans-serif";

const footerLinksData = {
  ar: {
    about: { title: "من نحن", links: [{ href: "/about", label: "من نحن" }, { href: "/about#vision", label: "رؤيتنا" }, { href: "/about#mission", label: "رسالتنا" }, { href: "/about#values", label: "قيمنا" }] },
    services: { title: "خدماتنا", links: [{ href: "/services#communities", label: "صناعة المجتمعات" }, { href: "/services#programs", label: "البرامج الثقافية" }, { href: "/services#events", label: "تنظيم الفعاليات" }, { href: "/services#audience", label: "توفير الجمهور" }] },
    communities: { title: "مجتمعاتنا", links: [{ href: "/communities/basar", label: "بصر" }, { href: "/communities/sifr", label: "صفر" }, { href: "/communities/sada", label: "سدى" }, { href: "/communities/mada", label: "مدى" }, { href: "/communities/maqam", label: "مقام" }] },
    quickLinks: { title: "روابط سريعة", links: [{ href: "/join", label: "انضم إلينا" }, { href: "/directory", label: "دليل سُرّة" }, { href: "/store", label: "المتجر" }, { href: "/contact", label: "تواصل معنا" }] },
    tagline: "كيان سعودي متخصص في تصميم وبناء وتشغيل المجتمعات الثقافية والإبداعية. نصنع المجتمعات ونمنح الأفكار حياة.",
    copyright: "جميع الحقوق محفوظة لسُرّة الثقافية © 2025 صُنع بحب في الدرعية",
  },
  en: {
    about: { title: "About", links: [{ href: "/about", label: "About Us" }, { href: "/about#vision", label: "Our Vision" }, { href: "/about#mission", label: "Our Mission" }, { href: "/about#values", label: "Our Values" }] },
    services: { title: "Services", links: [{ href: "/services#communities", label: "Community Building" }, { href: "/services#programs", label: "Cultural Programs" }, { href: "/services#events", label: "Event Management" }, { href: "/services#audience", label: "Audience Development" }] },
    communities: { title: "Communities", links: [{ href: "/communities/basar", label: "Basar" }, { href: "/communities/sifr", label: "Sifr" }, { href: "/communities/sada", label: "Sada" }, { href: "/communities/mada", label: "Mada" }, { href: "/communities/maqam", label: "Maqam" }] },
    quickLinks: { title: "Quick Links", links: [{ href: "/join", label: "Join Us" }, { href: "/directory", label: "Surra Directory" }, { href: "/store", label: "Store" }, { href: "/contact", label: "Contact Us" }] },
    tagline: "A Saudi entity specialized in designing, building, and operating cultural and creative communities. We build communities and give ideas life.",
    copyright: "All rights reserved to Surra Cultural © 2025 Made with love in Diriyah",
  },
  zh: {
    about: { title: "关于我们", links: [{ href: "/about", label: "关于我们" }, { href: "/about#vision", label: "我们的愿景" }, { href: "/about#mission", label: "我们的使命" }, { href: "/about#values", label: "我们的价值观" }] },
    services: { title: "服务", links: [{ href: "/services#communities", label: "社区建设" }, { href: "/services#programs", label: "文化项目" }, { href: "/services#events", label: "活动管理" }, { href: "/services#audience", label: "受众发展" }] },
    communities: { title: "社区", links: [{ href: "/communities/basar", label: "巴萨尔" }, { href: "/communities/sifr", label: "希弗尔" }, { href: "/communities/sada", label: "萨达" }, { href: "/communities/mada", label: "马达" }, { href: "/communities/maqam", label: "马卡姆" }] },
    quickLinks: { title: "快速链接", links: [{ href: "/join", label: "加入我们" }, { href: "/directory", label: "苏拉目录" }, { href: "/store", label: "商店" }, { href: "/contact", label: "联系我们" }] },
    tagline: "沙特实体，专注于设计、建设和运营文化和创意社区。我们建设社区，赋予想法生命。",
    copyright: "版权所有 © 2025 苏拉文化 在迪里耶制作",
  },
};

const socialLinks = [
  { href: "https://x.com/SurrahComm", label: "X", icon: "𝕏" },
  { href: "https://www.instagram.com/surrah.comm/", label: "Instagram", icon: "◎" },
  { href: "https://www.linkedin.com/company/surrah-comm", label: "LinkedIn", icon: "in" },
];

export default function Footer() {
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const isDark = theme === "dark";

  const linkColor = isDark ? "rgba(255,255,255,0.65)" : "rgba(28,43,58,0.65)";
  const mutedColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(28,43,58,0.45)";
  const borderColor = isDark ? "rgba(240,235,225,0.1)" : "rgba(28,43,58,0.1)";
  const socialBorder = isDark ? "rgba(255,255,255,0.25)" : "rgba(28,43,58,0.25)";
  const logoSrc = isDark
    ? "/manus-storage/Surrah-White_c79141b5.png"
    : "/manus-storage/Surrah-Black_2341eb6c.png";

  const data = footerLinksData[lang] || footerLinksData.ar;

  return (
    <footer style={{ background: "var(--surrah-page-bg)", borderTop: `1px solid ${borderColor}` }}>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <img src={logoSrc} alt="سُرّة SURRAH" style={{ height: "42px", width: "auto", objectFit: "contain", marginBottom: "1rem", display: "block" }} />
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: linkColor, fontFamily: fontBase, fontWeight: 400, lineHeight: "1.8" }}>
              {data.tagline}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center text-sm transition-all duration-200"
                  style={{ border: `1px solid ${socialBorder}`, color: linkColor, fontFamily: fontBase }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#C4622D"; (e.currentTarget as HTMLElement).style.color = "#C4622D"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = socialBorder; (e.currentTarget as HTMLElement).style.color = linkColor; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* About Links */}
          <div>
            <h4 className="mb-5" style={{ color: "#C4622D", fontFamily: fontBase, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.05em" }}>{data.about.title}</h4>
            <ul className="space-y-3">
              {data.about.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors duration-200"
                    style={{ color: linkColor, fontFamily: fontBase, fontWeight: 400 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C4622D"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = linkColor; }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="mb-5" style={{ color: "#C4622D", fontFamily: fontBase, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.05em" }}>{data.services.title}</h4>
            <ul className="space-y-3">
              {data.services.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors duration-200"
                    style={{ color: linkColor, fontFamily: fontBase, fontWeight: 400 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C4622D"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = linkColor; }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Communities Links */}
          <div>
            <h4 className="mb-5" style={{ color: "#C4622D", fontFamily: fontBase, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.05em" }}>{data.communities.title}</h4>
            <ul className="space-y-3">
              {data.communities.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors duration-200"
                    style={{ color: linkColor, fontFamily: fontBase, fontWeight: 400 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C4622D"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = linkColor; }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: `1px solid ${borderColor}` }}>
          <p className="text-xs" style={{ color: mutedColor, fontFamily: fontBase, fontWeight: 400 }}>
            {data.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
