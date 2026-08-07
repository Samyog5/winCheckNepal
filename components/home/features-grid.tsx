import { Zap, ShieldCheck, FileImage, Lock, Bell, SearchCheck } from "lucide-react";

export function FeaturesGrid() {
  const features = [
    {
      title: "Realtime Coupon Query",
      description: "Direct sub-second lookups against official Inland Revenue Department taxpayer lottery databases.",
      icon: Zap,
      accent: "from-sky-500/20 to-sky-500/5 text-sky-500",
    },
    {
      title: "Screenshot Image Upload",
      description: "Upload your coupon screenshot directly to verify your taxpayer incentive ticket.",
      icon: FileImage,
      accent: "from-emerald-500/20 to-emerald-500/5 text-emerald-500",
    },
    {
      title: "Official Winner Database",
      description: "Winning coupons are cryptographically verified against official government draw publications.",
      icon: ShieldCheck,
      accent: "from-indigo-500/20 to-indigo-500/5 text-indigo-500",
    },
    {
      title: "Privacy First & Anonymous",
      description: "No account registration required. Your coupon checks are private, encrypted, and secure.",
      icon: Lock,
      accent: "from-amber-500/20 to-amber-500/5 text-amber-500",
    },
    {
      title: "Latest 15 Winners Grid",
      description: "Instant access to published winner lists with prize categories, draw dates, and claim deadlines.",
      icon: SearchCheck,
      accent: "from-teal-500/20 to-teal-500/5 text-teal-500",
    },
    {
      title: "Automated Check Logging",
      description: "Every coupon check is logged securely in the IRD verification database for audit integrity.",
      icon: Bell,
      accent: "from-purple-500/20 to-purple-500/5 text-purple-500",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
            Built for National Scale & Instant Winner Verification
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            Modern enterprise technology ensuring instantaneous coupon verification for Nepalese taxpayers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const IconComp = feat.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 p-6 backdrop-blur-xl transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xl"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feat.accent} mb-4`}>
                  <IconComp className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-sky-500 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
