/*
 * دليل سُرّة — Creative Directory Page
 * Design: Hero with Riyadh night cityscape, category tabs, search + filter bar
 * Inspired by saudistudios.com layout
 */
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const fontBase = "'ManchetteFine', 'Tajawal', sans-serif";
// Surra brand identity
const GOLD = "#C4622D";       // Surra orange-brown accent
const GOLD_HOVER = "#a84f25";
const BG = "#0a0a0a";          // Deep black background
const CARD = "#111111";        // Card background
const CARD_BORDER = "rgba(196,98,45,0.12)"; // Subtle orange border
const BORDER = "rgba(255,255,255,0.08)";
const MUTED = "rgba(255,255,255,0.5)";
const MUTED_DARK = "rgba(255,255,255,0.25)";
const ACTIVE = "#4caf50";
const MODERATE = "#ff9800";

interface Entity {
  id: number;
  name: string;
  category: string; // شركات | منصات | مساحات | متاجر
  type: string;
  city: string;
  focus: string;
  desc: string;
  tags: string[];
  activity: string;
  instagram: string;
  linkedin?: string;
  twitter?: string;
  partnership: string;
  year: number;
  isNew: boolean;
  logo?: string;
}

const initialEntities: Entity[] = [
  { id: 1, name: "حي جميل", category: "المساحات الإبداعية", type: "مساحة إبداعية", city: "جدة", focus: "فنون بصرية وسينما", desc: "مجمع إبداعي متكامل بمساحة 17,000م² يضم 12 منظمة شريكة، استوديوهات، مسرح، وأول دار سينما مستقلة في المملكة.", tags: ["#فنون", "#سينما", "#ريادة", "#جدة"], activity: "نشط جداً", instagram: "@artjameel", partnership: "عالية", year: 2021, isNew: false, logo: "/manus-storage/art_jameel_9a51f5c0.svg" },
  { id: 2, name: "الجمعية العربية السعودية للثقافة والفنون", category: "المجتمعات الثقافية", type: "جمعية", city: "الرياض", focus: "مسرح وموسيقى وفنون بصرية", desc: "الكيان الرائد في خدمة الحراك الثقافي منذ 1973، تمتد عبر 16 فرعاً في المملكة مع أكثر من 11,000 عضو.", tags: ["#مسرح", "#موسيقى", "#فنون_بصرية", "#وطني"], activity: "نشط جداً", instagram: "@sasca_sa", partnership: "عالية", year: 1973, isNew: false, logo: "/manus-storage/sasca_465a651d.png" },
  { id: 3, name: "جاكس — منطقة الدرعية الثقافية", category: "المساحات الإبداعية", type: "مساحة إبداعية", city: "الرياض", focus: "تصوير وتصميم وفنون معاصرة", desc: "حي ثقافي في قلب الدرعية يستضيف معارض وورشات في التصوير الفوتوغرافي، النحت، والتصميم الغرافيكي.", tags: ["#درعية", "#تصميم", "#تراث", "#معاصر"], activity: "نشط جداً", instagram: "@diriyahgate", partnership: "عالية", year: 2022, isNew: false, logo: "/manus-storage/jaxs_6397f8f0.svg" },
  { id: 4, name: "بلد الفن", category: "المبادرات المستقلة", type: "مبادرة", city: "جدة", focus: "فنون بصرية وتراث محلي", desc: "مبادرة وزارة الثقافة التي تحوّل جدة التاريخية إلى مركز إبداعي ثقافي بمعارض تعكس التراث بأساليب عصرية.", tags: ["#جدة_التاريخية", "#تراث", "#فنون", "#وزارة_الثقافة"], activity: "نشط", instagram: "@ministryofculture", partnership: "عالية", year: 2024, isNew: false, logo: "" },
  { id: 5, name: "مركز إثراء", category: "الجهات الداعمة", type: "مساحة إبداعية", city: "الدمام", focus: "ثقافة وفنون ومعرفة", desc: "مركز إثراء للمعرفة والفنون والثقافة في الظهران، يضم متحفاً ومسرحاً وحاضنة أعمال إبداعية.", tags: ["#إثراء", "#أرامكو", "#معرفة", "#شرقية"], activity: "نشط جداً", instagram: "@ithra", partnership: "عالية", year: 2018, isNew: false, logo: "/manus-storage/ithra_aed80674.png" },
  { id: 6, name: "فنون العلا", category: "الفعاليات المتكررة", type: "مبادرة", city: "العلا", focus: "فنون معاصرة وتراث صحراوي", desc: "مهرجان فنون عالمي في العلا يجمع الفنانين المحليين والدوليين وسط التضاريس الصحراوية الساحرة.", tags: ["#العلا", "#فنون_عالمية", "#صحراء", "#سياحة"], activity: "نشط", instagram: "@experiencealula", partnership: "متوسطة", year: 2020, isNew: false, logo: "/manus-storage/alula_e4847c23.svg" },
  { id: 7, name: "النادي الأدبي الثقافي جدة", category: "النوادي الأدبية", type: "جمعية", city: "جدة", focus: "أدب وشعر وخط عربي", desc: "نادٍ أدبي ثقافي يقدم ورشات في الخط العربي والشعر، ويحتضن منتدى الفنون البصرية.", tags: ["#أدب", "#خط_عربي", "#شعر", "#جدة"], activity: "نشط", instagram: "@jeddahliterary", partnership: "متوسطة", year: 1975, isNew: false, logo: "/manus-storage/jeddah_literary_8f5aea33.jpg" },
  { id: 8, name: "مبادرة الشريك الأدبي", category: "المبادرات المستقلة", type: "مبادرة", city: "الرياض", focus: "أدب ومقاهٍ ثقافية", desc: "مبادرة وزارة الثقافة لتحويل 80 مقهى في 12 منطقة إدارية إلى مساحات إبداعية وأدبية.", tags: ["#مقاهي", "#أدب", "#وزارة_الثقافة", "#وطني"], activity: "نشط جداً", instagram: "@ministryofculture", partnership: "عالية", year: 2023, isNew: false, logo: "" },
  { id: 9, name: "مجتمع سرة", category: "المجتمعات الثقافية", type: "مجتمع", city: "الرياض", focus: "اقتصاد إبداعي وحراك ثقافي", desc: "منظومة متكاملة تغير مفاهيم الحراك الثقافي وتستثمر في الاقتصاد الإبداعي السعودي عبر بناء مجتمعات فنية حية.", tags: ["#سرة", "#اقتصاد_إبداعي", "#مجتمع", "#ريادة"], activity: "نشط جداً", instagram: "@surrah_community", partnership: "عالية", year: 2022, isNew: true, logo: "/manus-storage/surrah_d12afd51.svg" },
  { id: 10, name: "ستوديو بيان", category: "استوديوهات الفن", type: "استوديو", city: "الرياض", focus: "تصميم جرافيك وهوية بصرية", desc: "استوديو تصميم متخصص في الهوية البصرية والتصميم الجرافيكي للعلامات التجارية الإبداعية.", tags: ["#تصميم", "#هوية_بصرية", "#جرافيك"], activity: "نشط", instagram: "@bayan_studio", partnership: "متوسطة", year: 2020, isNew: false, logo: "" },
  { id: 11, name: "متجر الفنون السعودية", category: "المعارض الصغيرة", type: "متجر", city: "جدة", focus: "بيع الأعمال الفنية المحلية", desc: "منصة تجارية لبيع الأعمال الفنية السعودية الأصيلة من لوحات وتماثيل ومنتجات إبداعية.", tags: ["#فنون", "#تجارة_إبداعية", "#جدة"], activity: "نشط", instagram: "@saudiartstore", partnership: "متوسطة", year: 2021, isNew: true, logo: "/manus-storage/saudi_art_store_62f9bfa9.png" },
];

const CATEGORIES = [
  { key: "الكل", label: "الكل" },
  { key: "المجتمعات الثقافية", label: "المجتمعات الثقافية" },
  { key: "المساحات الإبداعية", label: "المساحات الإبداعية" },
  { key: "المقاهي الثقافية", label: "المقاهي الثقافية" },
  { key: "النوادي الأدبية", label: "النوادي الأدبية" },
  { key: "المبادرات المستقلة", label: "المبادرات المستقلة" },
  { key: "المعارض الصغيرة", label: "المعارض الصغيرة" },
  { key: "استوديوهات الفن", label: "استوديوهات الفن" },
  { key: "المكتبات المجتمعية", label: "المكتبات المجتمعية" },
  { key: "مساحات العمل الإبداعي", label: "مساحات العمل الإبداعي" },
  { key: "الفعاليات المتكررة", label: "الفعاليات المتكررة" },
  { key: "الجهات الداعمة", label: "الجهات الداعمة" },
];

const CITIES = ["", "الرياض", "جدة", "الدمام", "العلا", "أبها", "المدينة المنورة", "تبوك", "الطائف", "الأحساء"];
const TYPES = ["", "المجتمعات الثقافية", "المساحات الإبداعية", "المقاهي الثقافية", "النوادي الأدبية", "المبادرات المستقلة", "المعارض الصغيرة", "استوديوهات الفن", "المكتبات المجتمعية", "مساحات العمل الإبداعي", "الفعاليات المتكررة", "الجهات الداعمة"];

function activityColor(a: string) {
  if (a === "نشط جداً") return ACTIVE;
  if (a === "نشط") return MODERATE;
  return "#666";
}

const inputStyle: React.CSSProperties = {
  border: "none",
  borderRight: `1px solid ${BORDER}`,
  padding: "0 1.5rem",
  fontFamily: fontBase,
  fontSize: "0.95rem",
  background: "transparent",
  color: "#111",
  outline: "none",
  width: "100%",
  height: "100%",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.78rem",
  fontWeight: 700,
  color: MUTED,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  display: "block",
  marginBottom: "0.4rem",
};

const formInputStyle: React.CSSProperties = {
  border: `1px solid ${BORDER}`,
  borderRadius: "6px",
  padding: "0.7rem 0.875rem",
  fontFamily: fontBase,
  fontSize: "0.875rem",
  background: "rgba(255,255,255,0.04)",
  color: "var(--surrah-text-primary)",
  outline: "none",
  width: "100%",
};

export default function Directory() {
  const { dir } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState("");
  const [tab, setTab] = useState<"directory" | "submit">("directory");
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "", type: "", city: "", year: "", desc: "", focus: "",
    activity: "نشط", partnership: "متوسطة", instagram: "", linkedin: "", twitter: "",
    contactName: "", contactRole: "", contactPhone: "", contactEmail: "",
    tagInput: "", tags: [] as string[], logo: "",
  });

  const filtered = useMemo(() => {
    return initialEntities.filter((e) => {
      const q = search.toLowerCase();
      const matchSearch = !q || e.name.includes(q) || e.city.includes(q) || e.focus.includes(q) || e.desc.includes(q);
      const matchCat = activeCategory === "الكل" || e.category === activeCategory;
      return matchSearch && matchCat && (!filterCity || e.city === filterCity) && (!filterType || e.type === filterType);
    });
  }, [search, activeCategory, filterCity, filterType]);

  function handleSubmit() {
    if (!form.name || !form.type || !form.city || !form.desc) return;
    setSubmitSuccess(true);
    setForm({ name: "", type: "", city: "", year: "", desc: "", focus: "", activity: "نشط", partnership: "متوسطة", instagram: "", linkedin: "", twitter: "", contactName: "", contactRole: "", contactPhone: "", contactEmail: "", tagInput: "", tags: [], logo: "" });
    setTimeout(() => setSubmitSuccess(false), 5000);
  }

  function addTag() {
    if (form.tagInput.trim()) {
      setForm((f) => ({ ...f, tags: [...f.tags, f.tagInput.trim()], tagInput: "" }));
    }
  }

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: fontBase, direction: dir }}>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section
        style={{
          position: "relative",
          minHeight: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          paddingTop: "60px",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/manus-storage/riyadh-night-hero_a07c9d0a.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            filter: "brightness(0.45)",
            zIndex: 0,
          }}
        />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)", zIndex: 1 }} />

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "3rem 1rem 2rem" }}>
          <h1 style={{ fontFamily: fontBase, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "var(--surrah-text-primary)", marginBottom: "0.75rem", lineHeight: 1.2 }}>
            دليل الجهات الثقافية السعودية
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.02em" }}>
            A Directory of Saudi Cultural Entities
          </p>
        </div>

        {/* ── SEARCH BAR ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "900px",
            margin: "0 1rem",
            background: "#ffffff",
            borderRadius: "0",
            display: "flex",
            alignItems: "stretch",
            height: "60px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* Search button */}
          <button
            style={{
              flexShrink: 0,
              width: "180px",
              background: GOLD,
              color: "var(--surrah-text-primary)",
              border: "none",
              fontFamily: fontBase,
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = GOLD_HOVER; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = GOLD; }}
          >
            بحث
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* City filter */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", borderRight: `1px solid rgba(0,0,0,0.1)` }}>
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              style={{ ...inputStyle, color: filterCity ? "#111" : "#888", appearance: "none", cursor: "pointer" }}
            >
              <option value="">المدينة</option>
              {CITIES.filter(Boolean).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Type filter */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", borderRight: `1px solid rgba(0,0,0,0.1)` }}>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ ...inputStyle, color: filterType ? "#111" : "#888", appearance: "none", cursor: "pointer" }}
            >
              <option value="">التصنيف</option>
              {TYPES.filter(Boolean).map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Text search */}
          <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="ابحث عن جهة، مدينة، أو تخصص..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...inputStyle, borderRight: "none", fontSize: "0.95rem" }}
            />
          </div>
        </div>

        {/* Bottom padding */}
        <div style={{ height: "2rem" }} />
      </section>

      {/* ── PAGE TABS (directory / submit) ── */}
      <div style={{ background: "#0d0d0d", borderBottom: `1px solid rgba(196,98,45,0.15)`, position: "sticky", top: "0", zIndex: 40 }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            {[
              { key: "directory", label: "الدليل" },
              { key: "submit", label: "سجّل جهتك" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as any)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: tab === t.key ? `2px solid ${GOLD}` : "2px solid transparent",
                  color: tab === t.key ? GOLD : MUTED,
                  fontFamily: fontBase,
                  fontSize: "0.9rem",
                  fontWeight: tab === t.key ? 700 : 400,
                  padding: "1rem 1.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <span style={{ fontSize: "0.8rem", color: MUTED_DARK, fontFamily: fontBase }}>
            {filtered.length} جهة مسجلة
          </span>
        </div>
      </div>

      {/* ── DIRECTORY TAB ── */}
      {tab === "directory" && (
        <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 0", color: MUTED }}>
              <p style={{ fontSize: "1.1rem", fontFamily: fontBase }}>لا توجد نتائج مطابقة للبحث</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {filtered.map((e) => (
                <div
                  key={e.id}
                  onClick={() => setSelectedEntity(e)}
                  style={{
                    background: "linear-gradient(145deg, #141414 0%, #0f0f0f 100%)",
                    border: `1px solid ${CARD_BORDER}`,
                    borderRadius: "14px",
                    padding: "1.5rem",
                    cursor: "pointer",
                    transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
                    position: "relative",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(196,98,45,0.18)`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = CARD_BORDER; (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.4)"; }}
                >
                  {/* Logo or Initial */}
                  <div style={{ width: "56px", height: "56px", borderRadius: "12px", overflow: "hidden", marginBottom: "1rem", background: e.logo ? "rgba(255,255,255,0.06)" : `rgba(196,98,45,0.12)`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${e.logo ? BORDER : "rgba(196,98,45,0.25)"}`, flexShrink: 0 }}>
                    {e.logo ? (
                      <img src={e.logo} alt={e.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }} />
                    ) : (
                      <span style={{ fontFamily: fontBase, fontSize: "1.3rem", fontWeight: 800, color: GOLD }}>{e.name.charAt(0)}</span>
                    )}
                  </div>
                  {/* Category badge */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span style={{ background: "rgba(196,98,45,0.1)", color: GOLD, fontSize: "0.68rem", fontWeight: 700, padding: "0.22rem 0.7rem", border: `1px solid rgba(196,98,45,0.3)`, borderRadius: "4px" }}>
                      {e.category}
                    </span>
                    {e.isNew && (
                      <span style={{ background: "rgba(76,175,80,0.15)", color: ACTIVE, fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.5rem", border: `1px solid rgba(76,175,80,0.3)` }}>
                        جديد
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 style={{ fontFamily: fontBase, fontSize: "1.05rem", fontWeight: 800, color: "var(--surrah-text-primary)", marginBottom: "0.35rem", lineHeight: 1.4 }}>
                    {e.name}
                  </h3>

                  {/* City + Year */}
                  <p style={{ fontSize: "0.78rem", color: MUTED, marginBottom: "0.75rem" }}>
                    {e.city} · {e.focus}
                  </p>

                  {/* Desc */}
                  <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {e.desc}
                  </p>

                  {/* Footer */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.75rem", borderTop: `1px solid ${BORDER}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: activityColor(e.activity), display: "inline-block", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.75rem", color: MUTED }}>{e.activity}</span>
                    </div>
                    <span style={{ fontSize: "0.72rem", color: MUTED_DARK }}>{e.year}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── SUBMIT TAB ── */}
      {tab === "submit" && (
        <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: `1px solid ${BORDER}` }}>
              <p style={{ color: GOLD, fontSize: "0.75rem", marginBottom: "0.75rem", textTransform: "uppercase" }}>الانضمام للدليل</p>
              <h1 style={{ fontFamily: fontBase, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--surrah-text-primary)", marginBottom: "0.75rem" }}>
                سجّل جهتك في <span style={{ color: GOLD, whiteSpace: "nowrap" }}>دليل سُرّة</span>
              </h1>
              <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7 }}>
                انضم إلى أكبر دليل للمشهد الإبداعي السعودي وكن جزءاً من شبكة الحراك الثقافي الوطني
              </p>
            </div>

            {submitSuccess && (
              <div style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: "6px", padding: "1rem 1.25rem", fontSize: "0.875rem", color: "#a5d6a7", marginBottom: "1.5rem", fontWeight: 600 }}>
                تم استلام طلب التسجيل بنجاح — سيتم مراجعته والتواصل معك خلال 48 ساعة.
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              {/* معلومات الجهة الأساسية */}
              <div style={{ gridColumn: "span 2", paddingBottom: "0.5rem", borderBottom: `1px solid ${BORDER}`, marginBottom: "0.25rem" }}>
                <span style={{ fontFamily: fontBase, fontSize: "0.75rem", fontWeight: 700, color: GOLD, textTransform: "uppercase" }}>معلومات الجهة الأساسية</span>
              </div>
              {/* Logo Upload */}
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>شعار الجهة</label>
                <div
                  style={{ border: `2px dashed ${BORDER}`, borderRadius: "10px", padding: "1.5rem", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s", position: "relative", background: "rgba(255,255,255,0.02)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  {form.logo ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                      <img src={form.logo} alt="شعار" style={{ width: "60px", height: "60px", objectFit: "contain", borderRadius: "8px", background: "rgba(255,255,255,0.08)", padding: "4px" }} />
                      <div>
                        <p style={{ color: "var(--surrah-text-primary)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>تم رفع الشعار</p>
                        <button onClick={(ev) => { ev.stopPropagation(); setForm(p => ({ ...p, logo: "" })); }} style={{ background: "transparent", border: "none", color: MUTED, fontSize: "0.75rem", cursor: "pointer", textDecoration: "underline" }}>إزالة</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem", opacity: 0.4 }}>⊕</div>
                      <p style={{ color: MUTED, fontSize: "0.85rem", marginBottom: "0.25rem" }}>اضغط لرفع شعار الجهة</p>
                      <p style={{ color: MUTED_DARK, fontSize: "0.72rem" }}>PNG, JPG, SVG — حجم أقصى 2MB</p>
                    </div>
                  )}
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => setForm(p => ({ ...p, logo: ev.target?.result as string }));
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>
              {[
                { label: "اسم الجهة", key: "name", placeholder: "مثال: مجتمع سرة" },
                { label: "سنة التأسيس", key: "year", placeholder: "مثال: 2018" },
              ].map((f) => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <input type="text" placeholder={f.placeholder} value={(form as any)[f.key]} onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))} style={formInputStyle} />
                </div>
              ))}
              {[
                { label: "نوع الجهة", key: "type", options: ["", "مجتمع", "مساحة إبداعية", "جمعية", "مقهى ثقافي", "مبادرة", "استوديو", "مؤسسة داعمة", "متجر"] },
                { label: "المدينة", key: "city", options: CITIES },
              ].map((f) => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <select value={(form as any)[f.key]} onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))} style={{ ...formInputStyle, background: "#0d0d0d" }}>
                    {f.options.map((o) => <option key={o} value={o} style={{ background: "#111" }}>{o || "اختر..."}</option>)}
                  </select>
                </div>
              ))}
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>وصف مختصر</label>
                <textarea placeholder="اكتب وصفاً مختصراً عن جهتك، رسالتها، وأبرز أنشطتها..." value={form.desc} onChange={(e) => setForm((prev) => ({ ...prev, desc: e.target.value }))} style={{ ...formInputStyle, minHeight: "90px", resize: "vertical" }} />
              </div>

              {/* التخصص والمجال */}
              <div style={{ gridColumn: "span 2", paddingBottom: "0.5rem", borderBottom: `1px solid ${BORDER}`, marginTop: "0.5rem", marginBottom: "0.25rem" }}>
                <span style={{ fontFamily: fontBase, fontSize: "0.75rem", fontWeight: 700, color: GOLD, textTransform: "uppercase" }}>التخصص والمجال</span>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>مجال التركيز الرئيسي</label>
                <input type="text" placeholder="مثال: فنون بصرية وسينما" value={form.focus} onChange={(e) => setForm((prev) => ({ ...prev, focus: e.target.value }))} style={formInputStyle} />
              </div>
              <div>
                <label style={labelStyle}>مستوى النشاط</label>
                <select value={form.activity} onChange={(e) => setForm((prev) => ({ ...prev, activity: e.target.value }))} style={{ ...formInputStyle, background: "#0d0d0d" }}>
                  {["نشط جداً", "نشط", "متوسط", "موقف مؤقتاً"].map((o) => <option key={o} value={o} style={{ background: "#111" }}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>فرصة الشراكة</label>
                <select value={form.partnership} onChange={(e) => setForm((prev) => ({ ...prev, partnership: e.target.value }))} style={{ ...formInputStyle, background: "#0d0d0d" }}>
                  {["عالية", "متوسطة", "منخفضة"].map((o) => <option key={o} value={o} style={{ background: "#111" }}>{o}</option>)}
                </select>
              </div>

              {/* وسائل التواصل الاجتماعي */}
              <div style={{ gridColumn: "span 2", paddingBottom: "0.5rem", borderBottom: `1px solid ${BORDER}`, marginTop: "0.5rem", marginBottom: "0.25rem" }}>
                <span style={{ fontFamily: fontBase, fontSize: "0.75rem", fontWeight: 700, color: GOLD, textTransform: "uppercase" }}>وسائل التواصل الاجتماعي</span>
              </div>
              <div>
                <label style={labelStyle}>إنستغرام</label>
                <input type="text" placeholder="@handle" value={form.instagram} onChange={(e) => setForm((prev) => ({ ...prev, instagram: e.target.value }))} style={formInputStyle} />
              </div>
              <div>
                <label style={labelStyle}>إكس (تويتر)</label>
                <input type="text" placeholder="@handle" value={form.twitter} onChange={(e) => setForm((prev) => ({ ...prev, twitter: e.target.value }))} style={formInputStyle} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>لينكدإن</label>
                <input type="text" placeholder="linkedin.com/company/..." value={form.linkedin} onChange={(e) => setForm((prev) => ({ ...prev, linkedin: e.target.value }))} style={formInputStyle} />
              </div>

              {/* معلومات الموكل */}
              <div style={{ gridColumn: "span 2", paddingBottom: "0.5rem", borderBottom: `1px solid ${BORDER}`, marginTop: "0.5rem", marginBottom: "0.25rem" }}>
                <span style={{ fontFamily: fontBase, fontSize: "0.75rem", fontWeight: 700, color: GOLD, textTransform: "uppercase" }}>معلومات الموكل / جهة التواصل</span>
              </div>
              <div>
                <label style={labelStyle}>اسم الموكل</label>
                <input type="text" placeholder="الاسم الكامل" value={form.contactName} onChange={(e) => setForm((prev) => ({ ...prev, contactName: e.target.value }))} style={formInputStyle} />
              </div>
              <div>
                <label style={labelStyle}>المنصب / الدور</label>
                <input type="text" placeholder="مثال: مدير التسويق" value={form.contactRole} onChange={(e) => setForm((prev) => ({ ...prev, contactRole: e.target.value }))} style={formInputStyle} />
              </div>
              <div>
                <label style={labelStyle}>رقم الجوال</label>
                <input type="text" placeholder="+966 5X XXX XXXX" value={form.contactPhone} onChange={(e) => setForm((prev) => ({ ...prev, contactPhone: e.target.value }))} style={formInputStyle} />
              </div>
              <div>
                <label style={labelStyle}>البريد الإلكتروني</label>
                <input type="email" placeholder="email@example.com" value={form.contactEmail} onChange={(e) => setForm((prev) => ({ ...prev, contactEmail: e.target.value }))} style={formInputStyle} />
              </div>

              {/* الوسوم */}
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>الوسوم</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input type="text" placeholder="مثال: #إبداعي — اضغط Enter للإضافة" value={form.tagInput} onChange={(e) => setForm((prev) => ({ ...prev, tagInput: e.target.value }))} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} style={{ ...formInputStyle, flex: 1 }} />
                  <button onClick={addTag} style={{ background: "rgba(196,98,45,0.15)", color: GOLD, border: `1px solid rgba(196,98,45,0.3)`, borderRadius: "6px", padding: "0 1rem", cursor: "pointer", fontFamily: fontBase, fontSize: "1rem" }}>+</button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.5rem" }}>
                  {form.tags.map((t) => (
                    <span key={t} onClick={() => setForm((prev) => ({ ...prev, tags: prev.tags.filter((x) => x !== t) }))} style={{ background: "rgba(196,98,45,0.1)", color: GOLD, fontSize: "0.72rem", fontWeight: 600, padding: "0.22rem 0.6rem", borderRadius: "3px", cursor: "pointer" }}>
                      {t} ✕
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              style={{ background: GOLD, color: "white", border: "none", borderRadius: "0", padding: "0.875rem 2rem", fontFamily: fontBase, fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", width: "100%", marginTop: "1.75rem", transition: "background 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = GOLD_HOVER; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = GOLD; }}
            >
              إضافة للدليل
            </button>
          </div>
        </div>
      )}

      {/* ── DETAIL MODAL ── */}
      {selectedEntity && (
        <div onClick={() => setSelectedEntity(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(6px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--surrah-section-alt)", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", padding: "2rem", position: "relative", border: `1px solid ${BORDER}`, borderRight: `3px solid ${GOLD}` }}>
            <button onClick={() => setSelectedEntity(null)} style={{ position: "absolute", top: "1rem", left: "1rem", width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", fontSize: "0.9rem", color: MUTED, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: `1px solid ${BORDER}` }}>
              <p style={{ color: GOLD, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{selectedEntity.category} · {selectedEntity.type}</p>
              <h2 style={{ fontFamily: fontBase, fontSize: "1.4rem", fontWeight: 800, color: "var(--surrah-text-primary)" }}>{selectedEntity.name}</h2>
              <p style={{ fontSize: "0.82rem", color: MUTED, marginTop: "0.25rem" }}>{selectedEntity.city}{selectedEntity.year ? ` · تأسست ${selectedEntity.year}` : ""}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
              {[
                { label: "مستوى النشاط", value: selectedEntity.activity },
                { label: "فرصة الشراكة", value: selectedEntity.partnership },
                { label: "التخصص", value: selectedEntity.focus },
                { label: "إنستغرام", value: selectedEntity.instagram },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ fontSize: "0.68rem", fontWeight: 700, color: MUTED_DARK, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.25rem" }}>{f.label}</label>
                  <span style={{ fontSize: "0.87rem", color: "var(--surrah-text-primary)", fontWeight: 500 }}>{f.value}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.87rem", color: MUTED, lineHeight: 1.8, marginBottom: "1.25rem" }}>{selectedEntity.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {selectedEntity.tags.map((t) => (
                <span key={t} style={{ background: "rgba(196,98,45,0.08)", color: GOLD, fontSize: "0.72rem", fontWeight: 600, padding: "0.22rem 0.6rem", border: `1px solid rgba(196,98,45,0.2)` }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
