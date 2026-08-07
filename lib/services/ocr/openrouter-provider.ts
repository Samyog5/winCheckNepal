import { IOCRProvider, OCRResult, OCRError } from "./types";

export class OpenRouterVisionProvider implements IOCRProvider {
  readonly name: string = "OpenRouterVisionProvider";
  private apiKey: string;
  private model: string;
  private timeoutMs: number;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || "";
    this.model = process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash";
    this.timeoutMs = 15000; // 15 seconds request timeout
  }

  async processImage(imageBuffer: Buffer): Promise<OCRResult> {
    const startTime = Date.now();

    // 1. Validate API Key Presence
    if (!this.apiKey || this.apiKey.trim() === "") {
      throw new OCRError(
        "OpenRouter API key is not configured. Please set OPENROUTER_API_KEY in .env",
        401
      );
    }

    // 2. Convert Preprocessed Image Buffer to Base64 Data URL
    const base64Image = imageBuffer.toString("base64");
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;

    // 3. Construct OpenRouter Chat Completions JSON Request Payload
    const payload = {
      model: this.model,
      messages: [
        {
          role: "system",
          content:
            'You are an OCR engine.\nRead the uploaded screenshot.\nReturn ONLY coupon numbers.\nCoupon numbers contain digits only.\nReturn JSON:\n{\n  "couponNumbers":[]\n}\nNo explanation.\nNo markdown.',
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all numeric taxpayer coupon numbers from this IRD receipt image into the requested JSON structure.",
            },
            {
              type: "image_url",
              image_url: {
                url: dataUrl,
              },
            },
          ],
        },
      ],
      temperature: 0.1,
      max_tokens: 300,
    };

    // 4. Send Request with AbortController Timeout
    let response: Response;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://ird.gov.np",
          "X-Title": "IRD Lottery Checker",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = (err as { name?: string })?.name === "AbortError";
      if (isAbort) {
        throw new OCRError("OCR request timed out. Please try uploading again.", 408);
      }
      throw new OCRError(`Network error calling OpenRouter API: ${err instanceof Error ? err.message : String(err)}`, 500);
    } finally {
      clearTimeout(timeoutId);
    }

    // 5. Handle HTTP Error Statuses
    if (!response.ok) {
      if (response.status === 401) {
        throw new OCRError("Invalid OpenRouter API key provided", 401);
      }
      if (response.status === 429) {
        throw new OCRError("OpenRouter rate limit exceeded. Please try again later.", 429);
      }
      const errorText = await response.text().catch(() => "");
      throw new OCRError(
        `OpenRouter API HTTP ${response.status}: ${response.statusText || errorText}`,
        response.status
      );
    }

    // 6. Parse JSON Response Body
    let jsonResponse: {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
    };
    try {
      jsonResponse = await response.json();
    } catch {
      throw new OCRError("Malformed JSON response returned by OCR vision engine", 502);
    }

    const content = jsonResponse?.choices?.[0]?.message?.content || "";
    if (!content.trim()) {
      throw new OCRError("No text or coupon number detected in uploaded image", 422);
    }

    // 7. Extract JSON Object or Array from raw output
    const extractedCoupons: string[] = [];

    try {
      // Strip markdown codeblocks if present
      const cleanJsonStr = content.replace(/```json/gi, "").replace(/```/g, "").trim();
      const parsedData = JSON.parse(cleanJsonStr);

      const list = Array.isArray(parsedData)
        ? parsedData
        : Array.isArray(parsedData?.couponNumbers)
        ? parsedData.couponNumbers
        : [];

      for (const item of list) {
        const str = String(item).replace(/\D/g, "");
        if (str.length >= 8 && str.length <= 16) {
          extractedCoupons.push(str);
        }
      }
    } catch {
      // Fallback: Regex scan for all 8-16 digit tokens in raw text
      const matches = content.match(/\d{8,16}/g);
      if (matches) {
        for (const m of matches) {
          extractedCoupons.push(m);
        }
      }
    }

    // Deduplicate coupons while preserving exact order
    const uniqueCoupons = Array.from(new Set(extractedCoupons));

    // 8. Validate Extracted Numeric Coupon Code
    if (uniqueCoupons.length === 0) {
      throw new OCRError(
        `No valid numeric coupons detected. Extracted raw: "${content.trim()}". Coupon codes must be numeric (8-16 digits).`,
        422
      );
    }

    const processingTime = Date.now() - startTime;

    return {
      couponNumber: uniqueCoupons[0],
      couponNumbers: uniqueCoupons,
      confidence: 0.95,
      provider: this.name,
      processingTime,
      rawText: content.trim(),
    };
  }
}
