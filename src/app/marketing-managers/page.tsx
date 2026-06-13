"use client";

import React, { useState, useEffect } from "react";
import { ManagerStats } from "@/components/marketing-managers/manager-stats";
import { ManagerTable } from "@/components/marketing-managers/manager-table";
import { ManagerModal } from "@/components/marketing-managers/manager-modal";
import { MarketingManager } from "@/types/marketing-manager";

const INITIAL_MANAGERS: MarketingManager[] = [
  { id: 1, name: "Karim Ahmed", employeeId: "MM-1001", phoneNumber: "01722334455", username: "karim.ahmed", assignedTrip: "TRP-00012", status: "Active" },
  { id: 2, name: "Sohel Rana", employeeId: "MM-1002", phoneNumber: "01822334455", username: "sohel.rana", assignedTrip: "TRP-00011", status: "Active" },
  { id: 3, name: "Rafiq Islam", employeeId: "MM-1003", phoneNumber: "01922334455", username: "rafiq.islam", assignedTrip: "Not Assigned", status: "Active" },
  { id: 4, name: "Mahbub Hasan", employeeId: "MM-1004", phoneNumber: "01622334455", username: "mahbub.hasan", assignedTrip: "Not Assigned", status: "Active" },
];

export default function MarketingManagersPage() {
  const [managers, setManagers] = useState<MarketingManager[]>(INITIAL_MANAGERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingManager, setEditingManager] = useState<MarketingManager | null>(null);

  // Listen to header click event dispatched from layout.tsx
  useEffect(() => {
    const handleOpen = () => {
      setEditingManager(null);
      setIsModalOpen(true);
    };

    window.addEventListener("open-add-manager-modal", handleOpen);
    return () =>
      window.removeEventListener("open-add-manager-modal", handleOpen);
  }, []);

  // Save / Edit Manager
  const handleSave = (managerData: Omit<MarketingManager, "id"> & { id?: number }) => {
    if (editingManager) {
      // Edit mode
      setManagers((prev) =>
        prev.map((m) =>
          m.id === editingManager.id
            ? {
                ...m,
                ...managerData,
              }
            : m
        )
      );
    } else {
      // Add mode
      const newId =
        managers.length > 0 ? Math.max(...managers.map((m) => m.id)) + 1 : 1;
      const newManager: MarketingManager = {
        id: newId,
        name: managerData.name,
        employeeId: managerData.employeeId,
        phoneNumber: managerData.phoneNumber,
        username: managerData.username,
        assignedTrip: managerData.assignedTrip,
        status: managerData.status,
      };
      setManagers((prev) => [...prev, newManager]);
    }

    setIsModalOpen(false);
  };

  // Open Edit Modal
  const handleEdit = (manager: MarketingManager) => {
    setEditingManager(manager);
    setIsModalOpen(true);
  };

  // Delete Manager
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this marketing manager?")) {
      setManagers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  // Calculate statistics
  const totalManagersCount = managers.length;
  const assignedCount = managers.filter((m) => m.assignedTrip !== "Not Assigned" && m.status === "Active").length;
  const availableCount = managers.filter((m) => m.assignedTrip === "Not Assigned" && m.status === "Active").length;

  return (
    <div className="space-y-6 pb-10 font-dm-sans">
      {/* Stats Cards Row */}
      <ManagerStats
        totalCount={totalManagersCount}
        assignedCount={assignedCount}
        availableCount={availableCount}
      />

      {/* Table Directory Card */}
      <ManagerTable
        managers={managers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add / Edit Form Modal */}
      <ManagerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        manager={editingManager}
        onSave={handleSave}
      />
    </div>
  );
}
