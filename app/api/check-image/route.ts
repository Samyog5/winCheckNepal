import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { processImageOCR } from "@/lib/services/ocr";
import { OCRError } from "@/lib/services/ocr/types";
import { normalizeAndValidateCoupon } from "@/lib/services/coupon-validation";
import { prisma, withPrismaRetry } from "@/lib/prisma";
import { SingleCouponCheckItem, WinnerRecord } from "@/types/lottery";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]);

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Content-Type Validation
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        {
          success: false,
          provider: null,
          confidence: null,
          couponNumbers: [],
          results: [],
          couponNumber: null,
          winner: false,
          prize: null,
          error: "Invalid content type. Must be multipart/form-data",
        },
        { status: 400 }
      );
    }

    // 2. Parse Multipart Form Data
    const formData = await req.formData();
    const file = (formData.get("image") || formData.get("file")) as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          provider: null,
          confidence: null,
          couponNumbers: [],
          results: [],
          couponNumber: null,
          winner: false,
          prize: null,
          error: "No image file provided in upload request",
        },
        { status: 400 }
      );
    }

    // 3. File Size Security Check
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          provider: null,
          confidence: null,
          couponNumbers: [],
          results: [],
          couponNumber: null,
          winner: false,
          prize: null,
          error: "File too large. Maximum file size is 5 MB",
        },
        { status: 400 }
      );
    }

    // 4. File Extension & MIME Type Security Check
    const mimeType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();
    const hasValidExtension = /\.(png|jpg|jpeg|webp)$/i.test(fileName);

    if (!ALLOWED_MIME_TYPES.has(mimeType) && !hasValidExtension) {
      return NextResponse.json(
        {
          success: false,
          provider: null,
          confidence: null,
          couponNumbers: [],
          results: [],
          couponNumber: null,
          winner: false,
          prize: null,
          error: "Unsupported image format. Allowed formats: PNG, JPG, JPEG, WEBP",
        },
        { status: 400 }
      );
    }

    // 5. Read Image File Stream into Memory Buffer
    const arrayBuffer = await file.arrayBuffer();
    const rawBuffer = Buffer.from(arrayBuffer);

    // 6. Preprocess Image in Memory using Sharp
    let processedBuffer: Buffer;
    try {
      let pipeline = sharp(rawBuffer)
        .rotate()
        .resize({ width: 1200, fit: "inside", withoutEnlargement: true });

      try {
        pipeline = pipeline.trim({ threshold: 10 });
      } catch {
        // Ignore trim if background is uniform
      }

      processedBuffer = await pipeline
        .sharpen({ sigma: 1.0 })
        .linear(1.15, -10)
        .jpeg({ quality: 90 })
        .toBuffer();
    } catch (sharpError) {
      console.error("[Sharp Preprocessing Error]:", sharpError);
      return NextResponse.json(
        {
          success: false,
          provider: null,
          confidence: null,
          couponNumbers: [],
          results: [],
          couponNumber: null,
          winner: false,
          prize: null,
          error: "Malformed or corrupted image file",
        },
        { status: 400 }
      );
    }

    console.log(
      `[Image Upload] Preprocessed successfully. Size: ${processedBuffer.length} bytes, MIME: ${mimeType}`
    );

    // 7. Execute Hybrid OCR Service Layer Pipeline
    let ocrResult;
    try {
      ocrResult = await processImageOCR(processedBuffer);
    } catch (ocrError) {
      if (ocrError instanceof OCRError) {
        return NextResponse.json(
          {
            success: false,
            provider: null,
            confidence: null,
            couponNumbers: [],
            results: [],
            couponNumber: null,
            winner: false,
            prize: null,
            error: ocrError.message,
          },
          { status: ocrError.statusCode }
        );
      }
      throw ocrError;
    }

    // 8. Post Processing: Extract and validate detected coupon numbers
    const rawCouponsList = ocrResult.couponNumbers && ocrResult.couponNumbers.length > 0
      ? ocrResult.couponNumbers
      : ocrResult.couponNumber
      ? [ocrResult.couponNumber]
      : [];

    const validCoupons: string[] = [];
    for (const rawC of rawCouponsList) {
      const v = normalizeAndValidateCoupon(rawC);
      if (v.isValid && v.normalizedCoupon && !validCoupons.includes(v.normalizedCoupon)) {
        validCoupons.push(v.normalizedCoupon);
      }
    }

    if (validCoupons.length === 0) {
      return NextResponse.json(
        {
          success: false,
          provider: ocrResult.provider,
          confidence: ocrResult.confidence,
          couponNumbers: [],
          results: [],
          couponNumber: null,
          winner: false,
          prize: null,
          error: "No valid coupon numbers could be recognized from the image",
        },
        { status: 422 }
      );
    }

    // 9. Batch Database Verification: Single Prisma query with resilient auto-reconnect
    const dbWinners = await withPrismaRetry(() =>
      prisma.winner.findMany({
        where: {
          couponNumber: {
            in: validCoupons,
          },
        },
        include: {
          draw: true,
        },
      })
    ).catch((err) => {
      console.warn("[Check-Image API] DB query fallback:", err);
      return [];
    });

    // Create a Map keyed strictly by exact string couponNumber (preserving leading zeros)
    const winnerMap = new Map<string, (typeof dbWinners)[0]>();
    for (const w of dbWinners) {
      winnerMap.set(w.couponNumber, w);
    }

    const multiResults: SingleCouponCheckItem[] = [];
    let winningCount = 0;

    for (const couponNumber of validCoupons) {
      const dbWinner = winnerMap.get(couponNumber);
      const isWinner = !!dbWinner;

      let winnerDetails: WinnerRecord | undefined = undefined;

      if (dbWinner) {
        winningCount++;
        const category = dbWinner.draw?.category || (dbWinner.rank ? `${dbWinner.rank} Rank Prize` : "Daily Prize");
        const isBumper = category.toLowerCase().includes("bumper");
        const prizeAmount = isBumper ? 1000000 : 133334;

        winnerDetails = {
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

      // Log check event in CheckHistory safely
      withPrismaRetry(() =>
        prisma.checkHistory.create({
          data: {
            couponNumber,
            method: "IMAGE",
            winnerFound: isWinner,
          },
        })
      ).catch(() => null);

      multiResults.push({
        couponNumber,
        isWinner,
        winnerDetails,
      });
    }

    const primaryResult = multiResults[0];
    const totalProcessingTime = Date.now() - startTime;
    console.log(
      `[Check-Image API] Completed in ${totalProcessingTime}ms. Provider: ${ocrResult.provider}, Checked: ${validCoupons.length}, Winners: ${winningCount}`
    );

    return NextResponse.json(
      {
        success: true,
        provider: ocrResult.provider,
        confidence: ocrResult.confidence,
        couponNumbers: validCoupons,
        results: multiResults,
        couponNumber: primaryResult.couponNumber,
        winner: winningCount > 0,
        prize: primaryResult.winnerDetails
          ? {
              prizeCategory: primaryResult.winnerDetails.prizeCategory,
              prizeAmount: primaryResult.winnerDetails.prizeAmount,
              drawDateBS: primaryResult.winnerDetails.drawDateBS,
              claimDeadlineBS: primaryResult.winnerDetails.claimDeadlineBS,
            }
          : null,
        totalDetected: validCoupons.length,
        winningCount,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Check-Image API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        provider: null,
        confidence: null,
        couponNumbers: [],
        results: [],
        couponNumber: null,
        winner: false,
        prize: null,
        error: "Internal server error during image coupon verification",
      },
      { status: 500 }
    );
  }
}
