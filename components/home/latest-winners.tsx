"use client";

import * as React from "react";
import { Calendar, Clock, Sparkles, Trophy, Crown } from "lucide-react";
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
        console.error("Failed to load latest winners:", err);
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
              Latest Published Winners
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Published winners dynamically synchronized from the official Nepal Inland Revenue Department lottery draws.
            </p>
          </div>

          <Badge variant="outline" className="w-fit py-1.5 px-3 text-xs font-mono font-bold">
            {winners.length} Winners Published
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {winners.map((w, idx) => {
            const isBumper = w.prizeCategory.toLowerCase().includes("bumper");

            return (
              <div
                key={w.id || idx}
                className={`group relative rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl space-y-4 ${
                  isBumper
                    ? "bg-gradient-to-br from-amber-500/15 via-emerald-950/60 to-slate-900 border-amber-500/60 shadow-amber-500/10 hover:border-amber-400"
                    : "bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50"
                }`}
              >
                {isBumper && (
                  <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                    <Trophy className="h-28 w-28 text-amber-400" />
                  </div>
                )}

                <div className="flex items-center justify-between relative z-10">
                  {isBumper ? (
                    <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-wider gap-1.5 shadow-md shadow-amber-500/30">
                      <Crown className="h-3.5 w-3.5" />
                      <span>{w.prizeCategory}</span>
                    </Badge>
                  ) : (
                    <Badge variant="sky" className="text-[10px] uppercase font-bold tracking-wider">
                      {w.prizeCategory}
                    </Badge>
                  )}
                  <span className="text-xs font-mono font-bold text-slate-400">
                    #{idx + 1}
                  </span>
                </div>

                <div className="space-y-1 relative z-10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Coupon Number
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-xl font-black text-slate-900 dark:text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {w.couponNumber}
                    </h3>
                    <div
                      className={`text-lg font-black font-mono ${
                        isBumper ? "text-amber-400 text-xl" : "text-emerald-500"
                      }`}
                    >
                      {formatNepaliCurrency(w.prizeAmount)}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs text-slate-600 dark:text-slate-400 relative z-10">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
