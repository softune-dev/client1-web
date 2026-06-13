"use client";

import React, { useState, useEffect } from "react";
import { ReportStats } from "@/components/reports/report-stats";
import { ReportFilters } from "@/components/reports/report-filters";
import { ReportTable } from "@/components/reports/report-table";
import { ReportEntry } from "@/types/report";

const INITIAL_REPORT: ReportEntry[] = [
  { id: 1, size: "12 KG", opening: 1000, received: 220, distributed: 80, returned: 20, closing: 1120 },
  { id: 2, size: "15 KG", opening: 700, received: 150, distributed: 60, returned: 10, closing: 780 },
  { id: 3, size: "18 KG", opening: 400, received: 100, distributed: 30, returned: 5, closing: 465 },
  { id: 4, size: "22 KG", opening: 300, received: 50, distributed: 10, returned: 5, closing: 335 },
];

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportEntry[]>(INITIAL_REPORT);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSize, setSelectedSize] = useState("All Sizes");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Listen for Export PDF / Download Report triggers from layout.tsx
  useEffect(() => {
    const handleExport = () => {
      alert("Exporting Inventory Report summary as PDF...");
    };
    const handleDownload = () => {
      alert("Downloading full Inventory Report CSV...");
    };

    window.addEventListener("export-pdf", handleExport);
    window.addEventListener("download-report", handleDownload);

    return () => {
      window.removeEventListener("export-pdf", handleExport);
      window.removeEventListener("download-report", handleDownload);
    };
  }, []);

  // Filter
  const filteredData = reportData.filter((entry) => {
    const matchesSize = selectedSize === "All Sizes" || entry.size === selectedSize;
    const matchesSearch = entry.size.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSize && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const visibleData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Dynamic Stats Calculations
  const totalOpening = filteredData.reduce((sum, item) => sum + item.opening, 0);
  const totalReceived = filteredData.reduce((sum, item) => sum + item.received, 0);
  const totalDistributed = filteredData.reduce((sum, item) => sum + item.distributed, 0);
  const totalClosing = filteredData.reduce((sum, item) => sum + item.closing, 0);

  return (
    <div className="space-y-6 pb-10 font-dm-sans">
      {/* Stats Cards Row */}
      <ReportStats
        totalOpening={totalOpening}
        totalReceived={totalReceived}
        totalDistributed={totalDistributed}
        totalClosing={totalClosing}
      />

      {/* Filter Options Row */}
      <ReportFilters
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        selectedSize={selectedSize}
        onSizeChange={(s) => {
          setSelectedSize(s);
          setCurrentPage(1);
        }}
      />

      {/* Summary Table Card */}
      <ReportTable
        visibleData={visibleData}
        filteredCount={filteredData.length}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
}

