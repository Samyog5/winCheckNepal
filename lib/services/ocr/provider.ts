import { IOCRProvider, OCRResult, OCRError } from "./types";

/**
 * Default / Unconfigured OCR Provider implementation.
 * Replaceable at runtime or config with OpenRouter, EasyOCR, RapidOCR, Gemini adapters.
 */
export class DefaultOCRProvider implements IOCRProvider {
  public name = "default-unconfigured";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async processImage(imageBuffer: Buffer): Promise<OCRResult> {
    throw new OCRError("Provider not configured", 501, "PROVIDER_NOT_CONFIGURED");
  }
}

/**
 * Active OCR Provider instance resolver.
 * Easy drop-in point for future OCR engine providers.
 */
export function getActiveOCRProvider(): IOCRProvider {
  return new DefaultOCRProvider();
}
