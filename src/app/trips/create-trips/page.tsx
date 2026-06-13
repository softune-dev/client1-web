"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiPlus } from "react-icons/fi";
import { PageHeader } from "@/components/common/page-header";
import { TripInfoForm } from "@/components/trips/trip-info-form";
import { LoadPlanForm } from "@/components/trips/load-plan-form";
import { TripSummaryPanel } from "@/components/trips/trip-summary-panel";

const VEHICLES = ["Dhaka-TA-1234", "Dhaka-TA-5678", "Dhaka-TA-9999", "Dhaka-TA-2222"];
const DRIVERS = ["Rahim Uddin", "Jasim Uddin", "Monir Hossain", "Selim Uddin"];
const MANAGERS = ["Karim Ahmed", "Sohel Rana", "Rafiq Islam", "Mahbub Hasan"];
const CYLINDER_SIZES = ["12 KG", "15 KG", "18 KG", "22 KG", "35 KG"];

export default function CreateTripsPage() {
  const router = useRouter();

  // Form states
  const [tripDate, setTripDate] = useState("2025-06-03");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Draft");
  
  const [cargo, setCargo] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    CYLINDER_SIZES.forEach((size) => {
      init[size] = 0;
    });
    return init;
  });

  // Trip Number
  const tripNumber = "TRP-00013";

  // Date formatting for summary, e.g. "2025-06-03" -> "03 Jun 2025"
  const getFormattedDate = () => {
    if (!tripDate) return "—";
    try {
      const d = new Date(tripDate);
      return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return tripDate;
    }
  };

  const handleCargoChange = (size: string, val: number) => {
    setCargo((prev) => ({
      ...prev,
      [size]: val,
    }));
  };

  const handleSave = (statusOverride?: string) => {
    const status = statusOverride || selectedStatus;
    
    if (!selectedVehicle || !selectedDriver || !selectedManager) {
      alert("Please fill in all required fields marked with an asterisk (*).");
      return;
    }

    alert(`Trip ${tripNumber} created successfully with status "${status}"!`);
    router.push("/trips/all-trips");
  };

  // Action Buttons
  const headerActions = (
    <div className="flex items-center gap-x-3">
      <button
        type="button"
        onClick={() => handleSave("Draft")}
        className="inline-flex items-center justify-center gap-x-2 rounded-sm border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#334155] hover:bg-slate-50 transition-colors focus:outline-none shadow-xs cursor-pointer font-dm-sans dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-muted"
      >
        <FiSave className="h-4 w-4 text-[#475569] dark:text-muted-foreground" />
        Save Draft
      </button>
      <button
        type="button"
        onClick={() => handleSave()}
        className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors focus:outline-none shadow-sm cursor-pointer font-dm-sans"
      >
        <FiPlus className="h-4 w-4" />
        Create Trip
      </button>
    </div>
  );

  return (
    <div className="space-y-6 pb-10 font-dm-sans">
      <PageHeader title="Create Trip" action={headerActions} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 space-y-6">
          {/* Trip Info Form */}
          <TripInfoForm
            tripNumber={tripNumber}
            tripDate={tripDate}
            onTripDateChange={setTripDate}
            selectedVehicle={selectedVehicle}
            onVehicleChange={setSelectedVehicle}
            selectedDriver={selectedDriver}
            onDriverChange={setSelectedDriver}
            selectedManager={selectedManager}
            onManagerChange={setSelectedManager}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            vehicles={VEHICLES}
            drivers={DRIVERS}
            managers={MANAGERS}
          />

          {/* Load Plan Form */}
          <LoadPlanForm cargo={cargo} onCargoChange={handleCargoChange} />
        </div>

        {/* Right Column: Summary Panel */}
        <div className="lg:col-span-4">
          <TripSummaryPanel
            vehicle={selectedVehicle}
            driver={selectedDriver}
            manager={selectedManager}
            formattedDate={getFormattedDate()}
            status={selectedStatus}
          />
        </div>
      </div>
    </div>
  );
}
