"use client";

import React, { useState, useEffect } from "react";
import { ReturnStats } from "@/components/returns/return-stats";
import { ReturnsList } from "@/components/returns/returns-list";
import { ReturnDetail } from "@/components/returns/return-detail";
import { RecordReturnModal } from "@/components/returns/record-return-modal";
import { ReturnLog } from "@/types/return";

const INITIAL_RETURNS: ReturnLog[] = [
  {
    id: 1,
    returnNo: "RET-00045",
    tripNo: "TRP-00012",
    date: "02 Jun 2025 03:45 PM",
    totalReturned: 39,
    status: "Reconciled",
    vehicle: "Dhaka-TA-1234",
    driver: "Rahim Uddin",
    manager: "Karim Ahmed",
    cylinders: [
      { size: "12 KG", loaded: 100, delivered: 80, returnQty: 20, status: "Reconciled" },
      { size: "15 KG", loaded: 50, delivered: 40, returnQty: 10, status: "Reconciled" },
      { size: "18 KG", loaded: 25, delivered: 20, returnQty: 5, status: "Reconciled" },
      { size: "22 KG", loaded: 20, delivered: 18, returnQty: 2, status: "Reconciled" },
      { size: "35 KG", loaded: 10, delivered: 8, returnQty: 2, status: "Reconciled" },
    ],
  },
  {
    id: 2,
    returnNo: "RET-00044",
    tripNo: "TRP-00011",
    date: "02 Jun 2025 01:30 PM",
    totalReturned: 12,
    status: "Pending",
    vehicle: "Dhaka-TA-5678",
    driver: "Karimul Hasan",
    manager: "Monir Hossain",
    cylinders: [
      { size: "12 KG", loaded: 80, delivered: 70, returnQty: 10, status: "Pending" },
      { size: "15 KG", loaded: 40, delivered: 38, returnQty: 2, status: "Pending" },
    ],
  },
  {
    id: 3,
    returnNo: "RET-00043",
    tripNo: "TRP-00010",
    date: "01 Jun 2025 05:20 PM",
    totalReturned: 15,
    status: "Reconciled",
    vehicle: "Dhaka-TA-9999",
    driver: "Abul Kashem",
    manager: "Farhana Yasmin",
    cylinders: [
      { size: "12 KG", loaded: 120, delivered: 110, returnQty: 10, status: "Reconciled" },
      { size: "15 KG", loaded: 60, delivered: 55, returnQty: 5, status: "Reconciled" },
    ],
  },
  {
    id: 4,
    returnNo: "RET-00042",
    tripNo: "TRP-00009",
    date: "31 May 2025 02:10 PM",
    totalReturned: 8,
    status: "Pending",
    vehicle: "Dhaka-TA-2222",
    driver: "Rahim Uddin",
    manager: "Suresh Kumar",
    cylinders: [
      { size: "12 KG", loaded: 90, delivered: 85, returnQty: 5, status: "Pending" },
      { size: "15 KG", loaded: 45, delivered: 42, returnQty: 3, status: "Pending" },
    ],
  },
];

export default function ReturnsPage() {
  const [entries, setEntries] = useState<ReturnLog[]>(INITIAL_RETURNS);
  const [selectedReturn, setSelectedReturn] = useState<ReturnLog>(INITIAL_RETURNS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Listen for the header record action button event
  useEffect(() => {
    const handleOpen = () => {
      setIsModalOpen(true);
    };
    window.addEventListener("open-record-return-modal", handleOpen);
    return () => window.removeEventListener("open-record-return-modal", handleOpen);
  }, []);

  // Sync selected return details when entries change
  useEffect(() => {
    const found = entries.find((e) => e.id === selectedReturn.id);
    if (found) {
      setSelectedReturn(found);
    }
  }, [entries, selectedReturn.id]);

  const handleRecordReturnConfirm = (data: Omit<ReturnLog, "id" | "returnNo">) => {
    const nextId = entries.length > 0 ? Math.max(...entries.map((e) => e.id)) + 1 : 1;
    const returnNo = `RET-000${String(45 + nextId - 1).padStart(2, "0")}`;

    // Get current date time formatted
    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = String(now.getDate()).padStart(2, "0");
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const dateStr = `${day} ${month} ${year} ${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

    const newLog: ReturnLog = {
      id: nextId,
      returnNo,
      ...data,
      date: dateStr,
    };

    setEntries((prev) => [newLog, ...prev]);
    setSelectedReturn(newLog);
    setIsModalOpen(false);
  };

  const handleReconcile = (id: number) => {
    setEntries((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            status: "Reconciled",
            cylinders: e.cylinders.map((cyl) => ({ ...cyl, status: "Reconciled" })),
          };
        }
        return e;
      })
    );
  };

  // Filter return entries
  const filteredEntries = entries.filter((e) => {
    const query = searchQuery.toLowerCase();
    return (
      e.returnNo.toLowerCase().includes(query) ||
      e.tripNo.toLowerCase().includes(query) ||
      e.driver.toLowerCase().includes(query) ||
      e.manager.toLowerCase().includes(query) ||
      e.vehicle.toLowerCase().includes(query)
    );
  });

  // Dynamically compute stats from list
  const totalReturnsCount = entries.reduce((sum, e) => sum + e.totalReturned, 0);
  const returnedTodayCount = entries
    .filter((e) => e.date.includes("02 Jun 2025"))
    .reduce((sum, e) => sum + e.totalReturned, 0);
  const pendingReconciliationCount = entries
    .filter((e) => e.status === "Pending")
    .reduce((sum, e) => sum + e.totalReturned, 0);

  return (
    <div className="space-y-6 font-dm-sans pb-10">
      {/* Return Stats Cards */}
      <ReturnStats
        totalReturns={totalReturnsCount}
        returnedToday={returnedTodayCount}
        pendingReconciliation={pendingReconciliationCount}
      />

      {/* Side-by-Side Master-Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Returns List Directory (Col-span-4) */}
        <div className="lg:col-span-4">
          <ReturnsList
            entries={filteredEntries}
            selectedReturn={selectedReturn}
            onSelect={setSelectedReturn}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Right Side: Return Details Manifest & Actions (Col-span-8) */}
        <div className="lg:col-span-8">
          <ReturnDetail
            selectedReturn={selectedReturn}
            onReconcile={handleReconcile}
          />
        </div>

      </div>

      {/* Record Return Form Modal */}
      <RecordReturnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRecordReturnConfirm}
      />
    </div>
  );
}
