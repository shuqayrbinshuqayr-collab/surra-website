/* ============================================================
   Home Page — سُرّة | SURRAH
   Brand Identity:
     - Hero: real event photo (Artboard1@2x) as full-bleed background
     - Colors: #1C2B3A (navy), #B5453A (terracotta), #F0EBE1 (cream)
     - Pattern: Wallpaper1 brand mark used as decorative element
     - Logo: official calligraphic image
   ============================================================ */

import { useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const teamMembers = [
  {
    name: "منصور باخلعة",
    role: "مؤسس ومنتج مجتمعات",
    org: "سُرّة",
    photo: "https://surrah.net/wp-content/uploads/%D9%85%D9%86%D8%B5%D9%88%D8%B1-%D8%A8%D8%A7%D8%AE%D9%84%D8%B9%D8%A9-2-768x768.webp",
  },
  {
    name: "م.معتز العبدالقادر",
    role: "الرئيس التنفيذي",
    org: "سُرّة",
    photo: "https://surrah.net/wp-content/uploads/%D9%85.%D9%85%D8%B9%D8%AA%D8%B2-%D8%A7%D9%84%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%82%D8%A7%D8%AF%D8%B1-1-768x768.webp",
  },
  {
    name: "محمد المصري",
    role: "نائب الرئيس للمنتجات والتسويق",
    org: "سُرّة",
    photo: "https://surrah.net/wp-content/uploads/%D9%85%D8%AD%D9%85%D8%AF-%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A-1-768x768.webp",
  },
  {
    name: "م. شقير بن شقير",
    role: "رئيس أنظمة المجتمعات",
    org: "سُرّة",
    photo: "https://surrah.net/wp-content/uploads/%D8%B4%D9%82%D9%8A%D8%B1-%D8%B1%D8%B4%D9%8A%D8%AF-%D8%A8%D9%86-%D8%B4%D9%82%D9%8A%D8%B1-1-768x768.webp",
  },
  {
    name: "عبدالرحمن النهدي",
    role: "مدير تقنية المعلومات",
    org: "سُرّة",
    photo: "https://surrah.net/wp-content/uploads/%D8%B9%D8%A8%D8%AF-%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86-%D8%A7%D9%84%D9%86%D9%87%D8%AF%D9%8A-2-768x768.webp",
  },
  {
    name: "أحمد فضل",
    role: "مدير إبداعي",
    org: "سُرّة",
    photo: "https://surrah.net/wp-content/uploads/%D8%A7%D8%AD%D9%85%D8%AF-%D9%81%D8%B6%D9%84-1-768x768.webp",
  },
  {
    name: "د.الهنوف الزنيتان",
    role: "مستشارة ومديرة تطوير الأعمال",
    org: "سُرّة",
    photo: "https://surrah.net/wp-content/uploads/%D8%AF.%D8%A7%D9%84%D9%87%D9%86%D9%88%D9%81-%D8%A7%D9%84%D8%B2%D9%86%D9%8A%D8%AA%D8%A7%D9%86-768x768.webp",
  },
  {
    name: "أحمد خليل",
    role: "مسؤول الانتاج الإعلامي",
    org: "سُرّة",
    photo: "https://surrah.net/wp-content/uploads/%D8%A7%D8%AD%D9%85%D8%AF-%D8%AE%D9%84%D9%8A%D9%84-1-768x768.webp",
  },
  {
    name: "أسماء الظافري",
    role: "منسقة فعاليات ومحتوى",
    org: "سُرّة",
    photo: "https://surrah.net/wp-content/uploads/%D8%A7%D8%B3%D9%85%D8%A7%D8%A1-%D8%A7%D9%84%D8%B8%D8%A7%D9%81%D8%B1%D9%8A-768x768.webp",
  },
  {
    name: "قتيبة تركستاني",
    role: "العلاقات العامة",
    org: "سُرّة",
    photo: "https://surrah.net/wp-content/uploads/%D9%82%D8%AA%D9%8A%D8%A8%D8%A9-%D8%AA%D8%B1%D9%83%D8%B3%D8%AA%D8%A7%D9%86%D9%8A-2-768x768.webp",
  },
  {
    name: "محمد بن محمد",
    role: "قائد تشغيل الفعاليات",
    org: "سُرّة",
    photo: "https://surrah.net/wp-content/uploads/%D9%85%D8%AD%D9%85%D8%AF-%D8%A8%D9%86-%D9%85%D8%AD%D9%85%D8%AF-1-768x768.webp",
  },
  {
    name: "معاذ الحازمي",
    role: "قائد الحوار - ثلوثية بصر",
    org: "بصر",
    photo: "https://surrah.net/wp-content/uploads/%D9%85%D8%B9%D8%A7%D8%B0-%D8%A7%D9%84%D8%AD%D8%A7%D8%B2%D9%85%D9%8A-1-768x768.webp",
  },
  {
    name: "أسامة فقيه",
    role: "قائد المجتمع",
    org: "مقام",
    photo: "https://surrah.net/wp-content/uploads/%D8%A7%D8%B3%D8%A7%D9%85%D8%A9-%D9%81%D9%82%D9%8A%D9%87-768x768.webp",
  },
  {
    name: "دلال العتيبي",
    role: "مدير العلاقات والشراكات",
    org: "سدى",
    photo: "https://surrah.net/wp-content/uploads/%D8%AF%D9%84%D8%A7%D9%84-%D8%A7%D9%84%D8%B9%D8%AA%D9%8A%D8%A8%D9%8A-1-768x768.webp",
  },
  {
    name: "عبدللطيف الثويني",
    role: "قائد منتج ثلوثية بصر",
    org: "بصر",
    photo: "https://surrah.net/wp-content/uploads/%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%D8%B7%D9%8A%D9%81-%D8%A7%D9%84%D8%AB%D9%88%D9%8A%D9%86%D9%8A-768x768.webp",
  },
];

const communities = [
  { name: "بصر", nameEn: "Basar", desc: "مجتمع يُعنى بالوعي البصري والفنون وقراءة الصورة والمعنى.", color: "#C4622D", logoWhite: "/manus-storage/Basar-White_7d406934.png" },
  { name: "صفر", nameEn: "Sifr", desc: "مساحة للبدايات والتجربة والأسئلة الأولى التي تصنع التحول.", color: "#c8c4bc", logoWhite: "/manus-storage/Sifr-Black_c3ab7e46.webp", invertLogo: true },
  { name: "سدى", nameEn: "Sada", desc: "مجتمع إبداعي نسائي يُبرز الصوت الأنثوي في الثقافة والفن والقيادة.", color: "#7B4F8E", logoWhite: "/manus-storage/Sudaa-White_d1defc89.png" },
  { name: "مدى", nameEn: "Mada", desc: "مجتمع للتفكير العميق والحوارات الهادئة وبناء الرؤية.", color: "#1C6B4A", logoWhite: "/manus-storage/Mada-White_c8cc9bc8.png" },
  { name: "مقام", nameEn: "Maqam", desc: "مجتمع يُعيد للسمع مكانته وللغته إحساسها وللصوت قدرته.", color: "#8B6914", logoWhite: "/manus-storage/Maqam-White_10f58ea8.png" },
  { name: "عُملة", nameEn: "Umlah", desc: "مجتمع لريادة الأعمال والاقتصاد الإبداعي.", color: "#c8c4bc", logoWhite: "/manus-storage/Umlah-Black_f8a8fa99.webp", invertLogo: true },
];

const whyPoints = [
  { num: "١", text: "لأن الأثر أطول من الحدث" },
  { num: "٢", text: "لأن الإنسان هو البداية" },
  { num: "٣", text: "لأن الاستدامة تُبنى من الداخل" },
];

export default function Home() {
  const pageRef = useReveal();

  return (
    <div ref={pageRef} style={{ background: "#000000", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Video background */}
        <video
          ref={(el) => {
            if (el) {
              el.muted = true;
              el.defaultMuted = true;
              el.play().catch(() => {});
            }
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <source src="/manus-storage/hero-bg_6887ae74.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to keep text readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.55)",
            zIndex: 1,
          }}
        />


        {/* Hero Content */}
        <div className="container" style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", width: "100%" }}>
          <div style={{ maxWidth: "900px", textAlign: "center" }}>

            <h1
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 200,
                fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                color: "#ffffff",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
                whiteSpace: "nowrap",
              }}
            >
              نصنع المجتمعات ونمنح الأفكار حياة
            </h1>
            <p
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 400,
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 2,
                maxWidth: "520px",
                marginBottom: "2.5rem",
                margin: "0 auto 2.5rem auto",
                textAlign: "center",
              }}
            >
              نصمم ونبني ونشغّل المجتمعات الثقافية والإبداعية التي تُحدث أثرًا مستدامًا
            </p>

          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            opacity: 0.5,
          }}
        >
          <div style={{ width: "1px", height: "48px", background: "#111111", animation: "pulse 2s infinite" }} />
        </div>
      </section>

      {/* ── WHY SECTION ── */}
      <section style={{ background: "#0a0a0a", padding: "6rem 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="surrah-divider" />
              <h2
                style={{
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: "#ffffff",
                  lineHeight: 1.3,
                  marginBottom: "1.5rem",
                }}
              >
                لماذا نصمم
                <br />
                <span style={{ color: "#C4622D" }}>المجتمعات؟</span>
              </h2>
              <p
                style={{
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "#ffffff",
                  lineHeight: 2,
                  maxWidth: "440px",
                }}
              >
                لأن المجتمعات لا تنشأ صدفة. هي تُصمَّم بوعي، تُبنى بعمق، وتُشغَّل باستدامة.
                سُرّة هي النقطة التي تنبثق منها الدوائر.
              </p>
              <Link href="/about" className="btn-surrah-outline" style={{ marginTop: "2rem", color: "#ffffff", borderColor: "#ffffff" }}>
                اعرف المزيد
              </Link>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.15s" }}>
              {whyPoints.map((p, i) => (
                <div
                  key={p.num}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.5rem",
                    padding: "1.5rem 0",
                    borderBottom: i < whyPoints.length - 1 ? "1px solid rgba(28, 43, 58, 0.08)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'ManchetteFine', sans-serif",
                      fontWeight: 800,
                      fontSize: "2.5rem",
                      color: "#ffffff",
                      lineHeight: 1,
                      minWidth: "3rem",
                      opacity: 0.4,
                    }}
                  >
                    {p.num}
                  </span>
                  <p
                    style={{
                      fontFamily: "'ManchetteFine', sans-serif",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      color: "#ffffff",
                      lineHeight: 1.6,
                      paddingTop: "0.5rem",
                    }}
                  >
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM SECTION (قادتنا) ── */}
      <section style={{ background: "#111111", padding: "6rem 0" }}>
        <style>{`
          .team-card img {
            filter: grayscale(1) contrast(1.05);
            transition: filter 0.45s ease;
          }
          .team-card:hover img {
            filter: grayscale(0) contrast(1);
          }
          .team-card .member-overlay {
            opacity: 0;
            transition: opacity 0.35s ease;
          }
          .team-card:hover .member-overlay {
            opacity: 1;
          }
        `}</style>
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3.5rem" }}>
            <div className="surrah-divider" />
            <h2
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                color: "#ffffff",
                marginBottom: "0.75rem",
              }}
            >
              قادتنا
            </h2>
            <p
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                fontSize: "1rem",
              }}
            >
              تعرف على الرواد الذين يقودون الابتكار الإبداعي في مجتمعات سُرّة
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "0",
            }}
          >
            {teamMembers.map((member, i) => (
              <div
                key={member.name}
                className="team-card reveal"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  transitionDelay: `${(i % 5) * 0.07}s`,
                  aspectRatio: "1 / 1",
                }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {/* Dark gradient overlay always visible at bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
                    zIndex: 1,
                  }}
                />
                {/* Member info always visible */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1rem",
                    zIndex: 2,
                    textAlign: "right",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'ManchetteFine', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                      color: "#ffffff",
                      marginBottom: "0.2rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="member-overlay"
                    style={{
                      fontFamily: "'ManchetteFine', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)",
                      color: "#C4622D",
                      lineHeight: 1.4,
                    }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITIES MARQUEE TICKER ── */}
      <section
        style={{
          background: "#000000",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
          padding: "1.5rem 0",
        }}
      >
        <style>{`
          @keyframes ticker-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-inner {
            display: flex;
            width: max-content;
            animation: ticker-scroll 30s linear infinite;
            will-change: transform;
          }
        `}</style>
        <div className="ticker-inner">
          {[...communities, ...communities, ...communities, ...communities, ...communities, ...communities].map((c, i) => (
            <Link
              key={i}
              href="/communities"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0 2.5rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <img
                src={c.logoWhite}
                alt={c.name}
                style={{
                  height: "clamp(28px, 3.5vw, 44px)",
                  width: "auto",
                  objectFit: "contain",
                  filter: (c as any).invertLogo ? "invert(1)" : "none",
                  opacity: 0.9,
                }}
              />
              <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "1.2rem", marginLeft: "2rem" }}>·</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── EVENTS GALLERY STRIP ── */}
      <section style={{ background: "#111111", padding: "0", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "420px" }}>
          <div
            style={{
              backgroundImage: "url('/manus-storage/Artboard2copy@2x_cbab6746.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "rgba(28, 43, 58, 0.4)" }} />
            <div style={{ position: "absolute", bottom: "2rem", right: "2rem", color: "#ffffff" }}>
              <p style={{ fontFamily: "'ManchetteFine', sans-serif", fontWeight: 700, fontSize: "1rem" }}>
                فعاليات حية
              </p>
              <p style={{ fontFamily: "'ManchetteFine', sans-serif", fontWeight: 400, fontSize: "0.85rem", opacity: 0.7 }}>
                تجارب ثقافية أصيلة
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundImage: "url('/manus-storage/Artboard1copy@2x_2c9b6cef.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "rgba(28, 43, 58, 0.35)" }} />
            <div style={{ position: "absolute", bottom: "2rem", right: "2rem", color: "#ffffff" }}>
              <p style={{ fontFamily: "'ManchetteFine', sans-serif", fontWeight: 700, fontSize: "1rem" }}>
                مؤتمرات وملتقيات
              </p>
              <p style={{ fontFamily: "'ManchetteFine', sans-serif", fontWeight: 400, fontSize: "0.85rem", opacity: 0.7 }}>
                الأثر الثقافي والاستثمار
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section
        style={{
          position: "relative",
              background: "#000000",
          padding: "6rem 0",
          overflow: "hidden",
        }}
      >
        {/* Brand pattern watermark */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            backgroundImage: "url('/manus-storage/Wallpaper1_a9f6821c.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.06,
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div className="reveal max-w-2xl mx-auto">
            <h2
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                color: "#ffffff",
                lineHeight: 1.3,
                marginBottom: "1.25rem",
              }}
            >
              نبني سرداً ثقافياً ملهماً
              <br />
              يعكس قيمنا الأصيلة
            </h2>
            <p
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 400,
                fontSize: "1rem",
                color: "rgba(250, 248, 244, 0.85)",
                lineHeight: 2,
                marginBottom: "2.5rem",
              }}
            >
              هل لديك فكرة تستحق أن تصبح مجتمعاً؟
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "#000000",
                  color: "#ffffff",
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  padding: "0.85rem 2.5rem",
                  border: "2px solid #ffffff",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#ffffff";
                  (e.currentTarget as HTMLElement).style.color = "#000000";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#000000";
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                }}
              >
                ابدأ الحديث معنا
              </Link>
              <Link
                href="/join"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "transparent",
                  color: "#ffffff",
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  padding: "0.85rem 2.5rem",
                  border: "2px solid #ffffff",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#ffffff";
                  (e.currentTarget as HTMLElement).style.background = "rgba(250, 248, 244, 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#ffffff";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                أنشئ مجتمعك
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
