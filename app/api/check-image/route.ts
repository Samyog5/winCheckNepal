import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { processImageOCR } from "@/lib/services/ocr";
import { OCRError } from "@/lib/services/ocr/types";
import { normalizeAndValidateCoupon } from "@/lib/services/coupon-validation";
import { prisma } from "@/lib/prisma";
import { dummyWinnersData } from "@/prisma/seed";

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
          couponNumber: null,
          winner: false,
          prize: null,
          confidence: null,
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
          couponNumber: null,
          winner: false,
          prize: null,
          confidence: null,
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
          couponNumber: null,
          winner: false,
          prize: null,
          confidence: null,
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
          couponNumber: null,
          winner: false,
          prize: null,
          confidence: null,
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
          couponNumber: null,
          winner: false,
          prize: null,
          confidence: null,
          error: "Malformed or corrupted image file",
        },
        { status: 400 }
      );
    }

    console.log(
      `[Image Upload] Preprocessed successfully. Size: ${processedBuffer.length} bytes, MIME: ${mimeType}`
    );

    // 7. Execute OCR Service Layer Pipeline
    let ocrResult;
    try {
      ocrResult = await processImageOCR(processedBuffer);
    } catch (ocrError) {
      if (ocrError instanceof OCRError) {
        return NextResponse.json(
          {
            success: false,
            couponNumber: null,
            winner: false,
            prize: null,
            confidence: null,
            error: ocrError.message,
          },
          { status: ocrError.statusCode }
        );
      }
      throw ocrError;
    }

    // 8. Normalize & Validate Extracted Coupon Number
    const validation = normalizeAndValidateCoupon(ocrResult.couponNumber);
    if (!validation.isValid || !validation.normalizedCoupon) {
      return NextResponse.json(
        {
          success: false,
          couponNumber: null,
          winner: false,
          prize: null,
          confidence: ocrResult.confidence,
          error: validation.error || "No valid coupon number could be recognized from the image",
        },
        { status: 422 }
      );
    }

    const couponNumber = validation.normalizedCoupon;

    // 9. Query Winner Database safely with joined Draw details
    let winner = false;
    let prizeDetails: {
      prizeCategory: string;
      prizeAmount: number;
      drawDateBS: string;
      claimDeadlineBS: string;
    } | null = null;

    try {
      const dbWinner = await prisma.winner
        .findFirst({
          where: { couponNumber },
          include: { draw: true },
        })
        .catch(() => null);

      if (dbWinner) {
        winner = true;
        const category = dbWinner.draw?.category || (dbWinner.rank ? `${dbWinner.rank} Rank Prize` : "Daily Prize");
        const isBumper = category.toLowerCase().includes("bumper");
        const prizeAmount = isBumper ? 1000000 : 133334;

        prizeDetails = {
          prizeCategory: category,
          prizeAmount,
          drawDateBS: dbWinner.draw?.publishedAt
            ? dbWinner.draw.publishedAt.toISOString().split("T")[0]
            : "2081-04-15",
          claimDeadlineBS: dbWinner.draw?.claimDeadline
            ? dbWinner.draw.claimDeadline.toISOString().split("T")[0]
            : "2081-05-20",
        };
      } else {
        const seedMatch = dummyWinnersData.find(
          (w) => w.couponNumber === couponNumber
        );
        if (seedMatch) {
          winner = true;
          prizeDetails = {
            prizeCategory: seedMatch.prizeCategory,
            prizeAmount: seedMatch.prizeAmount,
            drawDateBS: seedMatch.drawDateBS,
            claimDeadlineBS: seedMatch.claimDeadlineBS,
          };
        }
      }

      // 10. Log in CheckHistory
      await prisma.checkHistory
        .create({
          data: {
            couponNumber,
            method: "IMAGE",
            winnerFound: winner,
          },
        })
        .catch(() => null);
    } catch (dbError) {
      console.warn("[Check-Image API] Database log warning:", dbError);
    }

    const totalProcessingTime = Date.now() - startTime;
    console.log(
      `[Check-Image API] Pipeline completed in ${totalProcessingTime}ms. Coupon: ${couponNumber}, Winner: ${winner}`
    );

    return NextResponse.json(
      {
        success: true,
        couponNumber,
        winner,
        prize: prizeDetails,
        confidence: ocrResult.confidence,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Check-Image API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        couponNumber: null,
        winner: false,
        prize: null,
        confidence: null,
        error: "Internal server error during image coupon verification",
      },
      { status: 500 }
    );
  }
}
