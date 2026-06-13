"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { TripDetails } from "@/types/inventory";

interface TripInfoProps {
  trips: TripDetails[];
  selectedTripNo: string;
  vehicle: string;
  driver: string;
  manager: string;
  returnDate: string;
  status: string;
  onTripChange: (v: string) => void;
}

export function TripInfo({
  trips,
  selectedTripNo,
  vehicle,
  driver,
  manager,
  returnDate,
  status,
  onTripChange,
}: TripInfoProps) {
  // Helper to format date display
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
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 font-sans text-xs items-center">
        {/* Select Trip Dropdown */}
        <div className="lg:col-span-1">
          <label className="text-sm font-semibold tracking-tight text-[#475569] dark:text-slate-400 mb-1.5 block font-dm-sans">
            Select Trip
          </label>
          <select
            value={selectedTripNo}
            onChange={(e) => onTripChange(e.target.value)}
            className="h-10 w-full rounded-sm border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-sm font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground cursor-pointer font-sans"
          >
            {trips.map((t) => (
              <option key={t.tripNo} value={t.tripNo}>
                {t.tripNo}
              </option>
            ))}
          </select>
        </div>

        {/* Trip Info Details Panel */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 border-t lg:border-t-0 lg:border-l border-[#F1F5F9] pt-4 lg:pt-2 lg:pl-6 dark:border-border/50 font-dm-sans">
          <div>
            <span className="block text-sm font-semibold tracking-tight mb-2 text-[#64748B] dark:text-slate-400 font-dm-sans">
              Trip No.
            </span>
            <span className="block text-sm tracking-tight font-bold text-[#0F172A] dark:text-foreground mt-1 font-sans">
              {selectedTripNo}
            </span>
          </div>
          <div>
            <span className="block text-sm font-semibold tracking-tight mb-2 text-[#64748B] dark:text-slate-400 font-dm-sans">
              Vehicle
            </span>
            <span className="block text-sm tracking-tight font-bold text-[#0F172A] dark:text-foreground mt-1 font-sans">
              {vehicle}
            </span>
          </div>
          <div>
            <span className="block text-sm font-semibold tracking-tight mb-2 text-[#64748B] dark:text-slate-400 font-dm-sans">
              Driver
            </span>
            <span className="block text-sm tracking-tight font-bold text-[#0F172A] dark:text-foreground mt-1 font-sans">
              {driver}
            </span>
          </div>
          <div>
            <span className="block text-sm font-semibold tracking-tight mb-2 text-[#64748B] dark:text-slate-400 font-dm-sans">
              Marketing Manager
            </span>
            <span className="block text-sm tracking-tight font-bold text-[#0F172A] dark:text-foreground mt-1 font-sans">
              {manager}
            </span>
          </div>
          <div>
            <span className="block text-sm font-semibold tracking-tight mb-2 text-[#64748B] dark:text-slate-400 font-dm-sans">
              Return Date
            </span>
            <span className="block text-sm font-bold text-[#0F172A] dark:text-foreground mt-1 font-sans">
              {formatDateDisplay(returnDate)}
            </span>
          </div>
          <div>
            <span className="block text-sm font-semibold tracking-tight mb-2 text-[#64748B] dark:text-slate-400 font-dm-sans">
              Status
            </span>
            <div className="mt-1">
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-none font-bold">
                {status}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
