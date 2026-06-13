"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SecuritySettingsProps {
  currentPassword: string;
  setCurrentPassword: (v: string) => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  twoFactor: boolean;
  setTwoFactor: (v: boolean) => void;
}

export function SecuritySettings({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  twoFactor,
  setTwoFactor,
}: SecuritySettingsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-foreground">
          Change Password
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#475569] dark:text-slate-300">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-[#E2E8F0] bg-transparent px-3.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#475569] dark:text-slate-300">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-[#E2E8F0] bg-transparent px-3.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-[#475569] dark:text-slate-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-[#E2E8F0] bg-transparent px-3.5 text-sm transition-colors focus:border-[#2563EB] outline-none dark:border-border text-[#334155] dark:text-foreground font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Two-Factor Section */}
      <div className="space-y-4 pt-6 border-t border-[#F1F5F9] dark:border-border/50">
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-foreground">
          Two-Factor Authentication (2FA)
        </h3>
        <div className="flex items-center justify-between max-w-xl">
          <div className="flex flex-col min-w-0 pr-4">
            <span className="text-sm font-bold text-[#0F172A] dark:text-foreground">Enable 2FA</span>
            <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">Protect your account with an extra security layer</p>
          </div>
          <button
            type="button"
            onClick={() => setTwoFactor(!twoFactor)}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              twoFactor ? "bg-[#2563EB]" : "bg-slate-200 dark:bg-muted"
            )}
          >
            <span className={cn("pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out", twoFactor ? "translate-x-5" : "translate-x-0")} />
          </button>
        </div>
      </div>
    </div>
  );
}
