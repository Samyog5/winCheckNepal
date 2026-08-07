import {
  DEFAULT_IRD_API_URL,
  DEFAULT_IRD_API_TIMEOUT_MS,
  MAX_HTTP_RETRIES,
  INITIAL_RETRY_DELAY_MS,
} from "./constants";
import { IRDApiResponse, FetchWinnersOptions, IRDApiError } from "./types";

export class IRDHttpClient {
  private baseUrl: string;
  private timeoutMs: number;

  constructor(
    baseUrl = process.env.IRD_API_URL || DEFAULT_IRD_API_URL,
    timeoutMs = Number(process.env.IRD_API_TIMEOUT) || DEFAULT_IRD_API_TIMEOUT_MS
  ) {
    this.baseUrl = baseUrl;
    this.timeoutMs = timeoutMs;
  }

  /**
   * Fetches winner data from official IRD API with retries and timeout
   */
  async fetchWinners(options: FetchWinnersOptions = {}): Promise<IRDApiResponse> {
    const limit = options.limit ?? 20;
    const offset = options.offset ?? 0;

    const url = new URL(this.baseUrl);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));

    let attempt = 0;
    let lastError: Error | null = null;

    while (attempt <= MAX_HTTP_RETRIES) {
      attempt++;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            Accept: "application/json",
            "User-Agent": "IRD-Lottery-Sync-Engine/1.0",
          },
          signal: controller.signal,
          cache: "no-store",
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const isRetryableStatus = [429, 500, 502, 503, 504].includes(response.status);
          throw new IRDApiError(
            `IRD API returned status HTTP ${response.status}: ${response.statusText}`,
            response.status,
            isRetryableStatus
          );
        }

        const json: IRDApiResponse = await response.json();
        return json;
      } catch (err: unknown) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        lastError = errorObj;
        const isAbort = errorObj.name === "AbortError";
        const isRetryable =
          isAbort ||
          (errorObj instanceof IRDApiError && errorObj.isRetryable) ||
          (errorObj as { code?: string })?.code === "ECONNRESET" ||
          (errorObj as { code?: string })?.code === "ETIMEDOUT";

        if (attempt <= MAX_HTTP_RETRIES && isRetryable) {
          const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt - 1);
          console.warn(
            `[IRD HTTP Client] Attempt ${attempt} failed (${
              isAbort ? "Timeout" : errorObj.message
            }). Retrying in ${delay}ms...`
          );
          await new Promise((res) => setTimeout(res, delay));
        } else {
          break;
        }
      }
    }

    throw new IRDApiError(
      `Failed to connect to IRD API after ${MAX_HTTP_RETRIES + 1} attempts. Error: ${
        lastError?.message || "Unknown error"
      }`,
      500,
      false
    );
  }
}
