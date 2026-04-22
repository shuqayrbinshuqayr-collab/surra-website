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

const communities = [
  {
    id: "basar",
    name: "بصر",
    nameEn: "Basar",
    color: "oklch(0.72 0.12 75)",
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
    color: "oklch(0.65 0.08 200)",
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
    color: "oklch(0.70 0.10 320)",
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
    color: "oklch(0.68 0.09 160)",
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
    color: "oklch(0.75 0.14 55)",
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
    <div ref={pageRef} style={{ background: "oklch(0.08 0.01 60)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Page Hero ── */}
      <section
        className="relative pt-32 pb-24"
        style={{ background: "oklch(0.06 0.01 60)" }}
      >
        <div className="container">
          <div className="max-w-3xl">
            <p
              className="text-sm mb-4 tracking-widest"
              style={{
                color: "oklch(0.72 0.12 75)",
                fontFamily: "'TheYearofHandicrafts', sans-serif",
                letterSpacing: "0.2em",
              }}
            >
              مجتمعاتنا
            </p>
            <h1
              style={{
                fontFamily: "'TheYearofHandicrafts', sans-serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "oklch(0.97 0.01 80)",
                lineHeight: 1.3,
                marginBottom: "1rem",
              }}
            >
              مجتمعات مستقلة
              <br />
              <span style={{ color: "oklch(0.72 0.12 75)" }}>تجمعها فلسفة واحدة: العمق</span>
            </h1>
            <p
              style={{
                fontFamily: "'TheYearofHandicrafts', sans-serif",
                color: "oklch(0.60 0.01 80)",
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
      <section className="py-16" style={{ background: "oklch(0.08 0.01 60)" }}>
        <div className="container">
          <div className="space-y-6">
            {communities.map((community, i) => (
              <div
                key={community.id}
                id={community.id}
                className="reveal grid grid-cols-1 lg:grid-cols-4 gap-0 transition-all duration-300"
                style={{
                  background: "oklch(0.10 0.01 60)",
                  border: "1px solid oklch(0.25 0.02 75 / 20%)",
                  borderRight: `3px solid ${community.color}`,
                  transitionDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.12 0.01 60)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.10 0.01 60)";
                }}
              >
                {/* Name */}
                <div
                  className="p-8 md:p-10 lg:border-l flex flex-col justify-center"
                  style={{ borderColor: "oklch(0.25 0.02 75 / 15%)" }}
                >
                  <h2
                    style={{
                      fontFamily: "'TheYearofHandicrafts', sans-serif",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 700,
                      color: community.color,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {community.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'TheYearofHandicrafts', sans-serif",
                      color: "oklch(0.40 0.01 80)",
                      fontSize: "0.8rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {community.nameEn}
                  </p>
                </div>

                {/* Description */}
                <div
                  className="p-8 md:p-10 lg:col-span-2 lg:border-l"
                  style={{ borderColor: "oklch(0.25 0.02 75 / 15%)" }}
                >
                  <p
                    className="mb-3 font-medium"
                    style={{
                      fontFamily: "'TheYearofHandicrafts', sans-serif",
                      color: community.color,
                      fontSize: "0.95rem",
                      fontStyle: "italic",
                    }}
                  >
                    {community.tagline}
                  </p>
                  <p
                    style={{
                      fontFamily: "'TheYearofHandicrafts', sans-serif",
                      color: "oklch(0.65 0.01 80)",
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
                        color: "oklch(0.45 0.01 80)",
                        fontFamily: "'TheYearofHandicrafts', sans-serif",
                      }}
                    >
                      نوع المجتمع
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: "oklch(0.80 0.01 80)",
                        fontFamily: "'TheYearofHandicrafts', sans-serif",
                      }}
                    >
                      {community.type}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs mb-1"
                      style={{
                        color: "oklch(0.45 0.01 80)",
                        fontFamily: "'TheYearofHandicrafts', sans-serif",
                      }}
                    >
                      الفئة المستهدفة
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: "oklch(0.70 0.01 80)",
                        fontFamily: "'TheYearofHandicrafts', sans-serif",
                      }}
                    >
                      {community.audience}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs mb-1"
                      style={{
                        color: "oklch(0.45 0.01 80)",
                        fontFamily: "'TheYearofHandicrafts', sans-serif",
                      }}
                    >
                      دورية اللقاءات
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: "oklch(0.70 0.01 80)",
                        fontFamily: "'TheYearofHandicrafts', sans-serif",
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
      <section className="py-24" style={{ background: "oklch(0.06 0.01 60)" }}>
        <div className="container text-center">
          <div className="reveal max-w-xl mx-auto">
            <h2
              style={{
                fontFamily: "'TheYearofHandicrafts', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "oklch(0.95 0.01 80)",
                marginBottom: "1rem",
              }}
            >
              انضم إلى مجتمع سُرّة
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: "'TheYearofHandicrafts', sans-serif",
                color: "oklch(0.60 0.01 80)",
                lineHeight: 1.8,
              }}
            >
              اختر الطريقة التي تود بها أن تكون جزءاً من مجتمع سُرّة
            </p>
            <Link href="/join" className="btn-gold-filled text-base px-8 py-3.5">
              أنشئ مجتمعك ←
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
