"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { type SidebarItemProps } from "@/types/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


export function SidebarItem({
  route,
  isActive,
  isCollapsed,
  onClick,
}: SidebarItemProps) {
  const Icon = route.icon;

  const linkContent = (
    <Link
      href={route.href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isCollapsed && "justify-center px-2",
        isActive
          ? "bg-[#2563EB]/15 text-white"
          : "text-[#94A3B8] hover:bg-[#0A2D57] hover:text-white"
      )}
    >
      {/* Active indicator bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#2563EB]" />
      )}

      <Icon
        className={cn(
          "shrink-0 transition-colors duration-200",
          isCollapsed ? "h-5 w-5" : "h-[18px] w-[18px]",
          isActive
            ? "text-[#2563EB]"
            : "text-[#94A3B8] group-hover:text-white"
        )}
      />

      {!isCollapsed && (
        <span className="truncate">{route.title}</span>
      )}
    </Link>
  );


  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger render={linkContent} />
        <TooltipContent side="right" className="font-medium">
          {route.title}
        </TooltipContent>
      </Tooltip>
    );
  }

  return linkContent;
}
