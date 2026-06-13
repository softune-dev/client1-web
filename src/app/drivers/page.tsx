"use client";

import React, { useState, useEffect } from "react";
import { DriverStats } from "@/components/drivers/driver-stats";
import { DriverTable } from "@/components/drivers/driver-table";
import { DriverModal } from "@/components/drivers/driver-modal";
import { Driver } from "@/types/driver";

const INITIAL_DRIVERS: Driver[] = [
  { id: 1, name: "Rahim Uddin", phoneNumber: "01712345678", licenseNumber: "LIC-10021", address: "Dhaka, Bangladesh", status: "Active", onTrip: true },
  { id: 2, name: "Jasim Uddin", phoneNumber: "01812345678", licenseNumber: "LIC-10022", address: "Gazipur, Bangladesh", status: "Active", onTrip: false },
  { id: 3, name: "Monir Hossain", phoneNumber: "01912345678", licenseNumber: "LIC-10023", address: "Narayanganj, Bangladesh", status: "Active", onTrip: true },
  { id: 4, name: "Selim Uddin", phoneNumber: "01612345678", licenseNumber: "LIC-10024", address: "Chattogram, Bangladesh", status: "Active", onTrip: false },
];

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  // Listen to header click event dispatched from layout.tsx
  useEffect(() => {
    const handleOpen = () => {
      setEditingDriver(null);
      setIsModalOpen(true);
    };

    window.addEventListener("open-add-driver-modal", handleOpen);
    return () =>
      window.removeEventListener("open-add-driver-modal", handleOpen);
  }, []);

  // Save / Edit Driver
  const handleSave = (driverData: Omit<Driver, "id" | "onTrip"> & { id?: number; onTrip?: boolean }) => {
    if (editingDriver) {
      // Edit mode
      setDrivers((prev) =>
        prev.map((d) =>
          d.id === editingDriver.id
            ? {
                ...d,
                ...driverData,
              }
            : d
        )
      );
    } else {
      // Add mode
      const newId =
        drivers.length > 0 ? Math.max(...drivers.map((d) => d.id)) + 1 : 1;
      const newDriver: Driver = {
        id: newId,
        name: driverData.name,
        phoneNumber: driverData.phoneNumber,
        licenseNumber: driverData.licenseNumber,
        address: driverData.address,
        status: driverData.status,
        onTrip: driverData.onTrip ?? false,
      };
      setDrivers((prev) => [...prev, newDriver]);
    }

    setIsModalOpen(false);
  };

  // Open Edit Modal
  const handleEdit = (driver: Driver) => {
    setEditingDriver(driver);
    setIsModalOpen(true);
  };

  // Delete Driver
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this driver?")) {
      setDrivers((prev) => prev.filter((d) => d.id !== id));
    }
  };

  // Calculate statistics
  const totalDriversCount = drivers.length;
  const activeDriversCount = drivers.filter((d) => d.status === "Active").length;
  const onTripCount = drivers.filter((d) => d.onTrip && d.status === "Active").length;

  return (
    <div className="space-y-6 pb-10 font-dm-sans">
      {/* Stats Cards Row */}
      <DriverStats
        totalCount={totalDriversCount}
        activeCount={activeDriversCount}
        onTripCount={onTripCount}
      />

      {/* Table Directory Card */}
      <DriverTable
        drivers={drivers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add / Edit Form Modal */}
      <DriverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        driver={editingDriver}
        onSave={handleSave}
      />
    </div>
  );
}
