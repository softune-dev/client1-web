import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ActiveTrip {
  tripNo: string;
  vehicle: string;
  driver: string;
  marketingManager: string;
  status: "In Transit" | "Loaded" | "Completed";
}

const TRIPS: ActiveTrip[] = [
  { tripNo: "TRP-00012", vehicle: "Dhaka-TA-1234", driver: "Rahim Uddin", marketingManager: "Karim Ahmed", status: "In Transit" },
  { tripNo: "TRP-00011", vehicle: "Dhaka-TA-5678", driver: "Jasim Uddin", marketingManager: "Sohel Rana", status: "In Transit" },
  { tripNo: "TRP-00010", vehicle: "Dhaka-TA-9999", driver: "Monir Hossain", marketingManager: "Rafiq Islam", status: "Loaded" },
  { tripNo: "TRP-00009", vehicle: "Dhaka-TA-2222", driver: "Selim Uddin", marketingManager: "Mahbub Hasan", status: "Completed" },
];

const STATUS_STYLES = {
  "In Transit": "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE] dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30",
  Loaded: "bg-[#F0FDFA] text-[#0D9488] border-[#CCFBF1] dark:bg-teal-950/30 dark:text-teal-400 dark:border-teal-900/30",
  Completed: "bg-[#EBFDF5] text-[#10B981] border-[#D1FAE5] dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30",
};

export function ActiveTripsTable() {
  return (
    <div className="flex flex-col h-full rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground">
          Active Trips
        </h3>
        <Link
          href="/trips"
          className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] dark:text-blue-500 dark:hover:text-blue-400"
        >
          View All
        </Link>
      </div>

      <div className="mt-5 overflow-x-auto flex-1">
        <table className="w-full min-w-[500px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-xs font-semibold uppercase tracking-wider text-[#94A3B8] dark:border-border/50 dark:text-muted-foreground/80">
              <th className="pb-3 pr-4 font-semibold">Trip No.</th>
              <th className="pb-3 px-4 font-semibold">Vehicle</th>
              <th className="pb-3 px-4 font-semibold">Driver</th>
              <th className="pb-3 px-4 font-semibold">Marketing Manager</th>
              <th className="pb-3 pl-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] dark:divide-border/50">
            {TRIPS.map((trip) => (
              <tr
                key={trip.tripNo}
                className="group hover:bg-[#F8FAFC]/50 dark:hover:bg-muted/20 transition-colors"
              >
                <td className="py-3.5 pr-4 font-medium text-[#0F172A] dark:text-foreground">
                  {trip.tripNo}
                </td>
                <td className="py-3.5 px-4 font-medium text-[#475569] dark:text-muted-foreground">
                  {trip.vehicle}
                </td>
                <td className="py-3.5 px-4 font-medium text-[#475569] dark:text-muted-foreground">
                  {trip.driver}
                </td>
                <td className="py-3.5 px-4 font-medium text-[#475569] dark:text-muted-foreground">
                  {trip.marketingManager}
                </td>
                <td className="py-3.5 pl-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors duration-150",
                      STATUS_STYLES[trip.status]
                    )}
                  >
                    {trip.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
