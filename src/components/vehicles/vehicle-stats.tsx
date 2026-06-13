"use client";

import { CircleCheck, MapPin, Truck } from "lucide-react";
import React from "react";

interface VehicleStatsProps {
  totalCount: number;
  activeCount: number;
  onTripCount: number;
}

export function VehicleStats({
  totalCount,
  activeCount,
  onTripCount,
}: VehicleStatsProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
      {/* Total Vehicles */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          <Truck className="size-8 text-[#2563EB] dark:text-blue-400" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Total Vehicles
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {totalCount}
          </span>
        </div>
      </div>

      {/* Active Vehicles */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
         <CircleCheck className="size-8 text-[#10B981] dark:text-emerald-400" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Active Vehicles
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {activeCount}
          </span>
        </div>
      </div>

      {/* On Trip */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FFF7ED] text-[#F97316] dark:bg-orange-950/30 dark:text-orange-400">
         <MapPin className="size-8 text-[#F97316] dark:text-orange-400" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            On Trip
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {onTripCount}
          </span>
        </div>
      </div>
    </div>
  );
}
