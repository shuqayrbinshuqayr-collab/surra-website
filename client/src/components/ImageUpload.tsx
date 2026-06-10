/**
 * ImageUpload — مكوّن رفع الصور من الجهاز مباشرةً إلى S3
 * يدعم السحب والإفلات، معاينة الصورة، وإلغاء الرفع
 */
import { useRef, useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value?: string;                      // الرابط الحالي للصورة
  onChange: (url: string) => void;     // callback عند نجاح الرفع
  onClear?: () => void;                // callback عند حذف الصورة
  adminMode?: boolean;                 // true = يستخدم endpoint المشرف، false = endpoint عام
  placeholder?: string;               // نص placeholder
  className?: string;
  accept?: string;                     // أنواع الملفات المقبولة
  maxSizeMB?: number;                  // الحد الأقصى للحجم بالميغابايت
}

export function ImageUpload({
  value,
  onChange,
  onClear,
  adminMode = true,
  placeholder = "انقر لرفع صورة أو اسحب وأفلت هنا",
  className = "",
  accept = "image/png,image/jpeg,image/jpg,image/webp,image/svg+xml",
  maxSizeMB = 5,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const uploadAdmin = trpc.upload.uploadImage.useMutation();
  const uploadPublic = trpc.upload.uploadImagePublic.useMutation();

  const isUploading = adminMode ? uploadAdmin.isPending : uploadPublic.isPending;

  const processFile = useCallback(async (file: File) => {
    setError(null);

    // Validate type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("نوع الملف غير مدعوم. الأنواع المدعومة: PNG, JPEG, WebP, SVG");
      return;
    }

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`حجم الملف كبير جداً. الحد الأقصى ${maxSizeMB} ميغابايت`);
      return;
    }

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    // Convert to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data:image/xxx;base64, prefix
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    try {
      let result: { url: string; success: boolean };
      if (adminMode) {
        result = await uploadAdmin.mutateAsync({
          base64,
          mimeType: file.type,
          fileName: file.name,
        });
      } else {
        result = await uploadPublic.mutateAsync({
          base64,
          mimeType: file.type,
          fileName: file.name,
        });
      }

      onChange(result.url);
      URL.revokeObjectURL(localPreview);
      setPreview(null);
    } catch (err: any) {
      setError(err?.message ?? "فشل رفع الصورة، حاول مرة أخرى");
      URL.revokeObjectURL(localPreview);
      setPreview(null);
    }
  }, [adminMode, uploadAdmin, uploadPublic, onChange, maxSizeMB]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleClear = () => {
    setPreview(null);
    setError(null);
    onChange("");
    onClear?.();
  };

  const displayImage = preview ?? value;

  return (
    <div className={`flex flex-col gap-2 ${className}`} dir="rtl">
      {/* Upload Zone */}
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: `2px dashed ${isDragging ? "#C4622D" : error ? "#ef4444" : "rgba(255,255,255,0.2)"}`,
          borderRadius: "8px",
          padding: "1rem",
          cursor: isUploading ? "not-allowed" : "pointer",
          background: isDragging ? "rgba(196,98,45,0.08)" : "rgba(255,255,255,0.03)",
          transition: "all 0.2s",
          minHeight: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          position: "relative",
        }}
      >
        {isUploading ? (
          <>
            <Loader2 size={28} style={{ color: "#C4622D", animation: "spin 1s linear infinite" }} />
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>جاري الرفع...</span>
          </>
        ) : displayImage ? (
          <>
            <img
              src={displayImage}
              alt="الشعار المرفوع"
              style={{
                maxHeight: "80px",
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: "4px",
              }}
            />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
              انقر لتغيير الصورة
            </span>
          </>
        ) : (
          <>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(196,98,45,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Upload size={20} style={{ color: "#C4622D" }} />
            </div>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", textAlign: "center" }}>
              {placeholder}
            </span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>
              PNG, JPEG, WebP, SVG — حتى {maxSizeMB} ميغابايت
            </span>
          </>
        )}

        {/* Clear button */}
        {displayImage && !isUploading && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleClear(); }}
            style={{
              position: "absolute",
              top: "6px",
              left: "6px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "rgba(239,68,68,0.8)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
            title="حذف الصورة"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p style={{ fontSize: "12px", color: "#ef4444", margin: 0 }}>{error}</p>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ImageUpload;
