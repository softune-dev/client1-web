"use client";

import React from "react";
import { FiInfo, FiCalendar } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface TripInfoFormProps {
  tripNumber: string;
  tripDate: string;
  onTripDateChange: (val: string) => void;
  selectedVehicle: string;
  onVehicleChange: (val: string) => void;
  selectedDriver: string;
  onDriverChange: (val: string) => void;
  selectedManager: string;
  onManagerChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  vehicles: string[];
  drivers: string[];
  managers: string[];
}

export function TripInfoForm({
  tripNumber,
  tripDate,
  onTripDateChange,
  selectedVehicle,
  onVehicleChange,
  selectedDriver,
  onDriverChange,
  selectedManager,
  onManagerChange,
  selectedStatus,
  onStatusChange,
  vehicles,
  drivers,
  managers,
}: TripInfoFormProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card space-y-5">
      {/* Card Header */}
      <div className="flex items-center gap-x-2.5 pb-2 dark:border-border/50">
        <FiInfo className="h-5 w-5 text-[#2563EB] dark:text-blue-400" />
        <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground">
          Trip Information
        </h3>
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Trip Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#64748B] dark:text-slate-300">
            Trip Number
          </label>
          <input
            type="text"
            disabled
            value={tripNumber}
            className="h-10 w-full rounded-sm border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 text-sm font-semibold text-[#64748B] dark:border-border dark:bg-muted/30 dark:text-muted-foreground outline-none font-mono"
          />
        </div>

        {/* Trip Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#64748B] dark:text-slate-300">
            Trip Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={tripDate}
              onChange={(e) => onTripDateChange(e.target.value)}
              className="h-10 w-full rounded-sm border border-[#CBD5E1] bg-transparent pl-3.5 pr-10 text-sm font-semibold transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-sans"
            />
          </div>
        </div>

        {/* Vehicle */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#64748B] dark:text-slate-300">
            Vehicle <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedVehicle}
            onChange={(e) => onVehicleChange(e.target.value)}
            className="h-10 w-full rounded-sm border border-[#CBD5E1] bg-white dark:bg-card px-3 text-sm font-semibold transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground cursor-pointer"
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Driver */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#64748B] dark:text-slate-300">
            Driver <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedDriver}
            onChange={(e) => onDriverChange(e.target.value)}
            className="h-10 w-full rounded-sm border border-[#CBD5E1] bg-white dark:bg-card px-3 text-sm font-semibold transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground cursor-pointer"
          >
            <option value="">Select Driver</option>
            {drivers.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Marketing Manager */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#64748B] dark:text-slate-300">
            Marketing Manager <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedManager}
            onChange={(e) => onManagerChange(e.target.value)}
            className="h-10 w-full rounded-sm border border-[#CBD5E1] bg-white dark:bg-card px-3 text-sm font-semibold transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground cursor-pointer"
          >
            <option value="">Select Marketing Manager</option>
            {managers.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#64748B] dark:text-slate-300">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className={cn(
              "h-10 w-full rounded-sm border px-3 text-sm font-bold transition-colors outline-none cursor-pointer",
              selectedStatus === "Draft" && "bg-[#FFF8ED] border-[#FED7AA] text-[#D97706] focus:border-[#F97316] dark:bg-amber-950/20 dark:border-amber-900/50 dark:text-amber-400",
              selectedStatus === "Loaded" && "bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB] focus:border-[#3B82F6] dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-400",
              selectedStatus === "In Transit" && "bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB] focus:border-[#3B82F6] dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-400",
              selectedStatus === "Completed" && "bg-[#ECFDF5] border-[#A7F3D0] text-[#10B981] focus:border-[#10B981] dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400"
            )}
          >
            <option value="Draft">Draft</option>
            <option value="Loaded">Loaded</option>
            <option value="In Transit">In Transit</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
