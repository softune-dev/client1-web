import { PageHeader } from "@/components/common/page-header";

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Trips" description="Delivery trip planning and route management" />
      {children}
    </div>
  );
}
