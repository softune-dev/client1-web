"use client";

import { ChartPie } from "lucide-react";
import React from "react";
import { FiArrowLeft, FiSave, FiCheckCircle } from "react-icons/fi";

interface LoadTripActionsProps {
  totalQuantity: number;
  onBack: () => void;
  onSaveDraft: () => void;
  onConfirmLoad: () => void;
}

export function LoadTripActions({
  totalQuantity,
  onBack,
  onSaveDraft,
  onConfirmLoad,
}: LoadTripActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 font-dm-sans">
      {/* Total Quantity Card */}
      <div className="flex items-center gap-x-4 rounded-sm border border-[#E2E8F0] bg-white p-4 dark:border-border dark:bg-card w-full sm:max-w-[280px]">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          {/* Bar Chart Icon */}
          <ChartPie className="h-6 w-6" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-[#94A3B8] font-dm-sans tracking-tight dark:text-slate-400">
            Total Quantity to Load
          </span>
          <span className="text-lg font-semibold text-[#0F172A] dark:text-foreground mt-0.5 font-sans">
            <span className="text-[#2563EB] dark:text-blue-400 text-xl font-extrabold mr-1 font-dm-sans">
              {totalQuantity}
            </span>
            {totalQuantity === 1 ? "Cylinder" : "Cylinders"}
          </span>
        </div>
      </div>

      {/* Button controls */}
      <div className="flex items-center gap-x-3 w-full sm:w-auto justify-end">
        <button
          type="button"
          onClick={onSaveDraft}
          className="inline-flex h-11 items-center justify-center gap-x-2 rounded-sm border border-[#E2E8F0] bg-white px-5 text-sm font-semibold text-[#334155] hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer font-dm-sans dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-muted w-full sm:w-auto"
        >
          <FiSave className="h-4 w-4" />
          Save Draft
        </button>
        <button
          type="button"
          onClick={onConfirmLoad}
          className="inline-flex h-11 items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-5 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors focus:outline-none cursor-pointer font-dm-sans w-full sm:w-auto"
        >
          <FiCheckCircle className="h-4 w-4" />
          Confirm Load
        </button>
      </div>
    </div>
  );
}
