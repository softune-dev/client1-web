"use client";

import React from "react";
import Link from "next/link";
import { ActivityLog } from "@/types/inventory";

interface RecentActivityProps {
  activities: ActivityLog[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <div className="flex items-center justify-between dark:border-border/50 mb-4">
        <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground font-dm-sans">
          Recent Inventory Activity
        </h3>
        <Link
          href="/inventory/inventory-ledger"
          className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:underline font-dm-sans"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse text-left font-sans">
          <tbody className="divide-y divide-[#F1F5F9] dark:divide-border/50">
            {activities.map((activity) => {
              const isReceived = activity.type === "Received";
              const isReturn = activity.type === "Return";

              let iconContainerClass = "";
              let iconSvg = null;

              if (isReceived) {
                iconContainerClass = "bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400";
                iconSvg = (
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                );
              } else if (isReturn) {
                iconContainerClass = "bg-[#FAF5FF] text-[#8B5CF6] dark:bg-purple-950/30 dark:text-purple-400";
                iconSvg = (
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67" />
                  </svg>
                );
              } else {
                iconContainerClass = "bg-[#FFF7ED] text-[#F97316] dark:bg-orange-950/30 dark:text-orange-400";
                iconSvg = (
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="17 1 21 5 17 9" />
                    <path d="M3 11V9a4 4 0 014-4h14" />
                    <polyline points="7 23 3 19 7 15" />
                    <path d="M21 13v2a4 4 0 01-4 4H3" />
                  </svg>
                );
              }

              return (
                <tr key={activity.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-muted/10">
                  {/* Left: Icon and Type */}
                  <td className="py-4 pl-0 pr-4 w-[45%] align-middle text-left">
                    <div className="flex items-center gap-x-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconContainerClass}`}>
                        {iconSvg}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0F172A] dark:text-foreground">
                          {activity.type}
                        </h4>
                        <p className="text-xs text-[#94A3B8] dark:text-slate-500 font-medium font-sans">
                          {activity.size}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Middle: Quantity and Source */}
                  <td className="py-4 px-4 w-[35%] align-middle text-left font-sans">
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${activity.qty > 0 ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                        {activity.qty > 0 ? `+${activity.qty}` : activity.qty} Cylinders
                      </span>
                      <span className="text-[11px] text-[#94A3B8] dark:text-slate-500 font-medium">
                        {activity.location}
                      </span>
                    </div>
                  </td>

                  {/* Right: Date and User */}
                  <td className="py-4 pl-4 pr-0 w-[20%] align-middle text-left font-sans">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#475569] dark:text-slate-400">
                        {activity.date}
                      </span>
                      <span className="text-[11px] text-[#94A3B8] dark:text-slate-500 font-medium">
                        {activity.user}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
