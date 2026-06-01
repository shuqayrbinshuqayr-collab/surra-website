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

export const directoryRouter = router({
  // Public: list all active entities
  list: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
        status: z.enum(["active", "pending", "archived"]).optional(),
        limit: z.number().min(1).max(200).default(100),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const conditions = [];
      if (input?.status) {
        conditions.push(eq(culturalEntities.status, input.status));
      } else {
        conditions.push(eq(culturalEntities.status, "active"));
      }
      if (input?.category) {
        conditions.push(eq(culturalEntities.category, input.category));
      }
      if (input?.search) {
        conditions.push(
          or(
            like(culturalEntities.nameAr, `%${input.search}%`),
            like(culturalEntities.nameEn, `%${input.search}%`)
          )
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

  // Admin: list all entities including pending/archived
  adminList: adminProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
        status: z.enum(["active", "pending", "archived", "all"]).optional(),
        limit: z.number().min(1).max(200).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const conditions = [];
      if (input?.status && input.status !== "all") {
        conditions.push(eq(culturalEntities.status, input.status));
      }
      if (input?.category) {
        conditions.push(eq(culturalEntities.category, input.category));
      }
      if (input?.search) {
        conditions.push(
          or(
            like(culturalEntities.nameAr, `%${input.search}%`),
            like(culturalEntities.nameEn, `%${input.search}%`)
          )
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

  // Admin: create entity
  create: adminProcedure
    .input(
      z.object({
        nameAr: z.string().min(1),
        nameEn: z.string().optional(),
        category: z.string().min(1),
        categoryEn: z.string().optional(),
        descriptionAr: z.string().optional(),
        descriptionEn: z.string().optional(),
        website: z.string().optional(),
        logoUrl: z.string().optional(),
        city: z.string().optional(),
        status: z.enum(["active", "pending", "archived"]).default("active"),
        featured: z.boolean().default(false),
        sortOrder: z.number().default(0),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const result = await db.insert(culturalEntities).values({
        ...input,
        createdBy: ctx.user.id,
      });

      return { id: Number(result[0].insertId), success: true };
    }),

  // Admin: update entity
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        nameAr: z.string().min(1).optional(),
        nameEn: z.string().optional(),
        category: z.string().optional(),
        categoryEn: z.string().optional(),
        descriptionAr: z.string().optional(),
        descriptionEn: z.string().optional(),
        website: z.string().optional(),
        logoUrl: z.string().optional(),
        city: z.string().optional(),
        status: z.enum(["active", "pending", "archived"]).optional(),
        featured: z.boolean().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const { id, ...data } = input;
      await db.update(culturalEntities).set(data).where(eq(culturalEntities.id, id));

      return { success: true };
    }),

  // Admin: delete entity
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      await db.delete(culturalEntities).where(eq(culturalEntities.id, input.id));

      return { success: true };
    }),

  // Admin: get stats
  stats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

    const total = await db.select({ count: sql<number>`count(*)` }).from(culturalEntities);
    const active = await db
      .select({ count: sql<number>`count(*)` })
      .from(culturalEntities)
      .where(eq(culturalEntities.status, "active"));
    const pending = await db
      .select({ count: sql<number>`count(*)` })
      .from(culturalEntities)
      .where(eq(culturalEntities.status, "pending"));

    return {
      total: Number(total[0]?.count ?? 0),
      active: Number(active[0]?.count ?? 0),
      pending: Number(pending[0]?.count ?? 0),
    };
  }),
});
