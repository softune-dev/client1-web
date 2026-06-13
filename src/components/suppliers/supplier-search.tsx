"use client";

import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";

interface SupplierSearchProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Search input for filtering suppliers by name.
 * Renders a pill-shaped search bar with an icon prefix.
 */
export function SupplierSearch({ value, onChange }: SupplierSearchProps) {
  return (
    <div className="relative w-full max-w-xs">
      <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        id="supplier-search"
        type="search"
        placeholder="Search suppliers..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-lg bg-white pl-9 text-sm shadow-sm"
      />
    </div>
  );
}
