"use client";

import React, { useState, useEffect } from "react";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Role } from "@/types/role";

interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (id: number) => void;
}

export function RoleTable({ roles, onEdit, onDelete }: RoleTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredRoles = roles.filter((r) => {
    const query = searchQuery.toLowerCase();
    return (
      r.roleName.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.status.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const visibleRoles = filteredRoles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredRoles.length, totalPages, currentPage]);

  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card space-y-4">
      {/* Search Input */}
      <div className="relative max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch className="h-4 w-4 text-[#94A3B8]" />
        </div>
        <input
          type="text"
          placeholder="Search roles..."
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
            <TableHead className="w-16 font-dm-sans">#</TableHead>
            <TableHead className="font-dm-sans">Role Name</TableHead>
            <TableHead className="font-dm-sans">Description</TableHead>
            <TableHead className="font-dm-sans">Status</TableHead>
            <TableHead className="text-right font-dm-sans">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleRoles.map((r, index) => {
            const rowNo = (currentPage - 1) * itemsPerPage + index + 1;
            return (
              <TableRow key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-muted/10">
                <TableCell className="font-mono text-xs text-[#64748B] py-4">
                  {rowNo}
                </TableCell>
                <TableCell className="font-semibold text-[#0F172A] dark:text-foreground font-sans py-4">
                  {r.roleName}
                </TableCell>
                <TableCell className="font-medium text-[#475569] dark:text-slate-300 font-sans py-4">
                  {r.description}
                </TableCell>
                <TableCell className="py-4">
                  <Badge variant={r.status === "Active" ? "success" : "destructive"} className="font-dm-sans">
                    {r.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex items-center justify-end gap-x-2">
                    <button
                      onClick={() => onEdit(r)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-[#2563EB] dark:text-muted-foreground dark:hover:text-blue-400 cursor-pointer transition-colors"
                      title="Edit Role"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(r.id)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-red-600 dark:text-muted-foreground dark:hover:text-red-400 cursor-pointer transition-colors"
                      title="Delete Role"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {filteredRoles.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60 font-dm-sans"
              >
                <span className="text-sm font-semibold">No roles found</span>
                <p className="text-xs mt-0.5">
                  Click "+ Add Role" at the top to create a new role profile.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredRoles.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(p) => setCurrentPage(p)}
        className="font-dm-sans"
      />
    </div>
  );
}
