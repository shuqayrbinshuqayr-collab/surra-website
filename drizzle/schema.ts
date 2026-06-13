import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Cultural entities for the Cultural Directory (الدليل الثقافي السعودي)
 * Single source of truth — used by BOTH public website and Admin CMS.
 */
export const culturalEntities = mysqlTable("cultural_entities", {
  id: int("id").autoincrement().primaryKey(),
  // Core identity
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }),
  slug: varchar("slug", { length: 255 }),
  // Classification
  category: varchar("category", { length: 100 }).notNull(),
  categoryEn: varchar("categoryEn", { length: 100 }),
  entityType: varchar("entityType", { length: 100 }),
  // Content
  descriptionAr: text("descriptionAr"),
  descriptionEn: text("descriptionEn"),
  tags: text("tags"), // JSON array e.g. '["#ثقافة","#فن"]'
  // Location
  city: varchar("city", { length: 100 }),
  country: varchar("country", { length: 100 }).default("Saudi Arabia"),
  // Media
  logoUrl: varchar("logoUrl", { length: 1000 }),
  coverImageUrl: varchar("coverImageUrl", { length: 1000 }),
  gallery: text("gallery"), // JSON array of image URLs
  // Contact & Links
  website: varchar("website", { length: 500 }),
  instagram: varchar("instagram", { length: 255 }),
  twitter: varchar("twitter", { length: 255 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  phone: varchar("phone", { length: 50 }),
  socialLinks: text("socialLinks"), // JSON object
  // CMS Controls
  status: mysqlEnum("status", ["active", "pending", "archived"]).default("pending").notNull(),
  featured: boolean("featured").default(false).notNull(),
  published: boolean("published").default(false).notNull(),
  sortOrder: int("sortOrder").default(0),
  // Metadata
  foundedYear: int("foundedYear"),
  partnershipLevel: varchar("partnershipLevel", { length: 50 }),
  activityLevel: varchar("activityLevel", { length: 50 }),
  // Audit
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdBy: int("createdBy"),
  updatedBy: int("updatedBy"),
});

export type CulturalEntity = typeof culturalEntities.$inferSelect;
export type InsertCulturalEntity = typeof culturalEntities.$inferInsert;

/**
 * News articles for the Media Center (المركز الإعلامي)
 */
export const newsArticles = mysqlTable("news_articles", {
  id: int("id").autoincrement().primaryKey(),
  titleAr: varchar("titleAr", { length: 500 }).notNull(),
  titleEn: varchar("titleEn", { length: 500 }),
  contentAr: text("contentAr"),
  contentEn: text("contentEn"),
  excerptAr: text("excerptAr"),
  excerptEn: text("excerptEn"),
  coverImageUrl: varchar("coverImageUrl", { length: 500 }),
  category: varchar("category", { length: 100 }),
  tags: text("tags"),
  status: mysqlEnum("status", ["published", "draft", "archived"]).default("draft").notNull(),
  featured: boolean("featured").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdBy: int("createdBy"),
});

export type NewsArticle = typeof newsArticles.$inferSelect;
export type InsertNewsArticle = typeof newsArticles.$inferInsert;

/**
 * Media files (PDFs, videos, images) for the Media Center
 */
export const mediaFiles = mysqlTable("media_files", {
  id: int("id").autoincrement().primaryKey(),
  titleAr: varchar("titleAr", { length: 500 }).notNull(),
  titleEn: varchar("titleEn", { length: 500 }),
  fileUrl: varchar("fileUrl", { length: 500 }).notNull(),
  fileKey: varchar("fileKey", { length: 500 }),
  fileType: mysqlEnum("fileType", ["pdf", "video", "image", "audio"]).notNull(),
  mimeType: varchar("mimeType", { length: 100 }),
  fileSizeBytes: int("fileSizeBytes"),
  thumbnailUrl: varchar("thumbnailUrl", { length: 500 }),
  category: varchar("category", { length: 100 }),
  status: mysqlEnum("status", ["active", "archived"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdBy: int("createdBy"),
});

export type MediaFile = typeof mediaFiles.$inferSelect;
export type InsertMediaFile = typeof mediaFiles.$inferInsert;

/**
 * Events for the homepage upcoming events section
 */
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  titleAr: varchar("titleAr", { length: 500 }).notNull(),
  titleEn: varchar("titleEn", { length: 500 }),
  descriptionAr: text("descriptionAr"),
  descriptionEn: text("descriptionEn"),
  eventDate: timestamp("eventDate").notNull(),
  locationAr: varchar("locationAr", { length: 255 }),
  locationEn: varchar("locationEn", { length: 255 }),
  community: varchar("community", { length: 100 }),
  communityEn: varchar("communityEn", { length: 100 }),
  communitySlug: varchar("communitySlug", { length: 50 }),
  communityColor: varchar("communityColor", { length: 20 }),
  eventType: varchar("eventType", { length: 100 }),
  eventTypeEn: varchar("eventTypeEn", { length: 100 }),
  registerUrl: varchar("registerUrl", { length: 500 }),
  coverImageUrl: varchar("coverImageUrl", { length: 1000 }),
  communityLogoUrl: varchar("communityLogoUrl", { length: 1000 }),
  capacity: int("capacity"),
  status: mysqlEnum("status", ["upcoming", "past", "cancelled"]).default("upcoming").notNull(),
  featured: boolean("featured").default(false).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdBy: int("createdBy"),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;