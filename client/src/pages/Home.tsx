/* ============================================================
   Home Page — سُرّة
   Design: النسيج الحي (Living Fabric)
   Sections: Hero, Why Surra, Services Preview, Communities, CTA
   ============================================================ */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_BG = "/manus-storage/surra-hero-bg_a31f141f.jpg";
const CTA_BG = "/manus-storage/surra-cta-bg_587fcd97.jpg";
const ABOUT_BG = "/manus-storage/surra-about-bg_9b961487.jpg";

const services = [
  {
    number: "٠١",
    title: "صناعة المجتمعات",
    desc: "نصمم المجتمعات من الجذور لا من الواجهة",
    detail: "بناء هوية المجتمع، تحديد الفئة المستهدفة، الهيكلة والتنظيم، خطط التشغيل والاستدامة.",
  },
  {
    number: "٠٢",
    title: "إنشاء البرامج الثقافية",
    desc: "نحول المحتوى إلى تجربة",
    detail: "برامج حوارية، سلاسل معرفية، تجارب ثقافية متخصصة.",
  },
  {
    number: "٠٣",
    title: "تنظيم الفعاليات الحية",
    desc: "نصمم الفعالية كرحلة لا كموعد",
    detail: "تصميم التجربة، إدارة الحدث وتشغيله، إدارة الحضور، التوثيق.",
  },
  {
    number: "٠٤",
    title: "توفير الجمهور المستهدف",
    desc: "نوصل الرسالة إلى من يهمه سماعها",
    detail: "بناء مجتمعات متخصصة، إدارة قواعد الجمهور، ربط العلامات التجارية بجمهورها الحقيقي.",
  },
];

const communities = [
  {
    name: "بصر",
    nameEn: "Basar",
    desc: "مجتمع يُعنى بالوعي البصري والفنون وقراءة الصورة والمعنى.",
    color: "oklch(0.72 0.12 75)",
  },
  {
    name: "صفر",
    nameEn: "Sifr",
    desc: "مساحة للبدايات والتجربة والأسئلة الأولى التي تصنع التحول في القطاعات الرقمية والهندسية.",
    color: "oklch(0.65 0.08 200)",
  },
  {
    name: "سدى",
    nameEn: "Sada",
    desc: "مجتمع إبداعي نسائي يُبرز الصوت الأنثوي في الثقافة والفن والقيادة.",
    color: "oklch(0.70 0.10 320)",
  },
  {
    name: "مدى",
    nameEn: "Mada",
    desc: "مجتمع للتفكير العميق والحوارات الهادئة وبناء الرؤية.",
    color: "oklch(0.68 0.09 160)",
  },
  {
    name: "مقام",
    nameEn: "Maqam",
    desc: "مجتمع يُعيد للسمع مكانته وللغته إحساسها وللصوت قدرته على الوصول.",
    color: "oklch(0.72 0.12 75)",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    const elements = el.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  const pageRef = useReveal();

  return (
    <div ref={pageRef} style={{ background: "oklch(0.08 0.01 60)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Hero Section ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "oklch(0.06 0.01 60)",
        }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            opacity: 0.45,
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, oklch(0.06 0.01 60 / 60%) 0%, oklch(0.06 0.01 60 / 20%) 40%, oklch(0.06 0.01 60 / 70%) 80%, oklch(0.06 0.01 60) 100%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 container text-center">
          <div className="max-w-4xl mx-auto">
            <p
              className="text-sm mb-6 tracking-widest uppercase animate-fade-in"
              style={{
                color: "oklch(0.72 0.12 75)",
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                letterSpacing: "0.2em",
                opacity: 0,
              }}
            >
              كيان سعودي ثقافي
            </p>
            <h1
              className="animate-fade-in-up"
              style={{
                fontFamily: "'Noto Naskh Arabic', serif",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight: 700,
                color: "oklch(0.97 0.01 80)",
                lineHeight: 1.25,
                marginBottom: "1.5rem",
                opacity: 0,
                animationDelay: "0.2s",
              }}
            >
              نصنع المجتمعات
              <br />
              <span style={{ color: "oklch(0.72 0.12 75)" }}>ونمنح الأفكار حياة…</span>
            </h1>
            <p
              className="text-lg mb-10 animate-fade-in-up"
              style={{
                color: "oklch(0.70 0.01 80)",
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                maxWidth: "600px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.8,
                opacity: 0,
                animationDelay: "0.4s",
              }}
            >
              تصميم وبناء وتشغيل المجتمعات الثقافية والإبداعية ذات الأثر المستدام
            </p>
            <div
              className="flex items-center justify-center gap-4 flex-wrap animate-fade-in-up"
              style={{ opacity: 0, animationDelay: "0.6s" }}
            >
              <Link href="/join" className="btn-gold-filled text-base px-8 py-3.5">
                أنشئ مجتمعك
              </Link>
              <Link href="/about" className="btn-gold text-base px-8 py-3.5">
                تعرّف على سُرّة
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
          style={{ opacity: 0, animationDelay: "1s" }}
        >
          <div
            className="w-px h-12"
            style={{
              background: "linear-gradient(to bottom, oklch(0.72 0.12 75), transparent)",
            }}
          />
        </div>
      </section>

      {/* ── Why Surra Section ── */}
      <section className="py-24 md:py-32" style={{ background: "oklch(0.08 0.01 60)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Large text */}
            <div className="reveal">
              <div className="gold-divider" />
              <h2
                style={{
                  fontFamily: "'Noto Naskh Arabic', serif",
                  fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                  fontWeight: 700,
                  color: "oklch(0.95 0.01 80)",
                  lineHeight: 1.4,
                  marginBottom: "1rem",
                }}
              >
                لماذا نصمم
                <br />
                المجتمعات؟
              </h2>
            </div>

            {/* 3 points */}
            <div className="space-y-8">
              {[
                { num: "١", text: "لأن الأثر أطول من الحدث" },
                { num: "٢", text: "لأن الإنسان هو البداية" },
                { num: "٣", text: "لأن الاستدامة تُبنى من الداخل" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="reveal flex items-start gap-5"
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <span
                    style={{
                      fontFamily: "'Noto Naskh Arabic', serif",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "oklch(0.72 0.12 75)",
                      lineHeight: 1,
                      flexShrink: 0,
                      marginTop: "0.1rem",
                    }}
                  >
                    {item.num}
                  </span>
                  <p
                    style={{
                      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                      fontSize: "1.15rem",
                      color: "oklch(0.80 0.01 80)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
              <div className="reveal pt-4" style={{ transitionDelay: "0.45s" }}>
                <Link href="/about" className="btn-gold">
                  اعرف المزيد ←
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section
        className="py-24 md:py-32"
        style={{ background: "oklch(0.06 0.01 60)" }}
      >
        <div className="container">
          <div className="reveal mb-16">
            <div className="gold-divider" />
            <h2
              style={{
                fontFamily: "'Noto Naskh Arabic', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "oklch(0.95 0.01 80)",
                marginBottom: "0.75rem",
              }}
            >
              خدماتنا
            </h2>
            <p
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                color: "oklch(0.55 0.01 80)",
                fontSize: "1rem",
                maxWidth: "500px",
              }}
            >
              نرافقك من الفكرة حتى الاستدامة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "oklch(0.25 0.02 75 / 15%)" }}>
            {services.map((service, i) => (
              <div
                key={i}
                className="reveal p-8 md:p-10 group transition-all duration-300"
                style={{
                  background: "oklch(0.08 0.01 60)",
                  transitionDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.11 0.01 60)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.08 0.01 60)";
                }}
              >
                <span
                  className="block mb-4 text-sm"
                  style={{
                    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                    color: "oklch(0.72 0.12 75)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {service.number}
                </span>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "'Noto Naskh Arabic', serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "oklch(0.92 0.01 80)",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="mb-4 text-base"
                  style={{
                    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                    color: "oklch(0.72 0.12 75)",
                    fontStyle: "italic",
                  }}
                >
                  {service.desc}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                    color: "oklch(0.55 0.01 80)",
                    lineHeight: 1.8,
                  }}
                >
                  {service.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="reveal mt-10 text-center">
            <Link href="/services" className="btn-gold">
              استكشف خدماتنا ←
            </Link>
          </div>
        </div>
      </section>

      {/* ── Communities Section ── */}
      <section className="py-24 md:py-32" style={{ background: "oklch(0.08 0.01 60)" }}>
        <div className="container">
          <div className="reveal mb-16">
            <div className="gold-divider" />
            <h2
              style={{
                fontFamily: "'Noto Naskh Arabic', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "oklch(0.95 0.01 80)",
                marginBottom: "0.75rem",
              }}
            >
              مجتمعاتنا
            </h2>
            <p
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                color: "oklch(0.55 0.01 80)",
                fontSize: "1rem",
                maxWidth: "500px",
              }}
            >
              تضم سُرّة تحت مظلتها مجتمعات مستقلة، لكل منها هويتها وتجربتها، وتجمعها فلسفة واحدة: العمق.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {communities.map((community, i) => (
              <div
                key={i}
                className="reveal p-6 transition-all duration-400 cursor-pointer"
                style={{
                  background: "oklch(0.10 0.01 60)",
                  border: "1px solid oklch(0.25 0.02 75 / 20%)",
                  transitionDelay: `${i * 0.08}s`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = community.color;
                  el.style.background = "oklch(0.13 0.01 60)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "oklch(0.25 0.02 75 / 20%)";
                  el.style.background = "oklch(0.10 0.01 60)";
                }}
              >
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{
                    fontFamily: "'Noto Naskh Arabic', serif",
                    color: community.color,
                  }}
                >
                  {community.name}
                </h3>
                <p
                  className="text-xs mb-3"
                  style={{
                    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                    color: "oklch(0.45 0.01 80)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {community.nameEn}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                    color: "oklch(0.60 0.01 80)",
                    lineHeight: 1.7,
                  }}
                >
                  {community.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="reveal mt-10 text-center">
            <Link href="/communities" className="btn-gold">
              تعرّف على مجتمعاتنا ←
            </Link>
          </div>
        </div>
      </section>

      {/* ── About BG Section ── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: "oklch(0.06 0.01 60)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${ABOUT_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.25,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, oklch(0.06 0.01 60 / 90%) 0%, oklch(0.06 0.01 60 / 50%) 100%)",
          }}
        />
        <div className="relative z-10 container">
          <div className="max-w-2xl reveal">
            <div className="gold-divider" />
            <h2
              style={{
                fontFamily: "'Noto Naskh Arabic', serif",
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "oklch(0.97 0.01 80)",
                lineHeight: 1.4,
                marginBottom: "1.5rem",
              }}
            >
              نبني سرداً ثقافياً ملهماً
              <br />
              <span style={{ color: "oklch(0.72 0.12 75)" }}>يعكس قيمنا الأصيلة</span>
            </h2>
            <p
              className="mb-8 text-lg"
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                color: "oklch(0.70 0.01 80)",
                lineHeight: 1.8,
              }}
            >
              هل لديك فكرة تستحق أن تصبح مجتمعاً؟
            </p>
            <Link href="/join" className="btn-gold-filled text-base px-8 py-3.5">
              ابدأ الحديث معنا ←
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA Section ── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: "oklch(0.06 0.01 60)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${CTA_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.20,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, oklch(0.06 0.01 60 / 70%), oklch(0.06 0.01 60 / 80%))",
          }}
        />
        <div className="relative z-10 container text-center">
          <div className="reveal max-w-2xl mx-auto">
            <h2
              style={{
                fontFamily: "'Noto Naskh Arabic', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "oklch(0.97 0.01 80)",
                lineHeight: 1.4,
                marginBottom: "1.5rem",
              }}
            >
              لأن المجتمعات لا تنشأ صدفة…
              <br />
              <span style={{ color: "oklch(0.72 0.12 75)" }}>سُرّة</span>
            </h2>
            <p
              className="mb-10 text-base"
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                color: "oklch(0.65 0.01 80)",
                lineHeight: 1.8,
              }}
            >
              تُصمَّم بوعي، تُبنى بعمق، وتُشغَّل باستدامة.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/join" className="btn-gold-filled text-base px-8 py-3.5">
                أنشئ مجتمعك
              </Link>
              <Link href="/contact" className="btn-gold text-base px-8 py-3.5">
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
