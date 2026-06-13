"use client";

import React, { useState, useEffect } from "react";
import { ProductStats } from "@/components/products/product-stats";
import { ProductTable } from "@/components/products/product-table";
import { ProductModal } from "@/components/products/product-modal";
import { Product } from "@/types/product";

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Standard LPG", size: "12 KG", status: "Active", sales: 8450 },
  {
    id: 2,
    name: "Commercial LPG",
    size: "15 KG",
    status: "Active",
    sales: 4120,
  },
  {
    id: 3,
    name: "Industrial LPG",
    size: "35 KG",
    status: "Active",
    sales: 1840,
  },
  {
    id: 4,
    name: "Industrial LPG",
    size: "45 KG",
    status: "Active",
    sales: 950,
  },
  { id: 5, name: "Standard LPG", size: "18 KG", status: "Inactive", sales: 0 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Listen to header click event dispatched from layout.tsx
  useEffect(() => {
    const handleOpen = () => {
      setEditingProduct(null);
      setIsModalOpen(true);
    };

    window.addEventListener("open-add-product-modal", handleOpen);
    return () =>
      window.removeEventListener("open-add-product-modal", handleOpen);
  }, []);

  // Save / Edit Product
  const handleSave = (productData: Omit<Product, "id" | "sales"> & { id?: number }) => {
    if (editingProduct) {
      // Edit mode
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...productData,
              }
            : p,
        ),
      );
    } else {
      // Add mode
      const newId =
        products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      const newProduct: Product = {
        id: newId,
        ...productData,
        sales: 0,
      };
      setProducts((prev) => [...prev, newProduct]);
    }

    setIsModalOpen(false);
  };

  // Open Edit Modal
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Delete Product
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product size?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Stats
  const activeSizesCount = products.filter((p) => p.status === "Active").length;
  const disabledSizesCount = products.filter((p) => p.status === "Inactive").length;

  // Auto-adjust current page if items shrink
  const totalPages = Math.ceil(products.length / itemsPerPage);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [products.length, totalPages, currentPage]);

  return (
    <div className="space-y-6 font-sans pb-10">
      {/* Stats Cards Row */}
      <ProductStats
        totalSizes={products.length}
        activeSizes={activeSizesCount}
        disabledSizes={disabledSizesCount}
      />

      {/* Table Directory Card */}
      <ProductTable
        products={products}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={(p) => setCurrentPage(p)}
      />

      {/* Add / Edit Form Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleSave}
      />
    </div>
  );
}
