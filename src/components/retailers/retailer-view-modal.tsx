"use client";

import React from "react";
import { X, User, Phone, MapPin, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Retailer } from "@/types/retailer";

interface RetailerViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  retailer: Retailer | null;
}

export function RetailerViewModal({
  isOpen,
  onClose,
  retailer,
}: RetailerViewModalProps) {
  if (!isOpen || !retailer) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 dark:border-border/50">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-foreground">
            Retailer Details — {retailer.shopName}
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-5">
          {/* Info Header */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-muted/15 p-3.5 rounded-lg border border-[#F1F5F9] dark:border-border/50">
            <span className="text-sm font-bold text-[#0F172A] dark:text-foreground">
              {retailer.shopName}
            </span>
            <Badge
              variant={retailer.status === "Active" ? "success" : "destructive"}
              className="font-dm-sans"
            >
              {retailer.status}
            </Badge>
          </div>

          {/* Details List */}
          <div className="space-y-3.5 text-sm">
            <div className="flex items-start gap-x-2.5 text-[#334155] dark:text-muted-foreground">
              <User className="text-[#94A3B8] h-4.5 w-4.5 mt-0.5" />
              <div>
                <span className="block text-[10px] font-semibold text-[#94A3B8]">Owner Name</span>
                <span className="font-semibold text-[#0F172A] dark:text-foreground">
                  {retailer.ownerName}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-x-2.5 text-[#334155] dark:text-muted-foreground">
              <Phone className="text-[#94A3B8] h-4.5 w-4.5 mt-0.5" />
              <div>
                <span className="block text-[10px] font-semibold text-[#94A3B8]">Phone Number</span>
                <span className="font-semibold text-[#0F172A] dark:text-foreground font-sans">
                  {retailer.phoneNumber}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-x-2.5 text-[#334155] dark:text-muted-foreground">
              <MapPin className="text-[#94A3B8] h-4.5 w-4.5 mt-0.5" />
              <div>
                <span className="block text-[10px] font-semibold text-[#94A3B8]">Location</span>
                <span className="font-semibold text-[#0F172A] dark:text-foreground">
                  {retailer.location}
                </span>
                <span className="text-[10px] text-[#94A3B8] font-mono mt-0.5 block">
                  {retailer.coords}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-dashed border-[#CBD5E1] dark:border-border p-3.5 text-center bg-[#F8FAFC]/50 dark:bg-muted/5">
            <div className="flex items-center justify-center gap-x-2 text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">
              <Info className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>Authorized LPG Partner Point</span>
            </div>
          </div>


          {/* Close Action */}
          <div className="flex justify-end pt-3 border-t border-[#F1F5F9] dark:border-border/50">
            <button
              onClick={onClose}
              className="h-9 px-4 rounded-md bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xs font-bold transition-colors cursor-pointer"
            >
              Close View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
