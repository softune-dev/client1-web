"use client";

import React, { useState, useEffect } from "react";
import { FiCamera, FiUpload, FiX } from "react-icons/fi";
import { Supplier } from "@/types/supplier";
import { Save } from "lucide-react";

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier | null;
  onSave: (supplierData: Omit<Supplier, "id"> & { id?: number }) => void;
}

export function SupplierModal({
  isOpen,
  onClose,
  supplier,
  onSave,
}: SupplierModalProps) {
  const [logoPreview, setLogoPreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    phoneNumber: "",
    address: "",
    status: "Active" as "Active" | "Inactive",
  });

  // Pre-fill form when editing or clear form when adding
  useEffect(() => {
    if (isOpen) {
      if (supplier) {
        setFormData({
          name: supplier.name,
          contactPerson: supplier.contactPerson,
          phoneNumber: supplier.phoneNumber,
          address: supplier.address,
          status: supplier.status,
        });
        setLogoPreview(supplier.logo || "");
      } else {
        setFormData({
          name: "",
          contactPerson: "",
          phoneNumber: "",
          address: "",
          status: "Active",
        });
        setLogoPreview("");
      }
    }
  }, [isOpen, supplier]);

  if (!isOpen) return null;

  // Handle Logo Upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      logo: logoPreview,
    });
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-md rounded-md border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between pb-2 dark:border-border/50">
          <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground">
            {supplier ? "Edit Supplier" : "Add New Supplier"}
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Logo Uploader */}
          <div className="flex flex-col items-center gap-y-2">
            <div className="relative group cursor-pointer size-16 rounded-full border-2 border-dashed border-[#CBD5E1] dark:border-border flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-muted/10 hover:bg-slate-100 transition-colors">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Preview"
                  className="size-full object-cover"
                />
              ) : (
                <FiCamera className="h-5 w-5 text-[#94A3B8]" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {logoPreview && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FiUpload className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <span className="text-xs text-[#94A3B8]">
              Click to upload logo image
            </span>
          </div>

          {/* Supplier Name */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Supplier Name"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground"
            />
          </div>

          {/* Contact Person */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.contactPerson}
              onChange={(e) =>
                setFormData({ ...formData, contactPerson: e.target.value })
              }
              placeholder="Contact Person"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              placeholder="Phone Number"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-sans"
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Address"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground"
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#64748B] dark:text-muted-foreground">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "Active" | "Inactive",
                })
              }
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-x-2 pt-2 dark:border-border/50">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded-sm border border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 text-sm font-bold transition-colors cursor-pointer dark:border-border dark:text-muted-foreground dark:hover:bg-muted/30"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 px-4 rounded-sm bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-sm transition-colors cursor-pointer"
            >
              {supplier ? "Save Changes" : "Add Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
