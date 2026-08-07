export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export const siteConfig = {
  name: "WinCheck Nepal | Instant IRD Lottery Checker",
  shortName: "WinCheck Nepal",
  nepaliName: "WinCheck Nepal - कुपन लटरी जाँच प्रणाली",
  description:
    "WinCheck Nepal helps Nepalese taxpayers verify their IRD Lottery coupon numbers online with ease. Upload a payment screenshot or enter your coupon number to instantly check against published IRD winner results.",
  disclaimer:
    "WinCheck Nepal is an independent helper tool for checking taxpayer lottery results and is not an official portal of the Inland Revenue Department (IRD) Nepal.",
  url: "https://winchecknepal.com",
  ogImage: "https://winchecknepal.com/og-image.png",
  keywords: [
    "WinCheck Nepal",
    "IRD Lottery Check Nepal",
    "Check Coupon Online",
    "Nepal IRD Lottery Winner List",
    "Taxpayer Incentive Lottery",
    "आन्तरिक राजस्व विभाग लटरी",
    "नेपाल कुपन लटरी",
  ],
  author: "WinCheck Nepal Team",
  supportEmail: "info@winchecknepal.com",
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Check Coupon", href: "#checker" },
    { title: "Latest Winners", href: "#winners" },
    { title: "How It Works", href: "#how-it-works" },
    { title: "FAQ", href: "#faq" },
  ] as NavItem[],
  links: {
    irdPortal: "https://ird.gov.np",
    taxPayerPortal: "https://prize.ird.gov.np",
  },
  stats: {
    totalChecked: "1,450,920+",
    totalPrizesDistributedNpr: "12,500,000",
    totalWinnersCount: "4,820",
    activeFiscalYear: "2081/82",
  },
};

export type SiteConfig = typeof siteConfig;
