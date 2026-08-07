export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export const siteConfig = {
  name: "IRD Lottery Check Nepal | Check Coupon Online",
  shortName: "IRD Lottery Nepal",
  nepaliName: "आन्तरिक राजस्व विभाग - कुपन लटरी जाँच प्रणाली",
  description:
    "Check your Nepal IRD Lottery coupon online. Upload your coupon screenshot or enter the coupon number to instantly verify whether you have won the latest Nepal Government Taxpayer Incentive Lottery.",
  url: "https://lottery.ird.gov.np",
  ogImage: "https://lottery.ird.gov.np/og-image.png",
  keywords: [
    "IRD Lottery Check Nepal",
    "Check Coupon Online",
    "Nepal IRD Lottery Winner List",
    "Nepal Government Lottery Coupon",
    "Taxpayer Incentive Lottery",
    "IRD Coupon Winner",
    "आन्तरिक राजस्व विभाग लटरी",
    "नेपाल कुपन लटरी",
  ],
  author: "Inland Revenue Department (IRD) Nepal",
  supportEmail: "support@ird.gov.np",
  hotline: "16600100100",
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Check Coupon", href: "#checker" },
    { title: "Latest Winners", href: "#winners" },
    { title: "How It Works", href: "#how-it-works" },
    { title: "FAQ", href: "#faq" },
  ] as NavItem[],
  links: {
    irdPortal: "https://ird.gov.np",
    taxPayerPortal: "https://taxpayerportal.ird.gov.np",
    govNepal: "https://nepal.gov.np",
  },
  stats: {
    totalChecked: "1,450,920+",
    totalPrizesDistributedNpr: "12,500,000",
    totalWinnersCount: "4,820",
    activeFiscalYear: "2081/82",
  },
};

export type SiteConfig = typeof siteConfig;
