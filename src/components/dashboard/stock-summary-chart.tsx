import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface StockItem {
  label: string;
  value: number;
  percentage: number;
  color: string;
  hoverColor: string;
}

const STOCK_DATA: StockItem[] = [
  { label: "12 KG", value: 4560, percentage: 36, color: "#2563EB", hoverColor: "#1D4ED8" },
  { label: "15 KG", value: 3250, percentage: 26, color: "#10B981", hoverColor: "#059669" },
  { label: "18 KG", value: 2450, percentage: 20, color: "#F97316", hoverColor: "#EA580C" },
  { label: "22 KG", value: 1500, percentage: 12, color: "#EF4444", hoverColor: "#DC2626" },
  { label: "35 KG", value: 800, percentage: 6, color: "#8B5CF6", hoverColor: "#7C3AED" },
];

export function StockSummaryChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // SVG parameters
  const radius = 50;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius; // ~314.16
  const center = 60; // center of SVG coordinate system (120x120 viewport)

  // Calculate cumulative percentages to position the offsets
  let accumulatedPercentage = 0;

  return (
    <div className="flex flex-col h-full rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground">
        Warehouse Stock Summary
      </h3>

      <div className="mt-6 flex flex-col items-center justify-center gap-8 sm:flex-row sm:justify-between flex-1">
        {/* Donut Chart */}
        <div className="relative h-[160px] w-[160px] flex-shrink-0">
          <svg
            viewBox="0 0 120 120"
            className="h-full w-full -rotate-90 transform"
          >
            {/* Background Circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
              className="dark:stroke-border/40"
            />

            {/* Slices */}
            {STOCK_DATA.map((item, index) => {
              const slicePercentage = item.percentage;
              const strokeDasharray = `${(slicePercentage / 100) * circumference} ${
                circumference - (slicePercentage / 100) * circumference
              }`;
              const strokeDashoffset =
                circumference - (accumulatedPercentage / 100) * circumference;

              // Accumulate percentage for the next slice
              accumulatedPercentage += slicePercentage;

              const isHovered = activeIndex === index;

              return (
                <circle
                  key={item.label}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={isHovered ? strokeWidth + 2 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="butt"
                  className="transition-all duration-300 ease-out cursor-pointer"
                  style={{
                    transformOrigin: `${center}px ${center}px`,
                    filter: isHovered
                      ? `drop-shadow(0 4px 6px ${item.color}33)`
                      : "none",
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
              );
            })}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-foreground">
              {activeIndex !== null
                ? STOCK_DATA[activeIndex].value.toLocaleString()
                : "12,560"}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#94A3B8] dark:text-muted-foreground">
              {activeIndex !== null ? STOCK_DATA[activeIndex].label : "Total"}
            </span>
          </div>
        </div>

        {/* Legend Table */}
        <div className="w-full flex-1 space-y-2.5">
          {STOCK_DATA.map((item, index) => {
            const isHovered = activeIndex === index;

            return (
              <div
                key={item.label}
                className={cn(
                  "flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-all duration-150 border border-transparent",
                  isHovered && "bg-[#F8FAFC] border-[#F1F5F9] dark:bg-muted/50 dark:border-border/50"
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center gap-x-2.5">
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-white shadow-sm dark:border-none"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-semibold text-[#334155] dark:text-foreground">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-x-3 text-sm font-medium text-[#475569] dark:text-muted-foreground">
                  <span className="font-bold text-[#0F172A] dark:text-foreground">
                    {item.value.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#94A3B8] font-normal w-12 text-right">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
