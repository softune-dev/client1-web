"use client";

import React from "react";
import { Calendar, Truck, Clock } from "lucide-react";

interface DeliveryStatsProps {
  totalDeliveries: number;
  deliveredToday: number;
  activeTripsCount: number;
}

export function DeliveryStats({
  totalDeliveries,
  deliveredToday,
  activeTripsCount,
}: DeliveryStatsProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
      {/* Total Deliveries */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          <Truck className="size-8 text-[#2563EB] dark:text-blue-400" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Total Deliveries
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {totalDeliveries}
          </span>
        </div>
      </div>

      {/* Delivered Today */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
          <Calendar className="size-8 text-[#10B981] dark:text-emerald-400" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Delivered Today
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {deliveredToday}
          </span>
        </div>
      </div>

      {/* Active Delivery Trips */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FAF5FF] text-[#A855F7] dark:bg-purple-950/30 dark:text-purple-400">
          <Clock className="size-8 text-[#A855F7] dark:text-purple-400" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Active Delivery Trips
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {activeTripsCount}
          </span>
        </div>
      </div>
    </div>
  );
}
