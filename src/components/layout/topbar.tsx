"use client";

import { Menu, Bell, ChevronDown } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Topbar() {
  const { toggleSidebar, setMobileOpen } = useSidebar();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center border-b bg-white/80 backdrop-blur-md transition-all duration-300 border-slate-100 dark:border-border/50",
        "md:pl-0"
      )}
    >
      <div className="flex w-full items-center justify-between px-4 md:px-6">
        {/* Left Side: Sidebar Toggle Menu Icon (Black) & Brand Title */}
        <div className="flex items-center gap-x-1 md:gap-x-2">
          {/* Desktop Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex shrink-0 text-[#0F172A] dark:text-white hover:bg-slate-100 dark:hover:bg-muted/30 cursor-pointer h-12 w-12"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="size-5" />
          </Button>

          {/* Mobile Drawer Button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex md:hidden shrink-0 text-[#0F172A] dark:text-white hover:bg-slate-100 dark:hover:bg-muted/30 cursor-pointer h-12 w-12"
            onClick={() => setMobileOpen(true)}
            aria-label="Open mobile navigation"
          >
            <Menu className="size-6" />
          </Button>

          <span className="text-md md:text-xl font-semibold tracking-tight text-[#0F172A] dark:text-foreground font-dm-sans select-none">
            Bhoumic Gas agency
          </span>
        </div>

        {/* Right Side: Bell Icon with Count & User Details Profile */}
        <div className="flex items-center gap-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative shrink-0 text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-50 dark:hover:bg-muted/30 cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#2563EB] text-[9px] font-bold text-white ring-2 ring-white dark:ring-card">
              3
            </span>
          </Button>

          <div className="flex items-center gap-x-2.5 pl-3 border-l border-slate-100 dark:border-border/50">
            <Avatar className="h-8 w-8 cursor-pointer border border-[#E2E8F0] dark:border-border shrink-0">
              <AvatarFallback
                className="text-xs font-bold text-white bg-blue-600"
              >
                PB
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden md:flex flex-col text-left font-dm-sans min-w-0">
              <span className="text-xs font-bold text-[#0F172A] dark:text-foreground leading-none truncate">
                Pritom Bhoumick
              </span>
              <span className="text-[10px] text-[#64748B] dark:text-muted-foreground font-semibold mt-0.5 leading-none">
                Administrator
              </span>
            </div>

            <ChevronDown className="h-4 w-4 text-[#94A3B8] shrink-0" />
          </div>
        </div>
      </div>
    </header>
  );
}
