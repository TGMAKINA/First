import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-dal";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Girişi",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <span className="relative h-10 w-10 shrink-0">
            <Image src="/images/logo-icon.png" alt="TG Makina" fill className="object-contain" />
          </span>
          <span className="text-lg font-bold text-brand-900">Admin Paneli</span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
