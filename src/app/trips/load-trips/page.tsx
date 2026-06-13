"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { LoadTripBanner } from "@/components/trips/load-trip-banner";
import { LoadInventoryTable } from "@/components/trips/load-inventory-table";
import { LoadTripActions } from "@/components/trips/load-trip-actions";
import { Trip } from "@/types/trip";

const INITIAL_TRIPS: Trip[] = [
  {
    id: 1,
    tripNo: "TRP-00012",
    vehicle: "Dhaka-TA-1234",
    driver: "Rahim Uddin",
    manager: "Karim Ahmed",
    date: "02 Jun 2025",
    status: "Draft",
    passcode: "9821",
    cargo: [
      { size: "12 KG", quantity: 80 },
      { size: "15 KG", quantity: 40 },
      { size: "18 KG", quantity: 20 },
      { size: "22 KG", quantity: 0 },
      { size: "35 KG", quantity: 0 },
    ],
  },
  {
    id: 2,
    tripNo: "TRP-00011",
    vehicle: "Dhaka-TA-5678",
    driver: "Jasim Uddin",
    manager: "Sohel Rana",
    date: "02 Jun 2025",
    status: "Loaded",
    passcode: "5132",
    cargo: [
      { size: "12 KG", quantity: 100 },
      { size: "15 KG", quantity: 50 },
      { size: "18 KG", quantity: 25 },
      { size: "22 KG", quantity: 0 },
      { size: "35 KG", quantity: 0 },
    ],
  },
  {
    id: 3,
    tripNo: "TRP-00010",
    vehicle: "Dhaka-TA-9999",
    driver: "Monir Hossain",
    manager: "Rafiq Islam",
    date: "01 Jun 2025",
    status: "In Transit",
    passcode: "8845",
    cargo: [
      { size: "12 KG", quantity: 80 },
      { size: "15 KG", quantity: 40 },
      { size: "18 KG", quantity: 20 },
      { size: "22 KG", quantity: 10 },
      { size: "35 KG", quantity: 0 },
    ],
  },
  {
    id: 4,
    tripNo: "TRP-00009",
    vehicle: "Dhaka-TA-2222",
    driver: "Selim Uddin",
    manager: "Mahbub Hasan",
    date: "31 May 2025",
    status: "Completed",
    passcode: "2311",
    cargo: [
      { size: "12 KG", quantity: 70 },
      { size: "15 KG", quantity: 30 },
      { size: "18 KG", quantity: 20 },
      { size: "22 KG", quantity: 0 },
      { size: "35 KG", quantity: 0 },
    ],
  },
];

const WAREHOUSE_STOCK: Record<string, number> = {
  "12 KG": 100,
  "15 KG": 50,
  "18 KG": 25,
  "22 KG": 0,
  "35 KG": 0,
};

export default function LoadTripsPage() {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(INITIAL_TRIPS[0]);
  
  // Cargo quantity loading state
  const [cargo, setCargo] = useState<Record<string, number>>({});

  // Sync cargo values when selected trip changes
  useEffect(() => {
    if (selectedTrip) {
      const initCargo: Record<string, number> = {};
      selectedTrip.cargo.forEach((c) => {
        initCargo[c.size] = c.quantity;
      });
      setCargo(initCargo);
    }
  }, [selectedTrip]);

  const handleCargoChange = (size: string, val: number) => {
    setCargo((prev) => ({
      ...prev,
      [size]: val,
    }));
  };

  // Compute Total Quantity
  const totalQuantity = Object.values(cargo).reduce((a, b) => a + b, 0);

  const handleBack = () => {
    router.push("/trips/all-trips");
  };

  const handleSaveDraft = () => {
    if (!selectedTrip) return;
    
    // Save draft cargo back to selected trip
    const updatedCargo = selectedTrip.cargo.map((item) => ({
      ...item,
      quantity: cargo[item.size] ?? item.quantity,
    }));

    setTrips((prev) =>
      prev.map((t) =>
        t.id === selectedTrip.id
          ? { ...t, cargo: updatedCargo, status: "Draft" }
          : t
      )
    );

    alert(`Draft saved successfully for Trip ${selectedTrip.tripNo}!`);
    router.push("/trips/all-trips");
  };

  const handleConfirmLoad = () => {
    if (!selectedTrip) return;

    // Confirm load cargo back to selected trip and set status to "Loaded"
    const updatedCargo = selectedTrip.cargo.map((item) => ({
      ...item,
      quantity: cargo[item.size] ?? item.quantity,
    }));

    setTrips((prev) =>
      prev.map((t) =>
        t.id === selectedTrip.id
          ? { ...t, cargo: updatedCargo, status: "Loaded" }
          : t
      )
    );

    alert(`Trip ${selectedTrip.tripNo} successfully loaded with ${totalQuantity} cylinders!`);
    router.push("/trips/all-trips");
  };

  return (
    <div className="space-y-6 pb-10 font-dm-sans">
      <PageHeader title="Load Inventory" />

      {/* Horizontal Banner */}
      <LoadTripBanner
        trips={trips}
        selectedTrip={selectedTrip}
        onTripChange={setSelectedTrip}
      />

      {/* Load Cylinder Inventory Table */}
      <LoadInventoryTable
        cargo={cargo}
        warehouseStock={WAREHOUSE_STOCK}
        onCargoChange={handleCargoChange}
      />

      {/* Actions and Total quantity summary */}
      <LoadTripActions
        totalQuantity={totalQuantity}
        onBack={handleBack}
        onSaveDraft={handleSaveDraft}
        onConfirmLoad={handleConfirmLoad}
      />
    </div>
  );
}
