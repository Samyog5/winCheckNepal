import { z } from "zod";

export const couponCheckSchema = z.object({
  couponNumber: z
    .string()
    .min(8, { message: "Coupon number must be at least 8 digits" })
    .max(16, { message: "Coupon number cannot exceed 16 digits" })
    .regex(/^\d+$/, {
      message: "Coupon number must be numeric (e.g. 015585780989)",
    }),
});

export type CouponCheckFormValues = z.infer<typeof couponCheckSchema>;
