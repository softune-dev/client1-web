"use client";

import React, { useState, useEffect } from "react";
import { VehicleStats } from "@/components/vehicles/vehicle-stats";
import { VehicleTable } from "@/components/vehicles/vehicle-table";
import { VehicleModal } from "@/components/vehicles/vehicle-modal";
import { Vehicle } from "@/types/vehicle";

const INITIAL_VEHICLES: Vehicle[] = [
  { id: 1, vehicleNumber: "Dhaka-TA-1234", registrationNumber: "REG-23871", capacity: 300, status: "Active", onTrip: true },
  { id: 2, vehicleNumber: "Dhaka-TA-5678", registrationNumber: "REG-23872", capacity: 250, status: "Active", onTrip: false },
  { id: 3, vehicleNumber: "Dhaka-TA-9999", registrationNumber: "REG-23873", capacity: 200, status: "Active", onTrip: true },
  { id: 4, vehicleNumber: "Dhaka-TA-2222", registrationNumber: "REG-23874", capacity: 180, status: "Active", onTrip: false },
];

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Listen to header click event dispatched from layout.tsx
  useEffect(() => {
    const handleOpen = () => {
      setEditingVehicle(null);
      setIsModalOpen(true);
    };

    window.addEventListener("open-add-vehicle-modal", handleOpen);
    return () =>
      window.removeEventListener("open-add-vehicle-modal", handleOpen);
  }, []);

  // Save / Edit Vehicle
  const handleSave = (vehicleData: Omit<Vehicle, "id" | "onTrip"> & { id?: number; onTrip?: boolean }) => {
    if (editingVehicle) {
      // Edit mode
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === editingVehicle.id
            ? {
                ...v,
                ...vehicleData,
              }
            : v
        )
      );
    } else {
      // Add mode
      const newId =
        vehicles.length > 0 ? Math.max(...vehicles.map((v) => v.id)) + 1 : 1;
      const newVehicle: Vehicle = {
        id: newId,
        vehicleNumber: vehicleData.vehicleNumber,
        registrationNumber: vehicleData.registrationNumber,
        capacity: vehicleData.capacity,
        status: vehicleData.status,
        onTrip: vehicleData.onTrip ?? false,
      };
      setVehicles((prev) => [...prev, newVehicle]);
    }

    setIsModalOpen(false);
  };

  // Open Edit Modal
  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  // Delete Vehicle
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
  };

  // Calculate statistics
  const totalVehiclesCount = vehicles.length;
  const activeVehiclesCount = vehicles.filter((v) => v.status === "Active").length;
  const onTripCount = vehicles.filter((v) => v.onTrip && v.status === "Active").length;

  return (
    <div className="space-y-6 pb-10 font-dm-sans">
      {/* Stats Cards Row */}
      <VehicleStats
        totalCount={totalVehiclesCount}
        activeCount={activeVehiclesCount}
        onTripCount={onTripCount}
      />

      {/* Table Directory Card */}
      <VehicleTable
        vehicles={vehicles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add / Edit Form Modal */}
      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicle={editingVehicle}
        onSave={handleSave}
      />
    </div>
  );
}
