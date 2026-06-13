"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { GeneralSettings } from "@/components/settings/general-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { SecuritySettings } from "@/components/settings/security-settings";
import { BackupSettings } from "@/components/settings/backup-settings";
import { SystemInfoSettings } from "@/components/settings/system-info-settings";

const TABS = [
  { id: "general", label: "General" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "backup", label: "Backup" },
  { id: "system-info", label: "System Info" },
] as const;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]["id"]>("general");

  // General tab states
  const [companyName, setCompanyName] = useState("Bhoumic Enterprise");
  const [companyPhone, setCompanyPhone] = useState("01712345678");
  const [companyAddress, setCompanyAddress] = useState("Mirpur, Dhaka, Bangladesh");
  const [timezone, setTimezone] = useState("(UTC+06:00) Dhaka");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [currency, setCurrency] = useState("BDT (৳)");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [lowStockAlert, setLowStockAlert] = useState(true);

  // Notifications tab states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);

  // Security tab states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  // Backup tab states
  const [autoBackup, setAutoBackup] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Settings saved successfully!`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-dm-sans pb-10">
      
      {/* Left Sidebar Tab Navigation (Border wrapper, no background, no shadow) */}
      <div className="md:col-span-3 flex flex-col gap-1 rounded-xl border border-[#E2E8F0] p-3 dark:border-border">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full px-4 py-2.5 text-left text-sm font-semibold rounded-lg transition-colors cursor-pointer",
                isActive
                  ? "bg-[#EFF6FF] text-[#2563EB] dark:bg-blue-950/30 dark:text-blue-400 font-bold"
                  : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A] dark:text-slate-400 dark:hover:bg-muted dark:hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right Tab Content Card */}
      <div className="md:col-span-9 rounded-xl border border-[#E2E8F0]/80 bg-white p-6 shadow-xs dark:border-border dark:bg-card">
        <form onSubmit={handleSave}>
          
          {/* General Tab */}
          {activeTab === "general" && (
            <GeneralSettings
              companyName={companyName}
              setCompanyName={setCompanyName}
              companyPhone={companyPhone}
              setCompanyPhone={setCompanyPhone}
              companyAddress={companyAddress}
              setCompanyAddress={setCompanyAddress}
              timezone={timezone}
              setTimezone={setTimezone}
              dateFormat={dateFormat}
              setDateFormat={setDateFormat}
              currency={currency}
              setCurrency={setCurrency}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              lowStockAlert={lowStockAlert}
              setLowStockAlert={setLowStockAlert}
            />
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <NotificationSettings
              emailAlerts={emailAlerts}
              setEmailAlerts={setEmailAlerts}
              pushAlerts={pushAlerts}
              setPushAlerts={setPushAlerts}
              weeklyReports={weeklyReports}
              setWeeklyReports={setWeeklyReports}
            />
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <SecuritySettings
              currentPassword={currentPassword}
              setCurrentPassword={setCurrentPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              twoFactor={twoFactor}
              setTwoFactor={setTwoFactor}
            />
          )}

          {/* Backup Tab */}
          {activeTab === "backup" && (
            <BackupSettings
              autoBackup={autoBackup}
              setAutoBackup={setAutoBackup}
            />
          )}

          {/* System Info Tab */}
          {activeTab === "system-info" && (
            <SystemInfoSettings />
          )}

          {/* Save Changes button footer (omitted for System Info tab) */}
          {activeTab !== "system-info" && (
            <div className="flex justify-start pt-6 border-t border-[#F1F5F9] dark:border-border/50 mt-6">
              <button
                type="submit"
                className="h-10 px-5 rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-sm font-bold transition-colors cursor-pointer shadow-xs"
              >
                Save Changes
              </button>
            </div>
          )}

        </form>
      </div>

    </div>
  );
}

