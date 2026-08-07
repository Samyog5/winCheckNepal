import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-8 animate-in fade-in">
      <div className="flex flex-col items-center space-y-4 text-center">
        <Skeleton className="h-8 w-64 rounded-full" />
        <Skeleton className="h-12 w-3/4 max-w-2xl rounded-xl" />
        <Skeleton className="h-6 w-1/2 max-w-md rounded-lg" />
      </div>

      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 bg-white/50 dark:bg-slate-900/50">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}
