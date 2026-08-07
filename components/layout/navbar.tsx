import Link from "next/link";
import { ShieldCheck, Ticket } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/70 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-sky-600 to-indigo-600 p-0.5 shadow-md shadow-sky-500/10 group-hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 text-slate-50 font-black">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-50">
                  WinCheck Nepal
                </span>
                <span className="hidden sm:inline-block rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  Independent Helper
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Easy IRD Lottery Checker
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-200/60 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-900/50 px-3 py-1 backdrop-blur-md">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-slate-50 hover:bg-white dark:hover:bg-slate-800/80 rounded-full transition-all"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <Badge variant="sky" className="hidden lg:flex items-center gap-1 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>FY {siteConfig.stats.activeFiscalYear} Draw Results</span>
            </Badge>
          </div>

          <ThemeToggle />

          <a href="#checker" className="hidden sm:inline-block">
            <Button size="sm" variant="glow" className="gap-1.5 text-xs">
              <Ticket className="h-3.5 w-3.5" />
              <span>Check Coupon</span>
            </Button>
          </a>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
