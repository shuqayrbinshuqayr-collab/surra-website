/* ============================================================
   Basar Community — بصر
   Design: Dark cinematic, orange #C4622D accent
   One-Page: Hero | About | Programs | Events | Team | Gallery | CTA
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { VideoBackground } from "@/components/VideoBackground";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const F = "'ManchetteFine', sans-serif";
const ORANGE = "#C4622D";

// ─── Programs ─────────────────────────────────────────────────────────────────
const programs = [
  {
    id: "thluthyat",
    nameAr: "ثلوثيات بصر",
    nameEn: "Basar Thursdays",
    descAr: "جلسات أسبوعية كل ثلاثاء تجمع المهتمين بالفنون البصرية والتصوير والتصميم في حوار نقدي ثري. يُقدّم فيها أحد الأعضاء عملاً أو فكرة للنقاش الجماعي.",
    descEn: "Weekly Tuesday sessions bringing together visual arts enthusiasts for rich critical dialogue. A member presents a work or idea for group discussion.",
    logo: "/manus-storage/thluthyat-basar-final_732356d9.png",
    logoBg: "#1a1a1a",
    freq: "أسبوعي",
    freqEn: "Weekly",
    tag: "نقد بصري",
    tagEn: "Visual Critique",
  },
  {
    id: "kreativez",
    nameAr: "الكريتيفيتز",
    nameEn: "Kreativez",
    descAr: "ورش عمل تطبيقية في التصوير الفوتوغرافي والتصميم الجرافيكي والإخراج المرئي. تُقدَّم من قِبَل متخصصين من القطاع الإبداعي السعودي.",
    descEn: "Practical workshops in photography, graphic design, and visual direction. Delivered by specialists from the Saudi creative sector.",
    logo: "/manus-storage/creativities-final_787ca9ad.png",
    logoBg: "#ffffff",
    freq: "شهري",
    freqEn: "Monthly",
    tag: "ورش عملية",
    tagEn: "Workshops",
  },
  {
    id: "gallery",
    nameAr: "معرض بصر",
    nameEn: "Basar Gallery",
    descAr: "معرض دوري لأعمال أعضاء مجتمع بصر. فرصة لعرض الأعمال الإبداعية أمام جمهور مختار من المهتمين والمتخصصين في الفنون.",
    descEn: "A periodic exhibition of Basar community members' works. An opportunity to showcase creative works to a selected audience of art enthusiasts and specialists.",
    logo: null,
    logoBg: "#0d0d0d",
    freq: "ربع سنوي",
    freqEn: "Quarterly",
    tag: "معارض",
    tagEn: "Exhibitions",
  },
];

// ─── Events ───────────────────────────────────────────────────────────────────
const events = [
  {
    id: 1,
    titleAr: "ثلوثيات بصر — الجلسة الرابعة",
    titleEn: "Basar Thursdays — Fourth Session",
    descAr: "جلسة نقدية بصرية حول موضوع 'الضوء والظل في التصوير الفوتوغرافي'",
    descEn: "A visual critique session on the topic of 'Light and Shadow in Photography'",
    date: "٢٧ مايو ٢٠٢٥",
    dateEn: "May 27, 2025",
    location: "الدرعية",
    locationEn: "Diriyah",
    type: "جلسة نقدية",
    typeEn: "Critique Session",
    expired: false,
    color: ORANGE,
  },
  {
    id: 2,
    titleAr: "ورشة التصوير الليلي",
    titleEn: "Night Photography Workshop",
    descAr: "ورشة عملية في تقنيات التصوير الليلي والتعامل مع الإضاءة المنخفضة",
    descEn: "A practical workshop on night photography techniques and low-light handling",
    date: "١٠ يونيو ٢٠٢٥",
    dateEn: "June 10, 2025",
    location: "الرياض",
    locationEn: "Riyadh",
    type: "ورشة عمل",
    typeEn: "Workshop",
    expired: false,
    color: ORANGE,
  },
  {
    id: 3,
    titleAr: "ثلوثيات بصر — الجلسة الثالثة",
    titleEn: "Basar Thursdays — Third Session",
    descAr: "جلسة حول 'الهوية البصرية في الفن السعودي المعاصر'",
    descEn: "Session on 'Visual Identity in Contemporary Saudi Art'",
    date: "١٦ مايو ٢٠٢٥",
    dateEn: "May 16, 2025",
    location: "الدرعية",
    locationEn: "Diriyah",
    type: "جلسة نقدية",
    typeEn: "Critique Session",
    expired: true,
    color: ORANGE,
  },
];

// ─── Team ─────────────────────────────────────────────────────────────────────
const team = [
  { nameAr: "أحمد الشمري", nameEn: "Ahmed Al-Shammari", roleAr: "مؤسس المجتمع", roleEn: "Community Founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
  { nameAr: "سارة الغامدي", nameEn: "Sara Al-Ghamdi", roleAr: "مديرة البرامج", roleEn: "Programs Director", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80" },
  { nameAr: "محمد العتيبي", nameEn: "Mohammed Al-Otaibi", roleAr: "مصور فوتوغرافي", roleEn: "Photographer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" },
  { nameAr: "نورة الدوسري", nameEn: "Noura Al-Dosari", roleAr: "مصممة جرافيك", roleEn: "Graphic Designer", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80" },
  { nameAr: "فيصل القحطاني", nameEn: "Faisal Al-Qahtani", roleAr: "ناقد فني", roleEn: "Art Critic", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
];

// ─── Gallery Images ───────────────────────────────────────────────────────────
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80", alt: "معرض بصر" },
  { src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80", alt: "ورشة تصوير" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "جلسة نقدية" },
  { src: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&q=80", alt: "فن بصري" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", alt: "تصوير طبيعي" },
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", alt: "تصميم جرافيك" },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { numAr: "+١٢٠", numEn: "120+", labelAr: "عضو نشط", labelEn: "Active Members" },
  { numAr: "+٤٥", numEn: "45+", labelAr: "جلسة منعقدة", labelEn: "Sessions Held" },
  { numAr: "+٢٠", numEn: "20+", labelAr: "ورشة عمل", labelEn: "Workshops" },
  { numAr: "٦", numEn: "6", labelAr: "معارض فنية", labelEn: "Art Exhibitions" },
];

// ─── Reveal Hook ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal-basar");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("visible"); } });
    }, { threshold: 0.12 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Basar() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [activeSection, setActiveSection] = useState("about");
  useReveal();

  const sections = [
    { id: "about", labelAr: "عن بصر", labelEn: "About" },
    { id: "programs", labelAr: "البرامج", labelEn: "Programs" },
    { id: "events", labelAr: "الفعاليات", labelEn: "Events" },
    { id: "team", labelAr: "الفريق", labelEn: "Team" },
    { id: "gallery", labelAr: "المعرض", labelEn: "Gallery" },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: "var(--surrah-page-bg)", minHeight: "100vh", color: "var(--surrah-text-primary)" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: "0",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Video Background */}
        <VideoBackground src="/manus-storage/about_hero_video_346e3443.mp4" opacity={0.35} />
        {/* Dark overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #0d050099 0%, #1a080099 40%, #2d100099 70%, #0d050099 100%)",
        }} />
        {/* Orange glow */}
        <div style={{
          position: "absolute",
          top: "20%",
          right: isAr ? "10%" : "auto",
          left: isAr ? "auto" : "10%",
          width: "500px",
          height: "500px",
          background: `radial-gradient(circle, ${ORANGE}20 0%, transparent 70%)`,
          borderRadius: "50%",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "100px", paddingTop: "160px" }}>
          {/* Back link */}
          <Link
            href="/communities"
            style={{ fontFamily: F, fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "3rem" }}
          >
            {isAr ? "← مجتمعاتنا" : "← Communities"}
          </Link>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              {/* Logo */}
              <img
                src="/manus-storage/Basar-White_7d406934.png"
                alt="بصر"
                style={{ height: "clamp(60px, 12vw, 120px)", width: "auto", objectFit: "contain", marginBottom: "2rem", display: "block" }}
              />
              <h1 style={{ fontFamily: F, fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 300, color: "rgba(255,255,255,0.7)", maxWidth: "600px", lineHeight: 1.7, marginBottom: "2rem" }}>
                {isAr
                  ? "مجتمع يُعنى بالوعي البصري والفنون وقراءة الصورة والمعنى"
                  : "A community dedicated to visual awareness, arts, and reading image and meaning"}
              </h1>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/join"
                  style={{ fontFamily: F, fontSize: "1rem", fontWeight: 700, color: "#fff", background: ORANGE, padding: "0.85rem 2.5rem", textDecoration: "none", display: "inline-block", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  {isAr ? "انضم إلى بصر" : "Join Basar"}
                </Link>
                <button
                  onClick={() => scrollTo("programs")}
                  style={{ fontFamily: F, fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", background: "transparent", border: "1px solid rgba(255,255,255,0.3)", padding: "0.85rem 2.5rem", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.7)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
                >
                  {isAr ? "اكتشف البرامج" : "Explore Programs"}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {stats.map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "1.25rem 1.5rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}>
                  <div style={{ fontFamily: F, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, color: ORANGE, lineHeight: 1 }}>{isAr ? s.numAr : s.numEn}</div>
                  <div style={{ fontFamily: F, fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginTop: "0.4rem" }}>{isAr ? s.labelAr : s.labelEn}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0.4 }}>
          <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.5)", animation: "pulse 2s infinite" }} />
        </div>
      </section>

      {/* ── Sticky Section Nav ── */}
      <nav style={{
        position: "sticky",
        top: "96px",
        zIndex: 40,
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div className="container">
          <div style={{ display: "flex", gap: "0", overflowX: "auto" }}>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                style={{
                  fontFamily: F,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: activeSection === sec.id ? ORANGE : "rgba(255,255,255,0.55)",
                  background: "none",
                  border: "none",
                  borderBottom: activeSection === sec.id ? `2px solid ${ORANGE}` : "2px solid transparent",
                  padding: "1.1rem 1.5rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {isAr ? sec.labelAr : sec.labelEn}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── About Section ── */}
      <section id="about" style={{ padding: "100px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <div className="reveal-basar" style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}>
              <p style={{ fontFamily: F, fontSize: "0.85rem", color: ORANGE, letterSpacing: "0.15em", marginBottom: "1.5rem", fontWeight: 600 }}>
                {isAr ? "عن بصر" : "ABOUT BASAR"}
              </p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "2rem" }}>
                {isAr ? "نرى العالم بعيون مختلفة" : "We See the World Through Different Eyes"}
              </h2>
              <p style={{ fontFamily: F, fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                {isAr
                  ? "بصر مجتمع للذين يرون العالم بعيون مختلفة. يُعنى بالوعي البصري والفنون والقراءة الجمالية للصورة والمعنى. مساحة للتأمل والنقد والإبداع البصري."
                  : "Basar is a community for those who see the world through different eyes. It focuses on visual awareness, arts, and the aesthetic reading of image and meaning. A space for contemplation, critique, and visual creativity."}
              </p>
              <p style={{ fontFamily: F, fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.9 }}>
                {isAr
                  ? "نؤمن أن الصورة لغة، وأن تعلّم قراءتها يُغيّر طريقة رؤيتنا للعالم. من خلال برامجنا المتنوعة، نبني جيلاً قادراً على التعبير البصري الأصيل."
                  : "We believe that the image is a language, and that learning to read it changes the way we see the world. Through our diverse programs, we build a generation capable of authentic visual expression."}
              </p>
            </div>
            <div className="reveal-basar" style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease 0.15s", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { titleAr: "الوعي البصري", titleEn: "Visual Awareness", descAr: "تعلّم قراءة الصورة والمعنى خلفها", descEn: "Learn to read the image and the meaning behind it" },
                { titleAr: "النقد الجمالي", titleEn: "Aesthetic Critique", descAr: "تطوير حس نقدي تجاه الفنون والتصميم", descEn: "Develop a critical sense towards arts and design" },
                { titleAr: "الإبداع المشترك", titleEn: "Shared Creativity", descAr: "خلق تجارب بصرية جماعية ملهمة", descEn: "Create inspiring collective visual experiences" },
                { titleAr: "التعبير الأصيل", titleEn: "Authentic Expression", descAr: "إيجاد الصوت البصري الفردي", descEn: "Finding the individual visual voice" },
              ].map((v, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderTop: `2px solid ${ORANGE}`, padding: "1.5rem" }}>
                  <h4 style={{ fontFamily: F, fontSize: "1rem", fontWeight: 700, color: ORANGE, marginBottom: "0.5rem" }}>{isAr ? v.titleAr : v.titleEn}</h4>
                  <p style={{ fontFamily: F, fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{isAr ? v.descAr : v.descEn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Programs Section ── */}
      <section id="programs" style={{ padding: "100px 0", background: "rgba(255,255,255,0.015)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div className="reveal-basar" style={{ textAlign: "center", marginBottom: "4rem", opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}>
            <p style={{ fontFamily: F, fontSize: "0.85rem", color: ORANGE, letterSpacing: "0.15em", marginBottom: "1rem", fontWeight: 600 }}>
              {isAr ? "برامجنا" : "OUR PROGRAMS"}
            </p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800 }}>
              {isAr ? "مبادرات بصر الثقافية" : "Basar Cultural Initiatives"}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
            {programs.map((prog, i) => (
              <div
                key={prog.id}
                className="reveal-basar"
                style={{
                  opacity: 0,
                  transform: "translateY(30px)",
                  transition: `all 0.7s ease ${i * 0.1}s`,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}
              >
                {/* Logo area */}
                <div style={{ height: "180px", background: prog.logoBg, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
                  {prog.logo ? (
                    <img src={prog.logo} alt={prog.nameAr} style={{ maxHeight: "120px", maxWidth: "220px", objectFit: "contain" }} />
                  ) : (
                    <div style={{ fontFamily: F, fontSize: "3rem", color: ORANGE, opacity: 0.5 }}>◈</div>
                  )}
                </div>
                <div style={{ padding: "1.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <h3 style={{ fontFamily: F, fontSize: "1.15rem", fontWeight: 800, color: ORANGE }}>
                      {isAr ? prog.nameAr : prog.nameEn}
                    </h3>
                    <span style={{ fontFamily: F, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.15)", padding: "0.2rem 0.6rem" }}>
                      {isAr ? prog.freq : prog.freqEn}
                    </span>
                  </div>
                  <p style={{ fontFamily: F, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                    {isAr ? prog.descAr : prog.descEn}
                  </p>
                  <div style={{ marginTop: "1.25rem" }}>
                    <span style={{ fontFamily: F, fontSize: "0.78rem", color: ORANGE, border: `1px solid ${ORANGE}30`, padding: "0.2rem 0.75rem", background: `${ORANGE}10` }}>
                      {isAr ? prog.tag : prog.tagEn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events Section ── */}
      <section id="events" style={{ padding: "100px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div className="reveal-basar" style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}>
              <p style={{ fontFamily: F, fontSize: "0.85rem", color: ORANGE, letterSpacing: "0.15em", marginBottom: "0.75rem", fontWeight: 600 }}>
                {isAr ? "الفعاليات" : "EVENTS"}
              </p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800 }}>
                {isAr ? "فعاليات بصر القادمة" : "Upcoming Basar Events"}
              </h2>
            </div>
            <Link
              href="/register"
              style={{ fontFamily: F, fontSize: "0.9rem", fontWeight: 700, color: "#fff", background: ORANGE, padding: "0.7rem 1.75rem", textDecoration: "none", display: "inline-block" }}
            >
              {isAr ? "سجّل الآن" : "Register Now"}
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {events.map((ev, i) => (
              <div
                key={ev.id}
                className="reveal-basar"
                style={{
                  opacity: ev.expired ? 0.5 : 1,
                  transform: "translateY(20px)",
                  transition: `all 0.6s ease ${i * 0.1}s`,
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                  padding: "1.75rem 2rem",
                  background: ev.expired ? "rgba(255,255,255,0.02)" : "rgba(196,98,45,0.06)",
                  border: "1px solid",
                  borderColor: ev.expired ? "rgba(255,255,255,0.06)" : `${ORANGE}30`,
                  flexWrap: "wrap",
                }}
              >
                {/* Date */}
                <div style={{ textAlign: "center", minWidth: "80px", flexShrink: 0 }}>
                  <div style={{ fontFamily: F, fontSize: "1.8rem", fontWeight: 900, color: ev.expired ? "rgba(255,255,255,0.3)" : ORANGE, lineHeight: 1 }}>
                    {isAr ? ev.date.split(" ")[0] : ev.dateEn.split(" ")[1].replace(",", "")}
                  </div>
                  <div style={{ fontFamily: F, fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginTop: "0.2rem" }}>
                    {isAr ? ev.date.split(" ").slice(1).join(" ") : ev.dateEn.split(" ")[0]}
                  </div>
                </div>
                {/* Divider */}
                <div style={{ width: "1px", height: "60px", background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
                {/* Info */}
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: F, fontSize: "0.78rem", color: ev.expired ? "rgba(255,255,255,0.3)" : ORANGE, fontWeight: 600 }}>
                      {isAr ? ev.type : ev.typeEn}
                    </span>
                    <span style={{ fontFamily: F, fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>
                      {isAr ? ev.location : ev.locationEn}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: F, fontSize: "1.05rem", fontWeight: 700, color: ev.expired ? "rgba(255,255,255,0.4)" : "var(--surrah-text-primary)" }}>
                    {isAr ? ev.titleAr : ev.titleEn}
                  </h3>
                  <p style={{ fontFamily: F, fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", marginTop: "0.3rem" }}>
                    {isAr ? ev.descAr : ev.descEn}
                  </p>
                </div>
                {/* Action */}
                <div style={{ flexShrink: 0 }}>
                  {ev.expired ? (
                    <span style={{ fontFamily: F, fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.4rem 1rem" }}>
                      {isAr ? "انتهى" : "Expired"}
                    </span>
                  ) : (
                    <Link
                      href="/register"
                      style={{ fontFamily: F, fontSize: "0.88rem", fontWeight: 700, color: "#fff", background: ORANGE, padding: "0.55rem 1.5rem", textDecoration: "none", display: "inline-block", transition: "opacity 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                    >
                      {isAr ? "حضور" : "Attend"}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section id="team" style={{ padding: "100px 0", background: "rgba(255,255,255,0.015)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div className="reveal-basar" style={{ textAlign: "center", marginBottom: "4rem", opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}>
            <p style={{ fontFamily: F, fontSize: "0.85rem", color: ORANGE, letterSpacing: "0.15em", marginBottom: "1rem", fontWeight: 600 }}>
              {isAr ? "الفريق" : "THE TEAM"}
            </p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800 }}>
              {isAr ? "من يصنع بصر" : "Who Makes Basar"}
            </h2>
          </div>

          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
            {team.map((member, i) => (
              <div
                key={i}
                className="reveal-basar"
                style={{
                  opacity: 0,
                  transform: "translateY(30px)",
                  transition: `all 0.7s ease ${i * 0.1}s`,
                  textAlign: "center",
                  width: "180px",
                }}
              >
                <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 1rem", border: `2px solid ${ORANGE}40` }}>
                  <img src={member.img} alt={member.nameAr} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h4 style={{ fontFamily: F, fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.3rem" }}>
                  {isAr ? member.nameAr : member.nameEn}
                </h4>
                <p style={{ fontFamily: F, fontSize: "0.8rem", color: ORANGE }}>
                  {isAr ? member.roleAr : member.roleEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section id="gallery" style={{ padding: "100px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div className="reveal-basar" style={{ textAlign: "center", marginBottom: "3rem", opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}>
            <p style={{ fontFamily: F, fontSize: "0.85rem", color: ORANGE, letterSpacing: "0.15em", marginBottom: "1rem", fontWeight: 600 }}>
              {isAr ? "المعرض" : "GALLERY"}
            </p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800 }}>
              {isAr ? "لحظات بصر" : "Basar Moments"}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="reveal-basar"
                style={{
                  opacity: 0,
                  transform: "scale(0.95)",
                  transition: `all 0.6s ease ${i * 0.08}s`,
                  aspectRatio: i === 0 ? "2/1" : "1/1",
                  gridColumn: i === 0 ? "span 2" : "span 1",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section style={{ padding: "120px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="reveal-basar" style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s ease" }}>
            <img
              src="/manus-storage/Basar-White_7d406934.png"
              alt="بصر"
              style={{ height: "80px", width: "auto", objectFit: "contain", margin: "0 auto 2rem", display: "block" }}
            />
            <h2 style={{ fontFamily: F, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.4, marginBottom: "1.5rem" }}>
              {isAr ? "هل أنت مستعد لترى العالم بعيون مختلفة؟" : "Are you ready to see the world through different eyes?"}
            </h2>
            <p style={{ fontFamily: F, fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", marginBottom: "2.5rem", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
              {isAr
                ? "انضم إلى مجتمع بصر وكن جزءاً من رحلة الوعي البصري والإبداع الأصيل"
                : "Join the Basar community and be part of a journey of visual awareness and authentic creativity"}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/join"
                style={{ fontFamily: F, fontSize: "1rem", fontWeight: 700, color: "#fff", background: ORANGE, padding: "0.9rem 2.75rem", textDecoration: "none", display: "inline-block", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                {isAr ? "انضم إلى بصر" : "Join Basar"}
              </Link>
              <Link
                href="/communities"
                style={{ fontFamily: F, fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", background: "transparent", border: "1px solid rgba(255,255,255,0.25)", padding: "0.9rem 2.75rem", textDecoration: "none", display: "inline-block", transition: "all 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
              >
                {isAr ? "مجتمعات أخرى" : "Other Communities"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .reveal-basar.visible {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
