/*
 * دليل سُرّة — Creative Directory Page
 * Design: Dark identity — black bg, ManchetteFine, white/terracotta palette, NO icons/emoji
 * Tabs: Dashboard (stats + charts), Directory (grid/table), Register
 */

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fontBase = "'ManchetteFine', 'Tajawal', sans-serif";

const C = {
  bg: "#0a0a0a",
  card: "#111111",
  border: "rgba(255,255,255,0.08)",
  gold: "#C4622D",
  goldHover: "#a84f25",
  white: "#ffffff",
  muted: "rgba(255,255,255,0.5)",
  mutedDark: "rgba(255,255,255,0.25)",
  active: "#4caf50",
  moderate: "#ff9800",
  inactive: "#666",
};

interface Entity {
  id: number;
  name: string;
  type: string;
  city: string;
  focus: string;
  desc: string;
  tags: string[];
  activity: string;
  instagram: string;
  partnership: string;
  year: number;
  isNew: boolean;
}

const initialEntities: Entity[] = [
  { id: 1, name: "حي جميل", type: "مساحة إبداعية", city: "جدة", focus: "فنون بصرية وسينما", desc: "مجمع إبداعي متكامل بمساحة 17,000م² يضم 12 منظمة شريكة، استوديوهات، مسرح، وأول دار سينما مستقلة في المملكة.", tags: ["#فنون", "#سينما", "#ريادة", "#جدة"], activity: "نشط جداً", instagram: "@artjameel", partnership: "عالية", year: 2021, isNew: false },
  { id: 2, name: "الجمعية العربية السعودية للثقافة والفنون", type: "جمعية", city: "الرياض", focus: "مسرح وموسيقى وفنون بصرية", desc: "الكيان الرائد في خدمة الحراك الثقافي منذ 1973، تمتد عبر 16 فرعاً في المملكة مع أكثر من 11,000 عضو.", tags: ["#مسرح", "#موسيقى", "#فنون_بصرية", "#وطني"], activity: "نشط جداً", instagram: "@sasca_sa", partnership: "عالية", year: 1973, isNew: false },
  { id: 3, name: "جاكس — منطقة الدرعية الثقافية", type: "مساحة إبداعية", city: "الرياض", focus: "تصوير وتصميم وفنون معاصرة", desc: "حي ثقافي في قلب الدرعية يستضيف معارض وورشات في التصوير الفوتوغرافي، النحت، والتصميم الغرافيكي.", tags: ["#درعية", "#تصميم", "#تراث", "#معاصر"], activity: "نشط جداً", instagram: "@diriyahgate", partnership: "عالية", year: 2022, isNew: false },
  { id: 4, name: "بلد الفن", type: "مبادرة", city: "جدة", focus: "فنون بصرية وتراث محلي", desc: "مبادرة وزارة الثقافة التي تحوّل جدة التاريخية إلى مركز إبداعي ثقافي بمعارض تعكس التراث بأساليب عصرية.", tags: ["#جدة_التاريخية", "#تراث", "#فنون", "#وزارة_الثقافة"], activity: "نشط", instagram: "@ministryofculture", partnership: "عالية", year: 2024, isNew: false },
  { id: 5, name: "مركز إثراء", type: "مساحة إبداعية", city: "الدمام", focus: "ثقافة وفنون ومعرفة", desc: "مركز إثراء للمعرفة والفنون والثقافة في الظهران، يضم متحفاً ومسرحاً وحاضنة أعمال إبداعية.", tags: ["#إثراء", "#أرامكو", "#معرفة", "#شرقية"], activity: "نشط جداً", instagram: "@ithra", partnership: "عالية", year: 2018, isNew: false },
  { id: 6, name: "فنون العلا", type: "مبادرة", city: "العلا", focus: "فنون معاصرة وتراث صحراوي", desc: "مهرجان فنون عالمي في العلا يجمع الفنانين المحليين والدوليين وسط التضاريس الصحراوية الساحرة.", tags: ["#العلا", "#فنون_عالمية", "#صحراء", "#سياحة"], activity: "نشط", instagram: "@experiencealula", partnership: "متوسطة", year: 2020, isNew: false },
  { id: 7, name: "النادي الأدبي الثقافي جدة", type: "جمعية", city: "جدة", focus: "أدب وشعر وخط عربي", desc: "نادٍ أدبي ثقافي يقدم ورشات في الخط العربي والشعر، ويحتضن منتدى الفنون البصرية.", tags: ["#أدب", "#خط_عربي", "#شعر", "#جدة"], activity: "نشط", instagram: "@jeddahliterary", partnership: "متوسطة", year: 1975, isNew: false },
  { id: 8, name: "مبادرة الشريك الأدبي", type: "مبادرة", city: "الرياض", focus: "أدب ومقاهٍ ثقافية", desc: "مبادرة وزارة الثقافة لتحويل 80 مقهى في 12 منطقة إدارية إلى مساحات إبداعية وأدبية.", tags: ["#مقاهي", "#أدب", "#وزارة_الثقافة", "#وطني"], activity: "نشط جداً", instagram: "@ministryofculture", partnership: "عالية", year: 2023, isNew: false },
  { id: 9, name: "مجتمع سرة", type: "مجتمع", city: "الرياض", focus: "اقتصاد إبداعي وحراك ثقافي", desc: "منظومة متكاملة تغير مفاهيم الحراك الثقافي وتستثمر في الاقتصاد الإبداعي السعودي عبر بناء مجتمعات فنية حية.", tags: ["#سرة", "#اقتصاد_إبداعي", "#مجتمع", "#ريادة"], activity: "نشط جداً", instagram: "@surrah_community", partnership: "عالية", year: 2022, isNew: true },
];

function activityColor(a: string) {
  if (a === "نشط جداً") return C.active;
  if (a === "نشط") return C.moderate;
  return C.inactive;
}

function partnershipColor(p: string) {
  if (p === "عالية") return C.active;
  if (p === "متوسطة") return C.moderate;
  return C.inactive;
}

const chartColors = ["#C4622D", "#8a7560", "#b8522a", "#5a7a5c", "#3a5a8c"];

export default function Directory() {
  const [tab, setTab] = useState<"dashboard" | "directory" | "submit">("dashboard");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [entities, setEntities] = useState<Entity[]>(initialEntities);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterActivity, setFilterActivity] = useState("");
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "", type: "", city: "", year: "", desc: "", focus: "",
    activity: "نشط", partnership: "متوسطة", instagram: "", tagInput: "", tags: [] as string[],
  });

  const filtered = useMemo(() => {
    return entities.filter((e) => {
      const q = search.toLowerCase();
      const matchSearch = !q || e.name.includes(q) || e.city.includes(q) || e.focus.includes(q) || e.desc.includes(q) || e.tags.some((t) => t.includes(q));
      return matchSearch && (!filterType || e.type === filterType) && (!filterCity || e.city === filterCity) && (!filterActivity || e.activity === filterActivity);
    });
  }, [entities, search, filterType, filterCity, filterActivity]);

  const stats = useMemo(() => ({
    total: entities.length,
    cities: new Set(entities.map((e) => e.city)).size,
    highPartnership: entities.filter((e) => e.partnership === "عالية").length,
    veryActive: entities.filter((e) => e.activity === "نشط جداً").length,
  }), [entities]);

  const typeDistribution = useMemo(() => {
    const map: Record<string, number> = {};
    entities.forEach((e) => { map[e.type] = (map[e.type] || 0) + 1; });
    return Object.entries(map);
  }, [entities]);

  const cityDistribution = useMemo(() => {
    const map: Record<string, number> = {};
    entities.forEach((e) => { map[e.city] = (map[e.city] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [entities]);

  function handleSubmit() {
    if (!form.name || !form.type || !form.city || !form.desc) return;
    const newEntity: Entity = {
      id: Date.now(), name: form.name, type: form.type, city: form.city,
      focus: form.focus, desc: form.desc, tags: form.tags, activity: form.activity,
      instagram: form.instagram, partnership: form.partnership,
      year: parseInt(form.year) || new Date().getFullYear(), isNew: true,
    };
    setEntities((prev) => [...prev, newEntity]);
    setSubmitSuccess(true);
    setForm({ name: "", type: "", city: "", year: "", desc: "", focus: "", activity: "نشط", partnership: "متوسطة", instagram: "", tagInput: "", tags: [] });
    setTimeout(() => setSubmitSuccess(false), 5000);
  }

  function addTag() {
    if (form.tagInput.trim()) {
      setForm((f) => ({ ...f, tags: [...f.tags, f.tagInput.trim()], tagInput: "" }));
    }
  }

  const inputStyle: React.CSSProperties = {
    border: `1px solid ${C.border}`, borderRadius: "6px", padding: "0.7rem 0.875rem",
    fontFamily: fontBase, fontSize: "0.875rem", background: "rgba(255,255,255,0.04)",
    color: C.white, outline: "none", width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.78rem", fontWeight: 700, color: C.muted,
    textTransform: "uppercase" as const, letterSpacing: "0.08em",
    display: "block", marginBottom: "0.4rem",
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: fontBase, direction: "rtl" }}>
      <Navbar />

      {/* Page Header */}
      <section style={{ background: "#0a0a0a", paddingTop: "120px", paddingBottom: "60px", borderBottom: `1px solid ${C.border}` }}>
        <div className="container">
          <p style={{ color: C.gold, fontSize: "0.75rem", letterSpacing: "0.3em", marginBottom: "0.75rem", fontFamily: fontBase, textTransform: "uppercase" }}>
            الدليل الإبداعي
          </p>
          <h1 style={{ fontFamily: fontBase, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: C.white, lineHeight: 1.2, marginBottom: "0.75rem" }}>
            دليل سُرّة
          </h1>
          <p style={{ color: C.muted, fontSize: "1rem", maxWidth: "500px", lineHeight: 1.7 }}>
            أشمل دليل للمشهد الإبداعي والثقافي السعودي
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div style={{ background: "#111111", borderBottom: `1px solid ${C.border}`, position: "sticky", top: "64px", zIndex: 40 }}>
        <div className="container" style={{ display: "flex", gap: "0" }}>
          {[
            { key: "dashboard", label: "لوحة المؤشرات" },
            { key: "directory", label: "الدليل" },
            { key: "submit", label: "سجّل جهتك" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              style={{
                background: "transparent", border: "none",
                borderBottom: tab === t.key ? `2px solid ${C.gold}` : "2px solid transparent",
                color: tab === t.key ? C.gold : C.muted,
                fontFamily: fontBase, fontSize: "0.9rem",
                fontWeight: tab === t.key ? 700 : 400,
                padding: "1rem 1.5rem", cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>

        {/* ── DASHBOARD TAB ── */}
        {tab === "dashboard" && (
          <div>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { num: stats.total, label: "إجمالي الجهات المسجلة", accent: C.gold },
                { num: stats.cities, label: "مدينة مغطاة", accent: "#8a7560" },
                { num: stats.highPartnership, label: "فرصة شراكة عالية", accent: "#3a5a8c" },
                { num: stats.veryActive, label: "جهة نشطة جداً", accent: "#5a7a5c" },
              ].map((s, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.5rem", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, right: 0, left: 0, height: "2px", background: s.accent }} />
                  <div style={{ fontFamily: fontBase, fontSize: "2.75rem", fontWeight: 900, color: C.white, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: "0.78rem", color: C.muted, marginTop: "0.5rem", lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.5rem" }}>
                <div style={{ fontFamily: fontBase, fontWeight: 800, fontSize: "0.85rem", marginBottom: "1.25rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>توزيع الجهات حسب النوع</div>
                {typeDistribution.map(([type, count], i) => {
                  const pct = Math.round((count / stats.total) * 100);
                  return (
                    <div key={type} style={{ marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "0.35rem" }}>
                        <span style={{ color: C.white }}>{type}</span>
                        <span style={{ fontWeight: 700, color: chartColors[i] }}>{count}</span>
                      </div>
                      <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" }}>
                        <div style={{ height: "4px", width: `${pct}%`, background: chartColors[i], borderRadius: "2px", transition: "width 0.6s" }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.5rem" }}>
                <div style={{ fontFamily: fontBase, fontWeight: 800, fontSize: "0.85rem", marginBottom: "1.25rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>توزيع حسب المدينة</div>
                {cityDistribution.map(([city, count]) => {
                  const pct = Math.round((count / stats.total) * 100);
                  return (
                    <div key={city} style={{ marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "0.35rem" }}>
                        <span style={{ color: C.white }}>{city}</span>
                        <span style={{ fontWeight: 700, color: C.gold }}>{count}</span>
                      </div>
                      <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" }}>
                        <div style={{ height: "4px", width: `${pct}%`, background: C.gold, borderRadius: "2px" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.5rem" }}>
              <div style={{ fontFamily: fontBase, fontWeight: 800, fontSize: "0.85rem", marginBottom: "1.25rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>آخر الجهات المضافة</div>
              {[...entities].slice(-4).reverse().map((e) => (
                <div key={e.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 0", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "6px", background: "rgba(196,98,45,0.1)", border: `1px solid rgba(196,98,45,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: fontBase, fontSize: "0.7rem", fontWeight: 700, color: C.gold }}>{e.type.slice(0, 2)}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.87rem", color: C.white }}>{e.name}</div>
                    <div style={{ fontSize: "0.73rem", color: C.muted, marginTop: "0.15rem" }}>{e.type} · {e.city}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: activityColor(e.activity) }} />
                    <span style={{ fontSize: "0.72rem", color: C.muted }}>{e.activity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DIRECTORY TAB ── */}
        {tab === "directory" && (
          <div>
            {/* Filters */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1rem 1.25rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
              <input
                type="text"
                placeholder="ابحث عن جهة، مجال، أو مدينة..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ ...inputStyle, flex: 1, minWidth: "200px" }}
              />
              {[
                { value: filterType, onChange: setFilterType, options: ["", "مجتمع", "مساحة إبداعية", "جمعية", "مقهى ثقافي", "مبادرة"], labels: ["كل الأنواع", "مجتمع", "مساحة إبداعية", "جمعية", "مقهى ثقافي", "مبادرة"] },
                { value: filterCity, onChange: setFilterCity, options: ["", "الرياض", "جدة", "الدمام", "العلا", "أبها"], labels: ["كل المدن", "الرياض", "جدة", "الدمام", "العلا", "أبها"] },
                { value: filterActivity, onChange: setFilterActivity, options: ["", "نشط جداً", "نشط", "متوسط"], labels: ["كل الحالات", "نشط جداً", "نشط", "متوسط"] },
              ].map((sel, i) => (
                <select
                  key={i}
                  value={sel.value}
                  onChange={(e) => sel.onChange(e.target.value)}
                  style={{ ...inputStyle, width: "auto", minWidth: "120px" }}
                >
                  {sel.options.map((o, j) => <option key={o} value={o} style={{ background: "#111" }}>{sel.labels[j]}</option>)}
                </select>
              ))}
              <button
                onClick={() => setTab("submit")}
                style={{ background: C.gold, color: C.white, border: "none", borderRadius: "6px", padding: "0.65rem 1.25rem", fontFamily: fontBase, fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.goldHover; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.gold; }}
              >
                إضافة جهة
              </button>
            </div>

            {/* View Toggle */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {[{ key: "grid", label: "بطاقات" }, { key: "table", label: "جدول" }].map((v) => (
                <button
                  key={v.key}
                  onClick={() => setViewMode(v.key as any)}
                  style={{
                    background: viewMode === v.key ? C.gold : "transparent",
                    border: `1px solid ${viewMode === v.key ? C.gold : C.border}`,
                    borderRadius: "6px", padding: "0.45rem 1.25rem",
                    fontFamily: fontBase, fontSize: "0.82rem", fontWeight: 600,
                    cursor: "pointer", color: viewMode === v.key ? C.white : C.muted,
                    transition: "all 0.15s",
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {/* Grid View */}
            {viewMode === "grid" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                {filtered.length === 0 ? (
                  <div style={{ gridColumn: "span 3", textAlign: "center", padding: "5rem 2rem", color: C.muted }}>
                    <p style={{ fontFamily: fontBase, fontSize: "1.1rem", color: C.white, marginBottom: "0.5rem" }}>لا توجد نتائج</p>
                    <p style={{ fontSize: "0.85rem" }}>جرّب تغيير معايير البحث</p>
                  </div>
                ) : filtered.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => setSelectedEntity(e)}
                    style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "1.5rem", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden", borderRight: `3px solid ${C.gold}` }}
                    onMouseEnter={(el) => { (el.currentTarget as HTMLElement).style.borderColor = C.gold; (el.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(el) => { (el.currentTarget as HTMLElement).style.borderColor = C.border; (el.currentTarget as HTMLElement).style.borderRightColor = C.gold; (el.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                  >
                    {e.isNew && (
                      <span style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: C.gold, color: "white", fontSize: "0.62rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "3px", letterSpacing: "0.05em" }}>جديد</span>
                    )}
                    <div style={{ marginBottom: "0.875rem" }}>
                      <div style={{ fontFamily: fontBase, fontSize: "1rem", fontWeight: 700, color: C.white, lineHeight: 1.3, marginBottom: "0.35rem" }}>{e.name}</div>
                      <span style={{ display: "inline-block", padding: "0.18rem 0.6rem", borderRadius: "3px", fontSize: "0.68rem", fontWeight: 600, border: `1px solid rgba(196,98,45,0.4)`, color: C.gold }}>{e.type}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: C.muted, marginBottom: "0.5rem" }}>{e.city}{e.year ? ` · ${e.year}` : ""}</div>
                    <div style={{ fontSize: "0.8rem", color: C.muted, lineHeight: 1.6, marginBottom: "0.875rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{e.desc}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.875rem" }}>
                      {e.tags.slice(0, 3).map((t) => (
                        <span key={t} style={{ background: "rgba(196,98,45,0.08)", color: C.gold, fontSize: "0.65rem", fontWeight: 600, padding: "0.18rem 0.5rem", borderRadius: "3px" }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: `1px solid ${C.border}` }}>
                      <span style={{ fontSize: "0.72rem", color: C.muted, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: activityColor(e.activity), display: "inline-block" }} />
                        {e.activity}
                      </span>
                      <button style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: "4px", padding: "0.25rem 0.6rem", fontSize: "0.72rem", color: C.muted, cursor: "pointer", fontFamily: fontBase }}>
                        التفاصيل
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Table View */}
            {viewMode === "table" && (
              <div style={{ overflowX: "auto", borderRadius: "8px", border: `1px solid ${C.border}` }}>
                <table style={{ width: "100%", borderCollapse: "collapse", background: C.card }}>
                  <thead style={{ background: "#0d0d0d" }}>
                    <tr>
                      {["الاسم", "النوع", "المدينة", "التخصص", "الحالة", "فرصة الشراكة", ""].map((h) => (
                        <th key={h} style={{ padding: "0.875rem 1rem", textAlign: "right", fontSize: "0.72rem", fontWeight: 700, color: C.muted, whiteSpace: "nowrap", fontFamily: fontBase, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((e) => (
                      <tr key={e.id} style={{ borderBottom: `1px solid ${C.border}`, cursor: "pointer" }} onClick={() => setSelectedEntity(e)}>
                        <td style={{ padding: "0.875rem 1rem", fontSize: "0.85rem", color: C.white, fontWeight: 700 }}>{e.name}</td>
                        <td style={{ padding: "0.875rem 1rem" }}><span style={{ border: `1px solid rgba(196,98,45,0.4)`, color: C.gold, fontSize: "0.68rem", fontWeight: 600, padding: "0.18rem 0.6rem", borderRadius: "3px" }}>{e.type}</span></td>
                        <td style={{ padding: "0.875rem 1rem", fontSize: "0.82rem", color: C.muted }}>{e.city}</td>
                        <td style={{ padding: "0.875rem 1rem", fontSize: "0.8rem", color: C.muted }}>{e.focus}</td>
                        <td style={{ padding: "0.875rem 1rem" }}><span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: C.muted }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: activityColor(e.activity), display: "inline-block" }} />{e.activity}</span></td>
                        <td style={{ padding: "0.875rem 1rem", fontSize: "0.82rem", fontWeight: 700, color: partnershipColor(e.partnership) }}>{e.partnership}</td>
                        <td style={{ padding: "0.875rem 1rem" }}><button style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: "4px", padding: "0.25rem 0.6rem", fontSize: "0.72rem", color: C.muted, cursor: "pointer", fontFamily: fontBase }}>عرض</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── SUBMIT TAB ── */}
        {tab === "submit" && (
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: `1px solid ${C.border}` }}>
              <p style={{ color: C.gold, fontSize: "0.75rem", letterSpacing: "0.3em", marginBottom: "0.75rem", textTransform: "uppercase" }}>الانضمام للدليل</p>
              <h1 style={{ fontFamily: fontBase, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: C.white, marginBottom: "0.75rem" }}>
                سجّل جهتك في <span style={{ color: C.gold }}>دليل سُرّة</span>
              </h1>
              <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.7 }}>
                انضم إلى أكبر دليل للمشهد الإبداعي السعودي وكن جزءاً من شبكة الحراك الثقافي الوطني
              </p>
            </div>

            {submitSuccess && (
              <div style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: "6px", padding: "1rem 1.25rem", fontSize: "0.875rem", color: "#a5d6a7", marginBottom: "1.5rem", fontWeight: 600 }}>
                تم استلام طلب التسجيل بنجاح — سيتم مراجعته والتواصل معك خلال 48 ساعة.
              </div>
            )}

            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>

                {/* Section label */}
                <div style={{ gridColumn: "span 2", paddingBottom: "0.5rem", borderBottom: `1px solid ${C.border}`, marginBottom: "0.25rem" }}>
                  <span style={{ fontFamily: fontBase, fontSize: "0.75rem", fontWeight: 700, color: C.gold, textTransform: "uppercase", letterSpacing: "0.15em" }}>معلومات الجهة الأساسية</span>
                </div>

                {[
                  { label: "اسم الجهة", key: "name", placeholder: "مثال: مجتمع سرة", span: false },
                  { label: "سنة التأسيس", key: "year", placeholder: "مثال: 2018", span: false },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={labelStyle}>{f.label}</label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={(form as any)[f.key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                ))}

                {[
                  { label: "نوع الجهة", key: "type", options: ["", "مجتمع", "مساحة إبداعية", "جمعية", "مقهى ثقافي", "مبادرة", "استوديو", "مؤسسة داعمة"] },
                  { label: "المدينة", key: "city", options: ["", "الرياض", "جدة", "الدمام", "العلا", "أبها", "المدينة المنورة", "تبوك", "الطائف", "الأحساء"] },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={labelStyle}>{f.label}</label>
                    <select
                      value={(form as any)[f.key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                      style={{ ...inputStyle, background: "#0d0d0d" }}
                    >
                      {f.options.map((o) => <option key={o} value={o} style={{ background: "#111" }}>{o || "اختر..."}</option>)}
                    </select>
                  </div>
                ))}

                <div style={{ gridColumn: "span 2" }}>
                  <label style={labelStyle}>وصف مختصر</label>
                  <textarea
                    placeholder="اكتب وصفاً مختصراً عن جهتك، رسالتها، وأبرز أنشطتها..."
                    value={form.desc}
                    onChange={(e) => setForm((prev) => ({ ...prev, desc: e.target.value }))}
                    style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }}
                  />
                </div>

                {/* Section label */}
                <div style={{ gridColumn: "span 2", paddingBottom: "0.5rem", borderBottom: `1px solid ${C.border}`, marginTop: "0.5rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontFamily: fontBase, fontSize: "0.75rem", fontWeight: 700, color: C.gold, textTransform: "uppercase", letterSpacing: "0.15em" }}>التخصص والمجال</span>
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={labelStyle}>مجال التركيز الرئيسي</label>
                  <input
                    type="text"
                    placeholder="مثال: فنون بصرية وسينما"
                    value={form.focus}
                    onChange={(e) => setForm((prev) => ({ ...prev, focus: e.target.value }))}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>مستوى النشاط</label>
                  <select value={form.activity} onChange={(e) => setForm((prev) => ({ ...prev, activity: e.target.value }))} style={{ ...inputStyle, background: "#0d0d0d" }}>
                    {["نشط جداً", "نشط", "متوسط", "موقف مؤقتاً"].map((o) => <option key={o} value={o} style={{ background: "#111" }}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>إنستغرام</label>
                  <input
                    type="text"
                    placeholder="@handle"
                    value={form.instagram}
                    onChange={(e) => setForm((prev) => ({ ...prev, instagram: e.target.value }))}
                    style={inputStyle}
                  />
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={labelStyle}>الوسوم</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      type="text"
                      placeholder="مثال: #إبداعي — اضغط Enter للإضافة"
                      value={form.tagInput}
                      onChange={(e) => setForm((prev) => ({ ...prev, tagInput: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button onClick={addTag} style={{ background: "rgba(196,98,45,0.15)", color: C.gold, border: `1px solid rgba(196,98,45,0.3)`, borderRadius: "6px", padding: "0 1rem", cursor: "pointer", fontFamily: fontBase, fontSize: "1rem" }}>+</button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.5rem" }}>
                    {form.tags.map((t) => (
                      <span key={t} onClick={() => setForm((prev) => ({ ...prev, tags: prev.tags.filter((x) => x !== t) }))} style={{ background: "rgba(196,98,45,0.1)", color: C.gold, fontSize: "0.72rem", fontWeight: 600, padding: "0.22rem 0.6rem", borderRadius: "3px", cursor: "pointer" }}>
                        {t} ✕
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                style={{ background: C.gold, color: "white", border: "none", borderRadius: "6px", padding: "0.875rem 2rem", fontFamily: fontBase, fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", width: "100%", marginTop: "1.75rem", transition: "background 0.2s", letterSpacing: "0.05em" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.goldHover; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.gold; }}
              >
                إضافة للدليل
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEntity && (
        <div
          onClick={() => setSelectedEntity(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(6px)" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#111111", borderRadius: "10px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", padding: "2rem", position: "relative", border: `1px solid ${C.border}`, borderRight: `3px solid ${C.gold}` }}
          >
            <button onClick={() => setSelectedEntity(null)} style={{ position: "absolute", top: "1rem", left: "1rem", width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", fontSize: "0.9rem", color: C.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

            <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: `1px solid ${C.border}` }}>
              <p style={{ color: C.gold, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{selectedEntity.type}</p>
              <h2 style={{ fontFamily: fontBase, fontSize: "1.4rem", fontWeight: 800, color: C.white }}>{selectedEntity.name}</h2>
              <p style={{ fontSize: "0.82rem", color: C.muted, marginTop: "0.25rem" }}>{selectedEntity.city}{selectedEntity.year ? ` · تأسست ${selectedEntity.year}` : ""}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
              {[
                { label: "مستوى النشاط", value: selectedEntity.activity },
                { label: "فرصة الشراكة", value: selectedEntity.partnership },
                { label: "التخصص", value: selectedEntity.focus },
                { label: "إنستغرام", value: selectedEntity.instagram },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ fontSize: "0.68rem", fontWeight: 700, color: C.mutedDark, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.25rem" }}>{f.label}</label>
                  <span style={{ fontSize: "0.87rem", color: C.white, fontWeight: 500 }}>{f.value}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "0.87rem", color: C.muted, lineHeight: 1.8, marginBottom: "1.25rem" }}>{selectedEntity.desc}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {selectedEntity.tags.map((t) => (
                <span key={t} style={{ background: "rgba(196,98,45,0.08)", color: C.gold, fontSize: "0.72rem", fontWeight: 600, padding: "0.22rem 0.6rem", borderRadius: "3px", border: `1px solid rgba(196,98,45,0.2)` }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
