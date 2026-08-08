"use server";

import { revalidatePath } from "next/cache";
import { prisma, withPrismaRetry } from "@/lib/prisma";
import { CouponCheckResult, WinnerRecord } from "@/types/lottery";

export interface RealtimeStats {
  totalChecked: number;
  totalWinners: number;
  totalDraws: number;
}

/**
 * Server Action to fetch real-time database metrics for homepage stats
 */
export async function getStatsAction(): Promise<RealtimeStats> {
  try {
    return await withPrismaRetry(async () => {
      const [totalChecked, totalWinners, totalDraws] = await Promise.all([
        prisma.checkHistory.count(),
        prisma.winner.count(),
        prisma.draw.count(),
      ]);

      return {
        totalChecked,
        totalWinners,
        totalDraws,
      };
    });
  } catch (err) {
    console.warn("[Stats Action] Database connection warning:", err);
    return {
      totalChecked: 0,
      totalWinners: 0,
      totalDraws: 0,
    };
  }
}

/**
 * Server Action to check a coupon number against official IRD winners
 * and log the lookup event to CheckHistory in the database.
 */
export async function checkCouponNumberAction(
  couponNumberRaw: string,
  method: "MANUAL" | "IMAGE" = "MANUAL"
): Promise<CouponCheckResult> {
  const couponNumber = couponNumberRaw.trim();
  const checkedAt = new Date().toISOString();
  const referenceId = `IRD-CHK-${Math.floor(100000 + Math.random() * 900000)}`;

  if (!couponNumber) {
    return {
      couponNumber: "",
      isWinner: false,
      checkedAt,
      referenceId,
    };
  }

  let winnerRecord: WinnerRecord | null = null;
  let isWinner = false;

  try {
    const dbWinner = await withPrismaRetry(() =>
      prisma.winner.findFirst({
        where: { couponNumber },
        include: { draw: true },
      })
    ).catch(() => null);

    if (dbWinner) {
      isWinner = true;
      const categoryStr = `${dbWinner.draw?.category || ""} ${dbWinner.rank || ""}`;
      const isBumper = categoryStr.toLowerCase().includes("bumper");
      const category = isBumper ? "Bumper Prize (बम्पर पुरस्कार)" : "Daily Prize";
      const prizeAmount = isBumper ? 1000000 : 133334;

      winnerRecord = {
        id: dbWinner.id,
        couponNumber: dbWinner.couponNumber,
        drawDateBS: dbWinner.draw?.publishedAt
          ? dbWinner.draw.publishedAt.toISOString().split("T")[0]
          : "2083-04-22",
        drawDateAD: dbWinner.draw?.publishedAt || new Date(),
        drawTitle: dbWinner.draw?.titleEn || "IRD Taxpayer Incentive Draw",
        prizeCategory: category,
        prizeAmount,
        claimDeadlineBS: dbWinner.draw?.claimDeadline
          ? dbWinner.draw.claimDeadline.toISOString().split("T")[0]
          : "2083-05-07",
        claimDeadlineAD: dbWinner.draw?.claimDeadline || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        createdAt: dbWinner.createdAt,
      };
    }

    // Record check in CheckHistory
    await withPrismaRetry(() =>
      prisma.checkHistory.create({
        data: {
          couponNumber,
          method,
          winnerFound: isWinner,
        },
      })
    ).catch(() => null);

    revalidatePath("/");
  } catch (err) {
    console.warn("[Check Action] Database connection warning:", err);
  }

  return {
    couponNumber,
    isWinner,
    winnerDetails: winnerRecord || undefined,
    checkedAt,
    referenceId,
  };
}

/**
 * Fetch latest official IRD winners including Bumper Prize winners prioritized at top
 */
export async function getLatestWinnersAction(): Promise<WinnerRecord[]> {
  try {
    const winners = await withPrismaRetry(() =>
      prisma.winner.findMany({
        take: 30,
        orderBy: { createdAt: "desc" },
        include: { draw: true },
      })
    ).catch(() => []);

    if (winners && winners.length > 0) {
      const mapped = winners.map((w) => {
        const categoryStr = `${w.draw?.category || ""} ${w.rank || ""}`;
        const isBumper = categoryStr.toLowerCase().includes("bumper");
        const category = isBumper ? "Bumper Prize (बम्पर पुरस्कार)" : "Daily Prize";
        const prizeAmount = isBumper ? 1000000 : 133334;

        return {
          id: w.id,
          couponNumber: w.couponNumber,
          drawDateBS: w.draw?.publishedAt
            ? w.draw.publishedAt.toISOString().split("T")[0]
            : "2083-04-22",
          drawDateAD: w.draw?.publishedAt || new Date(),
          drawTitle: w.draw?.titleEn || "IRD Taxpayer Incentive Draw",
          prizeCategory: category,
          prizeAmount,
          claimDeadlineBS: w.draw?.claimDeadline
            ? w.draw.claimDeadline.toISOString().split("T")[0]
            : "2083-05-07",
          claimDeadlineAD: w.draw?.claimDeadline || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          isBumper,
        };
      });

      // Sort bumper prize winners to the top
      mapped.sort((a, b) => (b.isBumper ? 1 : 0) - (a.isBumper ? 1 : 0));

      return mapped.slice(0, 15);
    }
  } catch (err) {
    console.warn("Database lookup for latest winners warning:", err);
  }

  return [];
}
