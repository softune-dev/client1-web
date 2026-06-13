"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Driver } from "@/types/driver";

interface DriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
  onSave: (driverData: Omit<Driver, "id" | "onTrip"> & { id?: number; onTrip?: boolean }) => void;
}

export function DriverModal({
  isOpen,
  onClose,
  driver,
  onSave,
}: DriverModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    licenseNumber: "",
    address: "",
    status: "Active" as "Active" | "Inactive",
    onTrip: false,
  });

  // Prefill form when editing or clear when adding
  useEffect(() => {
    if (isOpen) {
      if (driver) {
        setFormData({
          name: driver.name,
          phoneNumber: driver.phoneNumber,
          licenseNumber: driver.licenseNumber,
          address: driver.address,
          status: driver.status,
          onTrip: driver.onTrip,
        });
      } else {
        setFormData({
          name: "",
          phoneNumber: "",
          licenseNumber: "",
          address: "",
          status: "Active",
          onTrip: false,
        });
      }
    }
  }, [isOpen, driver]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = formData.name.trim();
    const cleanPhone = formData.phoneNumber.trim();
    const cleanLicense = formData.licenseNumber.trim();
    const cleanAddress = formData.address.trim();

    if (!cleanName || !cleanPhone || !cleanLicense || !cleanAddress) {
      alert("Please fill all fields correctly.");
      return;
    }

    onSave({
      name: cleanName,
      phoneNumber: cleanPhone,
      licenseNumber: cleanLicense,
      address: cleanAddress,
      status: formData.status,
      onTrip: formData.onTrip,
    });
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 dark:border-border/50">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-foreground">
            {driver ? "Edit Driver Profile" : "Add New Driver"}
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Driver Name */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              placeholder="Driver Name (e.g. Rahim Uddin)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phoneNumber: e.target.value,
                })
              }
              placeholder="Phone Number (e.g. 01712345678)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* License Number */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.licenseNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  licenseNumber: e.target.value,
                })
              }
              placeholder="License Number (e.g. LIC-10021)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
              placeholder="Address (e.g. Dhaka, Bangladesh)"
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
              {driver ? "Save Changes" : "Add Driver"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
