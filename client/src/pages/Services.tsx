/* ============================================================
   Services Page — خدماتنا — سُرّة | Multilingual
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const F = "'ManchetteFine', sans-serif";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); }); },
      { threshold: 0.12 }
    );
    el.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const servicesData = {
  ar: [
    {
      id: "communities", number: "٠١", title: "صناعة المجتمعات",
      tagline: "نصمم المجتمعات من الجذور لا من الواجهة",
      description: "نرافق المبادرات والجهات والعلامات التجارية في تحويل رؤاها إلى مجتمعات حية. نبدأ من الجذور: من الهوية والغاية والإنسان، لا من الشكل والواجهة.",
      points: ["بناء هوية المجتمع", "تحديد الفئة المستهدفة", "الهيكلة والتنظيم", "خطط التشغيل والاستدامة"],
      forWhom: ["جهات حكومية", "علامات تجارية", "مبادرات ثقافية", "أفراد أصحاب رؤى"],
    },
    {
      id: "programs", number: "٠٢", title: "إنشاء البرامج الثقافية",
      tagline: "نحول المحتوى إلى تجربة",
      description: "نحول الأفكار والمعرفة إلى برامج ثقافية حية تُشعل الفضول وتبني الانتماء.",
      points: ["برامج حوارية", "سلاسل معرفية", "تجارب ثقافية متخصصة"],
      forWhom: ["جهات حكومية", "علامات تجارية", "مبادرات ثقافية"],
    },
    {
      id: "events", number: "٠٣", title: "تنظيم الفعاليات الحية",
      tagline: "نصمم الفعالية كرحلة لا كموعد",
      description: "نُدير الفعاليات الثقافية والإبداعية من الفكرة حتى التوثيق.",
      points: ["تصميم التجربة", "إدارة الحدث وتشغيله", "إدارة الحضور", "التوثيق"],
      forWhom: ["جهات حكومية", "علامات تجارية", "مبادرات ثقافية"],
    },
    {
      id: "audience", number: "٠٤", title: "توفير الجمهور المستهدف",
      tagline: "نوصل الرسالة إلى من يهمه سماعها",
      description: "نربط العلامات التجارية والمبادرات بجمهورها الحقيقي.",
      points: ["بناء مجتمعات متخصصة", "إدارة قواعد الجمهور", "ربط العلامات التجارية بجمهورها الحقيقي"],
      forWhom: ["علامات تجارية", "مبادرات ثقافية"],
    },
  ],
  en: [
    {
      id: "communities", number: "01", title: "Community Building",
      tagline: "We design communities from the roots, not the surface",
      description: "We accompany initiatives, organizations, and brands in transforming their visions into living communities. We start from the roots: identity, purpose, and people.",
      points: ["Building community identity", "Defining target audience", "Structuring and organizing", "Operations and sustainability plans"],
      forWhom: ["Government entities", "Brands", "Cultural initiatives", "Visionary individuals"],
    },
    {
      id: "programs", number: "02", title: "Cultural Programs",
      tagline: "We transform content into experience",
      description: "We transform ideas and knowledge into vibrant cultural programs that ignite curiosity and build belonging.",
      points: ["Dialogue programs", "Knowledge series", "Specialized cultural experiences"],
      forWhom: ["Government entities", "Brands", "Cultural initiatives"],
    },
    {
      id: "events", number: "03", title: "Event Organization",
      tagline: "We design events as journeys, not appointments",
      description: "We manage cultural and creative events from concept to documentation.",
      points: ["Experience design", "Event management and operations", "Attendance management", "Documentation"],
      forWhom: ["Government entities", "Brands", "Cultural initiatives"],
    },
    {
      id: "audience", number: "04", title: "Audience Development",
      tagline: "We deliver the message to those who need to hear it",
      description: "We connect brands and initiatives with their real audience.",
      points: ["Building specialized communities", "Managing audience databases", "Connecting brands with their real audience"],
      forWhom: ["Brands", "Cultural initiatives"],
    },
  ],
  zh: [
    {
      id: "communities", number: "01", title: "社区建设",
      tagline: "我们从根源而非表面设计社区",
      description: "我们陪伴倡议、组织和品牌将其愿景转化为有生命力的社区。",
      points: ["建立社区身份", "确定目标受众", "结构化和组织", "运营和可持续发展计划"],
      forWhom: ["政府机构", "品牌", "文化倡议", "有远见的个人"],
    },
    {
      id: "programs", number: "02", title: "文化项目",
      tagline: "我们将内容转化为体验",
      description: "我们将想法和知识转化为充满活力的文化项目，点燃好奇心并建立归属感。",
      points: ["对话项目", "知识系列", "专业文化体验"],
      forWhom: ["政府机构", "品牌", "文化倡议"],
    },
    {
      id: "events", number: "03", title: "活动组织",
      tagline: "我们将活动设计为旅程而非约会",
      description: "我们管理从概念到记录的文化和创意活动。",
      points: ["体验设计", "活动管理和运营", "出席管理", "记录"],
      forWhom: ["政府机构", "品牌", "文化倡议"],
    },
    {
      id: "audience", number: "04", title: "受众开发",
      tagline: "我们将信息传递给需要听到的人",
      description: "我们将品牌和倡议与其真实受众联系起来。",
      points: ["建立专业社区", "管理受众数据库", "将品牌与真实受众联系"],
      forWhom: ["品牌", "文化倡议"],
    },
  ],
};

const stagesData = {
  ar: [
    { step: "١", title: "فهم الفكرة والرؤية", desc: "نُصغي بعمق لفهم ما تريد بناءه وما تسعى لتحقيقه." },
    { step: "٢", title: "تصميم المجتمع وهويته", desc: "نصمم المجتمع من الجذور: الهوية، الهيكل، التجربة." },
    { step: "٣", title: "الإطلاق والتشغيل والتطوير", desc: "نُطلق، نُشغّل، نقيس، ونطوّر باستمرار." },
  ],
  en: [
    { step: "1", title: "Understanding the Idea & Vision", desc: "We listen deeply to understand what you want to build and what you aim to achieve." },
    { step: "2", title: "Designing the Community & Identity", desc: "We design the community from the roots: identity, structure, experience." },
    { step: "3", title: "Launch, Operations & Development", desc: "We launch, operate, measure, and continuously develop." },
  ],
  zh: [
    { step: "1", title: "理解想法和愿景", desc: "我们深入倾听，了解您想要建立什么以及您的目标。" },
    { step: "2", title: "设计社区和身份", desc: "我们从根源设计社区：身份、结构、体验。" },
    { step: "3", title: "启动、运营和发展", desc: "我们启动、运营、衡量并持续发展。" },
  ],
};

export default function Services() {
  const pageRef = useReveal();
  const { lang, t, dir } = useLanguage();
  const services = servicesData[lang] || servicesData.ar;
  const stages = stagesData[lang] || stagesData.ar;

  const heroTexts = {
    ar: { h1a: "نرافقك من الفكرة", h1b: "حتى الاستدامة", sub: "أربع خدمات متكاملة تُغطي كل مراحل بناء المجتمع الثقافي، من التأسيس إلى التأثير.", stages: "ماذا نقدم لك؟", stagesSub: "نرافقك من الفكرة حتى الاستدامة", cta: "ابدأ الحديث معنا", ctaSub: "نؤمن أن كل حوار جاد هو بداية…", ctaBtn: "تواصل معنا ←", forWhom: "لمن هذه الخدمة؟" },
    en: { h1a: "We accompany you", h1b: "from idea to sustainability", sub: "Four integrated services covering all stages of building a cultural community, from founding to impact.", stages: "What do we offer?", stagesSub: "We accompany you from idea to sustainability", cta: "Start the conversation", ctaSub: "We believe every serious conversation is a beginning…", ctaBtn: "Contact Us →", forWhom: "Who is this for?" },
    zh: { h1a: "我们陪伴您", h1b: "从想法到可持续发展", sub: "四项综合服务，涵盖建设文化社区的所有阶段，从创立到影响。", stages: "我们提供什么？", stagesSub: "我们陪伴您从想法到可持续发展", cta: "开始对话", ctaSub: "我们相信每一次认真的对话都是一个开始…", ctaBtn: "联系我们 →", forWhom: "适合谁？" },
  };
  const ht = heroTexts[lang] || heroTexts.ar;

  return (
    <div ref={pageRef} style={{ background: "var(--surrah-page-bg)", minHeight: "100vh" }} dir={dir}>
      <Navbar />

      {/* ── Page Hero (Video) ── */}
      <section
        style={{
          position: "relative",
          height: "65vh",
          minHeight: "420px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          paddingTop: "96px",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          <source src="/manus-storage/close-up-a-hand-touching-an-old-wooden-najdi-door-_7fc69e8c.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.5) 50%, rgba(13,13,13,0.15) 100%)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "3.5rem" }}>
          <p
            style={{
              fontFamily: F,
              fontWeight: 600,
              fontSize: "0.7rem",
              color: "#C4622D",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {t("services.hero.title")}
          </p>
          <h1
            style={{
              fontFamily: F,
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#F0EAD6",
              lineHeight: 1.2,
            }}
          >
            {ht.h1a}
            <br /><span style={{ color: "#C4622D" }}>{ht.h1b}</span>
          </h1>
        </div>
      </section>

      {/* ── Services Detail ── */}
      <section className="py-16" style={{ background: "var(--surrah-section-bg)" }}>
        <div className="container">
          <div className="space-y-px" style={{ background: "rgba(28, 43, 58, 0.08)" }}>
            {services.map((service, i) => (
              <div key={service.id} id={service.id} className="reveal grid grid-cols-1 lg:grid-cols-3 gap-0" style={{ background: "var(--surrah-section-bg)", transitionDelay: `${i * 0.1}s` }}>
                <div className="p-8 md:p-12 lg:border-l" style={{ borderColor: "rgba(28, 43, 58, 0.08)" }}>
                  <span className="block text-5xl mb-4" style={{ fontFamily: F, fontWeight: 900, color: "rgba(181, 69, 58, 0.3)" }}>{service.number}</span>
                  <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "var(--surrah-text-primary)", marginBottom: "0.5rem" }}>{service.title}</h2>
                  <p style={{ fontFamily: F, fontWeight: 600, color: "#C4622D", fontSize: "0.95rem", fontStyle: "italic" }}>{service.tagline}</p>
                </div>
                <div className="p-8 md:p-12 lg:border-l" style={{ borderColor: "rgba(28, 43, 58, 0.08)" }}>
                  <p className="mb-6" style={{ fontFamily: F, fontWeight: 500, color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", lineHeight: 1.9 }}>{service.description}</p>
                  <ul className="space-y-2">
                    {service.points.map((point, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm" style={{ fontFamily: F, fontWeight: 400, color: "rgba(255,255,255,0.75)" }}>
                        <span style={{ color: "#C4622D" }}>◈</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 md:p-12">
                  <p className="text-xs mb-4" style={{ color: "#C4622D", fontFamily: F, fontWeight: 400, letterSpacing: "0.15em" }}>{ht.forWhom}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.forWhom.map((item, j) => (
                      <span key={j} className="text-xs px-3 py-1.5" style={{ border: "1px solid rgba(196, 98, 45, 0.4)", color: "#C4622D", fontFamily: F, fontWeight: 400 }}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work Stages ── */}
      <section className="py-24" style={{ background: "var(--surrah-section-alt)" }}>
        <div className="container">
          <div className="reveal mb-14">
            <div className="surrah-divider" />
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "var(--surrah-text-primary)" }}>{ht.stages}</h2>
            <p className="mt-2" style={{ fontFamily: F, fontWeight: 400, color: "rgba(255,255,255,0.65)" }}>{ht.stagesSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stages.map((item, i) => (
              <div key={i} className="reveal p-8" style={{ background: "var(--surrah-section-alt)", border: "1px solid rgba(28, 43, 58, 0.12)", transitionDelay: `${i * 0.1}s` }}>
                <span className="block text-5xl mb-4" style={{ fontFamily: F, fontWeight: 900, color: "rgba(181, 69, 58, 0.3)" }}>{item.step}</span>
                <h4 className="mb-2" style={{ fontFamily: F, fontWeight: 600, color: "var(--surrah-text-primary)", fontSize: "1.1rem" }}>{item.title}</h4>
                <p className="text-sm" style={{ fontFamily: F, fontWeight: 400, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24" style={{ background: "var(--surrah-section-bg)" }}>
        <div className="container text-center">
          <div className="reveal max-w-xl mx-auto">
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "var(--surrah-text-primary)", marginBottom: "1rem" }}>{ht.cta}</h2>
            <p className="mb-8" style={{ fontFamily: F, fontWeight: 500, color: "#7A8A9A", lineHeight: 1.8 }}>{ht.ctaSub}</p>
            <Link href="/contact" className="btn-surrah-primary-filled text-base px-8 py-3.5">{ht.ctaBtn}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
