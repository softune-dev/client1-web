"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Topbar } from "@/components/layout/topbar";
import { THEME } from "@/constants/theme";
import { type DashboardLayoutProps } from "@/types/layout";

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="relative min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <MobileSidebar />

      <div
        className={cn(
          "flex flex-col transition-all duration-300 ease-in-out",
          "md:ml-[var(--sidebar-width)]",
        )}
        style={
          {
            "--sidebar-width": `${
              isCollapsed
                ? THEME.sidebarCollapsedWidth
                : THEME.sidebarExpandedWidth
            }px`,
          } as React.CSSProperties
        }
      >
        <Topbar />

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
