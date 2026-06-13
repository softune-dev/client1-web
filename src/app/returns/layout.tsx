"use client";

import { PageHeader } from "@/components/common/page-header";
import { PlusIcon } from "lucide-react";

export default function ReturnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleRecordReturnClick = () => {
    window.dispatchEvent(new CustomEvent("open-record-return-modal"));
  };

  const actionButton = (
    <button
      onClick={handleRecordReturnClick}
      className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-3.5 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors focus:outline-none shadow-xs cursor-pointer"
    >
      <PlusIcon className="h-4 w-4" />
      Record Return
    </button>
  );

  return (
    <div className="flex flex-col gap-0 font-dm-sans">
      <PageHeader title="Returns" action={actionButton} />
      {children}
    </div>
  );
}
