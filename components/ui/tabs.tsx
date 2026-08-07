"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (val: string) => void;
}>({
  activeTab: "",
  setActiveTab: () => {},
});

export function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps) {
  const [selected, setSelected] = React.useState(defaultValue);
  const activeTab = value !== undefined ? value : selected;

  const setActiveTab = (val: string) => {
    if (value === undefined) {
      setSelected(val);
    }
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900/90 p-1 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold ring-offset-white transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-slate-100"
          : "hover:text-slate-900 dark:hover:text-slate-200",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab } = React.useContext(TabsContext);
  if (activeTab !== value) return null;

  return (
    <div className={cn("mt-4 animate-in fade-in duration-200", className)}>
      {children}
    </div>
  );
}
