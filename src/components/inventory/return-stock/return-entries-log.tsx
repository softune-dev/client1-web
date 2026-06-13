"use client";

import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ReturnEntry } from "@/types/inventory";

interface ReturnEntriesLogProps {
  entries: ReturnEntry[];
}

export function ReturnEntriesLog({ entries }: ReturnEntriesLogProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <div className="flex items-center justify-between dark:border-border/50 mb-4 font-dm-sans">
        <h3 className="text-base font-medium tracking-tight text-[#0F172A] dark:text-foreground">
          Recent Return Entries
        </h3>
        <button
          type="button"
          className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:underline bg-transparent border-none cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Return No</TableHead>
              <TableHead className="text-left">Trip No</TableHead>
              <TableHead className="text-left">Total Returned</TableHead>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-left w-32">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="text-left font-medium text-[#0F172A] dark:text-foreground font-sans">
                  {entry.returnNo}
                </TableCell>
                <TableCell className="text-left font-medium text-[#475569] dark:text-slate-400 font-sans">
                  {entry.tripNo}
                </TableCell>
                <TableCell className="text-left font-medium text-[#475569] dark:text-slate-400 font-sans">
                  {entry.qty} Cylinders
                </TableCell>
                <TableCell className="text-left font-medium text-[#475569] dark:text-slate-400 font-sans">
                  {entry.date}
                </TableCell>
                <TableCell className="text-left">
                  <Badge className={
                    entry.status === "Pending"
                      ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-none font-bold"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-none font-bold"
                  }>
                    {entry.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {entries.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60">
                  <span className="text-sm font-semibold">No recent return stock records</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
