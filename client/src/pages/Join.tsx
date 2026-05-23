/* ============================================================
   Memberships Page — عضويات سُرّة | Multilingual
   ============================================================ */
import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const F = "'ManchetteFine', sans-serif";
const GOLD = "#C4622D";
const GOLD_DIM = "rgba(196,98,45,0.18)";

const tiersData = {
  ar: [
    { id: "bidaya", name: "سُرّة بداية", badge: null, tagline: "ابدأ رحلتك داخل سُرّة بدون التزام.", monthlyPrice: null, yearlyPrice: null, priceLabel: "مجانًا", yearlyLabel: "مجانًا", cta: "ابدأ الآن", ctaStyle: "outline", for: "من يريد الاستكشاف", features: ["دخول المجتمع العام", "النشرة البريدية", "حضور فعاليات مفتوحة محددة", "محتوى مجاني مختار", "التعرف على الأعضاء الجدد"] },
    { id: "wasl", name: "سُرّة وصل", badge: null, tagline: "وسّع شبكتك وادخل بعمق أكبر.", monthlyPrice: 79, yearlyPrice: 790, priceLabel: "79", yearlyLabel: "790", cta: "اشترك في وصل", ctaStyle: "outline", for: "الباحث عن علاقات وفرص نوعية", features: ["كل مزايا بداية", "دخول مجتمع متخصص واحد", "فعاليات شهرية خاصة", "مجموعات تواصل مخصصة", "خصومات شركاء", "أولوية التسجيل في الأنشطة"] },
    { id: "nukhba", name: "سُرّة نخبة", badge: "الأكثر اختيارًا", tagline: "لمن يريد نتائج أسرع وعلاقات أقوى.", monthlyPrice: 149, yearlyPrice: 1490, priceLabel: "149", yearlyLabel: "1,490", cta: "انضم للنخبة", ctaStyle: "filled", for: "الجاد في النمو والوصول", features: ["كل مزايا وصل", "دخول جميع المجتمعات", "لقاءات مغلقة شهرية", "فرص تعاون وشراكات", "مكتبة محتوى احترافية", "تقديمات نوعية بين الأعضاء", "شارة عضو نخبة"] },
    { id: "majlis", name: "سُرّة مجلس", badge: null, tagline: "لفئة محدودة تصنع أثرًا أكبر.", monthlyPrice: 399, yearlyPrice: 3990, priceLabel: "399", yearlyLabel: "3,990", cta: "قدّم طلب الانضمام", ctaStyle: "outline", for: "التنفيذيون وصنّاع القرار", features: ["كل مزايا نخبة", "دعوات خاصة مغلقة", "ولائم نخبوية", "جلسات مع مؤسسين وقادة", "فرص استثمار وشراكات خاصة", "مدير عضوية مخصص", "أولوية قصوى في كل الأنشطة"] },
  ],
  en: [
    { id: "bidaya", name: "Surra Bidaya", badge: null, tagline: "Start your Surra journey with no commitment.", monthlyPrice: null, yearlyPrice: null, priceLabel: "Free", yearlyLabel: "Free", cta: "Start Now", ctaStyle: "outline", for: "Those who want to explore", features: ["Access to public community", "Newsletter", "Selected open events", "Free curated content", "Meet new members"] },
    { id: "wasl", name: "Surra Wasl", badge: null, tagline: "Expand your network and go deeper.", monthlyPrice: 79, yearlyPrice: 790, priceLabel: "79", yearlyLabel: "790", cta: "Subscribe to Wasl", ctaStyle: "outline", for: "Those seeking quality relationships and opportunities", features: ["All Bidaya benefits", "Access to one specialized community", "Monthly private events", "Dedicated networking groups", "Partner discounts", "Priority registration"] },
    { id: "nukhba", name: "Surra Nukhba", badge: "Most Popular", tagline: "For those who want faster results and stronger relationships.", monthlyPrice: 149, yearlyPrice: 1490, priceLabel: "149", yearlyLabel: "1,490", cta: "Join Nukhba", ctaStyle: "filled", for: "Serious about growth and access", features: ["All Wasl benefits", "Access to all communities", "Monthly closed sessions", "Collaboration and partnership opportunities", "Professional content library", "Quality member introductions", "Elite member badge"] },
    { id: "majlis", name: "Surra Majlis", badge: null, tagline: "For a limited group making a bigger impact.", monthlyPrice: 399, yearlyPrice: 3990, priceLabel: "399", yearlyLabel: "3,990", cta: "Apply to Join", ctaStyle: "outline", for: "Executives and decision makers", features: ["All Nukhba benefits", "Exclusive private invitations", "Elite dinners", "Sessions with founders and leaders", "Private investment and partnership opportunities", "Dedicated membership manager", "Top priority in all activities"] },
  ],
  zh: [
    { id: "bidaya", name: "苏拉入门", badge: null, tagline: "无需承诺，开始您的苏拉之旅。", monthlyPrice: null, yearlyPrice: null, priceLabel: "免费", yearlyLabel: "免费", cta: "立即开始", ctaStyle: "outline", for: "想要探索的人", features: ["进入公共社区", "新闻通讯", "特定开放活动", "精选免费内容", "认识新成员"] },
    { id: "wasl", name: "苏拉连接", badge: null, tagline: "扩展您的网络，深入参与。", monthlyPrice: 79, yearlyPrice: 790, priceLabel: "79", yearlyLabel: "790", cta: "订阅连接", ctaStyle: "outline", for: "寻求优质关系和机会的人", features: ["所有入门权益", "进入一个专业社区", "每月私人活动", "专属社交群组", "合作伙伴折扣", "优先注册"] },
    { id: "nukhba", name: "苏拉精英", badge: "最受欢迎", tagline: "为想要更快结果和更强关系的人。", monthlyPrice: 149, yearlyPrice: 1490, priceLabel: "149", yearlyLabel: "1,490", cta: "加入精英", ctaStyle: "filled", for: "认真追求成长和机会的人", features: ["所有连接权益", "进入所有社区", "每月封闭会议", "合作机会", "专业内容库", "优质成员介绍", "精英成员徽章"] },
    { id: "majlis", name: "苏拉议会", badge: null, tagline: "为有限的群体创造更大影响。", monthlyPrice: 399, yearlyPrice: 3990, priceLabel: "399", yearlyLabel: "3,990", cta: "申请加入", ctaStyle: "outline", for: "高管和决策者", features: ["所有精英权益", "独家私人邀请", "精英晚宴", "与创始人和领导者的会议", "私人投资和合作机会", "专属会员经理", "所有活动最高优先级"] },
  ],
};

const compareFeaturesData = {
  ar: [
    { label: "المجتمع العام", bidaya: true, wasl: true, nukhba: true, majlis: true },
    { label: "مجتمع متخصص", bidaya: false, wasl: true, nukhba: true, majlis: true },
    { label: "جميع المجتمعات", bidaya: false, wasl: false, nukhba: true, majlis: true },
    { label: "فعاليات خاصة", bidaya: false, wasl: true, nukhba: true, majlis: true },
    { label: "فرص شراكات", bidaya: false, wasl: false, nukhba: true, majlis: true },
    { label: "جلسات نخبوية", bidaya: false, wasl: false, nukhba: false, majlis: true },
    { label: "مدير عضوية", bidaya: false, wasl: false, nukhba: false, majlis: true },
  ],
  en: [
    { label: "Public community", bidaya: true, wasl: true, nukhba: true, majlis: true },
    { label: "Specialized community", bidaya: false, wasl: true, nukhba: true, majlis: true },
    { label: "All communities", bidaya: false, wasl: false, nukhba: true, majlis: true },
    { label: "Private events", bidaya: false, wasl: true, nukhba: true, majlis: true },
    { label: "Partnership opportunities", bidaya: false, wasl: false, nukhba: true, majlis: true },
    { label: "Elite sessions", bidaya: false, wasl: false, nukhba: false, majlis: true },
    { label: "Membership manager", bidaya: false, wasl: false, nukhba: false, majlis: true },
  ],
  zh: [
    { label: "公共社区", bidaya: true, wasl: true, nukhba: true, majlis: true },
    { label: "专业社区", bidaya: false, wasl: true, nukhba: true, majlis: true },
    { label: "所有社区", bidaya: false, wasl: false, nukhba: true, majlis: true },
    { label: "私人活动", bidaya: false, wasl: true, nukhba: true, majlis: true },
    { label: "合作机会", bidaya: false, wasl: false, nukhba: true, majlis: true },
    { label: "精英会议", bidaya: false, wasl: false, nukhba: false, majlis: true },
    { label: "会员经理", bidaya: false, wasl: false, nukhba: false, majlis: true },
  ],
};

const faqsData = {
  ar: [
    { q: "هل أستطيع الترقية لاحقًا؟", a: "نعم، في أي وقت." },
    { q: "هل أستطيع الإلغاء؟", a: "نعم، بسهولة ومن داخل الحساب." },
    { q: "هل توجد فعاليات حضورية؟", a: "نعم، حسب المدينة ونوع العضوية." },
    { q: "هل سُرّة مناسب لغير رواد الأعمال؟", a: "نعم، لكل شخص يبحث عن علاقات وفرص ونمو مهني." },
  ],
  en: [
    { q: "Can I upgrade later?", a: "Yes, at any time." },
    { q: "Can I cancel?", a: "Yes, easily from within your account." },
    { q: "Are there in-person events?", a: "Yes, depending on the city and membership type." },
    { q: "Is Surra suitable for non-entrepreneurs?", a: "Yes, for anyone seeking relationships, opportunities, and professional growth." },
  ],
  zh: [
    { q: "我可以以后升级吗？", a: "是的，随时可以。" },
    { q: "我可以取消吗？", a: "是的，可以从账户内轻松取消。" },
    { q: "有线下活动吗？", a: "是的，根据城市和会员类型而定。" },
    { q: "苏拉适合非创业者吗？", a: "是的，适合任何寻求关系、机会和职业成长的人。" },
  ],
};

const pageTexts = {
  ar: { label: "عضويات سُرّة", h1: "ادخل مجتمعًا يصنع لك فرقًا حقيقيًا", sub: "في سُرّة، لا تجمع بطاقات أعمال... بل تبني علاقات ونموًا مستمرًا.", monthly: "شهري", annual: "سنوي", freeLabel: "مجانًا", perMonth: "شهر", perYear: "سنة", forLabel: "الأنسب لـ:", compareTitle: "مقارنة سريعة", compareSub: "اختر الباقة التي تناسب مرحلتك", feature: "الميزة", whyTitle: "لماذا يختار الناس سُرّة؟", whyItems: ["لأن العلاقات الصحيحة تختصر سنوات", "لأن الفرص تأتي من الناس، لا من الإعلانات", "لأن المجتمع الجيد يرفع مستواك تلقائيًا", "لأنك تستحق أن تكون وسط أشخاص يشبهون طموحك"], incentivesTitle: "محفزات تحويل عالية", incentives: [{ title: "عرض سنوي", desc: "اشترك سنويًا واحصل على شهرين مجانًا" }, { title: "ضمان تجربة", desc: "جرّب أول 7 أيام، وإذا لم تناسبك يمكنك الإلغاء" }, { title: "ندرة", desc: "عضوية مجلس محدودة بعدد مقاعد شهريًا" }, { title: "اجتماعي", desc: "+500 عضو مهني وريادي داخل منظومة سُرّة" }], faqTitle: "الأسئلة الشائعة", ctaTitle: "مكانك القادم قد يغير دائرتك بالكامل", ctaSub: "ابدأ مجانًا اليوم، أو افتح كامل التجربة عبر سُرّة نخبة.", ctaStart: "ابدأ الآن", ctaPlans: "عرض الباقات", tierNames: ["بداية", "وصل", "نخبة", "مجلس"] },
  en: { label: "Surra Memberships", h1: "Join a community that makes a real difference", sub: "At Surra, you don't collect business cards... you build relationships and continuous growth.", monthly: "Monthly", annual: "Annual", freeLabel: "Free", perMonth: "month", perYear: "year", forLabel: "Best for:", compareTitle: "Quick Comparison", compareSub: "Choose the plan that fits your stage", feature: "Feature", whyTitle: "Why do people choose Surra?", whyItems: ["Because the right relationships save years", "Because opportunities come from people, not ads", "Because a good community automatically elevates you", "Because you deserve to be among people who share your ambition"], incentivesTitle: "High Conversion Incentives", incentives: [{ title: "Annual Offer", desc: "Subscribe annually and get 2 months free" }, { title: "Experience Guarantee", desc: "Try the first 7 days, cancel if it doesn't suit you" }, { title: "Scarcity", desc: "Majlis membership limited to a monthly seat count" }, { title: "Social Proof", desc: "+500 professional and entrepreneurial members in Surra" }], faqTitle: "Frequently Asked Questions", ctaTitle: "Your next place might change your entire circle", ctaSub: "Start free today, or unlock the full experience with Surra Nukhba.", ctaStart: "Start Now", ctaPlans: "View Plans", tierNames: ["Bidaya", "Wasl", "Nukhba", "Majlis"] },
  zh: { label: "苏拉会员资格", h1: "加入一个真正有影响力的社区", sub: "在苏拉，您不是在收集名片……而是在建立关系和持续成长。", monthly: "月度", annual: "年度", freeLabel: "免费", perMonth: "月", perYear: "年", forLabel: "最适合：", compareTitle: "快速比较", compareSub: "选择适合您阶段的计划", feature: "功能", whyTitle: "为什么人们选择苏拉？", whyItems: ["因为正确的关系节省数年时间", "因为机会来自人，而非广告", "因为好的社区自动提升您的水平", "因为您值得与有相同抱负的人在一起"], incentivesTitle: "高转化激励", incentives: [{ title: "年度优惠", desc: "年度订阅可获得2个月免费" }, { title: "体验保证", desc: "试用前7天，不满意可取消" }, { title: "稀缺性", desc: "议会会员每月名额有限" }, { title: "社交证明", desc: "苏拉内有500+专业和创业成员" }], faqTitle: "常见问题", ctaTitle: "您的下一个地方可能改变您的整个圈子", ctaSub: "今天免费开始，或通过苏拉精英解锁完整体验。", ctaStart: "立即开始", ctaPlans: "查看计划", tierNames: ["入门", "连接", "精英", "议会"] },
};

export default function Join() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { lang, dir } = useLanguage();
  const tx = pageTexts[lang] || pageTexts.ar;
  const tiers = tiersData[lang] || tiersData.ar;
  const compareFeatures = compareFeaturesData[lang] || compareFeaturesData.ar;
  const faqs = faqsData[lang] || faqsData.ar;

  return (
    <div dir={dir} style={{ background: "#000", minHeight: "100vh", fontFamily: F }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop: "60px", paddingBottom: "60px", textAlign: "center", borderBottom: `1px solid ${GOLD_DIM}`, position: "relative", overflow: "hidden", minHeight: "55vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Video Background */}
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }}
        >
          <source src="/manus-storage/eeffaa39-2f02-4fb7-adc8-70336b80ca41_9b99a2b9.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.8) 100%)" }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
          <p style={{ color: GOLD, letterSpacing: "0.2em", fontSize: "0.85rem", marginBottom: "1rem", whiteSpace: "nowrap" }}>{tx.label}</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: "1.2rem" }}>{tx.h1}</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2rem" }}>{tx.sub}</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "#111", border: `1px solid ${GOLD_DIM}`, borderRadius: "50px", padding: "0.4rem 1rem" }}>
            <button onClick={() => setYearly(false)} style={{ background: !yearly ? GOLD : "transparent", color: !yearly ? "#fff" : "rgba(255,255,255,0.5)", border: "none", borderRadius: "50px", padding: "0.4rem 1.2rem", fontFamily: F, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s" }}>{tx.monthly}</button>
            <button onClick={() => setYearly(true)} style={{ background: yearly ? GOLD : "transparent", color: yearly ? "#fff" : "rgba(255,255,255,0.5)", border: "none", borderRadius: "50px", padding: "0.4rem 1.2rem", fontFamily: F, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s" }}>{tx.annual}</button>
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section style={{ padding: "5rem 0", background: "var(--surrah-section-bg)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {tiers.map((tier) => {
              const isFeatured = tier.id === "nukhba";
              return (
                <div key={tier.id} style={{ background: isFeatured ? "#111" : "#0d0d0d", border: `1px solid ${isFeatured ? GOLD : GOLD_DIM}`, borderRadius: "16px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", position: "relative", boxShadow: isFeatured ? `0 0 40px rgba(196,98,45,0.15)` : "none", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px rgba(196,98,45,0.2)`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = isFeatured ? `0 0 40px rgba(196,98,45,0.15)` : "none"; }}>
                  {tier.badge && (
                    <div style={{ position: "absolute", top: "-14px", right: "50%", transform: "translateX(50%)", background: GOLD, color: "#fff", borderRadius: "50px", padding: "0.25rem 1rem", fontSize: "0.75rem", fontFamily: F, whiteSpace: "nowrap" }}>{tier.badge}</div>
                  )}
                  <h3 style={{ color: isFeatured ? GOLD : "#fff", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem", whiteSpace: "nowrap" }}>{tier.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>{tier.tagline}</p>
                  <div style={{ marginBottom: "1.5rem" }}>
                    {tier.monthlyPrice === null ? (
                      <span style={{ fontSize: "2.2rem", fontWeight: 700, color: "#fff" }}>{tx.freeLabel}</span>
                    ) : (
                      <>
                        <span style={{ fontSize: "2.2rem", fontWeight: 700, color: "#fff" }}>{yearly ? tier.yearlyLabel : tier.priceLabel}</span>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginRight: "0.3rem" }}> / {yearly ? tx.perYear : tx.perMonth}</span>
                      </>
                    )}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", marginBottom: "1.2rem", borderTop: `1px solid ${GOLD_DIM}`, paddingTop: "1rem" }}>{tx.forLabel} {tier.for}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", flex: 1 }}>
                    {tier.features.map((f, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.65rem", color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", lineHeight: 1.5 }}>
                        <span style={{ color: GOLD, flexShrink: 0, marginTop: "2px" }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" style={{ display: "block", textAlign: "center", padding: "0.85rem 1.5rem", borderRadius: "8px", fontFamily: F, fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", transition: "all 0.2s", background: tier.ctaStyle === "filled" ? GOLD : "transparent", color: "#fff", border: `1.5px solid ${tier.ctaStyle === "filled" ? GOLD : "rgba(255,255,255,0.25)"}` }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = GOLD; el.style.borderColor = GOLD; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = tier.ctaStyle === "filled" ? GOLD : "transparent"; el.style.borderColor = tier.ctaStyle === "filled" ? GOLD : "rgba(255,255,255,0.25)"; }}>
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
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>{tx.compareTitle}</h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", marginBottom: "3rem", fontSize: "0.95rem" }}>{tx.compareSub}</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F }}>
              <thead>
                <tr>
                  <th style={{ textAlign: dir === "rtl" ? "right" : "left", padding: "1rem", color: "rgba(255,255,255,0.5)", fontWeight: 400, fontSize: "0.85rem", borderBottom: `1px solid ${GOLD_DIM}` }}>{tx.feature}</th>
                  {tx.tierNames.map((name, i) => (
                    <th key={i} style={{ textAlign: "center", padding: "1rem", color: i === 2 ? GOLD : "#fff", fontWeight: 600, fontSize: "0.95rem", borderBottom: `1px solid ${i === 2 ? GOLD : GOLD_DIM}` }}>{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareFeatures.map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
                    <td style={{ padding: "0.9rem 1rem", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>{row.label}</td>
                    {(["bidaya", "wasl", "nukhba", "majlis"] as const).map((key, ci) => (
                      <td key={ci} style={{ textAlign: "center", padding: "0.9rem 1rem" }}>
                        {row[key] ? <span style={{ color: GOLD, fontSize: "1.1rem" }}>✓</span> : <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "1rem" }}>—</span>}
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
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: "#fff", marginBottom: "3rem" }}>{tx.whyTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
            {tx.whyItems.map((text, i) => (
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
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#fff", marginBottom: "2.5rem" }}>{tx.incentivesTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.2rem" }}>
            {tx.incentives.map((item, i) => (
              <div key={i} style={{ borderRight: dir === "rtl" ? `3px solid ${GOLD}` : "none", borderLeft: dir === "ltr" ? `3px solid ${GOLD}` : "none", paddingRight: dir === "rtl" ? "1rem" : "0", paddingLeft: dir === "ltr" ? "1rem" : "0" }}>
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
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#fff", marginBottom: "2.5rem" }}>{tx.faqTitle}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: "#111", border: `1px solid ${openFaq === i ? GOLD : GOLD_DIM}`, borderRadius: "10px", overflow: "hidden", cursor: "pointer", transition: "border-color 0.2s" }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>{faq.q}</span>
                  <span style={{ color: GOLD, fontSize: "1.2rem", transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginRight: dir === "rtl" ? "1rem" : "0", marginLeft: dir === "ltr" ? "1rem" : "0" }}>+</span>
                </div>
                {openFaq === i && (
                  <div style={{ padding: "0 1.25rem 1rem", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "6rem 0", background: "#000", textAlign: "center", borderTop: `1px solid ${GOLD_DIM}` }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>{tx.ctaTitle}</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem", fontSize: "1rem", lineHeight: 1.8 }}>{tx.ctaSub}</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" style={{ background: GOLD, color: "#fff", padding: "0.9rem 2.5rem", borderRadius: "8px", fontFamily: F, fontSize: "1rem", fontWeight: 600, textDecoration: "none", border: `1.5px solid ${GOLD}`, transition: "opacity 0.2s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}>
              {tx.ctaStart}
            </Link>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ background: "transparent", color: "#fff", padding: "0.9rem 2.5rem", borderRadius: "8px", fontFamily: F, fontSize: "1rem", fontWeight: 600, border: "1.5px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "border-color 0.2s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = GOLD)}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)")}>
              {tx.ctaPlans}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
