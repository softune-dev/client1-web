"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { ReceiveStats } from "@/components/inventory/receive-stock/receive-stats";
import { ReceiveForm } from "@/components/inventory/receive-stock/receive-form";
import { ReceiveSummary } from "@/components/inventory/receive-stock/receive-summary";
import { ReceiveTable } from "@/components/inventory/receive-stock/receive-table";
import { Receipt } from "@/types/inventory";

const INITIAL_RECEIPTS: Receipt[] = [
  {
    id: 1,
    date: "02 Jun 2025, 10:30 AM",
    supplier: "Fresh LPG Depot",
    size: "12 KG",
    quantity: 100,
    receivedBy: "Super Admin",
    status: "Completed",
  },
  {
    id: 2,
    date: "02 Jun 2025, 09:45 AM",
    supplier: "Vehicle DHK-TA-1234",
    size: "15 KG",
    quantity: 60,
    receivedBy: "Karimul Hasan",
    status: "Completed",
  },
  {
    id: 3,
    date: "01 Jun 2025, 05:15 PM",
    supplier: "Bashundhara LPG Supply",
    size: "35 KG",
    quantity: 30,
    receivedBy: "Super Admin",
    status: "Completed",
  },
];

export default function ReceiveStockPage() {
  // Stats states
  const [totalStock, setTotalStock] = useState(2850);
  const [receivedToday, setReceivedToday] = useState(250);

  // Form states
  const [supplier, setSupplier] = useState("");
  const [cylinderSize, setCylinderSize] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [receiveDate, setReceiveDate] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");

  // Table receipts state
  const [receipts, setReceipts] = useState<Receipt[]>(INITIAL_RECEIPTS);

  // Date formatter helper to match "DD MMM YYYY, HH:MM AM/PM"
  const formatDateString = (dateStr: string) => {
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

  // Handle Save
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!supplier) {
      alert("Please select a supplier.");
      return;
    }
    if (!cylinderSize) {
      alert("Please select a cylinder size.");
      return;
    }
    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    if (!receiveDate) {
      alert("Please select a receive date.");
      return;
    }

    const formattedDate = formatDateString(receiveDate);

    const newReceipt: Receipt = {
      id: Date.now(),
      date: formattedDate,
      supplier: supplier,
      size: cylinderSize,
      quantity: Number(quantity),
      receivedBy: "Super Admin",
      status: "Completed",
    };

    setReceipts([newReceipt, ...receipts]);
    setTotalStock((prev) => prev + Number(quantity));
    setReceivedToday((prev) => prev + Number(quantity));

    // Clear form fields
    setSupplier("");
    setCylinderSize("");
    setQuantity("");
    setReceiveDate("");
    setReference("");
    setNotes("");
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => handleSave()}
        className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors shadow-xs cursor-pointer border-none font-dm-sans"
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
          <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
        Save All
      </button>
    </div>
  );

  return (
    <div className="space-y-6 font-dm-sans pb-10">
      <PageHeader title="Inventory" action={headerActions} />

      {/* Stats Cards Row */}
      <ReceiveStats totalStock={totalStock} receivedToday={receivedToday} />

      {/* Form and Summary Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReceiveForm
            supplier={supplier}
            cylinderSize={cylinderSize}
            quantity={quantity}
            receiveDate={receiveDate}
            reference={reference}
            notes={notes}
            setSupplier={setSupplier}
            setCylinderSize={setCylinderSize}
            setQuantity={setQuantity}
            setReceiveDate={setReceiveDate}
            setReference={setReference}
            setNotes={setNotes}
            onSubmit={handleSave}
          />
        </div>
        <div className="lg:col-span-1">
          <ReceiveSummary
            supplier={supplier}
            cylinderSize={cylinderSize}
            quantity={quantity}
          />
        </div>
      </div>

      {/* Recent Received Stock Table Card */}
      <ReceiveTable receipts={receipts} />
    </div>
  );
}
