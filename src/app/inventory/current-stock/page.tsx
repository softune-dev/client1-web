"use client";

import Link from "next/link";
import { PageHeader } from "@/components/common/page-header";
import { Download } from "lucide-react";
import { StockStats } from "@/components/inventory/receive-stock/stock-stats";
import { StockTable } from "@/components/inventory/current-stock/stock-table";
import { RecentActivity } from "@/components/inventory/current-stock/recent-activity";
import { StockSummary, ActivityLog } from "@/types/inventory";

const Bashundhara_STOCK: StockSummary[] = [
  {
    company: "BASHUNDHARA",
    size: "12 KG",
    package: 155,
    refill: 20,
    emptyCylinder: 87,
  },
  {
    company: "BASHUNDHARA",
    size: "15 KG",
    package: 90,
    refill: 32,
    emptyCylinder: 70,
  },
  {
    company: "BASHUNDHARA",
    size: "30 KG",
    package: 105,
    refill: 30,
    emptyCylinder: 25,
  },
  {
    company: "BASHUNDHARA",
    size: "45 KG",
    package: 12,
    refill: 10,
    emptyCylinder: 10,
  },
];

const Total_STOCK: StockSummary[] = [
  {
    company: "TOTAL",
    size: "12 KG",
    package: 155,
    refill: 20,
    emptyCylinder: 87,
  },
  {
    company: "TOTAL",
    size: "15 KG",
    package: 90,
    refill: 32,
    emptyCylinder: 70,
  },
  {
    company: "TOTAL",
    size: "30 KG",
    package: 105,
    refill: 30,
    emptyCylinder: 25,
  },
  {
    company: "TOTAL",
    size: "45 KG",
    package: 12,
    refill: 10,
    emptyCylinder: 10,
  },
];

const Fresh_STOCK: StockSummary[] = [
  {
    company: "FRESH",
    size: "12 KG",
    package: 155,
    refill: 20,
    emptyCylinder: 87,
  },
  {
    company: "FRESH",
    size: "15 KG",
    package: 90,
    refill: 32,
    emptyCylinder: 70,
  },
  {
    company: "FRESH",
    size: "30 KG",
    package: 105,
    refill: 30,
    emptyCylinder: 25,
  },
  {
    company: "FRESH",
    size: "45 KG",
    package: 12,
    refill: 10,
    emptyCylinder: 10,
  },
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
      <StockStats fullPackage={250} refill={550} emptyCylinder={50} />

      {/* Bashundhara Stock Summary Card */}
      <StockTable stockData={Bashundhara_STOCK} />

      {/* Fresh Stock Summary Card */}
      <StockTable stockData={Fresh_STOCK} />

      {/* Total Stock Summary Card */}
      <StockTable stockData={Total_STOCK} />

      {/* Recent Inventory Activity Card */}
      <RecentActivity activities={RECENT_ACTIVITIES} />
    </div>
  );
}
