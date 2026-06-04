import { PageHeader } from "@/components/common/page-header";

export default function ReturnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Returns" description="Cylinder returns and empty inventory processing" />
      {children}
    </div>
  );
}
