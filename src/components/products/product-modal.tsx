"use client";

import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Product } from "@/types/product";

const PRODUCT_NAMES = ["Standard LPG", "Commercial LPG", "Industrial LPG"];

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (productData: Omit<Product, "id" | "sales"> & { id?: number }) => void;
}

export function ProductModal({
  isOpen,
  onClose,
  product,
  onSave,
}: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: "Standard LPG",
    size: "",
    status: "Active" as "Active" | "Inactive",
  });

  // Pre-fill form when editing or clear form when adding
  useEffect(() => {
    if (isOpen) {
      if (product) {
        // Strip " KG" suffix so the user only sees and edits the numeric part
        const numericSize = product.size.replace(/\s*KG\s*/gi, "");
        setFormData({
          name: product.name,
          size: numericSize,
          status: product.status,
        });
      } else {
        setFormData({
          name: "Standard LPG",
          size: "",
          status: "Active",
        });
      }
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure size format is always consistently stored as X KG
    const cleanSize = formData.size.trim();
    const formattedSize = /^\d+$/.test(cleanSize)
      ? `${cleanSize} KG`
      : cleanSize;

    onSave({
      name: formData.name,
      size: formattedSize,
      status: formData.status,
    });
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 dark:border-border/50">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-foreground">
            {product ? "Edit Product Size" : "Add New Product"}
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Product Type Selection */}
          <div className="space-y-1">
            <select
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground"
            >
              {PRODUCT_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Cylinder Size Input */}
          <div className="space-y-1">
            <input
              type="text"
              required
              pattern="[0-9]*"
              inputMode="numeric"
              value={formData.size}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  size: e.target.value.replace(/\D/g, ""),
                })
              }
              placeholder="Cylinder Size (KG)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-sans"
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
              {product ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
