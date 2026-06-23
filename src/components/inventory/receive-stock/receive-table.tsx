"use client";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Receipt } from "@/types/inventory";

interface ReceiveTableProps {
  receipts: Receipt[];
}

export function ReceiveTable({ receipts }: ReceiveTableProps) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <div className="flex items-center justify-between pb-2 dark:border-border/50 mb-4 font-dm-sans">
        <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground">
          Recent Received Stock
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
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-left">Supplier</TableHead>
              <TableHead className="text-left">Type</TableHead>
              <TableHead className="text-left">Size</TableHead>
              <TableHead className="text-left">Quantity</TableHead>
              <TableHead className="text-left">Received By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receipts.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell className="text-left font-medium text-[#475569] dark:text-foreground font-sans">
                  {receipt.date}
                </TableCell>
                <TableCell className="text-left font-medium text-[#0F172A] dark:text-foreground">
                  {receipt.supplier}
                </TableCell>
                <TableCell className="text-left font-medium text-[#475569] dark:text-foreground font-sans">
                  {receipt.type}
                </TableCell>
                <TableCell className="text-left font-medium text-[#475569] dark:text-foreground font-sans">
                  {receipt.size}
                </TableCell>
                <TableCell className="text-left font-medium text-[#475569] dark:text-foreground font-sans">
                  {receipt.quantity.toLocaleString()}
                </TableCell>
                <TableCell className="text-left font-medium text-[#475569] dark:text-foreground font-sans">
                  {receipt.receivedBy}
                </TableCell>
              </TableRow>
            ))}
            {receipts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60">
                  <span className="text-sm font-semibold">No recent received stock records</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
