"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks/use-sidebar";
import { sidebarRoutes } from "@/config/sidebar-routes";
import { SidebarItem } from "@/components/layout/sidebar-item";
import { THEME } from "@/constants/theme";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function MobileSidebar() {
  const pathname = usePathname();
  const { isMobileOpen, setMobileOpen } = useSidebar();

  return (
    <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
      <SheetContent
        side="left"
        className="w-[280px] border-none p-0"
        style={{ backgroundColor: THEME.sidebar.background }}
      >
        <SheetHeader className="px-0">
          <div className="flex h-16 items-center gap-x-3 border-b border-white/5 px-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] shadow-lg shadow-blue-500/20">
              <span className="text-sm font-bold text-white">BE</span>
            </div>
            <div className="flex flex-col">
              <SheetTitle className="text-sm font-semibold text-white">
                Bhoumic Enterprise
              </SheetTitle>
              <span className="text-[10px] text-[#94A3B8]">
                LPG Distribution
              </span>
            </div>
          </div>
        </SheetHeader>

     
        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarRoutes.map((route) => (
            <SidebarItem
              key={route.href}
              route={route}
              isActive={pathname === route.href}
              isCollapsed={false}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
