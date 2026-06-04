import { PageHeader } from "@/components/common/page-header";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Inventory" description="Track stock levels and warehouse operations" />
      {children}
    </div>
  );
}
