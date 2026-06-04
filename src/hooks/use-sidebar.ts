"use client";

import { useContext } from "react";
import { SidebarContext } from "@/providers/sidebar-provider";
import { type SidebarContextValue } from "@/types/sidebar";

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebar must be used within a <SidebarProvider>. " +
        "Wrap your layout tree with <SidebarProvider> in the root layout."
    );
  }

  return context;
}
