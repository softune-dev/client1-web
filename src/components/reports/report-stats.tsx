"use client";

import React from "react";
import { Warehouse, PackagePlus, Truck, Package } from "lucide-react";

interface ReportStatsProps {
  totalOpening: number;
  totalReceived: number;
  totalDistributed: number;
  totalClosing: number;
}

export function ReportStats({
  totalOpening,
  totalReceived,
  totalDistributed,
  totalClosing,
}: ReportStatsProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-4">
      {/* Opening Stock */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          <Warehouse className="size-8 text-[#2563EB]" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Opening Stock
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {totalOpening.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Received Stock */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
          <PackagePlus className="size-8 text-[#10B981]" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Received Stock
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {totalReceived.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Distributed Stock */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FFF7ED] text-[#F97316] dark:bg-orange-950/30 dark:text-orange-400">
          <Truck className="size-8 text-[#F97316]" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Distributed Stock
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {totalDistributed.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Closing Stock */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FAF5FF] text-[#A855F7] dark:bg-purple-950/30 dark:text-purple-400">
          <Package className="size-8 text-[#A855F7]" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Closing Stock
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {totalClosing.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

