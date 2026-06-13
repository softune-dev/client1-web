"use client";

import React from "react";

export function SystemInfoSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-[#0F172A] dark:text-foreground">
        System Metadata
      </h3>

      <div className="max-w-xl border border-[#F1F5F9] dark:border-border/50 rounded-xl divide-y divide-[#F1F5F9] dark:divide-border/50 overflow-hidden shadow-xs">
        <div className="flex justify-between p-4 text-sm bg-white dark:bg-card">
          <span className="font-semibold text-[#64748B]">Application Version</span>
          <span className="font-bold text-[#0F172A] dark:text-foreground font-mono">v1.2.0</span>
        </div>
        <div className="flex justify-between p-4 text-sm bg-white dark:bg-card">
          <span className="font-semibold text-[#64748B]">Environment</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">Production</span>
        </div>
        <div className="flex justify-between p-4 text-sm bg-white dark:bg-card">
          <span className="font-semibold text-[#64748B]">Database Status</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">Connected</span>
        </div>
        <div className="flex justify-between p-4 text-sm bg-white dark:bg-card">
          <span className="font-semibold text-[#64748B]">Next.js version</span>
          <span className="font-bold text-[#0F172A] dark:text-foreground font-mono">16.x (Turbopack)</span>
        </div>
      </div>
    </div>
  );
}
