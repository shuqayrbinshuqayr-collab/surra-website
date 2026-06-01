import { TRPCError } from "@trpc/server";
import { desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { culturalEntities, events, mediaFiles, newsArticles, users } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const adminRouter = router({
  // Dashboard stats overview
  stats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const [entitiesTotal] = await db.select({ count: sql<number>`count(*)` }).from(culturalEntities);
    const [entitiesActive] = await db
      .select({ count: sql<number>`count(*)` })
      .from(culturalEntities)
      .where(eq(culturalEntities.status, "active"));
    const [entitiesPending] = await db
      .select({ count: sql<number>`count(*)` })
      .from(culturalEntities)
      .where(eq(culturalEntities.status, "pending"));

    const [newsTotal] = await db.select({ count: sql<number>`count(*)` }).from(newsArticles);
    const [newsPublished] = await db
      .select({ count: sql<number>`count(*)` })
      .from(newsArticles)
      .where(eq(newsArticles.status, "published"));
    const [newsDraft] = await db
      .select({ count: sql<number>`count(*)` })
      .from(newsArticles)
      .where(eq(newsArticles.status, "draft"));

    const [mediaTotal] = await db.select({ count: sql<number>`count(*)` }).from(mediaFiles);

    const [eventsTotal] = await db.select({ count: sql<number>`count(*)` }).from(events);
    const [eventsUpcoming] = await db
      .select({ count: sql<number>`count(*)` })
      .from(events)
      .where(eq(events.status, "upcoming"));

    const [usersTotal] = await db.select({ count: sql<number>`count(*)` }).from(users);

    return {
      entities: {
        total: Number(entitiesTotal?.count ?? 0),
        active: Number(entitiesActive?.count ?? 0),
        pending: Number(entitiesPending?.count ?? 0),
      },
      news: {
        total: Number(newsTotal?.count ?? 0),
        published: Number(newsPublished?.count ?? 0),
        draft: Number(newsDraft?.count ?? 0),
      },
      media: {
        total: Number(mediaTotal?.count ?? 0),
      },
      events: {
        total: Number(eventsTotal?.count ?? 0),
        upcoming: Number(eventsUpcoming?.count ?? 0),
      },
      users: {
        total: Number(usersTotal?.count ?? 0),
      },
    };
  }),

  // Recent activity
  recentActivity: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const recentEntities = await db
      .select()
      .from(culturalEntities)
      .orderBy(desc(culturalEntities.createdAt))
      .limit(5);

    const recentNews = await db
      .select()
      .from(newsArticles)
      .orderBy(desc(newsArticles.createdAt))
      .limit(5);

    return { recentEntities, recentNews };
  }),

  // Events CRUD
  events: router({
    list: adminProcedure
      .input(
        z.object({
          status: z.enum(["upcoming", "past", "cancelled", "all"]).optional(),
          limit: z.number().min(1).max(100).default(20),
          offset: z.number().min(0).default(0),
        }).optional()
      )
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const conditions = [];
        if (input?.status && input.status !== "all") {
          conditions.push(eq(events.status, input.status));
        }

        const rows = await db
          .select()
          .from(events)
          .where(conditions.length > 0 ? conditions[0] : undefined)
          .orderBy(desc(events.eventDate))
          .limit(input?.limit ?? 20)
          .offset(input?.offset ?? 0);

        const countResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(events)
          .where(conditions.length > 0 ? conditions[0] : undefined);

        return { rows, total: Number(countResult[0]?.count ?? 0) };
      }),

    create: adminProcedure
      .input(
        z.object({
          titleAr: z.string().min(1),
          titleEn: z.string().optional(),
          descriptionAr: z.string().optional(),
          descriptionEn: z.string().optional(),
          eventDate: z.date(),
          locationAr: z.string().optional(),
          locationEn: z.string().optional(),
          community: z.string().optional(),
          communityEn: z.string().optional(),
          communitySlug: z.string().optional(),
          communityColor: z.string().optional(),
          eventType: z.string().optional(),
          eventTypeEn: z.string().optional(),
          registerUrl: z.string().optional(),
          status: z.enum(["upcoming", "past", "cancelled"]).default("upcoming"),
          featured: z.boolean().default(false),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const result = await db.insert(events).values({
          ...input,
          createdBy: ctx.user.id,
        });

        return { id: Number(result[0].insertId), success: true };
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          titleAr: z.string().min(1).optional(),
          titleEn: z.string().optional(),
          descriptionAr: z.string().optional(),
          descriptionEn: z.string().optional(),
          eventDate: z.date().optional(),
          locationAr: z.string().optional(),
          locationEn: z.string().optional(),
          community: z.string().optional(),
          communityEn: z.string().optional(),
          communitySlug: z.string().optional(),
          communityColor: z.string().optional(),
          eventType: z.string().optional(),
          eventTypeEn: z.string().optional(),
          registerUrl: z.string().optional(),
          status: z.enum(["upcoming", "past", "cancelled"]).optional(),
          featured: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const { id, ...data } = input;
        await db.update(events).set(data).where(eq(events.id, id));

        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.delete(events).where(eq(events.id, input.id));
        return { success: true };
      }),
  }),

  // Users management
  users: router({
    list: adminProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(100).default(20),
          offset: z.number().min(0).default(0),
        }).optional()
      )
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const rows = await db
          .select()
          .from(users)
          .orderBy(desc(users.createdAt))
          .limit(input?.limit ?? 20)
          .offset(input?.offset ?? 0);

        const countResult = await db.select({ count: sql<number>`count(*)` }).from(users);

        return { rows, total: Number(countResult[0]?.count ?? 0) };
      }),

    updateRole: adminProcedure
      .input(z.object({ id: z.number(), role: z.enum(["user", "admin"]) }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.update(users).set({ role: input.role }).where(eq(users.id, input.id));
        return { success: true };
      }),
  }),
});
