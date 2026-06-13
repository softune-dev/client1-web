"use client";

import { ArrowLeftRight, Box, CalendarCheck2, Truck } from "lucide-react";
import React from "react";

interface LoadStatsProps {
  warehouseStock: number;
  reservedStock: number;
  transfersToday: number;
  availableVehicles: number;
}

export function LoadStats({
  warehouseStock,
  reservedStock,
  transfersToday,
  availableVehicles,
}: LoadStatsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Warehouse Stock */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          <Box className="size-6 text-[#2563EB] dark:text-blue-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Warehouse Stock
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {warehouseStock.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Reserved for Trips */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
          <CalendarCheck2 className="size-6 text-[#10B981] dark:text-emerald-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Reserved for Trips
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {reservedStock.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Transfers Today */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FFF7ED] text-[#F97316] dark:bg-orange-950/30 dark:text-orange-400">
          <ArrowLeftRight className="size-6 text-[#F97316] dark:text-orange-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Transfers Today
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {transfersToday.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Available Vehicles */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FAF5FF] text-[#8B5CF6] dark:bg-purple-950/30 dark:text-purple-400">
          <Truck className="size-6 text-[#8B5CF6] dark:text-purple-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-400">
            Available Vehicles
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {availableVehicles}
          </span>
        </div>
      </div>
    </div>
  );
}
