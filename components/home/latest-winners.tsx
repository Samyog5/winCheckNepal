"use client";

import * as React from "react";
import { Calendar, Clock, Sparkles } from "lucide-react";
import { WinnerRecord } from "@/types/lottery";
import { getLatestWinnersAction } from "@/lib/actions/lottery";
import { formatNepaliCurrency } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";

export function LatestWinnersSection() {
  const [winners, setWinners] = React.useState<WinnerRecord[]>([]);

  React.useEffect(() => {
    async function loadWinners() {
      try {
        const res = await getLatestWinnersAction();
        setWinners(res);
      } catch (err) {
        console.error("Failed to load 15 latest winners:", err);
      }
    }
    loadWinners();
  }, []);

  return (
    <section id="winners" className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-950/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Official IRD Published Winners</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
              Latest Draw Winners (Top 15 Results)
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Latest published winners from the official Nepal Inland Revenue Department lottery draw.
            </p>
          </div>

          <Badge variant="outline" className="w-fit py-1.5 px-3 text-xs font-mono font-bold">
            15 Winners Published
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {winners.map((w, idx) => (
            <div
              key={w.id || idx}
              className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <Badge
                  variant={idx === 0 ? "success" : "sky"}
                  className="text-[10px] uppercase font-bold tracking-wider"
                >
                  {w.prizeCategory}
                </Badge>
                <span className="text-xs font-mono font-bold text-slate-400">
                  #{idx + 1}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Coupon Number
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xl font-black text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors">
                    {w.couponNumber}
                  </h3>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {formatNepaliCurrency(w.prizeAmount)}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="h-3.5 w-3.5 text-sky-500" /> Draw Date
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    {w.drawDateBS}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="h-3.5 w-3.5 text-amber-500" /> Claim Deadline
                  </span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    {w.claimDeadlineBS}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
