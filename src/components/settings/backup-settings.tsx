"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BackupSettingsProps {
  autoBackup: boolean;
  setAutoBackup: (v: boolean) => void;
}

export function BackupSettings({
  autoBackup,
  setAutoBackup,
}: BackupSettingsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-[#0F172A] dark:text-foreground">
        Database Backup & Export
      </h3>

      <div className="flex items-center justify-between max-w-xl">
        <div className="flex flex-col min-w-0 pr-4">
          <span className="text-sm font-bold text-[#0F172A] dark:text-foreground">Automatic Backups</span>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">Run automatic backup tasks every 24 hours</p>
        </div>
        <button
          type="button"
          onClick={() => setAutoBackup(!autoBackup)}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
            autoBackup ? "bg-[#2563EB]" : "bg-slate-200 dark:bg-muted"
          )}
        >
          <span className={cn("pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out", autoBackup ? "translate-x-5" : "translate-x-0")} />
        </button>
      </div>

      <div className="flex flex-wrap gap-3 pt-6 border-t border-[#F1F5F9] dark:border-border/50">
        <button
          type="button"
          onClick={() => alert("Database backup download started...")}
          className="h-10 px-5 rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-sm font-bold transition-colors cursor-pointer shadow-xs"
        >
          Backup Database Now
        </button>
        <button
          type="button"
          onClick={() => alert("Restore database triggers modal dialog...")}
          className="h-10 px-5 rounded-lg border border-[#E2E8F0] hover:bg-slate-50 text-[#334155] dark:border-border dark:text-slate-200 dark:hover:bg-muted text-sm font-bold transition-colors cursor-pointer"
        >
          Restore From Backup
        </button>
      </div>
    </div>
  );
}
