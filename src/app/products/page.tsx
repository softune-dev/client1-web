"use client";

import { useState, useEffect, useMemo } from "react";
import { ProductStats } from "@/components/products/product-stats";
import { ProductTable } from "@/components/products/product-table";
import { ProductModal } from "@/components/products/product-modal";
import { Product } from "@/types/product";
import { FiFilter } from "react-icons/fi";

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Bashundhara", size: "12 KG", status: "Active", sales: 8450 },
  { id: 2, name: "Bashundhara", size: "30 KG", status: "Active", sales: 8450 },
  { id: 3, name: "Bashundhara", size: "45 KG", status: "Active", sales: 8450 },
  { id: 4, name: "Total", size: "12 KG", status: "Active", sales: 8450 },
  { id: 5, name: "Total", size: "17 KG", status: "Active", sales: 8450 },
  { id: 6, name: "Total", size: "22 KG", status: "Active", sales: 8450 },
  { id: 7, name: "Fresh", size: "12 KG", status: "Active", sales: 8450 },
  { id: 8, name: "Fresh", size: "35 KG", status: "Active", sales: 8450 },
  { id: 9, name: "Fresh", size: "45 KG", status: "Active", sales: 8450 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizeFilter, setSizeFilter] = useState("All Sizes");
  const itemsPerPage = 5;

  // Dynamically extract unique sizes from products and sort them numerically
  const uniqueSizes = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.size))).sort((a, b) => {
      const numA = parseInt(a) || 0;
      const numB = parseInt(b) || 0;
      return numA - numB;
    });
  }, [products]);

  // Reset filter if the active filter size is no longer present in products
  useEffect(() => {
    if (sizeFilter !== "All Sizes" && !uniqueSizes.includes(sizeFilter)) {
      setSizeFilter("All Sizes");
    }
  }, [sizeFilter, uniqueSizes]);

  // Filter products based on selected size
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      return sizeFilter === "All Sizes" || item.size === sizeFilter;
    });
  }, [products, sizeFilter]);

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
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredProducts.length, totalPages, currentPage]);

  return (
    <div className="space-y-5 font-sans pb-10">

      {/* Stats Cards Row */}
      <ProductStats
        totalSizes={products.length}
        activeSizes={activeSizesCount}
        disabledSizes={disabledSizesCount}
      />

      {/* Filter Dropdown */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-end">
        <p className="text-sm font-semibold ">Filter Products by Sizes</p>
        <div className="relative w-full sm:w-auto min-w-[100px] font-sans text-xs">
          <FiFilter className="absolute left-3 top-3 text-[#94A3B8]" />
          <select
            value={sizeFilter}
            onChange={(e) => {
              setSizeFilter(e.target.value);
              setCurrentPage(1); // Reset page on filter change
            }}
            className="h-9 w-full rounded-md border border-[#E2E8F0] bg-white dark:bg-card dark:border-border pl-9 pr-3 text-xs outline-none focus:border-[#2563EB] text-[#334155] dark:text-foreground appearance-none cursor-pointer font-semibold"
          >
            <option value="All Sizes">All Sizes</option>
            {uniqueSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Directory Card */}
      <ProductTable
        products={filteredProducts}
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
