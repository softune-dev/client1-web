"use client";

import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Vehicle } from "@/types/vehicle";

interface VehicleTableProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: number) => void;
}

export function VehicleTable({
  vehicles,
  onEdit,
  onDelete,
}: VehicleTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter vehicles
  const filteredVehicles = vehicles.filter((v) => {
    const query = searchQuery.toLowerCase();
    return (
      v.vehicleNumber.toLowerCase().includes(query) ||
      v.registrationNumber.toLowerCase().includes(query) ||
      `${v.capacity} Cylinders`.toLowerCase().includes(query)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const visibleVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Auto-adjust current page if items shrink
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredVehicles.length, totalPages, currentPage]);

  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      {/* Search Bar */}
      <div className="relative max-w-sm mb-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch className="h-4 w-4 text-[#94A3B8]" />
        </div>
        <input
          type="text"
          placeholder="Search vehicles..."
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
            <TableHead className="font-dm-sans">Vehicle Number</TableHead>
            <TableHead className="font-dm-sans">Registration Number</TableHead>
            <TableHead className="font-dm-sans">Capacity</TableHead>
            <TableHead className="font-dm-sans">Status</TableHead>
            <TableHead className="text-right font-dm-sans">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleVehicles.map((v, index) => {
            const rowNo = (currentPage - 1) * itemsPerPage + index + 1;
            return (
              <TableRow key={v.id}>
                <TableCell className="font-mono text-xs text-[#64748B]">
                  {rowNo}
                </TableCell>
                <TableCell className="font-medium text-[#0F172A] dark:text-foreground font-sans">
                  {v.vehicleNumber}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {v.registrationNumber}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {v.capacity} Cylinders
                </TableCell>
                <TableCell>
                  <Badge
                    variant={v.status === "Active" ? "success" : "destructive"}
                    className="font-dm-sans"
                  >
                    {v.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-x-2">
                    <button
                      onClick={() => onEdit(v)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-[#2563EB] dark:text-muted-foreground dark:hover:text-blue-400 cursor-pointer transition-colors"
                      title="Edit Vehicle"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(v.id)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-red-600 dark:text-muted-foreground dark:hover:text-red-400 cursor-pointer transition-colors"
                      title="Delete Vehicle"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {filteredVehicles.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60 font-dm-sans"
              >
                <span className="text-sm font-semibold">
                  No vehicles found
                </span>
                <p className="text-xs mt-0.5">
                  Click "Add Vehicle" at the top to add your first vehicle to the fleet.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredVehicles.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(p) => setCurrentPage(p)}
        className="font-dm-sans"
      />
    </div>
  );
}
