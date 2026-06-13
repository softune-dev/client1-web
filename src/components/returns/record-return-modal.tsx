"use client";

import React, { useState, useEffect } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ReturnLog, ReturnCylinderRow } from "@/types/return";

interface TripManifest {
  tripNo: string;
  vehicle: string;
  driver: string;
  manager: string;
  date: string;
  loaded: Record<string, number>;
  delivered: Record<string, number>;
}

const MOCK_TRIPS: TripManifest[] = [
  {
    tripNo: "TRP-00012",
    vehicle: "Dhaka-TA-1234",
    driver: "Rahim Uddin",
    manager: "Karim Ahmed",
    date: "02 Jun 2025",
    loaded: { "12 KG": 100, "15 KG": 50, "18 KG": 25, "22 KG": 20, "35 KG": 10 },
    delivered: { "12 KG": 80, "15 KG": 40, "18 KG": 20, "22 KG": 18, "35 KG": 8 },
  },
  {
    tripNo: "TRP-00011",
    vehicle: "Dhaka-TA-5678",
    driver: "Karimul Hasan",
    manager: "Monir Hossain",
    date: "02 Jun 2025",
    loaded: { "12 KG": 80, "15 KG": 40, "18 KG": 20, "22 KG": 15, "35 KG": 5 },
    delivered: { "12 KG": 70, "15 KG": 35, "18 KG": 18, "22 KG": 12, "35 KG": 3 },
  },
  {
    tripNo: "TRP-00010",
    vehicle: "Dhaka-TA-9999",
    driver: "Abul Kashem",
    manager: "Farhana Yasmin",
    date: "01 Jun 2025",
    loaded: { "12 KG": 120, "15 KG": 60, "18 KG": 30, "22 KG": 25, "35 KG": 12 },
    delivered: { "12 KG": 110, "15 KG": 55, "18 KG": 25, "22 KG": 22, "35 KG": 10 },
  },
  {
    tripNo: "TRP-00009",
    vehicle: "Dhaka-TA-2222",
    driver: "Rahim Uddin",
    manager: "Suresh Kumar",
    date: "31 May 2025",
    loaded: { "12 KG": 90, "15 KG": 45, "18 KG": 20, "22 KG": 15, "35 KG": 8 },
    delivered: { "12 KG": 85, "15 KG": 40, "18 KG": 15, "22 KG": 12, "35 KG": 6 },
  },
];

interface RecordReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: Omit<ReturnLog, "id" | "returnNo">) => void;
}

export function RecordReturnModal({
  isOpen,
  onClose,
  onConfirm,
}: RecordReturnModalProps) {
  const [selectedTripNo, setSelectedTripNo] = useState("TRP-00012");
  const [tripDetails, setTripDetails] = useState<TripManifest>(MOCK_TRIPS[0]);
  const [cylinders, setCylinders] = useState<ReturnCylinderRow[]>([]);

  // Synchronize trip manifest when trip selection changes
  useEffect(() => {
    const found = MOCK_TRIPS.find((t) => t.tripNo === selectedTripNo);
    if (found) {
      setTripDetails(found);
      const sizes = ["12 KG", "15 KG", "18 KG", "22 KG", "35 KG"];
      const rows = sizes.map((sz) => {
        const loadedVal = found.loaded[sz] || 0;
        const deliveredVal = found.delivered[sz] || 0;
        const diff = Math.max(0, loadedVal - deliveredVal);
        return {
          size: sz,
          loaded: loadedVal,
          delivered: deliveredVal,
          returnQty: diff, // default return qty
          status: "Pending" as const,
        };
      });
      setCylinders(rows);
    }
  }, [selectedTripNo, isOpen]);

  if (!isOpen) return null;

  // Handle return qty inputs
  const handleQtyChange = (size: string, val: number) => {
    setCylinders((prev) =>
      prev.map((c) => {
        if (c.size === size) {
          const maxVal = c.loaded - c.delivered;
          const newQty = Math.max(0, Math.min(maxVal, val));
          return { ...c, returnQty: newQty };
        }
        return c;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalReturned = cylinders.reduce((sum, c) => sum + c.returnQty, 0);

    onConfirm({
      tripNo: tripDetails.tripNo,
      vehicle: tripDetails.vehicle,
      driver: tripDetails.driver,
      manager: tripDetails.manager,
      date: tripDetails.date,
      totalReturned,
      status: "Pending", // Starts as pending return until fully reconciled
      cylinders,
    });
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-2xl rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 dark:border-border/50">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-foreground">
            Record Trip Return
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Select Completed Trip */}
            <div>
              <label className="text-xs font-semibold text-[#475569] dark:text-slate-400 mb-1.5 block">
                Select Completed Trip
              </label>
              <select
                value={selectedTripNo}
                onChange={(e) => setSelectedTripNo(e.target.value)}
                className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-xs font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground cursor-pointer font-sans"
              >
                {MOCK_TRIPS.map((t) => (
                  <option key={t.tripNo} value={t.tripNo}>
                    {t.tripNo}
                  </option>
                ))}
              </select>
            </div>

            {/* Readonly details */}
            <div className="bg-slate-50 dark:bg-muted/10 p-3 rounded-lg flex flex-col gap-y-1 font-medium text-[#475569] dark:text-slate-300">
              <div><span className="font-semibold text-slate-500">Vehicle:</span> {tripDetails.vehicle}</div>
              <div><span className="font-semibold text-slate-500">Driver:</span> {tripDetails.driver}</div>
              <div><span className="font-semibold text-slate-500">Manager:</span> {tripDetails.manager}</div>
            </div>
          </div>

          {/* Cylinder manifest returns */}
          <div className="max-h-60 overflow-y-auto border border-[#E2E8F0] dark:border-border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-dm-sans">Cylinder Size</TableHead>
                  <TableHead className="font-dm-sans">Loaded</TableHead>
                  <TableHead className="font-dm-sans">Delivered</TableHead>
                  <TableHead className="font-dm-sans">Return Qty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cylinders.map((cyl) => (
                  <TableRow key={cyl.size}>
                    <TableCell className="font-medium text-[#0F172A] dark:text-foreground font-sans py-2">
                      {cyl.size}
                    </TableCell>
                    <TableCell className="font-medium text-[#475569] dark:text-slate-400 font-sans py-2">
                      {cyl.loaded}
                    </TableCell>
                    <TableCell className="font-medium text-[#475569] dark:text-slate-400 font-sans py-2">
                      {cyl.delivered}
                    </TableCell>
                    <TableCell className="py-2">
                      <input
                        type="number"
                        value={cyl.returnQty}
                        onChange={(e) =>
                          handleQtyChange(
                            cyl.size,
                            e.target.value === "" ? 0 : Number(e.target.value)
                          )
                        }
                        className="h-8 w-20 px-2 border border-[#E2E8F0] dark:border-border rounded-md bg-white dark:bg-card outline-none font-semibold text-xs text-[#0F172A] dark:text-foreground focus:border-[#2563EB]"
                        min="0"
                        max={cyl.loaded - cyl.delivered}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-x-2 pt-4 border-t border-[#F1F5F9] dark:border-border/50">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded-md border border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer dark:border-border dark:text-muted-foreground dark:hover:bg-muted/30"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 px-4 rounded-md bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xs font-bold transition-colors cursor-pointer flex items-center gap-x-1.5"
            >
              <FiCheck className="size-4" />
              Save Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
