"use client";

import { ArrowDown, ArrowUp, FileText, Scale } from "lucide-react";
import React from "react";

interface LedgerStatsProps {
  totalEntries: number;
  stockIn: number;
  stockOut: number;
  netMovement: number;
}

export function LedgerStats({
  totalEntries,
  stockIn,
  stockOut,
  netMovement,
}: LedgerStatsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Ledger Entries */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6  dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          <FileText className="size-6 text-[#2563EB] dark:text-blue-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Total Ledger Entries
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {totalEntries.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Stock In */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6  dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
          <ArrowDown className="size-6 text-[#10B981] dark:text-emerald-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Stock In
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {stockIn.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Stock Out */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6  dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FFF7ED] text-[#F97316] dark:bg-orange-950/30 dark:text-orange-400">
          <ArrowUp className="size-6 text-[#F97316] dark:text-orange-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Stock Out
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {stockOut.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Net Movement */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6  dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FAF5FF] text-[#8B5CF6] dark:bg-purple-950/30 dark:text-purple-400">
          <Scale className="size-6 text-[#8B5CF6] dark:text-purple-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Net Movement
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            +{netMovement}
          </span>
        </div>
      </div>
    </div>
  );
}
