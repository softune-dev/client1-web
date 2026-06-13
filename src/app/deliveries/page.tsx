"use client";

import React, { useState, useEffect } from "react";
import { DeliveryStats } from "@/components/deliveries/delivery-stats";
import { DeliveryTable } from "@/components/deliveries/delivery-table";
import { DeliveryModal } from "@/components/deliveries/delivery-modal";
import { Delivery } from "@/types/delivery";

const INITIAL_DELIVERIES: Delivery[] = [
  {
    id: 1,
    deliveryNo: "DEL-00045",
    tripNo: "TRP-00012",
    retailer: "Rafiq Store",
    owner: "Rafiqul Islam",
    phone: "01722334455",
    address: "Plot 15, Road 2, Block D, Mirpur-10, Dhaka",
    coords: "23.8069° N, 90.3687° E",
    productSize: "12 KG",
    quantity: 20,
    deliveryTime: "02 Jun 2025 10:30 AM",
    manager: "Karim Ahmed",
    status: "Delivered",
  },
  {
    id: 2,
    deliveryNo: "DEL-00044",
    tripNo: "TRP-00012",
    retailer: "Molla Enterprise",
    owner: "Abul Kalam Molla",
    phone: "01822334455",
    address: "Sector 4, Road 18, House 25, Uttara, Dhaka",
    coords: "23.8759° N, 90.3988° E",
    productSize: "15 KG",
    quantity: 10,
    deliveryTime: "02 Jun 2025 10:15 AM",
    manager: "Karim Ahmed",
    status: "Delivered",
  },
  {
    id: 3,
    deliveryNo: "DEL-00043",
    tripNo: "TRP-00011",
    retailer: "Shapla Store",
    owner: "Sajib Mia",
    phone: "01922334455",
    address: "Pragati Sarani, Middle Badda, No. 120, Dhaka",
    coords: "23.7805° N, 90.4267° E",
    productSize: "12 KG",
    quantity: 15,
    deliveryTime: "02 Jun 2025 09:45 AM",
    manager: "Sohel Rana",
    status: "Delivered",
  },
  {
    id: 4,
    deliveryNo: "DEL-00042",
    tripNo: "TRP-00013",
    retailer: "Islam Traders",
    owner: "Kamrul Hassan",
    phone: "01622334455",
    address: "Taltola Market Row, Shop 45, Khilgaon, Dhaka",
    coords: "23.7508° N, 90.4201° E",
    productSize: "18 KG",
    quantity: 10,
    deliveryTime: "02 Jun 2025 11:30 AM",
    manager: "Sohel Rana",
    status: "Pending",
  },
];

const TRIP_MANAGERS: Record<string, string> = {
  "TRP-00011": "Sohel Rana",
  "TRP-00012": "Karim Ahmed",
  "TRP-00013": "Sohel Rana",
};

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(INITIAL_DELIVERIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState<Delivery | null>(null);

  // Listen to layout trigger for Record Delivery
  useEffect(() => {
    const handleOpen = () => {
      setEditingDelivery(null);
      setIsModalOpen(true);
    };

    window.addEventListener("open-record-delivery-modal", handleOpen);
    return () =>
      window.removeEventListener("open-record-delivery-modal", handleOpen);
  }, []);

  // Save / Edit Delivery
  const handleSave = (deliveryData: Omit<Delivery, "id" | "deliveryNo" | "deliveryTime" | "manager" | "coords"> & { id?: number }) => {
    if (editingDelivery) {
      // Edit Mode
      setDeliveries((prev) =>
        prev.map((d) =>
          d.id === editingDelivery.id
            ? {
                ...d,
                tripNo: deliveryData.tripNo,
                retailer: deliveryData.retailer,
                owner: deliveryData.owner,
                phone: deliveryData.phone,
                address: deliveryData.address,
                productSize: deliveryData.productSize,
                quantity: deliveryData.quantity,
                manager: TRIP_MANAGERS[deliveryData.tripNo] || "Karim Ahmed",
                status: deliveryData.status,
              }
            : d
        )
      );
    } else {
      // Add Mode
      const nextId = deliveries.length > 0 ? Math.max(...deliveries.map((d) => d.id)) + 1 : 1;
      const padId = String(nextId).padStart(5, "0");
      const deliveryNo = `DEL-${padId}`;

      const dateNow = new Date();
      const formattedDate = dateNow.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + " " + dateNow.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const newDelivery: Delivery = {
        id: nextId,
        deliveryNo,
        tripNo: deliveryData.tripNo,
        retailer: deliveryData.retailer,
        owner: deliveryData.owner,
        phone: deliveryData.phone,
        address: deliveryData.address,
        coords: "23.8000° N, 90.4000° E",
        productSize: deliveryData.productSize,
        quantity: deliveryData.quantity,
        deliveryTime: formattedDate,
        manager: TRIP_MANAGERS[deliveryData.tripNo] || "Karim Ahmed",
        status: deliveryData.status,
      };

      setDeliveries((prev) => [newDelivery, ...prev]);
    }

    setIsModalOpen(false);
  };

  // Open Edit Modal
  const handleEdit = (delivery: Delivery) => {
    setEditingDelivery(delivery);
    setIsModalOpen(true);
  };

  // Delete Delivery
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this delivery entry?")) {
      setDeliveries((prev) => prev.filter((d) => d.id !== id));
    }
  };

  // Stats Calculations
  const totalDeliveries = 128 + (deliveries.length - INITIAL_DELIVERIES.length);
  const deliveredToday = 18 + (deliveries.filter((d) => d.status === "Delivered" && d.id > 4).length);
  const activeTripsCount = 5;

  return (
    <div className="space-y-6 pb-10 font-dm-sans">
      {/* Stats Cards Row */}
      <DeliveryStats
        totalDeliveries={totalDeliveries}
        deliveredToday={deliveredToday}
        activeTripsCount={activeTripsCount}
      />

      {/* Table Directory Card */}
      <DeliveryTable
        deliveries={deliveries}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Record / Edit Delivery Modal */}
      <DeliveryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        delivery={editingDelivery}
        onSave={handleSave}
      />
    </div>
  );
}
