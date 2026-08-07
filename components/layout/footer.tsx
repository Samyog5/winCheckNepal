import Link from "next/link";
import { ShieldCheck, PhoneCall, Mail, Building2, ExternalLink, Lock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-sky-500/10 border border-slate-200 dark:border-sky-500/30">
                <ShieldCheck className="h-6 w-6 text-red-600 dark:text-sky-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  IRD Nepal Lottery
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {siteConfig.nepaliName}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Official IRD Lottery Portal operated under the auspices of the Inland Revenue Department, Government of Nepal. Promotes tax compliance and rewards tax incentive coupon holders.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
              <Lock className="h-3.5 w-3.5" />
              <span>Official IRD Database Sync</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#checker" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  Manual Coupon Check
                </Link>
              </li>
              <li>
                <Link href="#checker" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  Upload Coupon Screenshot
                </Link>
              </li>
              <li>
                <Link href="#winners" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  Latest 15 Winners
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  How Lottery Works
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Government Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={siteConfig.links.irdPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  <span>IRD Main Portal</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.taxPayerPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  <span>Taxpayer Self-Service</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.govNepal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  <span>Nepal Government Portal</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              IRD Contact Helpline
            </h4>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-sky-500 shrink-0" />
                <span>Toll Free Hotline: <strong>{siteConfig.hotline}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sky-500 shrink-0" />
                <span>Email: {siteConfig.supportEmail}</span>
              </div>
              <div className="flex items-start gap-2">
                <Building2 className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                <span>Lazimpat, Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 dark:border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Inland Revenue Department (आन्तरिक राजस्व विभाग). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link href="#" className="hover:underline">Terms of Service</Link>
            <span>•</span>
            <Link href="#" className="hover:underline">Prize Claim Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
