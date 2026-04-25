// Design: Surrah brand identity — black background, ManchetteFine font, orange #C4622D accents, white text
// Flow: Form 1 (6-axis discovery) → qualification scoring → Form 2 (8-section builder) OR thank-you

import { useState } from "react";

const FONT = "'ManchetteFine', sans-serif";
const ORANGE = "#C4622D";
const WHITE = "#ffffff";
const BLACK = "#000000";
const DARK_CARD = "#111111";
const BORDER = "rgba(255,255,255,0.12)";
const BORDER_ACTIVE = "rgba(196,98,45,0.6)";

// ─── Shared primitives ────────────────────────────────────────────────────────

function Input({ id, placeholder, dir = "rtl", type = "text", value, onChange }: {
  id?: string; placeholder?: string; dir?: string; type?: string;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <input
      id={id} type={type} placeholder={placeholder} dir={dir}
      value={value} onChange={e => onChange(e.target.value)}
      style={{
        width: "100%", padding: "10px 14px", background: DARK_CARD,
        border: `1px solid ${BORDER}`, borderRadius: "6px", color: WHITE,
        fontFamily: FONT, fontSize: "14px", outline: "none",
        transition: "border 0.2s",
      }}
      onFocus={e => (e.target.style.borderColor = ORANGE)}
      onBlur={e => (e.target.style.borderColor = BORDER)}
    />
  );
}

function Textarea({ id, placeholder, value, onChange, minHeight = 80 }: {
  id?: string; placeholder?: string; value: string;
  onChange: (v: string) => void; minHeight?: number;
}) {
  return (
    <textarea
      id={id} placeholder={placeholder} value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: "100%", padding: "10px 14px", background: DARK_CARD,
        border: `1px solid ${BORDER}`, borderRadius: "6px", color: WHITE,
        fontFamily: FONT, fontSize: "14px", outline: "none", resize: "vertical",
        minHeight, lineHeight: 1.6, transition: "border 0.2s",
      }}
      onFocus={e => (e.target.style.borderColor = ORANGE)}
      onBlur={e => (e.target.style.borderColor = BORDER)}
    />
  );
}

function Select({ id, options, value, onChange }: {
  id?: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <select
      id={id} value={value} onChange={e => onChange(e.target.value)}
      style={{
        width: "100%", padding: "10px 14px", background: DARK_CARD,
        border: `1px solid ${BORDER}`, borderRadius: "6px", color: value ? WHITE : "rgba(255,255,255,0.4)",
        fontFamily: FONT, fontSize: "14px", outline: "none",
      }}
    >
      <option value="">اختر</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function TagRow({ options, selected, onToggle }: {
  options: string[]; selected: string[]; onToggle: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
      {options.map(opt => {
        const active = selected.includes(opt);
        return (
          <button key={opt} type="button" onClick={() => onToggle(opt)}
            style={{
              padding: "6px 14px", borderRadius: "20px", fontSize: "13px",
              fontFamily: FONT, cursor: "pointer", transition: "all 0.2s",
              border: active ? `1px solid ${ORANGE}` : `1px solid ${BORDER}`,
              background: active ? "rgba(196,98,45,0.15)" : "transparent",
              color: active ? ORANGE : "rgba(255,255,255,0.65)",
            }}
          >{opt}</button>
        );
      })}
    </div>
  );
}

function Field({ label, axisNum, children }: {
  label: string; axisNum?: number; children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
        <label style={{ fontFamily: FONT, fontSize: "14px", color: WHITE, lineHeight: 1.5 }}>{label}</label>
        {axisNum !== undefined && (
          <span style={{ fontFamily: FONT, fontSize: "11px", color: ORANGE }}>{axisNum}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function AxisHeader({ tag, title, goal }: { tag: string; title: string; goal: string }) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <div style={{
        display: "inline-block", padding: "3px 12px", borderRadius: "20px",
        fontSize: "11px", fontFamily: FONT, background: "rgba(196,98,45,0.15)",
        color: ORANGE, border: `1px solid ${BORDER_ACTIVE}`, marginBottom: "10px",
      }}>{tag}</div>
      <div style={{ fontSize: "22px", fontFamily: FONT, color: WHITE, fontWeight: 300, marginBottom: "8px" }}>{title}</div>
      <div style={{
        fontSize: "13px", color: "rgba(255,255,255,0.55)", padding: "8px 12px",
        borderRight: `2px solid ${ORANGE}`, background: "rgba(196,98,45,0.06)",
        borderRadius: "0 4px 4px 0", lineHeight: 1.6,
      }}>{goal}</div>
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2rem" }}>
      <div style={{ display: "flex", gap: "5px", flex: 1 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            height: "3px", flex: 1, borderRadius: "2px",
            background: i < current ? ORANGE : i === current ? "rgba(196,98,45,0.5)" : "rgba(255,255,255,0.12)",
            transition: "background 0.3s",
          }} />
        ))}
      </div>
      <span style={{ fontFamily: FONT, fontSize: "12px", color: "rgba(255,255,255,0.45)", minWidth: "36px" }}>
        {current + 1} / {total}
      </span>
    </div>
  );
}

// ─── QUALIFICATION SCORING ────────────────────────────────────────────────────
// Returns true if the applicant qualifies for Form 2
function isQualified(f1: Form1Data): boolean {
  let score = 0;

  // Budget score (0-3)
  if (f1.budget === "أكثر من ٥٠٠،٠٠٠ ريال") score += 3;
  else if (f1.budget === "١٥٠،٠٠٠ – ٥٠٠،٠٠٠ ريال") score += 2;
  else if (f1.budget === "٥٠،٠٠٠ – ١٥٠،٠٠٠ ريال") score += 1;
  // "لم يُحدد بعد" or "أقل من ٥٠،٠٠٠ ريال" = 0

  // Vision clarity (0-2)
  if (f1.a1_1.trim().length > 80) score += 1;
  if (f1.a1_2.trim().length > 60) score += 1;

  // Audience clarity (0-2)
  if (f1.a2_1.trim().length > 60) score += 1;
  if (f1.a3_1.trim().length > 60) score += 1;

  // Growth ambition (0-1)
  if (f1.expansion.includes("مستوى وطني") || f1.expansion.includes("إقليمي أو دولي")) score += 1;

  // Minimum: score >= 4 AND budget not "أقل من ٥٠،٠٠٠ ريال"
  return score >= 4 && f1.budget !== "أقل من ٥٠،٠٠٠ ريال";
}

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Form1Data = {
  fullname: string; title: string; org: string; email: string; phone: string; sector: string;
  a1_1: string; a1_2: string; a1_3: string; a1_4: string; a1_5: string;
  a2_1: string; a2_2: string; a2_3: string; a2_4: string; baseType: string[]; accessType: string[];
  a3_1: string; focusType: string[]; a3_3: string; formalityType: string[]; paidType: string[];
  budget: string; a4_2: string; teamType: string[]; a4_4: string; a4_5: string;
  governance: string[]; a5_2: string; expansion: string[]; a5_4: string; a5_5: string;
};

type Form2Data = {
  client: string; sector: string; type: string; idea: string;
  name: string; nameEn: string; nameWhy: string; def: string;
  vision: string; mission: string; goals: string;
  persona: string; seek: string; pain: string;
  channels: string[]; ops: string; size: string; membership: string; team: string; kpi: string;
  products: string[]; productsOther: string;
  funding: string[]; sponsors: string; growth: string; risk: string;
  impactInd: string; impactWide: string; impactMeasure: string; legacy: string;
};

const emptyF1: Form1Data = {
  fullname: "", title: "", org: "", email: "", phone: "", sector: "",
  a1_1: "", a1_2: "", a1_3: "", a1_4: "", a1_5: "",
  a2_1: "", a2_2: "", a2_3: "", a2_4: "", baseType: [], accessType: [],
  a3_1: "", focusType: [], a3_3: "", formalityType: [], paidType: [],
  budget: "", a4_2: "", teamType: [], a4_4: "", a4_5: "",
  governance: [], a5_2: "", expansion: [], a5_4: "", a5_5: "",
};

const emptyF2: Form2Data = {
  client: "", sector: "", type: "", idea: "", name: "", nameEn: "", nameWhy: "", def: "",
  vision: "", mission: "", goals: "", persona: "", seek: "", pain: "",
  channels: [], ops: "", size: "", membership: "", team: "", kpi: "",
  products: [], productsOther: "",
  funding: [], sponsors: "", growth: "", risk: "",
  impactInd: "", impactWide: "", impactMeasure: "", legacy: "",
};

// ─── EMAIL SENDER (mailto fallback) ──────────────────────────────────────────
function sendEmail(subject: string, body: string) {
  const mailto = `mailto:info@surrah.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailto, "_blank");
}

function buildF1Email(d: Form1Data): string {
  return `نموذج استكشاف مجتمع جديد — سُرّة

الاسم: ${d.fullname}
المسمى: ${d.title}
الجهة: ${d.org}
البريد: ${d.email}
الهاتف: ${d.phone}
القطاع: ${d.sector}

── المحور الأول: الدافع والغاية ──
لماذا الآن: ${d.a1_1}
المشكلة: ${d.a1_2}
التكلفة في الغياب: ${d.a1_3}
الأهداف الاستراتيجية: ${d.a1_4}
المجتمع بعد 5 سنوات: ${d.a1_5}

── المحور الثاني: الجمهور ──
الشخصية المستهدفة: ${d.a2_1}
سبب الانضمام: ${d.a2_2}
أسباب المغادرة: ${d.a2_3}
القاعدة الحالية: ${d.baseType.join("، ")} — ${d.a2_4}
نوع الوصول: ${d.accessType.join("، ")}

── المحور الثالث: القيمة والتجربة ──
ما يحصل عليه العضو: ${d.a3_1}
محور التركيز: ${d.focusType.join("، ")}
الفعاليات المتوقعة: ${d.a3_3}
مستوى الرسمية: ${d.formalityType.join("، ")}
عضويات مدفوعة: ${d.paidType.join("، ")}

── المحور الرابع: الاستدامة ──
الميزانية السنوية الأولى: ${d.budget}
توقع الدخل: ${d.teamType.join("، ")} — ${d.a4_2}
الفريق: ${d.teamType.join("، ")}
صلاحيات التشغيل: ${d.a4_4}
العائد غير المالي: ${d.a4_5}

── المحور الخامس: الحوكمة والنمو ──
مجلس استشاري: ${d.governance.join("، ")}
آلية القرار: ${d.a5_2}
التوسع الجغرافي: ${d.expansion.join("، ")}
مقياس النجاح: ${d.a5_4}
المخاوف: ${d.a5_5}
`;
}

function buildF2Email(d: Form2Data): string {
  return `وثيقة بناء المجتمع — سُرّة

العميل: ${d.client}
القطاع: ${d.sector}
نوع المجتمع: ${d.type}
الفكرة: ${d.idea}

الاسم: ${d.name} / ${d.nameEn}
فلسفة الاسم: ${d.nameWhy}
التعريف: ${d.def}
الرؤية: ${d.vision}
الرسالة: ${d.mission}
الأهداف: ${d.goals}

الشخصية المستهدفة: ${d.persona}
ما يبحثون عنه: ${d.seek}
نقاط الألم: ${d.pain}

قنوات التواصل: ${d.channels.join("، ")}
الإيقاع التشغيلي: ${d.ops}
حجم المجتمع: ${d.size}
نموذج العضوية: ${d.membership}
الفريق: ${d.team}
مؤشرات النجاح: ${d.kpi}

المنتجات: ${d.products.join("، ")}
منتجات أخرى: ${d.productsOther}

مصادر التمويل: ${d.funding.join("، ")}
نموذج الرعايات: ${d.sponsors}
استراتيجية النمو: ${d.growth}
مخاطر الاستدامة: ${d.risk}

الأثر الفردي: ${d.impactInd}
الأثر الأوسع: ${d.impactWide}
قياس الأثر: ${d.impactMeasure}
الإرث: ${d.legacy}
`;
}

// ─── FORM 1 ───────────────────────────────────────────────────────────────────

function Form1({ onQualified, onRejected }: {
  onQualified: (data: Form1Data) => void;
  onRejected: () => void;
}) {
  const [step, setStep] = useState(0); // 0=intro, 1-5=axes, 6=submitting
  const [d, setD] = useState<Form1Data>(emptyF1);

  const set = (key: keyof Form1Data) => (val: string) => setD(p => ({ ...p, [key]: val }));
  const toggle = (key: keyof Form1Data) => (val: string) => {
    setD(p => {
      const arr = p[key] as string[];
      return { ...p, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
    });
  };

  const TOTAL_STEPS = 6; // 0=intro, 1-5=axes

  const handleSubmit = () => {
    // Send email notification
    sendEmail("نموذج استكشاف مجتمع جديد — سُرّة", buildF1Email(d));
    // Evaluate qualification
    if (isQualified(d)) {
      onQualified(d);
    } else {
      onRejected();
    }
  };

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh", background: BLACK, color: WHITE,
    fontFamily: FONT, direction: "rtl", padding: "0",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "680px", margin: "0 auto", padding: "2rem 1.5rem 4rem",
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "2rem", paddingBottom: "1.25rem",
          borderBottom: `0.5px solid ${BORDER}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: ORANGE }} />
            <div>
              <div style={{ fontSize: "15px", fontWeight: 500, color: WHITE, fontFamily: FONT }}>سُرّة الثقافية</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", fontFamily: FONT }}>نموذج الاستكشاف — Community Discovery Form</div>
            </div>
          </div>
          {step > 0 && step < TOTAL_STEPS && (
            <ProgressBar current={step - 1} total={5} />
          )}
        </div>

        {/* Step 0: Intro */}
        {step === 0 && (
          <div>
            <AxisHeader
              tag="مرحبًا بك"
              title="قبل أن نبدأ"
              goal="هذا النموذج هو الخطوة الأولى في رحلتك مع سُرّة لبناء مجتمع حقيقي ومستدام"
            />
            <div style={{
              background: DARK_CARD, borderRadius: "8px", border: `1px solid ${BORDER}`,
              padding: "1.25rem", marginBottom: "1.5rem",
            }}>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "8px", fontFamily: FONT }}>
                إجاباتك ستساعدنا على فهم فكرتك، تقييم جاهزيتها، وتحديد ما إذا كنا الشريك المناسب لك في هذه الرحلة.
              </p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontFamily: FONT }}>
                لا توجد إجابات خاطئة — كن صريحًا قدر الإمكان. كلما كانت إجاباتك أوضح، كان تشخيصنا أدق.
              </p>
            </div>

            {/* Axes preview */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "2rem" }}>
              {[
                ["١", "الدافع والغاية"], ["٢", "الجمهور المستهدف"],
                ["٣", "القيمة والتجربة"], ["٤", "الاستدامة"],
              ].map(([num, label]) => (
                <div key={num} style={{
                  padding: "10px 12px", borderRadius: "6px", background: DARK_CARD,
                  border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%",
                    background: "rgba(196,98,45,0.15)", color: ORANGE,
                    fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: FONT, flexShrink: 0,
                  }}>{num}</div>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", fontFamily: FONT }}>{label}</span>
                </div>
              ))}
              <div style={{
                gridColumn: "span 2", padding: "10px 12px", borderRadius: "6px",
                background: DARK_CARD, border: `1px solid ${BORDER}`,
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <div style={{
                  width: "22px", height: "22px", borderRadius: "50%",
                  background: "rgba(196,98,45,0.15)", color: ORANGE,
                  fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: FONT, flexShrink: 0,
                }}>٥</div>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", fontFamily: FONT }}>الحوكمة والنمو</span>
              </div>
            </div>

            {/* Contact info */}
            <Field label="اسمك الكامل"><Input value={d.fullname} onChange={set("fullname")} placeholder="الاسم الكامل / Full Name" /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="المسمى الوظيفي"><Input value={d.title} onChange={set("title")} placeholder="مثال: مدير تنفيذي، مؤسس..." /></Field>
              <Field label="الجهة أو المؤسسة"><Input value={d.org} onChange={set("org")} placeholder="اسم الشركة أو المنظمة" /></Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="البريد الإلكتروني"><Input value={d.email} onChange={set("email")} type="email" placeholder="email@example.com" dir="ltr" /></Field>
              <Field label="رقم التواصل"><Input value={d.phone} onChange={set("phone")} type="tel" placeholder="+966 5x xxx xxxx" dir="ltr" /></Field>
            </div>
            <Field label="القطاع الذي تعمل فيه">
              <Select value={d.sector} onChange={set("sector")} options={["ثقافة وفنون","تكنولوجيا ورقمي","ريادة أعمال","تعليم وتدريب","صحة وعافية","إعلام وإنتاج إبداعي","تصميم","بيئة ومجتمع مدني","قطاع حكومي","أخرى"]} />
            </Field>
          </div>
        )}

        {/* Step 1: Axis 1 */}
        {step === 1 && (
          <div>
            <AxisHeader tag="المحور الأول — Axis 01" title="الدافع والغاية" goal="الهدف: نكشف هل الفكرة نزوة أم ضرورة استراتيجية" />
            <Field label="لماذا ترغبون في إنشاء مجتمع الآن تحديدًا؟" axisNum={1}><Textarea value={d.a1_1} onChange={set("a1_1")} placeholder="ما الذي دفعكم لهذا القرار في هذه المرحلة بالذات؟" /></Field>
            <Field label="ما المشكلة التي تسعون لمعالجتها من خلال هذا المجتمع؟" axisNum={2}><Textarea value={d.a1_2} onChange={set("a1_2")} placeholder="صفوا المشكلة أو الفرصة بوضوح..." /></Field>
            <Field label="ما الذي سيحدث لو لم يتم إنشاء هذا المجتمع؟" axisNum={3}><Textarea value={d.a1_3} onChange={set("a1_3")} placeholder="ما التكلفة أو الخسارة في غياب هذا المجتمع؟" /></Field>
            <Field label="كيف سيخدم المجتمع أهدافكم الاستراتيجية خلال ٣–٥ سنوات؟" axisNum={4}><Textarea value={d.a1_4} onChange={set("a1_4")} placeholder="ما الأثر المتوقع على مؤسستكم أو على القطاع؟" /></Field>
            <Field label="صف لنا المجتمع الذي تتوقعونه بعد خمس سنوات" axisNum={5}><Textarea value={d.a1_5} onChange={set("a1_5")} placeholder="من أعضاؤه؟ ما حجمه؟ ما الذي يُعرف به؟" /></Field>
          </div>
        )}

        {/* Step 2: Axis 2 */}
        {step === 2 && (
          <div>
            <AxisHeader tag="المحور الثاني — Axis 02" title="الجمهور المستهدف" goal="الهدف: نعرف هل فيه وضوح أو مجرد 'ناس مهتمين'" />
            <Field label="من هم الأعضاء المتوقعون؟ صف شخصيتهم بدقة" axisNum={1}><Textarea value={d.a2_1} onChange={set("a2_1")} placeholder="العمر، المهنة، الاهتمامات، مستوى الخبرة..." /></Field>
            <Field label="لماذا سينضمون؟ ما الذي يجذبهم؟" axisNum={2}><Textarea value={d.a2_2} onChange={set("a2_2")} placeholder="ما القيمة التي ستجعلهم يقولون 'هذا المكان لي'؟" /></Field>
            <Field label="ما الذي قد يجعلهم يغادرون؟" axisNum={3}><Textarea value={d.a2_3} onChange={set("a2_3")} placeholder="ما نقاط الضعف التي قد تُبعدهم؟" /></Field>
            <Field label="هل لديكم قاعدة حالية يمكن البناء عليها؟" axisNum={4}>
              <TagRow options={["نعم، قاعدة قوية","نعم، لكنها محدودة","لا، نبدأ من الصفر"]} selected={d.baseType} onToggle={toggle("baseType")} />
              <div style={{ marginTop: "8px" }}><Textarea value={d.a2_4} onChange={set("a2_4")} placeholder="تفاصيل إضافية..." minHeight={50} /></div>
            </Field>
            <Field label="هل سيكون المجتمع مفتوحًا أم حصريًا؟" axisNum={5}>
              <TagRow options={["مفتوح للجميع","حصري بمعايير","بدعوة فقط","مزيج"]} selected={d.accessType} onToggle={toggle("accessType")} />
            </Field>
          </div>
        )}

        {/* Step 3: Axis 3 */}
        {step === 3 && (
          <div>
            <AxisHeader tag="المحور الثالث — Axis 03" title="القيمة والتجربة" goal="الهدف: نفهم ما الذي سيحصل عليه العضو تحديدًا" />
            <Field label="ماذا سيحصل عليه العضو تحديدًا؟" axisNum={1}><Textarea value={d.a3_1} onChange={set("a3_1")} placeholder="كن دقيقًا — ليس 'قيمة' بل ماذا بالضبط؟" /></Field>
            <Field label="ما محور التركيز الرئيسي للمجتمع؟" axisNum={2}>
              <TagRow options={["المعرفة والتعلم","شبكة العلاقات","الدعم والمجتمع","الفرص والأعمال","الإبداع والإنتاج","الأثر والتغيير"]} selected={d.focusType} onToggle={toggle("focusType")} />
            </Field>
            <Field label="ما نوع الفعاليات أو الأنشطة المتوقعة؟" axisNum={3}><Textarea value={d.a3_3} onChange={set("a3_3")} placeholder="فعاليات حضورية، جلسات رقمية، ورش عمل، زيارات..." /></Field>
            <Field label="ما مستوى الرسمية الذي ترغبون فيه؟" axisNum={4}>
              <TagRow options={["غير رسمي ومرن","شبه رسمي","رسمي ومهني"]} selected={d.formalityType} onToggle={toggle("formalityType")} />
            </Field>
            <Field label="هل ترغبون في نظام عضويات مدفوعة؟" axisNum={5}>
              <TagRow options={["نعم، بالتأكيد","ربما لاحقًا","لا، مجاني","لم نحدد بعد"]} selected={d.paidType} onToggle={toggle("paidType")} />
            </Field>
          </div>
        )}

        {/* Step 4: Axis 4 */}
        {step === 4 && (
          <div>
            <AxisHeader tag="المحور الرابع — Axis 04" title="الاستدامة" goal="الهدف: نقيّم الجدية المالية وقابلية الاستمرار" />
            <Field label="ما الميزانية المخصصة للمجتمع في السنة الأولى؟" axisNum={1}>
              <Select value={d.budget} onChange={set("budget")} options={["أقل من ٥٠،٠٠٠ ريال","٥٠،٠٠٠ – ١٥٠،٠٠٠ ريال","١٥٠،٠٠٠ – ٥٠٠،٠٠٠ ريال","أكثر من ٥٠٠،٠٠٠ ريال","لم يُحدد بعد"]} />
            </Field>
            <Field label="هل تتوقعون أن يحقق المجتمع دخلًا؟" axisNum={2}>
              <TagRow options={["نعم، هدف أساسي","نعم، على المدى البعيد","لا، هو تكلفة استراتيجية"]} selected={d.teamType} onToggle={toggle("teamType")} />
              <div style={{ marginTop: "8px" }}><Textarea value={d.a4_2} onChange={set("a4_2")} placeholder="توضيح..." minHeight={50} /></div>
            </Field>
            <Field label="هل لديكم فريق داخلي أم تبحثون عن إدارة خارجية؟" axisNum={3}>
              <TagRow options={["فريق داخلي جاهز","نبحث عن إدارة خارجية","نموذج مشترك"]} selected={d.teamType} onToggle={toggle("teamType")} />
            </Field>
            <Field label="ما مستوى الصلاحيات المتاحة لفريق التشغيل؟" axisNum={4}><Textarea value={d.a4_4} onChange={set("a4_4")} placeholder="من يملك القرار النهائي؟ ما حدود صلاحيات الفريق التشغيلي؟" /></Field>
            <Field label="ما توقعاتكم للعائد غير المالي؟" axisNum={5}><Textarea value={d.a4_5} onChange={set("a4_5")} placeholder="سمعة، تأثير، تموضع في القطاع، بناء قاعدة عملاء..." /></Field>
          </div>
        )}

        {/* Step 5: Axis 5 */}
        {step === 5 && (
          <div>
            <AxisHeader tag="المحور الخامس — Axis 05" title="الحوكمة والنمو" goal="الهدف: نفهم هيكل القرار وطموح النمو" />
            <Field label="هل سيكون هناك مجلس أو لجنة استشارية؟" axisNum={1}>
              <TagRow options={["نعم، مخطط له","ربما لاحقًا","لا"]} selected={d.governance} onToggle={toggle("governance")} />
            </Field>
            <Field label="كيف ستُتخذ القرارات داخل المجتمع؟" axisNum={2}><Textarea value={d.a5_2} onChange={set("a5_2")} placeholder="من يقرر؟ ما آلية التشاور مع الأعضاء؟" /></Field>
            <Field label="هل تخططون للتوسع الجغرافي؟" axisNum={3}>
              <TagRow options={["مدينة واحدة فقط","مناطق متعددة","مستوى وطني","إقليمي أو دولي"]} selected={d.expansion} onToggle={toggle("expansion")} />
            </Field>
            <Field label="كيف تقيسون نجاح المجتمع؟" axisNum={4}><Textarea value={d.a5_4} onChange={set("a5_4")} placeholder="ما المؤشرات التي تعني لكم أن المجتمع ناجح بعد سنة؟" /></Field>
            <Field label="ما مخاوفكم الأكبر من هذه المبادرة؟" axisNum={5}><Textarea value={d.a5_5} onChange={set("a5_5")} placeholder="كن صريحًا — هذا يساعدنا على بناء خطة تحوط حقيقية" /></Field>

            <div style={{
              background: DARK_CARD, borderRadius: "8px", border: `1px solid ${BORDER}`,
              padding: "1.25rem", marginTop: "1.5rem",
            }}>
              <div style={{ fontSize: "14px", fontWeight: 500, color: WHITE, marginBottom: "4px", fontFamily: FONT }}>جاهز لإرسال النموذج</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "14px", lineHeight: 1.5, fontFamily: FONT }}>
                بعد الإرسال سيتواصل معك فريق سُرّة خلال ٤٨ ساعة لتحديد موعد الجلسة الاستراتيجية الأولى
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  width: "100%", padding: "12px", fontSize: "14px", fontFamily: FONT,
                  background: ORANGE, color: WHITE, border: "none",
                  borderRadius: "6px", cursor: "pointer", transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#a3501f")}
                onMouseLeave={e => (e.currentTarget.style.background = ORANGE)}
              >
                إرسال النموذج والحصول على تقييم الجاهزية ←
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step < TOTAL_STEPS && (
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: "2rem", paddingTop: "1.25rem", borderTop: `0.5px solid ${BORDER}`,
          }}>
            <button
              type="button"
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              style={{
                padding: "9px 20px", borderRadius: "6px", fontSize: "13px",
                fontFamily: FONT, cursor: step === 0 ? "default" : "pointer",
                border: `1px solid ${BORDER}`, background: "transparent",
                color: step === 0 ? "rgba(255,255,255,0.25)" : WHITE,
                opacity: step === 0 ? 0.4 : 1,
              }}
            >→ السابق</button>

            {step < 5 && (
              <button
                type="button"
                onClick={() => setStep(s => Math.min(5, s + 1))}
                style={{
                  padding: "9px 20px", borderRadius: "6px", fontSize: "13px",
                  fontFamily: FONT, cursor: "pointer",
                  background: ORANGE, color: WHITE, border: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#a3501f")}
                onMouseLeave={e => (e.currentTarget.style.background = ORANGE)}
              >التالي ←</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FORM 2 ───────────────────────────────────────────────────────────────────

function Form2({ prefill }: { prefill: Form1Data }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [d, setD] = useState<Form2Data>({
    ...emptyF2,
    client: prefill.fullname,
    sector: prefill.sector,
  });

  const set = (key: keyof Form2Data) => (val: string) => setD(p => ({ ...p, [key]: val }));
  const toggle = (key: keyof Form2Data) => (val: string) => {
    setD(p => {
      const arr = p[key] as string[];
      return { ...p, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
    });
  };

  const TOTAL = 8;

  const handleGenerate = () => {
    sendEmail("وثيقة بناء المجتمع — سُرّة", buildF2Email(d));
    setSubmitted(true);
  };

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh", background: BLACK, color: WHITE,
    fontFamily: FONT, direction: "rtl",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "720px", margin: "0 auto", padding: "2rem 1.5rem 4rem",
  };

  if (submitted) {
    return (
      <div style={pageStyle}>
        <div style={{ ...containerStyle, textAlign: "center", paddingTop: "6rem" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "rgba(196,98,45,0.15)", border: `1px solid ${BORDER_ACTIVE}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div style={{ fontSize: "24px", fontFamily: FONT, color: WHITE, fontWeight: 300, marginBottom: "12px" }}>
            تم إرسال وثيقة المجتمع
          </div>
          <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", maxWidth: "380px", margin: "0 auto", lineHeight: 1.7, fontFamily: FONT }}>
            سيتواصل معك فريق سُرّة لمراجعة الوثيقة وتحديد الخطوات التالية
          </div>
          <div style={{
            display: "inline-block", marginTop: "1.5rem", padding: "8px 20px",
            borderRadius: "20px", background: "rgba(196,98,45,0.15)",
            border: `1px solid ${BORDER_ACTIVE}`, fontSize: "13px", color: ORANGE, fontFamily: FONT,
          }}>المرحلة التالية: التصميم والبناء</div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: `0.5px solid ${BORDER}`,
        }}>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 500, color: WHITE, fontFamily: FONT }}>بناء المجتمع</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", fontFamily: FONT }}>Community Builder — سُرّة</div>
          </div>
          <ProgressBar current={step} total={TOTAL} />
        </div>

        {/* Section 1 */}
        {step === 0 && (
          <div>
            <AxisHeader tag="القسم الأول — Section 01" title="الهوية الأساسية" goal="الأسس الجوهرية التي يقوم عليها المجتمع" />
            <Field label="اسم العميل أو المؤسسة"><Input value={d.client} onChange={set("client")} placeholder="الاسم الكامل للعميل أو المؤسسة" /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="القطاع"><Select value={d.sector} onChange={set("sector")} options={["ثقافة وفنون","تكنولوجيا","ريادة أعمال","تعليم","صحة","إعلام","تصميم","بيئة","حكومي","أخرى"]} /></Field>
              <Field label="نوع المجتمع"><Select value={d.type} onChange={set("type")} options={["مجتمع مهني","مجتمع إبداعي","مجتمع ثقافي","مجتمع تعليمي","مجتمع ريادي","مجتمع اجتماعي","أخرى"]} /></Field>
            </div>
            <Field label="الفكرة المركزية للمجتمع"><Textarea value={d.idea} onChange={set("idea")} placeholder="وصف موجز للفكرة الجوهرية..." /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="اسم المجتمع (عربي)"><Input value={d.name} onChange={set("name")} placeholder="الاسم العربي" /></Field>
              <Field label="Community Name (English)"><Input value={d.nameEn} onChange={set("nameEn")} placeholder="English Name" dir="ltr" /></Field>
            </div>
            <Field label="فلسفة الاسم — لماذا هذا الاسم؟"><Textarea value={d.nameWhy} onChange={set("nameWhy")} placeholder="ما القصة أو المعنى وراء الاسم؟" /></Field>
            <Field label="تعريف المجتمع في جملة واحدة"><Textarea value={d.def} onChange={set("def")} placeholder="مثال: مجتمع يجمع المصممين السعوديين لتبادل الخبرات وبناء مشاريع مشتركة" minHeight={60} /></Field>
          </div>
        )}

        {/* Section 2 */}
        {step === 1 && (
          <div>
            <AxisHeader tag="القسم الثاني — Section 02" title="الرؤية والرسالة" goal="الغاية الكبرى والمسار الذي يسلكه المجتمع" />
            <Field label="الرؤية — Vision"><Textarea value={d.vision} onChange={set("vision")} placeholder="أين يكون المجتمع بعد ١٠ سنوات؟" /></Field>
            <Field label="الرسالة — Mission"><Textarea value={d.mission} onChange={set("mission")} placeholder="كيف يحقق المجتمع رؤيته يومياً؟" /></Field>
            <Field label="الأهداف الاستراتيجية — Goals"><Textarea value={d.goals} onChange={set("goals")} placeholder="٣–٥ أهداف قابلة للقياس خلال السنة الأولى..." minHeight={100} /></Field>
          </div>
        )}

        {/* Section 3 */}
        {step === 2 && (
          <div>
            <AxisHeader tag="القسم الثالث — Section 03" title="الجمهور المستهدف" goal="من هم الأعضاء وما الذي يبحثون عنه" />
            <Field label="الشخصية المستهدفة — Persona"><Textarea value={d.persona} onChange={set("persona")} placeholder="العمر، المهنة، الاهتمامات، مستوى الخبرة، الطموحات..." /></Field>
            <Field label="ما الذي يبحث عنه العضو؟"><Textarea value={d.seek} onChange={set("seek")} placeholder="ما الذي يجعله يقول 'هذا المكان لي'؟" /></Field>
            <Field label="نقاط الألم — Pain Points"><Textarea value={d.pain} onChange={set("pain")} placeholder="ما التحديات التي يواجهها الجمهور المستهدف حاليًا؟" /></Field>
          </div>
        )}

        {/* Section 4 */}
        {step === 3 && (
          <div>
            <AxisHeader tag="القسم الرابع — Section 04" title="قنوات التواصل" goal="أين يتجمع الأعضاء ويتفاعلون" />
            <Field label="اختر قنوات التواصل الرئيسية">
              <TagRow
                options={["واتساب","إكس / تويتر","إنستغرام","لينكدإن","تيك توك","يوتيوب","تيليغرام","ديسكورد"]}
                selected={d.channels} onToggle={toggle("channels")}
              />
            </Field>
          </div>
        )}

        {/* Section 5 */}
        {step === 4 && (
          <div>
            <AxisHeader tag="القسم الخامس — Section 05" title="منتجات المجتمع" goal="ما الذي يقدمه المجتمع لأعضائه" />
            <Field label="اختر المنتجات المناسبة">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                {[
                  ["فعاليات دورية","Regular Events"],["بودكاست / محادثات","Podcast / Talks"],
                  ["محتوى تعليمي","Educational Content"],["شبكة تواصل","Networking"],
                  ["مسابقات وتحديات","Competitions"],["نشرة إخبارية","Newsletter"],
                  ["برامج تدريبية","Training Programs"],["جوائز واعتراف","Awards & Recognition"],
                  ["مجموعات نقاش","Discussion Groups"],["رحلات وزيارات","Trips & Visits"],
                  ["تقارير وأبحاث","Reports & Research"],["معارض وإنتاج","Exhibitions & Production"],
                ].map(([ar, en]) => {
                  const active = d.products.includes(ar);
                  return (
                    <button key={ar} type="button" onClick={() => toggle("products")(ar)}
                      style={{
                        padding: "10px 12px", borderRadius: "6px", textAlign: "right",
                        border: active ? `1px solid ${ORANGE}` : `1px solid ${BORDER}`,
                        background: active ? "rgba(196,98,45,0.12)" : DARK_CARD,
                        cursor: "pointer", transition: "all 0.2s",
                      }}>
                      <div style={{ fontSize: "13px", color: active ? ORANGE : WHITE, fontFamily: FONT }}>{ar}</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: FONT, marginTop: "2px" }}>{en}</div>
                    </button>
                  );
                })}
              </div>
            </Field>
            <Field label="منتجات أخرى أو ملاحظات">
              <Textarea value={d.productsOther} onChange={set("productsOther")} placeholder="أي منتجات إضافية تناسب هذا المجتمع..." minHeight={60} />
            </Field>
          </div>
        )}

        {/* Section 6 */}
        {step === 5 && (
          <div>
            <AxisHeader tag="القسم السادس — Section 06" title="الاستراتيجية التشغيلية" goal="كيف يعمل المجتمع يومياً وأسبوعياً وشهرياً" />
            <Field label="الإيقاع التشغيلي"><Textarea value={d.ops} onChange={set("ops")} placeholder="مثال: تجمع أسبوعي، محتوى يومي، فعالية شهرية، نشرة أسبوعية..." /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="حجم المجتمع المستهدف">
                <Select value={d.size} onChange={set("size")} options={["أقل من ١٠٠","١٠٠–٥٠٠","٥٠٠–٢٠٠٠","٢٠٠٠–١٠٠٠٠","أكثر من ١٠٠٠٠"]} />
              </Field>
              <Field label="نموذج العضوية">
                <Select value={d.membership} onChange={set("membership")} options={["مجاني بالكامل","مجاني مع مزايا مدفوعة","اشتراك سنوي","دعوة فقط","مختلط"]} />
              </Field>
            </div>
            <Field label="فريق الإدارة المطلوب"><Textarea value={d.team} onChange={set("team")} placeholder="مثال: مدير مجتمع، منتج محتوى، منسق فعاليات..." minHeight={65} /></Field>
            <Field label="مؤشرات النجاح التشغيلية — KPIs"><Textarea value={d.kpi} onChange={set("kpi")} placeholder="مثال: معدل التفاعل، نسبة الاحتفاظ، حضور الفعاليات..." minHeight={65} /></Field>
          </div>
        )}

        {/* Section 7 */}
        {step === 6 && (
          <div>
            <AxisHeader tag="القسم السابع — Section 07" title="الاستدامة والرعايات" goal="النموذج المالي وكيف يستمر المجتمع ويكبر" />
            <Field label="مصادر التمويل المتوقعة">
              <TagRow
                options={["رعايات مؤسسية","اشتراكات الأعضاء","تذاكر الفعاليات","برامج تدريبية مدفوعة","شراكات إعلامية","منح وجوائز","تمويل ذاتي"]}
                selected={d.funding} onToggle={toggle("funding")}
              />
            </Field>
            <Field label="نموذج الرعايات"><Textarea value={d.sponsors} onChange={set("sponsors")} placeholder="ما أنواع الرعاة المثاليين؟ ما الذي يقدمه المجتمع للراعي؟" /></Field>
            <Field label="استراتيجية النمو"><Textarea value={d.growth} onChange={set("growth")} placeholder="كيف ينمو المجتمع؟ عضوية عضوية، شراكات، إعلام، محتوى..." /></Field>
            <Field label="خطر الاستدامة وكيف نواجهه"><Textarea value={d.risk} onChange={set("risk")} placeholder="ما التحديات التي قد تهدد استمرار المجتمع وكيف نتعامل معها؟" minHeight={65} /></Field>
          </div>
        )}

        {/* Section 8 */}
        {step === 7 && (
          <div>
            <AxisHeader tag="القسم الثامن — Section 08" title="الأثر والقيمة" goal="ما الفرق الذي يصنعه هذا المجتمع في حياة أعضائه والمجتمع الأوسع" />
            <Field label="الأثر على الفرد"><Textarea value={d.impactInd} onChange={set("impactInd")} placeholder="ما الذي يتغير في حياة العضو بعد انتمائه لهذا المجتمع؟" /></Field>
            <Field label="الأثر على القطاع أو المجتمع الأوسع"><Textarea value={d.impactWide} onChange={set("impactWide")} placeholder="ما الأثر على الصناعة أو المدينة أو المجتمع ككل؟" /></Field>
            <Field label="كيف نقيس الأثر"><Textarea value={d.impactMeasure} onChange={set("impactMeasure")} placeholder="مؤشرات نوعية وكمية: قصص نجاح، أعداد، تقارير سنوية..." /></Field>
            <Field label="الإرث المستهدف"><Textarea value={d.legacy} onChange={set("legacy")} placeholder="بعد ١٠ سنوات، ما الذي يُقال عن هذا المجتمع وما تركه؟" minHeight={65} /></Field>

            <div style={{
              background: DARK_CARD, borderRadius: "8px", border: `1px solid ${BORDER}`,
              padding: "1.25rem", marginTop: "1.5rem",
            }}>
              <div style={{ fontSize: "14px", fontWeight: 500, color: WHITE, marginBottom: "4px", fontFamily: FONT }}>جاهز لتوليد الوثيقة</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "14px", lineHeight: 1.5, fontFamily: FONT }}>
                سيتم إنتاج وثيقة كاملة ثنائية اللغة بكل تفاصيل المجتمع
              </div>
              <button
                type="button"
                onClick={handleGenerate}
                style={{
                  width: "100%", padding: "12px", fontSize: "14px", fontFamily: FONT,
                  background: ORANGE, color: WHITE, border: "none",
                  borderRadius: "6px", cursor: "pointer", transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#a3501f")}
                onMouseLeave={e => (e.currentTarget.style.background = ORANGE)}
              >توليد وثيقة المجتمع ↗</button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: "2rem", paddingTop: "1.25rem", borderTop: `0.5px solid ${BORDER}`,
        }}>
          <button
            type="button"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              padding: "9px 20px", borderRadius: "6px", fontSize: "13px",
              fontFamily: FONT, cursor: step === 0 ? "default" : "pointer",
              border: `1px solid ${BORDER}`, background: "transparent",
              color: step === 0 ? "rgba(255,255,255,0.25)" : WHITE,
              opacity: step === 0 ? 0.4 : 1,
            }}
          >→ السابق</button>

          {step < 7 && (
            <button
              type="button"
              onClick={() => setStep(s => Math.min(7, s + 1))}
              style={{
                padding: "9px 20px", borderRadius: "6px", fontSize: "13px",
                fontFamily: FONT, cursor: "pointer",
                background: ORANGE, color: WHITE, border: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#a3501f")}
              onMouseLeave={e => (e.currentTarget.style.background = ORANGE)}
            >التالي ←</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── THANK YOU ────────────────────────────────────────────────────────────────

function ThankYou() {
  return (
    <div style={{
      minHeight: "100vh", background: BLACK, color: WHITE,
      fontFamily: FONT, direction: "rtl",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ maxWidth: "480px", padding: "2rem", textAlign: "center" }}>
        <div style={{
          width: "64px", height: "64px", borderRadius: "50%",
          background: DARK_CARD, border: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 2rem",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <div style={{ fontSize: "28px", fontWeight: 300, color: WHITE, marginBottom: "16px", lineHeight: 1.3, fontFamily: FONT }}>
          شكراً لاهتمامك
        </div>
        <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "2rem", fontFamily: FONT }}>
          استلمنا نموذجك وسيقوم فريق سُرّة بمراجعته والتواصل معك في أقرب وقت ممكن.
        </div>
        <div style={{
          background: DARK_CARD, borderRadius: "8px", border: `1px solid ${BORDER}`,
          padding: "1.25rem", marginBottom: "2rem",
        }}>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontFamily: FONT }}>
            نقدّر جرأتك في التفكير ببناء مجتمع. كل فكرة عظيمة بدأت بخطوة أولى — وهذه كانت خطوتك.
          </div>
        </div>
        <a href="/" style={{
          display: "inline-block", padding: "10px 24px", borderRadius: "6px",
          border: `1px solid ${BORDER}`, color: WHITE, fontFamily: FONT,
          fontSize: "13px", textDecoration: "none", transition: "all 0.2s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ORANGE; (e.currentTarget as HTMLElement).style.color = ORANGE; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = WHITE; }}
        >العودة للرئيسية ←</a>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

type Stage = "form1" | "form2" | "thankyou";

export default function CreateCommunity() {
  const [stage, setStage] = useState<Stage>("form1");
  const [f1Data, setF1Data] = useState<Form1Data>(emptyF1);

  if (stage === "form1") {
    return (
      <Form1
        onQualified={(data) => { setF1Data(data); setStage("form2"); }}
        onRejected={() => setStage("thankyou")}
      />
    );
  }

  if (stage === "form2") {
    return <Form2 prefill={f1Data} />;
  }

  return <ThankYou />;
}
