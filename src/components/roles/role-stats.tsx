"use client";

import React from "react";
import { FiShield, FiUserCheck, FiUsers } from "react-icons/fi";

interface RoleStatsProps {
  totalRoles: number;
  activeRoles: number;
  assignedUsers: number;
}

export function RoleStats({ totalRoles, activeRoles, assignedUsers }: RoleStatsProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
      {/* Total Roles */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#F5F3FF] text-[#7C3AED] dark:bg-violet-950/30 dark:text-violet-400">
          <FiShield className="h-8 w-8" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Total Roles
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {totalRoles}
          </span>
        </div>
      </div>

      {/* Active Roles */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
          <FiUserCheck className="h-8 w-8" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Active Roles
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {activeRoles}
          </span>
        </div>
      </div>

      {/* Assigned Users */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          <FiUsers className="h-8 w-8" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Assigned Users
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {assignedUsers}
          </span>
        </div>
      </div>
    </div>
  );
}
