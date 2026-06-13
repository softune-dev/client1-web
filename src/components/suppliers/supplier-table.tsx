"use client";

import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Supplier } from "@/types/supplier";

interface SupplierTableProps {
  suppliers: Supplier[];
  currentPage: number;
  itemsPerPage: number;
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
  onPageChange: (page: number) => void;
}

export function SupplierTable({
  suppliers,
  currentPage,
  itemsPerPage,
  onEdit,
  onDelete,
  onPageChange,
}: SupplierTableProps) {
  // Helpers for Logo Placeholder
  const getSupplierInitial = (name: string) => name.charAt(0).toUpperCase();
  
  const getSupplierColor = (id: number) => {
    const colors = [
      "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      "bg-purple-500/10 text-purple-500 border-purple-500/20",
      "bg-amber-500/10 text-amber-500 border-amber-500/20",
      "bg-rose-500/10 text-rose-500 border-rose-500/20",
    ];
    return colors[id % colors.length];
  };

  // Pagination Logic
  const totalPages = Math.ceil(suppliers.length / itemsPerPage);
  const visibleSuppliers = suppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead className="w-16"></TableHead>
            <TableHead>Supplier Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleSuppliers.map((s, index) => {
            const rowNo = (currentPage - 1) * itemsPerPage + index + 1;
            return (
              <TableRow key={s.id}>
                <TableCell className="font-mono text-xs text-[#64748B]">
                  {rowNo}
                </TableCell>
                <TableCell>
                  {s.logo ? (
                    <div className="h-8 w-8 rounded-full border border-white/10 overflow-hidden shrink-0">
                      <img
                        src={s.logo}
                        alt={s.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={cn(
                      "h-8 w-8 rounded-full border flex items-center justify-center font-bold text-xs shrink-0",
                      getSupplierColor(s.id)
                    )}>
                      {getSupplierInitial(s.name)}
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-[#0F172A] dark:text-foreground">
                  {s.name}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground">
                  {s.contactPerson}
                </TableCell>
                <TableCell className="font-medium text-[#475569] dark:text-muted-foreground font-sans">
                  {s.phoneNumber}
                </TableCell>
                <TableCell className="max-w-[180px] truncate font-medium text-[#64748B] dark:text-muted-foreground">
                  {s.address}
                </TableCell>
                <TableCell>
                  <Badge variant={s.status === "Active" ? "success" : "destructive"}>
                    {s.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-x-2">
                    <button
                      onClick={() => onEdit(s)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-[#2563EB] dark:text-muted-foreground dark:hover:text-blue-400 cursor-pointer transition-colors"
                      title="Edit Supplier"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(s.id)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-red-600 dark:text-muted-foreground dark:hover:text-red-400 cursor-pointer transition-colors"
                      title="Delete Supplier"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {suppliers.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60">
                <span className="text-sm font-semibold">No suppliers found</span>
                <p className="text-xs mt-0.5">Click "Add Supplier" at the top to add your first supplier.</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={suppliers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
