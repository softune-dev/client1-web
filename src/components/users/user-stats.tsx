"use client";

import React from "react";
import { FiUsers, FiUserCheck, FiShield } from "react-icons/fi";

interface UserStatsProps {
  totalUsers: number;
  activeUsers: number;
  totalRoles: number;
}

export function UserStats({ totalUsers, activeUsers, totalRoles }: UserStatsProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
      {/* Total Users */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400">
          <FiUsers className="h-8 w-8" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Total Users
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {totalUsers}
          </span>
        </div>
      </div>

      {/* Active Users */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#ECFDF5] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400">
          <FiUserCheck className="h-8 w-8" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            Active Users
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {activeUsers}
          </span>
        </div>
      </div>

      {/* System Roles */}
      <div className="flex items-center gap-x-5 rounded-sm border border-[#E2E8F0] bg-white p-6 dark:border-border dark:bg-card">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] bg-[#F5F3FF] text-[#7C3AED] dark:bg-violet-950/30 dark:text-violet-400">
          <FiShield className="h-8 w-8" />
        </div>
        <div className="flex flex-col min-w-0 font-dm-sans">
          <span className="text-[13px] font-medium text-[#475569] dark:text-slate-300">
            System Roles
          </span>
          <span className="text-3xl font-semibold text-[#0F172A] dark:text-foreground leading-none mt-1.5 mb-1 font-sans">
            {totalRoles}
          </span>
        </div>
      </div>
    </div>
  );
}
