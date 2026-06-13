"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/common/page-header";
import { LoadStats } from "@/components/inventory/load-vehicle/load-stats";
import { LoadForm } from "@/components/inventory/load-vehicle/load-form";
import { LoadTable } from "@/components/inventory/load-vehicle/load-table";
import { TripSummaryPanel } from "@/components/inventory/load-vehicle/trip-summary-panel";
import { TripDetails, CylinderRow } from "@/types/inventory";
import { InfoIcon } from "lucide-react";

const MOCK_TRIPS: TripDetails[] = [
  {
    tripNo: "TRIP-2025-06-0021",
    vehicle: "DHK-TA-1234 (Tata Ace)",
    driver: "Karimul Hasan",
    manager: "Monir Hossain",
    date: "2025-06-02",
    status: "Draft",
  },
  {
    tripNo: "TRIP-2025-06-0022",
    vehicle: "DHK-TA-5678 (Toyota Dyna)",
    driver: "Rahim Uddin",
    manager: "Suresh Kumar",
    date: "2025-06-03",
    status: "Draft",
  },
  {
    tripNo: "TRIP-2025-06-0023",
    vehicle: "DHK-TA-9012 (Isuzu Elf)",
    driver: "Abul Kashem",
    manager: "Farhana Yasmin",
    date: "2025-06-04",
    status: "Draft",
  },
];

const INITIAL_CYLINDERS: CylinderRow[] = [
  { size: "12 KG", available: 930, quantity: 200 },
  { size: "15 KG", available: 740, quantity: 150 },
  { size: "18 KG", available: 310, quantity: 80 },
  { size: "22 KG", available: 120, quantity: 40 },
  { size: "35 KG", available: 70, quantity: 30 },
];

export default function LoadVehiclePage() {
  // Stats states
  const [warehouseStock, setWarehouseStock] = useState(2850);
  const [reservedStock] = useState(620);
  const [transfersToday, setTransfersToday] = useState(180);
  const [availableVehicles] = useState(12);

  // Form states (start with TRIP-2025-06-0021 default values)
  const [selectedTripNo, setSelectedTripNo] = useState("TRIP-2025-06-0021");
  const [vehicle, setVehicle] = useState("DHK-TA-1234 (Tata Ace)");
  const [driver, setDriver] = useState("Karimul Hasan");
  const [manager, setManager] = useState("Monir Hossain");
  const [transferDate, setTransferDate] = useState("2025-06-02");
  const [status, setStatus] = useState("Draft");

  // Load cylinder list state
  const [cylinders, setCylinders] = useState<CylinderRow[]>(INITIAL_CYLINDERS);

  // Auto-populate form details when select trip changes
  useEffect(() => {
    const found = MOCK_TRIPS.find((t) => t.tripNo === selectedTripNo);
    if (found) {
      setVehicle(found.vehicle);
      setDriver(found.driver);
      setManager(found.manager);
      setTransferDate(found.date);
      setStatus(found.status);
    }
  }, [selectedTripNo]);

  // Recalculate total quantity to transfer
  const totalQuantity = cylinders.reduce((acc, c) => acc + c.quantity, 0);

  // Helper to change quantity safely
  const handleQuantityChange = (size: string, val: number) => {
    setCylinders((prev) =>
      prev.map((c) => {
        if (c.size === size) {
          const newQty = Math.max(0, Math.min(c.available || 0, val));
          return { ...c, quantity: newQty };
        }
        return c;
      }),
    );
  };

  // Handle Save / Confirm
  const handleConfirm = () => {
    if (totalQuantity <= 0) {
      alert("Please enter quantities to transfer.");
      return;
    }
    // Update stats dynamically
    setWarehouseStock((prev) => Math.max(0, prev - totalQuantity));
    alert(`Transfer of ${totalQuantity} cylinders confirmed successfully!`);

    // Reset quantities
    setCylinders((prev) => prev.map((c) => ({ ...c, quantity: 0 })));
  };

  const headerActions = (
    <div className="flex items-center gap-2 font-dm-sans">
      <button
        type="button"
        onClick={() => alert("Draft saved successfully!")}
        className="inline-flex items-center justify-center gap-x-2 rounded-sm border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#334155] hover:bg-slate-50 transition-colors shadow-xs cursor-pointer dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-muted/30"
      >
        <svg
          className="size-4 text-[#334155] dark:text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
        Save Draft
      </button>
    </div>
  );

  return (
    <div className="space-y-6 font-dm-sans pb-10">
      <PageHeader title="Inventory" action={headerActions} />

      {/* Stats Cards Row */}
      <LoadStats
        warehouseStock={warehouseStock}
        reservedStock={reservedStock}
        transfersToday={transfersToday}
        availableVehicles={availableVehicles}
      />

      {/* Transfer Details Card */}
      <LoadForm
        trips={MOCK_TRIPS}
        selectedTripNo={selectedTripNo}
        vehicle={vehicle}
        driver={driver}
        manager={manager}
        transferDate={transferDate}
        setSelectedTripNo={setSelectedTripNo}
        setVehicle={setVehicle}
        setDriver={setDriver}
        setManager={setManager}
        setTransferDate={setTransferDate}
      />

      {/* Split Section: Cylinder Inventory Loading (Left) and Selected Trip Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LoadTable
            cylinders={cylinders}
            onQuantityChange={handleQuantityChange}
            totalQuantity={totalQuantity}
          />
        </div>
        <div className="lg:col-span-1">
          <TripSummaryPanel
            selectedTripNo={selectedTripNo}
            vehicle={vehicle}
            driver={driver}
            manager={manager}
            transferDate={transferDate}
            status={status}
          />
        </div>
      </div>

      {/* Alert Info Box & Bottom Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans text-xs">
        {/* Info Alert Box */}
        <div className="flex items-center gap-x-3 rounded-lg px-4 py-3 text-[#2563EB] dark:bg-blue-950/20 dark:text-blue-400 w-full sm:max-w-xl">
          <InfoIcon className="size-4" />
          <span className="font-medium text-md leading-tight tracking-tight font-dm-sans">
            Warehouse stock will decrease automatically after you confirm the
            transfer.
          </span>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={() => alert("Transfer cancelled.")}
            className="inline-flex items-center justify-center gap-x-2 rounded-sm border border-[#E2E8F0] bg-white px-5 py-3 text-sm font-semibold text-[#334155] hover:bg-slate-50 transition-colors shadow-xs cursor-pointer dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-muted/30 font-dm-sans"
          >
            <svg
              className="size-4 text-[#334155] dark:text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors shadow-xs cursor-pointer font-dm-sans"
          >
            <svg
              className="size-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Confirm Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
