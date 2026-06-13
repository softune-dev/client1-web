"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface TripSummaryPanelProps {
  selectedTripNo: string;
  vehicle: string;
  driver: string;
  manager: string;
  transferDate: string;
  status: string;
}

export function TripSummaryPanel({
  selectedTripNo,
  vehicle,
  driver,
  manager,
  transferDate,
  status,
}: TripSummaryPanelProps) {
  // Format date helper to display like "02 Jun 2025"
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return dateStr;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card flex flex-col h-full font-dm-sans">
      <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground mb-4 shrink-0">
        Selected Trip Summary
      </h3>
      <div className="flex-grow flex flex-col justify-between text-sm pb-1 space-y-1">
        <div className="grid grid-cols-12 gap-x-2 items-center py-1">
          <span className="col-span-4 font-semibold tracking-tight text-[#64748B] dark:text-slate-400">
            1. Trip No
          </span>
          <span className="col-span-1 text-center text-[#64748B] dark:text-slate-400">
            :
          </span>
          <span className="col-span-7 font-bold tracking-tight text-[#0F172A] dark:text-foreground font-sans">
            {selectedTripNo}
          </span>
        </div>
        <div className="grid grid-cols-12 gap-x-2 items-center py-1">
          <span className="col-span-4 font-semibold tracking-tight text-[#64748B] dark:text-slate-400">
            2. Vehicle
          </span>
          <span className="col-span-1 text-center text-[#64748B] dark:text-slate-400">
            :
          </span>
          <span className="col-span-7 font-bold tracking-tight text-[#0F172A] dark:text-foreground">
            {vehicle}
          </span>
        </div>
        <div className="grid grid-cols-12 gap-x-2 items-center py-1">
          <span className="col-span-4 font-semibold tracking-tight text-[#64748B] dark:text-slate-400">
            3. Driver
          </span>
          <span className="col-span-1 text-center text-[#64748B] dark:text-slate-400">
            :
          </span>
          <span className="col-span-7 font-bold tracking-tight text-[#0F172A] dark:text-foreground">
            {driver}
          </span>
        </div>
        <div className="grid grid-cols-12 gap-x-2 items-center py-1">
          <span className="col-span-4 font-semibold tracking-tight text-[#64748B] dark:text-slate-400">
            4. Marketing Manager
          </span>
          <span className="col-span-1 text-center text-[#64748B] dark:text-slate-400">
            :
          </span>
          <span className="col-span-7 font-bold tracking-tight text-[#0F172A] dark:text-foreground">
            {manager}
          </span>
        </div>
        <div className="grid grid-cols-12 gap-x-2 items-center py-1">
          <span className="col-span-4 font-semibold tracking-tight text-[#64748B] dark:text-slate-400">
            5. Transfer Date
          </span>
          <span className="col-span-1 text-center text-[#64748B] dark:text-slate-400">
            :
          </span>
          <span className="col-span-7 font-bold tracking-tight text-[#0F172A] dark:text-foreground font-sans">
            {formatDateDisplay(transferDate)}
          </span>
        </div>

        <div className="border-t border-[#F1F5F9] my-1 dark:border-border/50 shrink-0" />

        <div className="grid grid-cols-12 gap-x-2 items-center py-1">
          <span className="col-span-4 font-semibold tracking-tight text-[#64748B] dark:text-slate-400">
            6. Status
          </span>
          <span className="col-span-1 text-center text-[#64748B] dark:text-slate-400">
            :
          </span>
          <div className="col-span-7 flex justify-start">
            <Badge variant="warning">{status}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
