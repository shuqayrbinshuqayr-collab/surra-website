/* ============================================================
   Services Page — خدماتنا — سُرّة
   Font: TheYearofHandicrafts
     h1: weight 900 (Black)
     h2/service titles: weight 700 (Bold)
     taglines/subheadings: weight 600 (SemiBold)
     descriptions: weight 500 (Medium)
     labels/meta/tags: weight 400 (Regular)
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const F = "'TheYearofHandicrafts', sans-serif";

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

const services = [
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
    description: "نحول الأفكار والمعرفة إلى برامج ثقافية حية تُشعل الفضول وتبني الانتماء. كل برنامج هو رحلة مصممة بعناية لتحقيق أثر حقيقي.",
    points: ["برامج حوارية", "سلاسل معرفية", "تجارب ثقافية متخصصة"],
    forWhom: ["جهات حكومية", "علامات تجارية", "مبادرات ثقافية"],
  },
  {
    id: "events", number: "٠٣", title: "تنظيم الفعاليات الحية",
    tagline: "نصمم الفعالية كرحلة لا كموعد",
    description: "نُدير الفعاليات الثقافية والإبداعية من الفكرة حتى التوثيق. نُصمم التجربة بالكامل لتكون لحظة تُعاش وذكرى تبقى.",
    points: ["تصميم التجربة", "إدارة الحدث وتشغيله", "إدارة الحضور", "التوثيق"],
    forWhom: ["جهات حكومية", "علامات تجارية", "مبادرات ثقافية"],
  },
  {
    id: "audience", number: "٠٤", title: "توفير الجمهور المستهدف",
    tagline: "نوصل الرسالة إلى من يهمه سماعها",
    description: "نربط العلامات التجارية والمبادرات بجمهورها الحقيقي. لدينا شبكة من المجتمعات المتخصصة تُمكّننا من الوصول الدقيق والمؤثر.",
    points: ["بناء مجتمعات متخصصة", "إدارة قواعد الجمهور", "ربط العلامات التجارية بجمهورها الحقيقي"],
    forWhom: ["علامات تجارية", "مبادرات ثقافية"],
  },
];

export default function Services() {
  const pageRef = useReveal();

  return (
    <div ref={pageRef} style={{ background: "oklch(0.08 0.01 60)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Page Hero ── */}
      <section className="relative pt-32 pb-24" style={{ background: "oklch(0.06 0.01 60)" }}>
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm mb-4" style={{ color: "oklch(0.72 0.12 75)", fontFamily: F, fontWeight: 400, letterSpacing: "0.2em" }}>خدماتنا</p>
            <h1 style={{ fontFamily: F, fontWeight: 900, fontSize: "clamp(2rem, 5vw, 4rem)", color: "oklch(0.97 0.01 80)", lineHeight: 1.3, marginBottom: "1rem" }}>
              نرافقك من الفكرة
              <br /><span style={{ color: "oklch(0.72 0.12 75)" }}>حتى الاستدامة</span>
            </h1>
            <p style={{ fontFamily: F, fontWeight: 500, color: "oklch(0.60 0.01 80)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "500px" }}>
              أربع خدمات متكاملة تُغطي كل مراحل بناء المجتمع الثقافي، من التأسيس إلى التأثير.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services Detail ── */}
      <section className="py-16" style={{ background: "oklch(0.08 0.01 60)" }}>
        <div className="container">
          <div className="space-y-px" style={{ background: "oklch(0.25 0.02 75 / 15%)" }}>
            {services.map((service, i) => (
              <div key={service.id} id={service.id} className="reveal grid grid-cols-1 lg:grid-cols-3 gap-0" style={{ background: "oklch(0.08 0.01 60)", transitionDelay: `${i * 0.1}s` }}>
                {/* Number + Title */}
                <div className="p-8 md:p-12 lg:border-l" style={{ borderColor: "oklch(0.25 0.02 75 / 15%)" }}>
                  <span className="block text-5xl mb-4" style={{ fontFamily: F, fontWeight: 900, color: "oklch(0.72 0.12 75 / 30%)" }}>{service.number}</span>
                  <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "oklch(0.95 0.01 80)", marginBottom: "0.5rem" }}>{service.title}</h2>
                  <p style={{ fontFamily: F, fontWeight: 600, color: "oklch(0.72 0.12 75)", fontSize: "0.95rem", fontStyle: "italic" }}>{service.tagline}</p>
                </div>
                {/* Description + Points */}
                <div className="p-8 md:p-12 lg:border-l" style={{ borderColor: "oklch(0.25 0.02 75 / 15%)" }}>
                  <p className="mb-6" style={{ fontFamily: F, fontWeight: 500, color: "oklch(0.70 0.01 80)", fontSize: "0.95rem", lineHeight: 1.9 }}>{service.description}</p>
                  <ul className="space-y-2">
                    {service.points.map((point, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm" style={{ fontFamily: F, fontWeight: 400, color: "oklch(0.65 0.01 80)" }}>
                        <span style={{ color: "oklch(0.72 0.12 75)" }}>◈</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* For Whom */}
                <div className="p-8 md:p-12">
                  <p className="text-xs mb-4" style={{ color: "oklch(0.72 0.12 75)", fontFamily: F, fontWeight: 400, letterSpacing: "0.15em" }}>لمن هذه الخدمة؟</p>
                  <div className="flex flex-wrap gap-2">
                    {service.forWhom.map((item, j) => (
                      <span key={j} className="text-xs px-3 py-1.5" style={{ border: "1px solid oklch(0.72 0.12 75 / 30%)", color: "oklch(0.72 0.12 75)", fontFamily: F, fontWeight: 400 }}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work Stages ── */}
      <section className="py-24" style={{ background: "oklch(0.06 0.01 60)" }}>
        <div className="container">
          <div className="reveal mb-14">
            <div className="gold-divider" />
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "oklch(0.95 0.01 80)" }}>ماذا نقدم لك؟</h2>
            <p className="mt-2" style={{ fontFamily: F, fontWeight: 400, color: "oklch(0.55 0.01 80)" }}>نرافقك من الفكرة حتى الاستدامة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "١", title: "فهم الفكرة والرؤية", desc: "نُصغي بعمق لفهم ما تريد بناءه وما تسعى لتحقيقه." },
              { step: "٢", title: "تصميم المجتمع وهويته", desc: "نصمم المجتمع من الجذور: الهوية، الهيكل، التجربة." },
              { step: "٣", title: "الإطلاق والتشغيل والتطوير", desc: "نُطلق، نُشغّل، نقيس، ونطوّر باستمرار." },
            ].map((item, i) => (
              <div key={i} className="reveal p-8" style={{ background: "oklch(0.10 0.01 60)", border: "1px solid oklch(0.25 0.02 75 / 20%)", transitionDelay: `${i * 0.1}s` }}>
                <span className="block text-5xl mb-4" style={{ fontFamily: F, fontWeight: 900, color: "oklch(0.72 0.12 75 / 30%)" }}>{item.step}</span>
                <h4 className="mb-2" style={{ fontFamily: F, fontWeight: 600, color: "oklch(0.90 0.01 80)", fontSize: "1.1rem" }}>{item.title}</h4>
                <p className="text-sm" style={{ fontFamily: F, fontWeight: 400, color: "oklch(0.55 0.01 80)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24" style={{ background: "oklch(0.08 0.01 60)" }}>
        <div className="container text-center">
          <div className="reveal max-w-xl mx-auto">
            <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "oklch(0.95 0.01 80)", marginBottom: "1rem" }}>ابدأ الحديث معنا</h2>
            <p className="mb-8" style={{ fontFamily: F, fontWeight: 500, color: "oklch(0.60 0.01 80)", lineHeight: 1.8 }}>نؤمن أن كل حوار جاد هو بداية…</p>
            <Link href="/contact" className="btn-gold-filled text-base px-8 py-3.5">تواصل معنا ←</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
