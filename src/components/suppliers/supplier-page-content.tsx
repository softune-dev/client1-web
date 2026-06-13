"use client";

import * as React from "react";
import { FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { SupplierSearch } from "@/components/suppliers/supplier-search";
import { SupplierTable } from "@/components/suppliers/supplier-table";
import { SupplierDialog } from "@/components/suppliers/supplier-dialog";
import { DeleteConfirmDialog } from "@/components/suppliers/delete-confirm-dialog";
import { MOCK_SUPPLIERS } from "@/constants/suppliers";
import {
  type Supplier,
  type SupplierFormData,
} from "@/types/supplier";

/**
 * SupplierPageContent — client-side interactive wrapper.
 *
 */
export function SupplierPageContent() {
  const [suppliers, setSuppliers] = React.useState<Supplier[]>(MOCK_SUPPLIERS);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedSupplier, setSelectedSupplier] =
    React.useState<Supplier | null>(null);

  // Filter suppliers by search query
  const filteredSuppliers = React.useMemo(() => {
    if (!searchQuery.trim()) return suppliers;
    const query = searchQuery.toLowerCase();
    return suppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.contactPerson.toLowerCase().includes(query) ||
        s.phoneNumber.includes(query) ||
        s.address.toLowerCase().includes(query)
    );
  }, [suppliers, searchQuery]);

  // ─── Handlers ───

  function handleAddSupplier() {
    setSelectedSupplier(null);
    setDialogOpen(true);
  }

  function handleEditSupplier(supplier: Supplier) {
    setSelectedSupplier(supplier);
    setDialogOpen(true);
  }

  function handleDeleteSupplier(supplier: Supplier) {
    setSelectedSupplier(supplier);
    setDeleteDialogOpen(true);
  }

  function handleFormSubmit(data: SupplierFormData) {
    if (selectedSupplier) {
      // Update existing supplier
      setSuppliers((prev) =>
        prev.map((s) =>
          s.id === selectedSupplier.id ? { ...s, ...data } : s
        )
      );
    } else {
      // Create new supplier
      const newSupplier: Supplier = {
        id: `sup-${Date.now()}`,
        ...data,
      };
      setSuppliers((prev) => [...prev, newSupplier]);
    }
    setSelectedSupplier(null);
  }

  function handleConfirmDelete() {
    if (selectedSupplier) {
      setSuppliers((prev) =>
        prev.filter((s) => s.id !== selectedSupplier.id)
      );
      setSelectedSupplier(null);
    }
  }

  return (
    <>
      {/* ─── Toolbar: Search + Add Button ─── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SupplierSearch value={searchQuery} onChange={setSearchQuery} />

        <Button
          id="add-supplier-btn"
          onClick={handleAddSupplier}
          className="shrink-0 gap-1.5"
          size="lg"
        >
          <FiPlus className="h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      {/* ─── Data Table ─── */}
      <div className="mt-6">
        <SupplierTable
          suppliers={filteredSuppliers}
          onEdit={handleEditSupplier}
          onDelete={handleDeleteSupplier}
        />
      </div>

      {/* ─── Add/Edit Dialog ─── */}
      <SupplierDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        supplier={selectedSupplier}
        onSubmit={handleFormSubmit}
      />

      {/* ─── Delete Confirmation ─── */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        supplierName={selectedSupplier?.name ?? ""}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
