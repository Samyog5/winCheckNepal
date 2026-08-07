"use client";

import * as React from "react";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Uncaught IRD Lottery System Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 mb-4 animate-bounce">
        <AlertOctagon className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
        Something Went Wrong
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        An unexpected error occurred while communicating with the tax verification gateway. Please try again or return to the main dashboard.
      </p>

      {error.digest && (
        <code className="mt-3 rounded bg-slate-100 dark:bg-slate-900 px-3 py-1 text-xs font-mono text-slate-500 border border-slate-200 dark:border-slate-800">
          Digest ID: {error.digest}
        </code>
      )}

      <div className="mt-6 flex items-center gap-3">
        <Button onClick={() => reset()} variant="glow" className="gap-2 text-xs font-bold">
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
        <Link href="/">
          <Button variant="outline" className="gap-2 text-xs">
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
