"use client";

import React from "react";
import { Info } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ReportEntry } from "@/types/report";

interface ReportTableProps {
  visibleData: ReportEntry[];
  filteredCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (p: number) => void;
}

export function ReportTable({
  visibleData,
  filteredCount,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
}: ReportTableProps) {
  const getSizeBadgeClass = (size: string) => {
    if (size.includes("12")) {
      return "bg-[#EFF6FF] text-[#2563EB] border-transparent dark:bg-blue-950/20 dark:text-blue-400";
    } else if (size.includes("15")) {
      return "bg-[#ECFDF5] text-[#10B981] border-transparent dark:bg-emerald-950/20 dark:text-emerald-400";
    } else if (size.includes("18")) {
      return "bg-[#FFF7ED] text-[#F97316] border-transparent dark:bg-orange-950/20 dark:text-orange-400";
    } else {
      return "bg-[#FAF5FF] text-[#A855F7] border-transparent dark:bg-purple-950/20 dark:text-purple-400";
    }
  };

  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      {/* Table Title and Status Info */}
      <div className="flex items-center justify-between pb-2 dark:border-border/50">
        <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground font-dm-sans">
          Inventory Report Summary
        </h3>
        <div className="flex items-center gap-x-2 bg-slate-50 border border-[#E2E8F0] px-3 py-1.5 rounded-sm text-[#64748B] dark:bg-muted/15 dark:border-border/50">
          <Info className="h-4 w-4 text-[#2563EB]" />
          <span className="text-xs font-semibold font-dm-sans">Updated Today</span>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-dm-sans w-32">Cylinder Size</TableHead>
            <TableHead className="font-dm-sans">Opening</TableHead>
            <TableHead className="font-dm-sans">Received</TableHead>
            <TableHead className="font-dm-sans">Distributed</TableHead>
            <TableHead className="font-dm-sans">Returned</TableHead>
            <TableHead className="font-dm-sans">Closing</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleData.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell>
                  <Badge
                    className={cn("font-dm-sans font-semibold border-transparent", getSizeBadgeClass(row.size))}
                  >
                    {row.size}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {row.opening.toLocaleString()}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {row.received.toLocaleString()}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {row.distributed.toLocaleString()}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {row.returned.toLocaleString()}
                </TableCell>
                <TableCell className="font-bold text-[#0F172A] dark:text-foreground font-sans">
                  {row.closing.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
          {visibleData.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60 font-dm-sans"
              >
                <span className="text-sm font-semibold">
                  No report records matching criteria
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredCount}
        itemsPerPage={itemsPerPage}
        onPageChange={(p) => onPageChange(p)}
        className="font-dm-sans"
      />
    </div>
  );
}

