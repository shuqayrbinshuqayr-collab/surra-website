import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import {
  CalendarDays,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  MapPin,
  Star,
  StarOff,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

type EventStatus = "upcoming" | "past" | "cancelled";

interface EventFormData {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  eventDate: string;
  locationAr: string;
  community: string;
  communityColor: string;
  communitySlug: string;
  eventType: string;
  registerUrl: string;
  status: EventStatus;
  featured: boolean;
}

const emptyForm: EventFormData = {
  titleAr: "",
  titleEn: "",
  descriptionAr: "",
  eventDate: "",
  locationAr: "",
  community: "",
  communityColor: "#C4622D",
  communitySlug: "",
  eventType: "",
  registerUrl: "",
  status: "upcoming",
  featured: false,
};

const COMMUNITIES = [
  { name: "بصر", slug: "basar", color: "#C4622D" },
  { name: "صفر", slug: "sifr", color: "#c8c4bc" },
  { name: "سدى", slug: "sada", color: "#7B4F8E" },
  { name: "مدى", slug: "mada", color: "#1C6B4A" },
  { name: "مقام", slug: "maqam", color: "#8B6914" },
  { name: "عُملة", slug: "umla", color: "#C9A84C" },
  { name: "سُرّة", slug: "surrah", color: "#1C2B3A" },
];

function EventModal({
  open,
  onClose,
  editId,
  initialData,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  editId?: number;
  initialData?: Partial<EventFormData>;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<EventFormData>({ ...emptyForm, ...initialData });
  const utils = trpc.useUtils();

  const createMutation = trpc.admin.events.create.useMutation({
    onSuccess: () => {
      toast.success("تمت إضافة الفعالية");
      utils.admin.events.list.invalidate();
      onSaved();
      onClose();
    },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = trpc.admin.events.update.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الفعالية");
      utils.admin.events.list.invalidate();
      onSaved();
      onClose();
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = () => {
    if (!form.titleAr.trim()) {
      toast.error("العنوان مطلوب");
      return;
    }
    if (!form.eventDate) {
      toast.error("تاريخ الفعالية مطلوب");
      return;
    }

    const payload = {
      ...form,
      eventDate: new Date(form.eventDate),
    };

    if (editId) {
      updateMutation.mutate({ id: editId, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-[#111111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <h2 className="text-lg font-light text-white" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
            {editId ? "تعديل الفعالية" : "إضافة فعالية"}
          </h2>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/40">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-2">العنوان بالعربية *</label>
              <input
                type="text"
                value={form.titleAr}
                onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                placeholder="عنوان الفعالية..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-2">التاريخ *</label>
              <input
                type="datetime-local"
                value={form.eventDate}
                onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/50 transition-colors"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/50 mb-2">الوصف</label>
            <textarea
              value={form.descriptionAr}
              onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })}
              placeholder="وصف الفعالية..."
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-2">الموقع</label>
              <input
                type="text"
                value={form.locationAr}
                onChange={(e) => setForm({ ...form, locationAr: e.target.value })}
                placeholder="الرياض — الدرعية"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-2">المجتمع</label>
              <select
                value={form.community}
                onChange={(e) => {
                  const c = COMMUNITIES.find((c) => c.name === e.target.value);
                  setForm({
                    ...form,
                    community: e.target.value,
                    communitySlug: c?.slug ?? "",
                    communityColor: c?.color ?? "#C4622D",
                  });
                }}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              >
                <option value="">اختر المجتمع</option>
                {COMMUNITIES.map((c) => (
                  <option key={c.slug} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-2">نوع الفعالية</label>
              <input
                type="text"
                value={form.eventType}
                onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                placeholder="مثال: جلسة حوارية"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-2">رابط التسجيل</label>
              <input
                type="url"
                value={form.registerUrl}
                onChange={(e) => setForm({ ...form, registerUrl: e.target.value })}
                placeholder="https://..."
                dir="ltr"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-2">الحالة</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as EventStatus })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              >
                <option value="upcoming">قادمة</option>
                <option value="past">منتهية</option>
                <option value="cancelled">ملغاة</option>
              </select>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <button
                type="button"
                onClick={() => setForm({ ...form, featured: !form.featured })}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm transition-all ${
                  form.featured
                    ? "bg-[#C4622D]/15 border-[#C4622D]/30 text-[#C4622D]"
                    : "bg-white/[0.04] border-white/10 text-white/50 hover:border-white/20"
                }`}
              >
                {form.featured ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
                {form.featured ? "مميزة" : "تمييز"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/[0.06]">
          <button onClick={onClose} className="px-4 py-2 text-sm text-white/50 hover:text-white/80 transition-colors">
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2 bg-[#C4622D] hover:bg-[#d4733e] disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
          >
            {isPending ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            {editId ? "حفظ التعديلات" : "إضافة الفعالية"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminEvents() {
  const [statusFilter, setStatusFilter] = useState<"all" | EventStatus>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | undefined>();
  const [editData, setEditData] = useState<Partial<EventFormData> | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const utils = trpc.useUtils();

  const { data, isLoading, refetch } = trpc.admin.events.list.useQuery({
    status: statusFilter === "all" ? undefined : statusFilter,
    limit: 50,
    offset: 0,
  });

  const deleteMutation = trpc.admin.events.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف الفعالية");
      utils.admin.events.list.invalidate();
      setDeleteConfirm(null);
    },
    onError: (e) => toast.error(e.message),
  });

  const openEdit = (event: NonNullable<typeof data>["rows"][0]) => {
    setEditId(event.id);
    setEditData({
      titleAr: event.titleAr,
      titleEn: event.titleEn ?? "",
      descriptionAr: event.descriptionAr ?? "",
      eventDate: new Date(event.eventDate).toISOString().slice(0, 16),
      locationAr: event.locationAr ?? "",
      community: event.community ?? "",
      communityColor: event.communityColor ?? "#C4622D",
      communitySlug: event.communitySlug ?? "",
      eventType: event.eventType ?? "",
      registerUrl: event.registerUrl ?? "",
      status: event.status,
      featured: event.featured,
    });
    setModalOpen(true);
  };

  const statusInfo = (s: string) => {
    if (s === "upcoming") return { label: "قادمة", cls: "bg-emerald-500/10 text-emerald-400" };
    if (s === "past") return { label: "منتهية", cls: "bg-white/5 text-white/30" };
    return { label: "ملغاة", cls: "bg-red-500/10 text-red-400" };
  };

  return (
    <AdminLayout>
      <div className="space-y-6" dir="rtl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-light text-white" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
              الفعاليات
            </h2>
            <p className="text-sm text-white/40 mt-1">{data?.total ?? 0} فعالية</p>
          </div>
          <button
            onClick={() => { setEditId(undefined); setEditData(undefined); setModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C4622D] hover:bg-[#d4733e] text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span style={{ fontFamily: "'ManchetteFine', sans-serif" }}>إضافة فعالية</span>
          </button>
        </div>

        <div className="flex gap-2">
          {(["all", "upcoming", "past", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                statusFilter === s
                  ? "bg-[#C4622D]/15 border-[#C4622D]/30 text-[#C4622D]"
                  : "bg-[#111111] border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              {s === "all" ? "الكل" : s === "upcoming" ? "قادمة" : s === "past" ? "منتهية" : "ملغاة"}
            </button>
          ))}
        </div>

        <div className="bg-[#111111] border border-white/[0.06] rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="h-8 w-8 border-2 border-[#C4622D] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : data?.rows.length === 0 ? (
            <div className="p-12 text-center">
              <CalendarDays className="h-12 w-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 text-sm">لا توجد فعاليات</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">الفعالية</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">التاريخ</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">المجتمع</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">الحالة</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.rows.map((event) => {
                    const { label, cls } = statusInfo(event.status);
                    return (
                      <tr key={event.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${event.communityColor ?? "#C4622D"}20` }}
                            >
                              <CalendarDays className="h-3.5 w-3.5" style={{ color: event.communityColor ?? "#C4622D" }} />
                            </div>
                            <div>
                              <p className="text-sm text-white/80">{event.titleAr}</p>
                              {event.locationAr && (
                                <p className="text-xs text-white/30 flex items-center gap-1 mt-0.5">
                                  <MapPin className="h-3 w-3" />
                                  {event.locationAr}
                                </p>
                              )}
                            </div>
                            {event.featured && <Star className="h-3.5 w-3.5 text-[#C4622D] shrink-0" />}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs text-white/50">
                            {new Date(event.eventDate).toLocaleDateString("ar-SA")}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {event.community ? (
                            <span
                              className="text-xs px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: `${event.communityColor ?? "#C4622D"}20`,
                                color: event.communityColor ?? "#C4622D",
                              }}
                            >
                              {event.community}
                            </span>
                          ) : (
                            <span className="text-xs text-white/30">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${cls}`}>{label}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {event.registerUrl && (
                              <a
                                href={event.registerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => openEdit(event)}
                              className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            {deleteConfirm === event.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => deleteMutation.mutate({ id: event.id })}
                                  className="h-7 w-7 flex items-center justify-center rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/30 transition-colors"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(event.id)}
                                className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <EventModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditId(undefined); setEditData(undefined); }}
        editId={editId}
        initialData={editData}
        onSaved={refetch}
      />
    </AdminLayout>
  );
}
