"use client";

import React from "react";

interface ProductStatsProps {
  totalSizes: number;
  activeSizes: number;
  disabledSizes: number;
}

export function ProductStats({
  totalSizes,
  activeSizes,
  disabledSizes,
}: ProductStatsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
      {/* Total Sizes */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 shadow-xs dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          {/* Cylinder SVG matching user design */}
          <svg
            className="size-8 text-[#2563EB] dark:text-blue-400"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Collar */}
            <path
              d="M8 2h8a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
              opacity="0.85"
            />
            {/* Body */}
            <path d="M5 10c0-2.5 2-4.5 4.5-4.5h5c2.5 0 4.5 2 4.5 4.5v8.5c0 2.5-2 4.5-4.5 4.5h-5C7 23 5 21 5 18.5V10z" />
            {/* Center Circle Badge */}
            <circle
              cx="12"
              cy="14"
              r="2.8"
              fill="#EFF6FF"
              className="dark:fill-blue-950"
            />
            {/* Flame/Drop inside circle badge */}
            <path
              d="M12 12.2c0 0-.9.7-.9 1.3s.4.9.9.9.9-.3.9-.9c0-.6-.9-1.3-.9-1.3z"
              fill="#2563EB"
              className="dark:fill-blue-400"
            />
          </svg>
        </div>
        <div className="flex flex-col min-w-0 font-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Total Sizes
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1">
            {totalSizes}
          </span>
        </div>
      </div>

      {/* Active Sizes */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 shadow-xs dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
          {/* Green Checkmark Circle SVG */}
          <svg
            className="size-8 text-[#10B981] dark:text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <div className="flex flex-col min-w-0 font-sans">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-300">
            Active Sizes
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1">
            {activeSizes}
          </span>
        </div>
      </div>

      {/* Disabled Sizes */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 shadow-xs dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#FFF7ED] text-[#F97316] dark:bg-orange-950/30 dark:text-orange-400">
          {/* Orange Prohibited Circle SVG */}
          <svg
            className="size-8 text-[#F97316] dark:text-orange-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
          </svg>
        </div>
        <div className="flex flex-col min-w-0 font-sans">
          <span className="text-[13px] font-semibold text-[#475569] dark:text-slate-300">
            Disabled Sizes
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1">
            {disabledSizes}
          </span>
        </div>
      </div>
    </div>
  );
}
