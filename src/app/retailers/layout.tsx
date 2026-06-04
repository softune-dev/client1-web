import { PageHeader } from "@/components/common/page-header";

export default function RetailersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Retailers" description="Retail partner network and distribution points" />
      {children}
    </div>
  );
}
