"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiPlus, FiLayers } from "react-icons/fi";
import { PageHeader } from "@/components/common/page-header";
import { TripStats } from "@/components/trips/trip-stats";
import { TripTable } from "@/components/trips/trip-table";
import { TripModal } from "@/components/trips/trip-modal";
import { TripViewModal } from "@/components/trips/trip-view-modal";
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
      { size: "12 KG", quantity: 100 },
      { size: "15 KG", quantity: 50 },
      { size: "18 KG", quantity: 25 },
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

export default function AllTripsPage() {
  const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTripForModal, setActiveTripForModal] = useState<Trip | null>(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [tripForView, setTripForView] = useState<Trip | null>(null);

  // Compute Stats
  const totalCount = trips.length;
  const draftCount = trips.filter((t) => t.status === "Draft").length;
  const inTransitCount = trips.filter((t) => t.status === "In Transit" || t.status === "Loaded").length;
  const completedCount = trips.filter((t) => t.status === "Completed").length;

  const handleCreateClick = () => {
    setActiveTripForModal(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (trip: Trip) => {
    setActiveTripForModal(trip);
    setIsModalOpen(true);
  };

  const handleViewClick = (trip: Trip) => {
    setTripForView(trip);
    setIsViewOpen(true);
  };

  const handleSaveTrip = (tripData: Omit<Trip, "id"> & { id?: number }) => {
    if (activeTripForModal) {
      // Edit mode
      setTrips((prev) =>
        prev.map((t) =>
          t.id === activeTripForModal.id
            ? {
                ...t,
                ...tripData,
                tripNo: t.tripNo, // preserve original tripNo
              }
            : t
        )
      );
    } else {
      // Add mode
      const maxId = trips.length > 0 ? Math.max(...trips.map((t) => parseInt(t.tripNo.replace("TRP-", "")) || 0)) : 12;
      const nextNum = maxId + 1;
      const newTripNo = `TRP-${String(nextNum).padStart(5, "0")}`;

      const newTrip: Trip = {
        ...tripData,
        id: Date.now(),
        tripNo: newTripNo,
      };

      setTrips((prev) => [newTrip, ...prev]);
    }
    setIsModalOpen(false);
  };

  // Header Actions
  const headerActions = (
    <div className="flex items-center gap-x-3">
      <Link
        href="/trips/load-trips"
        className="inline-flex items-center justify-center gap-x-2 rounded-sm border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#334155] hover:bg-slate-50 transition-colors focus:outline-none shadow-xs cursor-pointer font-dm-sans dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-muted"
      >
        <FiLayers className="h-4 w-4 text-[#475569] dark:text-muted-foreground" />
        Load Inventory
      </Link>
      <button
        onClick={handleCreateClick}
        className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors focus:outline-none shadow-sm cursor-pointer font-dm-sans"
      >
        <FiPlus className="h-4 w-4" />
        Create Trip
      </button>
    </div>
  );

  return (
    <div className="space-y-6 pb-10 font-dm-sans">
      <PageHeader title="Trips" action={headerActions} />
      
      {/* Stats Cards Row */}
      <TripStats
        totalCount={totalCount}
        draftCount={draftCount}
        inTransitCount={inTransitCount}
        completedCount={completedCount}
      />

      {/* Directory Table */}
      <TripTable
        trips={trips}
        onView={handleViewClick}
        onEdit={handleEditClick}
      />

      {/* Create / Edit Modal */}
      <TripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trip={activeTripForModal}
        onSave={handleSaveTrip}
      />

      {/* View manifest details Modal */}
      <TripViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        trip={tripForView}
      />
    </div>
  );
}
