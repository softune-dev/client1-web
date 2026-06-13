"use client";

import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StockSummary } from "@/types/inventory";

interface StockTableProps {
  stockData: StockSummary[];
}

export function StockTable({ stockData }: StockTableProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">No.</TableHead>
            <TableHead className="text-left">Cylinder Size</TableHead>
            <TableHead className="text-left">Current Stock</TableHead>
            <TableHead className="text-left">Reserved for Trips</TableHead>
            <TableHead className="text-left">Available Stock</TableHead>
            <TableHead className="text-left w-32">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockData.map((item, index) => {
            const available = item.currentStock - item.reserved;
            const isLow = available <= 150;

            return (
              <TableRow key={item.size}>
                <TableCell className="font-mono text-xs text-[#64748B] text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium text-[#0F172A] dark:text-foreground text-left font-sans">
                  {item.size}
                </TableCell>
                <TableCell className="text-left font-medium text-[#475569] dark:text-foreground font-sans">
                  {item.currentStock.toLocaleString()}
                </TableCell>
                <TableCell className="text-left font-medium text-[#475569] dark:text-foreground font-sans">
                  {item.reserved.toLocaleString()}
                </TableCell>
                <TableCell className="text-left font-medium text-[#0F172A] dark:text-foreground font-sans">
                  {available.toLocaleString()}
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex justify-start">
                    <Badge variant={isLow ? "warning" : "success"}>
                      {isLow ? "Low Stock" : "In Stock"}
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {stockData.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60">
                <span className="text-sm font-semibold">No stock data matching filters</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
