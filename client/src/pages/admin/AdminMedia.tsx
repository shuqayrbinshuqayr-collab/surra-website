import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import {
  FileImage,
  Plus,
  Search,
  Trash2,
  X,
  Check,
  FileText,
  Video,
  Music,
  Image,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

type FileType = "pdf" | "video" | "image" | "audio";

interface MediaFormData {
  titleAr: string;
  titleEn: string;
  fileUrl: string;
  fileKey: string;
  fileType: FileType;
  mimeType: string;
  thumbnailUrl: string;
  category: string;
  status: "active" | "archived";
}

const emptyForm: MediaFormData = {
  titleAr: "",
  titleEn: "",
  fileUrl: "",
  fileKey: "",
  fileType: "pdf",
  mimeType: "",
  thumbnailUrl: "",
  category: "",
  status: "active",
};

const FILE_TYPE_ICONS: Record<FileType, React.ElementType> = {
  pdf: FileText,
  video: Video,
  image: Image,
  audio: Music,
};

const FILE_TYPE_COLORS: Record<FileType, string> = {
  pdf: "bg-red-500/10 text-red-400",
  video: "bg-blue-500/10 text-blue-400",
  image: "bg-emerald-500/10 text-emerald-400",
  audio: "bg-purple-500/10 text-purple-400",
};

const FILE_TYPE_LABELS: Record<FileType, string> = {
  pdf: "PDF",
  video: "فيديو",
  image: "صورة",
  audio: "صوت",
};

function MediaModal({
  open,
  onClose,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<MediaFormData>(emptyForm);
  const utils = trpc.useUtils();

  const createMutation = trpc.media.create.useMutation({
    onSuccess: () => {
      toast.success("تم رفع الملف بنجاح");
      utils.media.adminList.invalidate();
      onSaved();
      onClose();
      setForm(emptyForm);
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = () => {
    if (!form.titleAr.trim()) {
      toast.error("العنوان مطلوب");
      return;
    }
    if (!form.fileUrl.trim()) {
      toast.error("رابط الملف مطلوب");
      return;
    }
    createMutation.mutate(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-[#111111] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <h2 className="text-lg font-light text-white" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
            إضافة ملف وسائط
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
                placeholder="اسم الملف..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-2">نوع الملف</label>
              <select
                value={form.fileType}
                onChange={(e) => setForm({ ...form, fileType: e.target.value as FileType })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              >
                <option value="pdf">PDF</option>
                <option value="video">فيديو</option>
                <option value="image">صورة</option>
                <option value="audio">صوت</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/50 mb-2">رابط الملف *</label>
            <input
              type="url"
              value={form.fileUrl}
              onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
              placeholder="https://..."
              dir="ltr"
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-2">التصنيف</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="مثال: تقارير سنوية"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-2">الحالة</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "archived" })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/50 transition-colors"
              >
                <option value="active">نشط</option>
                <option value="archived">مؤرشف</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/[0.06]">
          <button onClick={onClose} className="px-4 py-2 text-sm text-white/50 hover:text-white/80 transition-colors">
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            disabled={createMutation.isPending}
            className="flex items-center gap-2 px-5 py-2 bg-[#C4622D] hover:bg-[#d4733e] disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
          >
            {createMutation.isPending ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            إضافة الملف
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminMedia() {
  const [fileTypeFilter, setFileTypeFilter] = useState<"all" | FileType>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const utils = trpc.useUtils();

  const { data, isLoading, refetch } = trpc.media.adminList.useQuery({
    fileType: fileTypeFilter === "all" ? undefined : fileTypeFilter,
    status: "all",
    limit: 50,
    offset: 0,
  });

  const deleteMutation = trpc.media.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف الملف");
      utils.media.adminList.invalidate();
      setDeleteConfirm(null);
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <AdminLayout>
      <div className="space-y-6" dir="rtl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-light text-white" style={{ fontFamily: "'ManchetteFine', sans-serif" }}>
              الوسائط
            </h2>
            <p className="text-sm text-white/40 mt-1">{data?.total ?? 0} ملف</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C4622D] hover:bg-[#d4733e] text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span style={{ fontFamily: "'ManchetteFine', sans-serif" }}>إضافة ملف</span>
          </button>
        </div>

        {/* Type filters */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "pdf", "video", "image", "audio"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFileTypeFilter(t)}
              className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                fileTypeFilter === t
                  ? "bg-[#C4622D]/15 border-[#C4622D]/30 text-[#C4622D]"
                  : "bg-[#111111] border-white/10 text-white/40 hover:border-white/20"
              }`}
            >
              {t === "all" ? "الكل" : FILE_TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="h-8 w-8 border-2 border-[#C4622D] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : data?.rows.length === 0 ? (
          <div className="p-12 text-center bg-[#111111] border border-white/[0.06] rounded-xl">
            <FileImage className="h-12 w-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 text-sm">لا توجد ملفات بعد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.rows.map((file) => {
              const FileIcon = FILE_TYPE_ICONS[file.fileType as FileType] ?? FileText;
              const colorCls = FILE_TYPE_COLORS[file.fileType as FileType] ?? "bg-white/5 text-white/40";
              return (
                <div
                  key={file.id}
                  className="bg-[#111111] border border-white/[0.06] rounded-xl p-4 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorCls}`}>
                      <FileIcon className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      {deleteConfirm === file.id ? (
                        <>
                          <button
                            onClick={() => deleteMutation.mutate({ id: file.id })}
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
                        </>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(file.id)}
                          className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-white/70 truncate mb-1">{file.titleAr}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colorCls}`}>
                      {FILE_TYPE_LABELS[file.fileType as FileType] ?? file.fileType}
                    </span>
                    {file.category && (
                      <span className="text-xs text-white/30">{file.category}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <MediaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={refetch}
      />
    </AdminLayout>
  );
}
