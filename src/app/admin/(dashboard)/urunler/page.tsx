import Link from "next/link";
import { getAllProductsAdmin } from "@/db/queries";
import { ProductTable } from "@/components/admin/product-table";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProductsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Ürünler</h1>
          <p className="mt-1 text-sm text-zinc-500">Tüm yedek parçaları yönetin.</p>
        </div>
        <Link
          href="/admin/urunler/yeni"
          className="rounded-lg bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          Yeni Ürün Ekle
        </Link>
      </div>

      <div className="mt-6">
        <ProductTable products={products} />
      </div>
    </div>
  );
}
