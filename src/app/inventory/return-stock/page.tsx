"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/common/page-header";
import { ReturnStats } from "@/components/inventory/return-stock/return-stats";
import { TripInfo } from "@/components/inventory/return-stock/trip-info";
import { ReturnTable } from "@/components/inventory/return-stock/return-table";
import { ReturnEntriesLog } from "@/components/inventory/return-stock/return-entries-log";
import { TripDetails, CylinderRow, ReturnEntry } from "@/types/inventory";

const MOCK_TRIPS: TripDetails[] = [
  {
    tripNo: "TRP-2025-0534",
    vehicle: "WB-19-AB-4321",
    driver: "Ramesh Kumar",
    manager: "Sourav Das",
    date: "2025-06-02",
    status: "Completed",
    loaded: {
      "12 KG": 120,
      "15 KG": 100,
      "18 KG": 80,
      "22 KG": 60,
      "35 KG": 40,
    },
    delivered: {
      "12 KG": 110,
      "15 KG": 95,
      "18 KG": 75,
      "22 KG": 58,
      "35 KG": 38,
    },
  },
  {
    tripNo: "TRP-2025-0535",
    vehicle: "DHK-TA-1234",
    driver: "Karimul Hasan",
    manager: "Monir Hossain",
    date: "2025-06-03",
    status: "Completed",
    loaded: {
      "12 KG": 150,
      "15 KG": 120,
      "18 KG": 90,
      "22 KG": 70,
      "35 KG": 50,
    },
    delivered: {
      "12 KG": 140,
      "15 KG": 110,
      "18 KG": 85,
      "22 KG": 65,
      "35 KG": 45,
    },
  },
  {
    tripNo: "TRP-2025-0536",
    vehicle: "DHK-TA-5678",
    driver: "Rahim Uddin",
    manager: "Suresh Kumar",
    date: "2025-06-04",
    status: "Completed",
    loaded: {
      "12 KG": 100,
      "15 KG": 80,
      "18 KG": 60,
      "22 KG": 50,
      "35 KG": 30,
    },
    delivered: {
      "12 KG": 90,
      "15 KG": 75,
      "18 KG": 55,
      "22 KG": 46,
      "35 KG": 28,
    },
  },
];

const INITIAL_ENTRIES: ReturnEntry[] = [
  {
    id: 1,
    returnNo: "RET-2025-0187",
    tripNo: "TRP-2025-0534",
    qty: 24,
    date: "02 Jun 2025, 10:30 AM",
    status: "Pending",
  },
  {
    id: 2,
    returnNo: "RET-2025-0186",
    tripNo: "TRP-2025-0531",
    qty: 18,
    date: "01 Jun 2025, 06:15 PM",
    status: "Completed",
  },
  {
    id: 3,
    returnNo: "RET-2025-0185",
    tripNo: "TRP-2025-0528",
    qty: 15,
    date: "31 May 2025, 08:45 PM",
    status: "Completed",
  },
];

export default function ReturnStockPage() {
  // Stats
  const [returnedToday, setReturnedToday] = useState(70);
  const [pendingReconciliation, setPendingReconciliation] = useState(120);
  const [completedTrips] = useState(12);
  const [warehouseUpdate, setWarehouseUpdate] = useState(3);

  // Selector state
  const [selectedTripNo, setSelectedTripNo] = useState("TRP-2025-0534");
  const [vehicle, setVehicle] = useState("WB-19-AB-4321");
  const [driver, setDriver] = useState("Ramesh Kumar");
  const [manager, setManager] = useState("Sourav Das");
  const [returnDate, setReturnDate] = useState("2025-06-02");
  const [status, setStatus] = useState("Completed");

  // Reconciled rows state
  const [cylinders, setCylinders] = useState<CylinderRow[]>([]);

  // Recent Return Entries list
  const [entries, setEntries] = useState<ReturnEntry[]>(INITIAL_ENTRIES);

  // Synchronize cylinders list when selected trip changes
  useEffect(() => {
    const found = MOCK_TRIPS.find((t) => t.tripNo === selectedTripNo);
    if (found) {
      setVehicle(found.vehicle);
      setDriver(found.driver);
      setManager(found.manager);
      setReturnDate(found.date);
      setStatus(found.status);

      // Map loaded / delivered data to cylinder rows
      const sizes = ["12 KG", "15 KG", "18 KG", "22 KG", "35 KG"];
      const rows = sizes.map((sz) => {
        const loadedVal = found.loaded?.[sz] || 0;
        const deliveredVal = found.delivered?.[sz] || 0;
        const diff = Math.max(0, loadedVal - deliveredVal);
        return {
          size: sz,
          loaded: loadedVal,
          delivered: deliveredVal,
          quantity: diff, // Default return quantity is loaded - delivered
          status: "Pending" as const,
        };
      });
      setCylinders(rows);
    }
  }, [selectedTripNo]);

  // Totals calculations
  const totalLoaded = cylinders.reduce((acc, c) => acc + (c.loaded || 0), 0);
  const totalDelivered = cylinders.reduce(
    (acc, c) => acc + (c.delivered || 0),
    0,
  );
  const totalQuantity = cylinders.reduce((acc, c) => acc + c.quantity, 0);

  // Helper to change quantity safely
  const handleQuantityChange = (size: string, val: number) => {
    setCylinders((prev) =>
      prev.map((c) => {
        if (c.size === size) {
          const maxVal = (c.loaded || 0) - (c.delivered || 0);
          const newQty = Math.max(0, Math.min(maxVal, val));
          return { ...c, quantity: newQty };
        }
        return c;
      }),
    );
  };

  // Date formatter for entries timestamp
  const formatEntryDate = (dateStr: string) => {
    if (!dateStr) return "";
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return dateStr;

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const timeStr = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

    return `${day} ${month} ${year}, ${timeStr}`;
  };

  // Handle Confirm
  const handleConfirm = () => {
    if (totalQuantity <= 0) {
      alert("No returns to reconcile.");
      return;
    }

    const nextId =
      entries.length > 0 ? Math.max(...entries.map((e) => e.id)) + 1 : 1;
    const returnNoStr = `RET-2025-0${String(187 + nextId - 1).padStart(3, "0")}`;

    const newEntry: ReturnEntry = {
      id: nextId,
      returnNo: returnNoStr,
      tripNo: selectedTripNo,
      qty: totalQuantity,
      date: formatEntryDate(returnDate),
      status: "Pending",
    };

    setEntries([newEntry, ...entries]);
    setReturnedToday((prev) => prev + totalQuantity);
    setPendingReconciliation((prev) => Math.max(0, prev - totalQuantity));
    setWarehouseUpdate((prev) => prev + 1);

    alert(
      `Reconciliation of ${totalQuantity} cylinders confirmed successfully under Return No: ${returnNoStr}`,
    );

    // Update cylinder status to Reconciled
    setCylinders((prev) => prev.map((c) => ({ ...c, status: "Reconciled" })));
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
      <button
        type="button"
        onClick={handleConfirm}
        className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors shadow-xs cursor-pointer"
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
        Confirm Return
      </button>
    </div>
  );

  return (
    <div className="space-y-6 font-dm-sans pb-10">
      <PageHeader title="Inventory" action={headerActions} />

      {/* Stats Cards Row */}
      <ReturnStats
        returnedToday={returnedToday}
        pendingReconciliation={pendingReconciliation}
        completedTrips={completedTrips}
        warehouseUpdate={warehouseUpdate}
      />

      {/* Select Completed Trip Card */}
      <TripInfo
        trips={MOCK_TRIPS}
        selectedTripNo={selectedTripNo}
        vehicle={vehicle}
        driver={driver}
        manager={manager}
        returnDate={returnDate}
        status={status}
        onTripChange={setSelectedTripNo}
      />

      {/* Returned Cylinder Inventory Card */}
      <ReturnTable
        cylinders={cylinders}
        onQuantityChange={handleQuantityChange}
        totalLoaded={totalLoaded}
        totalDelivered={totalDelivered}
        totalQuantity={totalQuantity}
      />

      {/* Recent Return Entries Card */}
      <ReturnEntriesLog entries={entries} />
    </div>
  );
}
