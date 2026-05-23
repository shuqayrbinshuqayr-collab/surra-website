/* ============================================================
   Media Center — المركز الإعلامي
   Design: Dark cinematic, Diriyah-inspired
   Sections: Hero | Latest News | Surra Identity PDFs | Brand Guidelines
   ============================================================ */

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const F = "'ManchetteFine', sans-serif";

// ─── News Data ────────────────────────────────────────────────────────────────
const newsItems = [
  {
    id: 0,
    date: "١٧ نوفمبر ٢٠٢٥",
    dateEn: "November 17, 2025",
    category: "فعاليات",
    categoryEn: "Events",
    title: "انطلاق أولى لقاءات «الكريتيفيتيز» من مجتمع بَصَر",
    titleEn: "Launch of the First 'Creativities' Gathering by Basar Community",
    excerpt: "أقام مجتمع بَصَر أولى لقاءات فعالية «الكريتيفيتيز» مساء يوم الاثنين ١٧ نوفمبر ٢٠٢٥ في بيتا د.كيف كافيه، بحضور نخبة من المهتمين بالفنون البصرية والتصميم والإبداع، ضمن أمسية جمعت الحوار والتجارب الملهمة وتبادل الخبرات بين المبدعين.",
    excerptEn: "Basar community held the first 'Creativities' gathering on Monday evening, November 17, 2025, at Beta D.Kafe, attended by a distinguished group of visual arts, design, and creativity enthusiasts in an evening of dialogue, inspiring experiences, and knowledge exchange.",
    body: `أقام مجتمع بَصَر – أحد مجتمعات سُرّة – أولى لقاءات فعالية «الكريتيفيتيز»، وذلك مساء يوم الاثنين 17 نوفمبر 2025 في بيتا د.كيف كافيه، بحضور نخبة من المهتمين بالفنون البصرية والتصميم والإبداع، ضمن أمسية جمعت الحوار، والتجارب الملهمة، وتبادل الخبرات بين المبدعين.\n\nويأتي لقاء «الكريتيفيتيز» كمساحة شهرية تهدف إلى بناء بيئة إبداعية حيّة تجمع العاملين والمهتمين بمجالات التصميم، والتصوير، والإخراج الإبداعي، وصناعة المحتوى البصري.\n\nوشهد اللقاء حضور عدد من الضيوف والمتحدثين البارزين:\n\n• حسان الأنصاري — المؤسس والرئيس التنفيذي لشركة حبار، والشريك المؤسس في مجموعة فوج.\n• عبدالعزيز العبيد — مصمم سيارات سعودي في FAIIIDA للتصميم والابتكار.\n• عبدالله بوقس — مبدع سعودي بخبرة تتجاوز 14 عاماً في التصميم والإعلانات والاتصال الإبداعي.\n\nوتخللت الأمسية جلسات حوارية مفتوحة ونقاشات مباشرة بين الضيوف والحضور، في أجواء عكست روح المجتمع الإبداعي.`,
    image: "/manus-storage/FAR_5921_0183f65f.webp",
    tag: "بصر",
    tagEn: "Basar",
    tagColor: "#C4622D",
  },
  {
    id: -2,
    date: "١٦ مايو ٢٠٢٦",
    dateEn: "May 16, 2026",
    category: "فعاليات",
    categoryEn: "Events",
    title: "«الكريتيفيتيز» في نسخته الثانية يجمع صُنّاع التجارب البصرية والإبداعية",
    titleEn: "'Creativities' Second Edition Brings Together Visual and Creative Experience Makers",
    excerpt: "أقام مجتمع بَصَر النسخة الثانية من «الكريتيفيتيز» مساء السبت ١٦ مايو ٢٠٢٦ في د.كيف بيتا، باستضافة عمار الصبان من شركة SEVEN، وماريا ميان من Mian Art، وفهد العتيبي منتجاً ومخرجاً.",
    excerptEn: "Basar community held the second edition of 'Creativities' on Saturday evening, May 16, 2026, at D.Kafe Beta, hosting Ammar Al-Sabban from SEVEN, Maria Mian from Mian Art, and Fahad Al-Otaibi as producer and director.",
    body: `أقام مجتمع بَصَر النسخة الثانية من فعالية «الكريتيفيتيز» مساء السبت 16 مايو 2026 في د.كيف بيتا، بحضور نخبة من المبدعين والمهتمين بالفنون البصرية وصناعة المحتوى والإنتاج الإبداعي.\n\nوشهد اللقاء استضافة ثلاثة متحدثين بارزين:\n\n• عمار الصبان — مدير عام تطوير وصناعة التجارب الترفيهية في شركة SEVEN، بخبرة تتجاوز 23 عاماً في الإنتاج الإبداعي وصناعة التجارب التفاعلية.\n• ماريا ميان — فنانة ومستشارة في استراتيجيات سوق الفن، وشريك مؤسس في Mian Art.\n• فهد العتيبي — منتج ومخرج بخبرة منذ 2014 في صناعة المحتوى البصري.\n\nوتخللت الأمسية جلسات حوارية مفتوحة ونقاشات مباشرة بين الضيوف والحضور، في أجواء عكست الحراك المتنامي الذي يشهده القطاع الإبداعي السعودي.`,
    image: "/manus-storage/creativities2_21fd4434.webp",
    tag: "بصر",
    tagEn: "Basar",
    tagColor: "#C4622D",
  },
  {
    id: -1,
    date: "٢٨ أبريل ٢٠٢٦",
    dateEn: "April 28, 2026",
    category: "فعاليات",
    categoryEn: "Events",
    title: "«ثلوثية بَصَر» تناقش مستقبل قطاع الأفلام في السعودية",
    titleEn: "'Basar Tuesdays' Discusses the Future of Saudi Film Industry",
    excerpt: "أقام مجتمع بَصَر لقاء «ثلوثية بَصَر» مساء الثلاثاء ٢٨ أبريل ٢٠٢٦ في آرت فيجن – مجمع الموسى، بعنوان «كيف نقرأ قطاع الأفلام في السعودية»، باستضافة المخرج والمنتج السعودي المهند الكدم.",
    excerptEn: "Basar community held its 'Basar Tuesdays' gathering on Tuesday evening, April 28, 2026, at Art Vision – Al Moussa Mall, under the theme 'How to Read the Saudi Film Sector', hosted by director and producer Mohannad Al-Kadam.",
    body: `أقام مجتمع بَصَر لقاء «ثلوثية بَصَر» في أمسية جمعت المهتمين بالفنون البصرية وصناعة المحتوى الإبداعي، وذلك مساء الثلاثاء 28 أبريل 2026 في آرت فيجن – مجمع الموسى.\n\nوجاء اللقاء بعنوان «كيف نقرأ قطاع الأفلام في السعودية»، حيث ناقش الحضور واقع القطاع السينمائي المحلي، والفرص المتنامية فيه، إضافة إلى التحديات والتحولات التي تشهدها صناعة الأفلام السعودية.\n\nواستضافت الثلوثية المخرج والمنتج السعودي المهند الكدم، أحد الأسماء البارزة في مجال صناعة المحتوى البصري والسينما السعودية، الذي شارك تجربته في تأسيس شركات إنتاج إعلامي والعمل على تطوير مشاريع سينمائية محلية.\n\nوأدار الحوار معاذ الحازمي، فنان مؤسس وبشة حكي، بأسلوب تفاعلي أتاح مساحة للنقاش وتبادل الآراء بين المتحدث والحضور، وسط اهتمام كبير من المهتمين بالمشهد السينمائي والإبداعي.`,
    image: "/manus-storage/basar-8_5dadb3f8.webp",
    tag: "بصر",
    tagEn: "Basar",
    tagColor: "#C4622D",
  },
];

// ─── Identity Documents ───────────────────────────────────────────────────────
const identityDocs = [
  {
    id: "identity",
    titleAr: "هوية سُرّة",
    titleEn: "Surra Identity",
    descAr: "الدليل الكامل لهوية سُرّة البصرية — الشعار، الألوان، الخطوط، وقواعد الاستخدام",
    descEn: "The complete guide to Surra's visual identity — logo, colors, fonts, and usage rules",
    icon: "◈",
    color: "#C4622D",
    pages: "٤٨ صفحة",
    pagesEn: "48 pages",
    pdfUrl: "/manus-storage/surrah-guidelines_4d27ab06.pdf",
    previewColor: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #C4622D 100%)",
  },
  {
    id: "profile",
    titleAr: "البروفايل",
    titleEn: "Company Profile",
    descAr: "الملف التعريفي الكامل لسُرّة — رؤيتنا، مجتمعاتنا، خدماتنا، وإنجازاتنا",
    descEn: "Surra's complete company profile — our vision, communities, services, and achievements",
    icon: "◇",
    color: "#c8c4bc",
    pages: "٢٤ صفحة",
    pagesEn: "24 pages",
    pdfUrl: "/manus-storage/surra-profile_231bee6f.pdf",
    previewColor: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #3a3a3a 100%)",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Media() {
  const { lang, t } = useLanguage();
  const isAr = lang === "ar";
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const categories = isAr
    ? ["الكل", "فعاليات", "إطلاق", "شراكات", "مجتمعات", "إعلام"]
    : ["All", "Events", "Launch", "Partnerships", "Communities", "Media"];

  const filterKeys = ["all", "فعاليات", "إطلاق", "شراكات", "مجتمعات", "إعلام"];

  const filteredNews = activeFilter === "all"
    ? newsItems
    : newsItems.filter((n) => n.category === activeFilter);

  return (
    <div style={{ background: "var(--surrah-page-bg)", minHeight: "100vh", color: "var(--surrah-text-primary)" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: "160px",
          paddingBottom: "80px",
          background: "linear-gradient(180deg, rgba(196,98,45,0.08) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "700px" }}>
            <p style={{ fontFamily: F, fontSize: "0.85rem", color: "#C4622D", letterSpacing: "0.15em", marginBottom: "1rem", fontWeight: 600 }}>
              {isAr ? "المركز الإعلامي" : "MEDIA CENTER"}
            </p>
            <h1 style={{ fontFamily: F, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1.5rem" }}>
              {isAr ? "أخبار وهوية سُرّة" : "Surra News & Identity"}
            </h1>
            <p style={{ fontFamily: F, fontSize: "1.1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
              {isAr
                ? "تابع آخر أخبار سُرّة ومجتمعاتها، واطّلع على هويتنا البصرية ومواد علامتنا التجارية"
                : "Follow the latest news from Surra and its communities, and explore our visual identity and brand materials"}
            </p>
          </div>
        </div>
      </section>

      {/* ── Latest News ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: F, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}>
              {isAr ? "أحدث الأخبار" : "Latest News"}
            </h2>
            {/* Filter Tabs */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(filterKeys[i])}
                  style={{
                    fontFamily: F,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    padding: "0.4rem 1rem",
                    border: "1px solid",
                    borderColor: activeFilter === filterKeys[i] ? "#C4622D" : "rgba(255,255,255,0.15)",
                    background: activeFilter === filterKeys[i] ? "rgba(196,98,45,0.15)" : "transparent",
                    color: activeFilter === filterKeys[i] ? "#C4622D" : "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    borderRadius: "2px",
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* News Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2rem" }}>
            {filteredNews.map((item) => (
              <article
                key={item.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                  transition: "transform 0.25s, border-color 0.25s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,98,45,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                  <img
                    src={item.image}
                    alt={isAr ? item.title : item.titleEn}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
                  <span style={{
                    position: "absolute",
                    top: "1rem",
                    right: isAr ? "1rem" : "auto",
                    left: isAr ? "auto" : "1rem",
                    background: item.tagColor,
                    color: "#fff",
                    fontFamily: F,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.75rem",
                    borderRadius: "2px",
                  }}>
                    {isAr ? item.tag : item.tagEn}
                  </span>
                </div>
                {/* Content */}
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                    <span style={{ fontFamily: F, fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>
                      {isAr ? item.date : item.dateEn}
                    </span>
                    <span style={{ fontFamily: F, fontSize: "0.78rem", color: "#C4622D", fontWeight: 600 }}>
                      {isAr ? item.category : item.categoryEn}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: F, fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.5, marginBottom: "0.75rem" }}>
                    {isAr ? item.title : item.titleEn}
                  </h3>
                  <p style={{ fontFamily: F, fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {isAr ? item.excerpt : item.excerptEn}
                  </p>
                  <button
                    style={{
                      marginTop: "1.25rem",
                      fontFamily: F,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#C4622D",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    {isAr ? "اقرأ المزيد" : "Read More"}
                    <span style={{ fontSize: "0.8rem" }}>{isAr ? "←" : "→"}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Identity Documents ── */}
      <section
        style={{
          padding: "80px 0",
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontFamily: F, fontSize: "0.85rem", color: "#C4622D", letterSpacing: "0.15em", marginBottom: "0.75rem", fontWeight: 600 }}>
              {isAr ? "هوية سُرّة" : "SURRA IDENTITY"}
            </p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, marginBottom: "1rem" }}>
              {isAr ? "مواد العلامة التجارية" : "Brand Materials"}
            </h2>
            <p style={{ fontFamily: F, fontSize: "1rem", color: "rgba(255,255,255,0.55)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
              {isAr
                ? "اطّلع على هويتنا البصرية الكاملة وإرشادات استخدام العلامة التجارية"
                : "Explore our complete visual identity and brand usage guidelines"}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
            {identityDocs.map((doc) => (
              <div
                key={doc.id}
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  overflow: "hidden",
                  transition: "transform 0.25s, border-color 0.25s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.borderColor = doc.color + "60";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
                onClick={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
              >
                {/* Preview */}
                <div style={{ height: "180px", background: doc.previewColor, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ fontSize: "4rem", color: doc.color, opacity: 0.8 }}>{doc.icon}</span>
                  <div style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: isAr ? "1rem" : "auto",
                    left: isAr ? "auto" : "1rem",
                    fontFamily: F,
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(0,0,0,0.4)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "2px",
                  }}>
                    PDF · {isAr ? doc.pages : doc.pagesEn}
                  </div>
                </div>
                {/* Info */}
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontFamily: F, fontSize: "1.1rem", fontWeight: 800, color: doc.color, marginBottom: "0.5rem" }}>
                    {isAr ? doc.titleAr : doc.titleEn}
                  </h3>
                  <p style={{ fontFamily: F, fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                    {isAr ? doc.descAr : doc.descEn}
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    {doc.pdfUrl ? (
                      <>
                        <a
                          href={doc.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: F,
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            color: "#fff",
                            background: doc.color,
                            border: "none",
                            padding: "0.5rem 1.25rem",
                            cursor: "pointer",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            transition: "opacity 0.2s",
                          }}
                        >
                          {isAr ? "عرض" : "View"} ↗
                        </a>
                        <a
                          href={doc.pdfUrl}
                          download
                          style={{
                            fontFamily: F,
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: doc.color,
                            background: "transparent",
                            border: `1px solid ${doc.color}`,
                            padding: "0.5rem 1.25rem",
                            cursor: "pointer",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                          }}
                        >
                          {isAr ? "تحميل" : "Download"} ↓
                        </a>
                      </>
                    ) : (
                      <span style={{
                        fontFamily: F,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.35)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "0.5rem 1.25rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}>
                        {isAr ? "قريباً" : "Coming Soon"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Profiles ── */}
      <section style={{ padding: "60px 0", background: "rgba(255,255,255,0.02)" }}>
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: F, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", color: "#C4622D", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {isAr ? "ملفات المجتمعات" : "COMMUNITY PROFILES"}
            </p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
              {isAr ? "تعرّف على مجتمعاتنا" : "Explore Our Communities"}
            </h2>
            <p style={{ fontFamily: F, fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", maxWidth: "500px" }}>
              {isAr ? "الملفات التعريفية لمجتمعات سُرّة — رؤيتها، فعالياتها، وأثرها" : "Profiles of Surra communities — their vision, events, and impact"}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {/* BASAR */}
            <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", transition: "transform 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
              <div style={{ height: "120px", background: "linear-gradient(135deg, #0a1a0a 0%, #1a3a1a 50%, #2a5a2a 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <span style={{ fontSize: "3rem", opacity: 0.9 }}>◉</span>
                <div style={{ position: "absolute", bottom: "0.75rem", right: isAr ? "0.75rem" : "auto", left: isAr ? "auto" : "0.75rem", fontFamily: F, fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.4)", padding: "0.15rem 0.5rem", borderRadius: "2px" }}>
                  PDF · {isAr ? "بروفايل" : "Profile"}
                </div>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <h3 style={{ fontFamily: F, fontSize: "1.05rem", fontWeight: 800, color: "#4CAF50", marginBottom: "0.4rem" }}>
                  {isAr ? "مجتمع بَصَر" : "Basar Community"}
                </h3>
                <p style={{ fontFamily: F, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  {isAr ? "الملف التعريفي لمجتمع بَصَر — رؤيته، فعالياته، وأثره في المشهد الإبداعي" : "Basar community profile — its vision, events, and creative impact"}
                </p>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <a href="/manus-storage/basar-profile_7782383e.pdf" target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: F, fontSize: "0.82rem", fontWeight: 700, color: "#fff", background: "#4CAF50", border: "none", padding: "0.45rem 1rem", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem", transition: "opacity 0.2s" }}>
                    {isAr ? "عرض" : "View"} ↗
                  </a>
                  <a href="/manus-storage/basar-profile_7782383e.pdf" download
                    style={{ fontFamily: F, fontSize: "0.82rem", fontWeight: 600, color: "#4CAF50", background: "transparent", border: "1px solid #4CAF50", padding: "0.45rem 1rem", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                    {isAr ? "تحميل" : "Download"} ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Press Kit CTA ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{
            background: "linear-gradient(135deg, rgba(196,98,45,0.12) 0%, rgba(123,79,142,0.08) 100%)",
            border: "1px solid rgba(196,98,45,0.2)",
            padding: "3rem",
            textAlign: "center",
          }}>
            <h2 style={{ fontFamily: F, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, marginBottom: "1rem" }}>
              {isAr ? "تواصل مع فريق الإعلام" : "Contact the Media Team"}
            </h2>
            <p style={{ fontFamily: F, fontSize: "1rem", color: "rgba(255,255,255,0.6)", marginBottom: "2rem", maxWidth: "500px", margin: "0 auto 2rem" }}>
              {isAr
                ? "للاستفسارات الإعلامية، طلبات المقابلات، أو الحصول على مواد العلامة التجارية"
                : "For media inquiries, interview requests, or obtaining brand materials"}
            </p>
            <a
              href="/contact"
              style={{
                fontFamily: F,
                fontSize: "1rem",
                fontWeight: 700,
                color: "#fff",
                background: "#C4622D",
                padding: "0.85rem 2.5rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              {isAr ? "تواصل معنا ↗" : "Contact Us ↗"}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
