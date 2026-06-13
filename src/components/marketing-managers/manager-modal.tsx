"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { MarketingManager } from "@/types/marketing-manager";

interface ManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  manager: MarketingManager | null;
  onSave: (managerData: Omit<MarketingManager, "id"> & { id?: number }) => void;
}

export function ManagerModal({
  isOpen,
  onClose,
  manager,
  onSave,
}: ManagerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    phoneNumber: "",
    username: "",
    assignedTrip: "Not Assigned",
    status: "Active" as "Active" | "Inactive",
  });

  // Prefill form when editing or clear when adding
  useEffect(() => {
    if (isOpen) {
      if (manager) {
        setFormData({
          name: manager.name,
          employeeId: manager.employeeId,
          phoneNumber: manager.phoneNumber,
          username: manager.username,
          assignedTrip: manager.assignedTrip,
          status: manager.status,
        });
      } else {
        setFormData({
          name: "",
          employeeId: "",
          phoneNumber: "",
          username: "",
          assignedTrip: "Not Assigned",
          status: "Active",
        });
      }
    }
  }, [isOpen, manager]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = formData.name.trim();
    const cleanEmpId = formData.employeeId.trim();
    const cleanPhone = formData.phoneNumber.trim();
    const cleanUsername = formData.username.trim();
    const cleanTrip = formData.assignedTrip.trim() || "Not Assigned";

    if (!cleanName || !cleanEmpId || !cleanPhone || !cleanUsername) {
      alert("Please fill all fields correctly.");
      return;
    }

    onSave({
      name: cleanName,
      employeeId: cleanEmpId,
      phoneNumber: cleanPhone,
      username: cleanUsername,
      assignedTrip: cleanTrip,
      status: formData.status,
    });
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 dark:border-border/50">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-foreground">
            {manager ? "Edit Manager Profile" : "Add New Manager"}
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Employee Name */}
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
              placeholder="Employee Name (e.g. Karim Ahmed)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Employee ID */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.employeeId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employeeId: e.target.value,
                })
              }
              placeholder="Employee ID (e.g. MM-1001)"
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
              placeholder="Phone Number (e.g. 01722334455)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Username */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
              placeholder="Username (e.g. karim.ahmed)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Assigned Trip */}
          <div className="space-y-1">
            <input
              type="text"
              value={formData.assignedTrip}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  assignedTrip: e.target.value,
                })
              }
              placeholder="Assigned Trip (e.g. TRP-00012 or Not Assigned)"
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
              {manager ? "Save Changes" : "Add Manager"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
