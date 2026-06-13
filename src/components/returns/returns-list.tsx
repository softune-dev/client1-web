"use client";

import React from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ReturnLog } from "@/types/return";
import { cn } from "@/lib/utils";

interface ReturnsListProps {
  entries: ReturnLog[];
  selectedReturn: ReturnLog;
  onSelect: (entry: ReturnLog) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ReturnsList({
  entries,
  selectedReturn,
  onSelect,
  searchQuery,
  onSearchChange,
}: ReturnsListProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-4 dark:border-border dark:bg-card flex flex-col gap-4">
      <div className="flex items-center justify-between dark:border-border/50">
        <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground">
          Return Logs
        </h3>
        <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 dark:bg-muted dark:text-slate-300 px-2 py-0.5 rounded-full font-sans">
          {entries.length} items
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-[#94A3B8]" />
        </div>
        <input
          type="text"
          placeholder="Search returns..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full rounded-sm border border-[#E2E8F0] bg-white py-2 pl-9 pr-3 text-sm placeholder-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] text-[#334155] dark:border-border dark:bg-card dark:text-foreground font-dm-sans"
        />
      </div>

      {/* Logs List Scrollbox */}
      <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[500px] pr-1 scrollbar-thin">
        {entries.map((entry) => {
          const isSelected = selectedReturn.id === entry.id;
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelect(entry)}
              className={cn(
                "w-full text-left p-3.5 rounded-sm border transition-all duration-200 cursor-pointer flex flex-col gap-2 focus:outline-none",
                isSelected
                  ? "border-[#2563EB] bg-[#EFF6FF] dark:bg-blue-950/20 dark:border-blue-500"
                  : "border-[#E2E8F0] bg-white hover:bg-slate-50 dark:border-border dark:bg-card dark:hover:bg-muted/30"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#0F172A] dark:text-foreground font-sans">
                  {entry.returnNo}
                </span>
                <Badge
                  variant={entry.status === "Pending" ? "warning" : "success"}
                  className="font-dm-sans text-[10px] px-2 py-0.2"
                >
                  {entry.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-sans">
                <span className="font-medium">{entry.tripNo}</span>
                <span className="text-[11px]">{entry.date.split(" ").slice(0, 2).join(" ")}</span>
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 font-sans">
                {entry.totalReturned} Cylinders
              </div>
            </button>
          );
        })}

        {entries.length === 0 && (
          <div className="text-center py-8 text-[#94A3B8] dark:text-muted-foreground/60 text-xs font-semibold">
            No returns matched search
          </div>
        )}
      </div>
    </div>
  );
}
