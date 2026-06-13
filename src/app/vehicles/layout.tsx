"use client";

import { PageHeader } from "@/components/common/page-header";
import { PlusIcon } from "lucide-react";

export default function VehiclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleAddClick = () => {
    window.dispatchEvent(new CustomEvent("open-add-vehicle-modal"));
  };

  const actionButton = (
    <button
      onClick={handleAddClick}
      className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors focus:outline-none shadow-sm cursor-pointer font-dm-sans"
    >
      <PlusIcon className="h-4 w-4" />
      Add Vehicle
    </button>
  );

  return (
    <div className="flex flex-col gap-0 font-dm-sans">
      <PageHeader title="Vehicles" action={actionButton} />
      {children}
    </div>
  );
}

