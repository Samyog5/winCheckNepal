"use server";

import { prisma } from "@/lib/prisma";
import { CouponCheckResult, WinnerRecord } from "@/types/lottery";

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
    // Exact string comparison against Winner table in PostgreSQL
    const dbWinner = await prisma.winner
      .findFirst({
        where: { couponNumber },
        include: { draw: true },
      })
      .catch(() => null);

    if (dbWinner) {
      isWinner = true;
      const category = dbWinner.draw?.category || (dbWinner.rank ? `${dbWinner.rank} Rank Prize` : "Daily Prize");
      const isBumper = category.toLowerCase().includes("bumper");
      const prizeAmount = isBumper ? 1000000 : 133334;

      winnerRecord = {
        id: dbWinner.id,
        couponNumber: dbWinner.couponNumber,
        drawDateBS: dbWinner.draw?.publishedAt
          ? dbWinner.draw.publishedAt.toISOString().split("T")[0]
          : "2081-04-15",
        drawDateAD: dbWinner.draw?.publishedAt || new Date(),
        drawTitle: dbWinner.draw?.titleEn || "IRD Taxpayer Incentive Draw",
        prizeCategory: category,
        prizeAmount,
        claimDeadlineBS: dbWinner.draw?.claimDeadline
          ? dbWinner.draw.claimDeadline.toISOString().split("T")[0]
          : "2081-05-20",
        claimDeadlineAD: dbWinner.draw?.claimDeadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: dbWinner.createdAt,
      };
    }

    // Record check in CheckHistory
    await prisma.checkHistory
      .create({
        data: {
          couponNumber,
          method,
          winnerFound: isWinner,
        },
      })
      .catch(() => null);
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
 * Fetch 15 latest official IRD winners for homepage section
 */
export async function getLatestWinnersAction(): Promise<WinnerRecord[]> {
  try {
    const winners = await prisma.winner
      .findMany({
        take: 15,
        orderBy: { createdAt: "desc" },
        include: { draw: true },
      })
      .catch(() => []);

    if (winners && winners.length > 0) {
      return winners.map((w) => {
        const category = w.draw?.category || (w.rank ? `${w.rank} Rank Prize` : "Daily Prize");
        const isBumper = category.toLowerCase().includes("bumper");
        const prizeAmount = isBumper ? 1000000 : 133334;

        return {
          id: w.id,
          couponNumber: w.couponNumber,
          drawDateBS: w.draw?.publishedAt
            ? w.draw.publishedAt.toISOString().split("T")[0]
            : "2081-04-15",
          drawDateAD: w.draw?.publishedAt || new Date(),
          drawTitle: w.draw?.titleEn || "IRD Taxpayer Incentive Draw",
          prizeCategory: category,
          prizeAmount,
          claimDeadlineBS: w.draw?.claimDeadline
            ? w.draw.claimDeadline.toISOString().split("T")[0]
            : "2081-05-20",
          claimDeadlineAD: w.draw?.claimDeadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        };
      });
    }
  } catch (err) {
    console.warn("Database lookup for 15 winners warning:", err);
  }

  return [];
}
