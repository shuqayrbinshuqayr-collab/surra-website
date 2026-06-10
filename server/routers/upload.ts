import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { storagePut } from "../storage";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const uploadRouter = router({
  // Upload image as base64 and return the storage URL
  uploadImage: adminProcedure
    .input(
      z.object({
        base64: z.string().min(1),       // base64 encoded file content (without data: prefix)
        mimeType: z.string().min(1),     // e.g. "image/png", "image/jpeg", "image/webp"
        fileName: z.string().min(1),     // original file name for key generation
      })
    )
    .mutation(async ({ input }) => {
      // Validate mime type
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml", "image/gif"];
      if (!allowedTypes.includes(input.mimeType)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "نوع الملف غير مدعوم. الأنواع المدعومة: PNG, JPEG, WebP, SVG, GIF",
        });
      }

      // Validate file size (max 5MB in base64 ≈ 3.75MB actual)
      const maxBase64Size = 7 * 1024 * 1024; // ~5MB actual
      if (input.base64.length > maxBase64Size) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "حجم الملف كبير جداً. الحد الأقصى 5 ميغابايت",
        });
      }

      // Convert base64 to Buffer
      const buffer = Buffer.from(input.base64, "base64");

      // Generate a clean file name
      const ext = input.fileName.split(".").pop()?.toLowerCase() ?? "png";
      const cleanName = input.fileName
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "_")
        .slice(0, 40);
      const storageKey = `logos/${cleanName}.${ext}`;

      const { url } = await storagePut(storageKey, buffer, input.mimeType);

      return { url, success: true };
    }),

  // Public upload for community creation form (any logged-in user)
  uploadImagePublic: protectedProcedure
    .input(
      z.object({
        base64: z.string().min(1),
        mimeType: z.string().min(1),
        fileName: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml", "image/gif"];
      if (!allowedTypes.includes(input.mimeType)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "نوع الملف غير مدعوم. الأنواع المدعومة: PNG, JPEG, WebP, SVG, GIF",
        });
      }

      const maxBase64Size = 7 * 1024 * 1024;
      if (input.base64.length > maxBase64Size) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "حجم الملف كبير جداً. الحد الأقصى 5 ميغابايت",
        });
      }

      const buffer = Buffer.from(input.base64, "base64");
      const ext = input.fileName.split(".").pop()?.toLowerCase() ?? "png";
      const cleanName = input.fileName
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "_")
        .slice(0, 40);
      const storageKey = `community-logos/${cleanName}.${ext}`;

      const { url } = await storagePut(storageKey, buffer, input.mimeType);

      return { url, success: true };
    }),
});
