"use client";

import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ReturnLog } from "@/types/return";
import { cn } from "@/lib/utils";
import { Hash, Truck, User, UserCheck } from "lucide-react";

interface ReturnDetailProps {
  selectedReturn: ReturnLog;
  onReconcile: (id: number) => void;
}

export function ReturnDetail({
  selectedReturn,
  onReconcile,
}: ReturnDetailProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card space-y-6">
      {/* Details Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-4 dark:border-border/50">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-xl font-bold text-[#0F172A] dark:text-foreground font-sans">
              {selectedReturn.returnNo}
            </h2>
            <Badge
              variant={selectedReturn.status === "Pending" ? "warning" : "success"}
              className="font-dm-sans font-bold text-xs px-2.5 py-0.5"
            >
              {selectedReturn.status}
            </Badge>
          </div>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">
            Recorded on {selectedReturn.date}
          </p>
        </div>
        {selectedReturn.status === "Pending" && (
          <button
            type="button"
            onClick={() => onReconcile(selectedReturn.id)}
            className="h-9 px-4 rounded-md bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Reconcile Return
          </button>
        )}
      </div>

      {/* Trip Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-100 dark:bg-muted/10 p-4 rounded-sm text-sm font-dm-sans">
        {/* Trip No */}
        <div className="flex items-center gap-x-2.5">
          <Hash className="h-5 w-5 text-slate-400 shrink-0" />
          <div>
            <span className="block text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-dm-sans">Trip No.</span>
            <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 mt-0.5 font-sans">{selectedReturn.tripNo}</span>
          </div>
        </div>

        {/* Vehicle */}
        <div className="flex items-center gap-x-2.5">
          <Truck className="h-5 w-5 text-slate-400 shrink-0" />
          <div>
            <span className="block text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-dm-sans">Vehicle</span>
            <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 mt-0.5">{selectedReturn.vehicle}</span>
          </div>
        </div>

        {/* Driver */}
        <div className="flex items-center gap-x-2.5">
          <User className="h-5 w-5 text-slate-400 shrink-0" />
          <div>
            <span className="block text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-dm-sans">Driver</span>
            <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 mt-0.5">{selectedReturn.driver}</span>
          </div>
        </div>

        {/* Marketing Manager */}
        <div className="flex items-center gap-x-2.5">
          <UserCheck className="h-5 w-5 text-slate-400 shrink-0" />
          <div>
            <span className="block text-[11px] font-semibold text-slate-400 dark:text-slate-500 font-dm-sans">Marketing Manager</span>
            <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 mt-0.5">{selectedReturn.manager}</span>
          </div>
        </div>
      </div>

      {/* Cylinder Returns Manifest table */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold tracking-tight text-[#0F172A] dark:text-foreground">
          Returned Cylinder Manifest
        </h4>
        <div className="rounded-sm border border-[#E2E8F0] overflow-hidden dark:border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-dm-sans py-2.5">Cylinder Size</TableHead>
                <TableHead className="font-dm-sans py-2.5">Loaded Qty</TableHead>
                <TableHead className="font-dm-sans py-2.5">Delivered Qty</TableHead>
                <TableHead className="font-dm-sans py-2.5">Returned Qty</TableHead>
                <TableHead className="font-dm-sans py-2.5">Reconciliation Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedReturn.cylinders.map((cyl) => (
                <TableRow key={cyl.size}>
                  <TableCell className="font-medium text-[#0F172A] dark:text-foreground font-sans py-3">
                    {cyl.size}
                  </TableCell>
                  <TableCell className="font-semibold text-[#475569] dark:text-slate-300 font-sans py-3">
                    {cyl.loaded}
                  </TableCell>
                  <TableCell className="font-semibold text-[#475569] dark:text-slate-300 font-sans py-3">
                    {cyl.delivered}
                  </TableCell>
                  <TableCell className="font-bold text-[#2563EB] dark:text-blue-400 font-sans py-3">
                    {cyl.returnQty}
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge
                      variant={cyl.status === "Pending" ? "warning" : "success"}
                      className="font-dm-sans text-[10px]"
                    >
                      {cyl.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
