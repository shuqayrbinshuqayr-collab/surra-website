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
    // Services page
    "services.hero.title": "خدماتنا",
    "services.hero.sub": "نصمّم ونبني ونشغّل المجتمعات الثقافية والإبداعية",
    "services.s1.title": "صناعة المجتمعات",
    "services.s1.desc": "نصمّم ونبني مجتمعات ثقافية وإبداعية متخصصة تجمع أصحاب الاهتمامات المشتركة",
    "services.s2.title": "البرامج الثقافية",
    "services.s2.desc": "نصمّم برامج ثقافية تعليمية وتثقيفية تخدم أهداف المجتمع",
    "services.s3.title": "تنظيم الفعاليات",
    "services.s3.desc": "ننظّم فعاليات حية تجمع المبدعين وتصنع أثراً حقيقياً",
    "services.s4.title": "توفير الجمهور",
    "services.s4.desc": "نساعد الجهات على الوصول إلى جمهورها المستهدف بفعالية",
    "services.cta": "ابدأ معنا",
    // Contact page
    "contact.hero.title": "تواصل معنا",
    "contact.hero.sub": "نحن هنا للإجابة على استفساراتك",
    "contact.name": "الاسم",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "رقم الجوال",
    "contact.reason": "سبب التواصل",
    "contact.message": "رسالتك",
    "contact.send": "إرسال الرسالة",
    "contact.success": "تم إرسال رسالتك بنجاح",
    "contact.address": "العنوان",
    "contact.location": "الدرعية، الرياض، المملكة العربية السعودية",
    "contact.follow": "تابعنا",
    // About extended
    "about.vision.title": "رؤيتنا",
    "about.vision.text": "أن تكون سُرّة المرجع الأول لصناعة المجتمعات الثقافية في المملكة",
    "about.mission.title": "رسالتنا",
    "about.mission.text": "تصميم وبناء وتشغيل مجتمعات ثقافية وإبداعية تُحدث أثراً مستداماً",
    "about.values.title": "قيمنا",
    "about.cta.title": "انضم إلينا",
    "about.cta.sub": "كن جزءاً من مجتمع سُرّة الثقافي",
    // Communities extended
    "communities.hero.title": "مجتمعاتنا",
    "communities.hero.sub": "مجتمعات ثقافية متخصصة تجمع أصحاب الاهتمامات المشتركة",
    // Join extended
    "join.hero.title": "عضويات سُرّة",
    "join.hero.sub": "اختر الخطة المناسبة لك",
    "join.save": "وفّر مع الاشتراك السنوي",
    "join.features": "المزايا",
    "join.compare": "مقارنة الخطط",
    "join.faq": "الأسئلة الشائعة",
    // Directory extended
    "directory.filter": "تصفية حسب الفئة",
    "directory.all": "الكل",
    "directory.no_results": "لا توجد نتائج",
    "directory.website": "زيارة الموقع",
    "directory.register_title": "سجّل جهتك",
    "directory.register_sub": "أضف جهتك الثقافية إلى دليل سُرّة",
    // Common
    "common.coming_soon": "قريباً",
    "common.back": "رجوع",
    "common.close": "إغلاق",
    "common.download": "تحميل",
    "common.view": "عرض",
    "common.learn_more": "اعرف أكثر",
    "common.join_now": "انضم الآن",
    "common.contact_us": "تواصل معنا",
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
    // Services page
    "services.hero.title": "Our Services",
    "services.hero.sub": "We design, build and operate cultural and creative communities",
    "services.s1.title": "Community Building",
    "services.s1.desc": "We design and build specialized cultural communities connecting people with shared interests",
    "services.s2.title": "Cultural Programs",
    "services.s2.desc": "We design educational and cultural programs that serve community goals",
    "services.s3.title": "Event Organization",
    "services.s3.desc": "We organize live events that bring creatives together and create real impact",
    "services.s4.title": "Audience Development",
    "services.s4.desc": "We help organizations reach their target audience effectively",
    "services.cta": "Start With Us",
    // Contact page
    "contact.hero.title": "Contact Us",
    "contact.hero.sub": "We are here to answer your questions",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.phone": "Phone Number",
    "contact.reason": "Reason for Contact",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.success": "Your message was sent successfully",
    "contact.address": "Address",
    "contact.location": "Diriyah, Riyadh, Saudi Arabia",
    "contact.follow": "Follow Us",
    // About extended
    "about.vision.title": "Our Vision",
    "about.vision.text": "For Surra to be the primary reference for building cultural communities in the Kingdom",
    "about.mission.title": "Our Mission",
    "about.mission.text": "Designing, building and operating cultural and creative communities that create lasting impact",
    "about.values.title": "Our Values",
    "about.cta.title": "Join Us",
    "about.cta.sub": "Be part of the Surra cultural community",
    // Communities extended
    "communities.hero.title": "Our Communities",
    "communities.hero.sub": "Specialized cultural communities connecting people with shared interests",
    // Join extended
    "join.hero.title": "Surra Memberships",
    "join.hero.sub": "Choose the right plan for you",
    "join.save": "Save with annual subscription",
    "join.features": "Features",
    "join.compare": "Compare Plans",
    "join.faq": "Frequently Asked Questions",
    // Directory extended
    "directory.filter": "Filter by Category",
    "directory.all": "All",
    "directory.no_results": "No results found",
    "directory.website": "Visit Website",
    "directory.register_title": "Register Your Organization",
    "directory.register_sub": "Add your cultural entity to the Surra directory",
    // Common
    "common.coming_soon": "Coming Soon",
    "common.back": "Back",
    "common.close": "Close",
    "common.download": "Download",
    "common.view": "View",
    "common.learn_more": "Learn More",
    "common.join_now": "Join Now",
    "common.contact_us": "Contact Us",
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
    // Services page
    "services.hero.title": "我们的服务",
    "services.hero.sub": "我们设计、建设并运营文化和创意社区",
    "services.s1.title": "社区建设",
    "services.s1.desc": "我们设计并建设连接共同兴趣人群的专业文化社区",
    "services.s2.title": "文化项目",
    "services.s2.desc": "我们设计服务社区目标的教育文化项目",
    "services.s3.title": "活动组织",
    "services.s3.desc": "我们组织现场活动，汇聚创意人并创造真实影响",
    "services.s4.title": "受众开发",
    "services.s4.desc": "我们帮助机构有效地触达目标受众",
    "services.cta": "与我们合作",
    // Contact page
    "contact.hero.title": "联系我们",
    "contact.hero.sub": "我们在这里回答您的问题",
    "contact.name": "姓名",
    "contact.email": "电子邮件",
    "contact.phone": "电话号码",
    "contact.reason": "联系原因",
    "contact.message": "您的消息",
    "contact.send": "发送消息",
    "contact.success": "您的消息已成功发送",
    "contact.address": "地址",
    "contact.location": "德里耶，利雅得，沙特阿拉伯王国",
    "contact.follow": "关注我们",
    // About extended
    "about.vision.title": "我们的愿景",
    "about.vision.text": "让苏拉成为王国建设文化社区的首要参考",
    "about.mission.title": "我们的使命",
    "about.mission.text": "设计、建设并运营创造持久影响的文化和创意社区",
    "about.values.title": "我们的价值观",
    "about.cta.title": "加入我们",
    "about.cta.sub": "成为苏拉文化社区的一员",
    // Communities extended
    "communities.hero.title": "我们的社区",
    "communities.hero.sub": "连接共同兴趣人群的专业文化社区",
    // Join extended
    "join.hero.title": "苏拉会员资格",
    "join.hero.sub": "选择适合您的计划",
    "join.save": "年度订阅可节省费用",
    "join.features": "功能",
    "join.compare": "比较计划",
    "join.faq": "常见问题",
    // Directory extended
    "directory.filter": "按类别筛选",
    "directory.all": "全部",
    "directory.no_results": "未找到结果",
    "directory.website": "访问网站",
    "directory.register_title": "注册您的机构",
    "directory.register_sub": "将您的文化实体添加到苏拉目录",
    // Common
    "common.coming_soon": "即将推出",
    "common.back": "返回",
    "common.close": "关闭",
    "common.download": "下载",
    "common.view": "查看",
    "common.learn_more": "了解更多",
    "common.join_now": "立即加入",
    "common.contact_us": "联系我们",
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
