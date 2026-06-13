"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Retailer } from "@/types/retailer";

interface RetailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  retailer: Retailer | null;
  onSave: (retailerData: Omit<Retailer, "id" | "coords"> & { id?: number; coords?: string }) => void;
}

export function RetailerModal({
  isOpen,
  onClose,
  retailer,
  onSave,
}: RetailerModalProps) {
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    phoneNumber: "",
    location: "",
    status: "Active" as "Active" | "Inactive",
  });

  // Prefill form when editing or clear when adding
  useEffect(() => {
    if (isOpen) {
      if (retailer) {
        setFormData({
          shopName: retailer.shopName,
          ownerName: retailer.ownerName,
          phoneNumber: retailer.phoneNumber,
          location: retailer.location,
          status: retailer.status,
        });
      } else {
        setFormData({
          shopName: "",
          ownerName: "",
          phoneNumber: "",
          location: "",
          status: "Active",
        });
      }
    }
  }, [isOpen, retailer]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanShop = formData.shopName.trim();
    const cleanOwner = formData.ownerName.trim();
    const cleanPhone = formData.phoneNumber.trim();
    const cleanLoc = formData.location.trim();

    if (!cleanShop || !cleanOwner || !cleanPhone || !cleanLoc) {
      alert("Please fill all fields correctly.");
      return;
    }

    onSave({
      shopName: cleanShop,
      ownerName: cleanOwner,
      phoneNumber: cleanPhone,
      location: cleanLoc,
      status: formData.status,
    });
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 dark:border-border/50">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-foreground">
            {retailer ? "Edit Retailer Profile" : "Add New Retailer"}
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>


        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Shop Name */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.shopName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shopName: e.target.value,
                })
              }
              placeholder="Shop Name (e.g. Rafiq Store)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Owner Name */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.ownerName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ownerName: e.target.value,
                })
              }
              placeholder="Owner Name (e.g. Rafiq Ahmed)"
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
              placeholder="Phone Number (e.g. 01712-345678)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Location */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              placeholder="Location (e.g. Mirpur, Dhaka)"
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
              {retailer ? "Save Changes" : "Add Retailer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
