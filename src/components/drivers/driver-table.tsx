"use client";

import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Search } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Driver } from "@/types/driver";

interface DriverTableProps {
  drivers: Driver[];
  onEdit: (driver: Driver) => void;
  onDelete: (id: number) => void;
}

export function DriverTable({
  drivers,
  onEdit,
  onDelete,
}: DriverTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter drivers
  const filteredDrivers = drivers.filter((d) => {
    const query = searchQuery.toLowerCase();
    return (
      d.name.toLowerCase().includes(query) ||
      d.phoneNumber.toLowerCase().includes(query) ||
      d.licenseNumber.toLowerCase().includes(query) ||
      d.address.toLowerCase().includes(query)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const visibleDrivers = filteredDrivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Auto-adjust current page if items shrink
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredDrivers.length, totalPages, currentPage]);

  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      {/* Search Bar */}
      <div className="relative max-w-sm mb-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-[#94A3B8]" />
        </div>
        <input
          type="text"
          placeholder="Search drivers..."
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
            <TableHead className="font-dm-sans">Driver Name</TableHead>
            <TableHead className="font-dm-sans">Phone Number</TableHead>
            <TableHead className="font-dm-sans">License Number</TableHead>
            <TableHead className="font-dm-sans">Address</TableHead>
            <TableHead className="font-dm-sans">Status</TableHead>
            <TableHead className="text-right font-dm-sans">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleDrivers.map((d, index) => {
            const rowNo = (currentPage - 1) * itemsPerPage + index + 1;
            return (
              <TableRow key={d.id}>
                <TableCell className="font-mono text-xs text-[#64748B]">
                  {rowNo}
                </TableCell>
                <TableCell className="font-medium text-[#0F172A] dark:text-foreground font-sans">
                  {d.name}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {d.phoneNumber}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {d.licenseNumber}
                </TableCell>
                <TableCell className="font-medium text-[#475569] dark:text-muted-foreground font-sans">
                  {d.address}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={d.status === "Active" ? "success" : "destructive"}
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
                      title="Edit Driver"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(d.id)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-red-600 dark:text-muted-foreground dark:hover:text-red-400 cursor-pointer transition-colors"
                      title="Delete Driver"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}

          {filteredDrivers.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60 font-dm-sans"
              >
                <span className="text-sm font-semibold">
                  No drivers found
                </span>
                <p className="text-xs mt-0.5">
                  Click "Add Driver" at the top to add your first driver profile.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredDrivers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(p) => setCurrentPage(p)}
        className="font-dm-sans"
      />
    </div>
  );
}
