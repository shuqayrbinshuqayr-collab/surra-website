/*
 * دليل سُرّة — Creative Directory Page
 * Design: Hero with Riyadh night cityscape, category tabs, search + filter bar
 * Inspired by saudistudios.com layout
 */
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { VideoBackground } from "@/components/VideoBackground";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { CULTURAL_CATEGORIES, ALL_CATEGORY } from "@shared/categories";

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
  website?: string;
  partnership: string;
  year: number;
  isNew: boolean;
  logo?: string;
}

const initialEntities: Entity[] = [
  { id: 1, name: "حي جميل", category: "الجهات الإبداعية", type: "مساحة إبداعية", city: "جدة", focus: "فنون بصرية وسينما", desc: "مجمع إبداعي متكامل بمساحة 17,000م² يضم 12 منظمة شريكة، استوديوهات، مسرح، وأول دار سينما مستقلة في المملكة.", tags: ["#فنون", "#سينما", "#ريادة", "#جدة"], activity: "نشط جداً", instagram: "@artjameel", partnership: "عالية", year: 2021, isNew: false, logo: "/manus-storage/art_jameel_9a51f5c0.svg" },
  { id: 2, name: "الجمعية العربية السعودية للثقافة والفنون", category: "الجهات الثقافية", type: "جمعية", city: "الرياض", focus: "مسرح وموسيقى وفنون بصرية", desc: "الكيان الرائد في خدمة الحراك الثقافي منذ 1973، تمتد عبر 16 فرعاً في المملكة مع أكثر من 11,000 عضو.", tags: ["#مسرح", "#موسيقى", "#فنون_بصرية", "#وطني"], activity: "نشط جداً", instagram: "@sasca_sa", partnership: "عالية", year: 1973, isNew: false, logo: "/manus-storage/sasca_465a651d.png" },
  { id: 3, name: "جاكس — منطقة الدرعية الثقافية", category: "المساحات الإبداعية", type: "مساحة إبداعية", city: "الرياض", focus: "تصوير وتصميم وفنون معاصرة", desc: "حي ثقافي في قلب الدرعية يستضيف معارض وورشات في التصوير الفوتوغرافي، النحت، والتصميم الغرافيكي.", tags: ["#درعية", "#تصميم", "#تراث", "#معاصر"], activity: "نشط جداً", instagram: "@diriyahgate", partnership: "عالية", year: 2022, isNew: false, logo: "/manus-storage/jaxs_6397f8f0.svg" },
  { id: 4, name: "بلد الفن", category: "المبادرات المستقلة", type: "مبادرة", city: "جدة", focus: "فنون بصرية وتراث محلي", desc: "مبادرة وزارة الثقافة التي تحوّل جدة التاريخية إلى مركز إبداعي ثقافي بمعارض تعكس التراث بأساليب عصرية.", tags: ["#جدة_التاريخية", "#تراث", "#فنون", "#وزارة_الثقافة"], activity: "نشط", instagram: "@ministryofculture", partnership: "عالية", year: 2024, isNew: false, logo: "" },
  { id: 5, name: "مركز إثراء", category: "الجهات الداعمة", type: "مساحة إبداعية", city: "الدمام", focus: "ثقافة وفنون ومعرفة", desc: "مركز إثراء للمعرفة والفنون والثقافة في الظهران، يضم متحفاً ومسرحاً وحاضنة أعمال إبداعية.", tags: ["#إثراء", "#أرامكو", "#معرفة", "#شرقية"], activity: "نشط جداً", instagram: "@ithra", partnership: "عالية", year: 2018, isNew: false, logo: "/manus-storage/ithra_aed80674.png" },
  { id: 6, name: "فنون العلا", category: "الفعاليات المتكررة", type: "مبادرة", city: "العلا", focus: "فنون معاصرة وتراث صحراوي", desc: "مهرجان فنون عالمي في العلا يجمع الفنانين المحليين والدوليين وسط التضاريس الصحراوية الساحرة.", tags: ["#العلا", "#فنون_عالمية", "#صحراء", "#سياحة"], activity: "نشط", instagram: "@experiencealula", partnership: "متوسطة", year: 2020, isNew: false, logo: "/manus-storage/alula_e4847c23.svg" },
  { id: 7, name: "النادي الأدبي الثقافي جدة", category: "النوادي الأدبية", type: "جمعية", city: "جدة", focus: "أدب وشعر وخط عربي", desc: "نادٍ أدبي ثقافي يقدم ورشات في الخط العربي والشعر، ويحتضن منتدى الفنون البصرية.", tags: ["#أدب", "#خط_عربي", "#شعر", "#جدة"], activity: "نشط", instagram: "@jeddahliterary", partnership: "متوسطة", year: 1975, isNew: false, logo: "/manus-storage/jeddah_literary_8f5aea33.jpg" },
  { id: 8, name: "مبادرة الشريك الأدبي", category: "المبادرات المستقلة", type: "مبادرة", city: "الرياض", focus: "أدب ومقاهٍ ثقافية", desc: "مبادرة وزارة الثقافة لتحويل 80 مقهى في 12 منطقة إدارية إلى مساحات إبداعية وأدبية.", tags: ["#مقاهي", "#أدب", "#وزارة_الثقافة", "#وطني"], activity: "نشط جداً", instagram: "@ministryofculture", partnership: "عالية", year: 2023, isNew: false, logo: "" },
  { id: 9, name: "مجتمع سرة", category: "المجتمعات والمبادرات", type: "مجتمع", city: "الرياض", focus: "اقتصاد إبداعي وحراك ثقافي", desc: "منظومة متكاملة تغير مفاهيم الحراك الثقافي وتستثمر في الاقتصاد الإبداعي السعودي عبر بناء مجتمعات فنية حية.", tags: ["#سرة", "#اقتصاد_إبداعي", "#مجتمع", "#ريادة"], activity: "نشط جداً", instagram: "@surrah_community", partnership: "عالية", year: 2022, isNew: true, logo: "/manus-storage/surrah_d12afd51.svg" },
  { id: 10, name: "ستوديو بيان", category: "الجهات الإبداعية", type: "استوديو", city: "الرياض", focus: "تصميم جرافيك وهوية بصرية", desc: "استوديو تصميم متخصص في الهوية البصرية والتصميم الجرافيكي للعلامات التجارية الإبداعية.", tags: ["#تصميم", "#هوية_بصرية", "#جرافيك"], activity: "نشط", instagram: "@bayan_studio", partnership: "متوسطة", year: 2020, isNew: false, logo: "" },
  { id: 11, name: "متجر الفنون السعودية", category: "الجهات الإبداعية", type: "متجر", city: "جدة", focus: "بيع الأعمال الفنية المحلية", desc: "منصة تجارية لبيع الأعمال الفنية السعودية الأصيلة من لوحات وتماثيل ومنتجات إبداعية.", tags: ["#فنون", "#تجارة_إبداعية", "#جدة"], activity: "نشط", instagram: "@saudiartstore", partnership: "متوسطة", year: 2021, isNew: true, logo: "/manus-storage/saudi_art_store_62f9bfa9.png" },

  // ── الجهات الحكومية والثقافية الرسمية ──
  { id: 12, name: "وزارة الثقافة", category: "الجهات الحكومية", type: "جهة حكومية", city: "الرياض", focus: "قيادة القطاع الثقافي", desc: "الجهة المسؤولة عن قيادة القطاع الثقافي السعودي وتطويره ضمن رؤية 2030.", tags: ["#حكومي", "#ثقافة", "#رؤية2030"], activity: "نشط جداً", instagram: "@ministryofculture", twitter: "@Cultureksa", website: "https://www.moc.gov.sa", partnership: "عالية", year: 2018, isNew: false, logo: "" },
  { id: 13, name: "هيئة الأدب والنشر والترجمة", category: "الجهات الحكومية", type: "جهة حكومية", city: "الرياض", focus: "أدب ونشر وترجمة", desc: "تطوير قطاع الأدب والنشر والترجمة وتمكين المواهب والمشاريع الأدبية في المملكة.", tags: ["#أدب", "#نشر", "#ترجمة", "#حكومي"], activity: "نشط جداً", instagram: "@lptsaudi", twitter: "@lptsaudi", website: "https://www.lpt.moc.gov.sa", partnership: "عالية", year: 2020, isNew: false, logo: "" },
  { id: 14, name: "هيئة الموسيقى", category: "الجهات الحكومية", type: "جهة حكومية", city: "الرياض", focus: "موسيقى", desc: "تطوير قطاع الموسيقى والتعليم الموسيقي والحفلات وتمكين المواهب الموسيقية السعودية.", tags: ["#موسيقى", "#حكومي", "#فنون"], activity: "نشط جداً", instagram: "@musiccommission", twitter: "@musiccommission", website: "https://www.music.moc.gov.sa", partnership: "عالية", year: 2020, isNew: false, logo: "" },
  { id: 15, name: "هيئة الأفلام", category: "الجهات الحكومية", type: "جهة حكومية", city: "الرياض", focus: "سينما وأفلام", desc: "دعم صناعة الأفلام والإنتاج السينمائي وتمكين المواهب في قطاع الأفلام السعودي.", tags: ["#سينما", "#أفلام", "#حكومي"], activity: "نشط جداً", instagram: "@filmcommission", twitter: "@filmcommission", website: "https://www.film.moc.gov.sa", partnership: "عالية", year: 2020, isNew: false, logo: "" },
  { id: 16, name: "هيئة المسرح والفنون الأدائية", category: "الجهات الحكومية", type: "جهة حكومية", city: "الرياض", focus: "فنون أدائية", desc: "تطوير المسرح والعروض الحية والفنون الأدائية في المملكة العربية السعودية.", tags: ["#مسرح", "#فنون_أدائية", "#حكومي"], activity: "نشط جداً", instagram: "@theatercommission", twitter: "@theatercommission", website: "https://www.theater.moc.gov.sa", partnership: "عالية", year: 2020, isNew: false, logo: "" },
  { id: 17, name: "هيئة التراث", category: "الجهات الحكومية", type: "جهة حكومية", city: "الرياض", focus: "تراث", desc: "حماية وتطوير التراث الثقافي السعودي المادي وغير المادي وتوثيقه للأجيال القادمة.", tags: ["#تراث", "#حكومي", "#توثيق"], activity: "نشط جداً", instagram: "@heritagecommission", twitter: "@heritagecomsa", website: "https://www.heritage.moc.gov.sa", partnership: "عالية", year: 2020, isNew: false, logo: "" },
  { id: 18, name: "هيئة المتاحف", category: "الجهات الحكومية", type: "جهة حكومية", city: "الرياض", focus: "متاحف", desc: "تطوير قطاع المتاحف وإدارة التجارب المتحفية وتمكين الزوار من استكشاف الهوية السعودية.", tags: ["#متاحف", "#حكومي", "#تراث"], activity: "نشط جداً", instagram: "@museumsauthority", twitter: "@museumsauthority", website: "https://www.museums.moc.gov.sa", partnership: "عالية", year: 2020, isNew: false, logo: "" },
  { id: 19, name: "هيئة الأزياء", category: "الجهات الحكومية", type: "جهة حكومية", city: "الرياض", focus: "أزياء", desc: "دعم قطاع الأزياء السعودي وتمكين المصممين وتطوير الهوية البصرية للأزياء المحلية.", tags: ["#أزياء", "#تصميم", "#حكومي"], activity: "نشط جداً", instagram: "@fashioncommission", twitter: "@fashioncommission", website: "https://www.fashion.moc.gov.sa", partnership: "عالية", year: 2020, isNew: false, logo: "" },
  { id: 20, name: "هيئة فنون الطهي", category: "الجهات الحكومية", type: "جهة حكومية", city: "الرياض", focus: "طهي وثقافة غذائية", desc: "إبراز فنون الطهي السعودية وتطوير قطاع الثقافة الغذائية والمطبخ السعودي على المستوى العالمي.", tags: ["#طهي", "#ثقافة_غذائية", "#حكومي"], activity: "نشط جداً", instagram: "@culinaryartscommission", twitter: "@culinaryartscom", website: "https://www.culinary.moc.gov.sa", partnership: "عالية", year: 2021, isNew: false, logo: "" },

  // ── الجهات الداعمة والتمويلية ──
  { id: 21, name: "الصندوق الثقافي", category: "الجهات الداعمة", type: "صندوق تمويل", city: "الرياض", focus: "تمويل ثقافي", desc: "صندوق تمويلي لدعم المشاريع والمنشآت الثقافية وتمكين رواد الأعمال في القطاع الثقافي السعودي.", tags: ["#تمويل", "#ثقافة", "#ريادة"], activity: "نشط جداً", instagram: "@culturefund_sa", twitter: "@culturefund_sa", website: "https://www.culturefund.gov.sa", partnership: "عالية", year: 2020, isNew: false, logo: "" },
  { id: 22, name: "مؤسسة محمد بن سلمان — مسك", category: "الجهات الداعمة", type: "مؤسسة", city: "الرياض", focus: "تمكين وإبداع", desc: "مؤسسة تدعم الشباب السعودي والابتكار والمشاريع الثقافية والإبداعية لبناء جيل مبدع.", tags: ["#مسك", "#شباب", "#إبداع", "#تمكين"], activity: "نشط جداً", instagram: "@misk_foundation", twitter: "@misk_foundation", website: "https://www.misk.org.sa", partnership: "عالية", year: 2011, isNew: false, logo: "" },
  { id: 23, name: "منشآت", category: "الجهات الداعمة", type: "جهة حكومية", city: "الرياض", focus: "ريادة أعمال", desc: "الهيئة العامة للمنشآت الصغيرة والمتوسطة، تدعم المنشآت الإبداعية وتمكّن رواد الأعمال في القطاع الثقافي.", tags: ["#ريادة", "#أعمال", "#دعم"], activity: "نشط جداً", instagram: "@monshaat", twitter: "@monshaat", website: "https://www.monshaat.gov.sa", partnership: "عالية", year: 2016, isNew: false, logo: "" },
  { id: 24, name: "برنامج جودة الحياة", category: "الجهات الداعمة", type: "برنامج حكومي", city: "الرياض", focus: "ثقافة وترفيه", desc: "برنامج حكومي يهدف لتحسين جودة الحياة ودعم الثقافة والترفيه والأنشطة الإبداعية في المملكة.", tags: ["#جودة_الحياة", "#ترفيه", "#ثقافة"], activity: "نشط جداً", instagram: "@qol_sa", twitter: "@qol_sa", website: "https://www.qol.gov.sa", partnership: "عالية", year: 2017, isNew: false, logo: "" },
  { id: 25, name: "واعد — أرامكو السعودية", category: "الجهات الداعمة", type: "استثمار", city: "الظهران", focus: "استثمار وريادة", desc: "ذراع أرامكو لدعم الشركات الناشئة والمشاريع الإبداعية والتقنية في المملكة العربية السعودية.", tags: ["#أرامكو", "#استثمار", "#ريادة"], activity: "نشط جداً", instagram: "@waed_ventures", twitter: "@waed_ventures", website: "https://www.wa-ed.com", partnership: "عالية", year: 2011, isNew: false, logo: "" },
  { id: 26, name: "STC InspireU", category: "الجهات الداعمة", type: "مسرّعة أعمال", city: "الرياض", focus: "تقنية وابتكار", desc: "مسرّعة أعمال من STC تدعم المشاريع التقنية والإبداعية الناشئة في المملكة العربية السعودية.", tags: ["#STC", "#ابتكار", "#تقنية", "#ريادة"], activity: "نشط جداً", instagram: "@stc_inspireu", twitter: "@stc_inspireu", website: "https://www.inspireu.stc", partnership: "عالية", year: 2014, isNew: false, logo: "" },

  // ── النوادي الأدبية والجمعيات ──
  { id: 27, name: "نادي الرياض الأدبي", category: "النوادي الأدبية", type: "نادي أدبي", city: "الرياض", focus: "أدب وشعر", desc: "من أقدم المنصات الأدبية في المملكة، يحتضن الأمسيات الشعرية والنقدية والفعاليات الثقافية منذ عقود.", tags: ["#أدب", "#شعر", "#نقد", "#الرياض"], activity: "نشط", instagram: "@riyadhliterary", twitter: "@riyadhliterary", website: "https://www.riyadhliterary.org.sa", partnership: "متوسطة", year: 1975, isNew: false, logo: "" },
  { id: 28, name: "نادي الشرقية الأدبي", category: "النوادي الأدبية", type: "نادي أدبي", city: "الدمام", focus: "أدب وثقافة", desc: "نادٍ أدبي يهتم بالأدب والحراك الثقافي في المنطقة الشرقية، يستضيف فعاليات وأمسيات أدبية متنوعة.", tags: ["#أدب", "#شرقية", "#ثقافة"], activity: "نشط", instagram: "@easternliterary", twitter: "@easternliterary", website: "https://www.easternliterary.org.sa", partnership: "متوسطة", year: 1975, isNew: false, logo: "" },
  { id: 29, name: "جمعية الثقافة والفنون", category: "النوادي الأدبية", type: "جمعية ثقافية", city: "عدة مدن", focus: "فنون وثقافة", desc: "تنظّم فعاليات فنية وثقافية بمختلف المناطق، وتعمل على تطوير الحراك الفني في المملكة.", tags: ["#فنون", "#ثقافة", "#جمعية"], activity: "نشط", instagram: "@sasca_sa", twitter: "@sasca_sa", website: "https://www.sasca.org.sa", partnership: "متوسطة", year: 1973, isNew: false, logo: "" },
  { id: 30, name: "جمعية السينما", category: "النوادي الأدبية", type: "جمعية", city: "الخبر", focus: "سينما", desc: "جمعية تعنى بدعم صناعة السينما وصنّاع الأفلام السعوديين وتنظيم الفعاليات السينمائية.", tags: ["#سينما", "#أفلام", "#خبر"], activity: "نشط", instagram: "@saudicinema", twitter: "@saudicinema", website: "https://www.saudicinema.org", partnership: "متوسطة", year: 2018, isNew: false, logo: "" },
  { id: 31, name: "جمعية النشر", category: "النوادي الأدبية", type: "جمعية", city: "الرياض", focus: "نشر وكتاب", desc: "تطوير قطاع النشر وصناعة الكتاب في المملكة العربية السعودية ودعم دور النشر المحلية.", tags: ["#نشر", "#كتاب", "#الرياض"], activity: "نشط", instagram: "@saudipublishing", twitter: "@saudipublishing", website: "https://www.saudipublishing.org", partnership: "متوسطة", year: 2019, isNew: false, logo: "" },

  // ── المساحات الإبداعية والثقافية ──
  { id: 32, name: "مسرح مرايا", category: "المساحات الإبداعية", type: "فنون أدائية", city: "العلا", focus: "فنون أدائية", desc: "أكبر مبنى مرايا في العالم في العلا، يستضيف عروضاً فنية وموسيقية عالمية وسط الطبيعة الصحراوية.", tags: ["#مرايا", "#العلا", "#فنون", "#عالمي"], activity: "نشط جداً", instagram: "@experiencealula", twitter: "@experiencealula", website: "https://www.experiencealula.com", partnership: "عالية", year: 2020, isNew: false, logo: "" },
  { id: 33, name: "The Warehouse", category: "المساحات الإبداعية", type: "مساحة إبداعية", city: "جدة", focus: "فنون وأنشطة إبداعية", desc: "مساحة إبداعية في جدة تستضيف الفنانين والمصممين وتنظم ورشات وفعاليات فنية متنوعة.", tags: ["#جدة", "#فنون", "#إبداع"], activity: "نشط", instagram: "@thewarehousejeddah", twitter: "@thewarehousejed", website: "https://www.thewarehousejeddah.com", partnership: "متوسطة", year: 2019, isNew: false, logo: "" },
  { id: 34, name: "بيت الثقافة", category: "المساحات الإبداعية", type: "مساحة ثقافية", city: "الرياض", focus: "حوارات وفعاليات ثقافية", desc: "مساحة للحوارات والفعاليات الثقافية في الرياض، تجمع المثقفين والمبدعين في بيئة حوارية مفتوحة.", tags: ["#الرياض", "#ثقافة", "#حوار"], activity: "نشط", instagram: "@bait_althaqafa", twitter: "@bait_althaqafa", website: "", partnership: "متوسطة", year: 2020, isNew: false, logo: "" },

  // ── المهرجانات والفعاليات ──
  { id: 35, name: "مهرجان البحر الأحمر السينمائي", category: "الفعاليات المتكررة", type: "مهرجان سينمائي", city: "جدة", focus: "سينما", desc: "مهرجان سينمائي دولي يُقام سنوياً في جدة، يحتفي بالسينما العربية والعالمية ويدعم صنّاع الأفلام الشباب.", tags: ["#سينما", "#جدة", "#دولي", "#أفلام"], activity: "نشط جداً", instagram: "@redseaiff", twitter: "@redseaiff", website: "https://www.redseaiff.com", partnership: "عالية", year: 2021, isNew: false, logo: "" },
  { id: 36, name: "بينالي الدرعية", category: "الفعاليات المتكررة", type: "معرض دولي", city: "الرياض", focus: "فنون بصرية", desc: "معرض دولي للفنون المعاصرة في الدرعية، يجمع فنانين من أكثر من 30 دولة في حوار فني عالمي.", tags: ["#درعية", "#فنون_بصرية", "#دولي", "#معاصر"], activity: "نشط جداً", instagram: "@diriyahbiennale", twitter: "@diriyahbiennale", website: "https://www.diriyahbiennale.com", partnership: "عالية", year: 2021, isNew: false, logo: "" },
  { id: 37, name: "موسم الرياض", category: "الفعاليات المتكررة", type: "موسم ترفيهي", city: "الرياض", focus: "ثقافة وترفيه", desc: "أكبر موسم ترفيهي وثقافي في المملكة، يجمع فعاليات متنوعة من فنون وموسيقى وترفيه وأنشطة عائلية.", tags: ["#الرياض", "#ترفيه", "#ثقافة", "#موسم"], activity: "نشط جداً", instagram: "@riyadhseason", twitter: "@riyadhseason", website: "https://www.riyadhseason.sa", partnership: "عالية", year: 2019, isNew: false, logo: "" },
  { id: 38, name: "موسم جدة", category: "الفعاليات المتكررة", type: "موسم ترفيهي", city: "جدة", focus: "ثقافة وترفيه", desc: "موسم ترفيهي وثقافي سنوي في جدة يحتضن مهرجانات وفعاليات وتجارب ثقافية متنوعة.", tags: ["#جدة", "#ترفيه", "#ثقافة", "#موسم"], activity: "نشط جداً", instagram: "@jeddahseason", twitter: "@jeddahseason", website: "https://www.jeddahseason.sa", partnership: "عالية", year: 2019, isNew: false, logo: "" },
  { id: 39, name: "XP Music Futures", category: "الفعاليات المتكررة", type: "مؤتمر موسيقي", city: "الرياض", focus: "موسيقى", desc: "مؤتمر متخصص في صناعة الموسيقى يجمع المبدعين والمنتجين وشركات الموسيقى من أنحاء العالم.", tags: ["#موسيقى", "#الرياض", "#مؤتمر", "#دولي"], activity: "نشط جداً", instagram: "@xpmusicfutures", twitter: "@xpmusicfutures", website: "https://www.xpmusicfutures.com", partnership: "عالية", year: 2019, isNew: false, logo: "" },

  // ── المجتمعات والمبادرات الثقافية ──
  { id: 40, name: "بصر", category: "المجتمعات والمبادرات", type: "مجتمع", city: "السعودية", focus: "فنون بصرية", desc: "مجتمع يهتم بالفنون البصرية والمبدعين السعوديين، يربط الفنانين بالفرص والجمهور.", tags: ["#فنون_بصرية", "#مجتمع", "#سعودي"], activity: "نشط جداً", instagram: "@basar_community", twitter: "@basar_community", website: "", partnership: "عالية", year: 2022, isNew: true, logo: "" },
  { id: 41, name: "عُملة", category: "المجتمعات والمبادرات", type: "مجتمع", city: "السعودية", focus: "مال واعمال", desc: "مجتمع يهتم بنشر ثقافة المال والأعمال والاقتصاد الإبداعي في المشهد الثقافي السعودي.", tags: ["#مال", "#أعمال", "#اقتصاد_إبداعي", "#مجتمع"], activity: "نشط جداً", instagram: "@umlah_community", twitter: "@umlah_community", website: "", partnership: "عالية", year: 2022, isNew: true, logo: "" },
  { id: 42, name: "الاثنينية", category: "المجتمعات والمبادرات", type: "مجلس ثقافي", city: "الرياض", focus: "لقاءات فكرية وثقافية", desc: "مجلس ثقافي أسبوعي يُقام كل اثنين، يستضيف المفكرين والأدباء والمثقفين في حوارات فكرية دورية.", tags: ["#مجلس", "#ثقافة", "#فكر", "#الرياض"], activity: "نشط جداً", instagram: "@alithnainiyah", twitter: "@alithnainiyah", website: "https://www.alithnainiyah.com", partnership: "متوسطة", year: 1981, isNew: false, logo: "" },
  { id: 43, name: "نوادي القراءة المستقلة", category: "المجتمعات والمبادرات", type: "مجتمع قراءة", city: "متعددة", focus: "قراءة وأدب", desc: "شبكة من مجتمعات القراءة والنقاش المعرفي المستقلة المنتشرة في مدن المملكة.", tags: ["#قراءة", "#أدب", "#مجتمع", "#معرفة"], activity: "نشط", instagram: "@readingclubs_sa", twitter: "@readingclubs_sa", website: "", partnership: "متوسطة", year: 2018, isNew: false, logo: "" },
];

// Use shared categories — same list used in Admin CMS
const CATEGORIES = [
  ALL_CATEGORY,
  ...CULTURAL_CATEGORIES.map((c) => ({ key: c.key, label: c.labelAr, icon: c.icon })),
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
  const [tab, setTab] = useState<"directory" | "submit" | "about">("directory");
   const [, navigate] = useLocation();
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const publicSubmitMutation = trpc.directory.publicSubmit.useMutation({
    onSuccess: () => {
      setSubmitSuccess(true);
      setSubmitError("");
      setForm({ name: "", type: "", city: "", year: "", desc: "", focus: "", category: "", website: "", phone: "", address: "", activity: "نشط", partnership: "متوسطة", instagram: "", linkedin: "", twitter: "", contactName: "", contactRole: "", contactPhone: "", contactEmail: "", tagInput: "", tags: [], logo: "" });
      setTimeout(() => setSubmitSuccess(false), 6000);
    },
    onError: (err) => {
      setSubmitError(err.message || "حدث خطأ أثناء الإرسال، يرجى المحاولة مجدداً");
    },
    onSettled: () => setIsSubmitting(false),
  });

  const [form, setForm] = useState({
    name: "", type: "", city: "", year: "", desc: "", focus: "",
    category: "",
    website: "", phone: "", address: "",
    activity: "نشط", partnership: "متوسطة", instagram: "", linkedin: "", twitter: "",
    contactName: "", contactRole: "", contactPhone: "", contactEmail: "",
    tagInput: "", tags: [] as string[], logo: "",
  });

  // ── Fetch from DB — pass category + search + city directly to API ──────────
  const { data: dbEntities } = trpc.directory.list.useQuery({
    limit: 200,
    category: activeCategory !== "الكل" ? activeCategory : undefined,
    search: search || undefined,
    city: filterCity || undefined,
  });

  // ── Map DB entities to the local Entity interface ─────────────────────────
  const dbMapped: Entity[] = useMemo(() => {
    if (!dbEntities) return [];
    return dbEntities.map((e) => ({
      id: e.id + 10000, // offset to avoid ID collision with static data
      name: e.nameAr,
      category: e.category,
      type: e.entityType || e.category,
      city: e.city || "",
      focus: e.categoryEn || e.category,
      desc: e.descriptionAr || "",
      tags: e.tags ? JSON.parse(e.tags) : [],
      activity: e.activityLevel || "نشط",
      instagram: e.instagram || "",
      twitter: e.twitter || "",
      website: e.website || "",
      partnership: e.partnershipLevel || "متوسطة",
      year: e.foundedYear || new Date(e.createdAt).getFullYear(),
      isNew: (Date.now() - new Date(e.createdAt).getTime()) < 30 * 24 * 60 * 60 * 1000,
      logo: e.logoUrl || "",
    }));
  }, [dbEntities]);

  // ── Combine static + DB entities (DB entities appear first as "new") ────────
  const allEntities = useMemo(() => {
    // Avoid duplicates: if a DB entity has same name as static, prefer DB version
    const dbNames = new Set(dbMapped.map((e) => e.name));
    const filteredStatic = initialEntities.filter((e) => !dbNames.has(e.name));
    return [...dbMapped, ...filteredStatic];
  }, [dbMapped]);

  const filtered = useMemo(() => {
    return allEntities.filter((e) => {
      const q = search.toLowerCase();
      const matchSearch = !q || e.name.includes(q) || e.city.includes(q) || e.focus.includes(q) || e.desc.includes(q);
      const matchCat = activeCategory === "الكل" || e.category === activeCategory;
      return matchSearch && matchCat && (!filterCity || e.city === filterCity) && (!filterType || e.type === filterType);
    });
  }, [search, activeCategory, filterCity, filterType, allEntities]);

  function handleSubmit() {
    // Validate required fields with clear error messages
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "اسم الجهة مطلوب";
    if (!form.category) errors.category = "يرجى اختيار تصنيف الجهة";
    if (!form.city.trim()) errors.city = "المدينة مطلوبة";
    if (!form.desc.trim()) errors.desc = "وصف الجهة مطلوب";
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to first error
      const firstErrorEl = document.getElementById("form-error-name") || document.getElementById("form-error-category");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);
    setSubmitError("");
    publicSubmitMutation.mutate({
      nameAr: form.name,
      category: form.category,
      entityType: form.type || undefined,
      city: form.city || undefined,
      address: form.address || undefined,
      descriptionAr: form.desc || undefined,
      focus: form.focus || undefined,
      logoUrl: form.logo || undefined,
      website: form.website || undefined,
      instagram: form.instagram || undefined,
      twitter: form.twitter || undefined,
      linkedin: form.linkedin || undefined,
      phone: form.phone || undefined,
      contactName: form.contactName || undefined,
      contactRole: form.contactRole || undefined,
      contactEmail: form.contactEmail || undefined,
      foundedYear: form.year ? Number(form.year) : undefined,
      tags: form.tags.length > 0 ? JSON.stringify(form.tags) : undefined,
      activityLevel: form.activity || undefined,
      partnershipLevel: form.partnership || undefined,
    });
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
        {/* Video Background */}
        <VideoBackground src="/manus-storage/transform-to-night-sky-over-diriyah-thunder-clouds_987c713a.mp4" opacity={0.7} />
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/manus-storage/riyadh-night-hero_a07c9d0a.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            filter: "brightness(0.25)",
            zIndex: 0,
            mixBlendMode: "multiply",
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
            Saudi Cultural Organizations Directory
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
              { key: "about", label: "عن الدليل" },
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

      {/* ── CATEGORY FILTER CHIPS (only visible in directory tab) ── */}
      {tab === "directory" && (
        <div style={{ background: "#0a0a0a", borderBottom: `1px solid rgba(255,255,255,0.05)`, overflowX: "auto", scrollbarWidth: "none" }}>
          <div className="container" style={{ display: "flex", gap: "0.5rem", padding: "0.75rem 0", flexWrap: "nowrap", overflowX: "auto" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  flexShrink: 0,
                  padding: "0.4rem 1rem",
                  borderRadius: "999px",
                  border: activeCategory === cat.key ? `1px solid ${GOLD}` : `1px solid rgba(255,255,255,0.1)`,
                  background: activeCategory === cat.key ? `rgba(196,98,45,0.15)` : "transparent",
                  color: activeCategory === cat.key ? GOLD : MUTED,
                  fontFamily: fontBase,
                  fontSize: "0.8rem",
                  fontWeight: activeCategory === cat.key ? 700 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {(cat as any).icon && <span style={{ marginLeft: "0.3rem" }}>{(cat as any).icon}</span>}
                {(cat as any).label || (cat as any).labelAr}
              </button>
            ))}
          </div>
        </div>
      )}

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
                  onClick={() => navigate(`/directory/${e.id}`)}
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

      {/* ── ABOUT TAB ── */}
      {tab === "about" && (
        <div style={{ background: BG, paddingBottom: "5rem" }}>

          {/* ── HERO INTRO ── */}
          <div style={{ borderBottom: `1px solid ${BORDER}`, paddingTop: "3.5rem", paddingBottom: "3rem" }}>
            <div className="container" style={{ maxWidth: "900px" }}>
              <p style={{ color: GOLD, fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1rem", fontFamily: fontBase }}>Saudi Cultural Directory · DalilCulture</p>
              <h1 style={{ fontFamily: fontBase, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 900, color: "var(--surrah-text-primary)", lineHeight: 1.15, marginBottom: "1.5rem" }}>
                الدليل الثقافي السعودي
              </h1>
              <p style={{ color: MUTED, fontSize: "1.05rem", lineHeight: 1.9, maxWidth: "700px" }}>
                منصة وطنية متخصصة في توثيق وربط واستعراض المشهد الثقافي والإبداعي في المملكة العربية السعودية، عبر جمع الجهات الثقافية والإبداعية والمبادرات والمساحات والمجتمعات والأفراد الفاعلين في مكان واحد، ضمن تجربة رقمية منظمة تعكس ثراء الثقافة السعودية وتنوعها.
              </p>
              <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.85, maxWidth: "700px", marginTop: "1rem" }}>
                يعمل الدليل كمرجع حيّ للمشهد الثقافي، يساعد المهتمين والممارسين والجهات والباحثين والمستثمرين والجمهور على اكتشاف القطاع الثقافي والوصول إلى مكوناته بسهولة ووضوح.
              </p>
            </div>
          </div>

          {/* ── VISION / MISSION / PHILOSOPHY ── */}
          <div className="container" style={{ maxWidth: "900px", paddingTop: "3rem", paddingBottom: "3rem", borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {[
                { label: "الرؤية", icon: "◎", body: "أن يصبح الدليل الثقافي السعودي المرجع الرقمي الأهم للمشهد الثقافي والإبداعي في المملكة العربية السعودية." },
                { label: "الرسالة", icon: "◈", body: "تمكين الوصول إلى الثقافة السعودية عبر منصة تجمع وتوثّق وتربط الجهات الثقافية والإبداعية، وتسهم في تعزيز التواصل والتكامل والنمو داخل القطاع الثقافي." },
                { label: "الفلسفة", icon: "◇", body: "نؤمن أن الثقافة ليست مجرد فعاليات أو منتجات إبداعية، بل منظومة متكاملة من الأشخاص والجهات والمساحات والأفكار والتجارب التي تشكّل هوية المجتمع وتعبّر عن تطوره. الثقافة حين تكون مرئية تصبح أقرب، وحين تكون مترابطة تصبح أقوى." },
              ].map((item) => (
                <div key={item.label} style={{ background: CARD, border: `1px solid ${CARD_BORDER}`, borderTop: `3px solid ${GOLD}`, padding: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                    <span style={{ color: GOLD, fontSize: "1.1rem" }}>{item.icon}</span>
                    <span style={{ color: GOLD, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: fontBase, fontWeight: 700 }}>{item.label}</span>
                  </div>
                  <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.9 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── GOALS ── */}
          <div className="container" style={{ maxWidth: "900px", paddingTop: "3rem", paddingBottom: "3rem", borderBottom: `1px solid ${BORDER}` }}>
            <p style={{ color: GOLD, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem", fontFamily: fontBase }}>الأهداف</p>
            <h2 style={{ fontFamily: fontBase, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--surrah-text-primary)", marginBottom: "2rem" }}>ماذا يسعى الدليل إلى تحقيقه؟</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {[
                { num: "01", title: "توثيق المشهد الثقافي", body: "بناء قاعدة بيانات حديثة وشاملة للجهات والمبادرات والمجتمعات والمساحات الثقافية والإبداعية في المملكة." },
                { num: "02", title: "تسهيل الوصول", body: "تمكين الأفراد والمهتمين والباحثين من اكتشاف الجهات الثقافية والوصول إليها بسهولة عبر تصنيفات ذكية وتجربة استخدام واضحة." },
                { num: "03", title: "دعم الترابط الثقافي", body: "تعزيز التواصل والتكامل بين الجهات الثقافية والمبدعين والمجتمعات وصناع القطاع." },
                { num: "04", title: "إبراز التنوع الثقافي", body: "عكس ثراء المشهد الثقافي في مختلف مناطق المملكة وتخصصاته وممارساته." },
                { num: "05", title: "دعم الاقتصاد الإبداعي", body: "المساهمة في تنشيط القطاع الثقافي عبر زيادة الظهور والوصول وفرص التعاون والشراكات." },
                { num: "06", title: "بناء مرجع موثوق", body: "توفير مصدر موثوق ومحدّث للبيانات والمعلومات المتعلقة بالقطاع الثقافي السعودي." },
              ].map((goal) => (
                <div key={goal.num} style={{ display: "flex", gap: "1.25rem", padding: "1.5rem", background: CARD, border: `1px solid ${CARD_BORDER}` }}>
                  <span style={{ color: GOLD, fontFamily: fontBase, fontWeight: 900, fontSize: "1.4rem", lineHeight: 1, flexShrink: 0, opacity: 0.6 }}>{goal.num}</span>
                  <div>
                    <p style={{ fontFamily: fontBase, fontWeight: 700, color: "var(--surrah-text-primary)", fontSize: "0.95rem", marginBottom: "0.4rem" }}>{goal.title}</p>
                    <p style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.8 }}>{goal.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── VALUES ── */}
          <div className="container" style={{ maxWidth: "900px", paddingTop: "3rem", paddingBottom: "3rem", borderBottom: `1px solid ${BORDER}` }}>
            <p style={{ color: GOLD, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem", fontFamily: fontBase }}>القيم</p>
            <h2 style={{ fontFamily: fontBase, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--surrah-text-primary)", marginBottom: "2rem" }}>ما يحكم عملنا</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {[
                { val: "الوضوح", desc: "تنظيم المعلومات وتقديمها بطريقة سهلة ودقيقة" },
                { val: "الترابط", desc: "ربط عناصر المشهد الثقافي وتعزيز فرص التعاون" },
                { val: "الأصالة", desc: "عكس الهوية الثقافية السعودية بروح معاصرة" },
                { val: "الشمول", desc: "تمثيل مختلف التخصصات والمناطق والجهات الثقافية" },
                { val: "التطور", desc: "بناء منصة حية تتطور مع نمو القطاع الثقافي السعودي" },
              ].map((v) => (
                <div key={v.val} style={{ background: CARD, border: `1px solid ${CARD_BORDER}`, padding: "1.25rem 1.5rem", minWidth: "200px", flex: "1" }}>
                  <p style={{ fontFamily: fontBase, fontWeight: 800, color: GOLD, fontSize: "1rem", marginBottom: "0.35rem" }}>{v.val}</p>
                  <p style={{ color: MUTED, fontSize: "0.82rem", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── WHAT DOES THE DIRECTORY INCLUDE ── */}
          <div className="container" style={{ maxWidth: "900px", paddingTop: "3rem", paddingBottom: "3rem", borderBottom: `1px solid ${BORDER}` }}>
            <p style={{ color: GOLD, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem", fontFamily: fontBase }}>محتوى الدليل</p>
            <h2 style={{ fontFamily: fontBase, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--surrah-text-primary)", marginBottom: "2rem" }}>ماذا يشمل الدليل؟</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              {[
                { cat: "الجهات الثقافية", items: ["الهيئات والمؤسسات", "الجمعيات الثقافية", "النوادي الأدبية", "المتاحف", "المكتبات"] },
                { cat: "الجهات الإبداعية", items: ["الاستوديوهات", "المساحات الإبداعية", "المعارض", "شركات الإنتاج", "وكالات التصميم"] },
                { cat: "المجتمعات والمبادرات", items: ["المجتمعات الثقافية", "المبادرات المستقلة", "البرامج والمشاريع النوعية"] },
                { cat: "الأفراد والممارسون", items: ["الفنانون", "الكتّاب", "المصممون", "الموسيقيون", "الحرفيون", "صنّاع المحتوى"] },
                { cat: "الجهات الداعمة", items: ["الصندوق الثقافي", "الجهات التمويلية", "الحاضنات", "المسرعات", "برامج الدعم"] },
              ].map((section) => (
                <div key={section.cat} style={{ background: CARD, border: `1px solid ${CARD_BORDER}`, padding: "1.5rem" }}>
                  <p style={{ fontFamily: fontBase, fontWeight: 800, color: GOLD, fontSize: "0.85rem", marginBottom: "0.75rem", letterSpacing: "0.02em" }}>{section.cat}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {section.items.map((item) => (
                      <li key={item} style={{ color: MUTED, fontSize: "0.82rem", lineHeight: 1.8, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ color: GOLD, fontSize: "0.5rem" }}>&#9632;</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── SLOGAN + FUTURE ── */}
          <div className="container" style={{ maxWidth: "900px", paddingTop: "3rem", paddingBottom: "3rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "2rem" }}>
              {/* Slogan */}
              <div style={{ background: `rgba(196,98,45,0.06)`, border: `1px solid rgba(196,98,45,0.2)`, padding: "2.5rem" }}>
                <p style={{ color: GOLD, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem", fontFamily: fontBase }}>الشعار التعريفي</p>
                <p style={{ fontFamily: fontBase, fontWeight: 900, color: "var(--surrah-text-primary)", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", lineHeight: 1.4, marginBottom: "0.75rem" }}>
                  بوابتك للمشهد الثقافي السعودي
                </p>
                <p style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.8 }}>الدليل الثقافي السعودي ليس مجرد منصة بيانات، بل مشروع يسعى إلى رسم خريطة الثقافة السعودية وربط عناصرها وتقديمها بصورة حديثة تعكس حجم الحراك الثقافي الذي تعيشه المملكة اليوم.</p>
              </div>
              {/* Future */}
              <div style={{ background: CARD, border: `1px solid ${CARD_BORDER}`, padding: "2.5rem" }}>
                <p style={{ color: GOLD, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem", fontFamily: fontBase }}>مستقبل المنصة</p>
                <p style={{ fontFamily: fontBase, fontWeight: 800, color: "var(--surrah-text-primary)", fontSize: "1rem", marginBottom: "1rem" }}>لا يقتصر دور الدليل على كونه منصة استعراض، بل يمتد ليصبح:</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["خريطة تفاعلية للمشهد الثقافي", "منصة بيانات وتحليلات", "توصيات ذكية", "تقويم ثقافي موحّد", "عضويات احترافية للجهات", "لوحة بيانات للقطاع الثقافي", "تطبيق جوال", "API للجهات والشركاء"].map((f) => (
                    <li key={f} style={{ color: MUTED, fontSize: "0.82rem", lineHeight: 1.9, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ color: GOLD, fontSize: "0.5rem" }}>&#9632;</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="container" style={{ maxWidth: "900px", paddingBottom: "2rem" }}>
            <div style={{ background: `rgba(196,98,45,0.06)`, border: `1px solid rgba(196,98,45,0.2)`, padding: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: fontBase, fontWeight: 700, color: "var(--surrah-text-primary)", fontSize: "1.1rem", marginBottom: "0.3rem" }}>هل جهتك غائبة عن الدليل؟</p>
                <p style={{ color: MUTED, fontSize: "0.85rem" }}>سجّل جهتك وكن جزءاً من المشهد الثقافي السعودي الموثّق.</p>
              </div>
              <button onClick={() => setTab("submit")} style={{ background: GOLD, color: "#fff", border: "none", padding: "0.75rem 1.75rem", fontFamily: fontBase, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", letterSpacing: "0.05em" }}>
                سجّل جهتك ←
              </button>
            </div>
          </div>
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
              <div>
                <label style={labelStyle}>اسم الجهة <span style={{ color: "#e57373" }}>*</span></label>
                <input
                  id="form-field-name"
                  type="text"
                  placeholder="مثال: مجتمع سرة"
                  value={form.name}
                  onChange={(e) => { setForm((prev) => ({ ...prev, name: e.target.value })); if (formErrors.name) setFormErrors((p) => ({ ...p, name: "" })); }}
                  style={{ ...formInputStyle, ...(formErrors.name ? { borderColor: "#e57373" } : {}) }}
                />
                {formErrors.name && <p id="form-error-name" style={{ color: "#e57373", fontSize: "0.75rem", marginTop: "0.25rem" }}>{formErrors.name}</p>}
              </div>
              <div>
                <label style={labelStyle}>سنة التأسيس</label>
                <input type="text" placeholder="مثال: 2018" value={form.year} onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))} style={formInputStyle} />
              </div>
              {/* حقل التصنيف الموحّد */}
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>تصنيف الجهة <span style={{ color: "#e57373" }}>*</span></label>
                <select
                  id="form-field-category"
                  value={form.category}
                  onChange={(e) => { setForm((prev) => ({ ...prev, category: e.target.value })); if (formErrors.category) setFormErrors((p) => ({ ...p, category: "" })); }}
                  style={{ ...formInputStyle, background: "#0d0d0d", ...(formErrors.category ? { borderColor: "#e57373" } : {}) }}
                >
                  <option value="" style={{ background: "#111" }}>اختر تصنيف الجهة...</option>
                  {CULTURAL_CATEGORIES.map((cat) => (
                    <option key={cat.key} value={cat.key} style={{ background: "#111" }}>
                      {cat.icon} {cat.labelAr}
                    </option>
                  ))}
                </select>
                {formErrors.category && <p id="form-error-category" style={{ color: "#e57373", fontSize: "0.75rem", marginTop: "0.25rem" }}>{formErrors.category}</p>}
              </div>
              <div>
                <label style={labelStyle}>نوع الجهة</label>
                <select value={form.type} onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))} style={{ ...formInputStyle, background: "#0d0d0d" }}>
                  {["", "مجتمع", "مساحة إبداعية", "جمعية", "مقهى ثقافي", "مبادرة", "استوديو", "مؤسسة داعمة", "متجر"].map((o) => <option key={o} value={o} style={{ background: "#111" }}>{o || "اختر النوع..."}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>المدينة <span style={{ color: "#e57373" }}>*</span></label>
                <select
                  value={form.city}
                  onChange={(e) => { setForm((prev) => ({ ...prev, city: e.target.value })); if (formErrors.city) setFormErrors((p) => ({ ...p, city: "" })); }}
                  style={{ ...formInputStyle, background: "#0d0d0d", ...(formErrors.city ? { borderColor: "#e57373" } : {}) }}
                >
                  {CITIES.map((o) => <option key={o} value={o} style={{ background: "#111" }}>{o || "اختر المدينة..."}</option>)}
                </select>
                {formErrors.city && <p style={{ color: "#e57373", fontSize: "0.75rem", marginTop: "0.25rem" }}>{formErrors.city}</p>}
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>وصف مختصر <span style={{ color: "#e57373" }}>*</span></label>
                <textarea
                  placeholder="اكتب وصفاً مختصراً عن جهتك، رسالتها، وأبرز أنشطتها..."
                  value={form.desc}
                  onChange={(e) => { setForm((prev) => ({ ...prev, desc: e.target.value })); if (formErrors.desc) setFormErrors((p) => ({ ...p, desc: "" })); }}
                  style={{ ...formInputStyle, minHeight: "90px", resize: "vertical", ...(formErrors.desc ? { borderColor: "#e57373" } : {}) }}
                />
                {formErrors.desc && <p style={{ color: "#e57373", fontSize: "0.75rem", marginTop: "0.25rem" }}>{formErrors.desc}</p>}
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

              {/* معلومات التواصل المباشر */}
              <div style={{ gridColumn: "span 2", paddingBottom: "0.5rem", borderBottom: `1px solid ${BORDER}`, marginTop: "0.5rem", marginBottom: "0.25rem" }}>
                <span style={{ fontFamily: fontBase, fontSize: "0.75rem", fontWeight: 700, color: GOLD, textTransform: "uppercase" }}>معلومات التواصل</span>
              </div>
              <div>
                <label style={labelStyle}>الموقع الإلكتروني</label>
                <input type="url" placeholder="https://example.com" value={form.website} onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))} style={formInputStyle} />
              </div>
              <div>
                <label style={labelStyle}>رقم التواصل المباشر</label>
                <input type="tel" placeholder="+966 5X XXX XXXX" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} style={formInputStyle} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>العنوان / اللوكيشن</label>
                <input type="text" placeholder="مثال: حي السفارات، شارع التحلية، برج المملكة" value={form.address} onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))} style={formInputStyle} />
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

            {submitError && (
              <div style={{ background: "rgba(229,115,115,0.1)", border: "1px solid rgba(229,115,115,0.3)", borderRadius: "6px", padding: "0.75rem 1rem", color: "#e57373", fontSize: "0.85rem", marginTop: "1rem", fontFamily: fontBase }}>
                {submitError}
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{ background: isSubmitting ? "rgba(196,98,45,0.5)" : GOLD, color: "white", border: "none", borderRadius: "0", padding: "0.875rem 2rem", fontFamily: fontBase, fontSize: "0.95rem", fontWeight: 700, cursor: isSubmitting ? "not-allowed" : "pointer", width: "100%", marginTop: "1.75rem", transition: "background 0.2s" }}
              onMouseEnter={(e) => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.background = GOLD_HOVER; }}
              onMouseLeave={(e) => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.background = GOLD; }}
            >
              {isSubmitting ? "جاري الإرسال..." : "إضافة للدليل"}
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
              {selectedEntity.tags.map((t: string) => (
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
