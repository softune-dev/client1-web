"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { type SidebarItemProps } from "@/types/sidebar";
import { SidebarIcon } from "@/components/layout/sidebar-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

export function SidebarItem({
  route,
  isActive,
  isCollapsed,
  onClick,
}: SidebarItemProps) {
  const pathname = usePathname();
  const hasSubItems = !!route.subItems && route.subItems.length > 0;

  // A parent route is active if its own path matches or any of its child paths match
  const isChildActive = hasSubItems && route.subItems!.some((sub) => pathname === sub.href);
  const isParentActive = isActive || isChildActive;

  const [isOpen, setIsOpen] = useState(isChildActive);

  // Automatically expand if a child route becomes active
  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive]);

  const linkContent = (
    <Link
      href={hasSubItems ? route.subItems![0].href : route.href}
      onClick={(e) => {
        if (hasSubItems) {
          // If clicked and not collapsed, toggle open state
          if (!isCollapsed) {
            setIsOpen(!isOpen);
          }
        }
        if (onClick) onClick();
      }}
      className={cn(
        "group relative flex items-center gap-x-3 rounded-md px-3 py-3 text-sm font-medium font-dm-sans transition-all duration-200 cursor-pointer",
        isCollapsed && "justify-center px-2",
        isParentActive
          ? "bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white"
          : "text-[#94A3B8] hover:bg-[#0A2D57] hover:text-white"
      )}
    >
      <SidebarIcon
        name={route.icon}
        className={cn(
          "h-[22px] w-[22px] shrink-0 transition-colors duration-200",
          isParentActive
            ? "text-white"
            : "text-[#94A3B8] group-hover:text-white"
        )}
      />

      {!isCollapsed && (
        <span className="truncate">{route.title}</span>
      )}

      {!isCollapsed && hasSubItems && (
        <span className="ml-auto">
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-white" />
          ) : (
            <ChevronRight className="h-4 w-4 text-[#94A3B8] group-hover:text-white" />
          )}
        </span>
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

  return (
    <div className="space-y-1">
      {linkContent}
      <AnimatePresence initial={false}>
        {hasSubItems && isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="mt-1 pl-3.5 space-y-1 overflow-hidden"
          >
            {route.subItems!.map((sub) => {
              const isSubActive = pathname === sub.href;
              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={onClick}
                  className={cn(
                    "flex items-center gap-x-3 rounded-md px-3 py-3 text-sm font-medium font-dm-sans transition-all duration-150 cursor-pointer",
                    isSubActive
                      ? "bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white"
                      : "text-[#94A3B8] hover:text-white hover:bg-[#0A2D57]/30"
                  )}
                >
                  {/* Border circle outline (not filled) on the left */}
                  <span className="h-2 w-2 rounded-full border-2 border-current shrink-0" />
                  <span className="truncate">{sub.title}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
