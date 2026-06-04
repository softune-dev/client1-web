import { PageHeader } from "@/components/common/page-header";

export default function SuppliersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Suppliers" description="Manage your LPG suppliers and vendor relationships" />
      {children}
    </div>
  );
}
