import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IRD Lottery Check Nepal | Check Coupon Online",
    template: `%s | IRD Lottery Nepal`,
  },
  description:
    "Check your Nepal IRD Lottery coupon online. Upload your coupon screenshot or enter the coupon number to instantly verify whether you have won the latest Nepal Government Taxpayer Incentive Lottery.",
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "IRD Lottery Check Nepal | Check Coupon Online",
    description:
      "Check your Nepal IRD Lottery coupon online. Upload your coupon screenshot or enter the coupon number to instantly verify whether you have won the latest Nepal Government Taxpayer Incentive Lottery.",
    siteName: siteConfig.shortName,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "IRD Lottery Check Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IRD Lottery Check Nepal | Check Coupon Online",
    description:
      "Check your Nepal IRD Lottery coupon online. Upload your coupon screenshot or enter the coupon number to instantly verify whether you have won the latest Nepal Government Taxpayer Incentive Lottery.",
    images: [siteConfig.ogImage],
    creator: "@ird_nepal",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col selection:bg-sky-500/20 selection:text-sky-400">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
