import { type SidebarRoute } from "@/types/sidebar";

export const sidebarRoutes: SidebarRoute[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    title: "Suppliers",
    href: "/suppliers",
    icon: "supplier",
  },
  {
    title: "Products",
    href: "/products",
    icon: "products",
  },

  {
    title: "Inventory",
    href: "/inventory",
    icon: "inventory",
    subItems: [
      { title: "Current Stock", href: "/inventory/current-stock" },
      { title: "Receive Stock", href: "/inventory/receive-stock" },
      { title: "Load Vehicle", href: "/inventory/load-vehicle" },
      { title: "Return Stock", href: "/inventory/return-stock" },
      { title: "Inventory Ledger", href: "/inventory/inventory-ledger" },
    ],
  },
  {
    title: "Vehicles",
    href: "/vehicles",
    icon: "vehicles",
  },
  {
    title: "Drivers",
    href: "/drivers",
    icon: "drivers",
  },
  {
    title: "Marketing Managers",
    href: "/marketing-managers",
    icon: "merketing",
  },
  {
    title: "Trips",
    href: "/trips",
    icon: "trips",
    subItems: [
      { title: "All Trips", href: "/trips/all-trips" },
      { title: "Create Trips", href: "/trips/create-trips" },
      { title: "Load Trips", href: "/trips/load-trips" },
    ],
  },
  {
    title: "Deliveries",
    href: "/deliveries",
    icon: "deliveries",
  },
  {
    title: "Returns",
    href: "/returns",
    icon: "returns",
  },
  {
    title: "Retailers",
    href: "/retailers",
    icon: "retailers",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: "reports",
  },
  {
    title: "Users & Roles",
    href: "/users-roles",
    icon: "user-role",
    subItems: [
      { title: "Users", href: "/users-roles/users" },
      { title: "Roles", href: "/users-roles/roles" },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "settings",
  },
];
