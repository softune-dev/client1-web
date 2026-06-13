"use client";

import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { PageHeader } from "@/components/common/page-header";
import { UserStats } from "@/components/users/user-stats";
import { UserTable } from "@/components/users/user-table";
import { UserModal } from "@/components/users/user-modal";
import { User } from "@/types/user";

const INITIAL_USERS: User[] = [
  { id: 1, fullName: "Super Admin", username: "superadmin", role: "Super Admin", phoneNumber: "01712345678", status: "Active" },
  { id: 2, fullName: "Warehouse Manager", username: "warehouse1", role: "Warehouse Manager", phoneNumber: "01812345678", status: "Active" },
  { id: 3, fullName: "Marketing Manager", username: "marketing1", role: "Marketing Manager", phoneNumber: "01912345678", status: "Active" },
  { id: 4, fullName: "Manager", username: "manager1", role: "Manager", phoneNumber: "01612345678", status: "Active" },
  { id: 5, fullName: "Operator", username: "operator1", role: "Operator", phoneNumber: "01512345678", status: "Active" },
];

export default function UsersSubpage() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddClick = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (confirm("Are you sure you want to delete this user profile?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleSaveUser = (userData: Omit<User, "id"> & { id?: number }) => {
    if (editingUser) {
      // Edit mode
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                ...userData,
              }
            : u
        )
      );
    } else {
      // Add mode
      const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser: User = {
        ...userData,
        id: nextId,
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setIsModalOpen(false);
  };

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  // Get unique roles count
  const totalRoles = new Set(users.map((u) => u.role)).size;

  // Header Actions
  const headerActions = (
    <button
      onClick={handleAddClick}
      className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors focus:outline-none cursor-pointer font-dm-sans"
    >
      <FiPlus className="h-4 w-4" />
      Add User
    </button>
  );

  return (
    <div className="space-y-6 pb-10 font-dm-sans">
      <PageHeader title="Users" action={headerActions} />

      {/* Stats Cards Panel */}
      <UserStats
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        totalRoles={totalRoles}
      />

      {/* Directory Table */}
      <UserTable
        users={users}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Add / Edit Form Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={editingUser}
        onSave={handleSaveUser}
      />
    </div>
  );
}
