"use client";

import React, { useState, useEffect } from "react";
import { FiSearch, FiEye, FiEdit2, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trip } from "@/types/trip";
import { cn } from "@/lib/utils";

interface TripTableProps {
  trips: Trip[];
  onView: (trip: Trip) => void;
  onEdit: (trip: Trip) => void;
}

const CYLINDER_SIZES = ["12 KG", "15 KG", "18 KG", "22 KG", "35 KG"];

const SIZE_STYLES: Record<string, { text: string; bg: string }> = {
  "12 KG": { text: "text-[#2563EB] dark:text-blue-400", bg: "bg-[#EFF6FF] dark:bg-blue-950/20" },
  "15 KG": { text: "text-[#16A34A] dark:text-emerald-400", bg: "bg-[#F0FDF4] dark:bg-emerald-950/20" },
  "18 KG": { text: "text-[#D97706] dark:text-amber-400", bg: "bg-[#FEF3C7] dark:bg-amber-950/20" },
  "22 KG": { text: "text-[#DC2626] dark:text-red-400", bg: "bg-[#FEF2F2] dark:bg-red-950/20" },
  "35 KG": { text: "text-[#7C3AED] dark:text-violet-400", bg: "bg-[#F5F3FF] dark:bg-violet-950/20" },
};

export function TripTable({ trips, onView, onEdit }: TripTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter trips
  const filteredTrips = trips.filter((t) => {
    const query = searchQuery.toLowerCase();
    return (
      t.tripNo.toLowerCase().includes(query) ||
      t.vehicle.toLowerCase().includes(query) ||
      t.driver.toLowerCase().includes(query) ||
      t.manager.toLowerCase().includes(query) ||
      t.date.toLowerCase().includes(query) ||
      t.status.toLowerCase().includes(query)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);
  const visibleTrips = filteredTrips.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Auto-adjust current page if items shrink
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredTrips.length, totalPages, currentPage]);

  const startEntry = filteredTrips.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, filteredTrips.length);

  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-xs">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch className="h-4 w-4 text-[#94A3B8]" />
        </div>
        <input
          type="text"
          placeholder="Search trips..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="block w-full rounded-lg border border-[#E2E8F0] bg-white py-2 pl-9 pr-3 text-sm placeholder-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] text-[#334155] dark:border-border dark:bg-card dark:text-foreground font-dm-sans"
        />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-dm-sans font-semibold text-[#64748B] py-3.5">Trip No.</TableHead>
              <TableHead className="font-dm-sans font-semibold text-[#64748B] py-3.5">Vehicle</TableHead>
              <TableHead className="font-dm-sans font-semibold text-[#64748B] py-3.5">Driver</TableHead>
              <TableHead className="font-dm-sans font-semibold text-[#64748B] py-3.5">Marketing Manager</TableHead>
              <TableHead className="font-dm-sans font-semibold text-[#64748B] py-3.5">Trip Date</TableHead>
              <TableHead className="font-dm-sans font-semibold text-[#64748B] py-3.5">Loaded Inventory</TableHead>
              <TableHead className="font-dm-sans font-semibold text-[#64748B] py-3.5">Status</TableHead>
              <TableHead className="font-dm-sans font-semibold text-[#64748B] py-3.5 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleTrips.map((t) => (
              <TableRow key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-muted/10">
                <TableCell className="font-bold font-sans text-[#0F172A] dark:text-foreground py-4">
                  {t.tripNo}
                </TableCell>
                <TableCell className="font-medium font-sans text-[#334155] dark:text-slate-300 py-4">
                  {t.vehicle}
                </TableCell>
                <TableCell className="font-medium font-sans text-[#334155] dark:text-slate-300 py-4">
                  {t.driver}
                </TableCell>
                <TableCell className="font-medium font-sans text-[#334155] dark:text-slate-300 py-4">
                  {t.manager}
                </TableCell>
                <TableCell className="font-medium font-sans text-[#475569] dark:text-slate-400 py-4 whitespace-nowrap">
                  {t.date}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    {CYLINDER_SIZES.map((size) => {
                      const qty = t.cargo.find((c) => c.size === size)?.quantity ?? 0;
                      const styles = SIZE_STYLES[size];
                      return (
                        <span
                          key={size}
                          className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold font-mono whitespace-nowrap",
                            styles.bg,
                            styles.text
                          )}
                        >
                          {size}: {qty}
                        </span>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant={
                      t.status === "Completed"
                        ? "success"
                        : t.status === "Draft"
                        ? "warning"
                        : "info"
                    }
                    className="font-dm-sans"
                  >
                    {t.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center justify-center gap-x-2">
                    <button
                      onClick={() => onView(t)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-[#2563EB] dark:text-muted-foreground dark:hover:text-blue-400 cursor-pointer transition-colors"
                      title="View manifest"
                    >
                      <FiEye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onEdit(t)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-[#2563EB] dark:text-muted-foreground dark:hover:text-blue-400 cursor-pointer transition-colors"
                      title="Edit Trip"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>

              </TableRow>
            ))}
            {filteredTrips.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60 font-dm-sans"
                >
                  <span className="text-sm font-semibold">No trips found</span>
                  <p className="text-xs mt-0.5">
                    Click "+ Create Trip" at the top right to start a new trip manifest.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#F1F5F9] dark:border-border/50 font-dm-sans">
        <span className="text-sm text-[#64748B] dark:text-muted-foreground">
          Showing {startEntry} to {endEntry} of {filteredTrips.length} entries
        </span>

        {totalPages > 1 && (
          <div className="flex items-center gap-x-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-[#E2E8F0] dark:border-border hover:bg-slate-50 dark:hover:bg-muted disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer transition-colors"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "h-9 w-9 text-sm font-semibold rounded-md border transition-colors cursor-pointer",
                  currentPage === page
                    ? "bg-[#2563EB] text-white border-[#2563EB]"
                    : "border-[#E2E8F0] dark:border-border hover:bg-slate-50 dark:hover:bg-muted text-[#334155] dark:text-slate-300"
                )}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-[#E2E8F0] dark:border-border hover:bg-slate-50 dark:hover:bg-muted disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer transition-colors"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
