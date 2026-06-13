"use client";

import { PageHeader } from "@/components/common/page-header";
import { PlusIcon } from "lucide-react";

export default function SuppliersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleAddClick = () => {
    window.dispatchEvent(new CustomEvent("open-add-modal"));
  };

  const actionButton = (
    <button
      onClick={handleAddClick}
      className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-3.5 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors focus:outline-none shadow-xs cursor-pointer"
    >
      <PlusIcon className="h-4 w-4" />
      Add Supplier
    </button>
  );

  return (
    <div className="flex flex-col gap-0">
      <PageHeader title="Suppliers" action={actionButton} />
      {children}
    </div>
  );
}
