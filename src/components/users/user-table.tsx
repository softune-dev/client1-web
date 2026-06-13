"use client";

import React, { useState, useEffect } from "react";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
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
import { User } from "@/types/user";
import { cn } from "@/lib/utils";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    return (
      u.fullName.toLowerCase().includes(query) ||
      u.username.toLowerCase().includes(query) ||
      u.role.toLowerCase().includes(query) ||
      u.phoneNumber.toLowerCase().includes(query) ||
      u.status.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const visibleUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredUsers.length, totalPages, currentPage]);

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "bg-[#F5F3FF] text-[#7C3AED] border-[#E9D5FF] dark:bg-violet-950/20 dark:text-violet-400 dark:border-none font-bold";
      case "Warehouse Manager":
        return "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE] dark:bg-blue-950/20 dark:text-blue-400 dark:border-none font-bold";
      case "Marketing Manager":
        return "bg-[#F0FDF4] text-[#16A34A] border-[#D1FAE5] dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-none font-bold";
      case "Manager":
        return "bg-[#FFF8ED] text-[#D97706] border-[#FED7AA] dark:bg-amber-950/20 dark:text-amber-400 dark:border-none font-bold";
      default: // Operator
        return "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] dark:bg-muted dark:text-muted-foreground dark:border-none font-bold";
    }
  };

  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card space-y-4">
      {/* Search Input */}
      <div className="relative max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch className="h-4 w-4 text-[#94A3B8]" />
        </div>
        <input
          type="text"
          placeholder="Search users..."
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
            <TableHead className="font-dm-sans">Full Name</TableHead>
            <TableHead className="font-dm-sans">Username</TableHead>
            <TableHead className="font-dm-sans">Role</TableHead>
            <TableHead className="font-dm-sans">Phone Number</TableHead>
            <TableHead className="font-dm-sans">Status</TableHead>
            <TableHead className="text-right font-dm-sans">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleUsers.map((u, index) => {
            const rowNo = (currentPage - 1) * itemsPerPage + index + 1;
            return (
              <TableRow
                key={u.id}
                className="hover:bg-slate-50/50 dark:hover:bg-muted/10"
              >
                <TableCell className="font-mono text-xs text-[#64748B] py-4">
                  {rowNo}
                </TableCell>
                <TableCell className="font-semibold text-[#0F172A] dark:text-foreground font-sans py-4">
                  {u.fullName}
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-slate-300 font-sans py-4">
                  {u.username}
                </TableCell>
                <TableCell className="py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded px-2.5 py-0.5 text-xs border font-dm-sans",
                      getRoleBadgeClass(u.role),
                    )}
                  >
                    {u.role}
                  </span>
                </TableCell>
                <TableCell className="font-medium text-[#334155] dark:text-slate-300 font-sans py-4">
                  {u.phoneNumber}
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant={u.status === "Active" ? "success" : "destructive"}
                    className="font-dm-sans"
                  >
                    {u.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex items-center justify-end gap-x-2">
                    <button
                      onClick={() => onEdit(u)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-[#2563EB] dark:text-muted-foreground dark:hover:text-blue-400 cursor-pointer transition-colors"
                      title="Edit User"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(u.id)}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-muted text-[#475569] hover:text-red-600 dark:text-muted-foreground dark:hover:text-red-400 cursor-pointer transition-colors"
                      title="Delete User"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {filteredUsers.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-12 text-center text-[#94A3B8] dark:text-muted-foreground/60 font-dm-sans"
              >
                <span className="text-sm font-semibold">No users found</span>
                <p className="text-xs mt-0.5">
                  Click "+ Add User" at the top to register a new user profile.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredUsers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(p) => setCurrentPage(p)}
        className="font-dm-sans"
      />
    </div>
  );
}
