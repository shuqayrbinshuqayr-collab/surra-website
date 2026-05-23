/* ============================================================
   About Page — سُرّة | SURRAH
   Brand: cream background, navy text, terracotta accents
   Hero: Artboard1@2x (event photo with Surrah logo overlay)
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const F = "'ManchetteFine', sans-serif";

const values = [
  { title: "العمق", titleEn: "Depth", titleZh: "深度", desc: "نؤمن أن كل مجتمع حقيقي يبدأ من سؤال عميق، لا من حدث عابر.", descEn: "We believe every real community starts from a deep question, not a passing event.", descZh: "我们相信每个真正的社区都始于一个深刻的问题，而非一个过山车的活动。" },
  { title: "الأصالة", titleEn: "Authenticity", titleZh: "真实性", desc: "نستلهم من الهوية السعودية ونبني عليها، لا نستورد نماذج جاهزة.", descEn: "We draw inspiration from Saudi identity and build upon it, not import ready-made models.", descZh: "我们从沙特阿拉伯身份中吸取灵感并在其基础上建设，而不是引进现成模式。" },
  { title: "الاستدامة", titleEn: "Sustainability", titleZh: "可持续性", desc: "نصمم للأثر الطويل، لا للحضور اللحظي.", descEn: "We design for long-term impact, not momentary presence.", descZh: "我们为长期影响而设计，而不是瞬间存在。" },
  { title: "الإنسان أولاً", titleEn: "People First", titleZh: "以人为本", desc: "المجتمع ليس برنامجاً، بل هو الناس الذين يصنعونه.", descEn: "A community is not a program, but the people who create it.", descZh: "社区不是一个项目，而是创造它的人们。" },
  { title: "الشراكة", titleEn: "Partnership", titleZh: "合作关系", desc: "نبني علاقات حقيقية قائمة على الثقة والمصلحة المشتركة.", descEn: "We build real relationships based on trust and mutual interest.", descZh: "我们建立基于信任和共同利益的真实关系。" },
];

const steps = [
  { num: "١", title: "نبدأ بالفكرة", titleEn: "Start with the Idea", titleZh: "从想法开始", desc: "نُصغي للإنسان، نفهم الفكرة والرؤية.", descEn: "We listen to people, understand the idea and vision.", descZh: "我们倾听人们的声音，理解想法和愿景。" },
  { num: "٢", title: "نصمم التجربة", titleEn: "Design the Experience", titleZh: "设计体验", desc: "نصمم المجتمع وهويته وتجربته.", descEn: "We design the community, its identity and experience.", descZh: "我们设计社区、其身份和体验。" },
  { num: "٣", title: "نبني المجتمع", titleEn: "Build the Community", titleZh: "建设社区", desc: "نبني مجتمعاً قادراً على الاستمرار.", descEn: "We build a community capable of continuing.", descZh: "我们建设一个能够持续发展的社区。" },
  { num: "٤", title: "نُشغّل ونُطوّر", titleEn: "Operate & Develop", titleZh: "运营与发展", desc: "نُشغّل، نقيس، ونطوّر باستمرار.", descEn: "We operate, measure, and continuously develop.", descZh: "我们运营、衡量并持续发展。" },
];

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

export default function About() {
  const pageRef = useReveal();
  const { lang } = useLanguage();

  return (
    <div ref={pageRef} style={{ background: "var(--surrah-page-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Hero ── */}
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
          <source src="/manus-storage/transform-to-night-sky-over-diriyah-thunder-clouds_987c713a.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(28, 43, 58, 0.92) 0%, rgba(28, 43, 58, 0.5) 50%, rgba(28, 43, 58, 0.2) 100%)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "3.5rem" }}>
          <p
            style={{
              fontFamily: "'ManchetteFine', sans-serif",
              fontWeight: 600,
              fontSize: "0.7rem",
              color: "#C4622D",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            ABOUT SURRAH
          </p>
          <h1
            style={{
              fontFamily: F,
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "var(--surrah-text-primary)",
              lineHeight: 1.2,
            }}
          >
            {lang === "ar" ? "من نحن" : lang === "en" ? "About Us" : "关于我们"}
          </h1>
        </div>
      </section>

      {/* ── Who is Surra ── */}
      <section style={{ background: "var(--surrah-section-bg)", padding: "5rem 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <div className="surrah-divider" />
              <h2
                style={{
                  fontFamily: F,
                  fontWeight: 900,
                  fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                  color: "var(--surrah-text-primary)",
                  lineHeight: 1.3,
                  marginBottom: "1.5rem",
                }}
              >
                {lang === "ar" ? "لأنها النقطة التي تنبثق منها الدوائر" : lang === "en" ? "The Point from Which Circles Emerge" : "圆圈涌现的起点"}
              </h2>
              <p
                style={{
                  fontFamily: F,
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 2.1,
                  marginBottom: "1.5rem",
                }}
              >
                {lang === "ar" ? "سُرّة كيان سعودي ثقافي متخصص في تصميم وبناء وتشغيل المجتمعات الثقافية والإبداعية ذات الأثر المستدام. اسمها مستوحى من نقطة الوسط التي تنبثق منها الدوائر — لأنها مركز تنشأ منه كل الحلقات." : lang === "en" ? "Surra is a Saudi cultural entity specializing in designing, building, and operating cultural and creative communities with lasting impact. Its name is inspired by the central point from which circles emerge — because it is the center from which all rings arise." : "苏拉是一个沙特阿拉伯文化实体，专注于设计、建设和运营具有持久影响的文化创意社区。其名称灵感来自圆心点——所有圆圈涌现的中心。"}
              </p>
              <p
                style={{
                  fontFamily: F,
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 2.1,
                }}
              >
                {lang === "ar" ? "سُرّة ليست منصة، ولا جهة تنظيم فعاليات، بل منظومة متكاملة لصناعة المجتمعات. نعمل عند نقطة التقاء الفكرة بالإنسان، والمحتوى بالتجربة، واللقاء بالأثر المستدام." : lang === "en" ? "Surra is not a platform, nor an events organizer, but an integrated system for community creation. We work at the intersection of idea and person, content and experience, encounter and lasting impact." : "苏拉不是一个平台，也不是活动组织者，而是一个建设社区的综合体系。我们工作在想法与人、内容与体验、相遇与持久影响的交汇处。"}
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.15s", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src="/manus-storage/Surrah-White_c79141b5.png"
                alt="سُرّة | SURRAH — الشعار الكامل"
                style={{
                  width: "100%",
                  maxWidth: "360px",
                  height: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                  opacity: 0.9,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section id="vision" style={{ background: "var(--surrah-section-alt)", padding: "5rem 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div
              className="reveal"
              style={{
                padding: "3rem",
                background: "var(--surrah-section-alt)",
                borderLeft: "4px solid #B5453A",
              }}
            >
              <p
                style={{
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  color: "#C4622D",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                VISION
              </p>
              <h3
                style={{
                  fontFamily: F,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--surrah-text-primary)",
                  marginBottom: "0.75rem",
                }}
              >
                {lang === "ar" ? "رؤيتنا" : lang === "en" ? "Our Vision" : "我们的愿景"}
              </h3>
              <p
                style={{
                  fontFamily: F,
                  fontWeight: 400,
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 2,
                }}
              >
                {lang === "ar" ? "أن تكون سُرّة المنصة الثقافية الأولى في المملكة العربية السعودية لصناعة المجتمعات الإبداعية ذات الأثر المستدام." : lang === "en" ? "To be the leading cultural platform in Saudi Arabia for creating creative communities with lasting impact." : "成为沙特阿拉伯王国创建具有持久影响的创意社区的领先文化平台。"}
              </p>
            </div>
            <div
              id="mission"
              className="reveal"
              style={{
                padding: "3rem",
                background: "var(--surrah-section-alt)",
                borderLeft: "4px solid #C4622D",
                transitionDelay: "0.1s",
              }}
            >
              <p
                style={{
                  fontFamily: "'ManchetteFine', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  color: "#C4622D",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                MISSION
              </p>
              <h3
                style={{
                  fontFamily: F,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--surrah-text-primary)",
                  marginBottom: "0.75rem",
                }}
              >
                {lang === "ar" ? "رسالتنا" : lang === "en" ? "Our Mission" : "我们的使命"}
              </h3>
              <p
                style={{
                  fontFamily: F,
                  fontWeight: 400,
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 2,
                }}
              >
                {lang === "ar" ? "تصميم وبناء وتشغيل المجتمعات الثقافية والإبداعية التي تجمع الناس حول الأفكار العميقة وتمنحها حياة مستدامة." : lang === "en" ? "Designing, building, and operating cultural and creative communities that bring people together around deep ideas and give them sustainable life." : "设计、建设和运营文化创意社区，将人们囧聚在深刻思想周围，赋予其可持续的生命。"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section id="values" style={{ background: "var(--surrah-section-bg)", padding: "5rem 0" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3rem" }}>
            <div className="surrah-divider" />
            <h2
              style={{
                fontFamily: F,
                fontWeight: 900,
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                color: "var(--surrah-text-primary)",
              }}
            >
              {lang === "ar" ? "قيمنا" : lang === "en" ? "Our Values" : "我们的价值观"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="reveal"
                style={{
                  padding: "2.5rem 2rem",
                  background: i % 2 === 0 ? "#111111" : "#1a1a1a",
                  borderTop: "3px solid #C4622D",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <h3
                  style={{
                    fontFamily: F,
                    fontWeight: 900,
                    fontSize: "1.3rem",
                    color: "var(--surrah-text-primary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {lang === "ar" ? v.title : lang === "en" ? v.titleEn : v.titleZh}
                </h3>
                <p
                  style={{
                    fontFamily: F,
                    fontWeight: 400,
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.9,
                  }}
                >
                  {lang === "ar" ? v.desc : lang === "en" ? v.descEn : v.descZh}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section style={{ background: "var(--surrah-section-alt)", padding: "5rem 0" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3rem" }}>
            <div className="surrah-divider" />
            <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "var(--surrah-text-primary)" }}>
              {lang === "ar" ? "كيف نعمل؟" : lang === "en" ? "How We Work" : "我们如何工作"}
            </h2>
            <p style={{ fontFamily: F, fontWeight: 400, color: "rgba(255,255,255,0.75)", fontSize: "1rem", marginTop: "0.5rem" }}>
              {lang === "ar" ? "نبدأ بالفكرة، نصمم التجربة، نبني المجتمع القادر على الاستمرار." : lang === "en" ? "Start with the idea, design the experience, build a community capable of lasting." : "从想法开始，设计体验，建设一个能够持续发展的社区。"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  padding: "2.5rem 2rem",
                  background: "var(--surrah-section-alt)",
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  borderTop: "3px solid #C4622D",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "'ManchetteFine', sans-serif",
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    color: "#C4622D",
                    opacity: 0.35,
                    lineHeight: 1,
                    marginBottom: "1rem",
                  }}
                >
                  {step.num}
                </span>
                <h4
                  style={{
                    fontFamily: F,
                    fontWeight: 700,
                    color: "var(--surrah-text-primary)",
                    fontSize: "1.05rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {lang === "ar" ? step.title : lang === "en" ? step.titleEn : step.titleZh}
                </h4>
                <p style={{ fontFamily: F, fontWeight: 400, color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", lineHeight: 1.8 }}>
                  {lang === "ar" ? step.desc : lang === "en" ? step.descEn : step.descZh}
                </p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: "2.5rem", textAlign: "center" }}>
            <Link href="/services" className="btn-surrah-primary">
              {lang === "ar" ? "تعرّف على خدماتنا" : lang === "en" ? "Explore Our Services" : "探索我们的服务"}
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--surrah-section-alt)", padding: "5rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="reveal max-w-xl mx-auto">
            <img
              src="/manus-storage/Surrah-White_c79141b5.png"
              alt="سُرّة"
              style={{ height: "48px", width: "auto", objectFit: "contain", margin: "0 auto 2rem", display: "block" }}
            />
            <p
              style={{
                fontFamily: F,
                fontWeight: 400,
                fontSize: "1rem",
                color: "rgba(255,255,255,0.8)",
                lineHeight: 2,
                marginBottom: "2rem",
              }}
            >
              {lang === "ar" ? "تُصمَّم بوعي، تُبنى بعمق، وتُشغَّل باستدامة." : lang === "en" ? "Designed with awareness, built with depth, and operated with sustainability." : "有意识地设计，深入建设，可持续运营。"}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/services" className="btn-surrah-red">
                {lang === "ar" ? "استكشف خدماتنا" : lang === "en" ? "Explore Our Services" : "探索我们的服务"}
              </Link>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "transparent",
                  color: "var(--surrah-text-primary)",
                  fontFamily: F,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  padding: "0.75rem 2rem",
                  border: "2px solid rgba(240, 235, 225, 0.4)",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#F0EBE1")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(240, 235, 225, 0.4)")}
              >
                {lang === "ar" ? "تواصل معنا" : lang === "en" ? "Contact Us" : "联系我们"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
