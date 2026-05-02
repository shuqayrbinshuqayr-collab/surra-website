/* ============================================================
   CommunityDetail — صفحة مجتمع — سُرّة
   Font: ManchetteFine
   Theme: Black background, white text, orange accent #C4622D
   ============================================================ */

import { useEffect } from "react";
import { Link, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

const F = "'ManchetteFine', sans-serif";

const communityLogos: Record<string, { white: string; invert?: boolean }> = {
  basar: { white: "/manus-storage/Basar-White_7d406934.png" },
  sifr: { white: "/manus-storage/Sifr-Black_c3ab7e46.webp", invert: true },
  sada: { white: "/manus-storage/Sudaa-White_d1defc89.png" },
  mada: { white: "/manus-storage/Mada-White_c8cc9bc8.png" },
  maqam: { white: "/manus-storage/Maqam-White_10f58ea8.png" },
  umlah: { white: "/manus-storage/Umlah-Black_f8a8fa99.webp", invert: true },
};

const communities: Record<string, {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  tagline: string;
  description: string;
  longDescription: string;
  type: string;
  audience: string;
  meetings: string;
  values: { title: string; desc: string }[];
  activities: string[];
}> = {
  basar: {
    id: "basar",
    name: "بصر",
    nameEn: "BASAR",
    color: "#C4622D",
    tagline: "مجتمع يُعنى بالوعي البصري والفنون وقراءة الصورة والمعنى.",
    description: "بصر مجتمع للذين يرون العالم بعيون مختلفة.",
    longDescription:
      "بصر مجتمع للذين يرون العالم بعيون مختلفة. يُعنى بالوعي البصري والفنون والقراءة الجمالية للصورة والمعنى. مساحة للتأمل والنقد والإبداع البصري. نؤمن أن الصورة لغة، وأن تعلّم قراءتها يُغيّر طريقة رؤيتنا للعالم.",
    type: "فنون بصرية",
    audience: "المهتمون بالفنون والوعي البصري",
    meetings: "أسبوعي / شهري",
    values: [
      { title: "الوعي البصري", desc: "تعلّم قراءة الصورة والمعنى خلفها." },
      { title: "النقد الجمالي", desc: "تطوير حس نقدي تجاه الفنون والتصميم." },
      { title: "الإبداع المشترك", desc: "خلق تجارب بصرية جماعية ملهمة." },
    ],
    activities: ["جلسات نقد بصري", "زيارات معارض", "ورش تصوير وتصميم", "محاضرات فنية", "مشاريع إبداعية مشتركة"],
  },
  sifr: {
    id: "sifr",
    name: "صفر",
    nameEn: "SIFR",
    color: "#c8c4bc",
    tagline: "مساحة للبدايات والتجربة والأسئلة الأولى التي تصنع التحول.",
    description: "صفر هو مساحة للبدايات والأسئلة الأولى.",
    longDescription:
      "صفر هو مساحة للبدايات والأسئلة الأولى. مجتمع للذين يقفون عند نقطة الانطلاق في القطاعات الرقمية والهندسية، يبحثون عن التجربة والتوجيه والمجتمع الداعم. نؤمن أن البداية الصحيحة هي نصف الطريق.",
    type: "تقنية وهندسة",
    audience: "المبتدئون في القطاعات الرقمية والهندسية",
    meetings: "أسبوعي",
    values: [
      { title: "البداية الجريئة", desc: "لا يوجد سؤال صغير، كل بداية تستحق الدعم." },
      { title: "التعلم التطبيقي", desc: "التجربة العملية أساس التطور." },
      { title: "المجتمع الداعم", desc: "نمو جماعي من خلال التشجيع والتوجيه." },
    ],
    activities: ["جلسات توجيه مهني", "ورش تقنية عملية", "مشاريع تطبيقية", "لقاءات مع خبراء القطاع", "شبكة دعم ومرافقة"],
  },
  sada: {
    id: "sada",
    name: "سدى",
    nameEn: "SADA",
    color: "#7B4F8E",
    tagline: "مجتمع إبداعي نسائي يُبرز الصوت الأنثوي في الثقافة والفن والقيادة.",
    description: "سدى مجتمع إبداعي نسائي يُبرز الصوت الأنثوي.",
    longDescription:
      "سدى مجتمع إبداعي نسائي يُبرز الصوت الأنثوي في الثقافة والفن والقيادة. مساحة آمنة وملهمة للمرأة السعودية لتُعبّر وتُبدع وتقود. نؤمن أن الصوت الأنثوي ثروة ثقافية لا غنى عنها.",
    type: "إبداع نسائي",
    audience: "المرأة المهتمة بالثقافة والفن والقيادة",
    meetings: "شهري",
    values: [
      { title: "الصوت الأنثوي", desc: "إبراز وتمكين التعبير الإبداعي للمرأة." },
      { title: "المساحة الآمنة", desc: "بيئة داعمة وملهمة للتعبير والنمو." },
      { title: "القيادة الثقافية", desc: "تأهيل المرأة لقيادة التغيير الثقافي." },
    ],
    activities: ["جلسات حوارية نسائية", "ورش كتابة إبداعية", "معارض فنية", "برامج قيادة ثقافية", "شبكة تواصل نسائية"],
  },
  mada: {
    id: "mada",
    name: "مدى",
    nameEn: "MADA",
    color: "#c8c4bc",
    tagline: "مجتمع للتفكير العميق والحوارات الهادئة وبناء الرؤية.",
    description: "مدى مجتمع للمفكرين والمتأملين.",
    longDescription:
      "مدى مجتمع للمفكرين والمتأملين. مساحة للتفكير العميق والحوارات الهادئة وبناء الرؤية. لمن يؤمن أن التغيير يبدأ من الداخل. نؤمن أن الأفكار الكبيرة تحتاج مساحة هادئة لتنضج.",
    type: "فكر وفلسفة",
    audience: "المهتمون بالتفكير النقدي وبناء الرؤية",
    meetings: "كل 45 يوم",
    values: [
      { title: "التفكير العميق", desc: "الغوص في الأفكار بعيداً عن السطحية." },
      { title: "الحوار الهادئ", desc: "نقاشات بنّاءة تحترم الاختلاف." },
      { title: "بناء الرؤية", desc: "تطوير منظور شخصي وفكري متكامل." },
    ],
    activities: ["حلقات نقاش فلسفية", "قراءات مشتركة", "جلسات تأمل وتفكير", "محاضرات فكرية", "كتابة مقالات وأوراق بحثية"],
  },
  maqam: {
    id: "maqam",
    name: "مقام",
    nameEn: "MAQAM",
    color: "#C4622D",
    tagline: "مجتمع يُعيد للسمع مكانته وللغته إحساسها وللصوت قدرته على الوصول.",
    description: "مقام مجتمع يُعيد للصوت قيمته.",
    longDescription:
      "مقام مجتمع يُعيد للصوت قيمته. يُعنى بالموسيقى والصوت والإلقاء والتعبير الصوتي. مساحة لمن يؤمن أن الصوت لغة تتجاوز الكلمات. نؤمن أن الصوت الإنساني يحمل من العمق ما لا تستطيع الكلمات وحدها حمله.",
    type: "موسيقى وصوت",
    audience: "المهتمون بالموسيقى والصوت والتعبير",
    meetings: "شهري",
    values: [
      { title: "قيمة الصوت", desc: "إعادة الاعتبار للتعبير الصوتي في ثقافتنا." },
      { title: "الإلقاء والأداء", desc: "تطوير مهارات التعبير والإلقاء." },
      { title: "الموسيقى والانتماء", desc: "الموسيقى جسر بين الثقافات والأجيال." },
    ],
    activities: ["جلسات استماع موسيقية", "ورش إلقاء وتعبير صوتي", "حفلات موسيقية صغيرة", "نقاشات حول تاريخ الموسيقى", "مشاريع تسجيل صوتي"],
  },
};

export default function CommunityDetail() {
  const params = useParams<{ id: string }>();
  const community = communities[params.id || ""];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  if (!community) {
    return (
      <div style={{ background: "#000", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Navbar />
        <p style={{ color: "#fff", fontFamily: F, fontSize: "1.5rem", marginTop: "120px" }}>المجتمع غير موجود</p>
        <Link href="/communities" style={{ color: "#C4622D", fontFamily: F, marginTop: "1rem" }}>← العودة للمجتمعات</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#000000", minHeight: "100vh" }}>
      <Navbar />
      <Breadcrumb items={[
        { label: "الرئيسية", href: "/" },
        { label: "مجتمعاتنا", href: "/communities" },
        { label: community.name },
      ]} />

      {/* Hero */}
      <section style={{ paddingTop: "140px", paddingBottom: "80px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container">
          <Link
            href="/communities"
            style={{ fontFamily: F, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2.5rem" }}
          >
            ← مجتمعاتنا
          </Link>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              {communityLogos[community.id] ? (
                <img
                  src={communityLogos[community.id].white}
                  alt={community.name}
                  style={{
                    height: "clamp(48px, 8vw, 96px)",
                    width: "auto",
                    maxWidth: "280px",
                    objectFit: "contain",
                    filter: communityLogos[community.id].invert ? "invert(1) brightness(2)" : "none",
                    marginBottom: "1.5rem",
                    display: "block",
                  }}
                />
              ) : (
                <h1 style={{ fontFamily: F, fontWeight: 200, fontSize: "clamp(3.5rem, 10vw, 7rem)", color: "#ffffff", lineHeight: 1.05, marginBottom: "1.5rem" }}>
                  {community.name}
                </h1>
              )}
              <p style={{ fontFamily: F, fontWeight: 300, fontSize: "1.15rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.9, maxWidth: "560px" }}>
                {community.tagline}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: "200px" }}>
              {[
                { label: "النوع", value: community.type },
                { label: "الجمهور", value: community.audience },
                { label: "تكرار اللقاءات", value: community.meetings },
              ].map((item) => (
                <div key={item.label} style={{ borderRight: `2px solid ${community.color}`, paddingRight: "1rem" }}>
                  <p style={{ fontFamily: F, fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", marginBottom: "0.2rem" }}>{item.label}</p>
                  <p style={{ fontFamily: F, fontSize: "0.95rem", color: "#ffffff", fontWeight: 500 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div style={{ maxWidth: "720px" }}>
            <p style={{ fontFamily: F, fontSize: "0.75rem", color: community.color, letterSpacing: "0.25em", marginBottom: "1.5rem", fontWeight: 500 }}>عن المجتمع</p>
            <p style={{ fontFamily: F, fontWeight: 300, fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", lineHeight: 2.1 }}>
              {community.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <p style={{ fontFamily: F, fontSize: "0.75rem", color: community.color, letterSpacing: "0.25em", marginBottom: "3rem", fontWeight: 500 }}>قيمنا</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
            {community.values.map((v, i) => (
              <div key={i} style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderTop: `2px solid ${community.color}`, padding: "2rem" }}>
                <h3 style={{ fontFamily: F, fontWeight: 600, fontSize: "1.1rem", color: "#ffffff", marginBottom: "0.75rem" }}>{v.title}</h3>
                <p style={{ fontFamily: F, fontWeight: 300, fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <p style={{ fontFamily: F, fontSize: "0.75rem", color: community.color, letterSpacing: "0.25em", marginBottom: "3rem", fontWeight: 500 }}>أنشطتنا</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {community.activities.map((act, i) => (
              <span
                key={i}
                style={{
                  fontFamily: F,
                  fontSize: "0.9rem",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "0.6rem 1.4rem",
                  letterSpacing: "0.05em",
                }}
              >
                {act}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: F, fontWeight: 200, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#ffffff", marginBottom: "1.5rem" }}>
            انضم إلى{" "}
            {communityLogos[community.id] ? (
              <img src={communityLogos[community.id].white} alt={community.name} style={{ height: "1.2em", width: "auto", objectFit: "contain", filter: communityLogos[community.id].invert ? "invert(1) brightness(2)" : "none", display: "inline", verticalAlign: "middle", margin: "0 0.3em" }} />
            ) : (
              <span style={{ color: community.color }}>{community.name}</span>
            )}
          </h2>
          <p style={{ fontFamily: F, fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.65)", marginBottom: "2.5rem", maxWidth: "480px", margin: "0 auto 2.5rem" }}>
            {community.tagline}
          </p>
          <Link
            href="/join"
            style={{
              fontFamily: F,
              fontSize: "1rem",
              fontWeight: 600,
              color: "#ffffff",
              background: "#000000",
              border: "1px solid #ffffff",
              padding: "0.85rem 2.5rem",
              textDecoration: "none",
              display: "inline-block",
              letterSpacing: "0.05em",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            انضم
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
