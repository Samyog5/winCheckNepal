import { prisma } from "../../prisma";
import { ParsedDraw } from "./parser";

export interface SyncStats {
  drawsDownloaded: number;
  drawsInserted: number;
  winnersInserted: number;
}

/**
 * Checks whether a drawId already exists in the database
 */
export async function drawExistsInDatabase(drawId: string): Promise<boolean> {
  try {
    const existing = await prisma.draw.findUnique({
      where: { drawId },
      select: { id: true },
    });
    return !!existing;
  } catch {
    return false;
  }
}

/**
 * Inserts a parsed Draw and all its winners atomically into PostgreSQL
 */
export async function insertDrawWithWinners(draw: ParsedDraw): Promise<{ winnersCount: number }> {
  let winnersCount = 0;

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Create or update Draw record
      await tx.draw.upsert({
        where: { drawId: draw.drawId },
        update: {
          category: draw.category,
          titleEn: draw.titleEn,
          titleNe: draw.titleNe,
          publishedAt: draw.publishedAt,
          claimDeadline: draw.claimDeadline,
          eligibleFrom: draw.eligibleFrom,
          eligibleTo: draw.eligibleTo,
          drawType: draw.drawType,
        },
        create: {
          drawId: draw.drawId,
          category: draw.category,
          titleEn: draw.titleEn,
          titleNe: draw.titleNe,
          publishedAt: draw.publishedAt,
          claimDeadline: draw.claimDeadline,
          eligibleFrom: draw.eligibleFrom,
          eligibleTo: draw.eligibleTo,
          drawType: draw.drawType,
        },
      });

      // 2. Insert Winners preserving exact coupon string with leading zeros
      for (const w of draw.winners) {
        if (!w.couponNumber) continue;

        await tx.winner.create({
          data: {
            drawId: draw.drawId,
            couponNumber: w.couponNumber,
            rank: w.rank,
            fiscalYear: w.fiscalYear,
          },
        });
        winnersCount++;
      }
    });
  } catch (err) {
    console.error(`[IRD Database] Error inserting draw ${draw.drawId}:`, err);
  }

  return { winnersCount };
}
