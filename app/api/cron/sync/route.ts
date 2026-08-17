import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { syncLatest } from "@/lib/services/ird/sync";

export const dynamic = "force-dynamic";

/**
 * Automated Cron Sync Endpoint.
 * Can be triggered automatically by Vercel Cron Jobs or called manually via HTTP GET.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const cronSecret = process.env.CRON_SECRET;

    // Validate secret if configured
    if (cronSecret && secret !== cronSecret) {
      const authHeader = request.headers.get("authorization");
      if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json(
          { success: false, error: "Unauthorized cron request" },
          { status: 401 }
        );
      }
    }

    console.log("[Cron Sync] Executing routine IRD lottery winner sync...");
    const result = await syncLatest();

    // Revalidate home page cache so new draw winners show up immediately
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        drawsDownloaded: result.drawsDownloaded,
        drawsInserted: result.drawsInserted,
        winnersInserted: result.winnersInserted,
        durationSeconds: result.durationSeconds,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Cron Sync Error]:", message);

    return NextResponse.json(
      {
        success: false,
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
