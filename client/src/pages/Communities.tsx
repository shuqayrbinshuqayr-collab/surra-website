/* ============================================================
   Communities Page — مجتمعاتنا — سُرّة
   Sections: Hero, 5 Communities in detail, CTA
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
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
  umlah: { white: "/manus-storage/Umlah-Black_f8a8fa99.webp", invert: true },
};

const communities = [
  {
    id: "basar",
    name: "بصر",
    nameEn: "Basar",
    color: "#C4622D",
    tagline: "مجتمع يُعنى بالوعي البصري والفنون وقراءة الصورة والمعنى.",
    description:
      "بصر مجتمع للذين يرون العالم بعيون مختلفة. يُعنى بالوعي البصري والفنون والقراءة الجمالية للصورة والمعنى. مساحة للتأمل والنقد والإبداع البصري.",
    type: "فنون بصرية",
    audience: "المهتمون بالفنون والوعي البصري",
    meetings: "شهري",
  },
  {
    id: "sifr",
    name: "صفر",
    nameEn: "Sifr",
    color: "#c8c4bc",
    tagline: "مساحة للبدايات والتجربة والأسئلة الأولى التي تصنع التحول.",
    description:
      "صفر هو مساحة للبدايات والأسئلة الأولى. مجتمع للذين يقفون عند نقطة الانطلاق في القطاعات الرقمية والهندسية، يبحثون عن التجربة والتوجيه والمجتمع الداعم.",
    type: "تقنية وهندسة",
    audience: "المبتدئون في القطاعات الرقمية والهندسية",
    meetings: "أسبوعي",
  },
  {
    id: "sada",
    name: "سدى",
    nameEn: "Sada",
    color: "#7B4F8E",
    tagline: "مجتمع إبداعي نسائي يُبرز الصوت الأنثوي في الثقافة والفن والقيادة.",
    description:
      "سدى مجتمع إبداعي نسائي يُبرز الصوت الأنثوي في الثقافة والفن والقيادة. مساحة آمنة وملهمة للمرأة السعودية لتُعبّر وتُبدع وتقود.",
    type: "إبداع نسائي",
    audience: "المرأة المهتمة بالثقافة والفن والقيادة",
    meetings: "شهري",
  },
  {
    id: "mada",
    name: "مدى",
    nameEn: "Mada",
    color: "#c8c4bc",
    tagline: "مجتمع للتفكير العميق والحوارات الهادئة وبناء الرؤية.",
    description:
      "مدى مجتمع للمفكرين والمتأملين. مساحة للتفكير العميق والحوارات الهادئة وبناء الرؤية. لمن يؤمن أن التغيير يبدأ من الداخل.",
    type: "فكر وفلسفة",
    audience: "المهتمون بالتفكير النقدي وبناء الرؤية",
    meetings: "كل 45 يوم",
  },
  {
    id: "maqam",
    name: "مقام",
    nameEn: "Maqam",
    color: "#C4622D",
    tagline: "مجتمع يُعيد للسمع مكانته وللغته إحساسها وللصوت قدرته على الوصول.",
    description:
      "مقام مجتمع يُعيد للصوت قيمته. يُعنى بالموسيقى والصوت والإلقاء والتعبير الصوتي. مساحة لمن يؤمن أن الصوت لغة تتجاوز الكلمات.",
    type: "موسيقى وصوت",
    audience: "المهتمون بالموسيقى والصوت والتعبير",
    meetings: "شهري",
  },
];

export default function Communities() {
  const pageRef = useReveal();

  return (
    <div ref={pageRef} style={{ background: "var(--surrah-page-bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Page Hero ── */}
      <section
        className="relative pb-24"
        style={{ background: "var(--surrah-section-alt)" }}
      >
        <div className="container">
          <div className="max-w-3xl">
            <p
              className="text-sm mb-4 tracking-widest"
              style={{
                color: "#C4622D",
                fontFamily: "'ManchetteFine', sans-serif",
                letterSpacing: "0.2em",
              }}
            >
              مجتمعاتنا
            </p>
            <h1
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "var(--surrah-text-primary)",
                lineHeight: 1.3,
                marginBottom: "1rem",
              }}
            >
              مجتمعات مستقلة
              <br />
              <span style={{ color: "#C4622D" }}>تجمعها فلسفة واحدة: العمق</span>
            </h1>
            <p
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                color: "#7A8A9A",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                maxWidth: "550px",
              }}
            >
              تضم سُرّة تحت مظلتها مجتمعات مستقلة، لكل منها هويتها وتجربتها، وتجمعها فلسفة واحدة: العمق.
            </p>
          </div>
        </div>
      </section>

      {/* ── Communities Grid ── */}
      <section className="py-16" style={{ background: "var(--surrah-section-bg)" }}>
        <div className="container">
          <div className="space-y-6">
            {communities.map((community, i) => (
              <div
                key={community.id}
                id={community.id}
                className="reveal grid grid-cols-1 lg:grid-cols-4 gap-0 transition-all duration-300"
                style={{
                  background: "var(--surrah-section-alt)",
                  border: "1px solid rgba(28, 43, 58, 0.12)",
                  borderRight: `3px solid ${community.color}`,
                  transitionDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#1a1a1a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#111111";
                }}
              >
                {/* Logo */}
                <div
                  className="p-8 md:p-10 lg:border-l flex flex-col justify-center items-start"
                  style={{ borderColor: "rgba(28, 43, 58, 0.08)" }}
                >
                  {communityLogos[community.id] ? (
                    <img
                      src={communityLogos[community.id].white}
                      alt={community.name}
                      style={{
                        height: "clamp(36px, 4.5vw, 56px)",
                        width: "auto",
                        maxWidth: "160px",
                        objectFit: "contain",
                        filter: communityLogos[community.id].invert ? "invert(1) brightness(2)" : "none",
                      }}
                    />
                  ) : (
                    <h2
                      style={{
                        fontFamily: "'ManchetteFine', sans-serif",
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 700,
                        color: community.color,
                      }}
                    >
                      {community.name}
                    </h2>
                  )}
                </div>

                {/* Description */}
                <div
                  className="p-8 md:p-10 lg:col-span-2 lg:border-l"
                  style={{ borderColor: "rgba(28, 43, 58, 0.08)" }}
                >
                  <p
                    className="mb-3 font-medium"
                    style={{
                      fontFamily: "'ManchetteFine', sans-serif",
                      color: community.color,
                      fontSize: "0.95rem",
                      fontStyle: "italic",
                    }}
                  >
                    {community.tagline}
                  </p>
                  <p
                    style={{
                      fontFamily: "'ManchetteFine', sans-serif",
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "0.9rem",
                      lineHeight: 1.8,
                    }}
                  >
                    {community.description}
                  </p>
                </div>

                {/* Meta */}
                <div className="p-8 md:p-10 flex flex-col justify-center gap-4">
                  <div>
                    <p
                      className="text-xs mb-1"
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "'ManchetteFine', sans-serif",
                      }}
                    >
                      نوع المجتمع
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: "#3D4F60",
                        fontFamily: "'ManchetteFine', sans-serif",
                      }}
                    >
                      {community.type}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs mb-1"
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "'ManchetteFine', sans-serif",
                      }}
                    >
                      الفئة المستهدفة
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        fontFamily: "'ManchetteFine', sans-serif",
                      }}
                    >
                      {community.audience}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs mb-1"
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "'ManchetteFine', sans-serif",
                      }}
                    >
                      دورية اللقاءات
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        fontFamily: "'ManchetteFine', sans-serif",
                      }}
                    >
                      {community.meetings}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24" style={{ background: "var(--surrah-section-alt)" }}>
        <div className="container text-center">
          <div className="reveal max-w-xl mx-auto">
            <h2
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--surrah-text-primary)",
                marginBottom: "1rem",
              }}
            >
              انضم إلى مجتمع سُرّة
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: "'ManchetteFine', sans-serif",
                color: "#7A8A9A",
                lineHeight: 1.8,
              }}
            >
              اختر الطريقة التي تود بها أن تكون جزءاً من مجتمع سُرّة
            </p>
            <Link href="/join" className="btn-surrah-primary-filled text-base px-8 py-3.5">
              أنشئ مجتمعك ←
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
