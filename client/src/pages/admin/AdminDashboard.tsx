import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import {
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  FileImage,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Link } from "wouter";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  sub?: string;
  color: string;
  href?: string;
}) {
  const content = (
    <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-5 hover:border-white/10 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        {href && (
          <span className="text-xs text-white/20 group-hover:text-white/50 transition-colors">
            →
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-light text-white" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
          {value}
        </p>
        <p className="text-sm text-white/50">{label}</p>
        {sub && <p className="text-xs text-white/30">{sub}</p>}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

function QuickAction({
  icon: Icon,
  label,
  href,
  color,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  color: string;
}) {
  return (
    <Link href={href}>
      <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 transition-all text-right">
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-sm text-white/70 font-light" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
          {label}
        </span>
      </button>
    </Link>
  );
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = trpc.admin.stats.useQuery();
  const { data: activity } = trpc.admin.recentActivity.useQuery();

  return (
    <AdminLayout>
      <div className="space-y-8" dir="rtl">
        {/* Header */}
        <div>
          <h2
            className="text-2xl font-light text-white mb-1"
            style={{ fontFamily: "'ManchetteFine', sans-serif" }}
          >
            مرحباً بك في لوحة التحكم
          </h2>
          <p className="text-sm text-white/40">إدارة محتوى منظومة سُرّة الثقافية</p>
        </div>

        {/* Stats Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-xl p-5 animate-pulse">
                <div className="h-10 w-10 rounded-lg bg-white/5 mb-4" />
                <div className="h-7 w-16 bg-white/5 rounded mb-2" />
                <div className="h-4 w-24 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Building2}
              label="الدليل الثقافي"
              value={stats?.entities.total ?? 0}
              sub={`${stats?.entities.active ?? 0} نشطة · ${stats?.entities.pending ?? 0} بانتظار الموافقة`}
              color="bg-[#C4622D]/15 text-[#C4622D]"
              href="/admin/directory"
            />
            <StatCard
              icon={BookOpen}
              label="المركز الإعلامي"
              value={stats?.news.total ?? 0}
              sub={`${stats?.news.published ?? 0} منشورة · ${stats?.news.draft ?? 0} مسودة`}
              color="bg-blue-500/15 text-blue-400"
              href="/admin/news"
            />
            <StatCard
              icon={FileImage}
              label="الوسائط"
              value={stats?.media.total ?? 0}
              sub="ملفات PDF وفيديو وصور"
              color="bg-purple-500/15 text-purple-400"
              href="/admin/media"
            />
            <StatCard
              icon={CalendarDays}
              label="الفعاليات"
              value={stats?.events.total ?? 0}
              sub={`${stats?.events.upcoming ?? 0} قادمة`}
              color="bg-emerald-500/15 text-emerald-400"
              href="/admin/events"
            />
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-5">
            <h3
              className="text-sm font-light text-white/70 mb-4"
              style={{ fontFamily: "'ManchetteFine', sans-serif" }}
            >
              إجراءات سريعة
            </h3>
            <div className="space-y-2">
              <QuickAction
                icon={Building2}
                label="إضافة جهة ثقافية"
                href="/admin/directory?action=new"
                color="bg-[#C4622D]/15 text-[#C4622D]"
              />
              <QuickAction
                icon={BookOpen}
                label="كتابة خبر جديد"
                href="/admin/news?action=new"
                color="bg-blue-500/15 text-blue-400"
              />
              <QuickAction
                icon={CalendarDays}
                label="إضافة فعالية"
                href="/admin/events?action=new"
                color="bg-emerald-500/15 text-emerald-400"
              />
              <QuickAction
                icon={FileImage}
                label="رفع ملف وسائط"
                href="/admin/media?action=new"
                color="bg-purple-500/15 text-purple-400"
              />
            </div>
          </div>

          {/* Recent Entities */}
          <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-sm font-light text-white/70"
                style={{ fontFamily: "'ManchetteFine', sans-serif" }}
              >
                آخر الجهات المضافة
              </h3>
              <Link href="/admin/directory">
                <span className="text-xs text-[#C4622D]/70 hover:text-[#C4622D] transition-colors cursor-pointer">
                  عرض الكل
                </span>
              </Link>
            </div>
            <div className="space-y-3">
              {activity?.recentEntities?.length ? (
                activity.recentEntities.map((entity) => (
                  <div key={entity.id} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-[#C4622D]/10 border border-[#C4622D]/20 flex items-center justify-center shrink-0">
                      <Building2 className="h-3.5 w-3.5 text-[#C4622D]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/70 truncate">{entity.nameAr}</p>
                      <p className="text-xs text-white/30">{entity.category}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        entity.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : entity.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-white/5 text-white/30"
                      }`}
                    >
                      {entity.status === "active" ? "نشطة" : entity.status === "pending" ? "بانتظار" : "مؤرشفة"}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <Building2 className="h-8 w-8 text-white/10 mx-auto mb-2" />
                  <p className="text-xs text-white/30">لا توجد جهات بعد</p>
                  <Link href="/admin/directory?action=new">
                    <button className="mt-2 text-xs text-[#C4622D]/70 hover:text-[#C4622D] transition-colors">
                      أضف أول جهة
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent News */}
          <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-sm font-light text-white/70"
                style={{ fontFamily: "'ManchetteFine', sans-serif" }}
              >
                آخر الأخبار
              </h3>
              <Link href="/admin/news">
                <span className="text-xs text-blue-400/70 hover:text-blue-400 transition-colors cursor-pointer">
                  عرض الكل
                </span>
              </Link>
            </div>
            <div className="space-y-3">
              {activity?.recentNews?.length ? (
                activity.recentNews.map((article) => (
                  <div key={article.id} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/70 truncate">{article.titleAr}</p>
                      <p className="text-xs text-white/30">
                        {new Date(article.createdAt).toLocaleDateString("ar-SA")}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        article.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : article.status === "draft"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-white/5 text-white/30"
                      }`}
                    >
                      {article.status === "published" ? "منشور" : article.status === "draft" ? "مسودة" : "مؤرشف"}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <BookOpen className="h-8 w-8 text-white/10 mx-auto mb-2" />
                  <p className="text-xs text-white/30">لا توجد أخبار بعد</p>
                  <Link href="/admin/news?action=new">
                    <button className="mt-2 text-xs text-blue-400/70 hover:text-blue-400 transition-colors">
                      أضف أول خبر
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-5">
          <h3
            className="text-sm font-light text-white/70 mb-4"
            style={{ fontFamily: "'ManchetteFine', sans-serif" }}
          >
            حالة النظام
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "قاعدة البيانات", status: "متصلة", ok: true },
              { label: "التخزين", status: "يعمل", ok: true },
              { label: "المصادقة", status: "نشطة", ok: true },
              { label: "المستخدمون", value: stats?.users.total, ok: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                {item.ok ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                )}
                <div>
                  <p className="text-xs text-white/50">{item.label}</p>
                  <p className="text-xs text-white/30">
                    {item.value !== undefined ? item.value : item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
