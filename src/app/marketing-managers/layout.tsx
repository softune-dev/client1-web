import { PageHeader } from "@/components/common/page-header";

export default function MarketingManagersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Marketing Managers" description="Marketing team and territory assignments" />
      {children}
    </div>
  );
}
