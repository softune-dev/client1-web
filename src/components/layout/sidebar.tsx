"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { sidebarRoutes } from "@/config/sidebar-routes";
import { SidebarItem } from "@/components/layout/sidebar-item";
import { THEME } from "@/constants/theme";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

/**
 * Sidebar — the main desktop navigation panel.
 */
export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <TooltipProvider>
      <aside
        style={{
          width: isCollapsed
            ? THEME.sidebarCollapsedWidth
            : THEME.sidebarExpandedWidth,
          backgroundColor: THEME.sidebar.background,
        }}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col font-dm-sans transition-all duration-300 ease-in-out border-r border-white/5",
          "hidden md:flex"
        )}
      >
        {/* ─── Logo Section ─── */}
        <div className={cn(
          "flex h-20 items-center border-b border-white/5 px-5",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <img
            src={isCollapsed ? "/icons/logo-icon.svg" : "/logo.svg"}
            alt="BE Logo"
            className={cn(
              "object-contain transition-all duration-300",
              isCollapsed ? "h-12 w-12" : "h-12 w-auto"
            )}
          />
        </div>

        {/* ─── Navigation Items ─── */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin">
          {sidebarRoutes.map((route) => {
            const isActive = pathname === route.href || 
              (route.subItems?.some((sub) => pathname === sub.href) ?? false);

            return (
              <SidebarItem
                key={route.href}
                route={route}
                isActive={isActive}
                isCollapsed={isCollapsed}
              />
            );
          })}
        </nav>
      </aside>
    </TooltipProvider>
  );
}
