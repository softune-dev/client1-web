"use client";

import React from "react";
import { Database, Download, Truck, Navigation } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { StockSummaryChart } from "@/components/dashboard/stock-summary-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { ActiveTripsTable } from "@/components/dashboard/active-trips-table";
import { DeliverySummaryChart } from "@/components/dashboard/delivery-summary-chart";
import { RecentDeliveriesTable } from "@/components/dashboard/recent-deliveries-table";

export default function DashboardPage() {
  return (
    <div className="space-y-6 font-dm-sans pb-10">
      {/* ─── Top Stats Cards ─── */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 items-start">
        <StatsCard
          title="Total Warehouse Stock"
          value="12,560"
          valueUnit="Cylinders"
          iconBgColor="bg-[#EFF6FF] dark:bg-blue-950/20"
          iconColor="text-[#2563EB]"
          icon={<Database className="h-5 w-5" />}
        />
        <StatsCard
          title="Today's Received"
          value="1,250"
          valueUnit="Cylinders"
          iconBgColor="bg-[#ECFDF5] dark:bg-emerald-950/20"
          iconColor="text-[#10B981]"
          icon={<Download className="h-5 w-5" />}
        />
        <StatsCard
          title="Today's Delivered"
          value="1,820"
          valueUnit="Cylinders"
          iconBgColor="bg-[#FFF7ED] dark:bg-orange-950/20"
          iconColor="text-[#F97316]"
          icon={<Truck className="h-5 w-5" />}
        />
        <StatsCard
          title="Active Trips"
          value="12"
          valueUnit="Trips"
          iconBgColor="bg-[#FAF5FF] dark:bg-purple-950/20"
          iconColor="text-[#8B5CF6]"
          icon={<Navigation className="h-5 w-5" />}
        />
      </div>

      {/* ─── Second Row: Stock Summary & Transactions ─── */}
      <div className="grid gap-6 grid-cols-12">
        <div className="col-span-12 lg:col-span-5">
          <StockSummaryChart />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <RecentTransactions />
        </div>
      </div>

      {/* ─── Third Row: Active Trips & Delivery Summary Chart ─── */}
      <div className="grid gap-6 grid-cols-12">
        <div className="col-span-12 lg:col-span-6">
          <ActiveTripsTable />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <DeliverySummaryChart />
        </div>
      </div>

      {/* ─── Fourth Row: Recent Deliveries ─── */}
      <div className="w-full">
        <RecentDeliveriesTable />
      </div>
    </div>
  );
}
