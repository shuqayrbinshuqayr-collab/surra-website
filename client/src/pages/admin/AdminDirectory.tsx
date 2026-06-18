import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import {
  Building2,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Globe,
  Star,
  StarOff,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { CULTURAL_CATEGORIES, CATEGORY_KEYS } from "@shared/categories";

const CATEGORIES = CATEGORY_KEYS;

type EntityStatus = "active" | "pending" | "archived";

interface EntityFormData {
  nameAr: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  website: string;
  logoUrl: string;
  city: string;
  status: EntityStatus;
  featured: boolean;
  sortOrder: number;
}

const emptyForm: EntityFormData = {
  nameAr: "",
  nameEn: "",
  category: "",
  categoryEn: "",
  descriptionAr: "",
  descriptionEn: "",
  website: "",
  logoUrl: "",
  city: "",
  status: "active",
  featured: false,
  sortOrder: 0,
};

function EntityModal({
  open,
  onClose,
  editId,
  initialData,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  editId?: number;
  initialData?: Partial<EntityFormData>;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<EntityFormData>({
    ...emptyForm,
    ...initialData,
  });

  const utils = trpc.useUtils();

  const createMutation = trpc.directory.create.useMutation({
    onSuccess: () => {
      toast.success("تمت إضافة الجهة بنجاح");
      utils.directory.adminList.invalidate();
      onSaved();
      onClose();
    },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = trpc.directory.update.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الجهة بنجاح");
      utils.directory.adminList.invalidate();
      onSaved();
      onClose();
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = () => {
    if (!form.nameAr.trim()) {
      toast.error("الاسم العربي مطلوب");
      return;
    }
    if (!form.category.trim()) {
      toast.error("التصنيف مطلوب");
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
      <div className="relative bg-[#111111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <h2
            className="text-lg font-light text-white"
            style={{ fontFamily: "'ManchetteFine', sans-serif" }}
          >
            {editId ? "تعديل الجهة" : "إضافة جهة ثقافية"}
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/40 hover:text-white/70 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-2">الاسم بالعربية *</label>
              <input
                type="text"
                value={form.nameAr}
                onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
                placeholder="مثال: وزارة الثقافة"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-2">الاسم بالإنجليزية</label>
              <input
                type="text"
                value={form.nameEn}
                onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                placeholder="Ministry of Culture"
                dir="ltr"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-2">التصنيف *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              >
                <option value="">اختر التصنيف</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-2">المدينة</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="الرياض"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-white/50 mb-2">الوصف بالعربية</label>
            <textarea
              value={form.descriptionAr}
              onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })}
              placeholder="وصف مختصر للجهة..."
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors resize-none"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-xs text-white/50 mb-2">الموقع الإلكتروني</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder="https://example.com"
              dir="ltr"
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-xs text-white/50 mb-2">شعار الجهة</label>
            <ImageUpload
              value={form.logoUrl}
              onChange={(url) => setForm({ ...form, logoUrl: url })}
              onClear={() => setForm({ ...form, logoUrl: "" })}
              adminMode={true}
              placeholder="انقر لرفع الشعار أو اسحب وأفلت هنا"
            />
          </div>

          {/* Status & Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-2">الحالة</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as EntityStatus })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              >
                <option value="active">نشطة</option>
                <option value="pending">بانتظار الموافقة</option>
                <option value="archived">مؤرشفة</option>
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
                {form.featured ? "مميزة" : "تمييز الجهة"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/[0.06]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
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
            {editId ? "حفظ التعديلات" : "إضافة الجهة"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDirectory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending" | "archived">("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | undefined>();
  const [editData, setEditData] = useState<Partial<EntityFormData> | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "pending">("all");

  const utils = trpc.useUtils();

  const { data, isLoading, refetch } = trpc.directory.adminList.useQuery({
    search: search || undefined,
    status: statusFilter === "all" ? undefined : statusFilter,
    category: categoryFilter || undefined,
    limit: 50,
    offset: 0,
  });

  const deleteMutation = trpc.directory.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف الجهة");
      utils.directory.adminList.invalidate();
      setDeleteConfirm(null);
    },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = trpc.directory.update.useMutation({
    onSuccess: () => {
      utils.directory.adminList.invalidate();
    },
  });

  const updateStatusMutation = trpc.directory.updateStatus.useMutation({
    onSuccess: (_data, variables) => {
      utils.directory.adminList.invalidate();
      utils.directory.pendingList.invalidate();
      if (variables.status === "active") {
        toast.success("تمت الموافقة على الجهة ونشرها");
      } else if (variables.status === "archived") {
        toast.success("تم رفض الجهة وأرشفتها");
      }
    },
    onError: (e) => toast.error(e.message),
  });

  const { data: pendingData, isLoading: pendingLoading } = trpc.directory.pendingList.useQuery(undefined, {
    enabled: activeTab === "pending",
  });

  const openEdit = (entity: NonNullable<typeof data>["rows"][0]) => {
    setEditId(entity.id);
    setEditData({
      nameAr: entity.nameAr,
      nameEn: entity.nameEn ?? "",
      category: entity.category,
      categoryEn: entity.categoryEn ?? "",
      descriptionAr: entity.descriptionAr ?? "",
      descriptionEn: entity.descriptionEn ?? "",
      website: entity.website ?? "",
      logoUrl: entity.logoUrl ?? "",
      city: entity.city ?? "",
      status: entity.status,
      featured: entity.featured,
      sortOrder: entity.sortOrder ?? 0,
    });
    setModalOpen(true);
  };

  const statusLabel = (s: string) => {
    if (s === "active") return { label: "نشطة", cls: "bg-emerald-500/10 text-emerald-400" };
    if (s === "pending") return { label: "بانتظار", cls: "bg-yellow-500/10 text-yellow-400" };
    return { label: "مؤرشفة", cls: "bg-white/5 text-white/30" };
  };

  return (
    <AdminLayout>
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-2xl font-light text-white"
              style={{ fontFamily: "'ManchetteFine', sans-serif" }}
            >
              الدليل الثقافي
            </h2>
            <p className="text-sm text-white/40 mt-1">
              {data?.total ?? 0} جهة ثقافية
            </p>
          </div>
          <button
            onClick={() => {
              setEditId(undefined);
              setEditData(undefined);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C4622D] hover:bg-[#d4733e] text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span style={{ fontFamily: "'ManchetteFine', sans-serif" }}>إضافة جهة</span>
          </button>
        </div>

        {/* Tabs: All / Pending Review */}
        <div className="flex gap-1 border-b border-white/[0.06] pb-0">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2.5 text-sm transition-all border-b-2 -mb-px ${
              activeTab === "all"
                ? "border-[#C4622D] text-white"
                : "border-transparent text-white/40 hover:text-white/60"
            }`}
            style={{ fontFamily: "'ManchetteFine', sans-serif" }}
          >
            كل الجهات
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all border-b-2 -mb-px ${
              activeTab === "pending"
                ? "border-[#C4622D] text-white"
                : "border-transparent text-white/40 hover:text-white/60"
            }`}
            style={{ fontFamily: "'ManchetteFine', sans-serif" }}
          >
            طلبات التسجيل
            {pendingData && pendingData.length > 0 && (
              <span className="bg-yellow-500/20 text-yellow-400 text-xs px-1.5 py-0.5 rounded-full">
                {pendingData.length}
              </span>
            )}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3">
          {/* Row 1: Search + Status */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="البحث في الجهات..."
                className="w-full bg-[#111111] border border-white/10 rounded-lg pr-10 pl-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["all", "active", "pending", "archived"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                    statusFilter === s
                      ? "bg-[#C4622D]/15 border-[#C4622D]/30 text-[#C4622D]"
                      : "bg-[#111111] border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                  }`}
                >
                  {s === "all" ? "الكل" : s === "active" ? "نشطة" : s === "pending" ? "بانتظار" : "مؤرشفة"}
                </button>
              ))}
            </div>
          </div>
          {/* Row 2: Category filter chips */}
          <div className="flex gap-2 flex-wrap items-center">
            <Filter className="h-3.5 w-3.5 text-white/30 shrink-0" />
            <button
              onClick={() => setCategoryFilter("")}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                categoryFilter === ""
                  ? "bg-[#C4622D]/15 border-[#C4622D]/30 text-[#C4622D]"
                  : "bg-[#111111] border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              كل التصنيفات
            </button>
            {CULTURAL_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategoryFilter(cat.key)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                  categoryFilter === cat.key
                    ? "bg-[#C4622D]/15 border-[#C4622D]/30 text-[#C4622D]"
                    : "bg-[#111111] border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                }`}
              >
                {cat.icon} {cat.labelAr}
              </button>
            ))}
          </div>
        </div>

        {/* Pending Submissions Tab */}
        {activeTab === "pending" && (
          <div className="space-y-3">
            {pendingLoading ? (
              <div className="p-8 text-center">
                <div className="h-8 w-8 border-2 border-[#C4622D] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : !pendingData || pendingData.length === 0 ? (
              <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-12 text-center">
                <Check className="h-12 w-12 text-emerald-500/30 mx-auto mb-4" />
                <p className="text-white/40 text-sm">لا توجد طلبات معلقة للمراجعة</p>
              </div>
            ) : (
              pendingData.map((entity) => (
                <div
                  key={entity.id}
                  className="bg-[#111111] border border-white/[0.06] rounded-xl p-5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    {entity.logoUrl ? (
                      <img src={entity.logoUrl} alt={entity.nameAr} className="h-12 w-12 rounded-lg object-contain bg-white/5 shrink-0" />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-[#C4622D]/10 border border-[#C4622D]/20 flex items-center justify-center shrink-0">
                        <Building2 className="h-5 w-5 text-[#C4622D]" />
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-white font-medium" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>{entity.nameAr}</h3>
                        <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full">بانتظار المراجعة</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                        {entity.category && <span className="text-xs text-white/50">تصنيف: {entity.category}</span>}
                        {entity.city && <span className="text-xs text-white/50">المدينة: {entity.city}</span>}
                        {entity.entityType && <span className="text-xs text-white/50">النوع: {entity.entityType}</span>}
                        {entity.foundedYear && <span className="text-xs text-white/50">تأسيس: {entity.foundedYear}</span>}
                      </div>
                      {entity.descriptionAr && (
                        <p className="text-xs text-white/40 mt-2 line-clamp-2">{entity.descriptionAr}</p>
                      )}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                        {entity.contactEmail && <span className="text-xs text-white/30">بريد: {entity.contactEmail}</span>}
                        {entity.phone && <span className="text-xs text-white/30">جوال: {entity.phone}</span>}
                        {entity.instagram && <span className="text-xs text-white/30">إنستغرام: {entity.instagram}</span>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: "active" })}
                        disabled={updateStatusMutation.isPending}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Check className="h-3.5 w-3.5" />
                        قبول ونشر
                      </button>
                      <button
                        onClick={() => updateStatusMutation.mutate({ id: entity.id, status: "archived" })}
                        disabled={updateStatusMutation.isPending}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs rounded-lg transition-colors disabled:opacity-50"
                      >
                        <X className="h-3.5 w-3.5" />
                        رفض
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Table — shown only in "all" tab */}
        {activeTab === "all" && (
          <div className="bg-[#111111] border border-white/[0.06] rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="h-8 w-8 border-2 border-[#C4622D] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : data?.rows.length === 0 ? (
            <div className="p-12 text-center">
              <Building2 className="h-12 w-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 text-sm">لا توجد جهات مطابقة</p>
              <button
                onClick={() => { setEditId(undefined); setEditData(undefined); setModalOpen(true); }}
                className="mt-4 text-sm text-[#C4622D]/70 hover:text-[#C4622D] transition-colors"
              >
                أضف أول جهة ثقافية
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">الجهة</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">التصنيف</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">المدينة</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">الحالة</th>
                    <th className="text-right text-xs text-white/30 font-normal px-5 py-3">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.rows.map((entity) => {
                    const { label, cls } = statusLabel(entity.status);
                    return (
                      <tr
                        key={entity.id}
                        className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {entity.logoUrl ? (
                              <img
                                src={entity.logoUrl}
                                alt={entity.nameAr}
                                className="h-8 w-8 rounded-lg object-contain bg-white/5"
                              />
                            ) : (
                              <div className="h-8 w-8 rounded-lg bg-[#C4622D]/10 border border-[#C4622D]/20 flex items-center justify-center">
                                <Building2 className="h-3.5 w-3.5 text-[#C4622D]" />
                              </div>
                            )}
                            <div>
                              <p className="text-sm text-white/80">{entity.nameAr}</p>
                              {entity.nameEn && (
                                <p className="text-xs text-white/30" dir="ltr">{entity.nameEn}</p>
                              )}
                            </div>
                            {entity.featured && (
                              <Star className="h-3.5 w-3.5 text-[#C4622D] shrink-0" />
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs text-white/50">{entity.category}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs text-white/40">{entity.city || "—"}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${cls}`}>{label}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {entity.website && (
                              <a
                                href={entity.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"
                              >
                                <Globe className="h-3.5 w-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => openEdit(entity)}
                              className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            {deleteConfirm === entity.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => deleteMutation.mutate({ id: entity.id })}
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
                                onClick={() => setDeleteConfirm(entity.id)}
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
        )}
      </div>

      {/* Modal */}
      <EntityModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditId(undefined); setEditData(undefined); }}
        editId={editId}
        initialData={editData}
        onSaved={refetch}
      />
    </AdminLayout>
  );
}
