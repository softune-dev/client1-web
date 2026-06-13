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

        <main className="flex-1 pt-2 pb-4 px-4 md:pt-3 md:pb-6 md:px-6 lg:pt-4 lg:pb-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
