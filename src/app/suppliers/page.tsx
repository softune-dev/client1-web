"use client";

import React, { useState, useEffect } from "react";
import { SupplierTable } from "@/components/suppliers/supplier-table";
import { SupplierModal } from "@/components/suppliers/supplier-modal";
import { Supplier } from "@/types/supplier";

const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 1,
    name: "Fresh LPG",
    contactPerson: "Rezaul Karim",
    phoneNumber: "+880 1712-345678",
    address: "Plot 12, Road 4, Sector 3, Uttara, Dhaka",
    status: "Active",
    logo: "",
  },
  {
    id: 2,
    name: "Boshundhara LP Gas",
    contactPerson: "Mofizul Islam",
    phoneNumber: "+880 1819-987654",
    address: "Boshundhara Industrial Area, Keraniganj, Dhaka",
    status: "Active",
    logo: "",
  },
  {
    id: 3,
    name: "Total Gas Bangladesh",
    contactPerson: "Sajid Rahman",
    phoneNumber: "+880 1911-554433",
    address: "House 45, Road 11, Banani, Dhaka",
    status: "Inactive",
    logo: "",
  },
];

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  // Listen to header click event dispatched from layout.tsx
  useEffect(() => {
    const handleOpen = () => {
      setEditingSupplier(null);
      setIsModalOpen(true);
    };

    window.addEventListener("open-add-modal", handleOpen);
    return () => window.removeEventListener("open-add-modal", handleOpen);
  }, []);

  // Save / Add Supplier
  const handleSave = (supplierData: Omit<Supplier, "id"> & { id?: number }) => {
    if (editingSupplier) {
      // Edit Supplier
      setSuppliers((prev) =>
        prev.map((s) =>
          s.id === editingSupplier.id
            ? {
                ...s,
                ...supplierData,
              }
            : s
        )
      );
    } else {
      // Add Supplier
      const newId = suppliers.length > 0 ? Math.max(...suppliers.map((s) => s.id)) + 1 : 1;
      const newSupplier: Supplier = {
        id: newId,
        ...supplierData,
      };
      setSuppliers((prev) => [...prev, newSupplier]);
    }

    setIsModalOpen(false);
  };

  // Open Edit Modal
  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  // Delete Supplier
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this supplier?")) {
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Auto-adjust current page if items shrink
  const totalPages = Math.ceil(suppliers.length / itemsPerPage);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [suppliers.length, totalPages, currentPage]);

  return (
    <div className="space-y-6 font-dm-sans pb-10">
      <SupplierTable
        suppliers={suppliers}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={(p) => setCurrentPage(p)}
      />

      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        supplier={editingSupplier}
        onSave={handleSave}
      />
    </div>
  );
}
