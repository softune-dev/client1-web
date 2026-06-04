import { PageHeader } from "@/components/common/page-header";

export default function DriversLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Drivers" description="Driver profiles and assignment management" />
      {children}
    </div>
  );
}
