import { PrismaClient } from "@prisma/client";

export const dummyWinnersData = [
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
  {
    couponNumber: "011380914580",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Daily Winner Consumer Selection",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "005588506085",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Daily Winner Consumer Selection",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "006841553537",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Daily Winner Consumer Selection",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "001808965986",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Daily Winner Consumer Selection",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "010837180332",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Daily Winner Consumer Selection",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "014973930733",
    drawDateBS: "2083-04-22",
    drawDateAD: new Date("2026-08-07"),
    drawTitle: "Daily Winner Consumer Selection",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2083-05-07",
    claimDeadlineAD: new Date("2026-08-22"),
  },
  {
    couponNumber: "015585780989",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "014731484426",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "014972520300",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "014709784756",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "014126438219",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "013734098146",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "012477218081",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "011484775662",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "011672335571",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Daily Prize",
    prizeAmount: 133334,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
];

export async function seedDatabase() {
  const prisma = new PrismaClient();
  try {
    console.log("Seeding IRD Bumper & Daily Winner Records...");

    // Create Bumper Draw
    await prisma.draw.upsert({
      where: { drawId: "draw_bumper_2083" },
      update: {
        category: "Bumper Prize",
        titleEn: "Bumper Winner Consumer Selection for the period of Shrawan 1 to 15",
        titleNe: "बम्पर पुरस्कार उपभोक्ता छनोट",
        publishedAt: new Date("2026-08-07T09:27:46.293Z"),
        claimDeadline: new Date("2026-08-22T09:27:46.293Z"),
      },
      create: {
        drawId: "draw_bumper_2083",
        category: "Bumper Prize",
        titleEn: "Bumper Winner Consumer Selection for the period of Shrawan 1 to 15",
        titleNe: "बम्पर पुरस्कार उपभोक्ता छनोट",
        publishedAt: new Date("2026-08-07T09:27:46.293Z"),
        claimDeadline: new Date("2026-08-22T09:27:46.293Z"),
      },
    });

    // Create Bumper Winner
    await prisma.winner.upsert({
      where: { id: "winner_bumper_007315254493" },
      update: {
        couponNumber: "007315254493",
        rank: "1",
        fiscalYear: "2083-84",
        drawId: "draw_bumper_2083",
      },
      create: {
        id: "winner_bumper_007315254493",
        couponNumber: "007315254493",
        rank: "1",
        fiscalYear: "2083-84",
        drawId: "draw_bumper_2083",
      },
    });

    for (const winner of dummyWinnersData) {
      const existing = await prisma.winner.findFirst({
        where: { couponNumber: winner.couponNumber },
      });
      if (!existing) {
        await prisma.winner.create({
          data: {
            drawId: winner.prizeCategory.includes("Bumper") ? "draw_bumper_2083" : "IRD-2081-04",
            couponNumber: winner.couponNumber,
            rank: winner.prizeCategory,
            fiscalYear: "2083-84",
          },
        });
      }
    }
    console.log("Successfully seeded Bumper and Daily IRD coupon winners.");
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
