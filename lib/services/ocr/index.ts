import { getActiveOCRProvider } from "./provider";
import { OCRResult, OCRError } from "./types";

/**
 * Executes OCR extraction using the configured pluggable OCR provider engine.
 * Measures execution time and returns normalized result or throws OCRError.
 */
export async function processImageOCR(imageBuffer: Buffer): Promise<OCRResult> {
  const startTime = Date.now();
  const provider = getActiveOCRProvider();

  try {
    const result = await provider.processImage(imageBuffer);
    const processingTime = Date.now() - startTime;

    // Log performance metrics safely (NEVER log image buffers or raw PII)
    console.log(
      `[OCR Service] Execution completed. Provider: ${provider.name}, Time: ${processingTime}ms, Confidence: ${result.confidence}`
    );

    return {
      ...result,
      processingTime,
      provider: provider.name,
    };
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error(
      `[OCR Service] Execution failed. Provider: ${provider.name}, Time: ${processingTime}ms, Error: ${
        error instanceof Error ? error.message : String(error)
      }`
    );

    if (error instanceof OCRError) {
      throw error;
    }
    throw new OCRError("OCR processing failed", 500, "OCR_FAILED");
  }
}
