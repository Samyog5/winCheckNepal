import { IOCRProvider, OCRResult, OCRError } from "./types";
import { HybridOCRProvider } from "./hybrid-provider";
import { LocalOCRProvider } from "./local-provider";
import { OpenRouterVisionProvider } from "./openrouter-provider";

export class DefaultOCRProvider implements IOCRProvider {
  readonly name: string = "DefaultOCRProvider";

  async processImage(): Promise<OCRResult> {
    throw new OCRError("Provider not configured", 501);
  }
}

/**
 * Returns active OCR Provider implementation instance based on OCR_PROVIDER environment configuration
 */
export function getActiveOCRProvider(): IOCRProvider {
  const ocrProviderConfig = (process.env.OCR_PROVIDER || "hybrid").toLowerCase();

  if (ocrProviderConfig === "local" || ocrProviderConfig === "rapidocr") {
    return new LocalOCRProvider();
  }

  if (ocrProviderConfig === "openrouter") {
    return new OpenRouterVisionProvider();
  }

  // Default: Hybrid Provider (Local Primary -> OpenRouter Fallback)
  return new HybridOCRProvider();
}

export { HybridOCRProvider, LocalOCRProvider, OpenRouterVisionProvider };
