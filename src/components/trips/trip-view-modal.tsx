"use client";

import React from "react";
import { FiX, FiTruck, FiUser, FiFileText, FiCheckCircle, FiPlay, FiClock } from "react-icons/fi";
import { Trip } from "@/types/trip";
import { cn } from "@/lib/utils";

interface TripViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
}

export function TripViewModal({ isOpen, onClose, trip }: TripViewModalProps) {
  if (!isOpen || !trip) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 dark:border-border/50">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-foreground">
            Trip Manifest & Crew
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6">
          {/* Manifest Summary */}
          <div className="rounded-lg border border-[#F1F5F9] bg-[#F8FAFC] p-4 dark:border-border/50 dark:bg-muted/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#2563EB] dark:text-blue-400">
                {trip.tripNo}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-x-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border",
                  trip.status === "Completed" && "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-none",
                  (trip.status === "Loaded" || trip.status === "In Transit") && "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-none",
                  trip.status === "Draft" && "bg-slate-50 text-slate-600 border-slate-100 dark:bg-muted dark:text-muted-foreground dark:border-none"
                )}
              >
                {trip.status === "Completed" && <FiCheckCircle className="h-3 w-3" />}
                {(trip.status === "Loaded" || trip.status === "In Transit") && <FiPlay className="h-3 w-3 animate-pulse" />}
                {trip.status === "Draft" && <FiClock className="h-3 w-3" />}
                {trip.status}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F172A] dark:text-foreground">
                Trip manifest log
              </h4>
              <p className="text-xs text-[#64748B] dark:text-muted-foreground mt-0.5 font-sans">
                Scheduled for {trip.date}
              </p>
            </div>
          </div>

          {/* Crew Assignment */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#475569] uppercase tracking-wider dark:text-muted-foreground border-b border-[#F1F5F9] pb-2 dark:border-border/50">
              Logistics Crew
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-x-2.5 text-[#334155] dark:text-muted-foreground">
                <FiTruck className="text-[#94A3B8] h-4 w-4 shrink-0" />
                <div>
                  <span className="block text-[10px] font-semibold text-[#94A3B8]">Delivery Truck</span>
                  <span className="font-semibold">{trip.vehicle}</span>
                </div>
              </div>

              <div className="flex items-center gap-x-2.5 text-[#334155] dark:text-muted-foreground">
                <FiUser className="text-[#94A3B8] h-4 w-4 shrink-0" />
                <div>
                  <span className="block text-[10px] font-semibold text-[#94A3B8]">Assigned Driver</span>
                  <span className="font-semibold">{trip.driver}</span>
                </div>
              </div>

              <div className="flex items-center gap-x-2.5 text-[#334155] dark:text-muted-foreground">
                <FiUser className="text-[#94A3B8] h-4 w-4 shrink-0" />
                <div>
                  <span className="block text-[10px] font-semibold text-[#94A3B8]">Marketing Manager</span>
                  <span className="font-semibold">{trip.manager}</span>
                </div>
              </div>

              <div className="flex items-center gap-x-2.5 text-[#334155] dark:text-muted-foreground">
                <FiFileText className="text-[#94A3B8] h-4 w-4 shrink-0" />
                <div>
                  <span className="block text-[10px] font-semibold text-[#94A3B8]">Mobile App Passcode</span>
                  <span className="font-mono font-bold text-[#2563EB] dark:text-blue-400">{trip.passcode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Loaded Cargo */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#475569] uppercase tracking-wider dark:text-muted-foreground border-b border-[#F1F5F9] pb-2 dark:border-border/50">
              Cylinder Cargo Load
            </h4>

            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
              {trip.cargo.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#F8FAFC] dark:bg-muted/10 p-2.5 rounded-lg border border-[#F1F5F9] dark:border-border/50 text-xs"
                >
                  <span className="font-bold text-[#64748B] dark:text-muted-foreground">{item.size} Cylinder</span>
                  <span className="font-extrabold text-[#0F172A] dark:text-foreground font-mono">{item.quantity} units</span>
                </div>
              ))}
              {trip.cargo.length === 0 && (
                <p className="text-xs text-[#94A3B8] text-center py-4">No cylinders loaded yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* View Actions Close button */}
        <div className="flex justify-end pt-4 border-t border-[#F1F5F9] dark:border-border/50 mt-6">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-md bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xs font-bold transition-colors cursor-pointer"
          >
            Close manifest
          </button>
        </div>
      </div>
    </div>
  );
}
