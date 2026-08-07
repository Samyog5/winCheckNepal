import { IOCRProvider, OCRResult } from "./types";
import { LocalOCRProvider } from "./local-provider";
import { OpenRouterVisionProvider } from "./openrouter-provider";
import { DEFAULT_OCR_CONFIDENCE_THRESHOLD } from "./constants";

export class HybridOCRProvider implements IOCRProvider {
  readonly name: string = "HybridOCRProvider";
  private localProvider: LocalOCRProvider;
  private fallbackProvider: OpenRouterVisionProvider;
  private confidenceThreshold: number;

  constructor() {
    this.localProvider = new LocalOCRProvider();
    this.fallbackProvider = new OpenRouterVisionProvider();
    this.confidenceThreshold =
      Number(process.env.OCR_CONFIDENCE_THRESHOLD) || DEFAULT_OCR_CONFIDENCE_THRESHOLD;
  }

  async processImage(imageBuffer: Buffer): Promise<OCRResult> {
    const startTime = Date.now();

    // Step 1: Run Local Primary OCR
    let localResult: OCRResult;
    try {
      localResult = await this.localProvider.processImage(imageBuffer);
      console.log(
        `[Hybrid OCR] Local OCR completed in ${localResult.processingTime}ms. Confidence: ${localResult.confidence}, Coupons found: ${localResult.couponNumbers?.length || 0}`
      );

      // Step 2: Evaluate confidence against threshold
      if (
        localResult.confidence >= this.confidenceThreshold &&
        localResult.couponNumbers &&
        localResult.couponNumbers.length > 0
      ) {
        console.log(
          `[Hybrid OCR] Primary Local OCR succeeded (Confidence: ${localResult.confidence} >= ${this.confidenceThreshold}). Skipping fallback.`
        );
        return {
          ...localResult,
          processingTime: Date.now() - startTime,
          provider: "LocalOCRProvider",
        };
      }
    } catch (err) {
      console.warn(`[Hybrid OCR] Local OCR encounter: ${err instanceof Error ? err.message : String(err)}. Falling back to OpenRouter Vision...`);
    }

    // Step 3: Invoke OpenRouter Vision Fallback
    console.log(
      `[Hybrid OCR] Local OCR confidence below threshold (${this.confidenceThreshold}) or no coupons found. Invoking OpenRouter Vision Fallback...`
    );

    const fallbackResult = await this.fallbackProvider.processImage(imageBuffer);
    console.log(
      `[Hybrid OCR] OpenRouter Vision Fallback completed in ${fallbackResult.processingTime}ms. Extracted ${fallbackResult.couponNumbers?.length || 0} coupons.`
    );

    return {
      ...fallbackResult,
      processingTime: Date.now() - startTime,
      provider: "OpenRouterVisionProvider",
    };
  }
}
