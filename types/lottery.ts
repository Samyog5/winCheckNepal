export type CheckMethod = "MANUAL" | "IMAGE";

export interface WinnerRecord {
  id: string;
  couponNumber: string;
  drawDateBS: string;
  drawDateAD: string | Date;
  drawTitle: string;
  prizeCategory: string;
  prizeAmount: number;
  claimDeadlineBS: string;
  claimDeadlineAD: string | Date;
  createdAt?: string | Date;
}

export interface CouponCheckResult {
  couponNumber: string;
  isWinner: boolean;
  winnerDetails?: WinnerRecord;
  checkedAt: string;
  referenceId: string;
}

export interface CheckHistoryItem {
  id: string;
  couponNumber: string;
  method: CheckMethod;
  checkedAt: string;
  winnerFound: boolean;
}
