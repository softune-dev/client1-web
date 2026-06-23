"use client";

import React from "react";

const SUPPLIERS = [
  "Fresh LPG Depot",
  "Bashundhara LPG Supply",
  "Omera LPG Depot",
  "Total Gas Bangladesh",
  "Beximco LPG Depot",
];
const TYPES = ["Package", "Empty Cylinder"];
const SIZES = ["12 KG", "15 KG", "18 KG", "22 KG", "35 KG"];

interface ReceiveFormProps {
  supplier: string;
  type: string;
  cylinderSize: string;
  quantity: number | "";
  receiveDate: string;
  reference: string;
  notes: string;
  setSupplier: (v: string) => void;
  setType: (v: string) => void;
  setCylinderSize: (v: string) => void;
  setQuantity: (v: number | "") => void;
  setReceiveDate: (v: string) => void;
  setReference: (v: string) => void;
  setNotes: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ReceiveForm({
  supplier,
  type,
  cylinderSize,
  quantity,
  reference,
  notes,
  setSupplier,
  setType,
  setCylinderSize,
  setQuantity,
  setReference,
  setNotes,
  onSubmit,
}: ReceiveFormProps) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 dark:border-border dark:bg-card h-full">
      <h3 className="text-base font-semibold tracking-tight text-[#0F172A] dark:text-foreground mb-4 font-dm-sans">
        Receive Stock Entry
      </h3>
      <form onSubmit={onSubmit} className="space-y-4 text-xs font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Supplier Selection */}
          <div>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="h-14 w-full rounded-sm border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-xs font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground cursor-pointer"
              required
            >
              <option value="" disabled hidden>
                Supplier*
              </option>
              {SUPPLIERS.map((sup) => (
                <option key={sup} value={sup}>
                  {sup}
                </option>
              ))}
            </select>
          </div>

          {/* Types Selection */}
          <div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-14 w-full rounded-sm border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-xs font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground cursor-pointer"
              required
            >
              <option value="" disabled hidden>
                Cylinder Type *
              </option>
              {TYPES.map((tp) => (
                <option key={tp} value={tp}>
                  {tp}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cylinder Size Selection */}
          <div>
            <select
              value={cylinderSize}
              onChange={(e) => setCylinderSize(e.target.value)}
              className="h-14 w-full rounded-sm border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-xs font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground cursor-pointer"
              required
            >
              <option value="" disabled hidden>
                Cylinder Size *
              </option>
              {SIZES.map((sz) => (
                <option key={sz} value={sz}>
                  {sz}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Quantity (Cylinders) *"
              className="h-14 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-xs font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground font-sans"
              required
              min="1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Reference */}
          <div>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Reference / Invoice No."
              className="h-14 w-full rounded-sm border border-[#E2E8F0] bg-white dark:bg-card dark:border-border px-3 text-xs font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground font-sans"
            />
          </div>

          {/* Notes */}
          <div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes (Optional)"
              rows={2}
              className="w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border p-2.5 text-xs font-semibold outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground h-20 resize-y font-sans"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
