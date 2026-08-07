import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
        destructive:
          "border-transparent bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400",
        outline: "text-slate-950 dark:text-slate-50 border-slate-200 dark:border-slate-800",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium",
        warning:
          "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium",
        sky: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400 font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
