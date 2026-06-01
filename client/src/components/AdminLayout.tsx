import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronLeft,
  ExternalLink,
  FileImage,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

const menuItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", path: "/admin" },
  { icon: Building2, label: "الدليل الثقافي", path: "/admin/directory" },
  { icon: BookOpen, label: "المركز الإعلامي", path: "/admin/news" },
  { icon: FileImage, label: "الوسائط", path: "/admin/media" },
  { icon: CalendarDays, label: "الفعاليات", path: "/admin/events" },
  { icon: Users, label: "المستخدمون", path: "/admin/users" },
  { icon: Settings, label: "الإعدادات", path: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#C4622D] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/60 text-sm font-light" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
            جاري التحميل...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center" dir="rtl">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full text-center">
          <div
            className="text-4xl font-light text-white tracking-widest"
            style={{ fontFamily: "'ManchetteFine', sans-serif" }}
          >
            سُرّة
          </div>
          <div className="w-16 h-px bg-[#C4622D]" />
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-light text-white">لوحة التحكم</h1>
            <p className="text-sm text-white/50">
              يتطلب الوصول إلى لوحة التحكم تسجيل الدخول
            </p>
          </div>
          <button
            onClick={() => { window.location.href = getLoginUrl(); }}
            className="w-full py-3 px-6 bg-[#C4622D] hover:bg-[#d4733e] text-white text-sm font-light rounded-lg transition-colors"
            style={{ fontFamily: "'ManchetteFine', sans-serif" }}
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  // Non-admin users
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center" dir="rtl">
        <div className="flex flex-col items-center gap-6 p-8 text-center">
          <div className="text-6xl text-[#C4622D]">⛔</div>
          <h1 className="text-xl font-light text-white">غير مصرح لك بالوصول</h1>
          <p className="text-sm text-white/50">هذه الصفحة متاحة للمشرفين فقط</p>
          <Link href="/">
            <button className="py-2 px-6 border border-white/20 text-white/70 text-sm rounded-lg hover:border-white/40 transition-colors">
              العودة للموقع
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const currentPage = menuItems.find(item =>
    item.path === location || (item.path !== "/admin" && location.startsWith(item.path))
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex" dir="rtl">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 h-full z-50 bg-[#111111] border-l border-white/[0.06]
          transition-all duration-300 flex flex-col
          ${mobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
          ${sidebarOpen ? "w-64" : "w-16"}
          lg:relative lg:flex
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.06]">
          {sidebarOpen && (
            <Link href="/">
              <span
                className="text-xl font-light text-white tracking-widest hover:text-[#C4622D] transition-colors cursor-pointer"
                style={{ fontFamily: "'ManchetteFine', sans-serif" }}
              >
                سُرّة
              </span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white/80"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${!sidebarOpen ? "rotate-180" : ""}`} />
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-white/40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive =
                item.path === "/admin"
                  ? location === "/admin"
                  : location.startsWith(item.path);
              return (
                <li key={item.path}>
                  <Link href={item.path}>
                    <button
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                        ${isActive
                          ? "bg-[#C4622D]/15 text-[#C4622D] border border-[#C4622D]/20"
                          : "text-white/50 hover:text-white/80 hover:bg-white/5"
                        }
                        ${!sidebarOpen ? "justify-center" : ""}
                      `}
                      title={!sidebarOpen ? item.label : undefined}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {sidebarOpen && (
                        <span className="font-light" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
                          {item.label}
                        </span>
                      )}
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/[0.06]">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="h-8 w-8 rounded-full bg-[#C4622D]/20 border border-[#C4622D]/30 flex items-center justify-center shrink-0">
                <span className="text-[#C4622D] text-xs font-medium">
                  {user.name?.charAt(0)?.toUpperCase() ?? "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/70 truncate">{user.name}</p>
                <p className="text-xs text-[#C4622D]/70">مشرف</p>
              </div>
              <button
                onClick={() => {
                  fetch("/api/trpc/auth.logout", { method: "POST", credentials: "include" })
                    .then(() => { window.location.href = "/"; });
                }}
                className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"
                title="تسجيل الخروج"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-8 w-8 rounded-full bg-[#C4622D]/20 border border-[#C4622D]/30 flex items-center justify-center">
                <span className="text-[#C4622D] text-xs font-medium">
                  {user.name?.charAt(0)?.toUpperCase() ?? "A"}
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-[#111111] border-b border-white/[0.06] flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/50"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <h1
                className="text-base font-light text-white"
                style={{ fontFamily: "'ManchetteFine', sans-serif" }}
              >
                {currentPage?.label ?? "لوحة التحكم"}
              </h1>
              <p className="text-xs text-white/30">منظومة سُرّة الثقافية</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors">
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden sm:block">الموقع الرئيسي</span>
              </button>
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-[#C4622D]/20 border border-[#C4622D]/30 flex items-center justify-center">
                <span className="text-[#C4622D] text-xs">
                  {user.name?.charAt(0)?.toUpperCase() ?? "A"}
                </span>
              </div>
              <span className="text-xs text-white/50 hidden sm:block">{user.name}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
