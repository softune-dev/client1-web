/**
 * Enterprise theme color tokens for Bhoumic Enterprise.
 * Centralized color constants consumed by layout components.
 *
 * These mirror the CSS custom properties defined in globals.css
 * and provide compile-time references for components that need
 * inline styles or conditional color logic.
 */
export const THEME = {
  sidebar: {
    /** Deep navy background for the sidebar */
    background: "#031B34",
    /** Slightly lighter navy for hover states */
    hover: "#0A2D57",
    /** Blue highlight for the active/selected menu item */
    active: "#2563EB",
    /** White text on the sidebar */
    text: "#FFFFFF",
    /** Muted/secondary text color */
    muted: "#94A3B8",
  },
  /** Primary brand color */
  primary: "#2563EB",
  /** Expanded sidebar width in pixels */
  sidebarExpandedWidth: 280,
  /** Collapsed sidebar width in pixels */
  sidebarCollapsedWidth: 80,
} as const;
