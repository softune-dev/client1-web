"use client";

import React from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface LoadInventoryTableProps {
  cargo: Record<string, number>;
  warehouseStock: Record<string, number>;
  onCargoChange: (size: string, val: number) => void;
}

const CYLINDER_SIZES = [
  {
    size: "12 KG",
    text: "text-[#2563EB] dark:text-blue-400",
    fill: "text-[#2563EB] dark:text-blue-400",
  },
  {
    size: "15 KG",
    text: "text-[#16A34A] dark:text-emerald-400",
    fill: "text-[#16A34A] dark:text-emerald-400",
  },
  {
    size: "18 KG",
    text: "text-[#D97706] dark:text-amber-400",
    fill: "text-[#D97706] dark:text-amber-400",
  },
  {
    size: "22 KG",
    text: "text-[#DC2626] dark:text-red-400",
    fill: "text-[#DC2626] dark:text-red-400",
  },
  {
    size: "35 KG",
    text: "text-[#7C3AED] dark:text-violet-400",
    fill: "text-[#7C3AED] dark:text-violet-400",
  },
];

const CylinderIcon = ({ colorClass }: { colorClass: string }) => (
  <svg
    className={cn("h-7 w-7 shrink-0", colorClass)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8.5 6C8.5 3.8 10 2.5 12 2.5S15.5 3.8 15.5 6" />
    <path d="M8.5 6h7" />

    <path d="M10.5 6v2.5" />
    <path d="M13.5 6v2.5" />
    <path d="M9.5 8.5h5" />

    <path d="M8 11c0-1.4 1.1-2.5 2.5-2.5h3c1.4 0 2.5 1.1 2.5 2.5v7.5c0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3V11Z" />

    <path d="M8 13h8" />
    <path d="M8 16h8" />
    <path d="M9.5 21.5h5" />

    <circle cx="12" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export function LoadInventoryTable({
  cargo,
  warehouseStock,
  onCargoChange,
}: LoadInventoryTableProps) {
  const handleIncrement = (size: string, max: number) => {
    const current = cargo[size] ?? 0;
    if (current < max) {
      onCargoChange(size, current + 1);
    }
  };

  const handleDecrement = (size: string) => {
    const current = cargo[size] ?? 0;
    onCargoChange(size, Math.max(current - 1, 0));
  };

  const handleInputChange = (size: string, val: string, max: number) => {
    let num = parseInt(val.replace(/\D/g, "")) || 0;
    if (num > max) num = max;
    onCargoChange(size, Math.max(num, 0));
  };

  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground mb-4">
        Load Cylinder Inventory
      </h3>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-dm-sans font-semibold text-[#64748B] py-3">
                Cylinder Size
              </TableHead>
              <TableHead className="font-dm-sans font-semibold text-[#64748B] py-3">
                Warehouse Available
              </TableHead>
              <TableHead className="font-dm-sans font-semibold text-[#64748B] py-3">
                Quantity to Load
              </TableHead>
              <TableHead className="font-dm-sans font-semibold text-[#64748B] py-3">
                Unit
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CYLINDER_SIZES.map(({ size, text, fill }) => {
              const available = warehouseStock[size] ?? 0;
              const val = cargo[size] ?? 0;
              const isDisabled = available === 0;

              return (
                <TableRow
                  key={size}
                  className="hover:bg-slate-50/40 dark:hover:bg-muted/5"
                >
                  {/* Cylinder Size */}
                  <TableCell className="py-4">
                    <div className="flex items-center gap-x-3">
                      <CylinderIcon colorClass={fill} />
                      <span
                        className={cn(
                          "text-[15px] font-extrabold tracking-wide",
                          text,
                        )}
                      >
                        {size}
                      </span>
                    </div>
                  </TableCell>

                  {/* Warehouse Available */}
                  <TableCell className="py-4 font-bold text-sm text-[#334155] dark:text-slate-300 font-sans">
                    {available}
                  </TableCell>

                  {/* Quantity to Load */}
                  <TableCell className="py-4">
                    <div
                      className={cn(
                        "relative flex items-center w-full max-w-[120px] h-10 rounded-lg border overflow-hidden transition-colors",
                        isDisabled
                          ? "border-slate-200 bg-slate-50 dark:border-border dark:bg-muted/10"
                          : "border-[#CBD5E1] dark:border-border focus-within:border-[#2563EB]",
                      )}
                    >
                      <input
                        type="text"
                        disabled={isDisabled}
                        value={val}
                        onChange={(e) =>
                          handleInputChange(size, e.target.value, available)
                        }
                        className={cn(
                          "w-full h-full text-center text-sm font-bold bg-transparent outline-none font-mono pr-8",
                          isDisabled
                            ? "text-slate-400 cursor-not-allowed"
                            : "text-[#0F172A] dark:text-foreground",
                        )}
                      />

                      {/* Stacked Arrows */}
                      <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col border-l border-inherit divide-y divide-inherit">
                        <button
                          type="button"
                          disabled={isDisabled || val >= available}
                          onClick={() => handleIncrement(size, available)}
                          className={cn(
                            "flex-1 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-muted text-[#64748B] transition-colors",
                            isDisabled || val >= available
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer",
                          )}
                        >
                          <FiChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          disabled={isDisabled || val <= 0}
                          onClick={() => handleDecrement(size)}
                          className={cn(
                            "flex-1 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-muted text-[#64748B] transition-colors",
                            isDisabled || val <= 0
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer",
                          )}
                        >
                          <FiChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </TableCell>

                  {/* Unit */}
                  <TableCell className="py-4 font-semibold text-xs text-[#64748B] dark:text-slate-400">
                    Cylinders
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
