import { PageHeader } from "@/components/common/page-header";

export default function UsersRolesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Users & Roles" description="User management, roles, and access control" />
      {children}
    </div>
  );
}
