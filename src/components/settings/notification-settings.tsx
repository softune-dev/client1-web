"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NotificationSettingsProps {
  emailAlerts: boolean;
  setEmailAlerts: (v: boolean) => void;
  pushAlerts: boolean;
  setPushAlerts: (v: boolean) => void;
  weeklyReports: boolean;
  setWeeklyReports: (v: boolean) => void;
}

export function NotificationSettings({
  emailAlerts,
  setEmailAlerts,
  pushAlerts,
  setPushAlerts,
  weeklyReports,
  setWeeklyReports,
}: NotificationSettingsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-[#0F172A] dark:text-foreground">
        Notification Subscriptions
      </h3>
      
      <div className="space-y-6 max-w-xl">
        {/* Email Alerts */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0 pr-4">
            <span className="text-sm font-bold text-[#0F172A] dark:text-foreground">Email Alerts</span>
            <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">Receive reports and receipts by email</p>
          </div>
          <button
            type="button"
            onClick={() => setEmailAlerts(!emailAlerts)}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              emailAlerts ? "bg-[#2563EB]" : "bg-slate-200 dark:bg-muted"
            )}
          >
            <span className={cn("pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out", emailAlerts ? "translate-x-5" : "translate-x-0")} />
          </button>
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0 pr-4">
            <span className="text-sm font-bold text-[#0F172A] dark:text-foreground">Push Notifications</span>
            <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">Receive immediate system push alerts</p>
          </div>
          <button
            type="button"
            onClick={() => setPushAlerts(!pushAlerts)}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              pushAlerts ? "bg-[#2563EB]" : "bg-slate-200 dark:bg-muted"
            )}
          >
            <span className={cn("pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out", pushAlerts ? "translate-x-5" : "translate-x-0")} />
          </button>
        </div>

        {/* Weekly Digest */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0 pr-4">
            <span className="text-sm font-bold text-[#0F172A] dark:text-foreground">Weekly Digest</span>
            <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">Receive weekly database summary logs</p>
          </div>
          <button
            type="button"
            onClick={() => setWeeklyReports(!weeklyReports)}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              weeklyReports ? "bg-[#2563EB]" : "bg-slate-200 dark:bg-muted"
            )}
          >
            <span className={cn("pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out", weeklyReports ? "translate-x-5" : "translate-x-0")} />
          </button>
        </div>
      </div>
    </div>
  );
}
