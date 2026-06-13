"use client";

import { Clock, RotateCcw, Truck, Warehouse } from "lucide-react";
import React from "react";

interface ReturnStatsProps {
  returnedToday: number;
  pendingReconciliation: number;
  completedTrips: number;
  warehouseUpdate: number;
}

export function ReturnStats({
  returnedToday,
  pendingReconciliation,
  completedTrips,
  warehouseUpdate,
}: ReturnStatsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Returned Today */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6  dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FAF5FF] text-[#8B5CF6] dark:bg-purple-950/30 dark:text-purple-400">
          <RotateCcw className="size-6 text-[#8B5CF6] dark:text-purple-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Returned Today
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {returnedToday.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Pending Reconciliation */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6  dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FFF7ED] text-[#F97316] dark:bg-orange-950/30 dark:text-orange-400">
          <Clock className="size-6 text-[#F97316] dark:text-orange-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Pending Reclamation
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {pendingReconciliation.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Completed Trips */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6  dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
          <Truck className="size-6 text-[#10B981] dark:text-emerald-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Completed Trips
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {completedTrips}
          </span>
        </div>
      </div>

      {/* Warehouse Update */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6  dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          <Warehouse className="size-6 text-[#8B5CF6] dark:text-purple-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Warehouse Update
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {warehouseUpdate}
          </span>
        </div>
      </div>
    </div>
  );
}
