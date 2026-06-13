"use client";

import React from "react";
import { TripDetails } from "@/types/inventory";

interface LoadFormProps {
  trips: TripDetails[];
  selectedTripNo: string;
  vehicle: string;
  driver: string;
  manager: string;
  transferDate: string;
  setSelectedTripNo: (v: string) => void;
  setVehicle: (v: string) => void;
  setDriver: (v: string) => void;
  setManager: (v: string) => void;
  setTransferDate: (v: string) => void;
}

export function LoadForm({
  trips,
  selectedTripNo,
  vehicle,
  driver,
  manager,
  transferDate,
  setSelectedTripNo,
  setVehicle,
  setDriver,
  setManager,
  setTransferDate,
}: LoadFormProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground mb-6 font-dm-sans">
        Transfer Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-dm-sans">
        {/* Select Trip */}
        <div>
          <label className="text-sm font-semibold tracking-tight text-[#475569] dark:text-slate-400 mb-1.5 block">
            Select Trip <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedTripNo}
            onChange={(e) => setSelectedTripNo(e.target.value)}
            className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-sm font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground cursor-pointer font-sans"
          >
            {trips.map((t) => (
              <option key={t.tripNo} value={t.tripNo}>
                {t.tripNo}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle */}
        <div>
          <label className="text-sm font-semibold tracking-tight text-[#475569] dark:text-slate-400 mb-1.5 block">
            Vehicle <span className="text-red-500">*</span>
          </label>
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-sm font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground cursor-pointer font-sans"
          >
            <option value="DHK-TA-1234 (Tata Ace)">
              DHK-TA-1234 (Tata Ace)
            </option>
            <option value="DHK-TA-5678 (Toyota Dyna)">
              DHK-TA-5678 (Toyota Dyna)
            </option>
            <option value="DHK-TA-9012 (Isuzu Elf)">
              DHK-TA-9012 (Isuzu Elf)
            </option>
          </select>
        </div>

        {/* Driver */}
        <div>
          <label className="text-sm font-semibold tracking-tight text-[#475569] dark:text-slate-400 mb-1.5 block">
            Driver <span className="text-red-500">*</span>
          </label>
          <select
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-sm font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground cursor-pointer font-sans"
          >
            <option value="Karimul Hasan">Karimul Hasan</option>
            <option value="Rahim Uddin">Rahim Uddin</option>
            <option value="Abul Kashem">Abul Kashem</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm font-dm-sans">
        {/* Marketing Manager */}
        <div>
          <label className="text-sm font-semibold tracking-tight text-[#475569] dark:text-slate-400 mb-1.5 block">
            Marketing Manager <span className="text-red-500">*</span>
          </label>
          <select
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-sm font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground cursor-pointer font-sans"
          >
            <option value="Monir Hossain">Monir Hossain</option>
            <option value="Suresh Kumar">Suresh Kumar</option>
            <option value="Farhana Yasmin">Farhana Yasmin</option>
          </select>
        </div>

        {/* Transfer Date */}
        <div>
          <label className="text-sm font-semibold tracking-tight text-[#475569] dark:text-slate-400 mb-1.5 block">
            Transfer Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={transferDate}
            onChange={(e) => setTransferDate(e.target.value)}
            className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-sm font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground cursor-pointer font-sans"
            required
          />
        </div>
      </div>
    </div>
  );
}
