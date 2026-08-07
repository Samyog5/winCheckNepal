import { syncHistory } from "../lib/services/ird/sync";
import { prisma } from "../lib/prisma";

async function run() {
  try {
    await syncHistory();
  } finally {
    await prisma.$disconnect();
  }
}

run().catch((err) => {
  console.error("Fatal error running npm run sync:history:", err);
  process.exit(1);
});
