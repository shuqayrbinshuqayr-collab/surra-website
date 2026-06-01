import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import { Users, Shield, User, Check, X } from "lucide-react";
import { toast } from "sonner";

export default function AdminUsers() {
  const [confirmId, setConfirmId] = useState<{ id: number; role: "admin" | "user" } | null>(null);
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.admin.users.list.useQuery({ limit: 50, offset: 0 });

  const updateRoleMutation = trpc.admin.users.updateRole.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الصلاحية");
      utils.admin.users.list.invalidate();
      setConfirmId(null);
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <AdminLayout>
      <div className="space-y-6" dir="rtl">
        <div>
          <h2 className="text-2xl font-light text-white" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
            المستخدمون
          </h2>
          <p className="text-sm text-white/40 mt-1">{data?.total ?? 0} مستخدم مسجل</p>
        </div>

        <div className="bg-[#111111] border border-white/[0.06] rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="h-8 w-8 border-2 border-[#C4622D] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : data?.rows.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="h-12 w-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 text-sm">لا يوجد مستخدمون بعد</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">المستخدم</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">البريد</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">تاريخ التسجيل</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">الصلاحية</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.rows.map((user) => (
                    <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                            user.role === "admin"
                              ? "bg-[#C4622D]/20 border border-[#C4622D]/30"
                              : "bg-white/5 border border-white/10"
                          }`}>
                            <span className={`text-xs font-medium ${user.role === "admin" ? "text-[#C4622D]" : "text-white/50"}`}>
                              {user.name?.charAt(0)?.toUpperCase() ?? "?"}
                            </span>
                          </div>
                          <span className="text-sm text-white/70">{user.name || "—"}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-white/40" dir="ltr">{user.email || "—"}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-white/40">
                          {new Date(user.createdAt).toLocaleDateString("ar-SA")}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit ${
                          user.role === "admin"
                            ? "bg-[#C4622D]/10 text-[#C4622D]"
                            : "bg-white/5 text-white/40"
                        }`}>
                          {user.role === "admin" ? (
                            <Shield className="h-3 w-3" />
                          ) : (
                            <User className="h-3 w-3" />
                          )}
                          {user.role === "admin" ? "مشرف" : "مستخدم"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {confirmId?.id === user.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/50">
                              تحويل إلى {confirmId.role === "admin" ? "مشرف" : "مستخدم"}؟
                            </span>
                            <button
                              onClick={() => updateRoleMutation.mutate({ id: user.id, role: confirmId.role })}
                              className="h-7 w-7 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setConfirmId(null)}
                              className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/30 transition-colors"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setConfirmId({
                                id: user.id,
                                role: user.role === "admin" ? "user" : "admin",
                              })
                            }
                            className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/40 hover:border-white/20 hover:text-white/60 transition-colors"
                          >
                            {user.role === "admin" ? "إزالة الإشراف" : "ترقية لمشرف"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
