import type { Metadata } from "next";
import { SupplierPageContent } from "@/components/suppliers/supplier-page-content";

/**
 * Suppliers page metadata for SEO.
 */
export const metadata: Metadata = {
  title: "Suppliers",
  description:
    "Manage LPG suppliers, view contact details, and track vendor relationships for Bhoumic Enterprise.",
};

/**
 * SuppliersPage — Server Component entry point.
 */
export default function SuppliersPage() {
  return <SupplierPageContent />;
}
