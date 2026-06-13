import React from "react";
import Link from "next/link";

interface Delivery {
  deliveryNo: string;
  date: string;
  retailer: string;
  vehicle: string;
  product: string;
  quantity: number;
  marketingManager: string;
}

const DELIVERIES: Delivery[] = [
  { deliveryNo: "DEL-00045", date: "02 Jun 2025 10:30 AM", retailer: "Rafiq Store", vehicle: "Dhaka-TA-1234", product: "12 KG", quantity: 20, marketingManager: "Karim Ahmed" },
  { deliveryNo: "DEL-00044", date: "02 Jun 2025 10:15 AM", retailer: "Molla Enterprise", vehicle: "Dhaka-TA-1234", product: "15 KG", quantity: 10, marketingManager: "Karim Ahmed" },
  { deliveryNo: "DEL-00043", date: "02 Jun 2025 09:45 AM", retailer: "Shapla Store", vehicle: "Dhaka-TA-5678", product: "12 KG", quantity: 15, marketingManager: "Sohel Rana" },
  { deliveryNo: "DEL-00042", date: "02 Jun 2025 09:30 AM", retailer: "Islam Traders", vehicle: "Dhaka-TA-5678", product: "18 KG", quantity: 10, marketingManager: "Sohel Rana" },
];

export function RecentDeliveriesTable() {
  return (
    <div className="flex flex-col rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground">
          Recent Deliveries
        </h3>
        <Link
          href="/deliveries"
          className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] dark:text-blue-500 dark:hover:text-blue-400"
        >
          View All
        </Link>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-xs font-semibold uppercase tracking-wider text-[#94A3B8] dark:border-border/50 dark:text-muted-foreground/80">
              <th className="pb-3 pr-4 font-semibold">Delivery No.</th>
              <th className="pb-3 px-4 font-semibold">Date</th>
              <th className="pb-3 px-4 font-semibold">Retailer</th>
              <th className="pb-3 px-4 font-semibold">Vehicle</th>
              <th className="pb-3 px-4 font-semibold">Product</th>
              <th className="pb-3 px-4 font-semibold">Quantity</th>
              <th className="pb-3 pl-4 font-semibold">Marketing Manager</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] dark:divide-border/50">
            {DELIVERIES.map((del) => (
              <tr
                key={del.deliveryNo}
                className="group hover:bg-[#F8FAFC]/50 dark:hover:bg-muted/20 transition-colors"
              >
                <td className="py-3.5 pr-4 font-bold text-[#0F172A] dark:text-foreground">
                  {del.deliveryNo}
                </td>
                <td className="py-3.5 px-4 font-medium text-[#64748B] dark:text-muted-foreground">
                  {del.date}
                </td>
                <td className="py-3.5 px-4 font-semibold text-[#334155] dark:text-foreground">
                  {del.retailer}
                </td>
                <td className="py-3.5 px-4 font-medium text-[#475569] dark:text-muted-foreground">
                  {del.vehicle}
                </td>
                <td className="py-3.5 px-4 font-semibold text-[#334155] dark:text-foreground">
                  {del.product}
                </td>
                <td className="py-3.5 px-4 font-bold text-[#0F172A] dark:text-foreground">
                  {del.quantity}
                </td>
                <td className="py-3.5 pl-4 font-medium text-[#64748B] dark:text-muted-foreground">
                  {del.marketingManager}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
