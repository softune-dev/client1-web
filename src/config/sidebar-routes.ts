import { RiDashboardLine } from "react-icons/ri";
import {
  FiUsers,
  FiPackage,
  FiTruck,
  FiMap,
  FiSettings,
  FiBarChart2,
  FiUserCheck,
  FiRotateCcw,
  FiClipboard,
  FiShoppingCart,
  FiSend,
  FiShield,
  FiBriefcase,
} from "react-icons/fi";

import { type SidebarRoute } from "@/types/sidebar";

export const sidebarRoutes: SidebarRoute[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: RiDashboardLine,
  },
  {
    title: "Suppliers",
    href: "/suppliers",
    icon: FiUsers,
  },
  {
    title: "Products",
    href: "/products",
    icon: FiPackage,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: FiClipboard,
  },
  {
    title: "Vehicles",
    href: "/vehicles",
    icon: FiTruck,
  },
  {
    title: "Drivers",
    href: "/drivers",
    icon: FiUserCheck,
  },
  {
    title: "Marketing Managers",
    href: "/marketing-managers",
    icon: FiBriefcase,
  },
  {
    title: "Trips",
    href: "/trips",
    icon: FiMap,
  },
  {
    title: "Deliveries",
    href: "/deliveries",
    icon: FiSend,
  },
  {
    title: "Returns",
    href: "/returns",
    icon: FiRotateCcw,
  },
  {
    title: "Retailers",
    href: "/retailers",
    icon: FiShoppingCart,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FiBarChart2,
  },
  {
    title: "Users & Roles",
    href: "/users-roles",
    icon: FiShield,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: FiSettings,
  },
];
