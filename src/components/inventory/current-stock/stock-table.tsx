"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { StockSummary } from "@/types/inventory";

interface StockTableProps {
  stockData: StockSummary[];
}

export function StockTable({ stockData }: StockTableProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white dark:border-border dark:bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              colSpan={5}
              className={`text-center text-xl font-bold text-white ${
                stockData[0].company === "BASHUNDHARA"
                  ? "bg-red-600"
                  : stockData[0].company === "TOTAL"
                    ? "bg-orange-600"
                    : stockData[0].company === "FRESH"
                      ? "bg-blue-600"
                      : "bg-white"
              }`}
            >
              {stockData[0].company}
            </TableHead>
          </TableRow>

          {/* Column headers */}
          <TableRow>
            <TableHead className="text-center">No.</TableHead>
            <TableHead className="text-center">Size</TableHead>
            <TableHead className="text-center">Package</TableHead>
            
            <TableHead className="text-center">Empty Cylinder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockData.map((item, index) => {
            return (
              <TableRow key={item.size}>
                <TableCell className="w-16 font-mono text-xs text-[#64748B] text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium text-[#0F172A] dark:text-foreground text-center font-sans">
                  {item.size}
                </TableCell>
                <TableCell className="text-center font-medium text-[#475569] dark:text-foreground font-sans">
                  {item.package.toLocaleString()}
                </TableCell>
                <TableCell className="text-center font-medium text-[#0F172A] dark:text-foreground font-sans">
                  {item.emptyCylinder.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
          {stockData.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60"
              >
                <span className="text-sm font-semibold">
                  No stock data matching filters
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
