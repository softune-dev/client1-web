import { PageHeader } from "@/components/common/page-header";

export default function VehiclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Vehicles" description="Fleet management and vehicle tracking" />
      {children}
    </div>
  );
}
