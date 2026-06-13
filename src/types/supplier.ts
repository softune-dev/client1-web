/**
 * Supplier module type definitions.
 */

export type SupplierStatus = "active" | "inactive";

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phoneNumber: string;
  address: string;
  status: SupplierStatus;
}

export interface SupplierFormData {
  name: string;
  contactPerson: string;
  phoneNumber: string;
  address: string;
  status: SupplierStatus;
}

export interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

export interface SupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier?: Supplier | null;
  onSubmit: (data: SupplierFormData) => void;
}

export interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplierName: string;
  onConfirm: () => void;
}
