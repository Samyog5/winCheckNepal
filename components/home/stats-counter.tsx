import { siteConfig } from "@/lib/site-config";
import { Award, CheckCheck, TrendingUp, ShieldCheck } from "lucide-react";

export function StatsCounter() {
  const stats = [
    {
      label: "Coupons Verified",
      value: siteConfig.stats.totalChecked,
      description: "Checked across all 7 provinces",
      icon: CheckCheck,
      color: "text-sky-500",
    },
    {
      label: "Prizes Distributed",
      value: `रु ${siteConfig.stats.totalPrizesDistributedNpr}`,
      description: "Direct to winner bank accounts",
      icon: Award,
      color: "text-emerald-500",
    },
    {
      label: "Verified Winners",
      value: siteConfig.stats.totalWinnersCount,
      description: "Taxpaying citizens rewarded",
      icon: TrendingUp,
      color: "text-amber-500",
    },
    {
      label: "Official IRD Database",
      value: "100%",
      description: "Realtime official winner lookup",
      icon: ShieldCheck,
      color: "text-indigo-500",
    },
  ];

  return (
    <section className="py-12 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-100/40 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="flex flex-col space-y-2 p-4 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <IconComponent className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50 font-mono tracking-tight">
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
