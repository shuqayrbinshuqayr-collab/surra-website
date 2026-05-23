/* ============================================================
   Umla Community Page — مجتمع عُملة
   Design: Dark cinematic, Diriyah-inspired
   Color: Gold/Amber #C9A84C — هوية عُملة
   ============================================================ */

import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const F = "'ManchetteFine', sans-serif";
const GOLD = "#C9A84C";

// ─── Programs ─────────────────────────────────────────────────────────────────
const programs = [
  {
    id: "craft",
    nameAr: "ورش الحرف",
    nameEn: "Craft Workshops",
    descAr: "ورش عملية متخصصة في الحرف اليدوية التقليدية والمعاصرة، تجمع الحرفيين والمهتمين في بيئة إبداعية تفاعلية.",
    descEn: "Specialized workshops in traditional and contemporary crafts, bringing together artisans and enthusiasts in an interactive creative environment.",
    freq: "شهري",
    freqEn: "Monthly",
    tag: "حرف يدوية",
    tagEn: "Handcraft",
  },
  {
    id: "market",
    nameAr: "سوق عُملة",
    nameEn: "Umla Market",
    descAr: "سوق دوري يتيح للحرفيين والمبدعين عرض منتجاتهم وتسويقها مباشرةً للجمهور، ويُعزز الاقتصاد الإبداعي المحلي.",
    descEn: "A periodic market allowing artisans and creatives to showcase and market their products directly to the public, strengthening the local creative economy.",
    freq: "ربع سنوي",
    freqEn: "Quarterly",
    tag: "سوق إبداعي",
    tagEn: "Creative Market",
  },
  {
    id: "dialogue",
    nameAr: "جلسات الحوار",
    nameEn: "Dialogue Sessions",
    descAr: "جلسات نقاشية تستضيف حرفيين ومصممين وخبراء في الاقتصاد الإبداعي لتبادل الخبرات وتطوير مفهوم الصناعات الثقافية.",
    descEn: "Discussion sessions hosting artisans, designers, and creative economy experts to exchange experiences and develop the concept of cultural industries.",
    freq: "شهري",
    freqEn: "Monthly",
    tag: "حوار",
    tagEn: "Dialogue",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Umla() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "var(--surrah-page-bg)", minHeight: "100vh", color: "var(--surrah-text-primary)" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{
        paddingTop: "140px",
        paddingBottom: "80px",
        background: `linear-gradient(180deg, rgba(201,168,76,0.1) 0%, transparent 100%)`,
        borderBottom: `1px solid rgba(201,168,76,0.15)`,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* خلفية هندسية خفيفة */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 40%)",
          pointerEvents: "none",
        }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "3rem", flexWrap: "wrap" }}>
            {/* شعار عُملة */}
            <div style={{
              width: "160px", height: "160px", flexShrink: 0,
              background: "rgba(201,168,76,0.08)",
              border: `1px solid rgba(201,168,76,0.25)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <img
                src="/manus-storage/Umlah-White_96823e55.png"
                alt="عُملة"
                style={{ width: "110px", objectFit: "contain", filter: `brightness(0) saturate(100%) invert(75%) sepia(40%) saturate(600%) hue-rotate(5deg) brightness(95%)` }}
              />
            </div>
            {/* النص */}
            <div style={{ flex: 1, minWidth: "280px" }}>
              <p style={{ fontFamily: F, fontSize: "0.8rem", color: GOLD, letterSpacing: "0.2em", marginBottom: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                {isAr ? "مجتمعات سُرّة" : "Surra Communities"}
              </p>
              <h1 style={{ fontFamily: F, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.25rem", color: "#fff" }}>
                {isAr ? "عُملة" : "Umlah"}
              </h1>
              <p style={{ fontFamily: F, fontSize: "1.1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: "560px", marginBottom: "2rem" }}>
                {isAr
                  ? "مجتمع يُعنى بالحرف اليدوية والاقتصاد الإبداعي، يجمع الحرفيين والمصممين والمهتمين بالصناعات الثقافية في بيئة داعمة تُقدّر الإبداع وتُحوّله إلى قيمة اقتصادية."
                  : "A community dedicated to handcrafts and the creative economy, bringing together artisans, designers, and cultural industry enthusiasts in a supportive environment that values creativity and transforms it into economic value."}
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a
                  href="/contact"
                  style={{
                    fontFamily: F, fontSize: "0.9rem", fontWeight: 700,
                    color: "#000", background: GOLD,
                    padding: "0.75rem 2rem", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  {isAr ? "انضم إلى المجتمع" : "Join the Community"} ←
                </a>
                <Link
                  href="/communities"
                  style={{
                    fontFamily: F, fontSize: "0.9rem", fontWeight: 600,
                    color: GOLD, background: "transparent",
                    border: `1px solid ${GOLD}`,
                    padding: "0.75rem 2rem", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  {isAr ? "جميع المجتمعات" : "All Communities"} ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: "60px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem" }}>
            {[
              { numAr: "+٦٠", numEn: "60+", labelAr: "عضو نشط", labelEn: "Active Members" },
              { numAr: "+١٢", numEn: "12+", labelAr: "ورشة عمل", labelEn: "Workshops" },
              { numAr: "٤", numEn: "4", labelAr: "أسواق إبداعية", labelEn: "Creative Markets" },
              { numAr: "٢٠٢٤", numEn: "2024", labelAr: "سنة التأسيس", labelEn: "Founded" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "1.5rem 1rem", border: `1px solid rgba(201,168,76,0.12)`, background: "rgba(201,168,76,0.03)" }}>
                <div style={{ fontFamily: F, fontSize: "2.2rem", fontWeight: 900, color: GOLD, marginBottom: "0.4rem" }}>
                  {isAr ? s.numAr : s.numEn}
                </div>
                <div style={{ fontFamily: F, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
                  {isAr ? s.labelAr : s.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: F, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>
                {isAr ? "عن المجتمع" : "ABOUT THE COMMUNITY"}
              </p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, marginBottom: "1.5rem", lineHeight: 1.3 }}>
                {isAr ? "حيث تلتقي الحرفة بالاقتصاد الإبداعي" : "Where Craft Meets the Creative Economy"}
              </h2>
              <p style={{ fontFamily: F, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.9, marginBottom: "1.25rem" }}>
                {isAr
                  ? "مجتمع عُملة هو فضاء متخصص في تنمية الاقتصاد الإبداعي وتمكين الحرفيين والمصممين من تحويل إبداعهم إلى مشاريع مستدامة. نؤمن بأن الحرفة ليست مجرد مهارة، بل هي لغة ثقافية تحمل هوية وتُنتج قيمة."
                  : "Umla community is a space specialized in developing the creative economy and empowering artisans and designers to transform their creativity into sustainable projects. We believe that craft is not just a skill, but a cultural language that carries identity and produces value."}
              </p>
              <p style={{ fontFamily: F, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>
                {isAr
                  ? "من خلال الورش والأسواق وجلسات الحوار، نبني شبكة دعم حقيقية للحرفيين السعوديين، ونُسهم في بناء قطاع الصناعات الثقافية والإبداعية."
                  : "Through workshops, markets, and dialogue sessions, we build a real support network for Saudi artisans, contributing to building the cultural and creative industries sector."}
              </p>
            </div>
            {/* بطاقات القيم */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { titleAr: "الحرفة", titleEn: "Craft", descAr: "إحياء الحرف التقليدية وتطويرها", descEn: "Reviving and developing traditional crafts" },
                { titleAr: "الاقتصاد", titleEn: "Economy", descAr: "تحويل الإبداع إلى قيمة اقتصادية", descEn: "Transforming creativity into economic value" },
                { titleAr: "المجتمع", titleEn: "Community", descAr: "شبكة دعم للحرفيين والمصممين", descEn: "Support network for artisans and designers" },
                { titleAr: "الاستدامة", titleEn: "Sustainability", descAr: "مشاريع إبداعية مستدامة ومؤثرة", descEn: "Sustainable and impactful creative projects" },
              ].map((v, i) => (
                <div key={i} style={{ padding: "1.25rem", background: `rgba(201,168,76,0.05)`, border: `1px solid rgba(201,168,76,0.15)` }}>
                  <div style={{ fontFamily: F, fontSize: "1rem", fontWeight: 800, color: GOLD, marginBottom: "0.4rem" }}>
                    {isAr ? v.titleAr : v.titleEn}
                  </div>
                  <div style={{ fontFamily: F, fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                    {isAr ? v.descAr : v.descEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section style={{ padding: "80px 0", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ fontFamily: F, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {isAr ? "برامجنا" : "OUR PROGRAMS"}
            </p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}>
              {isAr ? "ما نقدّمه في عُملة" : "What We Offer at Umla"}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {programs.map((prog) => (
              <div key={prog.id} style={{
                background: "#111",
                border: `1px solid rgba(201,168,76,0.15)`,
                padding: "2rem",
                transition: "transform 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.borderColor = `rgba(201,168,76,0.4)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.borderColor = `rgba(201,168,76,0.15)`;
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ fontFamily: F, fontSize: "0.7rem", fontWeight: 700, color: GOLD, background: `rgba(201,168,76,0.12)`, padding: "0.2rem 0.6rem", letterSpacing: "0.1em" }}>
                    {isAr ? prog.tag : prog.tagEn}
                  </span>
                  <span style={{ fontFamily: F, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
                    {isAr ? prog.freq : prog.freqEn}
                  </span>
                </div>
                <h3 style={{ fontFamily: F, fontSize: "1.15rem", fontWeight: 800, color: "#fff", marginBottom: "0.75rem" }}>
                  {isAr ? prog.nameAr : prog.nameEn}
                </h3>
                <p style={{ fontFamily: F, fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                  {isAr ? prog.descAr : prog.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{
            background: `linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 100%)`,
            border: `1px solid rgba(201,168,76,0.2)`,
            padding: "4rem 3rem",
            textAlign: "center",
          }}>
            <img
              src="/manus-storage/Umlah-White_96823e55.png"
              alt="عُملة"
              style={{ height: "60px", objectFit: "contain", marginBottom: "2rem", filter: `brightness(0) saturate(100%) invert(75%) sepia(40%) saturate(600%) hue-rotate(5deg) brightness(95%)` }}
            />
            <h2 style={{ fontFamily: F, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, marginBottom: "1rem" }}>
              {isAr ? "انضم إلى مجتمع عُملة" : "Join Umla Community"}
            </h2>
            <p style={{ fontFamily: F, fontSize: "1rem", color: "rgba(255,255,255,0.6)", marginBottom: "2.5rem", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
              {isAr
                ? "كن جزءاً من مجتمع يُقدّر الحرفة ويُحوّلها إلى قيمة اقتصادية وثقافية حقيقية"
                : "Be part of a community that values craft and transforms it into real economic and cultural value"}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="/contact"
                style={{
                  fontFamily: F, fontSize: "0.95rem", fontWeight: 700,
                  color: "#000", background: GOLD,
                  padding: "0.85rem 2.5rem", textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {isAr ? "تواصل معنا" : "Contact Us"} ↗
              </a>
              <Link
                href="/communities"
                style={{
                  fontFamily: F, fontSize: "0.95rem", fontWeight: 600,
                  color: GOLD, background: "transparent",
                  border: `1px solid ${GOLD}`,
                  padding: "0.85rem 2.5rem", textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                {isAr ? "استكشف المجتمعات" : "Explore Communities"} ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
