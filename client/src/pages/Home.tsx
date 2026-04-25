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

const services = [
  {
    num: "٠١",
    title: "صناعة المجتمعات",
    desc: "نصمم المجتمعات من الجذور لا من الواجهة. بناء هوية المجتمع، تحديد الفئة المستهدفة، الهيكلة والتنظيم، خطط التشغيل والاستدامة.",
    href: "/services#communities",
  },
  {
    num: "٠٢",
    title: "إنشاء البرامج الثقافية",
    desc: "نحول المحتوى إلى تجربة. برامج حوارية، سلاسل معرفية، تجارب ثقافية متخصصة.",
    href: "/services#programs",
  },
  {
    num: "٠٣",
    title: "تنظيم الفعاليات الحية",
    desc: "نصمم الفعالية كرحلة لا كموعد. تصميم التجربة، إدارة الحدث وتشغيله، إدارة الحضور، التوثيق.",
    href: "/services#events",
  },
  {
    num: "٠٤",
    title: "توفير الجمهور المستهدف",
    desc: "نوصل الرسالة إلى من يهمه سماعها. بناء مجتمعات متخصصة، إدارة قواعد الجمهور، ربط العلامات التجارية بجمهورها الحقيقي.",
    href: "/services#audience",
  },
];

const communities = [
  { name: "بصر", nameEn: "Basar", desc: "مجتمع يُعنى بالوعي البصري والفنون وقراءة الصورة والمعنى.", color: "#C4622D" },
  { name: "صفر", nameEn: "Sifr", desc: "مساحة للبدايات والتجربة والأسئلة الأولى التي تصنع التحول.", color: "#c8c4bc" },
  { name: "سدى", nameEn: "Sada", desc: "مجتمع إبداعي نسائي يُبرز الصوت الأنثوي في الثقافة والفن والقيادة.", color: "#7B4F8E" },
  { name: "مدى", nameEn: "Mada", desc: "مجتمع للتفكير العميق والحوارات الهادئة وبناء الرؤية.", color: "#1C6B4A" },
  { name: "مقام", nameEn: "Maqam", desc: "مجتمع يُعيد للسمع مكانته وللغته إحساسها وللصوت قدرته.", color: "#8B6914" },
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
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "120px", paddingBottom: "80px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ maxWidth: "680px", textAlign: "center" }}>

            <h1
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 200,
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                color: "#ffffff",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
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

      {/* ── SERVICES SECTION ── */}
      <section style={{ background: "#111111", padding: "6rem 0" }}>
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
              خدماتنا
            </h2>
            <p
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 400,
                color: "#ffffff",
                fontSize: "1rem",
              }}
            >
              نرافقك من الفكرة حتى الاستدامة
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {services.map((s, i) => (
              <Link
                key={s.num}
                href={s.href}
                className="reveal"
                style={{
                  display: "block",
                  padding: "2.5rem",
                  background: i % 2 === 0 ? "#000000" : "#0a0a0a",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: i % 2 === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                  transition: "background 0.25s ease",
                  transitionDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#111111")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "#000000" : "#0a0a0a")}
              >
                <span
                  style={{
                    fontFamily: "'ManchetteFine', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    color: "#ffffff",
                    letterSpacing: "0.15em",
                    display: "block",
                    marginBottom: "1rem",
                  }}
                >
                  {s.num}
                </span>
                <h3
                  style={{
                    fontFamily: "'ManchetteFine', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "#ffffff",
                    marginBottom: "0.75rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'ManchetteFine', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    color: "#ffffff",
                    lineHeight: 1.9,
                  }}
                >
                  {s.desc}
                </p>
              </Link>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: "2.5rem", textAlign: "center" }}>
            <Link href="/services" className="btn-surrah-primary">
              استكشف خدماتنا
            </Link>
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
                gap: "0.75rem",
                padding: "0 2.5rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  color: c.color,
                  letterSpacing: "0.02em",
                }}
              >
                {c.name}
              </span>
              <span
                style={{
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {c.nameEn}
              </span>
              <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "1.2rem", marginLeft: "0.5rem" }}>·</span>
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
