import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bhowmick Enterprise — LPG Distribution Management",
    template: "%s | Bhowmick Enterprise",
  },
  description:
    "Enterprise-grade LPG distribution management system for suppliers, inventory, deliveries, and fleet operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <SidebarProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </SidebarProvider>
      </body>
    </html>
  );
}
