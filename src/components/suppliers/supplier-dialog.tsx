"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type SupplierDialogProps, type SupplierFormData } from "@/types/supplier";

/**
 * SupplierDialog — modal form for creating and editing suppliers.
 *
 * Uses @base-ui/react Dialog primitives to stay consistent
 * with the project's ShadCN base-nova style
 */
export function SupplierDialog({
  open,
  onOpenChange,
  supplier,
  onSubmit,
}: SupplierDialogProps) {
  const isEditing = !!supplier;

  const [formData, setFormData] = React.useState<SupplierFormData>({
    name: "",
    contactPerson: "",
    phoneNumber: "",
    address: "",
    status: "active",
  });

  // Reset form when dialog opens or supplier changes
  React.useEffect(() => {
    if (open) {
      setFormData({
        name: supplier?.name ?? "",
        contactPerson: supplier?.contactPerson ?? "",
        phoneNumber: supplier?.phoneNumber ?? "",
        address: supplier?.address ?? "",
        status: supplier?.status ?? "active",
      });
    }
  }, [open, supplier]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
        />
        <DialogPrimitive.Popup
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
            "rounded-xl border border-border bg-white p-0 shadow-2xl",
            "transition duration-200 data-ending-style:opacity-0 data-ending-style:scale-95 data-starting-style:opacity-0 data-starting-style:scale-95"
          )}
        >
          {/* ─── Header ─── */}
          <div className="border-b border-border px-6 py-4">
            <DialogPrimitive.Title className="text-lg font-semibold text-foreground">
              {isEditing ? "Edit Supplier" : "Add Supplier"}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
              {isEditing
                ? "Update the supplier details below."
                : "Fill in the details to add a new LPG supplier."}
            </DialogPrimitive.Description>
          </div>

          {/* ─── Form ─── */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 px-6 py-5">
              {/* Supplier Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="supplier-name"
                  className="text-sm font-medium text-foreground"
                >
                  Supplier Name
                </label>
                <Input
                  id="supplier-name"
                  placeholder="e.g. Fresh, Boshundhara"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className="h-10"
                />
              </div>

              {/* Contact Person */}
              <div className="space-y-1.5">
                <label
                  htmlFor="supplier-contact"
                  className="text-sm font-medium text-foreground"
                >
                  Contact Person
                </label>
                <Input
                  id="supplier-contact"
                  placeholder="Full name"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactPerson: e.target.value,
                    }))
                  }
                  required
                  className="h-10"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label
                  htmlFor="supplier-phone"
                  className="text-sm font-medium text-foreground"
                >
                  Phone Number
                </label>
                <Input
                  id="supplier-phone"
                  placeholder="01XXXXXXXXX"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  required
                  className="h-10"
                />
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label
                  htmlFor="supplier-address"
                  className="text-sm font-medium text-foreground"
                >
                  Address
                </label>
                <Input
                  id="supplier-address"
                  placeholder="City, Country"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  required
                  className="h-10"
                />
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label
                  htmlFor="supplier-status"
                  className="text-sm font-medium text-foreground"
                >
                  Status
                </label>
                <select
                  id="supplier-status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as "active" | "inactive",
                    }))
                  }
                  className={cn(
                    "flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors",
                    "outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  )}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* ─── Footer ─── */}
            <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
              <DialogPrimitive.Close
                render={
                  <Button type="button" variant="outline" size="lg">
                    Cancel
                  </Button>
                }
              />
              <Button type="submit" size="lg">
                {isEditing ? "Save Changes" : "Add Supplier"}
              </Button>
            </div>
          </form>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
