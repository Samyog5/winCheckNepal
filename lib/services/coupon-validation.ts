export interface CouponValidationResult {
  isValid: boolean;
  normalizedCoupon: string | null;
  error?: string;
}

/**
 * Normalizes raw coupon text extracted via OCR or manual input.
 * Pipeline:
 * - Trim whitespace
 * - Preserve leading zeros exactly (e.g. 015585780989)
 * - Strip all non-digit characters
 * - Store as pure numeric string/text (never converted to integer)
 * - Validate string length (8 to 16 digits)
 */
export function normalizeAndValidateCoupon(rawCoupon: string | null | undefined): CouponValidationResult {
  if (!rawCoupon) {
    return {
      isValid: false,
      normalizedCoupon: null,
      error: "Coupon number is missing or empty",
    };
  }

  // 1. Trim leading and trailing whitespace
  const trimmed = rawCoupon.trim();

  // 2. Extract digits only while preserving leading zeros exactly
  const numericOnly = trimmed.replace(/\D/g, "");

  // 3. Validate numeric string length (real IRD coupons are 10-14 digits like 015585780989)
  if (numericOnly.length < 8 || numericOnly.length > 16) {
    return {
      isValid: false,
      normalizedCoupon: null,
      error: `Invalid coupon number length (${numericOnly.length} digits). Must be a 10-14 digit numeric code.`,
    };
  }

  return {
    isValid: true,
    normalizedCoupon: numericOnly,
  };
}
