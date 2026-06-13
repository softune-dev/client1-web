"use client";

import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Search } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { MarketingManager } from "@/types/marketing-manager";

interface ManagerTableProps {
  managers: MarketingManager[];
  onEdit: (manager: MarketingManager) => void;
  onDelete: (id: number) => void;
}

export function ManagerTable({
  managers,
  onEdit,
  onDelete,
}: ManagerTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter managers
  const filteredManagers = managers.filter((m) => {
    const query = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(query) ||
      m.employeeId.toLowerCase().includes(query) ||
      m.phoneNumber.toLowerCase().includes(query) ||
      m.username.toLowerCase().includes(query) ||
      m.assignedTrip.toLowerCase().includes(query)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredManagers.length / itemsPerPage);
  const visibleManagers = filteredManagers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Auto-adjust current page if items shrink
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredManagers.length, totalPages, currentPage]);

  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      {/* Search Bar */}
      <div className="relative max-w-sm mb-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-[#94A3B8]" />
        </div>
        <input
          type="text"
          placeholder="Search marketing managers..."
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
            <TableHead className="font-dm-sans">Employee Name</TableHead>
            <TableHead className="font-dm-sans">Employee ID</TableHead>
            <TableHead className="font-dm-sans">Phone Number</TableHead>
            <TableHead className="font-dm-sans">Username</TableHead>
            <TableHead className="font-dm-sans">Assigned Trip</TableHead>
            <TableHead className="font-dm-sans">Status</TableHead>
            <TableHead className="text-right font-dm-sans">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleManagers.map((m, index) => {
            const rowNo = (currentPage - 1) * itemsPerPage + index + 1;
            return (
              <TableRow key={m.id}>
                <TableCell className="font-mono text-xs text-[#64748B]">
                  {rowNo}
                </TableCell>
                <TableCell className="font-medium text-[#0F172A] dark:text-foreground font-sans">
                  {m.name}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {m.employeeId}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {m.phoneNumber}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-foreground font-sans">
                  {m.username}
                </TableCell>
                <TableCell className="font-medium text-[#475569] dark:text-muted-foreground font-sans">
                  {m.assignedTrip}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={m.status === "Active" ? "success" : "destructive"}
                    className="font-dm-sans"
                  >
                    {m.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-x-2">
                    <button
                      onClick={() => onEdit(m)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-[#2563EB] dark:text-muted-foreground dark:hover:text-blue-400 cursor-pointer transition-colors"
                      title="Edit Manager"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(m.id)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-red-600 dark:text-muted-foreground dark:hover:text-red-400 cursor-pointer transition-colors"
                      title="Delete Manager"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {filteredManagers.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60 font-dm-sans"
              >
                <span className="text-sm font-semibold">
                  No marketing managers found
                </span>
                <p className="text-xs mt-0.5">
                  Click "Add Manager" at the top to register a new marketing manager profile.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredManagers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(p) => setCurrentPage(p)}
        className="font-dm-sans"
      />
    </div>
  );
}
