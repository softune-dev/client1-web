"use client";

import React from "react";
import { FiFileText, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface LoadPlanFormProps {
  cargo: Record<string, number>;
  onCargoChange: (size: string, val: number) => void;
}

const CYLINDER_SIZES = [
  { size: "12 KG", text: "text-[#2563EB]", bg: "bg-[#EFF6FF]", border: "border-[#DBEAFE]", darkText: "dark:text-blue-400", darkBg: "dark:bg-blue-950/20", darkBorder: "dark:border-blue-900/30" },
  { size: "15 KG", text: "text-[#16A34A]", bg: "bg-[#F0FDF4]", border: "border-[#D1FAE5]", darkText: "dark:text-emerald-400", darkBg: "dark:bg-emerald-950/20", darkBorder: "dark:border-emerald-900/30" },
  { size: "18 KG", text: "text-[#D97706]", bg: "bg-[#FEF3C7]/60", border: "border-[#FDE68A]", darkText: "dark:text-amber-400", darkBg: "dark:bg-amber-950/20", darkBorder: "dark:border-amber-900/30" },
  { size: "22 KG", text: "text-[#DC2626]", bg: "bg-[#FEF2F2]", border: "border-[#FEE2E2]", darkText: "dark:text-red-400", darkBg: "dark:bg-red-950/20", darkBorder: "dark:border-red-900/30" },
  { size: "35 KG", text: "text-[#7C3AED]", bg: "bg-[#F5F3FF]", border: "border-[#E9D5FF]", darkText: "dark:text-violet-400", darkBg: "dark:bg-violet-950/20", darkBorder: "dark:border-violet-900/30" },
];

export function LoadPlanForm({ cargo, onCargoChange }: LoadPlanFormProps) {
  const handleIncrement = (size: string) => {
    const current = cargo[size] ?? 0;
    onCargoChange(size, current + 1);
  };

  const handleDecrement = (size: string) => {
    const current = cargo[size] ?? 0;
    onCargoChange(size, Math.max(current - 1, 0));
  };

  const handleInputChange = (size: string, val: string) => {
    const num = Math.max(parseInt(val.replace(/\D/g, "")) || 0, 0);
    onCargoChange(size, num);
  };

  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card space-y-5">
      {/* Card Header */}
      <div className="flex flex-col pb-2 dark:border-border/50">
        <div className="flex items-center gap-x-2.5">
          <FiFileText className="h-5 w-5 text-[#F97316]" />
          <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground">
            Basic Load Plan
          </h3>
        </div>
        <p className="text-xs text-[#64748B] dark:text-muted-foreground mt-1 font-medium">
          Enter the planned cylinder quantities to be loaded on this trip.
        </p>
      </div>

      {/* Grid of cylinder sizes */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {CYLINDER_SIZES.map(({ size, text, bg, border, darkText, darkBg, darkBorder }) => {
          const value = cargo[size] ?? 0;
          return (
            <div
              key={size}
              className={cn(
                "rounded-sm border p-4 flex flex-col items-center justify-between text-center gap-y-3 transition-shadow hover:shadow-xs",
                bg,
                border,
                darkBg,
                darkBorder
              )}
            >
              {/* Size Label */}
              <span className={cn("text-md font-extrabold tracking-wide", text, darkText)}>
                {size}
              </span>

              {/* Number Input with side arrow controls */}
              <div className="relative flex items-center w-full max-w-[80px] h-9 rounded-md border border-[#CBD5E1] dark:border-border bg-white dark:bg-card pr-6 overflow-hidden">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(size, e.target.value)}
                  className="w-full h-full text-center text-sm font-bold text-[#0F172A] dark:text-foreground bg-transparent outline-none font-mono"
                />
                
                {/* Arrow Controls */}
                <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col border-l border-[#CBD5E1] dark:border-border divide-y divide-[#CBD5E1] dark:divide-border">
                  <button
                    type="button"
                    onClick={() => handleIncrement(size)}
                    className="flex-1 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-muted text-[#64748B] cursor-pointer"
                  >
                    <FiChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDecrement(size)}
                    className="flex-1 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-muted text-[#64748B] cursor-pointer"
                  >
                    <FiChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Cylinders label */}
              <span className="text-[11px] font-semibold text-[#64748B] dark:text-slate-400">
                Cylinders
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
