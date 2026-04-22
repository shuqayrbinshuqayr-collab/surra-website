/* ============================================================
   About Page — سُرّة | SURRAH
   Brand: cream background, navy text, terracotta accents
   Hero: Artboard1@2x (event photo with Surrah logo overlay)
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'Rakik', sans-serif";

const values = [
  { title: "العمق", desc: "نؤمن أن كل مجتمع حقيقي يبدأ من سؤال عميق، لا من حدث عابر." },
  { title: "الأصالة", desc: "نستلهم من الهوية السعودية ونبني عليها، لا نستورد نماذج جاهزة." },
  { title: "الاستدامة", desc: "نصمم للأثر الطويل، لا للحضور اللحظي." },
  { title: "الإنسان أولاً", desc: "المجتمع ليس برنامجاً، بل هو الناس الذين يصنعونه." },
  { title: "الشراكة", desc: "نبني علاقات حقيقية قائمة على الثقة والمصلحة المشتركة." },
];

const steps = [
  { num: "١", title: "نبدأ بالفكرة", desc: "نُصغي للإنسان، نفهم الفكرة والرؤية." },
  { num: "٢", title: "نصمم التجربة", desc: "نصمم المجتمع وهويته وتجربته." },
  { num: "٣", title: "نبني المجتمع", desc: "نبني مجتمعاً قادراً على الاستمرار." },
  { num: "٤", title: "نُشغّل ونُطوّر", desc: "نُشغّل، نقيس، ونطوّر باستمرار." },
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

  return (
    <div ref={pageRef} style={{ background: "#FAF8F4", minHeight: "100vh" }}>
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
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/manus-storage/Artboard1@2x_931b8f26.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
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
              fontFamily: "'Rakik', sans-serif",
              fontWeight: 600,
              fontSize: "0.7rem",
              color: "#B5453A",
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
              color: "#FAF8F4",
              lineHeight: 1.2,
            }}
          >
            من نحن
          </h1>
        </div>
      </section>

      {/* ── Who is Surra ── */}
      <section style={{ background: "#FAF8F4", padding: "5rem 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <div className="surrah-divider" />
              <h2
                style={{
                  fontFamily: F,
                  fontWeight: 900,
                  fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                  color: "#1C2B3A",
                  lineHeight: 1.3,
                  marginBottom: "1.5rem",
                }}
              >
                لأنها النقطة التي تنبثق منها الدوائر
              </h2>
              <p
                style={{
                  fontFamily: F,
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "#5A6A7A",
                  lineHeight: 2.1,
                  marginBottom: "1.5rem",
                }}
              >
                سُرّة كيان سعودي ثقافي متخصص في تصميم وبناء وتشغيل المجتمعات الثقافية والإبداعية ذات الأثر المستدام.
                اسمها مستوحى من نقطة الوسط التي تنبثق منها الدوائر — لأنها مركز تنشأ منه كل الحلقات.
              </p>
              <p
                style={{
                  fontFamily: F,
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "#5A6A7A",
                  lineHeight: 2.1,
                }}
              >
                سُرّة ليست منصة، ولا جهة تنظيم فعاليات، بل منظومة متكاملة لصناعة المجتمعات.
                نعمل عند نقطة التقاء الفكرة بالإنسان، والمحتوى بالتجربة، واللقاء بالأثر المستدام.
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.15s" }}>
              <div
                style={{
                  background: "#B5453A",
                  padding: "3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  aspectRatio: "1",
                  maxWidth: "380px",
                }}
              >
                <img
                  src="/manus-storage/Story2_c2180c01.png"
                  alt="سُرّة — هوية بصرية"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section id="vision" style={{ background: "#F0EBE1", padding: "5rem 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div
              className="reveal"
              style={{
                padding: "3rem",
                background: "#1C2B3A",
                borderLeft: "4px solid #B5453A",
              }}
            >
              <p
                style={{
                  fontFamily: "'Rakik', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  color: "#B5453A",
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
                  color: "#F0EBE1",
                  marginBottom: "0.75rem",
                }}
              >
                رؤيتنا
              </h3>
              <p
                style={{
                  fontFamily: F,
                  fontWeight: 400,
                  fontSize: "0.95rem",
                  color: "rgba(240, 235, 225, 0.75)",
                  lineHeight: 2,
                }}
              >
                أن تكون سُرّة المنصة الثقافية الأولى في المملكة العربية السعودية لصناعة المجتمعات الإبداعية ذات الأثر المستدام.
              </p>
            </div>
            <div
              id="mission"
              className="reveal"
              style={{
                padding: "3rem",
                background: "#FFFFFF",
                borderLeft: "4px solid #27486A",
                transitionDelay: "0.1s",
              }}
            >
              <p
                style={{
                  fontFamily: "'Rakik', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  color: "#27486A",
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
                  color: "#1C2B3A",
                  marginBottom: "0.75rem",
                }}
              >
                رسالتنا
              </h3>
              <p
                style={{
                  fontFamily: F,
                  fontWeight: 400,
                  fontSize: "0.95rem",
                  color: "#5A6A7A",
                  lineHeight: 2,
                }}
              >
                تصميم وبناء وتشغيل المجتمعات الثقافية والإبداعية التي تجمع الناس حول الأفكار العميقة وتمنحها حياة مستدامة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section id="values" style={{ background: "#FAF8F4", padding: "5rem 0" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3rem" }}>
            <div className="surrah-divider" />
            <h2
              style={{
                fontFamily: F,
                fontWeight: 900,
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                color: "#1C2B3A",
              }}
            >
              قيمنا
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="reveal"
                style={{
                  padding: "2.5rem 2rem",
                  background: i % 2 === 0 ? "#FFFFFF" : "#F8F4EE",
                  borderTop: `3px solid ${i < 3 ? "#B5453A" : "#27486A"}`,
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <h3
                  style={{
                    fontFamily: F,
                    fontWeight: 900,
                    fontSize: "1.3rem",
                    color: "#1C2B3A",
                    marginBottom: "0.75rem",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: F,
                    fontWeight: 400,
                    fontSize: "0.85rem",
                    color: "#5A6A7A",
                    lineHeight: 1.9,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section style={{ background: "#F0EBE1", padding: "5rem 0" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3rem" }}>
            <div className="surrah-divider" />
            <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#1C2B3A" }}>
              كيف نعمل؟
            </h2>
            <p style={{ fontFamily: F, fontWeight: 400, color: "#5A6A7A", fontSize: "1rem", marginTop: "0.5rem" }}>
              نبدأ بالفكرة، نصمم التجربة، نبني المجتمع القادر على الاستمرار.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  padding: "2.5rem 2rem",
                  background: "#FFFFFF",
                  borderLeft: i > 0 ? "1px solid rgba(28, 43, 58, 0.08)" : "none",
                  borderTop: "3px solid #B5453A",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Rakik', sans-serif",
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    color: "#B5453A",
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
                    color: "#1C2B3A",
                    fontSize: "1.05rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {step.title}
                </h4>
                <p style={{ fontFamily: F, fontWeight: 400, color: "#5A6A7A", fontSize: "0.88rem", lineHeight: 1.8 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: "2.5rem", textAlign: "center" }}>
            <Link href="/services" className="btn-surrah-primary">
              تعرّف على خدماتنا
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#1C2B3A", padding: "5rem 0" }}>
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
                color: "rgba(240, 235, 225, 0.75)",
                lineHeight: 2,
                marginBottom: "2rem",
              }}
            >
              تُصمَّم بوعي، تُبنى بعمق، وتُشغَّل باستدامة.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/services" className="btn-surrah-red">
                استكشف خدماتنا
              </Link>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "transparent",
                  color: "#F0EBE1",
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
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
