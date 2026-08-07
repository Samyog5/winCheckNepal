"use client";

import * as React from "react";
import { Trophy, XCircle, Calendar, Copy, Check, Share2, Clock, Sparkles, CheckCircle2 } from "lucide-react";
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

  const isMulti = result.multiResults && result.multiResults.length > 1;
  const totalDetected = result.totalDetected ?? (isMulti ? result.multiResults!.length : 1);
  const winningCount = result.winningCount ?? (result.isWinner ? 1 : 0);
  const isAnyWin = winningCount > 0 || result.isWinner;

  return (
    <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Top Banner */}
      <div
        className={`relative overflow-hidden rounded-2xl p-6 md:p-8 text-center border shadow-2xl ${
          isAnyWin
            ? "bg-gradient-to-b from-emerald-500/20 via-emerald-950/50 to-slate-950 border-emerald-500/50 text-emerald-50"
            : "bg-gradient-to-b from-slate-800/50 via-slate-900 to-slate-950 border-slate-800 text-slate-100"
        }`}
      >
        {isAnyWin && (
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Trophy className="h-64 w-64 text-emerald-400" />
          </div>
        )}

        <div className="flex flex-col items-center justify-center space-y-4 relative z-10">
          {isAnyWin ? (
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
                isAnyWin ? "text-emerald-400" : "text-slate-300"
              }`}
            >
              {isAnyWin
                ? isMulti
                  ? `CONGRATULATIONS! ${winningCount} WINNER${winningCount > 1 ? "S" : ""} FOUND!`
                  : "CONGRATULATIONS! YOU WON!"
                : "No Winners Found"}
            </h3>

            <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto font-medium">
              {isMulti
                ? `Detected ${totalDetected} coupon numbers in screenshot. ${winningCount} matched in published IRD draws!`
                : isAnyWin
                ? `Coupon #${result.couponNumber} is selected in published IRD Lottery draw!`
                : "None of the checked coupon numbers were found in the published IRD winner results."}
            </p>
          </div>
        </div>
      </div>

      {/* Multi-Coupon Breakdown List */}
      {isMulti ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              Coupon-wise Verification Breakdown ({totalDetected} Detected)
            </h4>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {winningCount} Winner{winningCount !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-3">
            {result.multiResults!.map((item, idx) => {
              const win = item.isWinner;
              const details = item.winnerDetails;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border p-4 transition-all ${
                    win
                      ? "bg-gradient-to-r from-emerald-950/60 to-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/30"
                      : "bg-slate-900/40 border-slate-800/80"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          win
                            ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {win ? <CheckCircle2 className="h-5 w-5" /> : `#${idx + 1}`}
                      </div>
                      <div>
                        <p className="font-mono font-bold text-base text-slate-100 tracking-wider">
                          {item.couponNumber}
                        </p>
                        {win && details && (
                          <p className="text-xs text-emerald-400 font-medium">
                            {details.prizeCategory} — {details.drawTitle}
                          </p>
                        )}
                        {!win && (
                          <p className="text-xs text-slate-500">Not selected in published draws</p>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {win && details ? (
                        <div>
                          <span className="text-xs font-extrabold text-emerald-400 block uppercase tracking-wider">
                            {details.prizeCategory}
                          </span>
                          <span className="text-lg sm:text-xl font-black font-mono text-emerald-400">
                            {formatNepaliCurrency(details.prizeAmount)}
                          </span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                          Not a Winner
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : result.isWinner && result.winnerDetails ? (
        /* Single Winner Summary Snapshot */
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6 space-y-4 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800/80 pb-2">
            WinCheck Verification Summary Snapshot
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400">Coupon Number</span>
              <p className="font-mono font-bold text-base text-slate-900 dark:text-slate-100">
                {result.winnerDetails.couponNumber}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Draw Date (BS / AD)
              </span>
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                {result.winnerDetails.drawDateBS} ({new Date(result.winnerDetails.drawDateAD).toLocaleDateString()})
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400">Prize Category</span>
              <p className="font-bold text-emerald-600 dark:text-emerald-400">
                {result.winnerDetails.prizeCategory}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-amber-500" /> Claim Deadline
              </span>
              <p className="font-semibold text-amber-600 dark:text-amber-400">
                {result.winnerDetails.claimDeadlineBS} ({new Date(result.winnerDetails.claimDeadlineAD).toLocaleDateString()})
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Audit reference section */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 p-4 flex items-center justify-between text-xs">
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

      {/* Reset & Share Actions */}
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
