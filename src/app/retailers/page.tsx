"use client";

import React, { useState, useEffect } from "react";
import { RetailerStats } from "@/components/retailers/retailer-stats";
import { RetailerTable } from "@/components/retailers/retailer-table";
import { RetailerModal } from "@/components/retailers/retailer-modal";
import { RetailerViewModal } from "@/components/retailers/retailer-view-modal";
import { Retailer } from "@/types/retailer";

const INITIAL_RETAILERS: Retailer[] = [
  { id: 1, shopName: "Rafiq Store", ownerName: "Rafiq Ahmed", phoneNumber: "01712-345678", location: "Mirpur, Dhaka", coords: "23.8069° N, 90.3687° E", status: "Active" },
  { id: 2, shopName: "Molla Enterprise", ownerName: "Molla Hossain", phoneNumber: "01819-234567", location: "Uttara, Dhaka", coords: "23.8759° N, 90.3988° E", status: "Active" },
  { id: 3, shopName: "Shapla Store", ownerName: "Sohel Rana", phoneNumber: "01678-901234", location: "Narayanganj", coords: "23.6238° N, 90.5000° E", status: "Active" },
  { id: 4, shopName: "Islam Traders", ownerName: "Jasim Uddin", phoneNumber: "01911-567890", location: "Gazipur", coords: "23.9888° N, 90.4124° E", status: "Inactive" },
];

export default function RetailersPage() {
  const [retailers, setRetailers] = useState<Retailer[]>(INITIAL_RETAILERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingRetailer, setEditingRetailer] = useState<Retailer | null>(null);
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(null);

  // Listen to header click event dispatched from layout.tsx
  useEffect(() => {
    const handleOpen = () => {
      setEditingRetailer(null);
      setIsModalOpen(true);
    };

    window.addEventListener("open-add-retailer-modal", handleOpen);
    return () =>
      window.removeEventListener("open-add-retailer-modal", handleOpen);
  }, []);

  // Save / Edit Retailer
  const handleSave = (retailerData: Omit<Retailer, "id" | "coords"> & { id?: number; coords?: string }) => {
    if (editingRetailer) {
      // Edit Mode
      setRetailers((prev) =>
        prev.map((r) =>
          r.id === editingRetailer.id
            ? {
                ...r,
                ...retailerData,
              }
            : r
        )
      );
    } else {
      // Add Mode
      const nextId = retailers.length > 0 ? Math.max(...retailers.map((r) => r.id)) + 1 : 1;
      const newRetailer: Retailer = {
        id: nextId,
        shopName: retailerData.shopName,
        ownerName: retailerData.ownerName,
        phoneNumber: retailerData.phoneNumber,
        location: retailerData.location,
        coords: retailerData.coords ?? "23.8000° N, 90.4000° E",
        status: retailerData.status,
      };
      setRetailers((prev) => [...prev, newRetailer]);
    }

    setIsModalOpen(false);
  };

  // Open Edit Modal
  const handleEdit = (retailer: Retailer) => {
    setEditingRetailer(retailer);
    setIsModalOpen(true);
  };

  // Open View Details Modal
  const handleView = (retailer: Retailer) => {
    setSelectedRetailer(retailer);
    setIsViewModalOpen(true);
  };

  // Delete Retailer
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this retailer profile?")) {
      setRetailers((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Stats Calculations
  const totalCount = 48 + (retailers.length - INITIAL_RETAILERS.length);
  const activeCount = 44 + (retailers.filter((r) => r.status === "Active" && r.id > 4).length);
  const newThisMonth = 6;

  return (
    <div className="space-y-6 pb-10 font-dm-sans">
      {/* Stats Cards Row */}
      <RetailerStats
        totalCount={totalCount}
        activeCount={activeCount}
        newThisMonth={newThisMonth}
      />

      {/* Table Directory Card */}
      <RetailerTable
        retailers={retailers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add / Edit Form Modal */}
      <RetailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        retailer={editingRetailer}
        onSave={handleSave}
      />

      {/* View Details Modal */}
      <RetailerViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        retailer={selectedRetailer}
      />
    </div>
  );
}
