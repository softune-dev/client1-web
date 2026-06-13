import { type IconType } from "react-icons";

export interface SidebarSubItem {
  title: string;
  href: string;
}

export interface SidebarRoute {
  title: string;
  href: string;
  icon: string;
  subItems?: SidebarSubItem[];
}

export interface SidebarContextValue {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export interface SidebarItemProps {
  route: SidebarRoute;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}
