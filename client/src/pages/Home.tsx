/* ============================================================
   Home Page — سُرّة | SURRAH
   Brand Identity:
     - Hero: real event photo (Artboard1@2x) as full-bleed background
     - Colors: #1C2B3A (navy), #B5453A (terracotta), #F0EBE1 (cream)
     - Pattern: Wallpaper1 brand mark used as decorative element
     - Logo: official calligraphic image
   ============================================================ */

import { useEffect, useRef } from "react";
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
  { name: "بصر", nameEn: "Basar", desc: "مجتمع يُعنى بالوعي البصري والفنون وقراءة الصورة والمعنى.", color: "#B5453A" },
  { name: "صفر", nameEn: "Sifr", desc: "مساحة للبدايات والتجربة والأسئلة الأولى التي تصنع التحول.", color: "#27486A" },
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
    <div ref={pageRef} style={{ background: "#FAF8F4", minHeight: "100vh" }}>
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
        {/* Solid black background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#000000",
          }}
        />
        {/* Brand pattern overlay (Wallpaper1 — geometric mark) */}
        <div
          style={{
            position: "absolute",
            left: "-60px",
            bottom: "-40px",
            width: "380px",
            height: "380px",
            backgroundImage: "url('/manus-storage/Wallpaper1_a9f6821c.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom left",
            opacity: 0.06,
          }}
        />

        {/* Hero Content */}
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "120px", paddingBottom: "80px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ maxWidth: "680px", textAlign: "center" }}>

            <h1
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                color: "#FAF8F4",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
              نصنع المجتمعات
              <br />
              <span style={{ color: "#F0EBE1", fontWeight: 700 }}>ونمنح الأفكار حياة</span>
            </h1>
            <p
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 400,
                fontSize: "1.05rem",
                color: "rgba(240, 235, 225, 0.8)",
                lineHeight: 2,
                maxWidth: "520px",
                marginBottom: "2.5rem",
              }}
            >
              تصميم وبناء وتشغيل المجتمعات الثقافية والإبداعية ذات الأثر المستدام.
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
          <div style={{ width: "1px", height: "48px", background: "#F0EBE1", animation: "pulse 2s infinite" }} />
        </div>
      </section>

      {/* ── WHY SECTION ── */}
      <section style={{ background: "#FAF8F4", padding: "6rem 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="surrah-divider" />
              <h2
                style={{
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: "#1C2B3A",
                  lineHeight: 1.3,
                  marginBottom: "1.5rem",
                }}
              >
                لماذا نصمم
                <br />
                <span style={{ color: "#B5453A" }}>المجتمعات؟</span>
              </h2>
              <p
                style={{
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "#5A6A7A",
                  lineHeight: 2,
                  maxWidth: "440px",
                }}
              >
                لأن المجتمعات لا تنشأ صدفة. هي تُصمَّم بوعي، تُبنى بعمق، وتُشغَّل باستدامة.
                سُرّة هي النقطة التي تنبثق منها الدوائر.
              </p>
              <Link href="/about" className="btn-surrah-outline" style={{ marginTop: "2rem" }}>
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
                      color: "#B5453A",
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
                      color: "#1C2B3A",
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
      <section style={{ background: "#F0EBE1", padding: "6rem 0" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3.5rem" }}>
            <div className="surrah-divider" />
            <h2
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                color: "#1C2B3A",
                marginBottom: "0.75rem",
              }}
            >
              خدماتنا
            </h2>
            <p
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 400,
                color: "#5A6A7A",
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
                  background: i % 2 === 0 ? "#FFFFFF" : "#F8F4EE",
                  borderBottom: "1px solid rgba(28, 43, 58, 0.08)",
                  borderLeft: i % 2 === 0 ? "none" : "1px solid rgba(28, 43, 58, 0.08)",
                  textDecoration: "none",
                  transition: "background 0.25s ease",
                  transitionDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#EDE8E0")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "#FFFFFF" : "#F8F4EE")}
              >
                <span
                  style={{
                    fontFamily: "'ManchetteFine', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    color: "#B5453A",
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
                    color: "#1C2B3A",
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
                    color: "#5A6A7A",
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

      {/* ── COMMUNITIES SECTION ── */}
      <section style={{ background: "#FAF8F4", padding: "6rem 0" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3.5rem" }}>
            <div className="surrah-divider" />
            <h2
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                color: "#1C2B3A",
                marginBottom: "0.75rem",
              }}
            >
              مجتمعاتنا
            </h2>
            <p
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 400,
                color: "#5A6A7A",
                fontSize: "1rem",
                maxWidth: "500px",
              }}
            >
              تضم سُرّة تحت مظلتها مجتمعات مستقلة، لكل منها هويتها وتجربتها، وتجمعها فلسفة واحدة: العمق.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
            {communities.map((c, i) => (
              <Link
                key={c.name}
                href="/communities"
                className="reveal"
                style={{
                  display: "block",
                  padding: "2rem 1.5rem",
                  background: "#FFFFFF",
                  borderLeft: `3px solid ${c.color}`,
                  borderBottom: "1px solid rgba(28, 43, 58, 0.06)",
                  borderRight: "1px solid rgba(28, 43, 58, 0.06)",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  transitionDelay: `${i * 0.08}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#F8F4EE";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#FFFFFF";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <h3
                  style={{
                    fontFamily: "'ManchetteFine', sans-serif",
                    fontWeight: 900,
                    fontSize: "1.8rem",
                    color: c.color,
                    marginBottom: "0.25rem",
                  }}
                >
                  {c.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'ManchetteFine', sans-serif",
                    fontSize: "0.7rem",
                    color: "#9AAABB",
                    letterSpacing: "0.12em",
                    marginBottom: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  {c.nameEn}
                </p>
                <p
                  style={{
                    fontFamily: "'ManchetteFine', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.82rem",
                    color: "#5A6A7A",
                    lineHeight: 1.8,
                  }}
                >
                  {c.desc}
                </p>
              </Link>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: "2.5rem", textAlign: "center" }}>
            <Link href="/communities" className="btn-surrah-outline">
              تعرّف على مجتمعاتنا
            </Link>
          </div>
        </div>
      </section>

      {/* ── EVENTS GALLERY STRIP ── */}
      <section style={{ background: "#1C2B3A", padding: "0", overflow: "hidden" }}>
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
            <div style={{ position: "absolute", bottom: "2rem", right: "2rem", color: "#FAF8F4" }}>
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
            <div style={{ position: "absolute", bottom: "2rem", right: "2rem", color: "#FAF8F4" }}>
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
          background: "#B5453A",
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
                color: "#FAF8F4",
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
                  background: "#FAF8F4",
                  color: "#B5453A",
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  padding: "0.85rem 2.5rem",
                  border: "2px solid #FAF8F4",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#FAF8F4";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#FAF8F4";
                  (e.currentTarget as HTMLElement).style.color = "#B5453A";
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
                  color: "#FAF8F4",
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  padding: "0.85rem 2.5rem",
                  border: "2px solid rgba(250, 248, 244, 0.5)",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#FAF8F4";
                  (e.currentTarget as HTMLElement).style.background = "rgba(250, 248, 244, 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(250, 248, 244, 0.5)";
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
