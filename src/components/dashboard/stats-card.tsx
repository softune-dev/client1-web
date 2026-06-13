import React from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  valueUnit?: string;
  unit?: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  icon: React.ReactNode;
}

export function StatsCard({
  title,
  value,
  valueUnit,
  unit,
  iconBgColor,
  iconColor,
  icon,
}: StatsCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-sm border border-[#E2E8F0] bg-white p-5 transition-all duration-200 hover:shadow-md dark:border-border dark:bg-card">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5 flex-1">
          <span className="text-sm font-medium text-[#64748B] dark:text-muted-foreground">
            {title}
          </span>
          <div className="flex items-baseline gap-x-1.5">
            <span className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-foreground">
              {value}
            </span>
            {valueUnit && (
              <span className="text-sm font-semibold text-[#64748B] dark:text-muted-foreground/80">
                {valueUnit}
              </span>
            )}
          </div>
          {unit && (
            <div className="text-xs text-[#94A3B8] dark:text-muted-foreground/80">
              {unit}
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            iconBgColor
          )}
        >
          <span className={iconColor}>{icon}</span>
        </div>
      </div>
    </div>
  );
}
