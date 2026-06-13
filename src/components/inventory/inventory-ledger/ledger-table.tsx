"use client";

import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LedgerEntry } from "@/types/inventory";

interface LedgerTableProps {
  filteredLedger: LedgerEntry[];
}

export function LedgerTable({ filteredLedger }: LedgerTableProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground mb-4 font-dm-sans">
        Inventory Ledger Entries
      </h3>
      <div className="overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Date & Time</TableHead>
              <TableHead className="text-left">Reference No.</TableHead>
              <TableHead className="text-left">Transaction Type</TableHead>
              <TableHead className="text-left">Product Size</TableHead>
              <TableHead className="text-left">Quantity</TableHead>
              <TableHead className="text-left">Source / Destination</TableHead>
              <TableHead className="text-left">Performed By</TableHead>
              <TableHead className="text-left">Balance After Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLedger.map((entry) => {
              const isPositive = entry.quantity > 0;
              
              // Color selection for transaction type badge
              let badgeClass = "";
              if (entry.type === "Received") {
                badgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-none font-bold";
              } else if (entry.type === "Transfer") {
                badgeClass = "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-none font-bold";
              } else {
                badgeClass = "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-none font-bold";
              }

              return (
                <TableRow key={entry.id}>
                  <TableCell className="py-4 text-left font-medium text-[#475569] dark:text-slate-400 font-sans">
                    {entry.dateTime}
                  </TableCell>
                  <TableCell className="py-4 text-left font-medium text-[#0F172A] dark:text-foreground font-sans">
                    {entry.referenceNo}
                  </TableCell>
                  <TableCell className="py-4 text-left">
                    <Badge className={badgeClass}>{entry.type}</Badge>
                  </TableCell>
                  <TableCell className="py-4 text-left font-medium text-[#475569] dark:text-slate-400 font-sans">
                    {entry.size}
                  </TableCell>
                  <TableCell className={`py-4 text-left font-bold font-sans ${isPositive ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                    {isPositive ? `+${entry.quantity}` : entry.quantity}
                  </TableCell>
                  <TableCell className="py-4 text-left font-medium text-[#475569] dark:text-slate-400">
                    {entry.sourceDestination}
                  </TableCell>
                  <TableCell className="py-4 text-left font-medium text-[#475569] dark:text-slate-400 font-sans">
                    {entry.performedBy}
                  </TableCell>
                  <TableCell className="py-4 text-left font-medium text-[#0F172A] dark:text-foreground font-sans">
                    {entry.balance.toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredLedger.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60">
                  <span className="text-sm font-semibold">No ledger entries matching filters</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
