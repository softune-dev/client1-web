import { PageHeader } from "@/components/common/page-header";

export default function DeliveriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Deliveries" description="Active and completed delivery tracking" />
      {children}
    </div>
  );
}
