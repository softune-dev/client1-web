import { PageHeader } from "@/components/common/page-header";

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Reports" description="Analytics, reports, and business intelligence" />
      {children}
    </div>
  );
}
