"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks/use-sidebar";
import { sidebarRoutes } from "@/config/sidebar-routes";
import { SidebarItem } from "@/components/layout/sidebar-item";
import { THEME } from "@/constants/theme";
import { X } from "lucide-react";
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
        showCloseButton={false}
        className="w-[280px] border-none p-0 font-dm-sans gap-0"
        style={{ backgroundColor: THEME.sidebar.background }}
      >
        <SheetHeader className="p-0 relative">
          <div className="flex h-20 items-center justify-start border-b border-white/5 px-6">
            <img
              src="/logo.svg"
              alt="BE Logo"
              className="h-14 w-auto object-contain"
            />
            {/* Custom styled Close Button at Top Right */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#94A3B8] hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {/* Accessible Title */}
          <SheetTitle className="sr-only">Mobile Navigation Sidebar</SheetTitle>
        </SheetHeader>

        <nav className="flex-1 space-y-1 px-3 pt-3 pb-4 overflow-y-auto scrollbar-thin">
          {sidebarRoutes.map((route) => {
            const isActive = pathname === route.href || 
              (route.subItems?.some((sub) => pathname === sub.href) ?? false);

            return (
              <SidebarItem
                key={route.href}
                route={route}
                isActive={isActive}
                isCollapsed={false}
                onClick={() => setMobileOpen(false)}
              />
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
