"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { CylinderRow } from "@/types/inventory";

interface LoadTableProps {
  cylinders: CylinderRow[];
  onQuantityChange: (size: string, val: number) => void;
  totalQuantity: number;
}

export function LoadTable({
  cylinders,
  onQuantityChange,
  totalQuantity,
}: LoadTableProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground mb-4 font-dm-sans">
        Load Cylinder Inventory
      </h3>
      <div className="overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-[20%]">Cylinder Size</TableHead>
              <TableHead className="text-left w-[25%]">
                Warehouse Available
              </TableHead>
              <TableHead className="text-left w-[35%]">
                Quantity to Transfer
              </TableHead>
              <TableHead className="text-left w-[20%]">Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cylinders.map((cyl) => (
              <TableRow key={cyl.size}>
                <TableCell className="py-1 text-left font-medium text-[#0F172A] dark:text-foreground font-sans">
                  {cyl.size}
                </TableCell>
                <TableCell className="py-1 text-left font-medium text-[#475569] dark:text-slate-400 font-sans">
                  {cyl.available?.toLocaleString() || 0}
                </TableCell>
                <TableCell className="py-1 text-left font-sans">
                  <div className="inline-flex items-center border border-[#E2E8F0] dark:border-border rounded-md bg-white dark:bg-card overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        onQuantityChange(cyl.size, cyl.quantity - 10)
                      }
                      className="h-8 w-8 flex items-center justify-center font-bold text-[#64748B] hover:bg-slate-50 transition-colors border-r border-[#E2E8F0] dark:border-border cursor-pointer select-none"
                    >
                      —
                    </button>
                    <input
                      type="number"
                      value={cyl.quantity}
                      onChange={(e) =>
                        onQuantityChange(
                          cyl.size,
                          e.target.value === "" ? 0 : Number(e.target.value),
                        )
                      }
                      className="h-8 w-14 text-center font-semibold text-xs outline-none bg-transparent text-[#0F172A] dark:text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-sans"
                      min="0"
                      max={cyl.available}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        onQuantityChange(cyl.size, cyl.quantity + 10)
                      }
                      className="h-8 w-8 flex items-center justify-center font-bold text-[#64748B] hover:bg-slate-50 transition-colors border-l border-[#E2E8F0] dark:border-border cursor-pointer select-none"
                    >
                      +
                    </button>
                  </div>
                </TableCell>
                <TableCell className="py-1 text-left tracking-tight font-medium text-[#475569] dark:text-slate-400">
                  Cylinders
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Recalculated total */}
      <div className="flex items-center justify-between border-t border-[#F1F5F9] dark:border-border/50 pt-4 mt-4 font-sans">
        <span className="text-sm font-semibold tracking-tight text-[#0F172A] dark:text-foreground font-dm-sans">
          Total Quantity to Transfer:
        </span>
        <span className="text-lg font-bold text-[#2563EB] tracking-tight dark:text-blue-400">
          {totalQuantity.toLocaleString()} Cylinders
        </span>
      </div>
    </div>
  );
}
