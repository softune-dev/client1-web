"use client";

import { PageHeader } from "@/components/common/page-header";
import { PlusIcon } from "lucide-react";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleAddClick = () => {
    window.dispatchEvent(new CustomEvent("open-add-product-modal"));
  };

  const actionButton = (
    <button
      onClick={handleAddClick}
      className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-3.5 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors focus:outline-none shadow-xs cursor-pointer"
    >
      <PlusIcon className="h-4 w-4" />
      Add Product
    </button>
  );

  return (
    <div className="flex flex-col gap-0 font-dm-sans">
      <PageHeader title="Products" action={actionButton} />
      {children}
    </div>
  );
}
