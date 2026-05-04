// Design: Surra brand identity — dark background #0D0D0D, gold accent #C4622D, Arabic RTL
// This is the event registration form — multi-step (3 steps), scoring logic, priority badge

import { useState } from "react";
import { Link } from "wouter";

// ─── THEME ───────────────────────────────────────────────────────
const THEME = {
  bg: "#0D0D0D",
  surface: "#141414",
  card: "#1A1A1A",
  border: "#2A2A2A",
  gold: "#C4622D",
  goldLight: "#E07A45",
  goldGlow: "rgba(196,98,45,0.12)",
  text: "#F0EAD6",
  muted: "#7A7060",
  accent: "#8B3A14",
  error: "#E05252",
  success: "#52C07E",
};

// ─── SCORING ─────────────────────────────────────────────────────
function calculateScore(data: Record<string, string | boolean>): number {
  let score = 0;
  if (data.memberType === "مستثمر") score += 5;
  if (data.memberType === "شريك تجاري") score += 4;
  if (data.goal === "شراكة") score += 4;
  if (data.goal === "استثمار") score += 5;
  if (data.hasProject === "نعم") score += 3;
  if (data.readiness === "جاهز الآن") score += 4;
  if (data.opportunitySize === "عالي جدًا") score += 5;
  if (data.timing === "خلال أسبوع") score += 3;
  if (data.linkedin) score += 2;
  if (typeof data.challengeAnswer === "string" && data.challengeAnswer.trim().length > 20) score += 3;
  return score;
}

function getPriority(score: number) {
  if (score >= 15) return { label: "A – أولوية عالية", color: "#52C07E", bg: "rgba(82,192,126,0.12)" };
  if (score >= 10) return { label: "B – مهم", color: "#E2C47A", bg: "rgba(226,196,122,0.12)" };
  if (score >= 5)  return { label: "C – متابعة", color: "#5AB4D4", bg: "rgba(90,180,212,0.12)" };
  return { label: "D – مؤجل", color: "#7A7060", bg: "rgba(122,112,96,0.12)" };
}

// ─── STYLES ──────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: "100vh",
    background: THEME.bg,
    color: THEME.text,
    fontFamily: "'Noto Naskh Arabic', 'Georgia', serif",
    direction: "rtl",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 16px 80px",
    position: "relative",
    overflow: "hidden",
  },
  glow: {
    position: "fixed",
    top: "-200px",
    right: "-200px",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(196,98,45,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  topBar: {
    width: "100%",
    maxWidth: "680px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "24px",
    paddingBottom: "8px",
    position: "relative",
    zIndex: 1,
  },
  header: {
    width: "100%",
    maxWidth: "680px",
    paddingTop: "24px",
    paddingBottom: "8px",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  logo: {
    fontSize: "13px",
    letterSpacing: "0.3em",
    color: THEME.gold,
    textTransform: "uppercase" as const,
    marginBottom: "12px",
    display: "block",
    whiteSpace: "nowrap" as const,
  },
  title: {
    fontSize: "clamp(24px,5vw,38px)",
    fontWeight: "700",
    color: THEME.text,
    lineHeight: "1.2",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "15px",
    color: THEME.muted,
    lineHeight: "1.7",
    maxWidth: "480px",
    margin: "0 auto 36px",
  },
  card: {
    width: "100%",
    maxWidth: "680px",
    background: THEME.card,
    border: `1px solid ${THEME.border}`,
    borderRadius: "20px",
    padding: "clamp(24px,5vw,44px)",
    position: "relative",
    zIndex: 1,
    boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
  },
  stepBar: {
    display: "flex",
    gap: "8px",
    marginBottom: "36px",
    alignItems: "center",
  },
  stepLabel: {
    fontSize: "12px",
    color: THEME.muted,
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: THEME.goldLight,
    marginBottom: "24px",
    paddingBottom: "12px",
    borderBottom: `1px solid ${THEME.border}`,
  },
  fieldGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: THEME.text,
    marginBottom: "8px",
    fontWeight: "500",
  },
  required: {
    color: THEME.gold,
    marginRight: "3px",
  },
  optional: {
    color: THEME.muted,
    fontSize: "11px",
    marginRight: "6px",
  },
  errorMsg: {
    fontSize: "12px",
    color: THEME.error,
    marginTop: "5px",
  },
  checkRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    background: THEME.surface,
    border: `1px solid ${THEME.border}`,
    borderRadius: "10px",
    padding: "14px 16px",
    cursor: "pointer",
    userSelect: "none" as const,
  },
  checkbox: {
    width: "18px",
    height: "18px",
    accentColor: THEME.gold,
    cursor: "pointer",
    marginTop: "2px",
    flexShrink: 0,
  },
  btnRow: {
    display: "flex",
    gap: "12px",
    marginTop: "32px",
    flexWrap: "wrap" as const,
  },
  btnPrimary: {
    flex: 1,
    padding: "14px 28px",
    background: `linear-gradient(135deg, ${THEME.gold}, ${THEME.accent})`,
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    fontFamily: "inherit",
    cursor: "pointer",
    minWidth: "120px",
  },
  btnSecondary: {
    padding: "14px 24px",
    background: "transparent",
    color: THEME.muted,
    border: `1px solid ${THEME.border}`,
    borderRadius: "10px",
    fontSize: "14px",
    fontFamily: "inherit",
    cursor: "pointer",
  },
  successWrap: {
    textAlign: "center" as const,
    padding: "32px 0",
  },
  successIcon: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "rgba(82,192,126,0.1)",
    border: "2px solid #52C07E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    fontSize: "32px",
  },
};

function inputStyle(err?: string): React.CSSProperties {
  return {
    width: "100%",
    background: THEME.surface,
    border: `1px solid ${err ? THEME.error : THEME.border}`,
    borderRadius: "10px",
    padding: "12px 16px",
    color: THEME.text,
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    direction: "rtl",
  };
}

function selectStyle(err?: string): React.CSSProperties {
  return {
    width: "100%",
    background: THEME.surface,
    border: `1px solid ${err ? THEME.error : THEME.border}`,
    borderRadius: "10px",
    padding: "12px 16px",
    color: THEME.text,
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    cursor: "pointer",
    direction: "rtl",
    boxSizing: "border-box",
  };
}

function textareaStyle(err?: string): React.CSSProperties {
  return {
    width: "100%",
    background: THEME.surface,
    border: `1px solid ${err ? THEME.error : THEME.border}`,
    borderRadius: "10px",
    padding: "12px 16px",
    color: THEME.text,
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    resize: "vertical",
    minHeight: "90px",
    direction: "rtl",
    boxSizing: "border-box",
  };
}

function stepDotStyle(active: boolean, done: boolean): React.CSSProperties {
  return {
    flex: done || active ? 1 : undefined,
    height: "3px",
    borderRadius: "99px",
    background: done ? THEME.gold : active ? THEME.goldLight : THEME.border,
    transition: "all 0.4s ease",
    minWidth: done || active ? undefined : "16px",
  };
}

function priorityBadgeStyle(p: { color: string; bg: string }): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "99px",
    background: p.bg,
    color: p.color,
    fontSize: "13px",
    fontWeight: "600",
    border: `1px solid ${p.color}33`,
    marginTop: "12px",
  };
}

// ─── VALIDATION ──────────────────────────────────────────────────
function validate(step: number, data: Record<string, string | boolean>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (step === 0) {
    const name = data.fullName as string;
    if (!name || name.trim().split(" ").length < 2)
      errors.fullName = "يرجى إدخال الاسم الثلاثي كاملاً";
    else if (/[0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(name))
      errors.fullName = "الاسم يجب أن يحتوي على أحرف فقط";
    if (!data.phone || !/^(05)\d{8}$/.test(data.phone as string))
      errors.phone = "رقم غير صحيح، الصيغة المطلوبة: 05XXXXXXXX";
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string))
      errors.email = "يرجى إدخال بريد إلكتروني صحيح";
    if (!data.city || !(data.city as string).trim())
      errors.city = "يرجى إدخال المدينة";
  }
  if (step === 1) {
    if (!data.memberType) errors.memberType = "يرجى اختيار نوع العضوية";
    if (!data.field) errors.field = "يرجى اختيار المجال";
    if (!data.goal) errors.goal = "يرجى تحديد هدف اللقاء";
    const va = data.valueAdded as string;
    if (!va || va.trim().length < 10)
      errors.valueAdded = "يرجى الإجابة بما لا يقل عن 10 أحرف";
    if (va && va.length > 150)
      errors.valueAdded = "الحد الأقصى 150 حرفاً";
    const ca = data.challengeAnswer as string;
    if (!ca || ca.trim().length < 15)
      errors.challengeAnswer = "يرجى الإجابة على السؤال المهني";
  }
  if (step === 2) {
    if (!data.hasProject) errors.hasProject = "يرجى الاختيار";
    if (!data.timing) errors.timing = "يرجى تحديد التوقيت";
    if (!data.readiness) errors.readiness = "يرجى تحديد جاهزيتك";
    if (!data.opportunitySize) errors.opportunitySize = "يرجى التقييم";
    if (!data.commitment) errors.commitment = "يجب الموافقة على الالتزام للمتابعة";
    if (data.isFirstTime && !data.heardFrom)
      errors.heardFrom = "يرجى الإجابة";
  }
  return errors;
}

// ─── FIELD COMPONENT (outside Register to prevent re-mount on re-render) ────
function Field({ label, name, required, optional, children, errors }: {
  label: string; name: string; required?: boolean; optional?: boolean;
  children: React.ReactNode; errors: Record<string, string>;
}) {
  return (
    <div style={S.fieldGroup}>
      <label style={S.label}>
        {required && <span style={S.required}>*</span>}
        {optional && <span style={S.optional}>(اختياري)</span>}
        {label}
      </label>
      {children}
      {errors[name] && <div style={S.errorMsg}>⚠ {errors[name]}</div>}
    </div>
  );
}
// ─── MAIN COMPONENT ──────────────────────────────────────────────
export default function Register() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string | boolean>>({
    fullName: "", phone: "", email: "", city: "",
    title: "", organization: "", linkedin: "",
    memberType: "", field: "", goal: "",
    valueAdded: "", challengeAnswer: "",
    hasProject: "", projectDesc: "",
    timing: "", readiness: "", opportunitySize: "",
    isFirstTime: false, heardFrom: "",
    commitment: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const TOTAL_STEPS = 3;

  const set = (k: string, v: string | boolean) => {
    setData(d => ({ ...d, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const nextStep = () => {
    const errs = validate(step, data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep(s => s + 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => { setStep(s => s - 1); setErrors({}); };

  const submit = () => {
    const errs = validate(step, data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const reset = () => {
    setData({
      fullName: "", phone: "", email: "", city: "",
      title: "", organization: "", linkedin: "",
      memberType: "", field: "", goal: "",
      valueAdded: "", challengeAnswer: "",
      hasProject: "", projectDesc: "",
      timing: "", readiness: "", opportunitySize: "",
      isFirstTime: false, heardFrom: "",
      commitment: false,
    });
    setStep(0); setSubmitted(false); setErrors({});
  };

  const score = calculateScore(data);
  const priority = getPriority(score);



  return (
    <div style={S.wrap}>
      <div style={S.glow} />

      {/* Top bar with back link */}
      <div style={S.topBar}>
        <Link href="/" style={{ color: THEME.muted, fontSize: "14px", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
          ← العودة للرئيسية
        </Link>
        <img
          src="/manus-storage/surrah_logo_white_EKvHMb.png"
          alt="سُرّة"
          style={{ height: "36px", objectFit: "contain" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      {/* Header */}
      <div style={S.header}>
        <span style={S.logo}>مجتمعات سُرّة</span>
        <div style={S.title}>نموذج التسجيل والانضمام</div>
        <p style={S.subtitle}>نهدف إلى بناء منظومة متكاملة تستثمر في الاقتصاد الإبداعي. كل سؤال هنا يساعدنا في ضمان أفضل تجربة وتوافق.</p>
      </div>

      {/* Form Card */}
      <div style={S.card}>
        {!submitted ? (
          <>
            {/* Step bar */}
            <div style={S.stepBar}>
              {[0, 1, 2].map(i => (
                <div key={i} style={stepDotStyle(step === i, step > i)} />
              ))}
            </div>
            <div style={S.stepLabel}>
              <span style={{ color: THEME.gold }}>
                {["البيانات الشخصية", "الاهتمامات المهنية", "التأكيد والجدية"][step]}
              </span>
              <span>{step + 1} / {TOTAL_STEPS}</span>
            </div>

            {/* STEP 0: Personal */}
            {step === 0 && (
              <div>
                <div style={S.sectionTitle}>📋 البيانات الأساسية</div>

                <Field errors={errors} label="الاسم الثلاثي" name="fullName" required>
                  <input style={inputStyle(errors.fullName)} value={data.fullName as string}
                    onChange={e => set("fullName", e.target.value)}
                    placeholder="مثال: محمد عبدالله السعيد" />
                </Field>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <Field errors={errors} label="رقم الجوال" name="phone" required>
                    <input style={inputStyle(errors.phone)} value={data.phone as string}
                      onChange={e => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="05XXXXXXXX" dir="ltr" />
                  </Field>
                  <Field errors={errors} label="المدينة" name="city" required>
                    <input style={inputStyle(errors.city)} value={data.city as string}
                      onChange={e => set("city", e.target.value)}
                      placeholder="الرياض، جدة…" />
                  </Field>
                </div>

                <Field errors={errors} label="البريد الإلكتروني" name="email" required>
                  <input style={inputStyle(errors.email)} value={data.email as string}
                    onChange={e => set("email", e.target.value)}
                    placeholder="you@example.com" dir="ltr" type="email" />
                </Field>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <Field errors={errors} label="المسمى الوظيفي" name="title" optional>
                    <input style={inputStyle()} value={data.title as string}
                      onChange={e => set("title", e.target.value)}
                      placeholder="مؤسس، مدير…" />
                  </Field>
                  <Field errors={errors} label="جهة العمل / المشروع" name="organization" optional>
                    <input style={inputStyle()} value={data.organization as string}
                      onChange={e => set("organization", e.target.value)}
                      placeholder="اسم الشركة أو المشروع" />
                  </Field>
                </div>

                <Field errors={errors} label="رابط LinkedIn / بورتفوليو" name="linkedin" optional>
                  <input style={inputStyle()} value={data.linkedin as string}
                    onChange={e => set("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/..." dir="ltr" />
                </Field>

                {/* First time check */}
                <div style={S.fieldGroup}>
                  <label style={S.checkRow}>
                    <input type="checkbox" style={S.checkbox}
                      checked={data.isFirstTime as boolean}
                      onChange={e => set("isFirstTime", e.target.checked)} />
                    <span style={{ fontSize: "14px" }}>أحضر لفعاليات سُرّة لأول مرة</span>
                  </label>
                </div>

                {data.isFirstTime && (
                  <Field errors={errors} label="كيف سمعت عنا؟" name="heardFrom" required>
                    <select style={selectStyle(errors.heardFrom)} value={data.heardFrom as string}
                      onChange={e => set("heardFrom", e.target.value)}>
                      <option value="">اختر...</option>
                      {["صديق أو معرفة", "منصات التواصل الاجتماعي", "بحث Google", "فعالية أخرى", "إعلان", "أخرى"].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                )}
              </div>
            )}

            {/* STEP 1: Professional */}
            {step === 1 && (
              <div>
                <div style={S.sectionTitle}>🎯 الاهتمامات والأهداف</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <Field errors={errors} label="نوع العضوية / التصنيف" name="memberType" required>
                    <select style={selectStyle(errors.memberType)} value={data.memberType as string}
                      onChange={e => set("memberType", e.target.value)}>
                      <option value="">اختر...</option>
                      {["صاحب مشروع", "فنان / مبدع", "مستثمر", "شريك تجاري", "جهة راعية", "إعلامي", "عضو مجتمع", "باحث", "طالب", "متطوع", "أخرى"].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </Field>

                  <Field errors={errors} label="المجال الرئيسي" name="field" required>
                    <select style={selectStyle(errors.field)} value={data.field as string}
                      onChange={e => set("field", e.target.value)}>
                      <option value="">اختر...</option>
                      {["الثقافة", "الفنون", "التقنية", "الاستثمار", "التعليم", "الإعلام", "الضيافة", "غير ربحي", "ريادة أعمال", "أخرى"].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field errors={errors} label="الهدف الرئيسي من الانضمام" name="goal" required>
                  <select style={selectStyle(errors.goal)} value={data.goal as string}
                    onChange={e => set("goal", e.target.value)}>
                    <option value="">اختر...</option>
                    {["شراكة", "تعاون", "استثمار", "تقديم مشروع", "انضمام للمجتمع", "رعاية", "استشارة", "شبكة علاقات"].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>

                <Field errors={errors} label="ما القيمة التي تتوقع إضافتها أو اكتسابها؟" name="valueAdded" required>
                  <textarea style={textareaStyle(errors.valueAdded)}
                    value={data.valueAdded as string}
                    onChange={e => set("valueAdded", e.target.value)}
                    placeholder="اكتب بشكل مختصر ومباشر…" maxLength={160} />
                  <div style={{ fontSize: "11px", color: (data.valueAdded as string).length > 150 ? THEME.error : THEME.muted, textAlign: "left", marginTop: "4px" }}>
                    {(data.valueAdded as string).length} / 150 حرف
                  </div>
                </Field>

                {/* Challenge Question */}
                <div style={{
                  background: THEME.goldGlow,
                  border: `1px solid ${THEME.gold}44`,
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "20px"
                }}>
                  <div style={{ fontSize: "12px", color: THEME.gold, marginBottom: "12px", fontWeight: "600", letterSpacing: "0.05em" }}>
                    ✦ سؤال التحقق المهني
                  </div>
                  <Field errors={errors} label="ما الفرق بين الاقتصاد الإبداعي والاقتصاد الترفيهي؟ أو كيف ترى دور الثقافة في التنمية الاقتصادية؟" name="challengeAnswer" required>
                    <textarea style={textareaStyle(errors.challengeAnswer)}
                      value={data.challengeAnswer as string}
                      onChange={e => set("challengeAnswer", e.target.value)}
                      placeholder="أجب بما تراه مناسباً… لا توجد إجابة خاطئة، نريد سماع رأيك الحقيقي." />
                  </Field>
                </div>
              </div>
            )}

            {/* STEP 2: Confirmation */}
            {step === 2 && (
              <div>
                <div style={S.sectionTitle}>✅ الجدية والتأكيد</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <Field errors={errors} label="هل لديك مشروع قائم حاليًا؟" name="hasProject" required>
                    <select style={selectStyle(errors.hasProject)} value={data.hasProject as string}
                      onChange={e => set("hasProject", e.target.value)}>
                      <option value="">اختر...</option>
                      <option value="نعم">نعم</option>
                      <option value="لا">لا، قيد التطوير</option>
                      <option value="فكرة">فكرة فقط</option>
                    </select>
                  </Field>

                  <Field errors={errors} label="متى ترغب في اللقاء؟" name="timing" required>
                    <select style={selectStyle(errors.timing)} value={data.timing as string}
                      onChange={e => set("timing", e.target.value)}>
                      <option value="">اختر...</option>
                      {["خلال أسبوع", "خلال شهر", "خلال 3 أشهر", "مفتوح"].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                {data.hasProject === "نعم" && (
                  <Field errors={errors} label="نبذة مختصرة عن مشروعك" name="projectDesc" optional>
                    <textarea style={textareaStyle()} value={data.projectDesc as string}
                      onChange={e => set("projectDesc", e.target.value)}
                      placeholder="اسم المشروع، ما يفعله، مرحلته الحالية…" />
                  </Field>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <Field errors={errors} label="مدى جاهزيتك الحالية" name="readiness" required>
                    <select style={selectStyle(errors.readiness)} value={data.readiness as string}
                      onChange={e => set("readiness", e.target.value)}>
                      <option value="">اختر...</option>
                      {["جاهز الآن", "خلال شهر", "مجرد استكشاف"].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </Field>

                  <Field errors={errors} label="حجم الفرصة المتوقعة" name="opportunitySize" required>
                    <select style={selectStyle(errors.opportunitySize)} value={data.opportunitySize as string}
                      onChange={e => set("opportunitySize", e.target.value)}>
                      <option value="">اختر...</option>
                      {["عالي جدًا", "متوسط", "بسيط / استكشافي"].map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* Commitment checkbox */}
                <div style={S.fieldGroup}>
                  <label style={{
                    ...S.checkRow,
                    border: `1px solid ${errors.commitment ? THEME.error : THEME.gold}44`,
                    background: THEME.goldGlow,
                  }}>
                    <input type="checkbox" style={S.checkbox}
                      checked={data.commitment as boolean}
                      onChange={e => set("commitment", e.target.checked)} />
                    <span style={{ fontSize: "14px", lineHeight: "1.6" }}>
                      أُقرّ بالتزامي بالحضور في الوقت المحدد والمشاركة الفعالة، وأفهم أن مجتمعات سُرّة تُقدّر جودة الحضور على كميته.
                    </span>
                  </label>
                  {errors.commitment && <div style={S.errorMsg}>⚠ {errors.commitment}</div>}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={S.btnRow}>
              {step > 0 && (
                <button style={S.btnSecondary} onClick={prevStep}>← السابق</button>
              )}
              {step < TOTAL_STEPS - 1 ? (
                <button style={S.btnPrimary} onClick={nextStep}>التالي →</button>
              ) : (
                <button style={S.btnPrimary} onClick={submit}>إرسال الطلب ✦</button>
              )}
            </div>
          </>
        ) : (
          /* SUCCESS */
          <div style={S.successWrap}>
            <div style={S.successIcon}>✓</div>
            <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>تم استلام طلبك!</div>
            <p style={{ color: THEME.muted, lineHeight: "1.8", maxWidth: "380px", margin: "0 auto 24px" }}>
              شكرًا يا <strong style={{ color: THEME.goldLight }}>{(data.fullName as string).split(" ")[0]}</strong>، تم استلام طلبك وسيتم مراجعته من فريق مجتمعات سُرّة. سنتواصل معك عند وجود توافق.
            </p>
            <div style={{ fontSize: "48px", fontWeight: "700", color: THEME.gold, lineHeight: 1 }}>{score}</div>
            <div style={{ fontSize: "12px", color: THEME.muted, marginTop: "4px" }}>نقاط الأولوية</div>
            <div style={priorityBadgeStyle(priority)}>{priority.label}</div>
            <div style={{ marginTop: "32px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button style={S.btnPrimary} onClick={reset}>تسجيل جديد</button>
              <Link href="/" style={{ ...S.btnSecondary, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                العودة للرئيسية
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap');
        input:focus, select:focus, textarea:focus {
          border-color: ${THEME.gold} !important;
          box-shadow: 0 0 0 3px ${THEME.goldGlow};
        }
        select option { background: ${THEME.surface}; color: ${THEME.text}; }
        button:hover { opacity: 0.88; transform: translateY(-1px); transition: all 0.15s; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
