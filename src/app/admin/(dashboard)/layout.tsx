import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth-dal";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar />
      <div className="flex-1 bg-zinc-50 p-6 sm:p-8">{children}</div>
    </div>
  );
}
