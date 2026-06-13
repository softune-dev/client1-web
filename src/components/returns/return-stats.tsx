"use client";

import React from "react";
import { RefreshCw, Calendar, Clock } from "lucide-react";

interface ReturnStatsProps {
  totalReturns: number;
  returnedToday: number;
  pendingReconciliation: number;
}

export function ReturnStats({
  totalReturns,
  returnedToday,
  pendingReconciliation,
}: ReturnStatsProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
      {/* Total Returns */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          <RefreshCw className="h-8 w-8 text-[#2563EB] dark:text-blue-400" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Total Returns
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {totalReturns}
          </span>
        </div>
      </div>

      {/* Returned Today */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
          <Calendar className="h-8 w-8 text-[#10B981] dark:text-emerald-400" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Returned Today
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {returnedToday}
          </span>
        </div>
      </div>

      {/* Pending Reconciliation */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FFF7ED] text-[#F97316] dark:bg-orange-950/30 dark:text-orange-400">
          <Clock className="h-8 w-8 text-[#F97316] dark:text-orange-400" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Pending Reconciliation
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {pendingReconciliation}
          </span>
        </div>
      </div>
    </div>
  );
}

