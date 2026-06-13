"use client";

import React from "react";
import { FiTruck, FiUser, FiFileText } from "react-icons/fi";
import { Trip } from "@/types/trip";
import { cn } from "@/lib/utils";
import { Road } from "lucide-react";

interface LoadTripBannerProps {
  trips: Trip[];
  selectedTrip: Trip | null;
  onTripChange: (trip: Trip) => void;
}

export function LoadTripBanner({
  trips,
  selectedTrip,
  onTripChange,
}: LoadTripBannerProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-100 dark:divide-border/40">
        
        {/* Trip No. */}
        <div className="flex items-center gap-x-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
            <Road className="h-6 w-6" />
          </div>
          <div className="flex flex-col min-w-0 font-dm-sans">
            <span className="text-sm font-semibold text-[#94A3B8]">
              Trip No.
            </span>
            <div className="flex items-center gap-x-1.5 mt-0.5">
              <select
                value={selectedTrip?.id ?? ""}
                onChange={(e) => {
                  const t = trips.find((x) => x.id === Number(e.target.value));
                  if (t) onTripChange(t);
                }}
                className="font-bold tracking-tight text-sm bg-transparent border-none p-0 outline-none cursor-pointer text-[#0F172A] dark:text-foreground focus:ring-0 focus:outline-none"
              >
                {trips.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.tripNo}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle */}
        <div className="flex items-center gap-x-4 pt-4 sm:pt-0 lg:pl-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
            <FiTruck className="h-6 w-6" />
          </div>
          <div className="flex flex-col min-w-0 font-dm-sans">
            <span className="text-sm font-semibold text-[#94A3B8]">
              Vehicle
            </span>
            <span className="font-bold tracking-tight text-sm text-[#0F172A] dark:text-foreground mt-0.5">
              {selectedTrip?.vehicle ?? "—"}
            </span>
          </div>
        </div>

        {/* Driver */}
        <div className="flex items-center gap-x-4 pt-4 sm:pt-0 lg:pl-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5F3FF] text-[#7C3AED] dark:bg-violet-950/30 dark:text-violet-400">
            <FiUser className="h-6 w-6" />
          </div>
          <div className="flex flex-col min-w-0 font-dm-sans">
            <span className="text-sm font-semibold text-[#94A3B8]">
              Driver
            </span>
            <span className="font-bold tracking-tight text-sm text-[#0F172A] dark:text-foreground mt-0.5">
              {selectedTrip?.driver ?? "—"}
            </span>
          </div>
        </div>

        {/* Marketing Manager */}
        <div className="flex items-center gap-x-4 pt-4 sm:pt-0 lg:pl-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#F97316] dark:bg-orange-950/30 dark:text-orange-400">
            <FiUser className="h-6 w-6" />
          </div>
          <div className="flex flex-col min-w-0 font-dm-sans">
            <span className="text-sm font-semibold text-[#94A3B8]">
              Marketing Manager
            </span>
            <span className="font-bold tracking-tight text-sm text-[#0F172A] dark:text-foreground mt-0.5">
              {selectedTrip?.manager ?? "—"}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-x-4 pt-4 sm:pt-0 lg:pl-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF8ED] text-[#D97706] dark:bg-amber-950/30 dark:text-amber-400">
            <FiFileText className="h-6 w-6" />
          </div>
          <div className="flex flex-col min-w-0 font-dm-sans">
            <span className="text-sm font-semibold text-[#94A3B8]">
              Status
            </span>
            <div>
              <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-bold bg-[#FFF8ED] text-[#D97706] border border-[#FED7AA] dark:bg-amber-950/20 dark:text-amber-400 dark:border-none">
                {selectedTrip?.status ?? "Draft"}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
