import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "ar" | "en" | "zh";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ─── Translation Dictionary ───────────────────────────────────────────────────
const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navbar
    "nav.about": "عن سُرّة",
    "nav.communities": "مجتمعاتنا",
    "nav.services": "خدماتنا",
    "nav.media": "المركز الإعلامي",
    "nav.memberships": "عضويات",
    "nav.directory": "دليل سُرّة",
    "nav.store": "المتجر",
    "nav.create_community": "أنشئ مجتمعك",
    "nav.all_communities": "جميع المجتمعات",
    "nav.all_services": "جميع الخدمات",
    "nav.news": "أحدث الأخبار",
    "nav.identity": "هوية سُرّة",
    // Services dropdown
    "service.communities": "صناعة المجتمعات",
    "service.programs": "إنشاء البرامج الثقافية",
    "service.events": "تنظيم الفعاليات الحية",
    "service.audience": "توفير الجمهور المستهدف",
    // Memberships dropdown
    "membership.bidaya": "سُرّة بداية",
    "membership.wasl": "سُرّة وصل",
    "membership.nukhba": "سُرّة نخبة",
    "membership.majlis": "سُرّة مجلس",
    // Home page
    "home.hero.h1": "نبني سرداً ثقافياً ملهماً",
    "home.hero.h1b": "يعكس قيمنا الأصيلة",
    "home.hero.sub": "نصمم ونبني المجتمعات الثقافية والإبداعية التي تُحدث أثرًا مستداما",
    "home.hero.cta": "تواصل معنا ↗",
    "home.communities.title": "مجتمعاتنا",
    "home.communities.sub": "مجتمعات ثقافية متخصصة تجمع أصحاب الاهتمامات المشتركة",
    "home.why.title": "لماذا سُرّة؟",
    "home.events.title": "الفعاليات القادمة",
    "home.partners.title": "شركاؤنا",
    "home.cta.h2": "نصوغ سردًا ثقافيًا مُلهمًا، يستمد أصالته من الدرعية ويجسد قيمنا في حضورٍ حيّ ومعاصر",
    "home.cta.btn": "انضم إلينا",
    "home.team.title": "فريقنا",
    // Footer
    "footer.about_title": "من نحن",
    "footer.services_title": "خدماتنا",
    "footer.communities_title": "مجتمعاتنا",
    "footer.quick_title": "روابط سريعة",
    "footer.follow": "تابعنا",
    "footer.rights": "جميع الحقوق محفوظة © سُرّة",
    "footer.desc": "منصة ثقافية سعودية تصنع مجتمعات إبداعية ملهمة من قلب الدرعية",
    "footer.about": "عن سُرّة",
    "footer.vision": "رؤيتنا",
    "footer.mission": "رسالتنا",
    "footer.team": "فريقنا",
    "footer.service1": "صناعة المجتمعات",
    "footer.service2": "إنشاء البرامج الثقافية",
    "footer.service3": "تنظيم الفعاليات الحية",
    "footer.service4": "توفير الجمهور المستهدف",
    "footer.join": "انضم إلينا",
    "footer.directory": "دليل سُرّة",
    "footer.store": "المتجر",
    "footer.contact": "تواصل معنا",
    // About
    "about.hero.title": "عن سُرّة",
    "about.hero.sub": "منصة ثقافية سعودية تصنع مجتمعات إبداعية ملهمة",
    // Communities
    "communities.title": "مجتمعاتنا",
    "communities.sub": "اكتشف مجتمعاتنا الثقافية المتخصصة",
    "communities.join": "انضم الآن",
    "communities.learn_more": "اعرف أكثر",
    // Directory
    "directory.title": "دليل سُرّة",
    "directory.sub": "دليل الجهات الثقافية السعودية",
    "directory.add": "سجّل جهتك",
    "directory.search": "ابحث عن جهة...",
    // Store
    "store.title": "متجر سُرّة",
    "store.sub": "منتجات ثقافية مختارة بعناية",
    "store.all": "الكل",
    "store.buy": "اشترِ الآن",
    "store.out_of_stock": "نفد المخزون",
    "store.visit": "زيارة المتجر",
    // Join
    "join.title": "عضويات سُرّة",
    "join.sub": "اختر الخطة المناسبة لك",
    "join.monthly": "شهري",
    "join.annual": "سنوي",
    "join.join_now": "انضم الآن",
    "join.contact": "تواصل معنا",
    // Register
    "register.title": "سجّل في سُرّة",
    "register.next": "التالي",
    "register.back": "رجوع",
    "register.submit": "إرسال",
    // Media
    "media.title": "المركز الإعلامي",
    "media.sub": "أخبار وهوية سُرّة",
    "media.news": "أحدث الأخبار",
    "media.identity": "هوية سُرّة",
    "media.guidelines": "القايد لاين",
    "media.profile": "البروفايل",
    "media.read_more": "اقرأ المزيد",
    // Common
    "common.coming_soon": "قريباً",
    "common.back": "رجوع",
    "common.close": "إغلاق",
    "common.download": "تحميل",
    "common.view": "عرض",
  },

  en: {
    // Navbar
    "nav.about": "About Surra",
    "nav.communities": "Our Communities",
    "nav.services": "Services",
    "nav.media": "Media Center",
    "nav.memberships": "Memberships",
    "nav.directory": "Surra Directory",
    "nav.store": "Store",
    "nav.create_community": "Create Community",
    "nav.all_communities": "All Communities",
    "nav.all_services": "All Services",
    "nav.news": "Latest News",
    "nav.identity": "Surra Identity",
    // Services dropdown
    "service.communities": "Community Building",
    "service.programs": "Cultural Programs",
    "service.events": "Live Events",
    "service.audience": "Target Audience",
    // Memberships dropdown
    "membership.bidaya": "Surra Bidaya",
    "membership.wasl": "Surra Wasl",
    "membership.nukhba": "Surra Nukhba",
    "membership.majlis": "Surra Majlis",
    // Home page
    "home.hero.h1": "Building an Inspiring",
    "home.hero.h1b": "Cultural Narrative",
    "home.hero.sub": "We design and build cultural and creative communities that create lasting impact",
    "home.hero.cta": "Contact Us ↗",
    "home.communities.title": "Our Communities",
    "home.communities.sub": "Specialized cultural communities connecting people with shared interests",
    "home.why.title": "Why Surra?",
    "home.events.title": "Upcoming Events",
    "home.partners.title": "Our Partners",
    "home.cta.h2": "We craft an inspiring cultural narrative rooted in Diriyah, embodying our values in a vibrant and contemporary presence",
    "home.cta.btn": "Join Us",
    "home.team.title": "Our Team",
    // Footer
    "footer.about_title": "About",
    "footer.services_title": "Services",
    "footer.communities_title": "Communities",
    "footer.quick_title": "Quick Links",
    "footer.follow": "Follow Us",
    "footer.rights": "All Rights Reserved © Surra",
    "footer.desc": "A Saudi cultural platform creating inspiring creative communities from the heart of Diriyah",
    "footer.about": "About Surra",
    "footer.vision": "Our Vision",
    "footer.mission": "Our Mission",
    "footer.team": "Our Team",
    "footer.service1": "Community Building",
    "footer.service2": "Cultural Programs",
    "footer.service3": "Live Events",
    "footer.service4": "Target Audience",
    "footer.join": "Join Us",
    "footer.directory": "Surra Directory",
    "footer.store": "Store",
    "footer.contact": "Contact Us",
    // About
    "about.hero.title": "About Surra",
    "about.hero.sub": "A Saudi cultural platform creating inspiring creative communities",
    // Communities
    "communities.title": "Our Communities",
    "communities.sub": "Discover our specialized cultural communities",
    "communities.join": "Join Now",
    "communities.learn_more": "Learn More",
    // Directory
    "directory.title": "Surra Directory",
    "directory.sub": "Directory of Saudi Cultural Entities",
    "directory.add": "Register Your Organization",
    "directory.search": "Search for an organization...",
    // Store
    "store.title": "Surra Store",
    "store.sub": "Carefully curated cultural products",
    "store.all": "All",
    "store.buy": "Buy Now",
    "store.out_of_stock": "Out of Stock",
    "store.visit": "Visit Store",
    // Join
    "join.title": "Surra Memberships",
    "join.sub": "Choose the right plan for you",
    "join.monthly": "Monthly",
    "join.annual": "Annual",
    "join.join_now": "Join Now",
    "join.contact": "Contact Us",
    // Register
    "register.title": "Register with Surra",
    "register.next": "Next",
    "register.back": "Back",
    "register.submit": "Submit",
    // Media
    "media.title": "Media Center",
    "media.sub": "Surra News & Identity",
    "media.news": "Latest News",
    "media.identity": "Surra Identity",
    "media.guidelines": "Brand Guidelines",
    "media.profile": "Profile",
    "media.read_more": "Read More",
    // Common
    "common.coming_soon": "Coming Soon",
    "common.back": "Back",
    "common.close": "Close",
    "common.download": "Download",
    "common.view": "View",
  },

  zh: {
    // Navbar
    "nav.about": "关于苏拉",
    "nav.communities": "我们的社区",
    "nav.services": "服务",
    "nav.media": "媒体中心",
    "nav.memberships": "会员资格",
    "nav.directory": "苏拉目录",
    "nav.store": "商店",
    "nav.create_community": "创建社区",
    "nav.all_communities": "所有社区",
    "nav.all_services": "所有服务",
    "nav.news": "最新新闻",
    "nav.identity": "苏拉品牌",
    // Services dropdown
    "service.communities": "社区建设",
    "service.programs": "文化项目",
    "service.events": "现场活动",
    "service.audience": "目标受众",
    // Memberships dropdown
    "membership.bidaya": "苏拉入门",
    "membership.wasl": "苏拉连接",
    "membership.nukhba": "苏拉精英",
    "membership.majlis": "苏拉议会",
    // Home page
    "home.hero.h1": "构建鼓舞人心的",
    "home.hero.h1b": "文化叙事",
    "home.hero.sub": "我们设计和建设创造持久影响的文化和创意社区",
    "home.hero.cta": "联系我们 ↗",
    "home.communities.title": "我们的社区",
    "home.communities.sub": "连接有共同兴趣的人的专业文化社区",
    "home.why.title": "为什么选择苏拉？",
    "home.events.title": "即将举行的活动",
    "home.partners.title": "我们的合作伙伴",
    "home.cta.h2": "我们打造扎根于德里耶的鼓舞人心的文化叙事，以充满活力的当代形式体现我们的价值观",
    "home.cta.btn": "加入我们",
    "home.team.title": "我们的团队",
    // Footer
    "footer.about_title": "关于",
    "footer.services_title": "服务",
    "footer.communities_title": "社区",
    "footer.quick_title": "快速链接",
    "footer.follow": "关注我们",
    "footer.rights": "版权所有 © 苏拉",
    "footer.desc": "沙特文化平台，从德里耶的心脏创建鼓舞人心的创意社区",
    "footer.about": "关于苏拉",
    "footer.vision": "我们的愿景",
    "footer.mission": "我们的使命",
    "footer.team": "我们的团队",
    "footer.service1": "社区建设",
    "footer.service2": "文化项目",
    "footer.service3": "现场活动",
    "footer.service4": "目标受众",
    "footer.join": "加入我们",
    "footer.directory": "苏拉目录",
    "footer.store": "商店",
    "footer.contact": "联系我们",
    // About
    "about.hero.title": "关于苏拉",
    "about.hero.sub": "沙特文化平台，创建鼓舞人心的创意社区",
    // Communities
    "communities.title": "我们的社区",
    "communities.sub": "探索我们的专业文化社区",
    "communities.join": "立即加入",
    "communities.learn_more": "了解更多",
    // Directory
    "directory.title": "苏拉目录",
    "directory.sub": "沙特文化机构目录",
    "directory.add": "注册您的机构",
    "directory.search": "搜索机构...",
    // Store
    "store.title": "苏拉商店",
    "store.sub": "精心挑选的文化产品",
    "store.all": "全部",
    "store.buy": "立即购买",
    "store.out_of_stock": "缺货",
    "store.visit": "访问商店",
    // Join
    "join.title": "苏拉会员资格",
    "join.sub": "选择适合您的计划",
    "join.monthly": "月度",
    "join.annual": "年度",
    "join.join_now": "立即加入",
    "join.contact": "联系我们",
    // Register
    "register.title": "注册苏拉",
    "register.next": "下一步",
    "register.back": "返回",
    "register.submit": "提交",
    // Media
    "media.title": "媒体中心",
    "media.sub": "苏拉新闻与品牌",
    "media.news": "最新新闻",
    "media.identity": "苏拉品牌",
    "media.guidelines": "品牌指南",
    "media.profile": "简介",
    "media.read_more": "阅读更多",
    // Common
    "common.coming_soon": "即将推出",
    "common.back": "返回",
    "common.close": "关闭",
    "common.download": "下载",
    "common.view": "查看",
  },
};

// ─── Provider ─────────────────────────────────────────────────────────────────
interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLang?: Language;
}

export function LanguageProvider({ children, defaultLang = "ar" }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("surrah-lang");
      if (stored === "ar" || stored === "en" || stored === "zh") return stored as Language;
    } catch {}
    return defaultLang;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    try {
      localStorage.setItem("surrah-lang", lang);
    } catch {}
  }, [lang]);

  const setLang = (l: Language) => setLangState(l);

  const t = (key: string): string => {
    return translations[lang][key] ?? translations["ar"][key] ?? key;
  };

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
