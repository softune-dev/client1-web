"use client";

import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CylinderRow } from "@/types/inventory";

interface ReturnTableProps {
  cylinders: CylinderRow[];
  onQuantityChange: (size: string, val: number) => void;
  totalLoaded: number;
  totalDelivered: number;
  totalQuantity: number;
}

export function ReturnTable({
  cylinders,
  onQuantityChange,
  totalLoaded,
  totalDelivered,
  totalQuantity,
}: ReturnTableProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <h3 className="text-base font-medium tracking-tight text-[#0F172A] dark:text-foreground mb-4 font-dm-sans">
        Returned Cylinder Inventory
      </h3>
      <div className="overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-[20%]">Cylinder Size</TableHead>
              <TableHead className="text-left w-[20%]">Loaded</TableHead>
              <TableHead className="text-left w-[20%]">Delivered</TableHead>
              <TableHead className="text-left w-[20%]">
                <div className="flex items-center gap-x-1">
                  <span>Return Quantity</span>
                  <svg className="size-3.5 text-[#94A3B8] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </div>
              </TableHead>
              <TableHead className="text-left w-[20%]">Reconciled Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cylinders.map((cyl) => {
              const maxVal = (cyl.loaded || 0) - (cyl.delivered || 0);
              return (
                <TableRow key={cyl.size}>
                  <TableCell className="py-4 text-left font-medium text-[#0F172A] dark:text-foreground font-sans">
                    {cyl.size}
                  </TableCell>
                  <TableCell className="py-4 text-left font-medium text-[#475569] dark:text-slate-400 font-sans">
                    {cyl.loaded?.toLocaleString() || 0}
                  </TableCell>
                  <TableCell className="py-4 text-left font-medium text-[#475569] dark:text-slate-400 font-sans">
                    {cyl.delivered?.toLocaleString() || 0}
                  </TableCell>
                  <TableCell className="py-4 text-left font-sans">
                    <input
                      type="number"
                      value={cyl.quantity}
                      onChange={(e) =>
                        onQuantityChange(
                          cyl.size,
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                      className="h-8 w-16 text-left px-2 border border-[#E2E8F0] dark:border-border rounded-md bg-white dark:bg-card outline-none font-semibold text-xs text-[#0F172A] dark:text-foreground focus:border-[#2563EB]"
                      min="0"
                      max={maxVal}
                    />
                  </TableCell>
                  <TableCell className="py-4 text-left">
                    <Badge className={
                      cyl.status === "Pending"
                        ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-none font-bold"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-none font-bold"
                    }>
                      {cyl.status || "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}

            {/* Total Summary Row */}
            {cylinders.length > 0 && (
              <TableRow className="bg-slate-50/50 dark:bg-muted/10 font-bold">
                <TableCell className="py-4 text-left text-black dark:text-foreground">
                  Total
                </TableCell>
                <TableCell className="py-4 text-left text-[#475569] dark:text-slate-400 font-sans">
                  {totalLoaded.toLocaleString()}
                </TableCell>
                <TableCell className="py-4 text-left text-[#475569] dark:text-slate-400 font-sans">
                  {totalDelivered.toLocaleString()}
                </TableCell>
                <TableCell className="py-4 text-left text-[#2563EB] dark:text-blue-400 font-sans">
                  {totalQuantity.toLocaleString()}
                </TableCell>
                <TableCell className="py-4 text-left">
                  {/* Blank reconciled status cell */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
