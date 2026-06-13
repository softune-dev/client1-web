"use client";

import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Search } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Delivery } from "@/types/delivery";
import { cn } from "@/lib/utils";

interface DeliveryTableProps {
  deliveries: Delivery[];
  onEdit: (delivery: Delivery) => void;
  onDelete: (id: number) => void;
}

export function DeliveryTable({
  deliveries,
  onEdit,
  onDelete,
}: DeliveryTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter deliveries
  const filteredDeliveries = deliveries.filter((d) => {
    const query = searchQuery.toLowerCase();
    return (
      d.deliveryNo.toLowerCase().includes(query) ||
      d.tripNo.toLowerCase().includes(query) ||
      d.retailer.toLowerCase().includes(query) ||
      d.manager.toLowerCase().includes(query)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);
  const visibleDeliveries = filteredDeliveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Auto page correction
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredDeliveries.length, totalPages, currentPage]);

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
      {/* Search Bar */}
      <div className="relative max-w-sm mb-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-[#94A3B8]" />
        </div>
        <input
          type="text"
          placeholder="Search deliveries..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="block w-full rounded-lg border border-[#E2E8F0] bg-white py-2 pl-9 pr-3 text-sm placeholder-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] text-[#334155] dark:border-border dark:bg-card dark:text-foreground font-dm-sans"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 font-dm-sans">No.</TableHead>
            <TableHead className="font-dm-sans">Delivery No</TableHead>
            <TableHead className="font-dm-sans">Trip No</TableHead>
            <TableHead className="font-dm-sans">Retailer</TableHead>
            <TableHead className="font-dm-sans">Manager</TableHead>
            <TableHead className="font-dm-sans">Quantity</TableHead>
            <TableHead className="font-dm-sans">Size</TableHead>
            <TableHead className="font-dm-sans">Status</TableHead>
            <TableHead className="text-right font-dm-sans">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleDeliveries.map((d, index) => {
            const rowNo = (currentPage - 1) * itemsPerPage + index + 1;
            return (
              <TableRow key={d.id}>
                <TableCell className="font-mono text-xs text-[#64748B]">
                  {rowNo}
                </TableCell>
                <TableCell className="font-bold text-[#0F172A] dark:text-foreground font-sans">
                  {d.deliveryNo}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {d.tripNo}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {d.retailer}
                </TableCell>
                <TableCell className="font-medium text-[#475569] dark:text-muted-foreground font-sans">
                  {d.manager}
                </TableCell>
                <TableCell className="font-bold text-[#0F172A] dark:text-foreground font-sans">
                  {d.quantity}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn("font-dm-sans font-semibold border-transparent", getSizeBadgeClass(d.productSize))}
                  >
                    {d.productSize}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={d.status === "Delivered" ? "success" : "destructive"}
                    className="font-dm-sans"
                  >
                    {d.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-x-2">
                    <button
                      onClick={() => onEdit(d)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-[#2563EB] dark:text-muted-foreground dark:hover:text-blue-400 cursor-pointer transition-colors"
                      title="Edit Log"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(d.id)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-red-600 dark:text-muted-foreground dark:hover:text-red-400 cursor-pointer transition-colors"
                      title="Delete Log"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {filteredDeliveries.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={10}
                className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60 font-dm-sans"
              >
                <span className="text-sm font-semibold">
                  No deliveries found
                </span>
                <p className="text-xs mt-0.5">
                  Click "Record Delivery" at the top to log a new delivery entry.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredDeliveries.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(p) => setCurrentPage(p)}
        className="font-dm-sans"
      />
    </div>
  );
}
