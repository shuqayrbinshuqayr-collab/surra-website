# سُرّة — لوحة التحكم TODO

## لوحة التحكم (Admin Dashboard)

- [x] إنشاء مخطط قاعدة البيانات (drizzle/schema.ts) — جداول: culturalEntities, newsArticles, mediaFiles, events
- [x] تشغيل pnpm db:push لإنشاء الجداول
- [x] إنشاء server/routers/directory.ts — CRUD للدليل الثقافي
- [x] إنشاء server/routers/news.ts — CRUD للأخبار والوسائط
- [x] إنشاء server/routers/admin.ts — إحصائيات، فعاليات، مستخدمون
- [x] تحديث server/routers.ts لربط جميع الـ routers
- [x] إنشاء client/src/components/AdminLayout.tsx — تخطيط لوحة التحكم RTL داكن
- [x] إنشاء client/src/pages/admin/AdminDashboard.tsx — الصفحة الرئيسية
- [x] إنشاء client/src/pages/admin/AdminDirectory.tsx — إدارة الدليل الثقافي
- [x] إنشاء client/src/pages/admin/AdminNews.tsx — إدارة الأخبار
- [x] إنشاء client/src/pages/admin/AdminMedia.tsx — إدارة الوسائط
- [x] إنشاء client/src/pages/admin/AdminEvents.tsx — إدارة الفعاليات
- [x] إنشاء client/src/pages/admin/AdminUsers.tsx — إدارة المستخدمين
- [x] إنشاء client/src/pages/admin/AdminSettings.tsx — الإعدادات
- [x] تحديث client/src/App.tsx بمسارات /admin/*
- [x] إصلاح أخطاء TypeScript (0 أخطاء)
- [x] كتابة اختبارات Vitest (11 اختبار — جميعها ناجحة)
- [x] اختبار CRUD في المتصفح (إضافة فعالية تجريبية بنجاح)

## الموقع الرئيسي (موجود مسبقاً)

- [x] الصفحة الرئيسية (Home.tsx)
- [x] صفحة المجتمعات
- [x] صفحة إنشاء مجتمع
- [x] Navbar و Footer
- [x] VideoBackground
