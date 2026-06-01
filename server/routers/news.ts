import { TRPCError } from "@trpc/server";
import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { z } from "zod";
import { newsArticles, mediaFiles } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const newsRouter = router({
  // Public: list published articles
  list: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const conditions = [eq(newsArticles.status, "published")];
      if (input?.category) conditions.push(eq(newsArticles.category, input.category));
      if (input?.search) {
        conditions.push(
          or(
            like(newsArticles.titleAr, `%${input.search}%`),
            like(newsArticles.titleEn, `%${input.search}%`)
          )!
        );
      }

      const rows = await db
        .select()
        .from(newsArticles)
        .where(and(...conditions))
        .orderBy(desc(newsArticles.publishedAt))
        .limit(input?.limit ?? 20)
        .offset(input?.offset ?? 0);

      return rows;
    }),

  // Admin: list all articles
  adminList: adminProcedure
    .input(
      z.object({
        search: z.string().optional(),
        status: z.enum(["published", "draft", "archived", "all"]).optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const conditions = [];
      if (input?.status && input.status !== "all") {
        conditions.push(eq(newsArticles.status, input.status));
      }
      if (input?.search) {
        conditions.push(
          or(
            like(newsArticles.titleAr, `%${input.search}%`),
            like(newsArticles.titleEn, `%${input.search}%`)
          )!
        );
      }

      const rows = await db
        .select()
        .from(newsArticles)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(newsArticles.createdAt))
        .limit(input?.limit ?? 20)
        .offset(input?.offset ?? 0);

      const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(newsArticles)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      return { rows, total: Number(countResult[0]?.count ?? 0) };
    }),

  // Admin: create article
  create: adminProcedure
    .input(
      z.object({
        titleAr: z.string().min(1),
        titleEn: z.string().optional(),
        contentAr: z.string().optional(),
        contentEn: z.string().optional(),
        excerptAr: z.string().optional(),
        excerptEn: z.string().optional(),
        coverImageUrl: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        status: z.enum(["published", "draft", "archived"]).default("draft"),
        featured: z.boolean().default(false),
        publishedAt: z.date().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const result = await db.insert(newsArticles).values({
        ...input,
        createdBy: ctx.user.id,
        publishedAt: input.status === "published" ? (input.publishedAt ?? new Date()) : input.publishedAt,
      });

      return { id: Number(result[0].insertId), success: true };
    }),

  // Admin: update article
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        titleAr: z.string().min(1).optional(),
        titleEn: z.string().optional(),
        contentAr: z.string().optional(),
        contentEn: z.string().optional(),
        excerptAr: z.string().optional(),
        excerptEn: z.string().optional(),
        coverImageUrl: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        status: z.enum(["published", "draft", "archived"]).optional(),
        featured: z.boolean().optional(),
        publishedAt: z.date().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const { id, ...data } = input;
      if (data.status === "published" && !data.publishedAt) {
        (data as typeof data & { publishedAt: Date }).publishedAt = new Date();
      }
      await db.update(newsArticles).set(data).where(eq(newsArticles.id, id));

      return { success: true };
    }),

  // Admin: delete article
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.delete(newsArticles).where(eq(newsArticles.id, input.id));
      return { success: true };
    }),

  // Admin: news stats
  stats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const total = await db.select({ count: sql<number>`count(*)` }).from(newsArticles);
    const published = await db
      .select({ count: sql<number>`count(*)` })
      .from(newsArticles)
      .where(eq(newsArticles.status, "published"));
    const draft = await db
      .select({ count: sql<number>`count(*)` })
      .from(newsArticles)
      .where(eq(newsArticles.status, "draft"));

    return {
      total: Number(total[0]?.count ?? 0),
      published: Number(published[0]?.count ?? 0),
      draft: Number(draft[0]?.count ?? 0),
    };
  }),
});

export const mediaRouter = router({
  // Public: list active media
  list: publicProcedure
    .input(
      z.object({
        fileType: z.enum(["pdf", "video", "image", "audio"]).optional(),
        category: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const conditions = [eq(mediaFiles.status, "active")];
      if (input?.fileType) conditions.push(eq(mediaFiles.fileType, input.fileType));
      if (input?.category) conditions.push(eq(mediaFiles.category, input.category));

      const rows = await db
        .select()
        .from(mediaFiles)
        .where(and(...conditions))
        .orderBy(desc(mediaFiles.createdAt))
        .limit(input?.limit ?? 20)
        .offset(input?.offset ?? 0);

      return rows;
    }),

  // Admin: list all media
  adminList: adminProcedure
    .input(
      z.object({
        fileType: z.enum(["pdf", "video", "image", "audio", "all"]).optional(),
        status: z.enum(["active", "archived", "all"]).optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const conditions = [];
      if (input?.status && input.status !== "all") {
        conditions.push(eq(mediaFiles.status, input.status));
      }
      if (input?.fileType && input.fileType !== "all") {
        conditions.push(eq(mediaFiles.fileType, input.fileType));
      }

      const rows = await db
        .select()
        .from(mediaFiles)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(mediaFiles.createdAt))
        .limit(input?.limit ?? 20)
        .offset(input?.offset ?? 0);

      const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(mediaFiles)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      return { rows, total: Number(countResult[0]?.count ?? 0) };
    }),

  // Admin: create media entry
  create: adminProcedure
    .input(
      z.object({
        titleAr: z.string().min(1),
        titleEn: z.string().optional(),
        fileUrl: z.string().min(1),
        fileKey: z.string().optional(),
        fileType: z.enum(["pdf", "video", "image", "audio"]),
        mimeType: z.string().optional(),
        fileSizeBytes: z.number().optional(),
        thumbnailUrl: z.string().optional(),
        category: z.string().optional(),
        status: z.enum(["active", "archived"]).default("active"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const result = await db.insert(mediaFiles).values({
        ...input,
        createdBy: ctx.user.id,
      });

      return { id: Number(result[0].insertId), success: true };
    }),

  // Admin: delete media
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.delete(mediaFiles).where(eq(mediaFiles.id, input.id));
      return { success: true };
    }),
});
