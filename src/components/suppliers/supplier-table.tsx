"use client";

import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type SupplierTableProps } from "@/types/supplier";

/**
 * SupplierTable — renders the supplier data grid.
 *
 * Matches the reference design with:
 * - Numbered rows
 * - Status badges (Active / Inactive)
 * - Edit & Delete action buttons
 * - Clean white card background with subtle borders
 */
export function SupplierTable({ suppliers, onEdit, onDelete }: SupplierTableProps) {
  if (suppliers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-white p-12 text-center text-muted-foreground">
        No suppliers found. Add your first supplier to get started.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-[#F8FAFC]">
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                #
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Supplier Name
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Contact Person
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Phone Number
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Address
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {suppliers.map((supplier, index) => (
              <tr
                key={supplier.id}
                className="transition-colors duration-150 hover:bg-[#F8FAFC]/60"
              >
                <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 font-medium text-foreground">
                  {supplier.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-foreground">
                  {supplier.contactPerson}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-foreground">
                  {supplier.phoneNumber}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-foreground">
                  {supplier.address}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      supplier.status === "active"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                        : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                    )}
                  >
                    {supplier.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <div className="flex items-center gap-1">
                    <Button
                      id={`edit-supplier-${supplier.id}`}
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onEdit(supplier)}
                      aria-label={`Edit ${supplier.name}`}
                      className="text-[#2563EB] hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      id={`delete-supplier-${supplier.id}`}
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onDelete(supplier)}
                      aria-label={`Delete ${supplier.name}`}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── Footer / Entry Count ─── */}
      <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
        <span>
          Showing 1 to {suppliers.length} of {suppliers.length} entries
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            disabled
            className="text-xs"
            aria-label="Previous page"
          >
            &lt;
          </Button>
          <Button
            variant="default"
            size="icon-sm"
            className="text-xs"
            aria-label="Page 1"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            disabled
            className="text-xs"
            aria-label="Next page"
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
