/* ============================================================
   Contact Page — تواصل معنا — سُرّة | Multilingual
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const F = "'ManchetteFine', sans-serif";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); }); },
      { threshold: 0.12 }
    );
    el.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const contactReasonsData = {
  ar: [
    { value: "inquiry", label: "استفسار" },
    { value: "community", label: "إنشاء مجتمع" },
    { value: "partnership", label: "شراكة" },
  ],
  en: [
    { value: "inquiry", label: "Inquiry" },
    { value: "community", label: "Create a Community" },
    { value: "partnership", label: "Partnership" },
  ],
  zh: [
    { value: "inquiry", label: "咨询" },
    { value: "community", label: "创建社区" },
    { value: "partnership", label: "合作" },
  ],
};

const texts = {
  ar: {
    label: "تواصل معنا",
    h1a: "نؤمن أن كل حوار",
    h1b: "جاد هو بداية…",
    infoTitle: "تواصل معنا",
    infoDesc: "سواء كان لديك فكرة تريد مشاركتها، أو استفسار عن خدماتنا، أو رغبة في الشراكة — نحن هنا نستمع.",
    nameLabel: "الاسم",
    emailLabel: "البريد الإلكتروني",
    reasonLabel: "سبب التواصل",
    reasonPlaceholder: "اختر سبب التواصل",
    messageLabel: "رسالتك",
    readNote: "نقرأ كل رسالة باهتمام.",
    sendBtn: "أرسل رسالتك",
    successTitle: "شكراً على تواصلك",
    successMsg: "نقرأ كل رسالة باهتمام. سنتواصل معك قريباً.",
    toastMsg: "نقرأ كل رسالة باهتمام. سنتواصل معك قريباً.",
  },
  en: {
    label: "Contact Us",
    h1a: "We believe every serious",
    h1b: "conversation is a beginning…",
    infoTitle: "Get in Touch",
    infoDesc: "Whether you have an idea to share, a question about our services, or a desire to partner — we are here to listen.",
    nameLabel: "Name",
    emailLabel: "Email",
    reasonLabel: "Reason for Contact",
    reasonPlaceholder: "Select a reason",
    messageLabel: "Your Message",
    readNote: "We read every message carefully.",
    sendBtn: "Send Your Message",
    successTitle: "Thank You for Reaching Out",
    successMsg: "We read every message carefully. We will be in touch soon.",
    toastMsg: "We read every message carefully. We will be in touch soon.",
  },
  zh: {
    label: "联系我们",
    h1a: "我们相信每一次认真的",
    h1b: "对话都是一个开始…",
    infoTitle: "联系我们",
    infoDesc: "无论您有想法要分享、对我们服务的疑问，还是合作意向——我们在这里聆听。",
    nameLabel: "姓名",
    emailLabel: "电子邮件",
    reasonLabel: "联系原因",
    reasonPlaceholder: "选择原因",
    messageLabel: "您的留言",
    readNote: "我们认真阅读每一条留言。",
    sendBtn: "发送留言",
    successTitle: "感谢您的联系",
    successMsg: "我们认真阅读每一条留言。我们将尽快与您联系。",
    toastMsg: "我们认真阅读每一条留言。我们将尽快与您联系。",
  },
};

export default function Contact() {
  const pageRef = useReveal();
  const { lang, dir } = useLanguage();
  const tx = texts[lang] || texts.ar;
  const reasons = contactReasonsData[lang] || contactReasonsData.ar;

  const [formData, setFormData] = useState({ name: "", email: "", reason: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success(tx.toastMsg);
  };

  const inputStyle = {
    background: "#1a1a1a",
    border: "1px solid rgba(28, 43, 58, 0.15)",
    color: "var(--surrah-text-primary)",
    fontFamily: F,
    outline: "none",
    width: "100%",
    padding: "0.875rem 1rem",
    fontSize: "0.9rem",
    transition: "border-color 0.2s ease",
  };

  return (
    <div ref={pageRef} style={{ background: "var(--surrah-page-bg)", minHeight: "100vh" }} dir={dir}>
      <Navbar />

      {/* ── Page Hero (Video) ── */}
      <section
        style={{
          position: "relative",
          height: "65vh",
          minHeight: "420px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          paddingTop: "96px",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          <source src="/manus-storage/saudi-man-riding-a-horse-in-desert-at-dawn-wind-bl_11f890c9.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.5) 50%, rgba(13,13,13,0.15) 100%)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "3.5rem" }}>
          <p
            style={{
              fontFamily: F,
              fontWeight: 600,
              fontSize: "0.7rem",
              color: "#C4622D",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {tx.label}
          </p>
          <h1
            style={{
              fontFamily: F,
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#F0EAD6",
              lineHeight: 1.2,
            }}
          >
            {tx.h1a}
            <br /><span style={{ color: "#C4622D" }}>{tx.h1b}</span>
          </h1>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-16" style={{ background: "var(--surrah-section-bg)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <div className="reveal">
              <div className="surrah-divider" />
              <h2 style={{ fontFamily: F, fontSize: "clamp(1.3rem, 2.5vw, 2rem)", fontWeight: 700, color: "var(--surrah-text-primary)", marginBottom: "1.5rem" }}>
                {tx.infoTitle}
              </h2>
              <p className="mb-8" style={{ fontFamily: F, color: "rgba(255,255,255,0.75)", lineHeight: 1.9, fontSize: "0.95rem" }}>
                {tx.infoDesc}
              </p>
            </div>

            {/* Form */}
            <div className="reveal" style={{ transitionDelay: "0.15s" }}>
              {submitted ? (
                <div className="p-10 text-center" style={{ background: "var(--surrah-section-alt)", border: "1px solid rgba(196, 98, 45, 0.4)" }}>
                  <div className="text-5xl mb-4" style={{ color: "#C4622D" }}>✓</div>
                  <h3 style={{ fontFamily: F, fontSize: "1.3rem", fontWeight: 700, color: "var(--surrah-text-primary)", marginBottom: "0.75rem" }}>
                    {tx.successTitle}
                  </h3>
                  <p style={{ fontFamily: F, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                    {tx.successMsg}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" style={{ background: "var(--surrah-section-alt)", border: "1px solid rgba(255,255,255,0.12)", padding: "2.5rem" }}>
                  <div>
                    <label className="block text-sm mb-1.5" style={{ fontFamily: F, color: "rgba(255,255,255,0.75)" }}>
                      {tx.nameLabel} <span style={{ color: "#C4622D" }}>*</span>
                    </label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(181, 69, 58, 0.6)"; }}
                      onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(28, 43, 58, 0.15)"; }} />
                  </div>

                  <div>
                    <label className="block text-sm mb-1.5" style={{ fontFamily: F, color: "rgba(255,255,255,0.75)" }}>
                      {tx.emailLabel} <span style={{ color: "#C4622D" }}>*</span>
                    </label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(181, 69, 58, 0.6)"; }}
                      onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(28, 43, 58, 0.15)"; }} />
                  </div>

                  <div>
                    <label className="block text-sm mb-1.5" style={{ fontFamily: F, color: "rgba(255,255,255,0.75)" }}>
                      {tx.reasonLabel}
                    </label>
                    <select value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} style={{ ...inputStyle, appearance: "none" }}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(181, 69, 58, 0.6)"; }}
                      onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(28, 43, 58, 0.15)"; }}>
                      <option value="" style={{ background: "#1a1a1a", color: "var(--surrah-text-primary)" }}>{tx.reasonPlaceholder}</option>
                      {reasons.map((r) => (
                        <option key={r.value} value={r.value} style={{ background: "#1a1a1a" }}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-1.5" style={{ fontFamily: F, color: "rgba(255,255,255,0.75)" }}>
                      {tx.messageLabel} <span style={{ color: "#C4622D" }}>*</span>
                    </label>
                    <textarea rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(181, 69, 58, 0.6)"; }}
                      onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(28, 43, 58, 0.15)"; }} />
                  </div>

                  <p className="text-xs" style={{ fontFamily: F, color: "rgba(255,255,255,0.5)" }}>{tx.readNote}</p>

                  <button type="submit" className="btn-surrah-primary-filled w-full justify-center">{tx.sendBtn}</button>
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
