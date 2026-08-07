import { Ticket, Search, Trophy, Landmark } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Get Your IRD Coupon",
      description: "Receive your official taxpayer incentive lottery coupon number during purchase.",
      icon: Ticket,
    },
    {
      step: "02",
      title: "Enter Coupon Number",
      description: "Type your coupon number into our search box or upload your coupon screenshot.",
      icon: Search,
    },
    {
      step: "03",
      title: "Instant Winner Check",
      description: "Our system queries official IRD published winner records to verify your coupon status.",
      icon: Trophy,
    },
    {
      step: "04",
      title: "Claim Prize Money",
      description: "Winning coupon holders present their coupon & citizenship at any IRD office for bank payout.",
      icon: Landmark,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
            How the IRD Coupon Lottery Works
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The Government of Nepal rewards tax-aware citizens for participating in the official IRD lottery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((s, i) => {
            const IconComponent = s.icon;
            return (
              <div
                key={i}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
              >
                <div className="absolute -top-4 bg-slate-900 dark:bg-sky-500 text-slate-50 dark:text-slate-950 text-xs font-black px-3 py-1 rounded-full font-mono shadow-md">
                  STEP {s.step}
                </div>
                <div className="mt-4 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
                  <IconComponent className="h-7 w-7" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
