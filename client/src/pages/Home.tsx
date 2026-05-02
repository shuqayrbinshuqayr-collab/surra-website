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
  const outerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = outerRef.current?.scrollLeft || 0;
    if (outerRef.current) outerRef.current.style.cursor = "grabbing";
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (outerRef.current) outerRef.current.scrollLeft = scrollLeft.current - dx;
  };
  const onPointerUp = () => {
    isDragging.current = false;
    if (outerRef.current) outerRef.current.style.cursor = "grab";
  };

  return (
    <section style={{ background: "#111111", padding: "5rem 0 0 0" }}>
      <style>{`
        .team-outer {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          cursor: grab;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          user-select: none;
        }
        .team-outer::-webkit-scrollbar { display: none; }
        .team-strip-inner {
          display: flex;
          flex-direction: row;
          width: max-content;
          gap: 4px;
        }
        .team-card-strip {
          position: relative;
          flex-shrink: 0;
          width: clamp(160px, 38vw, 230px);
          height: clamp(210px, 50vw, 310px);
          overflow: hidden;
        }
        .team-card-strip img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          filter: grayscale(1) contrast(1.05);
          transition: filter 0.45s ease;
          pointer-events: none;
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
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 55%, transparent 100%);
          z-index: 2;
          text-align: right;
        }
        .team-card-strip .team-name {
          font-family: 'ManchetteFine', sans-serif;
          font-weight: 700;
          font-size: clamp(0.7rem, 2vw, 0.9rem);
          color: #ffffff;
          margin-bottom: 0.2rem;
          line-height: 1.3;
        }
        .team-card-strip .team-role {
          font-family: 'ManchetteFine', sans-serif;
          font-weight: 400;
          font-size: clamp(0.58rem, 1.6vw, 0.72rem);
          color: #C4622D;
          line-height: 1.4;
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
        ref={outerRef}
        className="team-outer"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className="team-strip-inner">
          {teamMembersData.map((member, i) => (
            <div key={member.name} className="team-card-strip">
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

// ── UPCOMING EVENTS DATA ──
const communityLogos: Record<string, string> = {
  "بصر": "/manus-storage/Basar-White_7d406934.png",
  "صفر": "/manus-storage/Sifr-White_c3ab7e46.webp",
  "سدى": "/manus-storage/Sudaa-White_d1defc89.png",
  "مدى": "/manus-storage/Mada-White_c8cc9bc8.png",
  "مقام": "/manus-storage/Maqam-White_10f58ea8.png",
  "عُملة": "/manus-storage/Umlah-White_f8a8fa99.webp",
  "سُرّة": "/manus-storage/Surrah-White_308323ba.png",
};

type SurrahEvent = {
  id: number;
  title: string;
  description: string;
  date: string; // ISO string e.g. "2026-04-28"
  community: string;
  registerUrl: string;
  coverImage?: string;
};

const eventsData: SurrahEvent[] = [
  {
    id: 1,
    title: "ثلوثية بَصَر | كيف نقرأ قطاع الأفلام في السعودية؟",
    description: "لقاء يجمع صنّاع ومهتمين لفهم أعمق لقطاع الأفلام في المملكة. أمسية ثريّة بالحوار والإلهام لكل من يهتم بالفنون البصرية وصناعة المحتوى الإبداعي.",
    date: "2026-05-16",
    community: "بصر",
    registerUrl: "/register?event=thluthyat-basar",
  },
  {
    id: 2,
    title: "لقاء الكرييتفز 2 – مجتمع بصر",
    description: "يسرّ بَصَر مجتمع دعوتكم لحضور لقاء الكرييتيفز اللقاء الشهري الذي يجمع المبدعين وصُنّاع الفنون البصرية في أمسية ثريّة بالحوار والإلهام.",
    date: "2025-12-27",
    community: "بصر",
    registerUrl: "#",
  },
];

function isExpired(dateStr: string): boolean {
  return new Date(dateStr) < new Date(new Date().toDateString());
}

function formatArabicDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  return `${d.getDate()} ${months[d.getMonth()]}، ${d.getFullYear()}`;
}

function UpcomingEvents() {
  return (
    <section
      style={{
        background: "#0a0a0a",
        padding: "5rem 0",
        direction: "rtl",
      }}
    >
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section Header */}
        <div style={{ textAlign: "right", marginBottom: "3rem" }}>
          <div style={{ width: "3rem", height: "2px", background: "#C4622D", marginBottom: "1rem", marginRight: "0" }} />
          <h2 style={{ fontFamily: "'ManchetteFine', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#ffffff", fontWeight: 700, marginBottom: "0.5rem" }}>
            الفعاليات القادمة
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", fontFamily: "'ManchetteFine', sans-serif" }}>
            تابع آخر فعاليات مجتمعات سُرّة وسجّل حضورك
          </p>
        </div>

        {/* Event Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {eventsData.map((event) => {
            const expired = isExpired(event.date);
            const logo = communityLogos[event.community];
            return (
              <div
                key={event.id}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
                  opacity: expired ? 0.75 : 1,
                }}
              >
                {/* Top row: community tag + logo */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div
                    style={{
                      background: "#C4622D",
                      color: "#ffffff",
                      borderRadius: "8px",
                      padding: "0.25rem 0.75rem",
                      fontSize: "0.8rem",
                      fontFamily: "'ManchetteFine', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {event.community}
                  </div>
                  {logo && (
                    <div
                      style={{
                        background: "#111111",
                        borderRadius: "10px",
                        padding: "0.4rem 0.75rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={logo}
                        alt={event.community}
                        style={{ height: "28px", width: "auto", objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'ManchetteFine', sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#111111",
                    margin: 0,
                    textAlign: "right",
                  }}
                >
                  {event.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'ManchetteFine', sans-serif",
                    fontSize: "0.88rem",
                    color: "#555555",
                    lineHeight: 1.7,
                    margin: 0,
                    textAlign: "right",
                  }}
                >
                  {event.description}
                </p>

                {/* Bottom row: date + button */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#777777", fontSize: "0.85rem", fontFamily: "'ManchetteFine', sans-serif" }}>
                    <span>📅</span>
                    <span>{formatArabicDate(event.date)}</span>
                  </div>
                  {expired ? (
                    <div
                      style={{
                        border: "1.5px solid #C4622D",
                        color: "#C4622D",
                        borderRadius: "8px",
                        padding: "0.35rem 1rem",
                        fontSize: "0.82rem",
                        fontFamily: "'ManchetteFine', sans-serif",
                        fontWeight: 600,
                        cursor: "default",
                      }}
                    >
                      EXPIRED!
                    </div>
                  ) : (
                    <a
                      href="/register"
                      style={{
                        background: "#C4622D",
                        color: "#ffffff",
                        borderRadius: "8px",
                        padding: "0.45rem 1.25rem",
                        fontSize: "0.88rem",
                        fontFamily: "'ManchetteFine', sans-serif",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "background 0.2s",
                      }}
                    >
                      حضور
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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

      {/* ── UPCOMING EVENTS SECTION ── */}
      <UpcomingEvents />

      {/* ── PARTNERS SECTION ── */}
      <section
        style={{
          background: "#0a0a0a",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "4rem 0",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          {/* Section Header */}
          <div style={{ textAlign: "right", marginBottom: "3rem" }}>
            <div style={{ width: "3rem", height: "3px", background: "#C4622D", marginLeft: "auto", marginBottom: "1rem" }} />
            <h2
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                color: "#ffffff",
                margin: 0,
                letterSpacing: 0,
              }}
            >
              شركاؤنا
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.95rem",
                marginTop: "0.5rem",
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              }}
            >
              الجهات الداعمة لمجتمعات سُرّة
            </p>
          </div>

          {/* Partners Grid - placeholders */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {[
              { name: "شريك 1" },
              { name: "شريك 2" },
              { name: "شريك 3" },
              { name: "شريك 4" },
              { name: "شريك 5" },
              { name: "شريك 6" },
            ].map((partner, i) => (
              <div
                key={i}
                style={{
                  width: "160px",
                  height: "80px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.3s, background 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(196,98,45,0.5)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(196,98,45,0.06)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "0.8rem",
                    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                    letterSpacing: 0,
                  }}
                >
                  {partner.name}
                </span>
              </div>
            ))}
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
