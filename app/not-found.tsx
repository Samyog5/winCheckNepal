import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Radiant glow background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 bg-sky-500/10 blur-[100px] rounded-full" />

      <div className="flex flex-col items-center space-y-4 max-w-md">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
          <span className="font-mono text-3xl font-black text-sky-400">404</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          The requested IRD lottery portal page or bill record does not exist or has been moved to official tax archives.
        </p>

        <div className="pt-4 flex items-center gap-3">
          <Link href="/">
            <Button variant="glow" className="gap-2 text-xs font-bold">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Link href="/#checker">
            <Button variant="outline" className="gap-2 text-xs">
              <Search className="h-4 w-4 text-sky-500" />
              <span>Check Invoice</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
