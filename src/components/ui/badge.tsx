import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "info" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold border transition-colors",
        variant === "default" && "bg-slate-900 text-white border-transparent dark:bg-muted dark:text-foreground",
        variant === "secondary" && "bg-slate-100 text-slate-900 border-transparent dark:bg-muted dark:text-muted-foreground",
        variant === "success" && "bg-emerald-600 text-white border-transparent dark:bg-emerald-700 dark:text-white",
        variant === "warning" && "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-none",
        variant === "destructive" && "bg-red-600 text-white border-transparent dark:bg-red-700 dark:text-white",
        variant === "info" && "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-none",
        variant === "outline" && "text-[#0F172A] border-[#E2E8F0] dark:text-foreground dark:border-border",
        className
      )}
      {...props}
    />
  );
}
