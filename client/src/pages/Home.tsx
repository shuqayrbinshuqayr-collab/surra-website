/* ============================================================
   Home Page — سُرّة | SURRAH
   Brand Identity:
     - Hero: real event photo (Artboard1@2x) as full-bleed background
     - Colors: #1C2B3A (navy), #B5453A (terracotta), #F0EBE1 (cream)
     - Pattern: Wallpaper1 brand mark used as decorative element
     - Logo: official calligraphic image
   ============================================================ */

import { useEffect, useRef, useCallback, useState } from "react";
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

function TeamStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const animPaused = useRef(false);

  // Pause CSS animation and enable manual drag
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = stripRef.current?.scrollLeft || 0;
    if (stripRef.current) stripRef.current.style.cursor = "grabbing";
    // pause the CSS animation by switching to manual scroll
    animPaused.current = true;
    if (stripRef.current) stripRef.current.style.animationPlayState = "paused";
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (stripRef.current) stripRef.current.scrollLeft = scrollLeft.current - dx;
  };
  const onPointerUp = () => {
    isDragging.current = false;
    if (stripRef.current) stripRef.current.style.cursor = "grab";
  };

  return (
    <section style={{ background: "#111111", padding: "5rem 0 0 0", overflow: "hidden" }}>
      <style>{`
        @keyframes team-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .team-outer {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          cursor: grab;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .team-outer::-webkit-scrollbar { display: none; }
        .team-strip-inner {
          display: flex;
          width: max-content;
          animation: team-scroll 60s linear infinite;
          will-change: transform;
        }
        .team-outer:hover .team-strip-inner,
        .team-outer:active .team-strip-inner {
          animation-play-state: paused;
        }
        .team-card-strip {
          position: relative;
          flex-shrink: 0;
          width: clamp(160px, 40vw, 240px);
          height: clamp(210px, 52vw, 320px);
          overflow: hidden;
          margin-right: 4px;
        }
        .team-card-strip img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(1) contrast(1.05);
          transition: filter 0.45s ease;
        }
        .team-card-strip:hover img {
          filter: grayscale(0) contrast(1);
        }
        .team-card-strip .team-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2.5rem 0.75rem 0.85rem 0.75rem;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 55%, transparent 100%);
          z-index: 2;
          text-align: right;
        }
        .team-card-strip .team-name {
          font-family: 'ManchetteFine', sans-serif;
          font-weight: 700;
          font-size: clamp(0.72rem, 2.2vw, 0.92rem);
          color: #ffffff;
          margin-bottom: 0.2rem;
          line-height: 1.3;
        }
        .team-card-strip .team-role {
          font-family: 'ManchetteFine', sans-serif;
          font-weight: 400;
          font-size: clamp(0.6rem, 1.8vw, 0.75rem);
          color: #C4622D;
          line-height: 1.4;
          opacity: 1;
        }
      `}</style>
      <div className="container" style={{ marginBottom: "2rem" }}>
        <div className="reveal">
          <div className="surrah-divider" />
          <h2 style={{ fontFamily: "'ManchetteFine', sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", color: "#ffffff", marginBottom: "0.5rem" }}>قادتنا</h2>
          <p style={{ fontFamily: "'ManchetteFine', sans-serif", fontWeight: 400, color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
            تعرف على الرواد الذين يقودون الابتكار الإبداعي في مجتمعات سُرّة
          </p>
        </div>
      </div>
      <div
        className="team-outer"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className="team-strip-inner">
          {[...teamMembersData, ...teamMembersData].map((member, i) => (
            <div key={`${member.name}-${i}`} className="team-card-strip">
              <img src={member.photo} alt={member.name} loading="lazy" />
              <div className="team-info">
                <p className="team-name">{member.name}</p>
                <p className="team-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const teamMembersData = [
  { name: "منصور باخلعة", role: "مؤسس ومنتج مجتمعات", org: "سُرّة", photo: "/manus-storage/mansour_5b9a1523.webp" },
  { name: "م.معتز العبدالقادر", role: "الرئيس التنفيذي", org: "سُرّة", photo: "/manus-storage/muataz_cfd76867.webp" },
  { name: "محمد المصري", role: "نائب الرئيس للمنتجات والتسويق", org: "سُرّة", photo: "/manus-storage/mohammed_masri_de3cae4f.webp" },
  { name: "م. شقير بن شقير", role: "رئيس أنظمة المجتمعات", org: "سُرّة", photo: "/manus-storage/shaqeer_325758dd.webp" },
  { name: "عبدالرحمن النهدي", role: "مدير تقنية المعلومات", org: "سُرّة", photo: "/manus-storage/abdulrahman_9d7e8050.webp" },
  { name: "أحمد فضل", role: "مدير إبداعي", org: "سُرّة", photo: "/manus-storage/ahmed_fadl_c95ffaf5.webp" },
  { name: "د.الهنوف الزنيتان", role: "مستشارة ومديرة تطوير الأعمال", org: "سُرّة", photo: "/manus-storage/hanoof_3d1e14e1.webp" },
  { name: "أحمد خليل", role: "مسؤول الانتاج الإعلامي", org: "سُرّة", photo: "/manus-storage/ahmed_khalil_6425d3c1.webp" },
  { name: "أسماء الظافري", role: "منسقة فعاليات ومحتوى", org: "سُرّة", photo: "/manus-storage/asmaa_57852354.webp" },
  { name: "قتيبة تركستاني", role: "العلاقات العامة", org: "سُرّة", photo: "/manus-storage/qatiba_13a158ce.webp" },
  { name: "محمد بن محمد", role: "قائد تشغيل الفعاليات", org: "سُرّة", photo: "/manus-storage/mohammed_bin_5ce8c1d3.webp" },
  { name: "معاذ الحازمي", role: "قائد الحوار - ثلوثية بصر", org: "بصر", photo: "/manus-storage/muadh_69c744aa.webp" },
  { name: "أسامة فقيه", role: "قائد المجتمع", org: "مقام", photo: "/manus-storage/osama_3d86dc7a.webp" },
  { name: "دلال العتيبي", role: "مدير العلاقات والشراكات", org: "سدى", photo: "/manus-storage/dalal_61bffb01.webp" },
  { name: "عبدللطيف الثويني", role: "قائد منتج ثلوثية بصر", org: "بصر", photo: "/manus-storage/abdullatif_9b8ca2b9.webp" },
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
                fontSize: "clamp(0.65rem, 2.8vw, 1.05rem)",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 2,
                maxWidth: "520px",
                marginBottom: "2.5rem",
                margin: "0 auto 2.5rem auto",
                textAlign: "center",
                whiteSpace: "nowrap",
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
      <TeamStrip />

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
