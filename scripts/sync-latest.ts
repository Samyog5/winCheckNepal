import { syncLatest } from "../lib/services/ird/sync";
import { prisma } from "../lib/prisma";

async function run() {
  try {
    await syncLatest();
  } finally {
    await prisma.$disconnect();
  }
}

run().catch((err) => {
  console.error("Fatal error running npm run sync:", err);
  process.exit(1);
});
