"use client";

import { usePathname } from "next/navigation";
import { FiMenu, FiBell, FiSearch } from "react-icons/fi";
import { useSidebar } from "@/hooks/use-sidebar";
import { sidebarRoutes } from "@/config/sidebar-routes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { THEME } from "@/constants/theme";

export function Topbar() {
  const pathname = usePathname();
  const { setMobileOpen } = useSidebar();

  const currentRoute = sidebarRoutes.find((route) => route.href === pathname);
  const pageTitle = currentRoute?.title ?? "Dashboard";

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center border-b bg-white/80 backdrop-blur-md transition-all duration-300",
        "md:pl-0",
      )}
    >
      <div className="flex w-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <FiMenu className="h-5 w-5" />
          </Button>

          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            {pageTitle}
          </h2>
        </div>

        <div className="flex items-center gap-x-2 md:gap-x-3">
          <div className="relative hidden sm:block">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-[200px] rounded-full bg-muted/50 pl-9 text-sm lg:w-[280px]"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative shrink-0"
            aria-label="View notifications"
          >
            <FiBell className="h-5 w-5 text-muted-foreground" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#2563EB]" />
          </Button>

          <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent transition-all hover:ring-[#2563EB]/30">
            <AvatarFallback
              className="text-xs font-semibold text-white"
              style={{ backgroundColor: THEME.primary }}
            >
              PB
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
