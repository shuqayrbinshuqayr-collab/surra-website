import AdminLayout from "@/components/AdminLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Settings, Bell, Shield, Info, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminSettings() {
  const { user } = useAuth();
  const [notifTitle, setNotifTitle] = useState("");
  const [notifContent, setNotifContent] = useState("");

  const notifyMutation = trpc.system.notifyOwner.useMutation({
    onSuccess: (ok) => {
      if (ok) {
        toast.success("تم إرسال الإشعار بنجاح");
        setNotifTitle("");
        setNotifContent("");
      } else {
        toast.error("فشل إرسال الإشعار");
      }
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-2xl" dir="rtl">
        <div>
          <h2 className="text-2xl font-light text-white" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
            الإعدادات
          </h2>
          <p className="text-sm text-white/40 mt-1">إعدادات النظام والإشعارات</p>
        </div>

        {/* Profile Info */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-8 rounded-lg bg-[#C4622D]/15 flex items-center justify-center">
              <Shield className="h-4 w-4 text-[#C4622D]" />
            </div>
            <h3 className="text-sm font-light text-white" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
              معلومات الحساب
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
              <span className="text-xs text-white/40">الاسم</span>
              <span className="text-xs text-white/70">{user?.name ?? "—"}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
              <span className="text-xs text-white/40">البريد الإلكتروني</span>
              <span className="text-xs text-white/70" dir="ltr">{user?.email ?? "—"}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-white/40">الصلاحية</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#C4622D]/10 text-[#C4622D]">
                {user?.role === "admin" ? "مشرف" : "مستخدم"}
              </span>
            </div>
          </div>
        </div>

        {/* Send Notification */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
              <Bell className="h-4 w-4 text-blue-400" />
            </div>
            <h3 className="text-sm font-light text-white" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
              إرسال إشعار للمالك
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-2">عنوان الإشعار</label>
              <input
                type="text"
                value={notifTitle}
                onChange={(e) => setNotifTitle(e.target.value)}
                placeholder="عنوان الإشعار..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-2">المحتوى</label>
              <textarea
                value={notifContent}
                onChange={(e) => setNotifContent(e.target.value)}
                placeholder="محتوى الإشعار..."
                rows={3}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors resize-none"
              />
            </div>
            <button
              onClick={() => {
                if (!notifTitle.trim() || !notifContent.trim()) {
                  toast.error("يرجى ملء جميع الحقول");
                  return;
                }
                notifyMutation.mutate({ title: notifTitle, content: notifContent });
              }}
              disabled={notifyMutation.isPending}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/20 text-blue-400 text-sm rounded-lg transition-colors disabled:opacity-50"
            >
              {notifyMutation.isPending ? (
                <div className="h-4 w-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
              ) : (
                <Bell className="h-4 w-4" />
              )}
              إرسال الإشعار
            </button>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
              <Info className="h-4 w-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-light text-white" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
              معلومات النظام
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { label: "الإصدار", value: "1.0.0" },
              { label: "قاعدة البيانات", value: "MySQL / TiDB" },
              { label: "المصادقة", value: "Manus OAuth 2.0" },
              { label: "التخزين", value: "S3 Compatible" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                <span className="text-xs text-white/40">{item.label}</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-xs text-white/60">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
