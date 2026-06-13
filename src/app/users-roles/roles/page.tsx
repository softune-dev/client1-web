"use client";

import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { PageHeader } from "@/components/common/page-header";
import { RoleStats } from "@/components/roles/role-stats";
import { RoleTable } from "@/components/roles/role-table";
import { RoleModal } from "@/components/roles/role-modal";
import { Role } from "@/types/role";

const INITIAL_ROLES: Role[] = [
  { id: 1, roleName: "Super Admin", description: "Full system access and configuration", status: "Active" },
  { id: 2, roleName: "Warehouse Manager", description: "Manage warehouse and inventory operations", status: "Active" },
  { id: 3, roleName: "Marketing Manager", description: "Manage trips, deliveries and retailers", status: "Active" },
  { id: 4, roleName: "Manager", description: "View reports and monitor operations", status: "Active" },
  { id: 5, roleName: "Operator", description: "Daily operations and data entry", status: "Active" },
];

export default function RolesSubpage() {
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handleAddClick = () => {
    setEditingRole(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (role: Role) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (confirm("Are you sure you want to delete this role? Any users bound to this role may lose access.")) {
      setRoles((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleSaveRole = (roleData: Omit<Role, "id"> & { id?: number }) => {
    if (editingRole) {
      // Edit mode
      setRoles((prev) =>
        prev.map((r) =>
          r.id === editingRole.id
            ? {
                ...r,
                ...roleData,
              }
            : r
        )
      );
    } else {
      // Add mode
      const nextId = roles.length > 0 ? Math.max(...roles.map((r) => r.id)) + 1 : 1;
      const newRole: Role = {
        ...roleData,
        id: nextId,
      };
      setRoles((prev) => [...prev, newRole]);
    }
    setIsModalOpen(false);
  };

  // Calculate stats
  const totalRoles = roles.length;
  const activeRoles = roles.filter((r) => r.status === "Active").length;
  const assignedUsers = 5; // representing the total registered accounts in the system

  // Header Actions
  const headerActions = (
    <button
      onClick={handleAddClick}
      className="inline-flex items-center justify-center gap-x-2 rounded-sm bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors focus:outline-none cursor-pointer font-dm-sans"
    >
      <FiPlus className="h-4 w-4" />
      Add Role
    </button>
  );

  return (
    <div className="space-y-6 pb-10 font-dm-sans">
      <PageHeader title="Roles" action={headerActions} />

      {/* Stats Cards Panel */}
      <RoleStats
        totalRoles={totalRoles}
        activeRoles={activeRoles}
        assignedUsers={assignedUsers}
      />

      {/* Directory Table */}
      <RoleTable
        roles={roles}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Add / Edit Form Modal */}
      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={editingRole}
        onSave={handleSaveRole}
      />
    </div>
  );
}
