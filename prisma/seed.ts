import { PrismaClient } from "@prisma/client";

export const dummyWinnersData = [
  {
    couponNumber: "015585780989",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "1st Bumper Prize",
    prizeAmount: 100000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "014731484426",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "2nd Prize",
    prizeAmount: 50000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "014972520300",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "2nd Prize",
    prizeAmount: 50000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "014709784756",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "3rd Prize",
    prizeAmount: 25000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "014126438219",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "3rd Prize",
    prizeAmount: 25000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "013734098146",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "3rd Prize",
    prizeAmount: 25000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "012477218081",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Consolation Prize",
    prizeAmount: 10000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "011484775662",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Consolation Prize",
    prizeAmount: 10000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "011672335571",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Consolation Prize",
    prizeAmount: 10000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "007248109549",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Consolation Prize",
    prizeAmount: 10000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "007245307159",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Special Category",
    prizeAmount: 5000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "016839201948",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Special Category",
    prizeAmount: 5000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "012948102938",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Special Category",
    prizeAmount: 5000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "009482019482",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Special Category",
    prizeAmount: 5000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
  {
    couponNumber: "013928104820",
    drawDateBS: "2081-04-15",
    drawDateAD: new Date("2024-07-30"),
    drawTitle: "IRD Taxpayer Incentive Draw FY 2081/82",
    prizeCategory: "Special Category",
    prizeAmount: 5000,
    claimDeadlineBS: "2081-05-20",
    claimDeadlineAD: new Date("2024-09-04"),
  },
];

export async function seedDatabase() {
  const prisma = new PrismaClient();
  try {
    console.log("Seeding IRD Lottery 15 Numeric Winner Records...");
    for (const winner of dummyWinnersData) {
      const existing = await prisma.winner.findFirst({
        where: { couponNumber: winner.couponNumber },
      });
      if (!existing) {
        await prisma.winner.create({
          data: {
            drawId: "IRD-2081-04",
            couponNumber: winner.couponNumber,
            rank: winner.prizeCategory,
            fiscalYear: "2081/82",
          },
        });
      }
    }
    console.log("Successfully seeded 15 numeric IRD coupon winners.");
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
