"use client";

import * as React from "react";
import { Trophy, XCircle, Calendar, Copy, Check, Share2, Clock } from "lucide-react";
import { CouponCheckResult } from "@/types/lottery";
import { formatNepaliCurrency } from "@/utils/formatters";
import { Button } from "@/components/ui/button";

interface TicketResultCardProps {
  result: CouponCheckResult;
  onReset?: () => void;
}

export function TicketResultCard({ result, onReset }: TicketResultCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(result.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isWin = result.isWinner;
  const winner = result.winnerDetails;

  return (
    <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div
        className={`relative overflow-hidden rounded-2xl p-6 md:p-8 text-center border shadow-2xl ${
          isWin
            ? "bg-gradient-to-b from-emerald-500/20 via-emerald-950/50 to-slate-950 border-emerald-500/50 text-emerald-50"
            : "bg-gradient-to-b from-slate-800/50 via-slate-900 to-slate-950 border-slate-800 text-slate-100"
        }`}
      >
        {isWin && (
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Trophy className="h-64 w-64 text-emerald-400" />
          </div>
        )}

        <div className="flex flex-col items-center justify-center space-y-4 relative z-10">
          {isWin ? (
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-emerald-500 to-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/40 animate-bounce">
              <Trophy className="h-11 w-11" />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-slate-400 border border-slate-700">
              <XCircle className="h-9 w-9" />
            </div>
          )}

          <div>
            <h3
              className={`text-2xl sm:text-3xl font-black tracking-tight ${
                isWin ? "text-emerald-400" : "text-slate-300"
              }`}
            >
              {isWin ? "CONGRATULATIONS! YOU WON!" : "Not a Winner"}
            </h3>

            <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto font-medium">
              {isWin
                ? `Coupon #${result.couponNumber} is selected in the official IRD Lottery draw!`
                : "This coupon was not found in the latest published winners."}
            </p>
          </div>

          {isWin && winner && (
            <div className="mt-2 w-full max-w-md rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-center backdrop-blur-md">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-extrabold">
                {winner.prizeCategory}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1 font-mono tracking-tight">
                {formatNepaliCurrency(winner.prizeAmount)}
              </div>
            </div>
          )}
        </div>
      </div>

      {isWin && winner ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6 space-y-4 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800/80 pb-2">
            Official Winner Certificate Snapshot
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400">Coupon Number</span>
              <p className="font-mono font-bold text-base text-slate-900 dark:text-slate-100">
                {winner.couponNumber}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Draw Date (BS / AD)
              </span>
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                {winner.drawDateBS} ({new Date(winner.drawDateAD).toLocaleDateString()})
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400">Prize Category</span>
              <p className="font-bold text-emerald-600 dark:text-emerald-400">
                {winner.prizeCategory}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-amber-500" /> Claim Deadline
              </span>
              <p className="font-semibold text-amber-600 dark:text-amber-400">
                {winner.claimDeadlineBS} ({new Date(winner.claimDeadlineAD).toLocaleDateString()})
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Audit Ref:</span>
              <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-700 dark:text-slate-300">
                {result.referenceId}
              </code>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyRef}
              className="h-7 text-xs gap-1 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy Ref"}</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 p-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Checked Coupon: <strong className="font-mono text-slate-900 dark:text-slate-200">{result.couponNumber}</strong>
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        {onReset && (
          <Button variant="outline" className="flex-1" onClick={onReset}>
            Check Another Coupon
          </Button>
        )}
        <Button variant="secondary" className="flex-1 gap-2">
          <Share2 className="h-4 w-4" />
          <span>Share Verification</span>
        </Button>
      </div>
    </div>
  );
}
