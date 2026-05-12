/* ============================================================
   Memberships Page — عضويات سُرّة
   4 tiers: بداية / وصل / نخبة / مجلس
   Theme: Black background, white text, orange accent #C4622D
   Font: ManchetteFine
   ============================================================ */

import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'ManchetteFine', sans-serif";
const GOLD = "#C4622D";
const GOLD_DIM = "rgba(196,98,45,0.18)";

/* ── Tier data ── */
const tiers = [
  {
    id: "bidaya",
    name: "سُرّة بداية",
    badge: null,
    tagline: "ابدأ رحلتك داخل سُرّة بدون التزام.",
    monthlyPrice: null,
    yearlyPrice: null,
    priceLabel: "مجانًا",
    yearlyLabel: "مجانًا",
    cta: "ابدأ الآن",
    ctaStyle: "outline",
    for: "من يريد الاستكشاف",
    features: [
      "دخول المجتمع العام",
      "النشرة البريدية",
      "حضور فعاليات مفتوحة محددة",
      "محتوى مجاني مختار",
      "التعرف على الأعضاء الجدد",
    ],
  },
  {
    id: "wasl",
    name: "سُرّة وصل",
    badge: null,
    tagline: "وسّع شبكتك وادخل بعمق أكبر.",
    monthlyPrice: 79,
    yearlyPrice: 790,
    priceLabel: "79",
    yearlyLabel: "790",
    cta: "اشترك في وصل",
    ctaStyle: "outline",
    for: "الباحث عن علاقات وفرص نوعية",
    features: [
      "كل مزايا بداية",
      "دخول مجتمع متخصص واحد",
      "فعاليات شهرية خاصة",
      "مجموعات تواصل مخصصة",
      "خصومات شركاء",
      "أولوية التسجيل في الأنشطة",
    ],
  },
  {
    id: "nukhba",
    name: "سُرّة نخبة",
    badge: "الأكثر اختيارًا",
    tagline: "لمن يريد نتائج أسرع وعلاقات أقوى.",
    monthlyPrice: 149,
    yearlyPrice: 1490,
    priceLabel: "149",
    yearlyLabel: "1,490",
    cta: "انضم للنخبة",
    ctaStyle: "filled",
    for: "الجاد في النمو والوصول",
    features: [
      "كل مزايا وصل",
      "دخول جميع المجتمعات",
      "لقاءات مغلقة شهرية",
      "فرص تعاون وشراكات",
      "مكتبة محتوى احترافية",
      "تقديمات نوعية بين الأعضاء",
      "شارة عضو نخبة",
    ],
  },
  {
    id: "majlis",
    name: "سُرّة مجلس",
    badge: null,
    tagline: "لفئة محدودة تصنع أثرًا أكبر.",
    monthlyPrice: 399,
    yearlyPrice: 3990,
    priceLabel: "399",
    yearlyLabel: "3,990",
    cta: "قدّم طلب الانضمام",
    ctaStyle: "outline",
    for: "التنفيذيون وصنّاع القرار",
    features: [
      "كل مزايا نخبة",
      "دعوات خاصة مغلقة",
      "ولائم نخبوية",
      "جلسات مع مؤسسين وقادة",
      "فرص استثمار وشراكات خاصة",
      "مدير عضوية مخصص",
      "أولوية قصوى في كل الأنشطة",
    ],
  },
];

/* ── Comparison table ── */
const compareFeatures = [
  { label: "المجتمع العام", bidaya: true, wasl: true, nukhba: true, majlis: true },
  { label: "مجتمع متخصص", bidaya: false, wasl: true, nukhba: true, majlis: true },
  { label: "جميع المجتمعات", bidaya: false, wasl: false, nukhba: true, majlis: true },
  { label: "فعاليات خاصة", bidaya: false, wasl: true, nukhba: true, majlis: true },
  { label: "فرص شراكات", bidaya: false, wasl: false, nukhba: true, majlis: true },
  { label: "جلسات نخبوية", bidaya: false, wasl: false, nukhba: false, majlis: true },
  { label: "مدير عضوية", bidaya: false, wasl: false, nukhba: false, majlis: true },
];

/* ── FAQ ── */
const faqs = [
  { q: "هل أستطيع الترقية لاحقًا؟", a: "نعم، في أي وقت." },
  { q: "هل أستطيع الإلغاء؟", a: "نعم، بسهولة ومن داخل الحساب." },
  { q: "هل توجد فعاليات حضورية؟", a: "نعم، حسب المدينة ونوع العضوية." },
  { q: "هل سُرّة مناسب لغير رواد الأعمال؟", a: "نعم، لكل شخص يبحث عن علاقات وفرص ونمو مهني." },
];

export default function Join() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div dir="rtl" style={{ background: "#000", minHeight: "100vh", fontFamily: F }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop: "60px", paddingBottom: "60px", textAlign: "center", borderBottom: `1px solid ${GOLD_DIM}` }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ color: GOLD, letterSpacing: "0.2em", fontSize: "0.85rem", marginBottom: "1rem", whiteSpace: "nowrap" }}>
            عضويات سُرّة
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: "1.2rem" }}>
            ادخل مجتمعًا يصنع لك فرقًا حقيقيًا
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2rem" }}>
            في سُرّة، لا تجمع بطاقات أعمال... بل تبني علاقات ونموًا مستمرًا.
            <br />
            اختر العضوية التي تناسب مرحلتك اليوم، وارتقِ متى ما أردت.
          </p>

          {/* Billing toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "#111", border: `1px solid ${GOLD_DIM}`, borderRadius: "50px", padding: "0.4rem 1rem" }}>
            <button
              onClick={() => setYearly(false)}
              style={{
                background: !yearly ? GOLD : "transparent",
                color: !yearly ? "#fff" : "rgba(255,255,255,0.5)",
                border: "none", borderRadius: "50px", padding: "0.4rem 1.2rem",
                fontFamily: F, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s",
              }}
            >
              شهري
            </button>
            <button
              onClick={() => setYearly(true)}
              style={{
                background: yearly ? GOLD : "transparent",
                color: yearly ? "#fff" : "rgba(255,255,255,0.5)",
                border: "none", borderRadius: "50px", padding: "0.4rem 1.2rem",
                fontFamily: F, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s",
              }}
            >
              سنوي
            </button>
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section style={{ padding: "5rem 0", background: "var(--surrah-section-bg)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}>
            {tiers.map((tier) => {
              const isFeatured = tier.id === "nukhba";
              return (
                <div
                  key={tier.id}
                  style={{
                    background: isFeatured ? "#111" : "#0d0d0d",
                    border: `1px solid ${isFeatured ? GOLD : GOLD_DIM}`,
                    borderRadius: "16px",
                    padding: "2rem 1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    boxShadow: isFeatured ? `0 0 40px rgba(196,98,45,0.15)` : "none",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px rgba(196,98,45,0.2)`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = isFeatured ? `0 0 40px rgba(196,98,45,0.15)` : "none";
                  }}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div style={{
                      position: "absolute", top: "-14px", right: "50%", transform: "translateX(50%)",
                      background: GOLD, color: "#fff", borderRadius: "50px",
                      padding: "0.25rem 1rem", fontSize: "0.75rem", fontFamily: F, whiteSpace: "nowrap",
                    }}>
                      {tier.badge}
                    </div>
                  )}

                  {/* Tier name */}
                  <h3 style={{ color: isFeatured ? GOLD : "#fff", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem", whiteSpace: "nowrap" }}>
                    {tier.name}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                    {tier.tagline}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    {tier.monthlyPrice === null ? (
                      <span style={{ fontSize: "2.2rem", fontWeight: 700, color: "#fff" }}>مجانًا</span>
                    ) : (
                      <>
                        <span style={{ fontSize: "2.2rem", fontWeight: 700, color: "#fff" }}>
                          {yearly ? tier.yearlyLabel : tier.priceLabel}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginRight: "0.3rem" }}>
                          ر.س / {yearly ? "سنة" : "شهر"}
                        </span>
                      </>
                    )}
                  </div>

                  {/* For label */}
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", marginBottom: "1.2rem", borderTop: `1px solid ${GOLD_DIM}`, paddingTop: "1rem" }}>
                    الأنسب لـ: {tier.for}
                  </p>

                  {/* Features */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", flex: 1 }}>
                    {tier.features.map((f, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.65rem", color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", lineHeight: 1.5 }}>
                        <span style={{ color: GOLD, flexShrink: 0, marginTop: "2px" }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/register"
                    style={{
                      display: "block", textAlign: "center",
                      padding: "0.85rem 1.5rem",
                      borderRadius: "8px",
                      fontFamily: F, fontSize: "0.95rem", fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.2s",
                      background: tier.ctaStyle === "filled" ? GOLD : "transparent",
                      color: "#fff",
                      border: `1.5px solid ${tier.ctaStyle === "filled" ? GOLD : "rgba(255,255,255,0.25)"}`,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = GOLD;
                      el.style.borderColor = GOLD;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = tier.ctaStyle === "filled" ? GOLD : "transparent";
                      el.style.borderColor = tier.ctaStyle === "filled" ? GOLD : "rgba(255,255,255,0.25)";
                    }}
                  >
                    {tier.cta}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section style={{ padding: "5rem 0", background: "#000" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
            مقارنة سريعة
          </h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", marginBottom: "3rem", fontSize: "0.95rem" }}>
            اختر الباقة التي تناسب مرحلتك
          </p>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "right", padding: "1rem", color: "rgba(255,255,255,0.5)", fontWeight: 400, fontSize: "0.85rem", borderBottom: `1px solid ${GOLD_DIM}` }}>
                    الميزة
                  </th>
                  {["بداية", "وصل", "نخبة", "مجلس"].map((name, i) => (
                    <th key={i} style={{
                      textAlign: "center", padding: "1rem",
                      color: i === 2 ? GOLD : "#fff",
                      fontWeight: 600, fontSize: "0.95rem",
                      borderBottom: `1px solid ${i === 2 ? GOLD : GOLD_DIM}`,
                    }}>
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareFeatures.map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
                    <td style={{ padding: "0.9rem 1rem", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                      {row.label}
                    </td>
                    {(["bidaya", "wasl", "nukhba", "majlis"] as const).map((key, ci) => (
                      <td key={ci} style={{ textAlign: "center", padding: "0.9rem 1rem" }}>
                        {row[key] ? (
                          <span style={{ color: GOLD, fontSize: "1.1rem" }}>✓</span>
                        ) : (
                          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "1rem" }}>—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── WHY SURRA ── */}
      <section style={{ padding: "5rem 0", background: "var(--surrah-section-bg)", borderTop: `1px solid ${GOLD_DIM}` }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: "#fff", marginBottom: "3rem" }}>
            لماذا يختار الناس سُرّة؟
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
            {[
              "لأن العلاقات الصحيحة تختصر سنوات",
              "لأن الفرص تأتي من الناس، لا من الإعلانات",
              "لأن المجتمع الجيد يرفع مستواك تلقائيًا",
              "لأنك تستحق أن تكون وسط أشخاص يشبهون طموحك",
            ].map((text, i) => (
              <div key={i} style={{ background: "#111", border: `1px solid ${GOLD_DIM}`, borderRadius: "12px", padding: "1.8rem 1.4rem" }}>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.8, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INCENTIVES ── */}
      <section style={{ padding: "4rem 0", background: "#000" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#fff", marginBottom: "2.5rem" }}>
            محفزات تحويل عالية
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.2rem" }}>
            {[
              { title: "عرض سنوي", desc: "اشترك سنويًا واحصل على شهرين مجانًا" },
              { title: "ضمان تجربة", desc: "جرّب أول 7 أيام، وإذا لم تناسبك يمكنك الإلغاء" },
              { title: "ندرة", desc: "عضوية مجلس محدودة بعدد مقاعد شهريًا" },
              { title: "اجتماعي", desc: "+500 عضو مهني وريادي داخل منظومة سُرّة" },
            ].map((item, i) => (
              <div key={i} style={{ borderRight: `3px solid ${GOLD}`, paddingRight: "1rem" }}>
                <h4 style={{ color: GOLD, fontWeight: 700, marginBottom: "0.4rem", fontSize: "1rem" }}>{item.title}</h4>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "5rem 0", background: "var(--surrah-section-bg)", borderTop: `1px solid ${GOLD_DIM}` }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#fff", marginBottom: "2.5rem" }}>
            الأسئلة الشائعة
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "#111", border: `1px solid ${openFaq === i ? GOLD : GOLD_DIM}`,
                  borderRadius: "10px", overflow: "hidden", cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div style={{ padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>{faq.q}</span>
                  <span style={{ color: GOLD, fontSize: "1.2rem", transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginRight: "1rem" }}>+</span>
                </div>
                {openFaq === i && (
                  <div style={{ padding: "0 1.25rem 1rem", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "6rem 0", background: "#000", textAlign: "center", borderTop: `1px solid ${GOLD_DIM}` }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            مكانك القادم قد يغير دائرتك بالكامل
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem", fontSize: "1rem", lineHeight: 1.8 }}>
            ابدأ مجانًا اليوم، أو افتح كامل التجربة عبر سُرّة نخبة.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/register"
              style={{
                background: GOLD, color: "#fff", padding: "0.9rem 2.5rem",
                borderRadius: "8px", fontFamily: F, fontSize: "1rem", fontWeight: 600,
                textDecoration: "none", border: `1.5px solid ${GOLD}`, transition: "opacity 0.2s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              ابدأ الآن
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                background: "transparent", color: "#fff", padding: "0.9rem 2.5rem",
                borderRadius: "8px", fontFamily: F, fontSize: "1rem", fontWeight: 600,
                border: "1.5px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "border-color 0.2s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = GOLD)}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)")}
            >
              عرض الباقات
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
