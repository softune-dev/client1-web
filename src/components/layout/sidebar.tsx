"use client";

import { usePathname } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { sidebarRoutes } from "@/config/sidebar-routes";
import { SidebarItem } from "@/components/layout/sidebar-item";
import { THEME } from "@/constants/theme";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Sidebar — the main desktop navigation panel.
 *
 * Features:
 * - Deep navy background (#031B34)
 * - Premium logo section with Bhoumic Enterprise branding
 * - Dynamically rendered menu items from sidebar-routes config
 * - Smooth expand/collapse animation (280px ↔ 80px)
 * - Active route detection via Next.js pathname
 * - Collapse toggle button at the bottom
 * - Hidden on mobile (<768px) — uses MobileSidebar instead
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
          "fixed inset-y-0 left-0 z-40 flex flex-col transition-all duration-300 ease-in-out",
          "hidden md:flex"
        )}
      >
        {/* ─── Logo Section ─── */}
        <div
          className={cn(
            "flex h-16 items-center border-b border-white/5 px-4",
            isCollapsed ? "justify-center" : "gap-x-3"
          )}
        >
          {/* Logo mark — always visible */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] shadow-lg shadow-blue-500/20">
            <span className="text-sm font-bold text-white">BE</span>
          </div>

          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-semibold text-white">
                Bhoumic Enterprise
              </span>
              <span className="truncate text-[10px] text-[#94A3B8]">
                LPG Distribution
              </span>
            </div>
          )}
        </div>

        {/* ─── Navigation Items ─── */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin">
          {sidebarRoutes.map((route) => (
            <SidebarItem
              key={route.href}
              route={route}
              isActive={pathname === route.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        {/* ─── Collapse Toggle ─── */}
        <div className="border-t border-white/5 p-3">
          <button
            onClick={toggleSidebar}
            className={cn(
              "flex w-full items-center justify-center rounded-lg p-2 text-[#94A3B8] transition-all duration-200",
              "hover:bg-[#0A2D57] hover:text-white"
            )}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <FiChevronLeft
              className={cn(
                "h-5 w-5 transition-transform duration-300",
                isCollapsed && "rotate-180"
              )}
            />
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
