"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/page-header";
import { FiSearch, FiFilter } from "react-icons/fi";
import { Download } from "lucide-react";
import { StockStats } from "@/components/inventory/receive-stock/stock-stats";
import { StockTable } from "@/components/inventory/current-stock/stock-table";
import { RecentActivity } from "@/components/inventory/current-stock/recent-activity";
import { StockSummary, ActivityLog } from "@/types/inventory";

const INITIAL_STOCK: StockSummary[] = [
  { size: "12 KG", currentStock: 1250, reserved: 320 },
  { size: "15 KG", currentStock: 950, reserved: 210 },
  { size: "18 KG", currentStock: 400, reserved: 90 },
  { size: "22 KG", currentStock: 160, reserved: 40 },
  { size: "35 KG", currentStock: 90, reserved: 20 },
];

const RECENT_ACTIVITIES: ActivityLog[] = [
  {
    id: 1,
    type: "Received",
    size: "12 KG Cylinder",
    qty: 100,
    location: "From: Fresh LPG Depot",
    date: "02 Jun 2025, 10:30 AM",
    user: "By: Super Admin",
  },
  {
    id: 2,
    type: "Transfer to Vehicle",
    size: "15 KG Cylinder",
    qty: -60,
    location: "To: Vehicle DHK-TA-1234",
    date: "02 Jun 2025, 09:45 AM",
    user: "By: Karimul Hasan",
  },
  {
    id: 3,
    type: "Return",
    size: "18 KG Cylinder",
    qty: 20,
    location: "From: Vehicle DHK-TA-5678",
    date: "02 Jun 2025, 08:20 AM",
    user: "By: Monir Hossain",
  },
  {
    id: 4,
    type: "Received",
    size: "35 KG Cylinder",
    qty: 30,
    location: "From: Bashundhara LPG Supply",
    date: "01 Jun 2025, 05:15 PM",
    user: "By: Super Admin",
  },
];

export default function CurrentStockPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sizeFilter, setSizeFilter] = useState("All Sizes");

  // Filter Stock Summary
  const filteredStock = INITIAL_STOCK.filter((item) => {
    const matchesSearch = item.size
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      sizeFilter === "All Sizes" || item.size === sizeFilter;
    return matchesSearch && matchesFilter;
  });

  // Action Buttons
  const headerActions = (
    <div className="flex items-center gap-2">
      <Link
        href="/inventory/load-vehicle"
        className="inline-flex items-center justify-center gap-x-2 rounded-sm border border-[#E2E8F0] bg-white px-3.5 py-3 text-sm font-semibold text-[#334155] hover:bg-slate-50 transition-colors shadow-xs cursor-pointer dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-muted/30"
      >
        <svg
          className="size-4 text-[#334155] dark:text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 3L21 7L17 11" />
          <path d="M3 7H21" />
          <path d="M7 21L3 17L7 13" />
          <path d="M21 17H3" />
        </svg>
        Transfer Stock
      </Link>
      <Link
        href="/inventory/receive-stock"
        className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-3.5 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors shadow-xs cursor-pointer"
      >
        <Download className="size-4 text-white" />
        Receive Stock
      </Link>
    </div>
  );

  return (
    <div className="space-y-6 font-dm-sans pb-10">
      <PageHeader title="Inventory" action={headerActions} />

      {/* Stats Cards Row */}
      <StockStats
        totalStock={2850}
        todayReceived={250}
        transferredToday={180}
        returnsToday={70}
      />

      {/* Search Bar & Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs font-sans text-xs">
          <FiSearch className="absolute left-3 top-3 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by cylinder size..."
            className="h-9 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border pl-9 pr-3 text-xs outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground font-semibold"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative w-full sm:w-auto min-w-[100px] font-sans text-xs">
          <FiFilter className="absolute left-3 top-3 text-[#94A3B8]" />
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="h-9 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border pl-9 pr-3 text-xs outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground appearance-none cursor-pointer font-semibold"
          >
            <option value="All Sizes">All Sizes</option>
            <option value="12 KG">12 KG</option>
            <option value="15 KG">15 KG</option>
            <option value="18 KG">18 KG</option>
            <option value="22 KG">22 KG</option>
            <option value="35 KG">35 KG</option>
          </select>
        </div>
      </div>

      {/* Warehouse Stock Summary Card */}
      <StockTable stockData={filteredStock} />

      {/* Recent Inventory Activity Card */}
      <RecentActivity activities={RECENT_ACTIVITIES} />
    </div>
  );
}
