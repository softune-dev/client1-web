import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Transaction {
  date: string;
  type: "Receive" | "Load to Vehicle" | "Delivery" | "Return";
  product: string;
  quantity: number;
  reference: string;
}

const TRANSACTIONS: Transaction[] = [
  { date: "02 Jun 2025", type: "Receive", product: "12 KG", quantity: 500, reference: "Fresh" },
  { date: "02 Jun 2025", type: "Receive", product: "15 KG", quantity: 300, reference: "Boshundhara" },
  { date: "02 Jun 2025", type: "Load to Vehicle", product: "12 KG", quantity: 100, reference: "TRP-00012" },
  { date: "02 Jun 2025", type: "Delivery", product: "12 KG", quantity: 40, reference: "DEL-00045" },
  { date: "02 Jun 2025", type: "Return", product: "15 KG", quantity: 20, reference: "RET-00012" },
];

const TYPE_STYLES = {
  Receive: "bg-[#EBFDF5] text-[#10B981] border-[#D1FAE5] dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30",
  "Load to Vehicle": "bg-[#EFF6FF] text-[#3B82F6] border-[#DBEAFE] dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30",
  Delivery: "bg-[#FFF7ED] text-[#F97316] border-[#FFEDD5] dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900/30",
  Return: "bg-[#FAF5FF] text-[#8B5CF6] border-[#F3E8FF] dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/30",
};

export function RecentTransactions() {
  return (
    <div className="flex flex-col h-full rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground">
          Recent Stock Transactions
        </h3>
        <Link
          href="/transactions"
          className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] dark:text-blue-500 dark:hover:text-blue-400"
        >
          View All
        </Link>
      </div>

      <div className="mt-5 overflow-x-auto flex-1">
        <table className="w-full min-w-[500px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-sm font-bold tracking-tight text-black dark:border-border/50 dark:text-muted-foreground/80">
              <th className="pb-3 pr-4 font-semibold">Date</th>
              <th className="pb-3 px-4 font-semibold">Type</th>
              <th className="pb-3 px-4 font-semibold">Product</th>
              <th className="pb-3 px-4 font-semibold">Quantity</th>
              <th className="pb-3 pl-4 font-semibold">Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] dark:divide-border/50">
            {TRANSACTIONS.map((tx, idx) => (
              <tr
                key={idx}
                className="group hover:bg-[#F8FAFC]/50 dark:hover:bg-muted/20 transition-colors"
              >
                <td className="py-3.5 pr-4 font-medium text-[#64748B] dark:text-muted-foreground">
                  {tx.date}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors duration-150",
                      TYPE_STYLES[tx.type]
                    )}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-medium text-[#334155] dark:text-foreground">
                  {tx.product}
                </td>
                <td className="py-3.5 px-4 font-medium text-[#0F172A] dark:text-foreground">
                  {tx.quantity}
                </td>
                <td className="py-3.5 pl-4 font-medium text-[#64748B] dark:text-muted-foreground">
                  {tx.reference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
