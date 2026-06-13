"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CustomSelect } from "./custom-select";

interface GeneralSettingsProps {
  companyName: string;
  setCompanyName: (v: string) => void;
  companyPhone: string;
  setCompanyPhone: (v: string) => void;
  companyAddress: string;
  setCompanyAddress: (v: string) => void;
  timezone: string;
  setTimezone: (v: string) => void;
  dateFormat: string;
  setDateFormat: (v: string) => void;
  currency: string;
  setCurrency: (v: string) => void;
  itemsPerPage: string;
  setItemsPerPage: (v: string) => void;
  lowStockAlert: boolean;
  setLowStockAlert: (v: boolean) => void;
}

export function GeneralSettings({
  companyName,
  setCompanyName,
  companyPhone,
  setCompanyPhone,
  companyAddress,
  setCompanyAddress,
  timezone,
  setTimezone,
  dateFormat,
  setDateFormat,
  currency,
  setCurrency,
  itemsPerPage,
  setItemsPerPage,
  lowStockAlert,
  setLowStockAlert,
}: GeneralSettingsProps) {
  return (
    <div className="space-y-6">
      {/* General settings section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-foreground">
          General Settings
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#475569] dark:text-slate-300">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="h-11 w-full rounded-lg border border-[#E2E8F0] bg-transparent px-3.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#475569] dark:text-slate-300">
              Company Phone
            </label>
            <input
              type="text"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
              className="h-11 w-full rounded-lg border border-[#E2E8F0] bg-transparent px-3.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[13px] font-semibold text-[#475569] dark:text-slate-300">
            Company Address
          </label>
          <input
            type="text"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            className="h-11 w-full rounded-lg border border-[#E2E8F0] bg-transparent px-3.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#475569] dark:text-slate-300">
              Timezone
            </label>
            <CustomSelect
              value={timezone}
              onChange={setTimezone}
              options={[
                { value: "(UTC+06:00) Dhaka", label: "(UTC+06:00) Dhaka" },
                { value: "(UTC+00:00) London", label: "(UTC+00:00) London" },
                { value: "(UTC-05:00) New York", label: "(UTC-05:00) New York" },
              ]}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#475569] dark:text-slate-300">
              Date Format
            </label>
            <CustomSelect
              value={dateFormat}
              onChange={setDateFormat}
              options={[
                { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
              ]}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#475569] dark:text-slate-300">
              Currency
            </label>
            <CustomSelect
              value={currency}
              onChange={setCurrency}
              options={[
                { value: "BDT (৳)", label: "BDT (৳)" },
                { value: "USD ($)", label: "USD ($)" },
                { value: "EUR (€)", label: "EUR (€)" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* System preferences section */}
      <div className="space-y-4 pt-4 border-t border-[#F1F5F9] dark:border-border/50">
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-foreground">
          System Preferences
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 items-center">
          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#475569] dark:text-slate-300">
              Items Per Page
            </label>
            <CustomSelect
              value={itemsPerPage}
              onChange={setItemsPerPage}
              options={[
                { value: "10", label: "10" },
                { value: "20", label: "20" },
                { value: "50", label: "50" },
              ]}
            />
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center justify-between pt-6 sm:pt-7 sm:pl-6">
            <div className="flex flex-col min-w-0 pr-4">
              <span className="text-sm font-bold text-[#0F172A] dark:text-foreground">
                Low Stock Alert
              </span>
              <span className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                Get notified when stock is low
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLowStockAlert(!lowStockAlert)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                lowStockAlert ? "bg-[#2563EB]" : "bg-slate-200 dark:bg-muted"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out",
                  lowStockAlert ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
