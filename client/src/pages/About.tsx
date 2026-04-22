/* ============================================================
   About Page — من نحن — سُرّة
   Font: TheYearofHandicrafts
     h1: weight 900 (Black)
     h2/h3: weight 700 (Bold)
     h4/card titles: weight 600 (SemiBold)
     body/descriptions: weight 500 (Medium)
     labels/meta: weight 400 (Regular)
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_BG = "/manus-storage/surra-about-bg_9b961487.jpg";
const F = "'TheYearofHandicrafts', sans-serif";

const values = [
  { icon: "◈", title: "العمق قبل الانتشار", desc: "نؤمن أن الأثر الحقيقي يبدأ من الداخل، ويُبنى بصبر وعناية." },
  { icon: "◉", title: "الإنسان أولاً", desc: "في كل قرار وكل تصميم، الإنسان هو المحور والبداية." },
  { icon: "◎", title: "الأصالة", desc: "نستلهم من الموروث الثقافي ونُجدده بأدوات العصر." },
  { icon: "◐", title: "الشراكة", desc: "نبني علاقات حقيقية قائمة على الثقة والمصلحة المشتركة." },
  { icon: "◑", title: "الاستدامة", desc: "نصمم للاستمرار، لا للحظة." },
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
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); }); },
      { threshold: 0.15 }
    );
    el.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function About() {
  const pageRef = useReveal();

  return (
    <div ref={pageRef} style={{ background: "oklch(0.08 0.01 60)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Page Hero ── */}
      <section className="relative pt-32 pb-24 overflow-hidden" style={{ background: "oklch(0.06 0.01 60)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.06 0.01 60 / 80%), oklch(0.06 0.01 60 / 90%))" }} />
        <div className="relative z-10 container">
          <div className="max-w-3xl">
            <p className="text-sm mb-4" style={{ color: "oklch(0.72 0.12 75)", fontFamily: F, fontWeight: 400, letterSpacing: "0.2em" }}>من نحن</p>
            <h1 style={{ fontFamily: F, fontWeight: 900, fontSize: "clamp(2rem, 5vw, 4rem)", color: "oklch(0.97 0.01 80)", lineHeight: 1.3 }}>سُرّة</h1>
          </div>
        </div>
      </section>

      {/* ── Who is Surra ── */}
      <section className="py-24" style={{ background: "oklch(0.08 0.01 60)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <div className="gold-divider" />
              <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "oklch(0.95 0.01 80)", marginBottom: "1.5rem", lineHeight: 1.4 }}>ما هي سُرّة؟</h2>
            </div>
            <div className="reveal space-y-5" style={{ transitionDelay: "0.15s" }}>
              <p style={{ fontFamily: F, fontWeight: 500, color: "oklch(0.70 0.01 80)", fontSize: "1.05rem", lineHeight: 1.9 }}>
                سُرّة ليست منصة، ولا جهة تنظيم فعاليات، بل منظومة متكاملة لصناعة المجتمعات. نعمل عند نقطة التقاء الفكرة بالإنسان، والمحتوى بالتجربة، واللقاء بالأثر المستدام..
              </p>
              <p style={{ fontFamily: F, fontWeight: 500, color: "oklch(0.70 0.01 80)", fontSize: "1.05rem", lineHeight: 1.9 }}>
                نرافق المبادرات والجهات والعلامات التجارية في تحويل رؤاها إلى مجتمعات حية، قادرة على الاستمرار والتأثير.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section id="vision" className="py-24" style={{ background: "oklch(0.06 0.01 60)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "oklch(0.25 0.02 75 / 15%)" }}>
            <div className="reveal p-10 md:p-14" style={{ background: "oklch(0.08 0.01 60)" }}>
              <span className="block text-xs mb-4" style={{ color: "oklch(0.72 0.12 75)", fontFamily: F, fontWeight: 400, letterSpacing: "0.2em" }}>رؤيتنا</span>
              <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: "clamp(1.3rem, 2.5vw, 2rem)", color: "oklch(0.95 0.01 80)", lineHeight: 1.5, marginBottom: "1rem" }}>
                أن نكون مرجعاً سعودياً في صناعة المجتمعات ذات القيمة الثقافية والإنسانية المستدامة.
              </h3>
            </div>
            <div id="mission" className="reveal p-10 md:p-14" style={{ background: "oklch(0.08 0.01 60)", transitionDelay: "0.15s" }}>
              <span className="block text-xs mb-4" style={{ color: "oklch(0.72 0.12 75)", fontFamily: F, fontWeight: 400, letterSpacing: "0.2em" }}>رسالتنا</span>
              <h3 style={{ fontFamily: F, fontWeight: 700, fontSize: "clamp(1.3rem, 2.5vw, 2rem)", color: "oklch(0.95 0.01 80)", lineHeight: 1.5, marginBottom: "1rem" }}>
                تصميم مجتمعات تُنصت وتُحاور وتُنتج أثراً يتجاوز اللحظة.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section id="values" className="py-24" style={{ background: "oklch(0.08 0.01 60)" }}>
        <div className="container">
          <div className="reveal mb-14">
            <div className="gold-divider" />
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "oklch(0.95 0.01 80)" }}>قيمنا</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="reveal p-6 transition-all duration-300"
                style={{ background: "oklch(0.10 0.01 60)", border: "1px solid oklch(0.25 0.02 75 / 20%)", transitionDelay: `${i * 0.08}s` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.72 0.12 75 / 50%)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.25 0.02 75 / 20%)"; }}
              >
                <span className="block text-2xl mb-3" style={{ color: "oklch(0.72 0.12 75)" }}>{value.icon}</span>
                <h4 className="mb-2" style={{ fontFamily: F, fontWeight: 600, color: "oklch(0.90 0.01 80)", fontSize: "0.95rem" }}>{value.title}</h4>
                <p className="text-sm leading-relaxed" style={{ fontFamily: F, fontWeight: 400, color: "oklch(0.55 0.01 80)", lineHeight: 1.7 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="py-24" style={{ background: "oklch(0.06 0.01 60)" }}>
        <div className="container">
          <div className="reveal mb-14">
            <div className="gold-divider" />
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "oklch(0.95 0.01 80)" }}>كيف نعمل؟</h2>
            <p className="mt-2" style={{ fontFamily: F, fontWeight: 400, color: "oklch(0.55 0.01 80)", fontSize: "1rem" }}>نبدأ بالفكرة، نصمم التجربة، نبني المجتمع القادر على الاستمرار.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="p-8 h-full" style={{ background: "oklch(0.10 0.01 60)", border: "1px solid oklch(0.25 0.02 75 / 20%)", borderTop: "2px solid oklch(0.72 0.12 75)" }}>
                  <span className="block text-4xl mb-4" style={{ fontFamily: F, fontWeight: 900, color: "oklch(0.72 0.12 75 / 40%)" }}>{step.num}</span>
                  <h4 className="mb-2" style={{ fontFamily: F, fontWeight: 600, color: "oklch(0.90 0.01 80)", fontSize: "1.1rem" }}>{step.title}</h4>
                  <p className="text-sm" style={{ fontFamily: F, fontWeight: 400, color: "oklch(0.55 0.01 80)", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal mt-12 text-center">
            <Link href="/services" className="btn-gold">تعرّف على خدماتنا ←</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
