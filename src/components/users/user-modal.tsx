"use client";

import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { User } from "@/types/user";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (userData: Omit<User, "id"> & { id?: number }) => void;
}

const ROLES = ["Super Admin", "Warehouse Manager", "Marketing Manager", "Manager", "Operator"];

export function UserModal({ isOpen, onClose, user, onSave }: UserModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    role: ROLES[0],
    phoneNumber: "",
    status: "Active" as "Active" | "Inactive",
  });

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setFormData({
          fullName: user.fullName,
          username: user.username,
          role: user.role,
          phoneNumber: user.phoneNumber,
          status: user.status,
        });
      } else {
        setFormData({
          fullName: "",
          username: "",
          role: ROLES[0],
          phoneNumber: "",
          status: "Active",
        });
      }
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = formData.fullName.trim();
    const cleanUsername = formData.username.trim();
    const cleanPhone = formData.phoneNumber.trim();

    if (!cleanName || !cleanUsername || !cleanPhone) {
      alert("Please fill in all fields correctly.");
      return;
    }

    onSave({
      fullName: cleanName,
      username: cleanUsername,
      role: formData.role,
      phoneNumber: cleanPhone,
      status: formData.status,
    });
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/55 backdrop-blur-xs font-dm-sans">
      <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-lg dark:border-border dark:bg-card">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4 dark:border-border/50">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-foreground">
            {user ? "Edit User Profile" : "Register New User"}
          </h3>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-foreground cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Full Name (e.g. Super Admin)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Username */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Username (e.g. superadmin)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
            />
          </div>

          {/* Role */}
          <div className="space-y-1">
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-white dark:bg-card px-2.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold"
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <input
              type="text"
              required
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="Phone Number (e.g. 01712345678)"
              className="h-9 w-full rounded-md border border-[#CBD5E1] bg-transparent px-3 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold font-sans"
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
              {user ? "Save Changes" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
