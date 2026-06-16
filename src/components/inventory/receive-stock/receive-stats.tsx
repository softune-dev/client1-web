"use client";

import { ArrowDown, Box } from "lucide-react";

interface ReceiveStatsProps {
  totalStock: number;
  receivedToday: number;
}

export function ReceiveStats({ totalStock, receivedToday }: ReceiveStatsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      {/* Total Stock */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          <Box className="size-6 text-[#2563EB] dark:text-blue-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Total Stock
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1">
            {totalStock.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Received Today */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
          <ArrowDown className="size-6 text-[#10B981] dark:text-emerald-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Received Today
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1">
            {receivedToday.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
