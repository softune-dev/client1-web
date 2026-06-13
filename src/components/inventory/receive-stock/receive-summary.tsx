"use client";

import React from "react";

interface ReceiveSummaryProps {
  supplier: string;
  cylinderSize: string;
  quantity: number | "";
}

export function ReceiveSummary({
  supplier,
  cylinderSize,
  quantity,
}: ReceiveSummaryProps) {
  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card">
      <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground mb-4 font-dm-sans">
        Receive Summary
      </h3>
      <div className="space-y-4 text-xs font-dm-sans">
        <div>
          <span className="block font-semibold text-[#475569] dark:text-slate-400">Supplier</span>
          <span className="block text-lg font-semibold text-[#2563EB] dark:text-blue-400 mt-1 hover:underline cursor-pointer">
            {supplier || "—"}
          </span>
        </div>
        <div>
          <span className="block font-semibold text-[#475569] dark:text-slate-400">Cylinder Size</span>
          <span className="block text-lg font-semibold text-[#0F172A] dark:text-foreground mt-1 font-sans">
            {cylinderSize || "—"}
          </span>
        </div>
        <div>
          <span className="block font-semibold text-[#475569] dark:text-slate-400">Quantity</span>
          <span className="block text-lg font-semibold text-[#2563EB] dark:text-blue-400 mt-1 font-sans">
            {quantity ? `${quantity} Cylinders` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
