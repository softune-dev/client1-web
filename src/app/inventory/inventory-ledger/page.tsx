"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { FiSearch, FiCalendar } from "react-icons/fi";
import { Download } from "lucide-react";
import { LedgerStats } from "@/components/inventory/inventory-ledger/ledger-stats";
import { LedgerTable } from "@/components/inventory/inventory-ledger/ledger-table";
import { LedgerEntry } from "@/types/inventory";

const INITIAL_LEDGER: LedgerEntry[] = [
  {
    id: 1,
    dateTime: "02 Jun 2025, 10:30 AM",
    referenceNo: "INV-1258",
    type: "Received",
    size: "15 KG",
    quantity: 120,
    sourceDestination: "Fresh LPG Depot",
    performedBy: "Super Admin",
    balance: 2850,
  },
  {
    id: 2,
    dateTime: "02 Jun 2025, 09:45 AM",
    referenceNo: "TRP-2025-0534",
    type: "Transfer",
    size: "15 KG",
    quantity: -100,
    sourceDestination: "To: Vehicle DHK-TA-1234",
    performedBy: "Karimul Hasan",
    balance: 2730,
  },
  {
    id: 3,
    dateTime: "01 Jun 2025, 05:15 PM",
    referenceNo: "INV-1257",
    type: "Received",
    size: "35 KG",
    quantity: 30,
    sourceDestination: "Bashundhara LPG Supply",
    performedBy: "Super Admin",
    balance: 2830,
  },
  {
    id: 4,
    dateTime: "01 Jun 2025, 04:40 PM",
    referenceNo: "TRP-2025-0531",
    type: "Transfer",
    size: "15 KG",
    quantity: -60,
    sourceDestination: "To: Vehicle DHK-TA-1234",
    performedBy: "Karimul Hasan",
    balance: 2800,
  },
  {
    id: 5,
    dateTime: "01 Jun 2025, 08:20 AM",
    referenceNo: "RET-2025-0187",
    type: "Return",
    size: "12 KG",
    quantity: 24,
    sourceDestination: "From: Vehicle WB-19-AB-4321",
    performedBy: "Monir Hossain",
    balance: 2860,
  },
  {
    id: 6,
    dateTime: "31 May 2025, 08:45 PM",
    referenceNo: "RET-2025-0185",
    type: "Return",
    size: "15 KG",
    quantity: 15,
    sourceDestination: "From: Vehicle DHK-TA-5678",
    performedBy: "Monir Hossain",
    balance: 2836,
  },
  {
    id: 7,
    dateTime: "31 May 2025, 06:15 PM",
    referenceNo: "TRP-2025-0528",
    type: "Transfer",
    size: "18 KG",
    quantity: -80,
    sourceDestination: "To: Vehicle WB-19-AB-4321",
    performedBy: "Ramesh Kumar",
    balance: 2821,
  },
  {
    id: 8,
    dateTime: "31 May 2025, 03:25 PM",
    referenceNo: "INV-1256",
    type: "Received",
    size: "12 KG",
    quantity: 200,
    sourceDestination: "Fresh LPG Depot",
    performedBy: "Super Admin",
    balance: 2901,
  },
];

export default function InventoryLedgerPage() {
  // Stats
  const [totalEntries] = useState(128);
  const [stockIn] = useState(2560);
  const [stockOut] = useState(2180);
  const [netMovement] = useState(380);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Transaction Types");
  const [sizeFilter, setSizeFilter] = useState("All Sizes");
  const [dateFilter, setDateFilter] = useState("2025-06-01 - 2025-06-02");

  // Filtering Logic
  const filteredLedger = INITIAL_LEDGER.filter((entry) => {
    const matchesSearch =
      entry.referenceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.sourceDestination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.performedBy.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === "All Transaction Types" || entry.type === typeFilter;

    const matchesSize =
      sizeFilter === "All Sizes" || entry.size === sizeFilter;

    return matchesSearch && matchesType && matchesSize;
  });

  const headerActions = (
    <div className="flex items-center gap-2 font-dm-sans">
      <button
        type="button"
        onClick={() => alert("Ledger exported successfully!")}
        className="inline-flex items-center justify-center gap-x-2 rounded-sm border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#334155] hover:bg-slate-50 transition-colors shadow-xs cursor-pointer dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-muted/30"
      >
        <Download className="size-4 text-[#334155] dark:text-muted-foreground" />
        Export Report
      </button>
    </div>
  );

  return (
    <div className="space-y-6 font-dm-sans pb-10">
      <PageHeader title="Inventory" action={headerActions} />

      {/* Stats Cards Row */}
      <LedgerStats
        totalEntries={totalEntries}
        stockIn={stockIn}
        stockOut={stockOut}
        netMovement={netMovement}
      />

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row items-center gap-3 font-sans text-xs">
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <FiSearch className="absolute left-3 top-3 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by reference no., source, or performed by..."
            className="h-9 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border pl-9 pr-3 text-xs outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground font-semibold"
          />
        </div>

        {/* Date Range Picker */}
        <div className="relative w-full md:w-auto min-w-[200px]">
          <FiCalendar className="absolute left-3 top-3 text-[#94A3B8]" />
          <input
            type="text"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            placeholder="01 Jun 2025 - 02 Jun 2025"
            className="h-9 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border pl-9 pr-3 text-xs outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground font-semibold cursor-pointer"
          />
        </div>

        {/* Transaction Type Filter */}
        <div className="relative w-full md:w-auto min-w-[170px]">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-9 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-xs outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground appearance-none cursor-pointer font-semibold"
          >
            <option value="All Transaction Types">All Transaction Types</option>
            <option value="Received">Received</option>
            <option value="Transfer">Transfer</option>
            <option value="Return">Return</option>
          </select>
        </div>

        {/* Size Filter */}
        <div className="relative w-full md:w-auto min-w-[130px]">
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="h-9 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-xs outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground appearance-none cursor-pointer font-semibold"
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

      {/* Inventory Ledger Card */}
      <LedgerTable filteredLedger={filteredLedger} />
    </div>
  );
}
