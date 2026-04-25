/* ============================================================
   Contact Page — تواصل معنا — سُرّة
   Sections: Hero, Contact Form, Social Links
   ============================================================ */

import { useEffect, useRef, useState } from "react";
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

const contactReasons = [
  { value: "inquiry", label: "استفسار" },
  { value: "community", label: "إنشاء مجتمع" },
  { value: "partnership", label: "شراكة" },
];

export default function Contact() {
  const pageRef = useReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("نقرأ كل رسالة باهتمام. سنتواصل معك قريباً.");
  };

  const inputStyle = {
    background: "#1a1a1a",
    border: "1px solid rgba(28, 43, 58, 0.15)",
    color: "#ffffff",
    fontFamily: "'ThmanyahSerifText', sans-serif",
    outline: "none",
    width: "100%",
    padding: "0.875rem 1rem",
    fontSize: "0.9rem",
    transition: "border-color 0.2s ease",
  };

  return (
    <div ref={pageRef} style={{ background: "#000000", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Page Hero ── */}
      <section
        className="relative pt-32 pb-16"
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
              تواصل معنا
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
              نؤمن أن كل حوار
              <br />
              <span style={{ color: "#C4622D" }}>جاد هو بداية…</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-16" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Info */}
            <div className="reveal">
              <div className="surrah-divider" />
              <h2
                style={{
                  fontFamily: "'ThmanyahSerifText', sans-serif",
                  fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "1.5rem",
                }}
              >
                تواصل معنا
              </h2>
              <p
                className="mb-8"
                style={{
                  fontFamily: "'ThmanyahSerifText', sans-serif",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.9,
                  fontSize: "0.95rem",
                }}
              >
                سواء كان لديك فكرة تريد مشاركتها، أو استفسار عن خدماتنا، أو رغبة في الشراكة — نحن هنا نستمع.
              </p>

              {/* Social Links */}
              <div className="space-y-4">
                <p
                  className="text-xs tracking-widest"
                  style={{
                    color: "#C4622D",
                    fontFamily: "'ThmanyahSerifText', sans-serif",
                    letterSpacing: "0.2em",
                  }}
                >
                  تابعنا على
                </p>
                {[
                  { label: "منصة X (تويتر)", handle: "@surra_sa", href: "#" },
                  { label: "إنستجرام", handle: "@surra.sa", href: "#" },
                  { label: "لينكدإن", handle: "Surra", href: "#" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center justify-between py-3 px-4 transition-all duration-200"
                    style={{
                      border: "1px solid rgba(28, 43, 58, 0.12)",
                      color: "rgba(255,255,255,0.75)",
                      fontFamily: "'ThmanyahSerifText', sans-serif",
                      fontSize: "0.9rem",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(181, 69, 58, 0.4)";
                      el.style.color = "#C4622D";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(28, 43, 58, 0.12)";
                      el.style.color = "#5A6A7A";
                    }}
                  >
                    <span>{social.label}</span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.65)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {social.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="reveal" style={{ transitionDelay: "0.15s" }}>
              {submitted ? (
                <div
                  className="p-10 text-center"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(196, 98, 45, 0.4)",
                  }}
                >
                  <div
                    className="text-5xl mb-4"
                    style={{ color: "#C4622D" }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontFamily: "'ThmanyahSerifText', sans-serif",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "0.75rem",
                    }}
                  >
                    شكراً على تواصلك
                  </h3>
                  <p
                    style={{
                      fontFamily: "'ThmanyahSerifText', sans-serif",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.8,
                    }}
                  >
                    نقرأ كل رسالة باهتمام. سنتواصل معك قريباً.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(28, 43, 58, 0.12)",
                    padding: "2.5rem",
                  }}
                >
                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{
                        fontFamily: "'ThmanyahSerifText', sans-serif",
                        color: "rgba(255,255,255,0.75)",
                      }}
                    >
                      الاسم <span style={{ color: "#C4622D" }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.borderColor = "rgba(181, 69, 58, 0.6)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = "rgba(28, 43, 58, 0.15)";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{
                        fontFamily: "'ThmanyahSerifText', sans-serif",
                        color: "rgba(255,255,255,0.75)",
                      }}
                    >
                      البريد الإلكتروني <span style={{ color: "#C4622D" }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.borderColor = "rgba(181, 69, 58, 0.6)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = "rgba(28, 43, 58, 0.15)";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{
                        fontFamily: "'ThmanyahSerifText', sans-serif",
                        color: "rgba(255,255,255,0.75)",
                      }}
                    >
                      سبب التواصل
                    </label>
                    <select
                      value={formData.reason}
                      onChange={(e) =>
                        setFormData({ ...formData, reason: e.target.value })
                      }
                      style={{ ...inputStyle, appearance: "none" }}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.borderColor = "rgba(181, 69, 58, 0.6)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = "rgba(28, 43, 58, 0.15)";
                      }}
                    >
                      <option value="" style={{ background: "#1a1a1a" }}>
                        اختر سبب التواصل
                      </option>
                      {contactReasons.map((r) => (
                        <option
                          key={r.value}
                          value={r.value}
                          style={{ background: "#1a1a1a" }}
                        >
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{
                        fontFamily: "'ThmanyahSerifText', sans-serif",
                        color: "rgba(255,255,255,0.75)",
                      }}
                    >
                      رسالتك <span style={{ color: "#C4622D" }}>*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.borderColor = "rgba(181, 69, 58, 0.6)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = "rgba(28, 43, 58, 0.15)";
                      }}
                    />
                  </div>

                  <p
                    className="text-xs"
                    style={{
                      fontFamily: "'ThmanyahSerifText', sans-serif",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    نقرأ كل رسالة باهتمام.
                  </p>

                  <button type="submit" className="btn-surrah-primary-filled w-full justify-center">
                    أرسل رسالتك
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
