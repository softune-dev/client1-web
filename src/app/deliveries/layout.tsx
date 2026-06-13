"use client";

import { PageHeader } from "@/components/common/page-header";
import { PlusIcon } from "lucide-react";

export default function DeliveriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleRecordClick = () => {
    window.dispatchEvent(new CustomEvent("open-record-delivery-modal"));
  };

  const actionButton = (
    <button
      onClick={handleRecordClick}
      className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors focus:outline-none cursor-pointer font-dm-sans"
    >
      <PlusIcon className="h-4 w-4" />
      Record Delivery
    </button>
  );

  return (
    <div className="flex flex-col gap-0 font-dm-sans">
      <PageHeader title="Deliveries" action={actionButton} />
      {children}
    </div>
  );
}

