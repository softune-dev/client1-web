"use client";

import { ArrowDown, ArrowLeftRight, Box } from "lucide-react";

interface StockStatsProps {
  fullPackage: number;
  refill: number;
  emptyCylinder: number;  
}

export function StockStats({
  fullPackage,
  refill,
  emptyCylinder,
}: StockStatsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {/* Package Stock */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          <Box className="size-6 text-[#8B5CF6] dark:text-purple-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-[#475569] dark:text-slate-400">
            Package
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1">
            {fullPackage.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Refill stock */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
         <ArrowDown className="size-6 text-[#10B981] dark:text-emerald-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-[#475569] dark:text-slate-400">
            Refill
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1">
            {refill.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Empty Cylinder stock */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FFF7ED] text-[#F97316] dark:bg-orange-950/30 dark:text-orange-400">
          <ArrowLeftRight className="size-6 text-[#F97316] dark:text-orange-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-[#475569] dark:text-slate-400">
            Empty Cylinder
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1">
            {emptyCylinder.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
