// CreateCommunity.tsx
// Design: Surrah brand identity — black background, ManchetteFine font, orange #C4622D accents, white text
// Multi-step community discovery form (6 axes + intro + success)

import { useState } from "react";

const FONT = "'ManchetteFine', sans-serif";
const ORANGE = "#C4622D";
const WHITE = "#ffffff";
const BLACK = "#000000";
const DARK_CARD = "#111111";
const BORDER = "rgba(255,255,255,0.12)";
const BORDER_ACTIVE = "rgba(196,98,45,0.7)";

type TagGroupProps = {
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  multi?: boolean;
};

function TagGroup({ options, selected, onToggle, multi = true }: TagGroupProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => {
              if (!multi) {
                onToggle(opt);
              } else {
                onToggle(opt);
              }
            }}
            style={{
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontFamily: FONT,
              border: active ? `1px solid ${ORANGE}` : `1px solid ${BORDER}`,
              background: active ? "rgba(196,98,45,0.15)" : "transparent",
              color: active ? ORANGE : "rgba(255,255,255,0.7)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

type FieldProps = {
  label: string;
  num?: number;
  children: React.ReactNode;
};

function Field({ label, num, children }: FieldProps) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
        <label style={{ fontFamily: FONT, fontSize: "14px", color: WHITE, lineHeight: 1.5 }}>{label}</label>
        {num !== undefined && (
          <span style={{ fontFamily: FONT, fontSize: "11px", color: ORANGE }}>{num}</span>
        )}
      </div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: DARK_CARD,
  border: `1px solid ${BORDER}`,
  color: WHITE,
  fontFamily: FONT,
  fontSize: "13px",
  outline: "none",
  transition: "border 0.2s",
  borderRadius: "2px",
  lineHeight: 1.6,
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: "80px",
  resize: "vertical",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
};

export default function CreateCommunity() {
  const [step, setStep] = useState(0); // 0=intro, 1-5=axes, 6=success
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Step 0 — contact info
  const [fullname, setFullname] = useState("");
  const [title, setTitle] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");

  // Step 1 — الدافع والغاية
  const [a1_1, setA1_1] = useState("");
  const [a1_2, setA1_2] = useState("");
  const [a1_3, setA1_3] = useState("");
  const [a1_4, setA1_4] = useState("");
  const [a1_5, setA1_5] = useState("");

  // Step 2 — الجمهور المستهدف
  const [a2_1, setA2_1] = useState("");
  const [a2_2, setA2_2] = useState("");
  const [a2_3, setA2_3] = useState("");
  const [a2_4base, setA2_4base] = useState<string[]>([]);
  const [a2_4text, setA2_4text] = useState("");
  const [a2_5, setA2_5] = useState<string[]>([]);

  // Step 3 — القيمة والتجربة
  const [a3_1, setA3_1] = useState("");
  const [a3_2, setA3_2] = useState<string[]>([]);
  const [a3_3, setA3_3] = useState("");
  const [a3_4, setA3_4] = useState<string[]>([]);
  const [a3_5, setA3_5] = useState<string[]>([]);

  // Step 4 — الاستدامة
  const [a4_1, setA4_1] = useState("");
  const [a4_2base, setA4_2base] = useState<string[]>([]);
  const [a4_2text, setA4_2text] = useState("");
  const [a4_3, setA4_3] = useState<string[]>([]);
  const [a4_4, setA4_4] = useState("");
  const [a4_5, setA4_5] = useState("");

  // Step 5 — الحوكمة والنمو
  const [a5_1, setA5_1] = useState<string[]>([]);
  const [a5_2, setA5_2] = useState("");
  const [a5_3, setA5_3] = useState<string[]>([]);
  const [a5_4, setA5_4] = useState("");
  const [a5_5, setA5_5] = useState("");

  const TOTAL_STEPS = 6; // 0..5

  function toggleTag(
    val: string,
    current: string[],
    setter: (v: string[]) => void,
    multi = true
  ) {
    if (multi) {
      setter(current.includes(val) ? current.filter((x) => x !== val) : [...current, val]);
    } else {
      setter(current.includes(val) ? [] : [val]);
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      // Build email body
      const body = `
نموذج استكشاف مجتمع جديد — سُرّة

=== معلومات التواصل ===
الاسم: ${fullname}
المسمى الوظيفي: ${title}
الجهة: ${org}
البريد: ${email}
الهاتف: ${phone}
القطاع: ${sector}

=== المحور الأول: الدافع والغاية ===
١. لماذا الآن؟ ${a1_1}
٢. المشكلة: ${a1_2}
٣. تكلفة الغياب: ${a1_3}
٤. الأهداف الاستراتيجية: ${a1_4}
٥. رؤية بعد ٥ سنوات: ${a1_5}

=== المحور الثاني: الجمهور المستهدف ===
١. وصف الأعضاء: ${a2_1}
٢. دوافع الانضمام: ${a2_2}
٣. أسباب المغادرة: ${a2_3}
٤. القاعدة الحالية: ${a2_4base.join(", ")} — ${a2_4text}
٥. نوع العضوية: ${a2_5.join(", ")}

=== المحور الثالث: القيمة والتجربة ===
١. ما يحصل عليه العضو: ${a3_1}
٢. محور التركيز: ${a3_2.join(", ")}
٣. الفعاليات والأنشطة: ${a3_3}
٤. مستوى الرسمية: ${a3_4.join(", ")}
٥. عضويات مدفوعة: ${a3_5.join(", ")}

=== المحور الرابع: الاستدامة ===
١. الميزانية: ${a4_1}
٢. تحقيق دخل: ${a4_2base.join(", ")} — ${a4_2text}
٣. الفريق: ${a4_3.join(", ")}
٤. صلاحيات التشغيل: ${a4_4}
٥. العائد غير المالي: ${a4_5}

=== المحور الخامس: الحوكمة والنمو ===
١. مجلس استشاري: ${a5_1.join(", ")}
٢. آلية اتخاذ القرار: ${a5_2}
٣. التوسع الجغرافي: ${a5_3.join(", ")}
٤. مقياس النجاح: ${a5_4}
٥. المخاوف: ${a5_5}
      `.trim();

      // Use mailto as fallback (EmailJS requires account setup)
      // We'll use a simple fetch to formspree or just open mailto
      const mailtoLink = `mailto:info@surrah.net?subject=${encodeURIComponent("نموذج استكشاف مجتمع — " + fullname + " / " + org)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      setStep(6);
    } catch {
      setError("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  }

  const axisHeaders = [
    null,
    { tag: "المحور الأول — Axis 01", title: "الدافع والغاية", goal: "الهدف: نكشف هل الفكرة نزوة أم ضرورة استراتيجية" },
    { tag: "المحور الثاني — Axis 02", title: "الجمهور المستهدف", goal: "الهدف: نعرف هل فيه وضوح أو مجرد \"ناس مهتمين\"" },
    { tag: "المحور الثالث — Axis 03", title: "القيمة والتجربة", goal: "الهدف: نفهم ما الذي سيحصل عليه العضو تحديدًا" },
    { tag: "المحور الرابع — Axis 04", title: "الاستدامة", goal: "الهدف: نقيّم الجدية المالية وقابلية الاستمرار" },
    { tag: "المحور الخامس — Axis 05", title: "الحوكمة والنمو", goal: "الهدف: نفهم هيكل القرار وطموح النمو" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: BLACK, fontFamily: FONT, direction: "rtl", color: WHITE }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src="/logo.svg" alt="سُرّة" style={{ height: "36px" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <span style={{ fontFamily: FONT, fontSize: "18px", color: WHITE, fontWeight: 200 }}>سُرّة</span>
        </a>
        {step < 6 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "28px",
                  height: "3px",
                  borderRadius: "2px",
                  background: i < step ? ORANGE : i === step ? WHITE : BORDER,
                  transition: "background 0.3s",
                }}
              />
            ))}
            <span style={{ fontFamily: FONT, fontSize: "12px", color: "rgba(255,255,255,0.5)", marginRight: "4px" }}>
              {step < TOTAL_STEPS ? `${step + 1} / ${TOTAL_STEPS}` : ""}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>

        {/* Step 0 — Intro + Contact */}
        {step === 0 && (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "inline-block", padding: "3px 12px", border: `1px solid ${ORANGE}`, borderRadius: "20px", fontSize: "11px", color: ORANGE, marginBottom: "12px" }}>مرحبًا بك</div>
              <h1 style={{ fontFamily: FONT, fontWeight: 200, fontSize: "clamp(2rem, 5vw, 3rem)", color: WHITE, marginBottom: "1rem", lineHeight: 1.3 }}>قبل أن نبدأ</h1>
              <div style={{ background: DARK_CARD, border: `1px solid ${BORDER}`, padding: "1.25rem", marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: FONT, fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "8px" }}>هذا النموذج هو الخطوة الأولى في رحلتك مع سُرّة لبناء مجتمع حقيقي ومستدام.</p>
                <p style={{ fontFamily: FONT, fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "8px" }}>إجاباتك ستساعدنا على فهم فكرتك، تقييم جاهزيتها، وتحديد ما إذا كنا الشريك المناسب لك في هذه الرحلة.</p>
                <p style={{ fontFamily: FONT, fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>لا توجد إجابات خاطئة — كن صريحًا قدر الإمكان.</p>
              </div>
              {/* Axes preview */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "2rem" }}>
                {["الدافع والغاية", "الجمهور المستهدف", "القيمة والتجربة", "الاستدامة"].map((ax, i) => (
                  <div key={ax} style={{ padding: "10px 14px", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(196,98,45,0.15)", border: `1px solid ${ORANGE}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: ORANGE, flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ fontFamily: FONT, fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>{ax}</span>
                  </div>
                ))}
                <div style={{ gridColumn: "span 2", padding: "10px 14px", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(196,98,45,0.15)", border: `1px solid ${ORANGE}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: ORANGE, flexShrink: 0 }}>5</div>
                  <span style={{ fontFamily: FONT, fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>الحوكمة والنمو</span>
                </div>
              </div>
            </div>

            <Field label="اسمك الكامل">
              <input style={inputStyle} type="text" placeholder="الاسم الكامل / Full Name" value={fullname} onChange={e => setFullname(e.target.value)} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="المسمى الوظيفي">
                <input style={inputStyle} type="text" placeholder="مثال: مدير تنفيذي، مؤسس..." value={title} onChange={e => setTitle(e.target.value)} />
              </Field>
              <Field label="الجهة أو المؤسسة">
                <input style={inputStyle} type="text" placeholder="اسم الشركة أو المنظمة" value={org} onChange={e => setOrg(e.target.value)} />
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="البريد الإلكتروني">
                <input style={inputStyle} type="email" placeholder="email@example.com" dir="ltr" value={email} onChange={e => setEmail(e.target.value)} />
              </Field>
              <Field label="رقم التواصل">
                <input style={inputStyle} type="tel" placeholder="+966 5x xxx xxxx" dir="ltr" value={phone} onChange={e => setPhone(e.target.value)} />
              </Field>
            </div>
            <Field label="القطاع الذي تعمل فيه">
              <select style={selectStyle} value={sector} onChange={e => setSector(e.target.value)}>
                <option value="">اختر القطاع</option>
                {["ثقافة وفنون", "تكنولوجيا ورقمي", "ريادة أعمال", "تعليم وتدريب", "صحة وعافية", "إعلام وإنتاج إبداعي", "تصميم", "بيئة ومجتمع مدني", "قطاع حكومي", "أخرى"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {/* Step 1 — الدافع والغاية */}
        {step === 1 && (
          <div>
            <AxisHeader {...axisHeaders[1]!} />
            <Field label="لماذا ترغبون في إنشاء مجتمع الآن تحديدًا؟" num={1}><textarea style={textareaStyle} placeholder="ما الذي دفعكم لهذا القرار في هذه المرحلة بالذات؟" value={a1_1} onChange={e => setA1_1(e.target.value)} /></Field>
            <Field label="ما المشكلة التي تسعون لمعالجتها من خلال هذا المجتمع؟" num={2}><textarea style={textareaStyle} placeholder="صفوا المشكلة أو الفرصة بوضوح..." value={a1_2} onChange={e => setA1_2(e.target.value)} /></Field>
            <Field label="ما الذي سيحدث لو لم يتم إنشاء هذا المجتمع؟" num={3}><textarea style={textareaStyle} placeholder="ما التكلفة أو الخسارة في غياب هذا المجتمع؟" value={a1_3} onChange={e => setA1_3(e.target.value)} /></Field>
            <Field label="كيف سيخدم المجتمع أهدافكم الاستراتيجية خلال ٣–٥ سنوات؟" num={4}><textarea style={textareaStyle} placeholder="ما الأثر المتوقع على مؤسستكم أو على القطاع؟" value={a1_4} onChange={e => setA1_4(e.target.value)} /></Field>
            <Field label="صف لنا المجتمع الذي تتوقعونه بعد خمس سنوات" num={5}><textarea style={textareaStyle} placeholder="من أعضاؤه؟ ما حجمه؟ ما الذي يُعرف به؟" value={a1_5} onChange={e => setA1_5(e.target.value)} /></Field>
          </div>
        )}

        {/* Step 2 — الجمهور المستهدف */}
        {step === 2 && (
          <div>
            <AxisHeader {...axisHeaders[2]!} />
            <Field label="من هم الأعضاء المتوقعون؟ صف شخصيتهم بدقة" num={1}><textarea style={textareaStyle} placeholder="العمر، المهنة، الاهتمامات، مستوى الخبرة..." value={a2_1} onChange={e => setA2_1(e.target.value)} /></Field>
            <Field label="لماذا سينضمون؟ ما الذي يجذبهم؟" num={2}><textarea style={textareaStyle} placeholder="ما القيمة التي ستجعلهم يقولون 'هذا المكان لي'؟" value={a2_2} onChange={e => setA2_2(e.target.value)} /></Field>
            <Field label="ما الذي قد يجعلهم يغادرون؟" num={3}><textarea style={textareaStyle} placeholder="ما نقاط الضعف التي قد تُبعدهم؟" value={a2_3} onChange={e => setA2_3(e.target.value)} /></Field>
            <Field label="هل لديكم قاعدة حالية يمكن البناء عليها؟" num={4}>
              <TagGroup options={["نعم، قاعدة قوية", "نعم، لكنها محدودة", "لا، نبدأ من الصفر"]} selected={a2_4base} onToggle={(v) => toggleTag(v, a2_4base, setA2_4base, false)} multi={false} />
              <textarea style={{ ...textareaStyle, marginTop: "8px", minHeight: "50px" }} placeholder="تفاصيل إضافية..." value={a2_4text} onChange={e => setA2_4text(e.target.value)} />
            </Field>
            <Field label="هل سيكون المجتمع مفتوحًا أم حصريًا؟" num={5}>
              <TagGroup options={["مفتوح للجميع", "حصري بمعايير", "بدعوة فقط", "مزيج"]} selected={a2_5} onToggle={(v) => toggleTag(v, a2_5, setA2_5, false)} multi={false} />
            </Field>
          </div>
        )}

        {/* Step 3 — القيمة والتجربة */}
        {step === 3 && (
          <div>
            <AxisHeader {...axisHeaders[3]!} />
            <Field label="ماذا سيحصل عليه العضو تحديدًا؟" num={1}><textarea style={textareaStyle} placeholder="كن دقيقًا — ليس 'قيمة' بل ماذا بالضبط؟" value={a3_1} onChange={e => setA3_1(e.target.value)} /></Field>
            <Field label="ما محور التركيز الرئيسي للمجتمع؟" num={2}>
              <TagGroup options={["المعرفة والتعلم", "شبكة العلاقات", "الدعم والمجتمع", "الفرص والأعمال", "الإبداع والإنتاج", "الأثر والتغيير"]} selected={a3_2} onToggle={(v) => toggleTag(v, a3_2, setA3_2)} />
            </Field>
            <Field label="ما نوع الفعاليات أو الأنشطة المتوقعة؟" num={3}><textarea style={textareaStyle} placeholder="فعاليات حضورية، جلسات رقمية، ورش عمل، زيارات..." value={a3_3} onChange={e => setA3_3(e.target.value)} /></Field>
            <Field label="ما مستوى الرسمية الذي ترغبون فيه؟" num={4}>
              <TagGroup options={["غير رسمي ومرن", "شبه رسمي", "رسمي ومهني"]} selected={a3_4} onToggle={(v) => toggleTag(v, a3_4, setA3_4, false)} multi={false} />
            </Field>
            <Field label="هل ترغبون في نظام عضويات مدفوعة؟" num={5}>
              <TagGroup options={["نعم، بالتأكيد", "ربما لاحقًا", "لا، مجاني", "لم نحدد بعد"]} selected={a3_5} onToggle={(v) => toggleTag(v, a3_5, setA3_5, false)} multi={false} />
            </Field>
          </div>
        )}

        {/* Step 4 — الاستدامة */}
        {step === 4 && (
          <div>
            <AxisHeader {...axisHeaders[4]!} />
            <Field label="ما الميزانية المخصصة للمجتمع في السنة الأولى؟" num={1}>
              <select style={selectStyle} value={a4_1} onChange={e => setA4_1(e.target.value)}>
                <option value="">اختر النطاق</option>
                {["أقل من ٥٠،٠٠٠ ريال", "٥٠،٠٠٠ – ١٥٠،٠٠٠ ريال", "١٥٠،٠٠٠ – ٥٠٠،٠٠٠ ريال", "أكثر من ٥٠٠،٠٠٠ ريال", "لم يُحدد بعد"].map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="هل تتوقعون أن يحقق المجتمع دخلًا؟" num={2}>
              <TagGroup options={["نعم، هدف أساسي", "نعم، على المدى البعيد", "لا، هو تكلفة استراتيجية"]} selected={a4_2base} onToggle={(v) => toggleTag(v, a4_2base, setA4_2base, false)} multi={false} />
              <textarea style={{ ...textareaStyle, marginTop: "8px", minHeight: "50px" }} placeholder="توضيح..." value={a4_2text} onChange={e => setA4_2text(e.target.value)} />
            </Field>
            <Field label="هل لديكم فريق داخلي أم تبحثون عن إدارة خارجية؟" num={3}>
              <TagGroup options={["فريق داخلي جاهز", "نبحث عن إدارة خارجية", "نموذج مشترك"]} selected={a4_3} onToggle={(v) => toggleTag(v, a4_3, setA4_3, false)} multi={false} />
            </Field>
            <Field label="ما مستوى الصلاحيات المتاحة لفريق التشغيل؟" num={4}><textarea style={textareaStyle} placeholder="من يملك القرار النهائي؟ ما حدود صلاحيات الفريق التشغيلي؟" value={a4_4} onChange={e => setA4_4(e.target.value)} /></Field>
            <Field label="ما توقعاتكم للعائد غير المالي؟" num={5}><textarea style={textareaStyle} placeholder="سمعة، تأثير، تموضع في القطاع، بناء قاعدة عملاء..." value={a4_5} onChange={e => setA4_5(e.target.value)} /></Field>
          </div>
        )}

        {/* Step 5 — الحوكمة والنمو */}
        {step === 5 && (
          <div>
            <AxisHeader {...axisHeaders[5]!} />
            <Field label="هل سيكون هناك مجلس أو لجنة استشارية؟" num={1}>
              <TagGroup options={["نعم، مخطط له", "ربما لاحقًا", "لا"]} selected={a5_1} onToggle={(v) => toggleTag(v, a5_1, setA5_1, false)} multi={false} />
            </Field>
            <Field label="كيف ستُتخذ القرارات داخل المجتمع؟" num={2}><textarea style={textareaStyle} placeholder="من يقرر؟ ما آلية التشاور مع الأعضاء؟" value={a5_2} onChange={e => setA5_2(e.target.value)} /></Field>
            <Field label="هل تخططون للتوسع الجغرافي؟" num={3}>
              <TagGroup options={["مدينة واحدة فقط", "مناطق متعددة", "مستوى وطني", "إقليمي أو دولي"]} selected={a5_3} onToggle={(v) => toggleTag(v, a5_3, setA5_3, false)} multi={false} />
            </Field>
            <Field label="كيف تقيسون نجاح المجتمع؟" num={4}><textarea style={textareaStyle} placeholder="ما المؤشرات التي تعني لكم أن المجتمع ناجح بعد سنة؟" value={a5_4} onChange={e => setA5_4(e.target.value)} /></Field>
            <Field label="ما مخاوفكم الأكبر من هذه المبادرة؟" num={5}><textarea style={textareaStyle} placeholder="كن صريحًا — هذا يساعدنا على بناء خطة تحوط حقيقية" value={a5_5} onChange={e => setA5_5(e.target.value)} /></Field>

            {/* Submit box */}
            <div style={{ background: DARK_CARD, border: `1px solid ${BORDER}`, padding: "1.5rem", marginTop: "2rem" }}>
              <div style={{ fontFamily: FONT, fontSize: "15px", color: WHITE, marginBottom: "6px" }}>جاهز لإرسال النموذج</div>
              <div style={{ fontFamily: FONT, fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "1.25rem", lineHeight: 1.6 }}>بعد الإرسال سيتواصل معك فريق سُرّة خلال ٤٨ ساعة لتحديد موعد الجلسة الاستراتيجية الأولى</div>
              {error && <div style={{ color: "#ff6b6b", fontFamily: FONT, fontSize: "13px", marginBottom: "12px" }}>{error}</div>}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{ width: "100%", padding: "12px", fontFamily: FONT, fontSize: "14px", background: ORANGE, color: WHITE, border: "none", cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.6 : 1, transition: "opacity 0.2s", letterSpacing: "0.02em" }}
              >
                {submitting ? "جارٍ الإرسال..." : "إرسال النموذج والحصول على تقييم الجاهزية ←"}
              </button>
            </div>
          </div>
        )}

        {/* Step 6 — Success */}
        {step === 6 && (
          <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", border: `2px solid ${ORANGE}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ fontFamily: FONT, fontWeight: 200, fontSize: "2rem", color: WHITE, marginBottom: "1rem" }}>تم استلام نموذجك</h2>
            <p style={{ fontFamily: FONT, fontSize: "14px", color: "rgba(255,255,255,0.6)", maxWidth: "360px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
              سيتواصل معك فريق سُرّة خلال ٤٨ ساعة عمل لتحديد موعد الجلسة الاستراتيجية الأولى
            </p>
            <div style={{ display: "inline-block", padding: "8px 20px", border: `1px solid ${ORANGE}`, borderRadius: "20px", fontFamily: FONT, fontSize: "13px", color: ORANGE }}>
              المرحلة التالية: الاستكشاف والتشخيص
            </div>
            <div style={{ marginTop: "2.5rem" }}>
              <a href="/" style={{ fontFamily: FONT, fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", borderBottom: `1px solid rgba(255,255,255,0.2)`, paddingBottom: "2px" }}>
                العودة إلى الرئيسية
              </a>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step < 6 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "3rem", paddingTop: "1.5rem", borderTop: `1px solid ${BORDER}` }}>
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              style={{ padding: "10px 24px", fontFamily: FONT, fontSize: "13px", background: "transparent", border: `1px solid ${step === 0 ? BORDER : "rgba(255,255,255,0.3)"}`, color: step === 0 ? "rgba(255,255,255,0.3)" : WHITE, cursor: step === 0 ? "default" : "pointer", transition: "all 0.2s" }}
            >
              → السابق
            </button>
            {step < 5 && (
              <button
                onClick={() => setStep(step + 1)}
                style={{ padding: "10px 24px", fontFamily: FONT, fontSize: "13px", background: WHITE, border: `1px solid ${WHITE}`, color: BLACK, cursor: "pointer", transition: "all 0.2s" }}
              >
                التالي ←
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AxisHeader({ tag, title, goal }: { tag: string; title: string; goal: string }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "inline-block", padding: "3px 12px", border: `1px solid ${ORANGE}`, borderRadius: "20px", fontSize: "11px", color: ORANGE, marginBottom: "10px" }}>{tag}</div>
      <h2 style={{ fontFamily: FONT, fontWeight: 200, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: WHITE, marginBottom: "10px", lineHeight: 1.3 }}>{title}</h2>
      <div style={{ borderRight: `2px solid ${ORANGE}`, paddingRight: "12px", fontFamily: FONT, fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{goal}</div>
    </div>
  );
}
