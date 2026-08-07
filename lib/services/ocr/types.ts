export interface OCRResult {
  couponNumber: string | null;
  couponNumbers?: string[];
  confidence: number;
  processingTime: number;
  provider: string;
  rawText: string;
}

export interface IOCRProvider {
  name: string;
  processImage(imageBuffer: Buffer): Promise<OCRResult>;
}

export class OCRError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, statusCode = 500, code = "OCR_ERROR") {
    super(message);
    this.name = "OCRError";
    this.statusCode = statusCode;
    this.code = code;
  }
}
