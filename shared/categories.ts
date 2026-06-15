/**
 * Shared cultural entity categories — used by both:
 *   - Admin CMS (AdminDirectory.tsx)
 *   - Public Directory page (Directory.tsx)
 *   - CreateCommunity submission form
 *
 * Single source of truth so filters always match stored values.
 */

export interface CategoryDef {
  key: string;       // stored in DB
  labelAr: string;   // Arabic display label
  labelEn: string;   // English display label
  icon?: string;     // optional emoji icon
}

export const CULTURAL_CATEGORIES: CategoryDef[] = [
  { key: "الجهات الحكومية",        labelAr: "الجهات الحكومية",        labelEn: "Government Entities",       icon: "🏛️" },
  { key: "الجهات الثقافية",        labelAr: "الجهات الثقافية",        labelEn: "Cultural Organizations",    icon: "🎭" },
  { key: "الجهات الإبداعية",       labelAr: "الجهات الإبداعية",       labelEn: "Creative Entities",         icon: "🎨" },
  { key: "المساحات الإبداعية",     labelAr: "المساحات الإبداعية",     labelEn: "Creative Spaces",           icon: "🏢" },
  { key: "الجهات الداعمة",         labelAr: "الجهات الداعمة",         labelEn: "Supporting Organizations",  icon: "🤝" },
  { key: "النوادي الأدبية",        labelAr: "النوادي الأدبية",        labelEn: "Literary Clubs",            icon: "📚" },
  { key: "المجتمعات والمبادرات",   labelAr: "المجتمعات والمبادرات",   labelEn: "Communities & Initiatives", icon: "🌱" },
  { key: "المبادرات المستقلة",     labelAr: "المبادرات المستقلة",     labelEn: "Independent Initiatives",   icon: "⚡" },
  { key: "الفعاليات المتكررة",     labelAr: "الفعاليات المتكررة",     labelEn: "Recurring Events",          icon: "📅" },
  { key: "المجتمعات الثقافية",     labelAr: "المجتمعات الثقافية",     labelEn: "Cultural Communities",      icon: "👥" },
  { key: "الأفراد والممارسون",     labelAr: "الأفراد والممارسون",     labelEn: "Individuals & Practitioners",icon: "🧑‍🎨" },
  { key: "أخرى",                   labelAr: "أخرى",                   labelEn: "Other",                     icon: "🔖" },
];

/** Just the Arabic keys — for use in select dropdowns */
export const CATEGORY_KEYS = CULTURAL_CATEGORIES.map((c) => c.key);

/** All-category option for filter tabs */
export const ALL_CATEGORY = { key: "الكل", labelAr: "الكل", labelEn: "All", icon: "✦" };
