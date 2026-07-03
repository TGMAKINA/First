import Link from "next/link";
import { getAllProductsAdmin } from "@/db/queries";
import { CATEGORIES } from "@/lib/categories";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const products = await getAllProductsAdmin();
  const activeCount = products.filter((p) => p.isActive).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Panel</h1>
      <p className="mt-1 text-sm text-zinc-500">Ürün kataloğunuza genel bakış.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Toplam Ürün
          </p>
          <p className="mt-2 text-3xl font-bold text-brand-950">{products.length}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Yayında
          </p>
          <p className="mt-2 text-3xl font-bold text-brand-950">{activeCount}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Kategori
          </p>
          <p className="mt-2 text-3xl font-bold text-brand-950">{CATEGORIES.length}</p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/admin/urunler"
          className="rounded-lg bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          Ürünleri Yönet
        </Link>
        <Link
          href="/admin/urunler/yeni"
          className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-600"
        >
          Yeni Ürün Ekle
        </Link>
      </div>
    </div>
  );
}
