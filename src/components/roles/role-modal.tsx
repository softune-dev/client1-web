"use client";

import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Role } from "@/types/role";

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
  onSave: (roleData: Omit<Role, "id"> & { id?: number }) => void;
}

export function RoleModal({ isOpen, onClose, role, onSave }: RoleModalProps) {
  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    status: "Active" as "Active" | "Inactive",
  });

  useEffect(() => {
    if (isOpen) {
      if (role) {
        setFormData({
          roleName: role.roleName,
          description: role.description,
          status: role.status,
        });
      } else {
        setFormData({
          roleName: "",
          description: "",
          status: "Active",
        });
      }
    }
  }, [isOpen, role]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = formData.roleName.trim();
    const cleanDesc = formData.description.trim();

    if (!cleanName || !cleanDesc) {
      alert("Please fill in all fields correctly.");
      return;
    }

    onSave({
      roleName: cleanName,
      description: cleanDesc,
      status: formData.status,
    });
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 dark:border-border/50">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-foreground">
            {role ? "Edit Role Details" : "Create New Role"}
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Role Name */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.roleName}
              onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
              placeholder="Role Name (e.g. Super Admin)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Role Description (e.g. Full system access and configuration)"
              className="w-full rounded-md border border-[#CBD5E1] bg-transparent p-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans resize-none"
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Inactive" })}
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-x-2 pt-4 border-t border-[#F1F5F9] dark:border-border/50">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded-md border border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer dark:border-border dark:text-muted-foreground dark:hover:bg-muted/30"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 px-4 rounded-md bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xs font-bold transition-colors cursor-pointer"
            >
              {role ? "Save Changes" : "Add Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
