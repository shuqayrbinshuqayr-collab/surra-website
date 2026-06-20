/**
 * Directory Router — Cultural Entities CMS
 *
 * Architecture:
 * - publicProcedure: list() and getById() — used by the public website
 * - adminProcedure: adminList(), adminGetById(), create(), update(), delete(), togglePublish(), toggleFeatured(), stats()
 *
 * Single source of truth: both public website and admin dashboard use this SAME router.
 */

import { TRPCError } from "@trpc/server";
import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { z } from "zod";
import { culturalEntities } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// Full entity input schema matching the updated schema
const entityInput = z.object({
  nameAr: z.string().min(1, "الاسم بالعربية مطلوب"),
  nameEn: z.string().optional(),
  slug: z.string().optional(),
  category: z.string().min(1, "التصنيف مطلوب"),
  categoryEn: z.string().optional(),
  entityType: z.string().optional(),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  tags: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
  logoUrl: z.string().optional(),
  coverImageUrl: z.string().optional(),
  gallery: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  contactEmail: z.string().optional(),
  phone: z.string().optional(),
  socialLinks: z.string().optional(),
  status: z.enum(["active", "pending", "archived"]).default("active"),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  sortOrder: z.number().default(0),
  foundedYear: z.number().optional(),
  partnershipLevel: z.string().optional(),
  activityLevel: z.string().optional(),
});

export const directoryRouter = router({
  // ── PUBLIC: list active + published entities (used by public website) ──────
  list: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
        city: z.string().optional(),
        featured: z.boolean().optional(),
        limit: z.number().min(1).max(200).default(100),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const conditions: ReturnType<typeof eq>[] = [
        eq(culturalEntities.status, "active"),
        eq(culturalEntities.published, true),
      ];

      if (input?.category) conditions.push(eq(culturalEntities.category, input.category));
      if (input?.city) conditions.push(eq(culturalEntities.city, input.city));
      if (input?.featured !== undefined) conditions.push(eq(culturalEntities.featured, input.featured));
      if (input?.search) {
        conditions.push(
          or(
            like(culturalEntities.nameAr, `%${input.search}%`),
            like(culturalEntities.nameEn, `%${input.search}%`),
            like(culturalEntities.descriptionAr, `%${input.search}%`)
          ) as ReturnType<typeof eq>
        );
      }

      const rows = await db
        .select()
        .from(culturalEntities)
        .where(and(...conditions))
        .orderBy(culturalEntities.sortOrder, culturalEntities.nameAr)
        .limit(input?.limit ?? 100)
        .offset(input?.offset ?? 0);

      return rows;
    }),

  // ── PUBLIC: get single entity by ID ───────────────────────────────────────
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const rows = await db
        .select()
        .from(culturalEntities)
        .where(and(eq(culturalEntities.id, input.id), eq(culturalEntities.published, true)))
        .limit(1);

      if (!rows[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Entity not found" });
      return rows[0];
    }),

  // ── ADMIN: list ALL entities with filters ─────────────────────────────────
  adminList: adminProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
        status: z.enum(["active", "pending", "archived", "all"]).optional().default("all"),
        limit: z.number().min(1).max(200).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const conditions: ReturnType<typeof eq>[] = [];

      if (input?.status && input.status !== "all") {
        conditions.push(eq(culturalEntities.status, input.status));
      }
      if (input?.category) conditions.push(eq(culturalEntities.category, input.category));
      if (input?.search) {
        conditions.push(
          or(
            like(culturalEntities.nameAr, `%${input.search}%`),
            like(culturalEntities.nameEn, `%${input.search}%`)
          ) as ReturnType<typeof eq>
        );
      }

      const rows = await db
        .select()
        .from(culturalEntities)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(culturalEntities.createdAt))
        .limit(input?.limit ?? 50)
        .offset(input?.offset ?? 0);

      const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(culturalEntities)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      return { rows, total: Number(countResult[0]?.count ?? 0) };
    }),

  // ── ADMIN: get single entity by ID for editing (prefills edit form) ────────
  adminGetById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const rows = await db
        .select()
        .from(culturalEntities)
        .where(eq(culturalEntities.id, input.id))
        .limit(1);

      if (!rows[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Entity not found" });
      return rows[0];
    }),

  // ── ADMIN: create new entity ───────────────────────────────────────────────
  create: adminProcedure
    .input(entityInput)
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const slug = input.slug || input.nameAr
        .replace(/\s+/g, "-")
        .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "")
        .toLowerCase() + "-" + Date.now();

      const result = await db.insert(culturalEntities).values({
        ...input,
        slug,
        createdBy: ctx.user.id,
        updatedBy: ctx.user.id,
      });

      return { id: Number(result[0].insertId), success: true };
    }),

  // ── ADMIN: update existing entity ─────────────────────────────────────────
  update: adminProcedure
    .input(z.object({ id: z.number() }).merge(entityInput.partial()))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const { id, ...data } = input;

      const existing = await db
        .select({ id: culturalEntities.id })
        .from(culturalEntities)
        .where(eq(culturalEntities.id, id))
        .limit(1);

      if (!existing[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Entity not found" });

      await db
        .update(culturalEntities)
        .set({ ...data, updatedBy: ctx.user.id })
        .where(eq(culturalEntities.id, id));

      return { success: true };
    }),

  // ── ADMIN: delete entity ───────────────────────────────────────────────────
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      await db.delete(culturalEntities).where(eq(culturalEntities.id, input.id));
      return { success: true };
    }),

  // ── ADMIN: toggle publish status ──────────────────────────────────────────
  togglePublish: adminProcedure
    .input(z.object({ id: z.number(), published: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      await db
        .update(culturalEntities)
        .set({ published: input.published, updatedBy: ctx.user.id })
        .where(eq(culturalEntities.id, input.id));

      return { success: true };
    }),

  // ── ADMIN: toggle featured status ─────────────────────────────────────────
  toggleFeatured: adminProcedure
    .input(z.object({ id: z.number(), featured: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      await db
        .update(culturalEntities)
        .set({ featured: input.featured, updatedBy: ctx.user.id })
        .where(eq(culturalEntities.id, input.id));

      return { success: true };
    }),

  // ── PUBLIC: submit a new entity registration request (saved as pending) ───────
  publicSubmit: publicProcedure
    .input(
      z.object({
        nameAr: z.string().min(1, "اسم الجهة مطلوب"),
        category: z.string().min(1, "التصنيف مطلوب"),
        entityType: z.string().optional(),
        city: z.string().optional(),
        address: z.string().optional(),
        descriptionAr: z.string().optional(),
        focus: z.string().optional(),
        logoUrl: z.string().optional(),
        instagram: z.string().optional(),
        twitter: z.string().optional(),
        linkedin: z.string().optional(),
        website: z.string().optional(),
        contactEmail: z.string().optional(),
        phone: z.string().optional(),
        contactName: z.string().optional(),
        contactRole: z.string().optional(),
        foundedYear: z.number().optional(),
        tags: z.string().optional(),
        activityLevel: z.string().optional(),
        partnershipLevel: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const slug = input.nameAr
        .replace(/\s+/g, "-")
        .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "")
        .toLowerCase() + "-" + Date.now();

      const result = await db.insert(culturalEntities).values({
        nameAr: input.nameAr,
        category: input.category,
        entityType: input.entityType,
        city: input.city,
        address: input.address,
        descriptionAr: input.descriptionAr,
        categoryEn: input.focus,
        logoUrl: input.logoUrl,
        instagram: input.instagram,
        twitter: input.twitter,
        website: input.website,
        contactEmail: input.contactEmail,
        phone: input.phone,
        // Store contactName, contactRole, linkedin in socialLinks JSON
        socialLinks: JSON.stringify({
          ...(input.linkedin ? { linkedin: input.linkedin } : {}),
          ...(input.contactName ? { contactName: input.contactName } : {}),
          ...(input.contactRole ? { contactRole: input.contactRole } : {}),
        }) || undefined,
        foundedYear: input.foundedYear ? Number(input.foundedYear) : undefined,
        tags: input.tags,
        activityLevel: input.activityLevel,
        partnershipLevel: input.partnershipLevel,
        slug,
        status: "pending",
        published: false,
        featured: false,
      });

      return { id: Number(result[0].insertId), success: true };
    }),

  // ── ADMIN: update entity status (approve / reject) ─────────────────────────────────────────
  updateStatus: adminProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["active", "pending", "archived"]),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      // When approving (active), auto-publish; when rejecting (archived), unpublish
      const published = input.published !== undefined
        ? input.published
        : input.status === "active";

      await db
        .update(culturalEntities)
        .set({ status: input.status, published, updatedBy: ctx.user.id })
        .where(eq(culturalEntities.id, input.id));

      return { success: true };
    }),

  // ── ADMIN: list pending submissions for review ─────────────────────────────
  pendingList: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

    const rows = await db
      .select()
      .from(culturalEntities)
      .where(eq(culturalEntities.status, "pending"))
      .orderBy(desc(culturalEntities.createdAt))
      .limit(100);

    return rows;
  }),

  // ── ADMIN: stats dashboard ─────────────────────────────────────────────────────
  stats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

    const [total, active, pending, featuredCount, publishedCount] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(culturalEntities),
      db.select({ count: sql<number>`count(*)` }).from(culturalEntities).where(eq(culturalEntities.status, "active")),
      db.select({ count: sql<number>`count(*)` }).from(culturalEntities).where(eq(culturalEntities.status, "pending")),
      db.select({ count: sql<number>`count(*)` }).from(culturalEntities).where(eq(culturalEntities.featured, true)),
      db.select({ count: sql<number>`count(*)` }).from(culturalEntities).where(eq(culturalEntities.published, true)),
    ]);

    return {
      total: Number(total[0]?.count ?? 0),
      active: Number(active[0]?.count ?? 0),
      pending: Number(pending[0]?.count ?? 0),
      featured: Number(featuredCount[0]?.count ?? 0),
      published: Number(publishedCount[0]?.count ?? 0),
    };
  }),
});
