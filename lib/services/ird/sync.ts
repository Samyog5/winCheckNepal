import { IRDHttpClient } from "./client";
import { parseDrawDTO } from "./parser";
import { drawExistsInDatabase, insertDrawWithWinners } from "./database";

export interface SyncResult {
  drawsDownloaded: number;
  drawsInserted: number;
  winnersInserted: number;
  durationSeconds: number;
}

/**
 * Syncs only the latest draw session from the official IRD JSON API.
 * Stops if the latest drawId already exists in the database.
 */
export async function syncLatest(): Promise<SyncResult> {
  const startTime = Date.now();
  console.log("Connecting to IRD API...");

  const client = new IRDHttpClient();
  let drawsDownloaded = 0;
  let drawsInserted = 0;
  let winnersInserted = 0;

  try {
    const apiResponse = await client.fetchWinners({ limit: 10, offset: 0 });
    const rawDraws = apiResponse.draws || apiResponse.data || [];
    drawsDownloaded = rawDraws.length;

    for (const rawDraw of rawDraws) {
      const parsed = parseDrawDTO(rawDraw);

      const exists = await drawExistsInDatabase(parsed.drawId);
      if (exists) {
        console.log(`[Sync Latest] Draw ${parsed.drawId} already exists in database. Stopping latest sync.`);
        break;
      }

      const res = await insertDrawWithWinners(parsed);
      drawsInserted++;
      winnersInserted += res.winnersCount;
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[Sync Latest Error]: ${message}`);
  }

  const durationSeconds = Number(((Date.now() - startTime) / 1000).toFixed(1));

  console.log(`Downloaded ${drawsDownloaded} draws`);
  console.log(`Inserted ${drawsInserted} draws`);
  console.log(`Inserted ${winnersInserted} winners`);
  console.log(`Completed in ${durationSeconds} seconds`);

  return {
    drawsDownloaded,
    drawsInserted,
    winnersInserted,
    durationSeconds,
  };
}

/**
 * Historical Sync Module.
 * Automatically paginates offset until has_more = false to import every historical draw available.
 */
export async function syncHistory(): Promise<SyncResult> {
  const startTime = Date.now();
  console.log("Connecting to IRD API for Full Historical Import...");

  const client = new IRDHttpClient();
  let drawsDownloaded = 0;
  let drawsInserted = 0;
  let winnersInserted = 0;

  const PAGE_LIMIT = 50;
  let offset = 0;
  let hasMore = true;

  try {
    while (hasMore) {
      console.log(`[Sync History] Fetching page offset=${offset}, limit=${PAGE_LIMIT}...`);
      const apiResponse = await client.fetchWinners({ limit: PAGE_LIMIT, offset });

      const rawDraws = apiResponse.draws || apiResponse.data || [];
      if (rawDraws.length === 0) {
        break;
      }

      drawsDownloaded += rawDraws.length;

      for (const rawDraw of rawDraws) {
        const parsed = parseDrawDTO(rawDraw);
        const exists = await drawExistsInDatabase(parsed.drawId);

        if (!exists) {
          const res = await insertDrawWithWinners(parsed);
          drawsInserted++;
          winnersInserted += res.winnersCount;
        }
      }

      hasMore = apiResponse.has_more ?? apiResponse.hasMore ?? (rawDraws.length === PAGE_LIMIT);
      offset += PAGE_LIMIT;
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[Sync History Error]: ${message}`);
  }

  const durationSeconds = Number(((Date.now() - startTime) / 1000).toFixed(1));

  console.log(`Downloaded ${drawsDownloaded} draws`);
  console.log(`Inserted ${drawsInserted} draws`);
  console.log(`Inserted ${winnersInserted} winners`);
  console.log(`Completed in ${durationSeconds} seconds`);

  return {
    drawsDownloaded,
    drawsInserted,
    winnersInserted,
    durationSeconds,
  };
}
