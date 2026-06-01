/**
 * Admin Dashboard Router Tests
 * Tests for directory, news, media, and admin routers
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the db module
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
}));

// Mock the _core/trpc module
vi.mock("./_core/trpc", () => ({
  router: (routes: Record<string, unknown>) => routes,
  publicProcedure: {
    query: (fn: unknown) => ({ type: "query", fn }),
    mutation: (fn: unknown) => ({ type: "mutation", fn }),
    input: () => ({
      query: (fn: unknown) => ({ type: "query", fn }),
      mutation: (fn: unknown) => ({ type: "mutation", fn }),
    }),
  },
  adminProcedure: {
    query: (fn: unknown) => ({ type: "query", fn }),
    mutation: (fn: unknown) => ({ type: "mutation", fn }),
    input: () => ({
      query: (fn: unknown) => ({ type: "query", fn }),
      mutation: (fn: unknown) => ({ type: "mutation", fn }),
    }),
    use: () => ({
      query: (fn: unknown) => ({ type: "query", fn }),
      mutation: (fn: unknown) => ({ type: "mutation", fn }),
      input: () => ({
        query: (fn: unknown) => ({ type: "query", fn }),
        mutation: (fn: unknown) => ({ type: "mutation", fn }),
      }),
    }),
  },
  protectedProcedure: {
    query: (fn: unknown) => ({ type: "query", fn }),
    mutation: (fn: unknown) => ({ type: "mutation", fn }),
    input: () => ({
      query: (fn: unknown) => ({ type: "query", fn }),
      mutation: (fn: unknown) => ({ type: "mutation", fn }),
    }),
    use: () => ({
      query: (fn: unknown) => ({ type: "query", fn }),
      mutation: (fn: unknown) => ({ type: "mutation", fn }),
      input: () => ({
        query: (fn: unknown) => ({ type: "query", fn }),
        mutation: (fn: unknown) => ({ type: "mutation", fn }),
      }),
    }),
  },
  TRPCError: class TRPCError extends Error {
    code: string;
    constructor({ code, message }: { code: string; message?: string }) {
      super(message ?? code);
      this.code = code;
    }
  },
}));

describe("Admin Dashboard Routers", () => {
  describe("Directory Router Structure", () => {
    it("should export directoryRouter", async () => {
      const mod = await import("./routers/directory");
      expect(mod.directoryRouter).toBeDefined();
    });

    it("should have required procedures", async () => {
      const mod = await import("./routers/directory");
      const router = mod.directoryRouter as Record<string, unknown>;
      expect(router).toHaveProperty("list");
      expect(router).toHaveProperty("adminList");
      expect(router).toHaveProperty("create");
      expect(router).toHaveProperty("update");
      expect(router).toHaveProperty("delete");
    });
  });

  describe("News Router Structure", () => {
    it("should export newsRouter and mediaRouter", async () => {
      const mod = await import("./routers/news");
      expect(mod.newsRouter).toBeDefined();
      expect(mod.mediaRouter).toBeDefined();
    });

    it("newsRouter should have required procedures", async () => {
      const mod = await import("./routers/news");
      const router = mod.newsRouter as Record<string, unknown>;
      expect(router).toHaveProperty("list");
      expect(router).toHaveProperty("adminList");
      expect(router).toHaveProperty("create");
      expect(router).toHaveProperty("update");
      expect(router).toHaveProperty("delete");
    });

    it("mediaRouter should have required procedures", async () => {
      const mod = await import("./routers/news");
      const router = mod.mediaRouter as Record<string, unknown>;
      expect(router).toHaveProperty("adminList");
      expect(router).toHaveProperty("create");
      expect(router).toHaveProperty("delete");
    });
  });

  describe("Admin Router Structure", () => {
    it("should export adminRouter", async () => {
      const mod = await import("./routers/admin");
      expect(mod.adminRouter).toBeDefined();
    });

    it("should have stats and recentActivity procedures", async () => {
      const mod = await import("./routers/admin");
      const router = mod.adminRouter as Record<string, unknown>;
      expect(router).toHaveProperty("stats");
      expect(router).toHaveProperty("recentActivity");
    });

    it("should have events sub-router", async () => {
      const mod = await import("./routers/admin");
      const router = mod.adminRouter as Record<string, unknown>;
      expect(router).toHaveProperty("events");
    });

    it("should have users sub-router", async () => {
      const mod = await import("./routers/admin");
      const router = mod.adminRouter as Record<string, unknown>;
      expect(router).toHaveProperty("users");
    });
  });

  describe("App Router Integration", () => {
    it("should export appRouter with all sub-routers", async () => {
      const mod = await import("./routers");
      expect(mod.appRouter).toBeDefined();
      const router = mod.appRouter as Record<string, unknown>;
      expect(router).toHaveProperty("directory");
      expect(router).toHaveProperty("news");
      expect(router).toHaveProperty("media");
      expect(router).toHaveProperty("admin");
      expect(router).toHaveProperty("auth");
      expect(router).toHaveProperty("system");
    });
  });
});
