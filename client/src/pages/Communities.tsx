/* ============================================================
   Communities Page — مجتمعاتنا — سُرّة | Multilingual
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
    el.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const communityLogos: Record<string, { white: string; invert?: boolean }> = {
  basar: { white: "/manus-storage/Basar-White_7d406934.png" },
  sifr: { white: "/manus-storage/Sifr-Black_c3ab7e46.webp", invert: true },
  sada: { white: "/manus-storage/Sudaa-White_d1defc89.png" },
  mada: { white: "/manus-storage/Mada-White_c8cc9bc8.png" },
  maqam: { white: "/manus-storage/Maqam-White_10f58ea8.png" },
  umlah: { white: "/manus-storage/Umlah-Gold-Final_67cfd897.png" },
};

const communitiesData = {
  ar: [
    { id: "basar", name: "بصر", color: "#C4622D", tagline: "مجتمع يُعنى بالوعي البصري والفنون وقراءة الصورة والمعنى.", description: "بصر مجتمع للذين يرون العالم بعيون مختلفة. يُعنى بالوعي البصري والفنون والقراءة الجمالية للصورة والمعنى. مساحة للتأمل والنقد والإبداع البصري.", type: "فنون بصرية", audience: "المهتمون بالفنون والوعي البصري", meetings: "شهري" },
    { id: "sifr", name: "صفر", color: "#c8c4bc", tagline: "مساحة للبدايات والتجربة والأسئلة الأولى التي تصنع التحول.", description: "صفر هو مساحة للبدايات والأسئلة الأولى. مجتمع للذين يقفون عند نقطة الانطلاق في القطاعات الرقمية والهندسية، يبحثون عن التجربة والتوجيه والمجتمع الداعم.", type: "تقنية وهندسة", audience: "المبتدئون في القطاعات الرقمية والهندسية", meetings: "أسبوعي" },
    { id: "sada", name: "سدى", color: "#7B4F8E", tagline: "مجتمع إبداعي نسائي يُبرز الصوت الأنثوي في الثقافة والفن والقيادة.", description: "سدى مجتمع إبداعي نسائي يُبرز الصوت الأنثوي في الثقافة والفن والقيادة. مساحة آمنة وملهمة للمرأة السعودية لتُعبّر وتُبدع وتقود.", type: "إبداع نسائي", audience: "المرأة المهتمة بالثقافة والفن والقيادة", meetings: "شهري" },
    { id: "mada", name: "مدى", color: "#c8c4bc", tagline: "مجتمع للتفكير العميق والحوارات الهادئة وبناء الرؤية.", description: "مدى مجتمع للمفكرين والمتأملين. مساحة للتفكير العميق والحوارات الهادئة وبناء الرؤية. لمن يؤمن أن التغيير يبدأ من الداخل.", type: "فكر وفلسفة", audience: "المهتمون بالتفكير النقدي وبناء الرؤية", meetings: "كل 45 يوم" },
    { id: "maqam", name: "مقام", color: "#C4622D", tagline: "مجتمع يُعيد للسمع مكانته وللغته إحساسها وللصوت قدرته على الوصول.", description: "مقام مجتمع يُعيد للصوت قيمته. يُعنى بالموسيقى والصوت والإلقاء والتعبير الصوتي. مساحة لمن يؤمن أن الصوت لغة تتجاوز الكلمات.", type: "موسيقى وصوت", audience: "المهتمون بالموسيقى والصوت والتعبير", meetings: "شهري" },
    { id: "umlah", name: "عُملة", color: "#D4AF37", tagline: "مجتمع يُعيد للمال معناه، وللاستثمار وعيه، وللقرار أثره.", description: "عُملة مجتمع يهتم بالوعي المالي والاستثمار والاقتصاد الجديد. مساحة تجمع المهتمين بفهم المال كأداة للنمو وصناعة الفرص، لا كأرقام ومعاملات فقط.", type: "وعي مالي واستثمار", audience: "رواد الأعمال، المستثمرون، والمهتمون بالاقتصاد والوعي المالي", meetings: "شهري / أسبوعي" },
  ],
  en: [
    { id: "basar", name: "Basar", color: "#C4622D", tagline: "A community dedicated to visual awareness, arts, and reading the image and meaning.", description: "Basar is a community for those who see the world with different eyes. Dedicated to visual awareness, arts, and aesthetic reading of image and meaning. A space for contemplation, criticism, and visual creativity.", type: "Visual Arts", audience: "Those interested in arts and visual awareness", meetings: "Monthly" },
    { id: "sifr", name: "Sifr", color: "#c8c4bc", tagline: "A space for beginnings, experience, and the first questions that create transformation.", description: "Sifr is a space for beginnings and first questions. A community for those standing at the starting point in digital and engineering sectors, seeking experience, guidance, and a supportive community.", type: "Technology & Engineering", audience: "Beginners in digital and engineering sectors", meetings: "Weekly" },
    { id: "sada", name: "Sada", color: "#7B4F8E", tagline: "A creative women's community highlighting the feminine voice in culture, art, and leadership.", description: "Sada is a creative women's community highlighting the feminine voice in culture, art, and leadership. A safe and inspiring space for Saudi women to express, create, and lead.", type: "Women's Creativity", audience: "Women interested in culture, art, and leadership", meetings: "Monthly" },
    { id: "mada", name: "Mada", color: "#c8c4bc", tagline: "A community for deep thinking, quiet conversations, and building vision.", description: "Mada is a community for thinkers and contemplators. A space for deep thinking, quiet conversations, and building vision. For those who believe change starts from within.", type: "Thought & Philosophy", audience: "Those interested in critical thinking and building vision", meetings: "Every 45 days" },
    { id: "maqam", name: "Maqam", color: "#C4622D", tagline: "A community that restores hearing its place, language its feeling, and voice its power to reach.", description: "Maqam is a community that restores the value of sound. Dedicated to music, sound, recitation, and vocal expression. A space for those who believe sound is a language that transcends words.", type: "Music & Sound", audience: "Those interested in music, sound, and expression", meetings: "Monthly" },
    { id: "umlah", name: "Umlah", color: "#D4AF37", tagline: "A community that restores meaning to money, awareness to investment, and impact to decision.", description: "Umlah is a community focused on financial awareness, investment, and the new economy. A space that brings together those interested in understanding money as a tool for growth and opportunity creation, not just numbers and transactions.", type: "Financial Awareness & Investment", audience: "Entrepreneurs, investors, and those interested in economics and financial literacy", meetings: "Monthly / Weekly" },
  ],
  zh: [
    { id: "basar", name: "巴萨尔", color: "#C4622D", tagline: "致力于视觉意识、艺术和解读图像与意义的社区。", description: "巴萨尔是一个用不同眼光看世界的人的社区。专注于视觉意识、艺术和对图像与意义的美学解读。一个冥想、批评和视觉创造力的空间。", type: "视觉艺术", audience: "对艺术和视觉意识感兴趣的人", meetings: "每月" },
    { id: "sifr", name: "希弗尔", color: "#c8c4bc", tagline: "一个充满开始、体验和创造转变的第一个问题的空间。", description: "希弗尔是一个充满开始和第一个问题的空间。一个为站在数字和工程领域起点的人提供的社区，寻求经验、指导和支持性社区。", type: "技术与工程", audience: "数字和工程领域的初学者", meetings: "每周" },
    { id: "sada", name: "萨达", color: "#7B4F8E", tagline: "一个突出文化、艺术和领导力中女性声音的创意女性社区。", description: "萨达是一个突出文化、艺术和领导力中女性声音的创意女性社区。为沙特女性提供一个安全而鼓舞人心的空间，让她们表达、创造和领导。", type: "女性创意", audience: "对文化、艺术和领导力感兴趣的女性", meetings: "每月" },
    { id: "mada", name: "马达", color: "#c8c4bc", tagline: "一个深度思考、安静对话和建立愿景的社区。", description: "马达是一个思想家和冥想者的社区。一个深度思考、安静对话和建立愿景的空间。为那些相信变化从内部开始的人。", type: "思想与哲学", audience: "对批判性思维和建立愿景感兴趣的人", meetings: "每45天" },
    { id: "maqam", name: "马卡姆", color: "#C4622D", tagline: "一个恢复听觉地位、语言感觉和声音传达能力的社区。", description: "马卡姆是一个恢复声音价値的社区。专注于音乐、声音、朗诵和声音表达。为那些相信声音是超越文字的语言的人们提供的空间。", type: "音乐与声音", audience: "对音乐、声音和表达感兴趣的人", meetings: "每月" },
    { id: "umlah", name: "乌姆拉", color: "#D4AF37", tagline: "一个赋予金錢意义、投资意识和决策影响的社区。", description: "乌姆拉是一个关注金融意识、投资和新经济的社区。一个聚集对将金錢理解为增长和创造机会的工具感兴趣的人的空间。", type: "金融意识与投资", audience: "创业者、投资者和对经济和金融意识感兴趣的人", meetings: "每月 / 每周" },
  ],
};
const pageTexts = {
  ar: { label: "مجتمعاتنا", h1a: "مجتمعات مستقلة", h1b: "تجمعها فلسفة واحدة: العمق", sub: "تضم سُرّة تحت مظلتها مجتمعات مستقلة، لكل منها هويتها وتجربتها، وتجمعها فلسفة واحدة: العمق.", typeLabel: "نوع المجتمع", audienceLabel: "الفئة المستهدفة", meetingsLabel: "دورية اللقاءات", ctaTitle: "انضم إلى مجتمع سُرّة", ctaSub: "اختر المجتمع الذي يناسبك وابدأ رحلتك.", ctaBtn: "اشترك الآن ←" },
  en: { label: "Our Communities", h1a: "Independent communities", h1b: "united by one philosophy: depth", sub: "Surra hosts independent communities under its umbrella, each with its own identity and experience, united by one philosophy: depth.", typeLabel: "Community Type", audienceLabel: "Target Audience", meetingsLabel: "Meeting Frequency", ctaTitle: "Join a Surra Community", ctaSub: "Choose the community that suits you and start your journey.", ctaBtn: "Subscribe Now →" },
  zh: { label: "我们的社区", h1a: "独立社区", h1b: "由一个哲学联合：深度", sub: "苏拉在其旗下拥有独立社区，每个社区都有自己的身份和体验，由一个哲学联合：深度。", typeLabel: "社区类型", audienceLabel: "目标受众", meetingsLabel: "会议频率", ctaTitle: "加入苏拉社区", ctaSub: "选择适合您的社区并开始您的旅程。", ctaBtn: "立即订阅 →" },
};

export default function Communities() {
  const pageRef = useReveal();
  const { lang, dir } = useLanguage();
  const tx = pageTexts[lang] || pageTexts.ar;
  const communities = communitiesData[lang] || communitiesData.ar;

  return (
    <div ref={pageRef} style={{ background: "var(--surrah-page-bg)", minHeight: "100vh" }} dir={dir}>
      <Navbar />
      {/* ── Video Hero ── */}
      <section style={{ position: "relative", height: "60vh", minHeight: "380px", overflow: "hidden" }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        >
          <source src="/manus-storage/omla-video_0a55ac81.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,13,13,0.45) 0%, rgba(13,13,13,0.75) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", paddingBottom: "3rem" }}>
          <div className="container">
            <p style={{ fontFamily: F, fontSize: "0.75rem", letterSpacing: "0.25em", color: "#C4622D", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {lang === "ar" ? "مجتمعاتنا" : lang === "en" ? "Our Communities" : "我们的社区"}
            </p>
            <h1 style={{ fontFamily: F, fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F0EBE1", lineHeight: 1.2 }}>
              {lang === "ar" ? <>مجتمعات مستقلة<br /><span style={{ color: "#C4622D" }}>تجمعها فلسفة واحدة: العمق</span></> :
               lang === "en" ? <>Independent communities<br /><span style={{ color: "#C4622D" }}>united by one philosophy: depth</span></> :
               <>独立社区<br /><span style={{ color: "#C4622D" }}>由一个哲学联合：深度</span></>}
            </h1>
          </div>
        </div>
      </section>


      <section className="py-16" style={{ background: "var(--surrah-section-bg)" }}>
        <div className="container">
          <div className="space-y-6">
            {communities.map((community, i) => {
              const communityRoutes: Record<string, string> = { basar: "/communities/basar", sada: "/communities/sada", umlah: "/communities/umla" };
              const communityHref = communityRoutes[community.id] || `/communities/${community.id}`;
              return (
              <Link key={community.id} href={communityHref} style={{ textDecoration: "none", display: "block" }}>
              <div id={community.id} className="reveal grid grid-cols-1 lg:grid-cols-4 gap-0 transition-all duration-300"
                style={{ background: "var(--surrah-section-alt)", border: "1px solid rgba(28, 43, 58, 0.12)", borderRight: dir === "rtl" ? "3px solid " + community.color : "none", borderLeft: dir === "ltr" ? "3px solid " + community.color : "none", transitionDelay: i * 0.1 + "s", cursor: "pointer" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1a1a1a"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#111111"; }}>
                <div className="p-8 md:p-10 lg:border-l flex flex-col justify-center items-start" style={{ borderColor: "rgba(28, 43, 58, 0.08)" }}>
                  {communityLogos[community.id] ? (
                    <img src={communityLogos[community.id].white} alt={community.name} style={{ height: "clamp(36px, 4.5vw, 56px)", width: "auto", maxWidth: "160px", objectFit: "contain", filter: communityLogos[community.id].invert ? "invert(1) brightness(2)" : "none" }} />
                  ) : (
                    <h2 style={{ fontFamily: F, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: community.color }}>{community.name}</h2>
                  )}
                </div>
                <div className="p-8 md:p-10 lg:col-span-2 lg:border-l" style={{ borderColor: "rgba(28, 43, 58, 0.08)" }}>
                  <p className="mb-3 font-medium" style={{ fontFamily: F, color: community.color, fontSize: "0.95rem", fontStyle: "italic" }}>{community.tagline}</p>
                  <p style={{ fontFamily: F, color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", lineHeight: 1.8 }}>{community.description}</p>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center gap-4">
                  <div>
                    <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)", fontFamily: F }}>{tx.typeLabel}</p>
                    <p className="text-sm font-medium" style={{ color: "#3D4F60", fontFamily: F }}>{community.type}</p>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)", fontFamily: F }}>{tx.audienceLabel}</p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)", fontFamily: F }}>{community.audience}</p>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)", fontFamily: F }}>{tx.meetingsLabel}</p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)", fontFamily: F }}>{community.meetings}</p>
                  </div>
                </div>
              </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-24" style={{ background: "var(--surrah-section-alt)" }}>
        <div className="container text-center">
          <div className="reveal max-w-xl mx-auto">
            <h2 style={{ fontFamily: F, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--surrah-text-primary)", marginBottom: "1rem" }}>{tx.ctaTitle}</h2>
            <p className="mb-8" style={{ fontFamily: F, color: "#7A8A9A", lineHeight: 1.8 }}>{tx.ctaSub}</p>
            <Link href="/join" className="btn-surrah-primary-filled text-base px-8 py-3.5">{tx.ctaBtn}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
