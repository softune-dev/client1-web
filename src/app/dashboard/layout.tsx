import { PageHeader } from "@/components/common/page-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard" description="Overview of your LPG distribution operations" />
      {children}
    </div>
  );
}
