import { HeroSection } from "@/components/home/hero-section";
import { LotteryCheckerForm } from "@/components/checker/lottery-checker-form";
import { StatsCounter } from "@/components/home/stats-counter";
import { LatestWinnersSection } from "@/components/home/latest-winners";
import { FeaturesGrid } from "@/components/home/features-grid";
import { HowItWorks } from "@/components/home/how-it-works";
import { FAQSection } from "@/components/home/faq-section";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: "IRD Lottery Check Nepal | Check Coupon Online",
    alternateName: siteConfig.nepaliName,
    description: siteConfig.description,
    url: siteConfig.url,
    provider: {
      "@type": "GovernmentOrganization",
      name: "Inland Revenue Department (IRD) Nepal",
      url: "https://ird.gov.np",
    },
    serviceType: "Coupon Lottery Verification",
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection />

      <section className="relative -mt-6 sm:-mt-10 pb-16 px-4 sm:px-6 lg:px-8 z-20">
        <LotteryCheckerForm />
      </section>

      <StatsCounter />

      <LatestWinnersSection />

      <FeaturesGrid />

      <HowItWorks />

      <FAQSection />
    </>
  );
}
