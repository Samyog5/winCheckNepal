"use client";

import * as React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

export function ToastItem({ toast, onDismiss }: ToastProps) {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-sky-500" />,
  };

  return (
    <div className="flex items-start gap-3 w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 shadow-xl backdrop-blur-xl animate-in slide-in-from-bottom-5">
      <div className="mt-0.5 shrink-0">{icons[toast.type]}</div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {toast.title}
        </h4>
        {toast.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
