import { Sparkles, Trophy, ArrowRight, CheckCircle2, Award } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background radiant glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.18),transparent_70%)]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl animate-pulseGlow" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-600 dark:text-sky-300 backdrop-blur-md animate-float">
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>Official IRD Taxpayer Lottery Portal</span>
            <span className="h-1 w-1 rounded-full bg-sky-400" />
            <span className="font-mono">FY {siteConfig.stats.activeFiscalYear}</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
            Check <span className="bg-gradient-to-r from-sky-400 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">Nepal IRD Lottery</span> Instantly
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Upload your coupon screenshot or enter your coupon number to instantly verify whether you have won the latest IRD Taxpayer Incentive Lottery.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <a href="#checker" className="w-full sm:w-auto">
              <Button size="lg" variant="glow" className="w-full sm:w-auto gap-2 text-base font-bold shadow-2xl">
                <Trophy className="h-5 w-5" />
                <span>Check Lottery</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>

            <a href="#winners" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 font-semibold">
                <Award className="h-4 w-4 text-sky-500" />
                <span>Latest Winners</span>
              </Button>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60 max-w-2xl">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Official IRD Database Sync
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Instant Coupon Lookup
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Image Screenshot Upload
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
