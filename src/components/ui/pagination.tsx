import React from "react";
import { cn } from "@/lib/utils";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between border-t border-[#F1F5F9] dark:border-border/50 pt-4 mt-4 gap-y-2 text-xs font-sans", className)}>
      <span className="text-[#64748B] dark:text-muted-foreground">
        Showing <span className="font-semibold text-[#0F172A] dark:text-foreground">{totalItems > 0 ? startItem : 0}</span> to{" "}
        <span className="font-semibold text-[#0F172A] dark:text-foreground">{endItem}</span> of{" "}
        <span className="font-semibold text-[#0F172A] dark:text-foreground">{totalItems}</span> entries
      </span>

      <div className="flex items-center gap-x-1.5">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#64748B] dark:border-border dark:bg-card dark:text-muted-foreground dark:hover:bg-muted/30 cursor-pointer transition-colors disabled:cursor-not-allowed"
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>

        {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold transition-all duration-200 cursor-pointer",
              currentPage === page
                ? "bg-[#2563EB] text-white"
                : "border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 dark:border-border dark:bg-card dark:text-muted-foreground dark:hover:bg-muted/30"
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages || 1))}
          disabled={currentPage === (totalPages || 1)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#64748B] dark:border-border dark:bg-card dark:text-muted-foreground dark:hover:bg-muted/30 cursor-pointer transition-colors disabled:cursor-not-allowed"
        >
          <FiChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
