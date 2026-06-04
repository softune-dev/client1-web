"use client";

import {
  createContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { type SidebarContextValue } from "@/types/sidebar";

export const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      return width < 1024 && width >= 768;
    }
    return false;
  });
  const [isMobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, toggleSidebar, isMobileOpen, setMobileOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
