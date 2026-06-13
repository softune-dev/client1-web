"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Delivery } from "@/types/delivery";

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: Delivery | null;
  onSave: (deliveryData: {
    tripNo: string;
    retailer: string;
    owner: string;
    phone: string;
    address: string;
    productSize: string;
    quantity: number;
    status: "Delivered" | "Pending";
  }) => void;
}

export function DeliveryModal({
  isOpen,
  onClose,
  delivery,
  onSave,
}: DeliveryModalProps) {
  const [formData, setFormData] = useState({
    tripNo: "TRP-00012",
    retailer: "",
    owner: "",
    phone: "",
    address: "",
    productSize: "12 KG",
    quantity: "",
    status: "Delivered" as "Delivered" | "Pending",
  });

  // Prefill form when editing or clear when adding
  useEffect(() => {
    if (isOpen) {
      if (delivery) {
        setFormData({
          tripNo: delivery.tripNo,
          retailer: delivery.retailer,
          owner: delivery.owner,
          phone: delivery.phone,
          address: delivery.address,
          productSize: delivery.productSize,
          quantity: delivery.quantity.toString(),
          status: delivery.status,
        });
      } else {
        setFormData({
          tripNo: "TRP-00012",
          retailer: "",
          owner: "",
          phone: "",
          address: "",
          productSize: "12 KG",
          quantity: "",
          status: "Delivered",
        });
      }
    }
  }, [isOpen, delivery]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRetailer = formData.retailer.trim();
    const cleanOwner = formData.owner.trim();
    const cleanPhone = formData.phone.trim();
    const cleanAddress = formData.address.trim();
    const cleanQuantity = parseInt(formData.quantity.trim()) || 0;

    if (!cleanRetailer || !cleanOwner || !cleanPhone || !cleanAddress || cleanQuantity <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    onSave({
      tripNo: formData.tripNo,
      retailer: cleanRetailer,
      owner: cleanOwner,
      phone: cleanPhone,
      address: cleanAddress,
      productSize: formData.productSize,
      quantity: cleanQuantity,
      status: formData.status,
    });
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 dark:border-border/50">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-foreground">
            {delivery ? "Edit Delivery Details" : "Record New Delivery"}
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Trip Number */}
          <div className="space-y-1">
            <select
              value={formData.tripNo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tripNo: e.target.value,
                })
              }
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            >
              <option value="TRP-00012">TRP-00012 (Karim Ahmed)</option>
              <option value="TRP-00011">TRP-00011 (Sohel Rana)</option>
              <option value="TRP-00013">TRP-00013 (Sohel Rana)</option>
            </select>
          </div>

          {/* Retailer Name */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.retailer}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  retailer: e.target.value,
                })
              }
              placeholder="Retailer Shop Name (e.g. Rafiq Store)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Owner Name */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.owner}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  owner: e.target.value,
                })
              }
              placeholder="Owner Name (e.g. Rafiqul Islam)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              placeholder="Phone Number (e.g. 01722334455)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Delivery Address */}
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
              placeholder="Delivery Address (e.g. Plot 15, Road 2, Block D, Mirpur)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Product Size */}
          <div className="space-y-1">
            <select
              value={formData.productSize}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  productSize: e.target.value,
                })
              }
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            >
              <option value="12 KG">12 KG</option>
              <option value="15 KG">15 KG</option>
              <option value="18 KG">18 KG</option>
              <option value="22 KG">22 KG</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <input
              type="text"
              required
              pattern="[0-9]*"
              inputMode="numeric"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: e.target.value.replace(/\D/g, ""),
                })
              }
              placeholder="Quantity (Cylinders)"
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
                  status: e.target.value as "Delivered" | "Pending",
                })
              }
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            >
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
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
              {delivery ? "Save Changes" : "Record Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
