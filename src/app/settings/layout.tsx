import { PageHeader } from "@/components/common/page-header";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" description="Application configuration and preferences" />
      {children}
    </div>
  );
}
