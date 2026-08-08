import { getStatsAction } from "@/lib/actions/lottery";
import { CheckCheck, TrendingUp, ShieldCheck } from "lucide-react";

export async function StatsCounter() {
  const stats = await getStatsAction();

  const cards = [
    {
      label: "Coupons Verified",
      value: stats.totalChecked.toLocaleString(),
      description: "Real-time user lookups performed",
      icon: CheckCheck,
      color: "text-sky-500",
    },
    {
      label: "Verified Winners",
      value: stats.totalWinners.toLocaleString(),
      description: "Synced IRD winning coupon records",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
    {
      label: "Synchronized Draws",
      value: `${stats.totalDraws.toLocaleString()} Draws`,
      description: "Official IRD lottery draw results",
      icon: ShieldCheck,
      color: "text-indigo-500",
    },
  ];

  return (
    <section className="py-12 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-100/40 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="flex flex-col space-y-2 p-5 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm transition-all hover:border-sky-500/30"
              >
                <div className="flex items-center gap-2">
                  <IconComponent className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-50 font-mono tracking-tight">
                  {stat.value}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
