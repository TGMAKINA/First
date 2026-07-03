"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CATEGORIES, getCategoryLabel, type CategorySlug } from "@/lib/categories";
import { cn } from "@/lib/cn";
import { deleteProduct, toggleProductActive } from "@/app/admin/(dashboard)/urunler/actions";
import { ConfirmDialog } from "./confirm-dialog";

export type AdminProductRow = {
  id: string;
  name: string;
  category: CategorySlug;
  isActive: boolean;
  primaryImage: { blobUrl: string } | null;
};

export function ProductTable({ products }: { products: AdminProductRow[] }) {
  const [filter, setFilter] = useState<CategorySlug | "all">("all");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteProduct(id);
      toast.success("Ürün silindi.");
      router.refresh();
    });
  }

  function handleToggleActive(id: string, next: boolean) {
    startTransition(async () => {
      await toggleProductActive(id, next);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium",
            filter === "all" ? "bg-brand-900 text-white" : "bg-zinc-100 text-zinc-600"
          )}
        >
          Tümü ({products.length})
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.slug}
            onClick={() => setFilter(c.slug)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium",
              filter === c.slug ? "bg-brand-900 text-white" : "bg-zinc-100 text-zinc-600"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3">Ürün</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-zinc-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-zinc-100">
                      {product.primaryImage && (
                        <Image
                          src={product.primaryImage.blobUrl}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span className="font-medium text-brand-950">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-500">
                  {getCategoryLabel(product.category)}
                </td>
                <td className="px-4 py-3">
                  <button
                    disabled={isPending}
                    onClick={() => handleToggleActive(product.id, !product.isActive)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      product.isActive
                        ? "bg-green-50 text-green-700"
                        : "bg-zinc-100 text-zinc-500"
                    )}
                  >
                    {product.isActive ? "Yayında" : "Gizli"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/urunler/${product.id}`}
                      className="text-sm font-medium text-brand-700 hover:text-brand-900"
                    >
                      Düzenle
                    </Link>
                    <ConfirmDialog
                      message={`"${product.name}" ürününü ve tüm görsellerini silmek istediğinize emin misiniz?`}
                      onConfirm={() => handleDelete(product.id)}
                    >
                      {(open) => (
                        <button
                          onClick={open}
                          disabled={isPending}
                          className="text-sm font-medium text-red-600 hover:text-red-700"
                        >
                          Sil
                        </button>
                      )}
                    </ConfirmDialog>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-zinc-400">
                  Bu filtrede ürün bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
