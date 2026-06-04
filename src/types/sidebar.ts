import { type IconType } from "react-icons";

export interface SidebarRoute {
  title: string;
  href: string;
  icon: IconType;
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
