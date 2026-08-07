"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 rounded-lg"
        aria-label="Open mobile navigation"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 p-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-4">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors py-2 border-b border-slate-100 dark:border-slate-900"
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="text-xs bg-sky-500/10 text-sky-500 dark:text-sky-400 px-2 py-0.5 rounded-full border border-sky-500/20">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Switch Theme
                </span>
                <ThemeToggle />
              </div>

              <a
                href={siteConfig.links.irdPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="outline" className="w-full justify-between">
                  <span>Official IRD Portal</span>
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
