import { PageHeader } from "@/components/common/page-header";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Products" description="LPG product catalog and specifications" />
      {children}
    </div>
  );
}
