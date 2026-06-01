import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Eye,
  EyeOff,
  Star,
  StarOff,
} from "lucide-react";
import { toast } from "sonner";

type ArticleStatus = "published" | "draft" | "archived";

interface ArticleFormData {
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  excerptAr: string;
  coverImageUrl: string;
  category: string;
  tags: string;
  status: ArticleStatus;
  featured: boolean;
}

const emptyForm: ArticleFormData = {
  titleAr: "",
  titleEn: "",
  contentAr: "",
  contentEn: "",
  excerptAr: "",
  coverImageUrl: "",
  category: "",
  tags: "",
  status: "draft",
  featured: false,
};

const NEWS_CATEGORIES = [
  "أخبار سُرّة",
  "فعاليات",
  "مجتمعات",
  "ثقافة وفنون",
  "إعلانات",
  "تقارير",
];

function ArticleModal({
  open,
  onClose,
  editId,
  initialData,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  editId?: number;
  initialData?: Partial<ArticleFormData>;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<ArticleFormData>({ ...emptyForm, ...initialData });
  const utils = trpc.useUtils();

  const createMutation = trpc.news.create.useMutation({
    onSuccess: () => {
      toast.success("تم نشر المقال بنجاح");
      utils.news.adminList.invalidate();
      onSaved();
      onClose();
    },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = trpc.news.update.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث المقال");
      utils.news.adminList.invalidate();
      onSaved();
      onClose();
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = () => {
    if (!form.titleAr.trim()) {
      toast.error("العنوان بالعربية مطلوب");
      return;
    }
    if (editId) {
      updateMutation.mutate({ id: editId, ...form });
    } else {
      createMutation.mutate(form);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-[#111111] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <h2 className="text-lg font-light text-white" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
            {editId ? "تعديل الخبر" : "إضافة خبر جديد"}
          </h2>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/40">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-2">العنوان بالعربية *</label>
              <input
                type="text"
                value={form.titleAr}
                onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                placeholder="عنوان الخبر..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-2">العنوان بالإنجليزية</label>
              <input
                type="text"
                value={form.titleEn}
                onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                placeholder="News title..."
                dir="ltr"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs text-white/50 mb-2">مقتطف / ملخص</label>
            <textarea
              value={form.excerptAr}
              onChange={(e) => setForm({ ...form, excerptAr: e.target.value })}
              placeholder="ملخص مختصر للخبر..."
              rows={2}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors resize-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs text-white/50 mb-2">المحتوى الكامل</label>
            <textarea
              value={form.contentAr}
              onChange={(e) => setForm({ ...form, contentAr: e.target.value })}
              placeholder="نص الخبر الكامل..."
              rows={6}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors resize-none"
            />
          </div>

          {/* Cover & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-2">صورة الغلاف (رابط)</label>
              <input
                type="url"
                value={form.coverImageUrl}
                onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                placeholder="https://..."
                dir="ltr"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-2">التصنيف</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              >
                <option value="">اختر التصنيف</option>
                {NEWS_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status & Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-2">حالة النشر</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ArticleStatus })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              >
                <option value="draft">مسودة</option>
                <option value="published">منشور</option>
                <option value="archived">مؤرشف</option>
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
                {form.featured ? "مميز" : "تمييز الخبر"}
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
            {editId ? "حفظ التعديلات" : form.status === "published" ? "نشر الخبر" : "حفظ المسودة"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminNews() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "archived">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | undefined>();
  const [editData, setEditData] = useState<Partial<ArticleFormData> | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const utils = trpc.useUtils();

  const { data, isLoading, refetch } = trpc.news.adminList.useQuery({
    search: search || undefined,
    status: statusFilter === "all" ? undefined : statusFilter,
    limit: 50,
    offset: 0,
  });

  const deleteMutation = trpc.news.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف الخبر");
      utils.news.adminList.invalidate();
      setDeleteConfirm(null);
    },
    onError: (e) => toast.error(e.message),
  });

  const openEdit = (article: NonNullable<typeof data>["rows"][0]) => {
    setEditId(article.id);
    setEditData({
      titleAr: article.titleAr,
      titleEn: article.titleEn ?? "",
      contentAr: article.contentAr ?? "",
      contentEn: article.contentEn ?? "",
      excerptAr: article.excerptAr ?? "",
      coverImageUrl: article.coverImageUrl ?? "",
      category: article.category ?? "",
      tags: article.tags ?? "",
      status: article.status,
      featured: article.featured,
    });
    setModalOpen(true);
  };

  const statusInfo = (s: string) => {
    if (s === "published") return { label: "منشور", cls: "bg-emerald-500/10 text-emerald-400" };
    if (s === "draft") return { label: "مسودة", cls: "bg-yellow-500/10 text-yellow-400" };
    return { label: "مؤرشف", cls: "bg-white/5 text-white/30" };
  };

  return (
    <AdminLayout>
      <div className="space-y-6" dir="rtl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-light text-white" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
              المركز الإعلامي
            </h2>
            <p className="text-sm text-white/40 mt-1">{data?.total ?? 0} مقال</p>
          </div>
          <button
            onClick={() => { setEditId(undefined); setEditData(undefined); setModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C4622D] hover:bg-[#d4733e] text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span style={{ fontFamily: "'ManchetteFine', sans-serif" }}>خبر جديد</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث في الأخبار..."
              className="w-full bg-[#111111] border border-white/10 rounded-lg pr-10 pl-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "published", "draft", "archived"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                  statusFilter === s
                    ? "bg-[#C4622D]/15 border-[#C4622D]/30 text-[#C4622D]"
                    : "bg-[#111111] border-white/10 text-white/40 hover:border-white/20"
                }`}
              >
                {s === "all" ? "الكل" : s === "published" ? "منشور" : s === "draft" ? "مسودة" : "مؤرشف"}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#111111] border border-white/[0.06] rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="h-8 w-8 border-2 border-[#C4622D] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : data?.rows.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 text-sm">لا توجد أخبار مطابقة</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">العنوان</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">التصنيف</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">التاريخ</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">الحالة</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.rows.map((article) => {
                    const { label, cls } = statusInfo(article.status);
                    return (
                      <tr key={article.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {article.coverImageUrl ? (
                              <img
                                src={article.coverImageUrl}
                                alt={article.titleAr}
                                className="h-10 w-14 rounded-lg object-cover bg-white/5 shrink-0"
                              />
                            ) : (
                              <div className="h-10 w-14 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                <BookOpen className="h-4 w-4 text-blue-400" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-sm text-white/80 truncate max-w-xs">{article.titleAr}</p>
                              {article.excerptAr && (
                                <p className="text-xs text-white/30 truncate max-w-xs mt-0.5">{article.excerptAr}</p>
                              )}
                            </div>
                            {article.featured && <Star className="h-3.5 w-3.5 text-[#C4622D] shrink-0" />}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs text-white/50">{article.category || "—"}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs text-white/40">
                            {new Date(article.createdAt).toLocaleDateString("ar-SA")}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${cls}`}>{label}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEdit(article)}
                              className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            {deleteConfirm === article.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => deleteMutation.mutate({ id: article.id })}
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
                                onClick={() => setDeleteConfirm(article.id)}
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

      <ArticleModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditId(undefined); setEditData(undefined); }}
        editId={editId}
        initialData={editData}
        onSaved={refetch}
      />
    </AdminLayout>
  );
}
