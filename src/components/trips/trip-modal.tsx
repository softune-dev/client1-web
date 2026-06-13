"use client";

import React, { useState, useEffect } from "react";
import { FiX, FiRefreshCw } from "react-icons/fi";
import { Trip } from "@/types/trip";

interface TripModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
  onSave: (tripData: Omit<Trip, "id"> & { id?: number }) => void;
}

const VEHICLES = ["Dhaka-TA-1234", "Dhaka-TA-5678", "Dhaka-TA-9999", "Dhaka-TA-2222"];
const DRIVERS = ["Rahim Uddin", "Jasim Uddin", "Monir Hossain", "Selim Uddin"];
const MANAGERS = ["Karim Ahmed", "Sohel Rana", "Rafiq Islam", "Mahbub Hasan"];
const STATUSES = ["Draft", "Loaded", "In Transit", "Completed"] as const;
const CYLINDER_SIZES = ["12 KG", "15 KG", "18 KG", "22 KG", "35 KG"];

export function TripModal({ isOpen, onClose, trip, onSave }: TripModalProps) {
  const [formData, setFormData] = useState({
    vehicle: VEHICLES[0],
    driver: DRIVERS[0],
    manager: MANAGERS[0],
    date: "",
    status: "Draft" as typeof STATUSES[number],
    passcode: "",
    cargo: {} as Record<string, number>,
  });

  useEffect(() => {
    if (isOpen) {
      if (trip) {
        // Pre-fill cargo map
        const cargoMap: Record<string, number> = {};
        CYLINDER_SIZES.forEach((size) => {
          cargoMap[size] = trip.cargo.find((c) => c.size === size)?.quantity ?? 0;
        });

        // Convert date e.g. "02 Jun 2025" -> "2025-06-02"
        let parsedDate = "";
        try {
          const parts = trip.date.split(" ");
          if (parts.length === 3) {
            const day = parts[0];
            const monthStr = parts[1];
            const year = parts[2];
            const months: Record<string, string> = {
              Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
              Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
            };
            const month = months[monthStr] || "01";
            parsedDate = `${year}-${month}-${day.padStart(2, "0")}`;
          }
        } catch (e) {
          parsedDate = trip.date;
        }

        setFormData({
          vehicle: trip.vehicle,
          driver: trip.driver,
          manager: trip.manager,
          date: parsedDate || new Date().toISOString().split("T")[0],
          status: trip.status,
          passcode: trip.passcode,
          cargo: cargoMap,
        });
      } else {
        const cargoMap: Record<string, number> = {};
        CYLINDER_SIZES.forEach((size) => {
          cargoMap[size] = 0;
        });

        setFormData({
          vehicle: VEHICLES[0],
          driver: DRIVERS[0],
          manager: MANAGERS[0],
          date: new Date().toISOString().split("T")[0],
          status: "Draft",
          passcode: Math.floor(1000 + Math.random() * 9000).toString(),
          cargo: cargoMap,
        });
      }
    }
  }, [isOpen, trip]);

  if (!isOpen) return null;

  const handleGeneratePasscode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setFormData((prev) => ({ ...prev, passcode: code }));
  };

  const handleCargoChange = (size: string, val: string) => {
    const qty = Math.max(parseInt(val.replace(/\D/g, "")) || 0, 0);
    setFormData((prev) => ({
      ...prev,
      cargo: {
        ...prev.cargo,
        [size]: qty,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date) {
      alert("Please select a trip date.");
      return;
    }

    if (!formData.passcode || formData.passcode.length !== 4) {
      alert("Passcode must be a 4-digit number.");
      return;
    }

    // Convert date "2025-06-02" -> "02 Jun 2025"
    let formattedDate = formData.date;
    try {
      const dateObj = new Date(formData.date);
      formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      // fallback
    }

    // Prepare cargo array
    const cargoArray = CYLINDER_SIZES.map((size) => ({
      size,
      quantity: formData.cargo[size] ?? 0,
    }));

    onSave({
      vehicle: formData.vehicle,
      driver: formData.driver,
      manager: formData.manager,
      date: formattedDate,
      status: formData.status,
      passcode: formData.passcode,
      cargo: cargoArray,
      tripNo: trip ? trip.tripNo : "", // main container will generate tripNo if adding
    });
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-lg rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 dark:border-border/50">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-foreground">
            {trip ? `Edit Trip Details - ${trip.tripNo}` : "Create New Trip"}
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Vehicle */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#64748B] dark:text-slate-300">Vehicle</label>
              <select
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold"
              >
                {VEHICLES.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            {/* Driver */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#64748B] dark:text-slate-300">Driver</label>
              <select
                value={formData.driver}
                onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold"
              >
                {DRIVERS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Marketing Manager */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#64748B] dark:text-slate-300">Marketing Manager</label>
              <select
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold"
              >
                {MANAGERS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Trip Date */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#64748B] dark:text-slate-300">Trip Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
              />
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#64748B] dark:text-slate-300">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as typeof STATUSES[number] })}
                className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Passcode */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#64748B] dark:text-slate-300">Passcode (4-digit)</label>
              <div className="flex gap-x-2">
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={formData.passcode}
                  onChange={(e) => setFormData({ ...formData, passcode: e.target.value.replace(/\D/g, "") })}
                  placeholder="Sync Code"
                  className="h-9 flex-1 rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-mono"
                />
                <button
                  type="button"
                  onClick={handleGeneratePasscode}
                  className="h-9 px-3 rounded-md bg-slate-100 dark:bg-muted hover:bg-slate-200 dark:hover:bg-muted/80 text-[#334155] dark:text-slate-300 border border-[#E2E8F0] dark:border-border text-xs font-bold transition-colors cursor-pointer flex items-center justify-center"
                >
                  <FiRefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Cylinder Cargo Load */}
          <div className="border-t border-[#F1F5F9] dark:border-border/50 pt-4">
            <h4 className="text-xs font-bold text-[#475569] uppercase tracking-wider dark:text-slate-400 mb-2">
              Allocate Cylinder Cargo
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {CYLINDER_SIZES.map((size) => (
                <div key={size} className="space-y-1">
                  <label className="text-[11px] font-bold text-[#64748B] dark:text-slate-400">{size}</label>
                  <input
                    type="text"
                    value={formData.cargo[size] ?? 0}
                    onChange={(e) => handleCargoChange(size, e.target.value)}
                    className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-2.5 text-center text-xs transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#0F172A] dark:text-foreground font-bold font-mono"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
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
              className="h-9 px-4 rounded-md bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xs font-bold transition-colors cursor-pointer"
            >
              {trip ? "Save Changes" : "Create Trip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
