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
import { useLanguage } from "@/contexts/LanguageContext";

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
    <section style={{ background: "var(--surrah-section-alt)", padding: "5rem 0 0 0" }}>
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
          <h2 style={{ fontFamily: "'ManchetteFine', sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", color: "var(--surrah-text-primary)", marginBottom: "0.5rem" }}>قادتنا</h2>
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
  { name: "بصر", nameEn: "Basar", desc: "مجتمع يُعنى بالوعي البصري والفنون وقراءة الصورة والمعنى.", color: "#C4622D", logoWhite: "/manus-storage/Basar-White_7d406934.png", slug: "basar" },
  { name: "صفر", nameEn: "Sifr", desc: "مساحة للبدايات والتجربة والأسئلة الأولى التي تصنع التحول.", color: "#c8c4bc", logoWhite: "/manus-storage/Sifr-Black_c3ab7e46.webp", invertLogo: true, slug: "sifr" },
  { name: "سدى", nameEn: "Sada", desc: "مجتمع إبداعي نسائي يُبرز الصوت الأنثوي في الثقافة والفن والقيادة.", color: "#7B4F8E", logoWhite: "/manus-storage/Sudaa-White_d1defc89.png", slug: "sada" },
  { name: "مدى", nameEn: "Mada", desc: "مجتمع للتفكير العميق والحوارات الهادئة وبناء الرؤية.", color: "#1C6B4A", logoWhite: "/manus-storage/Mada-White_c8cc9bc8.png", slug: "mada" },
  { name: "مقام", nameEn: "Maqam", desc: "مجتمع يُعيد للسمع مكانته وللغته إحساسها وللصوت قدرته.", color: "#8B6914", logoWhite: "/manus-storage/Maqam-White_10f58ea8.png", slug: "maqam" },
  { name: "عُملة", nameEn: "Umlah", desc: "مجتمع لريادة الأعمال والاقتصاد الإبداعي.", color: "#C9A84C", logoWhite: "/manus-storage/Umlah-White_96823e55.png", slug: "umla" },
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
  "عُملة": "/manus-storage/Umlah-White_96823e55.png",
  "سُرّة": "/manus-storage/Surrah-White_308323ba.png",
};

type SurrahEvent = {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  date: string;
  location: string;
  locationEn: string;
  community: string;
  communityEn: string;
  communitySlug: string;
  communityColor: string;
  type: string;
  typeEn: string;
  registerUrl: string;
};

const eventsData: SurrahEvent[] = [
  {
    id: 1,
    title: "ثلوثية بَصَر | كيف نقرأ قطاع الأفلام في السعودية؟",
    titleEn: "Basar Thursday | How Do We Read the Film Sector in Saudi Arabia?",
    description: "لقاء يجمع صنّاع ومهتمين لفهم أعمق لقطاع الأفلام في المملكة. أمسية ثريّة بالحوار والإلهام لكل من يهتم بالفنون البصرية.",
    descriptionEn: "A gathering of filmmakers and enthusiasts for a deeper understanding of the film sector in the Kingdom. An evening rich with dialogue and inspiration.",
    date: "2026-06-12",
    location: "الرياض — الدرعية",
    locationEn: "Riyadh — Diriyah",
    community: "بصر",
    communityEn: "Basar",
    communitySlug: "basar",
    communityColor: "#C4622D",
    type: "جلسة نقدية",
    typeEn: "Critique Session",
    registerUrl: "/register?event=thluthyat-basar",
  },
  {
    id: 2,
    title: "سُدى القياديات — الجلسة الثالثة",
    titleEn: "Sada Leaders — Third Session",
    description: "جلسة حوارية مع قياديات بارزات حول موضوع 'القيادة الهادئة وصناعة التأثير'. مساحة آمنة للنقاش والإلهام المتبادل.",
    descriptionEn: "A dialogue session with prominent leaders on 'Quiet Leadership and Creating Impact'. A safe space for discussion and mutual inspiration.",
    date: "2026-06-20",
    location: "الرياض",
    locationEn: "Riyadh",
    community: "سدى",
    communityEn: "Sada",
    communitySlug: "sada",
    communityColor: "#7B4F8E",
    type: "جلسة حوارية",
    typeEn: "Dialogue Session",
    registerUrl: "/register?event=sada-leaders-3",
  },
  {
    id: 3,
    title: "عُملة | الوعي المالي للمبتدئين",
    titleEn: "Umlah | Financial Literacy for Beginners",
    description: "ورشة عملية تُعرّف بأساسيات الاستثمار وإدارة الثروة الشخصية. مناسبة لمن يريد أن يبدأ رحلته المالية بخطوات واثقة.",
    descriptionEn: "A practical workshop introducing the basics of investment and personal wealth management. Suitable for those starting their financial journey.",
    date: "2026-07-05",
    location: "جدة",
    locationEn: "Jeddah",
    community: "عُملة",
    communityEn: "Umlah",
    communitySlug: "umla",
    communityColor: "#D4AF37",
    type: "ورشة عمل",
    typeEn: "Workshop",
    registerUrl: "/register?event=umlah-financial-1",
  },
  {
    id: 4,
    title: "مقام | ليلة الصوت السعودي",
    titleEn: "Maqam | Saudi Sound Night",
    description: "أمسية موسيقية تجمع أصوات سعودية مميزة في تجربة سمعية فريدة. احتفاء بالموسيقى السعودية المعاصرة وتراثها الغني.",
    descriptionEn: "A musical evening bringing together distinctive Saudi voices in a unique auditory experience. A celebration of contemporary Saudi music and its rich heritage.",
    date: "2026-07-18",
    location: "الرياض — مسرح المدينة",
    locationEn: "Riyadh — City Theater",
    community: "مقام",
    communityEn: "Maqam",
    communitySlug: "maqam",
    communityColor: "#8B6914",
    type: "أمسية موسيقية",
    typeEn: "Musical Evening",
    registerUrl: "/register?event=maqam-sound-night",
  },
  {
    id: 5,
    title: "صفر | لقاء المبتدئين في التقنية",
    titleEn: "Sifr | Tech Beginners Meetup",
    description: "لقاء شهري يجمع المبتدئين في مجالات البرمجة والتصميم والتقنية. بيئة داعمة لتبادل التجارب والأسئلة الأولى.",
    descriptionEn: "A monthly meetup bringing together beginners in programming, design, and technology. A supportive environment for sharing experiences and first questions.",
    date: "2026-07-25",
    location: "أونلاين",
    locationEn: "Online",
    community: "صفر",
    communityEn: "Sifr",
    communitySlug: "sifr",
    communityColor: "#9CA3AF",
    type: "لقاء شهري",
    typeEn: "Monthly Meetup",
    registerUrl: "/register?event=sifr-beginners-meetup",
  },
  {
    id: 6,
    title: "مدى | جلسة التفكير العميق",
    titleEn: "Mada | Deep Thinking Session",
    description: "جلسة تأملية هادئة تستكشف أسئلة الوجود والمعنى والرؤية. لمن يؤمن أن التغيير يبدأ من الداخل.",
    descriptionEn: "A quiet contemplative session exploring questions of existence, meaning, and vision. For those who believe change starts from within.",
    date: "2026-08-10",
    location: "الرياض",
    locationEn: "Riyadh",
    community: "مدى",
    communityEn: "Mada",
    communitySlug: "mada",
    communityColor: "#1C6B4A",
    type: "جلسة تأملية",
    typeEn: "Contemplative Session",
    registerUrl: "/register?event=mada-deep-thinking",
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
  const { lang } = useLanguage();
  const isAr = lang !== "en";
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: isAr ? "الكل" : "All", color: "#C4622D" },
    { id: "basar", label: isAr ? "بصر" : "Basar", color: "#C4622D" },
    { id: "sada", label: isAr ? "سدى" : "Sada", color: "#7B4F8E" },
    { id: "umla", label: isAr ? "عُملة" : "Umlah", color: "#D4AF37" },
    { id: "maqam", label: isAr ? "مقام" : "Maqam", color: "#8B6914" },
    { id: "sifr", label: isAr ? "صفر" : "Sifr", color: "#9CA3AF" },
    { id: "mada", label: isAr ? "مدى" : "Mada", color: "#1C6B4A" },
  ];

  const filtered = activeFilter === "all"
    ? eventsData
    : eventsData.filter((e) => e.communitySlug === activeFilter);

  const upcoming = filtered.filter((e) => !isExpired(e.date));
  const past = filtered.filter((e) => isExpired(e.date));
  const sorted = [...upcoming, ...past];

  return (
    <section style={{ background: "var(--surrah-section-alt)", padding: "6rem 0", direction: isAr ? "rtl" : "ltr" }}>
      <style>{`
        .event-card {
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0;
          transition: border-color 0.3s, transform 0.3s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .event-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 3px;
          height: 0;
          transition: height 0.4s ease;
        }
        .event-card:hover::before {
          height: 100%;
        }
        .event-card:hover {
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-2px);
        }
        .filter-pill {
          border: 1px solid rgba(255,255,255,0.15);
          background: transparent;
          color: rgba(255,255,255,0.55);
          padding: 0.4rem 1.1rem;
          font-family: 'ManchetteFine', sans-serif;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 0;
          letter-spacing: 0.03em;
        }
        .filter-pill:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.4);
        }
        .filter-pill.active {
          color: #fff;
          font-weight: 700;
        }
        .register-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.4rem;
          font-family: 'ManchetteFine', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          letter-spacing: 0.04em;
        }
        .register-btn:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }
        .events-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.06);
        }
        @media (min-width: 768px) {
          .events-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1100px) {
          .events-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* ── Section Header ── */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ width: "2.5rem", height: "2px", background: "#C4622D", marginBottom: "1rem" }} />
            <h2 style={{ fontFamily: "'ManchetteFine', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--surrah-text-primary)", fontWeight: 900, margin: 0, lineHeight: 1.15 }}>
              {isAr ? "الفعاليات القادمة" : "Upcoming Events"}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", fontFamily: "'ManchetteFine', sans-serif", marginTop: "0.5rem" }}>
              {isAr ? `${upcoming.length} فعالية قادمة من مجتمعات سُرّة` : `${upcoming.length} upcoming events from Surra communities`}
            </p>
          </div>
          <a href="/communities" style={{ fontFamily: "'ManchetteFine', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "2px", transition: "color 0.2s" }}>
            {isAr ? "استكشف المجتمعات ←" : "Explore Communities →"}
          </a>
        </div>

        {/* ── Filter Pills ── */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {filters.map((f) => (
            <button
              key={f.id}
              className={`filter-pill${activeFilter === f.id ? " active" : ""}`}
              style={activeFilter === f.id ? { borderColor: f.color, color: f.color, background: f.color + "18" } : {}}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Events Grid ── */}
        {sorted.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "rgba(255,255,255,0.3)", fontFamily: "'ManchetteFine', sans-serif" }}>
            {isAr ? "لا توجد فعاليات لهذا المجتمع حالياً" : "No events for this community yet"}
          </div>
        ) : (
          <div className="events-grid">
            {sorted.map((event) => {
              const expired = isExpired(event.date);
              const logo = communityLogos[event.community];
              const accentColor = event.communityColor;
              return (
                <div
                  key={event.id}
                  className="event-card"
                  style={{ opacity: expired ? 0.55 : 1 }}
                >
                  <style>{`.event-card-${event.id}::before { background: ${accentColor}; }`}</style>
                  <div className={`event-card event-card-${event.id}`} style={{ padding: "1.75rem", height: "100%", display: "flex", flexDirection: "column", gap: "1rem", background: "transparent", border: "none", borderRadius: 0 }}>

                    {/* Top: community badge + type */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {logo && (
                          <div style={{ background: accentColor + "22", border: `1px solid ${accentColor}44`, padding: "0.3rem 0.6rem", display: "flex", alignItems: "center" }}>
                            <img src={logo} alt={event.community} style={{ height: "22px", width: "auto", objectFit: "contain" }} />
                          </div>
                        )}
                        <span style={{ fontFamily: "'ManchetteFine', sans-serif", fontSize: "0.75rem", color: accentColor, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                          {isAr ? event.community : event.communityEn}
                        </span>
                      </div>
                      <span style={{ fontFamily: "'ManchetteFine', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.12)", padding: "0.2rem 0.6rem" }}>
                        {isAr ? event.type : event.typeEn}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontFamily: "'ManchetteFine', sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "var(--surrah-text-primary)", margin: 0, lineHeight: 1.4, textAlign: isAr ? "right" : "left" }}>
                      {isAr ? event.title : event.titleEn}
                    </h3>

                    {/* Description */}
                    <p style={{ fontFamily: "'ManchetteFine', sans-serif", fontSize: "0.83rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0, flexGrow: 1, textAlign: isAr ? "right" : "left" }}>
                      {isAr ? event.description : event.descriptionEn}
                    </p>

                    {/* Divider */}
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />

                    {/* Bottom: date + location + CTA */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                        <span style={{ fontFamily: "'ManchetteFine', sans-serif", fontSize: "0.82rem", color: "var(--surrah-text-primary)", fontWeight: 700 }}>
                          {formatArabicDate(event.date)}
                        </span>
                        <span style={{ fontFamily: "'ManchetteFine', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
                          📍 {isAr ? event.location : event.locationEn}
                        </span>
                      </div>
                      {expired ? (
                        <span style={{ fontFamily: "'ManchetteFine', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.3rem 0.8rem", letterSpacing: "0.06em" }}>
                          {isAr ? "انتهت" : "ENDED"}
                        </span>
                      ) : (
                        <a
                          href={event.registerUrl}
                          className="register-btn"
                          style={{ background: accentColor, color: "#fff" }}
                        >
                          {isAr ? "سجّل حضورك" : "Register"}
                          <span style={{ fontSize: "0.9rem" }}>{isAr ? "←" : "→"}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── View All CTA ── */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a
            href="/register"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "'ManchetteFine', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "0.75rem 2rem",
              transition: "all 0.2s",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
          >
            {isAr ? "تسجيل في فعالية" : "Register for an Event"}
            <span>{isAr ? "←" : "→"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const pageRef = useReveal();
  const { lang, t } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div ref={pageRef} style={{ background: "var(--surrah-page-bg)", minHeight: "100vh" }}>
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
          <source src="/manus-storage/hero-video-new_e28e66cf.mp4" type="video/mp4" />
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
                color: "var(--surrah-text-primary)",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
                whiteSpace: "nowrap",
              }}
            >
              {lang === "ar" ? <>نصنع المجتمعات<br />ونمنح الأفكار حياة</> : lang === "en" ? <>We Build Communities<br />and Give Ideas Life</> : <>我们建设社区<br />赋予想法生命</>}
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
              {lang === "ar" ? "نصمم ونبني ونشغّل المجتمعات الثقافية والإبداعية التي تُحدث أثرًا مستداما" : lang === "en" ? "We design, build and operate cultural and creative communities that create lasting impact" : "我们设计、建设并运营创造持久影响的文化创意社区"}
            </p>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
              <a
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "transparent",
                  color: "#ffffff",
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "0.85rem 2.5rem",
                  border: "2px solid rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.7)";
                }}
              >
                {lang === "ar" ? "↗ تواصل معنا" : lang === "en" ? "Contact Us ↗" : "联系我们 ↗"}
              </a>
            </div>
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
          <div style={{ width: "1px", height: "48px", background: "var(--surrah-section-alt)", animation: "pulse 2s infinite" }} />
        </div>
      </section>

      {/* ── WHY SECTION ── */}
      <section style={{ background: "var(--surrah-section-bg)", padding: "6rem 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="surrah-divider" />
              <h2
                style={{
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: "var(--surrah-text-primary)",
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
                  color: "var(--surrah-text-primary)",
                  lineHeight: 2,
                  maxWidth: "440px",
                }}
              >
                {lang === "ar" ? "لأن المجتمعات لا تنشأ صدفة. هي تُصمَّم بوعي، تُبنى بعمق، وتُشغَّل باستدامة. سُرّة هي النقطة التي تنبثق منها الدوائر." : lang === "en" ? "Because communities don't arise by chance. They are designed with awareness, built with depth, and operated with sustainability. Surra is the point from which the circles emerge." : "因为社区不是偶然产生的。它们被有意识地设计、深入建设并可持续运营。苏拉是圆圈涌现的起点。"}
              </p>
              <Link href="/about" className="btn-surrah-outline" style={{ marginTop: "2rem", color: "var(--surrah-text-primary)", borderColor: "#ffffff" }}>
                {lang === "ar" ? "اعرف المزيد" : lang === "en" ? "Learn More" : "了解更多"}
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
                      color: "var(--surrah-text-primary)",
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
                      color: "var(--surrah-text-primary)",
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





      {/* ── UPCOMING EVENTS SECTION ── */}
      <UpcomingEvents />

      {/* ── PARTNERS SECTION ── */}
      <section
        style={{
          background: "var(--surrah-section-bg)",
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
                color: "var(--surrah-text-primary)",
                margin: 0,
                letterSpacing: 0,
              }}
            >
              {lang === "ar" ? "شركاؤنا" : lang === "en" ? "Our Partners" : "我们的合作伙伴"}
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.95rem",
                marginTop: "0.5rem",
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              }}
            >
              {lang === "ar" ? "الجهات الداعمة لمجتمعات سُرّة" : lang === "en" ? "Supporting organizations for Surra communities" : "支持苏拉社区的机构"}
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
              background: "var(--surrah-page-bg)",
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
                color: "var(--surrah-text-primary)",
                lineHeight: 1.3,
                marginBottom: "1.25rem",
              }}
            >
              {lang === "ar" ? <>نصوغ سردًا ثقافيًا مُلهمًا<br />يستمد أصالته من الدرعية ويجسد قيمنا في حضورٍ حيّ ومعاصر</> : lang === "en" ? <>We craft an inspiring cultural narrative<br />rooted in Diriyah, embodying our values in a vibrant and contemporary presence</> : <>我们打造鼓舞人心的文化叙事<br />植根于德里耶，在充满活力的当代存在中体现我们的价值观</>}
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
              {lang === "ar" ? "هل لديك فكرة تستحق أن تصبح مجتمعاً؟" : lang === "en" ? "Do you have an idea that deserves to become a community?" : "您有一个值得成为社区的想法吗？"}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "var(--surrah-page-bg)",
                  color: "var(--surrah-text-primary)",
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
                {lang === "ar" ? "ابدأ الحديث معنا" : lang === "en" ? "Start the Conversation" : "开始对话"}
              </Link>
              <Link
                href="/join"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "transparent",
                  color: "var(--surrah-text-primary)",
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
                {lang === "ar" ? "أنشئ مجتمعك" : lang === "en" ? "Create Your Community" : "创建您的社区"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
