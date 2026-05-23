/* ============================================================
   Sada Community — سُدى (SUDAA)
   Design: Deep royal purple #200C56 / #41286D, lavender #B072F7
   Brand: Pixel diamond motifs, Saudi women's creative community
   One-Page: Hero | About | Programs | Pillars | Events | Gallery | CTA
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { VideoBackground } from "@/components/VideoBackground";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const F = "'ManchetteFine', sans-serif";
const PURPLE = "#7B4F8E";
const PURPLE_DEEP = "#200C56";
const PURPLE_ROYAL = "#41286D";
const LAVENDER = "#B072F7";
const LAVENDER_LIGHT = "#D0ADFA";

// ─── SVG Diamond Pattern ──────────────────────────────────────────────────────
function DiamondPattern({ opacity = 0.12, color = LAVENDER }: { opacity?: number; color?: string }) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="diamond-px" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          {/* Pixel diamond: 5x5 grid of 4px squares */}
          <rect x="24" y="4" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="20" y="8" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="28" y="8" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="16" y="12" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="24" y="12" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="32" y="12" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="20" y="16" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="28" y="16" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="24" y="20" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="20" y="24" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="28" y="24" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="16" y="28" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="24" y="28" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="32" y="28" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="20" y="32" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="28" y="32" width="4" height="4" fill={color} opacity={opacity} />
          <rect x="24" y="36" width="4" height="4" fill={color} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diamond-px)" />
    </svg>
  );
}

// ─── Programs ─────────────────────────────────────────────────────────────────
const programs = [
  {
    id: "qaiyadat",
    nameAr: "سُدى القياديات",
    nameEn: "Sada Leaders",
    descAr: "برنامج يستهدف المرأة في مواقع القيادة والتأثير. يُقدّم جلسات حوارية مع قياديات بارزات، ويُعزّز مهارات القيادة الهادئة والمقصودة.",
    descEn: "A program targeting women in leadership and influence positions. Offers dialogue sessions with prominent leaders, enhancing quiet and intentional leadership skills.",
    freq: "شهري",
    freqEn: "Monthly",
    tag: "قيادة",
    tagEn: "Leadership",
    icon: "◆",
  },
  {
    id: "wajh",
    nameAr: "وجه سُدى",
    nameEn: "Face of Sada",
    descAr: "توثيق قصص النساء المؤثرات في مجالات الثقافة والفن والأعمال. سلسلة مرئية تُبرز الصوت الأنثوي وتُعيد تعريف النجاح من منظور المرأة السعودية.",
    descEn: "Documenting stories of influential women in culture, art, and business. A visual series highlighting the feminine voice and redefining success from a Saudi woman's perspective.",
    freq: "كل أسبوعين",
    freqEn: "Bi-weekly",
    tag: "توثيق",
    tagEn: "Documentation",
    icon: "◇",
  },
  {
    id: "tathadath",
    nameAr: "سُدى تتحدث",
    nameEn: "Sada Speaks",
    descAr: "منصة للنساء للتعبير عن أفكارهن وتجاربهن أمام جمهور مختار. ورش تدريبية في الإلقاء والتحدث أمام الجمهور وبناء الثقة بالنفس.",
    descEn: "A platform for women to express their ideas and experiences before a selected audience. Training workshops in public speaking and self-confidence building.",
    freq: "شهري",
    freqEn: "Monthly",
    tag: "خطابة",
    tagEn: "Public Speaking",
    icon: "▲",
  },
  {
    id: "warash",
    nameAr: "ورش سُدى الإبداعية",
    nameEn: "Sada Creative Workshops",
    descAr: "ورش عملية في الفنون البصرية والكتابة الإبداعية والتصميم. تُقدَّم من قِبَل فنانات ومبدعات سعوديات متخصصات في مجالاتهن.",
    descEn: "Practical workshops in visual arts, creative writing, and design. Delivered by Saudi female artists and creatives specialized in their fields.",
    freq: "أسبوعي",
    freqEn: "Weekly",
    tag: "فنون",
    tagEn: "Arts",
    icon: "✦",
  },
];

// ─── Pillars ──────────────────────────────────────────────────────────────────
const pillars = [
  {
    ar: "الثقافة",
    en: "Culture",
    descAr: "إحياء الموروث الثقافي السعودي وتطويره من منظور المرأة المعاصرة",
    descEn: "Reviving and developing Saudi cultural heritage from a contemporary woman's perspective",
    icon: "◈",
  },
  {
    ar: "الفن",
    en: "Art",
    descAr: "دعم الإبداع الفني للمرأة وإبراز أعمالها أمام جمهور واسع",
    descEn: "Supporting women's artistic creativity and showcasing their works to a wide audience",
    icon: "◆",
  },
  {
    ar: "التعليم",
    en: "Education",
    descAr: "تطوير المهارات المعرفية والعملية من خلال برامج تعليمية مصممة للمرأة",
    descEn: "Developing cognitive and practical skills through educational programs designed for women",
    icon: "◇",
  },
  {
    ar: "القيادة",
    en: "Leadership",
    descAr: "تمكين المرأة من قيادة التغيير بأسلوب هادئ عميق ومقصود",
    descEn: "Empowering women to lead change in a quiet, deep, and intentional manner",
    icon: "▲",
  },
];

// ─── Events ───────────────────────────────────────────────────────────────────
const events = [
  {
    id: 1,
    titleAr: "سُدى القياديات — الجلسة الثالثة",
    titleEn: "Sada Leaders — Third Session",
    descAr: "جلسة حوارية مع قياديات بارزات حول موضوع 'القيادة الهادئة وصناعة التأثير'",
    descEn: "A dialogue session with prominent leaders on the topic of 'Quiet Leadership and Creating Impact'",
    date: "١٢ يونيو ٢٠٢٥",
    dateEn: "June 12, 2025",
    location: "الرياض",
    locationEn: "Riyadh",
    type: "جلسة حوارية",
    typeEn: "Dialogue Session",
    expired: false,
  },
  {
    id: 2,
    titleAr: "ورشة الكتابة الإبداعية",
    titleEn: "Creative Writing Workshop",
    descAr: "ورشة عملية في تقنيات الكتابة الإبداعية والسرد القصصي للمرأة",
    descEn: "A practical workshop in creative writing techniques and storytelling for women",
    date: "٢٠ يونيو ٢٠٢٥",
    dateEn: "June 20, 2025",
    location: "جدة",
    locationEn: "Jeddah",
    type: "ورشة عمل",
    typeEn: "Workshop",
    expired: false,
  },
  {
    id: 3,
    titleAr: "وجه سُدى — الحلقة الأولى",
    titleEn: "Face of Sada — Episode One",
    descAr: "إطلاق أول حلقة من سلسلة 'وجه سُدى' لتوثيق قصص النساء المؤثرات",
    descEn: "Launch of the first episode of the 'Face of Sada' series documenting influential women's stories",
    date: "٥ مايو ٢٠٢٥",
    dateEn: "May 5, 2025",
    location: "أونلاين",
    locationEn: "Online",
    type: "إطلاق",
    typeEn: "Launch",
    expired: true,
  },
];

// ─── Reveal Hook ──────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Sada() {
  const pageRef = useReveal();
  const { lang, dir } = useLanguage();
  const isAr = lang === "ar";
  const isEn = lang === "en";

  const t = {
    communityLabel: isAr ? "مجتمع سُدى" : isEn ? "SUDAA Community" : "苏达社区",
    heroTitle: isAr ? "الصوت الأنثوي\nيُعيد تعريف القيادة" : isEn ? "The Feminine Voice\nRedefines Leadership" : "女性声音\n重新定义领导力",
    heroSub: isAr
      ? "سُدى مجتمع إبداعي مستقل يُعنى بإبراز الصوت النسائي في الثقافة والفن والتعليم والقيادة. نُعيد تعريف القيادة من منظور أنثوي: هادئ، عميق، ومقصود."
      : isEn
      ? "Sada is an independent creative community dedicated to highlighting the feminine voice in culture, art, education, and leadership. We redefine leadership from a feminine perspective: quiet, deep, and intentional."
      : "苏达是一个独立的创意社区，致力于在文化、艺术、教育和领导力方面突出女性声音。",
    aboutTitle: isAr ? "من نحن" : isEn ? "About Us" : "关于我们",
    aboutP1: isAr
      ? "سُدى مجتمع إبداعي سعودي مستقل يُعنى بإبراز الصوت النسائي في الثقافة والفن والتعليم والقيادة. نُظهر قصص النساء وتأثيرهن من خلال تجارب حوارية وتوثيقية تُعيد تعريف القيادة من منظور أنثوي: هادئ، عميق، ومقصود."
      : isEn
      ? "Sada is an independent Saudi creative community dedicated to highlighting the feminine voice in culture, art, education, and leadership. We showcase women's stories and impact through dialogue and documentary experiences that redefine leadership from a feminine perspective: quiet, deep, and intentional."
      : "苏达是一个独立的沙特创意社区，致力于在文化、艺术、教育和领导力方面突出女性声音。",
    aboutP2: isAr
      ? "نؤمن أن المرأة السعودية تحمل في داخلها قصصاً تستحق أن تُروى، وأصواتاً تستحق أن تُسمع. سُدى هي المساحة التي تُمكّن هذه الأصوات من الظهور والتأثير."
      : isEn
      ? "We believe Saudi women carry within them stories worth telling and voices worth hearing. Sada is the space that empowers these voices to emerge and make an impact."
      : "我们相信沙特女性内心有值得讲述的故事和值得倾听的声音。",
    pillarsTitle: isAr ? "ركائز سُدى" : isEn ? "Sada's Pillars" : "苏达的支柱",
    programsTitle: isAr ? "برامج سُدى" : isEn ? "Sada Programs" : "苏达项目",
    eventsTitle: isAr ? "فعاليات سُدى" : isEn ? "Sada Events" : "苏达活动",
    pastLabel: isAr ? "انتهت" : isEn ? "Ended" : "已结束",
    upcomingLabel: isAr ? "قادم" : isEn ? "Upcoming" : "即将到来",
    ctaTitle: isAr ? "انضمي إلى سُدى" : isEn ? "Join Sada" : "加入苏达",
    ctaSub: isAr
      ? "كوني جزءاً من مجتمع يُؤمن بصوتك ويُعلي من شأنه. انضمي إلى سُدى وابدئي رحلتك الإبداعية."
      : isEn
      ? "Be part of a community that believes in your voice and elevates it. Join Sada and begin your creative journey."
      : "成为相信您声音并提升它的社区的一部分。",
    ctaBtn: isAr ? "اشتركي الآن ←" : isEn ? "Join Now →" : "立即加入 →",
    backBtn: isAr ? "← العودة للمجتمعات" : isEn ? "← Back to Communities" : "← 返回社区",
    freqLabel: isAr ? "الدورية" : isEn ? "Frequency" : "频率",
  };

  return (
    <div ref={pageRef} style={{ background: "#0a0a0f", minHeight: "100vh", color: "#fff" }} dir={dir}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Video Background */}
        <VideoBackground src="/manus-storage/magnific_keep-the-same-image-and-m_2908526314_215afa14.mp4" opacity={0.3} />
        {/* Background image fallback */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/106553263/fHr7Y4tPFdBZFRq9ZFKpfT/sada-hero-7n8RHUT55GLJu65dsBq6gP.webp)`,
          backgroundSize: "cover", backgroundPosition: "center right",
          filter: "brightness(0.25)",
          mixBlendMode: "multiply",
        }} />
        {/* Purple gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(${dir === "rtl" ? "to left" : "to right"}, rgba(32,12,86,0.92) 0%, rgba(32,12,86,0.7) 50%, rgba(32,12,86,0.2) 100%)`,
        }} />
        {/* Diamond pattern overlay */}
        <DiamondPattern opacity={0.08} color={LAVENDER} />

        <div style={{ position: "relative", zIndex: 2, width: "100%", paddingTop: "8rem", paddingBottom: "6rem" }}>
          <div className="container">
            <div style={{ maxWidth: "700px" }}>
              {/* Back link */}
              <Link href="/communities" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: LAVENDER_LIGHT, textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.1em", marginBottom: "2rem", fontFamily: F, opacity: 0.85 }}>
                {t.backBtn}
              </Link>

              {/* Logo */}
              <div style={{ marginBottom: "1.5rem" }}>
                <img
                  src="/manus-storage/Sudaa-White_d1defc89.png"
                  alt="سُدى"
                  style={{ height: "56px", width: "auto", objectFit: "contain" }}
                />
              </div>

              {/* Label */}
              <p style={{ fontFamily: F, fontSize: "0.75rem", letterSpacing: "0.3em", color: LAVENDER, textTransform: "uppercase", marginBottom: "1.25rem" }}>
                {t.communityLabel}
              </p>

              {/* Title */}
              <h1 style={{ fontFamily: F, fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#fff", lineHeight: 1.15, marginBottom: "1.5rem", whiteSpace: "pre-line" }}>
                {t.heroTitle.split("\n").map((line, i) => (
                  <span key={i} style={{ display: "block", color: i === 1 ? LAVENDER_LIGHT : "#fff" }}>{line}</span>
                ))}
              </h1>

              {/* Subtitle */}
              <p style={{ fontFamily: F, color: "rgba(255,255,255,0.75)", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", lineHeight: 1.9, maxWidth: "560px", marginBottom: "2.5rem" }}>
                {t.heroSub}
              </p>

              {/* CTA */}
              <Link href="/join" style={{
                display: "inline-block", padding: "0.9rem 2.5rem",
                background: `linear-gradient(135deg, ${PURPLE_ROYAL}, ${PURPLE})`,
                color: "#fff", textDecoration: "none", fontFamily: F, fontSize: "0.95rem",
                letterSpacing: "0.05em", border: `1px solid ${LAVENDER}`,
                transition: "all 0.3s ease",
              }}>
                {t.ctaBtn}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to bottom, transparent, #0a0a0f)" }} />
      </section>

      {/* ── About ── */}
      <section className="py-24" style={{ background: "#0a0a0f", position: "relative", overflow: "hidden" }}>
        <DiamondPattern opacity={0.05} color={LAVENDER} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div style={{ order: dir === "rtl" ? 1 : 0 }}>
              <p style={{ fontFamily: F, fontSize: "0.75rem", letterSpacing: "0.25em", color: LAVENDER, textTransform: "uppercase", marginBottom: "1rem" }}>
                {t.aboutTitle}
              </p>
              <h2 style={{ fontFamily: F, fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff", marginBottom: "1.5rem", lineHeight: 1.3 }}>
                {isAr ? <>مجتمع يُؤمن<br /><span style={{ color: LAVENDER_LIGHT }}>بقوة الصوت الأنثوي</span></> :
                 isEn ? <>A community that believes<br /><span style={{ color: LAVENDER_LIGHT }}>in the power of the feminine voice</span></> :
                 <>相信<br /><span style={{ color: LAVENDER_LIGHT }}>女性声音力量</span>的社区</>}
              </h2>
              <p style={{ fontFamily: F, color: "rgba(255,255,255,0.75)", lineHeight: 2, marginBottom: "1.25rem" }}>{t.aboutP1}</p>
              <p style={{ fontFamily: F, color: "rgba(255,255,255,0.6)", lineHeight: 2 }}>{t.aboutP2}</p>
            </div>

            {/* Image */}
            <div style={{ position: "relative", order: dir === "rtl" ? 0 : 1 }}>
              <div style={{
                position: "absolute", inset: "-12px",
                background: `linear-gradient(135deg, ${PURPLE_ROYAL}40, transparent)`,
                border: `1px solid ${PURPLE}30`,
              }} />
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/106553263/fHr7Y4tPFdBZFRq9ZFKpfT/sada-community-hTB4K5LXGxZRoCdm8BFxZZ.webp"
                alt="مجتمع سُدى"
                style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", display: "block", position: "relative", zIndex: 1 }}
              />
              {/* Corner accent */}
              <div style={{ position: "absolute", bottom: "-1px", left: dir === "rtl" ? "auto" : "-1px", right: dir === "rtl" ? "-1px" : "auto", width: "80px", height: "80px", borderBottom: `3px solid ${LAVENDER}`, borderLeft: dir === "rtl" ? "none" : `3px solid ${LAVENDER}`, borderRight: dir === "rtl" ? `3px solid ${LAVENDER}` : "none", zIndex: 2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="py-20" style={{ background: PURPLE_DEEP, position: "relative", overflow: "hidden" }}>
        <DiamondPattern opacity={0.15} color={LAVENDER} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="reveal text-center mb-14">
            <p style={{ fontFamily: F, fontSize: "0.75rem", letterSpacing: "0.25em", color: LAVENDER, textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {isAr ? "ما نؤمن به" : isEn ? "What We Believe In" : "我们相信"}
            </p>
            <h2 style={{ fontFamily: F, fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff" }}>{t.pillarsTitle}</h2>
          </div>

          <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: `${LAVENDER}20` }}>
            {pillars.map((pillar) => (
              <div key={pillar.ar} style={{ background: PURPLE_DEEP, padding: "2.5rem 2rem", textAlign: "center", transition: "background 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = PURPLE_ROYAL; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = PURPLE_DEEP; }}>
                <div style={{ fontSize: "2rem", color: LAVENDER, marginBottom: "1rem" }}>{pillar.icon}</div>
                <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: "1.3rem", color: "#fff", marginBottom: "0.75rem" }}>
                  {isAr ? pillar.ar : isEn ? pillar.en : pillar.ar}
                </h3>
                <p style={{ fontFamily: F, color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.8 }}>
                  {isAr ? pillar.descAr : isEn ? pillar.descEn : pillar.descAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section className="py-24" style={{ background: "#0d0d14", position: "relative", overflow: "hidden" }}>
        <div className="container">
          <div className="reveal mb-14">
            <p style={{ fontFamily: F, fontSize: "0.75rem", letterSpacing: "0.25em", color: LAVENDER, textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {isAr ? "ما نقدمه" : isEn ? "What We Offer" : "我们提供"}
            </p>
            <h2 style={{ fontFamily: F, fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff" }}>{t.programsTitle}</h2>
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((prog, i) => (
              <div key={prog.id} style={{
                background: `linear-gradient(135deg, ${PURPLE_ROYAL}60, ${PURPLE_DEEP}80)`,
                border: `1px solid ${LAVENDER}25`,
                padding: "2.5rem",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s, transform 0.3s",
                cursor: "default",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = LAVENDER + "70"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = LAVENDER + "25"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                {/* Number */}
                <div style={{ position: "absolute", top: "1.5rem", [dir === "rtl" ? "left" : "right"]: "1.5rem", fontFamily: F, fontSize: "3rem", fontWeight: 900, color: `${LAVENDER}15`, lineHeight: 1 }}>
                  0{i + 1}
                </div>

                {/* Icon */}
                <div style={{ fontSize: "1.5rem", color: LAVENDER, marginBottom: "1rem" }}>{prog.icon}</div>

                {/* Name */}
                <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: "1.25rem", color: "#fff", marginBottom: "0.75rem" }}>
                  {isAr ? prog.nameAr : isEn ? prog.nameEn : prog.nameAr}
                </h3>

                {/* Description */}
                <p style={{ fontFamily: F, color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                  {isAr ? prog.descAr : isEn ? prog.descEn : prog.descAr}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: F, fontSize: "0.75rem", color: LAVENDER, border: `1px solid ${LAVENDER}50`, padding: "0.25rem 0.75rem", letterSpacing: "0.05em" }}>
                    {isAr ? prog.tag : isEn ? prog.tagEn : prog.tag}
                  </span>
                  <span style={{ fontFamily: F, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)", padding: "0.25rem 0.75rem" }}>
                    {isAr ? prog.freq : isEn ? prog.freqEn : prog.freq}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pattern Divider ── */}
      <div style={{ height: "120px", background: `url(https://d2xsxph8kpxj0f.cloudfront.net/106553263/fHr7Y4tPFdBZFRq9ZFKpfT/sada-pattern-bg-kYFtbhCHG99UwwLAt2x8oD.webp) center/cover`, opacity: 0.6 }} />

      {/* ── Events ── */}
      <section className="py-24" style={{ background: "#0a0a0f" }}>
        <div className="container">
          <div className="reveal mb-14">
            <p style={{ fontFamily: F, fontSize: "0.75rem", letterSpacing: "0.25em", color: LAVENDER, textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {isAr ? "ما يجري" : isEn ? "What's Happening" : "正在发生"}
            </p>
            <h2 style={{ fontFamily: F, fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff" }}>{t.eventsTitle}</h2>
          </div>

          <div className="reveal space-y-4">
            {events.map((event) => (
              <div key={event.id} style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "2rem",
                alignItems: "center",
                padding: "1.75rem 2rem",
                background: event.expired ? "rgba(255,255,255,0.02)" : `${PURPLE_ROYAL}40`,
                border: `1px solid ${event.expired ? "rgba(255,255,255,0.06)" : LAVENDER + "30"}`,
                opacity: event.expired ? 0.55 : 1,
                transition: "border-color 0.3s",
              }}>
                {/* Date */}
                <div style={{ textAlign: "center", minWidth: "80px" }}>
                  <p style={{ fontFamily: F, fontSize: "1.5rem", fontWeight: 700, color: event.expired ? "rgba(255,255,255,0.3)" : LAVENDER_LIGHT, lineHeight: 1 }}>
                    {(isAr ? event.date : event.dateEn).split(" ")[0]}
                  </p>
                  <p style={{ fontFamily: F, fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" }}>
                    {(isAr ? event.date : event.dateEn).split(" ").slice(1).join(" ")}
                  </p>
                </div>

                {/* Info */}
                <div>
                  <h3 style={{ fontFamily: F, fontWeight: 600, fontSize: "1rem", color: "#fff", marginBottom: "0.4rem" }}>
                    {isAr ? event.titleAr : isEn ? event.titleEn : event.titleAr}
                  </h3>
                  <p style={{ fontFamily: F, color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                    {isAr ? event.descAr : isEn ? event.descEn : event.descAr}
                  </p>
                </div>

                {/* Status */}
                <div style={{ textAlign: "center" }}>
                  <span style={{
                    fontFamily: F, fontSize: "0.7rem", letterSpacing: "0.1em",
                    padding: "0.3rem 0.9rem",
                    background: event.expired ? "rgba(255,255,255,0.05)" : `${LAVENDER}20`,
                    color: event.expired ? "rgba(255,255,255,0.35)" : LAVENDER,
                    border: `1px solid ${event.expired ? "rgba(255,255,255,0.1)" : LAVENDER + "50"}`,
                    display: "block", whiteSpace: "nowrap",
                  }}>
                    {event.expired ? t.pastLabel : t.upcomingLabel}
                  </span>
                  <p style={{ fontFamily: F, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" }}>
                    {isAr ? event.location : event.locationEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "6rem 0" }}>
        {/* Background */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${PURPLE_DEEP} 0%, ${PURPLE_ROYAL} 50%, ${PURPLE} 100%)`,
        }} />
        <DiamondPattern opacity={0.2} color={LAVENDER} />

        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="reveal max-w-2xl mx-auto">
            {/* Logo */}
            <img
              src="/manus-storage/Sudaa-White_d1defc89.png"
              alt="سُدى"
              style={{ height: "48px", width: "auto", objectFit: "contain", marginBottom: "2rem", opacity: 0.9 }}
            />
            <h2 style={{ fontFamily: F, fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "1.25rem", lineHeight: 1.3 }}>
              {t.ctaTitle}
            </h2>
            <p style={{ fontFamily: F, color: "rgba(255,255,255,0.75)", lineHeight: 1.9, marginBottom: "2.5rem", fontSize: "1.05rem" }}>
              {t.ctaSub}
            </p>
            <Link href="/join" style={{
              display: "inline-block", padding: "1rem 3rem",
              background: "#fff", color: PURPLE_ROYAL,
              textDecoration: "none", fontFamily: F, fontWeight: 700, fontSize: "1rem",
              letterSpacing: "0.05em", transition: "all 0.3s ease",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = LAVENDER_LIGHT; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}>
              {t.ctaBtn}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
