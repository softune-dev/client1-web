"use client";

import React from "react";
import { Search, Calendar, ArrowBigDown, ArrowDown } from "lucide-react";

interface ReportFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedSize: string;
  onSizeChange: (s: string) => void;
}

export function ReportFilters({
  searchQuery,
  onSearchChange,
  selectedSize,
  onSizeChange,
}: ReportFiltersProps) {
  const sizeOptions = [
    { value: "All Sizes", label: "All Sizes" },
    { value: "12 KG", label: "12 KG" },
    { value: "15 KG", label: "15 KG" },
    { value: "18 KG", label: "18 KG" },
    { value: "22 KG", label: "22 KG" },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-12 items-center bg-white border border-[#E2E8F0] p-4 rounded-sm dark:border-border dark:bg-card">
      {/* Date Range Selector */}
      <div className="md:col-span-4 space-y-1">
        <label className="text-xs font-semibold text-[#64748B] dark:text-muted-foreground block">
          Date Range
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Calendar className="h-4 w-4 text-[#94A3B8]" />
          </div>
          <select
            disabled
            className="h-9 w-full rounded-sm border border-gray-200 bg-[#F8FAFC]/55 dark:bg-muted/10 pl-9 pr-3 text-xs outline-none dark:border-border text-[#475569] dark:text-muted-foreground font-sans font-medium cursor-not-allowed appearance-none"
          >
            <option>01 Jun 2025 - 02 Jun 2025</option>
          </select>
        </div>
      </div>

      {/* Product Size Selector */}
      <div className="md:col-span-4 space-y-1">
        <label className="text-xs font-semibold text-[#64748B] dark:text-muted-foreground block">
          Product Size
        </label>
        <div className="relative">
          <select
            value={selectedSize}
            onChange={(e) => onSizeChange(e.target.value)}
            className="h-9 w-full rounded-md border border-gray-200 bg-white dark:bg-card pl-3 pr-8 text-sm outline-none focus:border-[#2563EB] dark:border-border text-[#475569] dark:text-muted-foreground font-medium font-dm-sans appearance-none cursor-pointer"
          >
            {sizeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#94A3B8]">
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Search Field */}
      <div className="md:col-span-4 space-y-1 self-end">
        <label className="text-xs font-semibold text-[#64748B] dark:text-muted-foreground block md:hidden">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-[#94A3B8]" />
          </div>
          <input
            type="text"
            placeholder="Search size..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block h-9 w-full rounded-md border border-[#E2E8F0] bg-white py-2 pl-9 pr-3 text-xs placeholder-[#94A3B8] focus:border-[#2563EB] focus:outline-none dark:border-border dark:bg-card dark:text-foreground font-dm-sans"
          />
        </div>
      </div>
    </div>
  );
}
