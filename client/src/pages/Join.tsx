/* ============================================================
   Join Page — أنشئ مجتمعك — سُرّة
   Sections: Hero, 5 Join Options with forms, CTA
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

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

const joinOptions = [
  {
    id: "member",
    icon: "👥",
    title: "عضو في المجتمع",
    subtitle: "انضم إلى مجتمع سُرّة",
    desc: "مساحة تجمع عشاق الفنون والإبداع في المملكة، تتيح لك المشاركة في الفعاليات واللقاءات والنقاشات الخاصة.",
    cta: "انضم كعضو",
    confirmMsg: "شكراً لانضمامك إلى سُرّة ✅ سيتواصل معك فريق العضويات قريباً لتفعيل عضويتك.",
    fields: [
      { name: "fullName", label: "الاسم الكامل", type: "text", required: true },
      { name: "email", label: "البريد الإلكتروني", type: "email", required: true },
      { name: "phone", label: "رقم الجوال", type: "tel", required: true },
      { name: "city", label: "المدينة", type: "text", required: true },
      { name: "interests", label: "مجالات الاهتمام", type: "text", required: false },
      { name: "reason", label: "سبب الانضمام", type: "textarea", required: false },
    ],
  },
  {
    id: "partner",
    icon: "🤝",
    title: "شريك أو راعٍ",
    subtitle: "كن شريكاً في الأثر",
    desc: "نفتح أبواب الشراكة أمام الجهات التي تؤمن بدور الثقافة والفن في صناعة مجتمع نابض بالحياة.",
    cta: "قدّم شراكتك",
    confirmMsg: "تم استلام طلبك 🤝 سيتواصل معك فريق الشراكات قريباً.",
    fields: [
      { name: "orgName", label: "اسم الجهة / الشركة", type: "text", required: true },
      { name: "repName", label: "اسم الممثل الرسمي", type: "text", required: true },
      { name: "email", label: "البريد الإلكتروني", type: "email", required: true },
      { name: "phone", label: "رقم الجوال", type: "tel", required: true },
      { name: "partnerType", label: "نوع الشراكة (رعاية / تعاون / محتوى / دعم لوجستي / أخرى)", type: "text", required: true },
      { name: "about", label: "نبذة عن الجهة أو المقترح", type: "textarea", required: false },
    ],
  },
  {
    id: "volunteer",
    icon: "🙌",
    title: "متطوع أو متعاون",
    subtitle: "تطوّع معنا",
    desc: "يُرحّب سُرّة بكل من يرغب في المساهمة بوقته ومهارته في إحياء الفعاليات والأنشطة الثقافية.",
    cta: "قدّم طلب التطوع",
    confirmMsg: "شكراً لاهتمامك! 🙌 سيتم التواصل معك لمطابقة الفرص التطوعية المناسبة.",
    fields: [
      { name: "fullName", label: "الاسم الكامل", type: "text", required: true },
      { name: "age", label: "العمر", type: "number", required: true },
      { name: "phone", label: "رقم الجوال", type: "tel", required: true },
      { name: "email", label: "البريد الإلكتروني", type: "email", required: true },
      { name: "skill", label: "المهارة / الدور المرغوب", type: "text", required: true },
      { name: "availability", label: "الأوقات المتاحة", type: "text", required: false },
      { name: "bio", label: "رسالة قصيرة عنك", type: "textarea", required: false },
    ],
  },
  {
    id: "team",
    icon: "🧠",
    title: "عضو فريق سُرّة",
    subtitle: "انضم إلى فريق العمل",
    desc: "نبحث عن كفاءات مفعمة بالشغف بالثقافة والفن لتكون جزءاً من الفريق الإداري والتنظيمي لسُرّة.",
    cta: "قدّم طلب الانضمام للفريق",
    confirmMsg: "تم استلام طلبك 🌿 سيتم مراجعته والتواصل معك في حال توفر شاغر مناسب.",
    fields: [
      { name: "fullName", label: "الاسم الكامل", type: "text", required: true },
      { name: "city", label: "المدينة", type: "text", required: true },
      { name: "age", label: "العمر", type: "number", required: true },
      { name: "phone", label: "رقم الجوال", type: "tel", required: true },
      { name: "email", label: "البريد الإلكتروني", type: "email", required: true },
      { name: "specialty", label: "التخصص أو المجال", type: "text", required: true },
      { name: "experience", label: "الخبرات السابقة", type: "textarea", required: false },
      { name: "cv", label: "إرفاق السيرة الذاتية (اختياري)", type: "text", required: false },
    ],
  },
  {
    id: "initiative",
    icon: "💡",
    title: "مبادرة",
    subtitle: "شاركنا مبادرتك",
    desc: "نحتضن الأفكار والمشاريع الثقافية التي تصنع فرقاً وتُضيف للمشهد الإبداعي المحلي.",
    cta: "قدّم مبادرتك",
    confirmMsg: "تم إرسال مبادرتك بنجاح 💡 سيراجعها فريق المبادرات ويتواصل معك قريباً.",
    fields: [
      { name: "fullName", label: "الاسم الكامل", type: "text", required: true },
      { name: "phone", label: "رقم الجوال", type: "tel", required: true },
      { name: "email", label: "البريد الإلكتروني", type: "email", required: true },
      { name: "initiativeName", label: "اسم المبادرة", type: "text", required: true },
      { name: "description", label: "وصف الفكرة / المشروع", type: "textarea", required: true },
      { name: "supportType", label: "نوع الدعم المطلوب", type: "text", required: true },
      { name: "attachments", label: "المرفقات (اختياري)", type: "text", required: false },
    ],
  },
];

function JoinForm({ option }: { option: typeof joinOptions[0] }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success(option.confirmMsg);
  };

  if (submitted) {
    return (
      <div
        className="p-8 text-center"
        style={{
          background: "#111111",
          border: "1px solid rgba(196, 98, 45, 0.4)",
        }}
      >
        <div
          className="text-4xl mb-4"
          style={{ color: "#C4622D" }}
        >
          ✓
        </div>
        <p
          style={{
            fontFamily: "'ThmanyahSerifText', sans-serif",
            color: "#3D4F60",
            lineHeight: 1.8,
          }}
        >
          {option.confirmMsg}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {option.fields.map((field) => (
        <div key={field.name}>
          <label
            className="block text-sm mb-1.5"
            style={{
              fontFamily: "'ThmanyahSerifText', sans-serif",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            {field.label}
            {field.required && (
              <span style={{ color: "#C4622D" }}> *</span>
            )}
          </label>
          {field.type === "textarea" ? (
            <textarea
              rows={3}
              required={field.required}
              value={formData[field.name] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [field.name]: e.target.value })
              }
              className="w-full px-4 py-3 text-sm resize-none transition-colors duration-200"
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(28, 43, 58, 0.15)",
                color: "#ffffff",
                fontFamily: "'ThmanyahSerifText', sans-serif",
                outline: "none",
              }}
              onFocus={(e) => {
                (e.target as HTMLElement).style.borderColor = "rgba(181, 69, 58, 0.6)";
              }}
              onBlur={(e) => {
                (e.target as HTMLElement).style.borderColor = "rgba(28, 43, 58, 0.15)";
              }}
            />
          ) : (
            <input
              type={field.type}
              required={field.required}
              value={formData[field.name] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [field.name]: e.target.value })
              }
              className="w-full px-4 py-3 text-sm transition-colors duration-200"
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(28, 43, 58, 0.15)",
                color: "#ffffff",
                fontFamily: "'ThmanyahSerifText', sans-serif",
                outline: "none",
              }}
              onFocus={(e) => {
                (e.target as HTMLElement).style.borderColor = "rgba(181, 69, 58, 0.6)";
              }}
              onBlur={(e) => {
                (e.target as HTMLElement).style.borderColor = "rgba(28, 43, 58, 0.15)";
              }}
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn-surrah-primary-filled w-full justify-center mt-2">
        {option.cta}
      </button>
    </form>
  );
}

export default function Join() {
  const pageRef = useReveal();
  const [activeOption, setActiveOption] = useState<string | null>(null);

  return (
    <div ref={pageRef} style={{ background: "#000000", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Page Hero ── */}
      <section
        className="relative pt-32 pb-24"
        style={{ background: "#111111" }}
      >
        <div className="container">
          <div className="max-w-3xl">
            <p
              className="text-sm mb-4 tracking-widest"
              style={{
                color: "#C4622D",
                fontFamily: "'ThmanyahSerifText', sans-serif",
                letterSpacing: "0.2em",
              }}
            >
              أنشئ مجتمعك
            </p>
            <h1
              style={{
                fontFamily: "'ThmanyahSerifText', sans-serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.3,
                marginBottom: "1rem",
              }}
            >
              انضم إلى سُرّة
            </h1>
            <p
              style={{
                fontFamily: "'ThmanyahSerifText', sans-serif",
                color: "#7A8A9A",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                maxWidth: "550px",
              }}
            >
              اختر الطريقة التي تود بها أن تكون جزءاً من مجتمع سُرّة
            </p>
          </div>
        </div>
      </section>

      {/* ── Join Options ── */}
      <section className="py-16" style={{ background: "#0a0a0a" }}>
        <div className="container">
          {/* Options List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
            {joinOptions.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  setActiveOption(activeOption === option.id ? null : option.id)
                }
                className="reveal text-right p-6 transition-all duration-300"
                style={{
                  background:
                    activeOption === option.id
                      ? "#1C2B3A"
                      : "#FFFFFF",
                  border:
                    activeOption === option.id
                      ? "1px solid rgba(181, 69, 58, 0.6)"
                      : "1px solid rgba(28, 43, 58, 0.12)",
                  cursor: "pointer",
                }}
              >
                <span className="block text-2xl mb-3">{option.icon}</span>
                <h3
                  className="font-semibold mb-1"
                  style={{
                    fontFamily: "'ThmanyahSerifText', sans-serif",
                    color:
                      activeOption === option.id
                        ? "#B5453A"
                        : "#1C2B3A",
                    fontSize: "1rem",
                  }}
                >
                  {option.title}
                </h3>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "'ThmanyahSerifText', sans-serif",
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.6,
                  }}
                >
                  {option.desc.substring(0, 60)}...
                </p>
              </button>
            ))}
          </div>

          {/* Active Form */}
          {activeOption && (() => {
            const option = joinOptions.find((o) => o.id === activeOption);
            if (!option) return null;
            return (
              <div
                className="reveal visible max-w-2xl mx-auto"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(28, 43, 58, 0.12)",
                  padding: "2.5rem",
                }}
              >
                <div className="mb-6">
                  <span className="text-3xl block mb-2">{option.icon}</span>
                  <h2
                    style={{
                      fontFamily: "'ThmanyahSerifText', sans-serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {option.subtitle}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'ThmanyahSerifText', sans-serif",
                      color: "#7A8A9A",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {option.desc}
                  </p>
                </div>
                <div
                  className="mb-6"
                  style={{
                    height: "1px",
                    background: "rgba(28, 43, 58, 0.12)",
                  }}
                />
                <JoinForm key={option.id} option={option} />
              </div>
            );
          })()}

          {!activeOption && (
            <div className="text-center py-8 reveal">
              <p
                style={{
                  fontFamily: "'ThmanyahSerifText', sans-serif",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.95rem",
                }}
              >
                اختر أحد الخيارات أعلاه لعرض النموذج المناسب
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom note ── */}
      <section className="py-16" style={{ background: "#111111" }}>
        <div className="container text-center">
          <div className="reveal max-w-lg mx-auto">
            <p
              style={{
                fontFamily: "'ThmanyahSerifText', sans-serif",
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
                fontStyle: "italic",
              }}
            >
              في سُرّة نؤمن أن كل عضو يُضيف بصمته الخاصة، فاختر طريقك وابدأ الرحلة معنا.
            </p>
            <div
              className="mt-4 mx-auto"
              style={{
                width: "3rem",
                height: "1px",
                background: "rgba(181, 69, 58, 0.4)",
              }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
