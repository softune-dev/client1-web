"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PageHeaderProps } from "@/types/common";
import { cn } from "@/lib/utils";

interface ExtendedPageHeaderProps extends PageHeaderProps {
  action?: React.ReactNode;
}

const SEGMENT_MAP: Record<string, string> = {
  inventory: "Inventory",
  "current-stock": "Current Stock",
  "receive-stock": "Receive Stock",
  "load-vehicle": "Transfer to Vehicle",
  "return-stock": "Return Stock",
  "inventory-ledger": "Inventory Ledger",
  trips: "Trips",
  "all-trips": "All Trips",
  "create-trips": "Create Trips",
  "load-trips": "Load Trips",
  suppliers: "Suppliers",
  products: "Products",
  dashboard: "Dashboard",
  deliveries: "Deliveries",
  vehicles: "Vehicles",
  drivers: "Drivers",
  marketing: "Marketing Managers",
  retailers: "Retailers",
  reports: "Reports",
  "users-roles": "Users & Roles",
  users: "Users",
  roles: "Roles",
};

export function PageHeader({ title, action }: ExtendedPageHeaderProps) {
  const pathname = usePathname();

  // Parse path segments, e.g. "/inventory/current-stock" -> ["inventory", "current-stock"]
  const segments = pathname ? pathname.split("/").filter(Boolean) : [];

  // Generate breadcrumb path trail
  const breadcrumbs = segments.map((segment, index) => {
    const url = "/" + segments.slice(0, index + 1).join("/");
    const label = SEGMENT_MAP[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const isLast = index === segments.length - 1;

    return {
      url,
      label,
      isLast,
    };
  });

  // Determine if there are multiple action buttons
  let hasMultipleActions = false;
  if (action) {
    const actionArray = React.Children.toArray(action);
    if (actionArray.length > 1) {
      hasMultipleActions = true;
    } else if (actionArray.length === 1) {
      const singleElement = actionArray[0];
      if (React.isValidElement(singleElement)) {
        if (singleElement.type === "div" || singleElement.type === React.Fragment) {
          const childrenArray = React.Children.toArray((singleElement.props as any).children);
          const elementCount = childrenArray.filter(React.isValidElement).length;
          if (elementCount >= 2) {
            hasMultipleActions = true;
          }
        }
      }
    }
  }

  return (
    <div
      className={cn(
        "flex mb-6 font-dm-sans w-full",
        hasMultipleActions
          ? "flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4"
          : "flex-row items-center justify-between gap-x-4"
      )}
    >
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-foreground">
          {title}
        </h1>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm font-medium text-[#94A3B8]">
          <Link href="/dashboard" className="hover:text-[#64748B] transition-colors">
            Home
          </Link>
          
          {breadcrumbs.map((crumb) => (
            <React.Fragment key={crumb.url}>
              <span className="text-[#CBD5E1]">/</span>
              {crumb.isLast ? (
                <span className="text-[#64748B] dark:text-muted-foreground">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.url} className="hover:text-[#64748B] transition-colors">
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {action && (
        <div
          className={cn(
            "shrink-0",
            hasMultipleActions ? "self-start sm:self-center" : "self-center"
          )}
        >
          {action}
        </div>
      )}
    </div>
  );
}
