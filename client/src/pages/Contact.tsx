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
    background: "oklch(0.12 0.01 60)",
    border: "1px solid oklch(0.25 0.02 75 / 30%)",
    color: "oklch(0.90 0.01 80)",
    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    outline: "none",
    width: "100%",
    padding: "0.875rem 1rem",
    fontSize: "0.9rem",
    transition: "border-color 0.2s ease",
  };

  return (
    <div ref={pageRef} style={{ background: "oklch(0.08 0.01 60)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Page Hero ── */}
      <section
        className="relative pt-32 pb-16"
        style={{ background: "oklch(0.06 0.01 60)" }}
      >
        <div className="container">
          <div className="max-w-3xl">
            <p
              className="text-sm mb-4 tracking-widest"
              style={{
                color: "oklch(0.72 0.12 75)",
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                letterSpacing: "0.2em",
              }}
            >
              تواصل معنا
            </p>
            <h1
              style={{
                fontFamily: "'Noto Naskh Arabic', serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "oklch(0.97 0.01 80)",
                lineHeight: 1.3,
                marginBottom: "1rem",
              }}
            >
              نؤمن أن كل حوار
              <br />
              <span style={{ color: "oklch(0.72 0.12 75)" }}>جاد هو بداية…</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-16" style={{ background: "oklch(0.08 0.01 60)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Info */}
            <div className="reveal">
              <div className="gold-divider" />
              <h2
                style={{
                  fontFamily: "'Noto Naskh Arabic', serif",
                  fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                  fontWeight: 700,
                  color: "oklch(0.95 0.01 80)",
                  marginBottom: "1.5rem",
                }}
              >
                تواصل معنا
              </h2>
              <p
                className="mb-8"
                style={{
                  fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                  color: "oklch(0.65 0.01 80)",
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
                    color: "oklch(0.72 0.12 75)",
                    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
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
                      border: "1px solid oklch(0.25 0.02 75 / 20%)",
                      color: "oklch(0.70 0.01 80)",
                      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                      fontSize: "0.9rem",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "oklch(0.72 0.12 75 / 40%)";
                      el.style.color = "oklch(0.72 0.12 75)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "oklch(0.25 0.02 75 / 20%)";
                      el.style.color = "oklch(0.70 0.01 80)";
                    }}
                  >
                    <span>{social.label}</span>
                    <span
                      style={{
                        color: "oklch(0.55 0.01 80)",
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
                    background: "oklch(0.10 0.01 60)",
                    border: "1px solid oklch(0.72 0.12 75 / 30%)",
                  }}
                >
                  <div
                    className="text-5xl mb-4"
                    style={{ color: "oklch(0.72 0.12 75)" }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Noto Naskh Arabic', serif",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "oklch(0.90 0.01 80)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    شكراً على تواصلك
                  </h3>
                  <p
                    style={{
                      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                      color: "oklch(0.65 0.01 80)",
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
                    background: "oklch(0.10 0.01 60)",
                    border: "1px solid oklch(0.25 0.02 75 / 20%)",
                    padding: "2.5rem",
                  }}
                >
                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{
                        fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                        color: "oklch(0.65 0.01 80)",
                      }}
                    >
                      الاسم <span style={{ color: "oklch(0.72 0.12 75)" }}>*</span>
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
                        (e.target as HTMLElement).style.borderColor = "oklch(0.72 0.12 75 / 60%)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = "oklch(0.25 0.02 75 / 30%)";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{
                        fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                        color: "oklch(0.65 0.01 80)",
                      }}
                    >
                      البريد الإلكتروني <span style={{ color: "oklch(0.72 0.12 75)" }}>*</span>
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
                        (e.target as HTMLElement).style.borderColor = "oklch(0.72 0.12 75 / 60%)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = "oklch(0.25 0.02 75 / 30%)";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{
                        fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                        color: "oklch(0.65 0.01 80)",
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
                        (e.target as HTMLElement).style.borderColor = "oklch(0.72 0.12 75 / 60%)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = "oklch(0.25 0.02 75 / 30%)";
                      }}
                    >
                      <option value="" style={{ background: "oklch(0.12 0.01 60)" }}>
                        اختر سبب التواصل
                      </option>
                      {contactReasons.map((r) => (
                        <option
                          key={r.value}
                          value={r.value}
                          style={{ background: "oklch(0.12 0.01 60)" }}
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
                        fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                        color: "oklch(0.65 0.01 80)",
                      }}
                    >
                      رسالتك <span style={{ color: "oklch(0.72 0.12 75)" }}>*</span>
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
                        (e.target as HTMLElement).style.borderColor = "oklch(0.72 0.12 75 / 60%)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor = "oklch(0.25 0.02 75 / 30%)";
                      }}
                    />
                  </div>

                  <p
                    className="text-xs"
                    style={{
                      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                      color: "oklch(0.45 0.01 80)",
                    }}
                  >
                    نقرأ كل رسالة باهتمام.
                  </p>

                  <button type="submit" className="btn-gold-filled w-full justify-center">
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
