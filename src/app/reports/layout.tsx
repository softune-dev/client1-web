"use client";

import { PageHeader } from "@/components/common/page-header";
import { FileText, Download } from "lucide-react";

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleExportPDF = () => {
    window.dispatchEvent(new CustomEvent("export-pdf"));
  };

  const handleDownloadReport = () => {
    window.dispatchEvent(new CustomEvent("download-report"));
  };

  const actionButtons = (
    <div className="flex items-center gap-x-3 font-dm-sans">
      <button
        onClick={handleExportPDF}
        className="inline-flex items-center justify-center gap-x-2 rounded-sm border border-[#CBD5E1] bg-white px-4 py-3 text-sm font-semibold text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] transition-colors focus:outline-none cursor-pointer dark:border-border dark:bg-card dark:text-muted-foreground dark:hover:bg-muted/30"
      >
        <FileText className="h-4 w-4" />
        Export PDF
      </button>
      <button
        onClick={handleDownloadReport}
        className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors focus:outline-none cursor-pointer"
      >
        <Download className="h-4 w-4" />
        Download Report
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-0 font-dm-sans">
      <PageHeader title="Reports" action={actionButtons} />
      {children}
    </div>
  );
}
