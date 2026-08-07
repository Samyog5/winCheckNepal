/**
 * Official IRD JSON API Response DTOs matching prize.ird.gov.np
 */

export interface IRDApiWinnerDTO {
  winner_rank?: number | string;
  rank?: number | string;
  prize_fiscal_year_code?: string;
  fiscal_year?: string;
  prize_coupon_number?: string | number;
  coupon_number?: string | number;
  couponNumber?: string | number;
}

export interface IRDApiDrawDTO {
  draw_id?: string;
  drawId?: string;
  id?: string;
  category_title_en?: string;
  category_title_ne?: string;
  category?: string;
  draw_type?: string;
  drawType?: string;
  title_en?: string;
  titleEn?: string;
  title_ne?: string;
  titleNe?: string;
  eligible_from?: string;
  eligibleFrom?: string;
  eligible_to?: string;
  eligibleTo?: string;
  published_at?: string;
  publishedAt?: string;
  claim_deadline?: string;
  claimDeadline?: string;
  claim_open?: boolean;
  winners?: IRDApiWinnerDTO[];
}

export interface IRDApiCategoryDTO {
  category_id: string;
  title_en: string;
  title_ne: string;
}

export interface IRDApiFiscalYearDTO {
  fiscal_year_code: string;
  display_name: string;
  winner_count: number;
}

export interface IRDApiResponse {
  limit?: number;
  offset?: number;
  total_draws?: number;
  has_more?: boolean;
  hasMore?: boolean;
  fiscal_years?: IRDApiFiscalYearDTO[];
  categories?: IRDApiCategoryDTO[];
  draws?: IRDApiDrawDTO[];
  data?: IRDApiDrawDTO[];
  success?: boolean;
  message?: string;
}

export interface FetchWinnersOptions {
  limit?: number;
  offset?: number;
}

export class IRDApiError extends Error {
  public statusCode?: number;
  public isRetryable: boolean;

  constructor(message: string, statusCode?: number, isRetryable = false) {
    super(message);
    this.name = "IRDApiError";
    this.statusCode = statusCode;
    this.isRetryable = isRetryable;
  }
}
