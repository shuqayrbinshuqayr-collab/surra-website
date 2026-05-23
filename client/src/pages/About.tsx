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

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  { name: "منصور باخلعة", role: "مؤسس ومنتج مجتمعات", photo: "/manus-storage/mansour_5b9a1523.webp", linkedin: "" },
  { name: "م.معتز العبدالقادر", role: "الرئيس التنفيذي", photo: "/manus-storage/muataz_cfd76867.webp", linkedin: "" },
  { name: "محمد المصري", role: "نائب الرئيس للمنتجات والتسويق", photo: "/manus-storage/mohammed_masri_de3cae4f.webp", linkedin: "" },
  { name: "م. شقير بن شقير", role: "رئيس أنظمة المجتمعات", photo: "/manus-storage/shaqeer_325758dd.webp", linkedin: "" },
  { name: "عبدالرحمن النهدي", role: "مدير تقنية المعلومات", photo: "/manus-storage/abdulrahman_9d7e8050.webp", linkedin: "" },
  { name: "أحمد فضل", role: "مدير إبداعي", photo: "/manus-storage/ahmed_fadl_c95ffaf5.webp", linkedin: "" },
  { name: "د.الهنوف الزنيتان", role: "مستشارة ومديرة تطوير الأعمال", photo: "/manus-storage/hanoof_3d1e14e1.webp", linkedin: "" },
  { name: "أحمد خليل", role: "مسؤول الإنتاج الإعلامي", photo: "/manus-storage/ahmed_khalil_6425d3c1.webp", linkedin: "" },
  { name: "أسماء الظافري", role: "منسقة فعاليات ومحتوى", photo: "/manus-storage/asmaa_57852354.webp", linkedin: "" },
  { name: "قتيبة تركستاني", role: "العلاقات العامة", photo: "/manus-storage/qatiba_13a158ce.webp", linkedin: "" },
  { name: "محمد بن محمد", role: "قائد تشغيل الفعاليات", photo: "/manus-storage/mohammed_bin_5ce8c1d3.webp", linkedin: "" },
  { name: "معاذ الحازمي", role: "قائد الحوار — ثلوثية بصر", photo: "/manus-storage/muadh_69c744aa.webp", linkedin: "" },
  { name: "أسامة فقيه", role: "قائد المجتمع — مقام", photo: "/manus-storage/osama_3d86dc7a.webp", linkedin: "" },
  { name: "دلال العتيبي", role: "مدير العلاقات والشراكات — سدى", photo: "/manus-storage/dalal_61bffb01.webp", linkedin: "" },
  { name: "عبدللطيف الثويني", role: "قائد منتج ثلوثية بصر", photo: "/manus-storage/abdullatif_9b8ca2b9.webp", linkedin: "" },
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

              {/* Paragraph 1: Definition */}
              <p style={{ fontFamily: F, fontWeight: 400, fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 2.1, marginBottom: "1.5rem" }}>
                {lang === "ar"
                  ? "سُرّة كيان ثقافي سعودي متخصص في تصميم وبناء وتشغيل المجتمعات الثقافية والإبداعية ذات الأثر المستدام.، استُلهم اسمها من “السُرّة” بوصفها نقطة الوسط التي تبدأ منها الدوائر وتتسع — تمامًا كما تبدأ الأفكار الصغيرة لتصنع مجتمعات وحراكًا يمتد أثره."
                  : lang === "en"
                  ? 'Surra is a Saudi cultural entity specializing in designing, building, and operating cultural and creative communities with lasting impact. Its name is inspired by "Surra" — the navel, the central point from which circles begin and expand, just as small ideas grow to create communities and movements whose impact endures.'
                  : '苏拉是一个沙特阿拉伯文化实体，专注于设计、建设和运营具有持久影响的文化创意社区。其名称灵感来自“苏拉”——肚脐，圆圈开始并扩展的中心点，就像小想法成长为社区和运动。'}
              </p>

              {/* Paragraph 2: Belief */}
              <p style={{ fontFamily: F, fontWeight: 400, fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 2.1, marginBottom: "1.5rem" }}>
                {lang === "ar"
                  ? "في سُرّة، نؤمن بأن الثقافة والإبداع ليسا ترفًا، بل محركات حقيقية لبناء الهوية الوطنية وصناعة اقتصاد إبداعي مستدام. لذلك نعمل على خلق بيئة يقودها الأفراد بأفكارهم قبل مناصبهم، وتُبنى فيها القيمة عبر الشغف والمعرفة والتجربة."
                  : lang === "en"
                  ? "At Surra, we believe that culture and creativity are not luxuries, but real drivers for building national identity and creating a sustainable creative economy. We work to create an environment led by individuals with their ideas before their titles, where value is built through passion, knowledge, and experience."
                  : "在苏拉，我们相信文化和创意不是奔头奶，而是建设民族身份和创建可持续创意经济的真正动力。"}
              </p>

              {/* Paragraph 3: Diriyah */}
              <p style={{ fontFamily: F, fontWeight: 400, fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 2.1, marginBottom: "1.5rem" }}>
                {lang === "ar"
                  ? "ومن قلب الدرعية، حيث الجذور التي صنعت الحكاية الأولى، تنطلق سُرّة كمساحة تجمع الطاقات، وتربط المبدعين، وتحوّل الأفكار من مجرد احتمالات إلى مشاريع ومجتمعات قابلة للنمو والتأثير والاستدامة."
                  : lang === "en"
                  ? "From the heart of Diriyah, where the roots that made the first story, Surra launches as a space that gathers energies, connects creators, and transforms ideas from mere possibilities into projects and communities capable of growth, impact, and sustainability."
                  : "从德里亚的心脏，那里有制造第一个故事的根源，苏拉作为一个聚集能量、连接创造者的空间起飞。"}
              </p>

              {/* Paragraph 4: System */}
              <p style={{ fontFamily: F, fontWeight: 600, fontSize: "0.95rem", color: "var(--surrah-text-primary)", lineHeight: 1.8, marginBottom: "0.75rem" }}>
                {lang === "ar"
                  ? "سُرّة ليست منصة رقمية، ولا جهة لتنظيم الفعاليات فحسب، بل منظومة متكاملة لصناعة المجتمعات الثقافية والإبداعية."
                  : lang === "en"
                  ? "Surra is not a digital platform, nor merely an events organizer, but an integrated system for creating cultural and creative communities."
                  : "苏拉不是数字平台，也不仅仅是活动组织者，而是创建文化创意社区的综合体系。"}
              </p>

              {/* Intersection label */}
              <p style={{ fontFamily: F, fontWeight: 400, fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", marginBottom: "0.5rem" }}>
                {lang === "ar" ? "نعمل عند نقطة التقاء:" : lang === "en" ? "We work at the intersection of:" : "我们工作在交汇点："}
              </p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem" }}>
                {(lang === "ar"
                  ? ["الفكرة بالإنسان،", "والمحتوى بالتجربة،", "واللقاء بالأثر المستدام."]
                  : lang === "en"
                  ? ["Idea and person,", "Content and experience,", "Encounter and lasting impact."]
                  : ["想法与人，", "内容与体验，", "相遇与持久影响。"]
                ).map((item, i) => (
                  <li key={i} style={{ fontFamily: F, fontWeight: 400, fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 2, display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ color: "#C4622D", fontSize: "0.7rem" }}>◈</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Paragraph 5: Closing */}
              <p style={{ fontFamily: F, fontWeight: 400, fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 2.1 }}>
                {lang === "ar"
                  ? "ومن خلال هذا التقاطع، نصنع مساحات تُحفّز الحوار، وتبني العلاقات، وتمنح الأفكار فرصة لتتحول إلى أثر حقيقي ومستمر."
                  : lang === "en"
                  ? "Through this intersection, we create spaces that stimulate dialogue, build relationships, and give ideas the chance to transform into real and lasting impact."
                  : "通过这个交汇点，我们创造刺激对话、建立关系的空间，赋予想法转化为真实持久影响的机会。"}
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

      {/* ── Team ── */}
      <section id="team" style={{ background: "var(--surrah-section-bg)", padding: "5rem 0" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3.5rem" }}>
            <div className="surrah-divider" />
            <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "var(--surrah-text-primary)", marginBottom: "0.75rem" }}>
              {lang === "ar" ? "فريقنا" : lang === "en" ? "Our Team" : "我们的团队"}
            </h2>
            <p style={{ fontFamily: F, fontWeight: 400, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              {lang === "ar" ? "الأفراد الذين يصنعون المجتمعات ويمنحون الأفكار حياة." : lang === "en" ? "The people who build communities and give ideas life." : "建设社区、赋予想法生命的人们。"}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "2rem" }}>
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="reveal"
                style={{ transitionDelay: `${(i % 6) * 0.08}s` }}
              >
                {/* Photo */}
                <div style={{ position: "relative", width: "100%", paddingBottom: "100%", marginBottom: "1rem", overflow: "hidden", background: "#1a1a1a" }}>
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{
                        position: "absolute", inset: 0, width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: "top center",
                        filter: "grayscale(30%)",
                        transition: "filter 0.3s ease, transform 0.4s ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)"; (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(30%)"; (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                    />
                  ) : (
                    <div style={{
                      position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "#1C2B3A",
                    }}>
                      <span style={{ fontFamily: F, fontWeight: 900, fontSize: "2.5rem", color: "rgba(196,98,45,0.5)" }}>
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Bottom gradient overlay */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(13,13,13,0.85), transparent)", pointerEvents: "none" }} />
                </div>

                {/* Info */}
                <h4 style={{ fontFamily: F, fontWeight: 700, fontSize: "0.95rem", color: "var(--surrah-text-primary)", marginBottom: "0.25rem", lineHeight: 1.4 }}>
                  {member.name}
                </h4>
                <p style={{ fontFamily: F, fontWeight: 400, fontSize: "0.8rem", color: "#C4622D", marginBottom: "0.35rem", lineHeight: 1.5 }}>
                  {member.role}
                </p>
                {member.bio && (
                  <p style={{ fontFamily: F, fontWeight: 400, fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "0.5rem" }}>
                    {member.bio}
                  </p>
                )}

                {/* LinkedIn icon */}
                {member.linkedin !== undefined && (
                  <a
                    href={member.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    onClick={member.linkedin ? undefined : (e) => e.preventDefault()}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "28px",
                      height: "28px",
                      marginTop: "0.4rem",
                      border: "1px solid rgba(196,98,45,0.35)",
                      borderRadius: "4px",
                      color: member.linkedin ? "#C4622D" : "rgba(255,255,255,0.25)",
                      transition: "all 0.2s ease",
                      cursor: member.linkedin ? "pointer" : "default",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => { if (member.linkedin) { (e.currentTarget as HTMLElement).style.background = "rgba(196,98,45,0.15)"; (e.currentTarget as HTMLElement).style.borderColor = "#C4622D"; } }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,98,45,0.35)"; }}
                  >
                    {/* LinkedIn SVG icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
              </div>
            ))}
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
