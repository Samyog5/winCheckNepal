import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  });

globalForPrisma.prisma = prisma;

/**
 * Resilient query wrapper that automatically retries database operations if
 * a Neon serverless PostgreSQL connection socket was dropped during scale-to-zero.
 */
export async function withPrismaRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  try {
    return await fn();
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    const isConnClosed =
      errMessage.includes("Closed") ||
      errMessage.includes("connection pool") ||
      errMessage.includes("kind: Closed") ||
      errMessage.includes("Can't reach database server") ||
      (error as { code?: string })?.code === "P1001" ||
      (error as { code?: string })?.code === "P1017";

    if (isConnClosed && retries > 0) {
      console.warn("[Prisma] Database connection re-establishing after serverless scale-to-zero idle pause...");
      await prisma.$disconnect().catch(() => {});
      await new Promise((res) => setTimeout(res, 500));
      await prisma.$connect().catch(() => {});
      return withPrismaRetry(fn, retries - 1);
    }
    throw error;
  }
}
