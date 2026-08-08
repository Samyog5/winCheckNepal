import { PrismaClient } from "@prisma/client";

export const dummyWinnersData = [
  // 1 Bumper Prize Winner
  {
    couponNumber: "007315254493",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Bumper Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Bumper Prize",
    prizeAmount: 1000000,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  // 15 Daily Winners from Official IRD API
  {
    couponNumber: "007755590670",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "002928817811",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "003066779589",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "015611059075",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "009917833245",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "008782486335",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "012259086599",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "004780940884",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "013035230297",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "014973930733",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "010837180332",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "001808965986",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "006841553537",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "005588506085",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "011380914580",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Winner Consumer Selection for the period of Shrawan 1 to 15",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
];

export async function seedDatabase() {
  const prisma = new PrismaClient();
  try {
    console.log("Seeding all 16 IRD Bumper & Daily Winner Records...");

    // Create Bumper Draw
    await prisma.draw.upsert({
      where: { drawId: "draw_3dcfe8001afc31a805736567ea3ea74f" },
      update: {
        category: "Bumper Prize",
        titleEn: "Bumper Winner Consumer Selection for the period of Shrawan 1 to 15",
        titleNe: "श्रावण १ गते देखी १५ गतेसम्मको बम्पर विजेता उपभोक्ता छनौट",
        publishedAt: new Date("2026-08-07T09:27:46.293Z"),
        claimDeadline: new Date("2026-08-22T09:27:46.293Z"),
      },
      create: {
        drawId: "draw_3dcfe8001afc31a805736567ea3ea74f",
        category: "Bumper Prize",
        titleEn: "Bumper Winner Consumer Selection for the period of Shrawan 1 to 15",
        titleNe: "श्रावण १ गते देखी १५ गतेसम्मको बम्पर विजेता उपभोक्ता छनौट",
        publishedAt: new Date("2026-08-07T09:27:46.293Z"),
        claimDeadline: new Date("2026-08-22T09:27:46.293Z"),
      },
    });

    // Create Daily Draw
    await prisma.draw.upsert({
      where: { drawId: "draw_4b5465a4fb61578d3c6fde09661d9acf" },
      update: {
        category: "Daily Prize",
        titleEn: "Winner Consumer Selection for the period of Shrawan 1 to 15",
        titleNe: "श्रावण १ गते देखी १५ गतेसम्मको विजेता उपभोक्ता छनौट",
        publishedAt: new Date("2026-08-07T09:26:52.925Z"),
        claimDeadline: new Date("2026-08-22T09:26:52.925Z"),
      },
      create: {
        drawId: "draw_4b5465a4fb61578d3c6fde09661d9acf",
        category: "Daily Prize",
        titleEn: "Winner Consumer Selection for the period of Shrawan 1 to 15",
        titleNe: "श्रावण १ गते देखी १५ गतेसम्मको विजेता उपभोक्ता छनौट",
        publishedAt: new Date("2026-08-07T09:26:52.925Z"),
        claimDeadline: new Date("2026-08-22T09:26:52.925Z"),
      },
    });

    for (const winner of dummyWinnersData) {
      const isBumper = winner.prizeCategory.includes("Bumper");
      const drawId = isBumper ? "draw_3dcfe8001afc31a805736567ea3ea74f" : "draw_4b5465a4fb61578d3c6fde09661d9acf";

      const existing = await prisma.winner.findFirst({
        where: { couponNumber: winner.couponNumber },
      });
      if (!existing) {
        await prisma.winner.create({
          data: {
            drawId,
            couponNumber: winner.couponNumber,
            rank: isBumper ? "1" : "Daily Prize",
            fiscalYear: "2083-84",
          },
        });
      }
    }
    console.log("Successfully seeded 16 official IRD coupon winners (1 Bumper + 15 Daily).");
  } catch (err) {
    console.warn("Skipped DB seed script execution:", err);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedDatabase().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
