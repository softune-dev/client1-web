"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FiAlertTriangle } from "react-icons/fi";
import { type DeleteConfirmDialogProps } from "@/types/supplier";

/**
 * DeleteConfirmDialog — confirmation modal before deleting a supplier..
 */
export function DeleteConfirmDialog({
  open,
  onOpenChange,
  supplierName,
  onConfirm,
}: DeleteConfirmDialogProps) {
  function handleConfirm() {
    onConfirm();
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
            "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2",
            "rounded-xl border border-border bg-white p-6 shadow-2xl",
            "transition duration-200 data-ending-style:opacity-0 data-ending-style:scale-95 data-starting-style:opacity-0 data-starting-style:scale-95"
          )}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Warning icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <FiAlertTriangle className="h-6 w-6 text-destructive" />
            </div>

            <div className="space-y-2">
              <DialogPrimitive.Title className="text-lg font-semibold text-foreground">
                Delete Supplier
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm text-muted-foreground">
                Are you sure you want to delete{" "}
                <span className="font-medium text-foreground">
                  {supplierName}
                </span>
                ? This action cannot be undone.
              </DialogPrimitive.Description>
            </div>

            <div className="flex w-full items-center justify-center gap-3 pt-2">
              <DialogPrimitive.Close
                render={
                  <Button variant="outline" size="lg" className="min-w-[100px]">
                    Cancel
                  </Button>
                }
              />
              <Button
                variant="destructive"
                size="lg"
                className="min-w-[100px] bg-destructive text-white hover:bg-destructive/90"
                onClick={handleConfirm}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
