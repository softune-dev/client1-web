"use client";

import React from "react";
import { FiMap, FiInfo } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface TripSummaryPanelProps {
  vehicle: string;
  driver: string;
  manager: string;
  formattedDate: string;
  status: string;
}

export function TripSummaryPanel({
  vehicle,
  driver,
  manager,
  formattedDate,
  status,
}: TripSummaryPanelProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card space-y-6">
      {/* Header */}
      <div className="flex flex-col pb-2 dark:border-border/50">
        <div className="flex items-center gap-x-2.5">
          <FiMap className="h-5 w-5 text-[#2563EB] dark:text-blue-400" />
          <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground">
            Trip Summary
          </h3>
        </div>
      </div>

      {/* Summary Fields */}
      <div className="space-y-4 text-sm">
        {/* Vehicle */}
        <div className="flex flex-col gap-y-1">
          <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
            Vehicle
          </span>
          <span className="text-lg font-semibold text-[#2563EB] dark:text-blue-400">
            {vehicle || "—"}
          </span>
        </div>

        {/* Driver */}
        <div className="flex flex-col gap-y-1">
          <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
            Driver
          </span>
          <span className="text-lg font-semibold text-[#2563EB] dark:text-blue-400">
            {driver || "—"}
          </span>
        </div>

        {/* Marketing Manager */}
        <div className="flex flex-col gap-y-1">
          <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
            Marketing Manager
          </span>
          <span className="text-lg font-semibold text-[#2563EB] dark:text-blue-400">
            {manager || "—"}
          </span>
        </div>

        {/* Trip Date */}
        <div className="flex flex-col gap-y-1">
          <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
            Trip Date
          </span>
          <span className="text-lg font-semibold text-[#2563EB] dark:text-blue-400">
            {formattedDate || "—"}
          </span>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-y-1.5">
          <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
            Status
          </span>
          <div>
            <span
              className={cn(
                "inline-flex items-center rounded px-2.5 py-0.5 text-xs font-bold border",
                status === "Draft" && "bg-[#FFF8ED] text-[#D97706] border-[#FED7AA] dark:bg-amber-950/20 dark:text-amber-400 dark:border-none",
                status === "Loaded" && "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE] dark:bg-blue-950/20 dark:text-blue-400 dark:border-none",
                status === "In Transit" && "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE] dark:bg-blue-950/20 dark:text-blue-400 dark:border-none",
                status === "Completed" && "bg-[#ECFDF5] text-[#10B981] border-[#D1FAE5] dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-none"
              )}
            >
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Info Alert callout */}
      <div className="flex gap-x-3 rounded-sm border border-[#DBEAFE] bg-[#EFF6FF] p-4 text-[#2563EB] dark:border-blue-950/30 dark:bg-blue-950/25">
        <FiInfo className="h-5 w-5 shrink-0 text-[#2563EB] dark:text-blue-400 mt-0.5" />
        <p className="text-sm font-medium tracking-tight text-[#1E40AF] dark:text-blue-300 leading-relaxed">
          Create the trip first, then load inventory if needed.
        </p>
      </div>
    </div>
  );
}
