"use client";

import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Vehicle } from "@/types/vehicle";

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
  onSave: (vehicleData: Omit<Vehicle, "id" | "onTrip"> & { id?: number; onTrip?: boolean }) => void;
}

export function VehicleModal({
  isOpen,
  onClose,
  vehicle,
  onSave,
}: VehicleModalProps) {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    registrationNumber: "",
    capacity: "",
    status: "Active" as "Active" | "Inactive",
    onTrip: false,
  });

  // Prefill form when editing or clear when adding
  useEffect(() => {
    if (isOpen) {
      if (vehicle) {
        setFormData({
          vehicleNumber: vehicle.vehicleNumber,
          registrationNumber: vehicle.registrationNumber,
          capacity: vehicle.capacity.toString(),
          status: vehicle.status,
          onTrip: vehicle.onTrip,
        });
      } else {
        setFormData({
          vehicleNumber: "",
          registrationNumber: "",
          capacity: "",
          status: "Active",
          onTrip: false,
        });
      }
    }
  }, [isOpen, vehicle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanVehicleNumber = formData.vehicleNumber.trim();
    const cleanRegNumber = formData.registrationNumber.trim();
    const cleanCapacity = parseInt(formData.capacity.trim()) || 0;

    if (!cleanVehicleNumber || !cleanRegNumber || cleanCapacity <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    onSave({
      vehicleNumber: cleanVehicleNumber,
      registrationNumber: cleanRegNumber,
      capacity: cleanCapacity,
      status: formData.status,
      onTrip: formData.onTrip,
    });
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 dark:border-border/50">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-foreground">
            {vehicle ? "Edit Vehicle Details" : "Add New Vehicle"}
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Vehicle Number */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.vehicleNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vehicleNumber: e.target.value,
                })
              }
              placeholder="Vehicle Number (e.g. Dhaka-TA-1234)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Registration Number */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.registrationNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  registrationNumber: e.target.value,
                })
              }
              placeholder="Registration Number (e.g. REG-23871)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Capacity */}
          <div className="space-y-1">
            <input
              type="text"
              required
              pattern="[0-9]*"
              inputMode="numeric"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capacity: e.target.value.replace(/\D/g, ""),
                })
              }
              placeholder="Capacity (Cylinders)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "Active" | "Inactive",
                })
              }
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Trip Status */}
          <div className="space-y-1">
            <select
              value={formData.onTrip ? "On Trip" : "Idle"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  onTrip: e.target.value === "On Trip",
                })
              }
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            >
              <option value="Idle">Idle (Not on Trip)</option>
              <option value="On Trip">On Trip</option>
            </select>
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
              {vehicle ? "Save Changes" : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
