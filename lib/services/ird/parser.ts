import { IRDApiDrawDTO, IRDApiWinnerDTO } from "./types";

export interface ParsedWinner {
  couponNumber: string;
  rank: string;
  fiscalYear: string;
}

export interface ParsedDraw {
  drawId: string;
  category: string;
  titleEn: string;
  titleNe: string;
  publishedAt: Date;
  claimDeadline: Date;
  eligibleFrom?: Date;
  eligibleTo?: Date;
  drawType?: string;
  winners: ParsedWinner[];
}

/**
 * Normalizes raw IRD API coupon input string.
 * STRICT REQUIREMENT: Must ALWAYS remain string, preserving leading zeros (e.g. "007315254493").
 */
export function normalizeCouponNumber(raw: string | number | undefined | null): string {
  if (raw === undefined || raw === null) return "";
  const str = String(raw).trim();
  const cleaned = str.replace(/[\s\-]/g, "");
  return cleaned;
}

/**
 * Parses a raw IRD API Draw DTO into normalized database ready models.
 */
export function parseDrawDTO(dto: IRDApiDrawDTO): ParsedDraw {
  const rawDrawId = dto.draw_id ?? dto.drawId ?? dto.id ?? `DRAW-${Date.now()}`;
  const drawId = String(rawDrawId);

  const rawWinners = dto.winners || [];
  const winners: ParsedWinner[] = rawWinners.map((w: IRDApiWinnerDTO) => {
    const rawCoupon = w.prize_coupon_number ?? w.coupon_number ?? w.couponNumber;
    const coupon = normalizeCouponNumber(rawCoupon);
    const rank = String(w.winner_rank ?? w.rank ?? "1");
    const fiscalYear = String(w.prize_fiscal_year_code ?? w.fiscal_year ?? "2083-84");

    return {
      couponNumber: coupon,
      rank,
      fiscalYear,
    };
  });

  const category = String(dto.category_title_en ?? dto.category ?? "Taxpayer Incentive Program");
  const titleEn = String(dto.title_en ?? dto.titleEn ?? `IRD Draw ${drawId}`);
  const titleNe = String(dto.title_ne ?? dto.titleNe ?? `मासिक कर लटरी ${drawId}`);
  const publishedAt = dto.published_at ?? dto.publishedAt ? new Date(dto.published_at || dto.publishedAt!) : new Date();
  const claimDeadline = dto.claim_deadline ?? dto.claimDeadline ? new Date(dto.claim_deadline || dto.claimDeadline!) : new Date(Date.now() + 35 * 24 * 60 * 60 * 1000);
  const eligibleFrom = dto.eligible_from ?? dto.eligibleFrom ? new Date(dto.eligible_from || dto.eligibleFrom!) : undefined;
  const eligibleTo = dto.eligible_to ?? dto.eligibleTo ? new Date(dto.eligible_to || dto.eligibleTo!) : undefined;
  const drawType = String(dto.draw_type ?? dto.drawType ?? "GENERAL");

  return {
    drawId,
    category,
    titleEn,
    titleNe,
    publishedAt,
    claimDeadline,
    eligibleFrom,
    eligibleTo,
    drawType,
    winners,
  };
}
