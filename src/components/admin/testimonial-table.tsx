"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import {
  deleteTestimonial,
  toggleTestimonialActive,
} from "@/app/admin/(dashboard)/yorumlar/actions";
import { ConfirmDialog } from "./confirm-dialog";

export type AdminTestimonialRow = {
  id: string;
  authorName: string;
  companyName: string | null;
  quote: string;
  rating: number;
  isActive: boolean;
};

export function TestimonialTable({ testimonials }: { testimonials: AdminTestimonialRow[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteTestimonial(id);
      toast.success("Yorum silindi.");
      router.refresh();
    });
  }

  function handleToggleActive(id: string, next: boolean) {
    startTransition(async () => {
      await toggleTestimonialActive(id, next);
      router.refresh();
    });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase text-zinc-500">
          <tr>
            <th className="px-4 py-3">Müşteri</th>
            <th className="px-4 py-3">Yorum</th>
            <th className="px-4 py-3">Puan</th>
            <th className="px-4 py-3">Durum</th>
            <th className="px-4 py-3 text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t) => (
            <tr key={t.id} className="border-b border-zinc-100 last:border-0">
              <td className="px-4 py-3">
                <span className="font-medium text-brand-950">{t.authorName}</span>
                {t.companyName && <p className="text-xs text-zinc-500">{t.companyName}</p>}
              </td>
              <td className="max-w-sm px-4 py-3 text-zinc-600">
                <p className="line-clamp-2">{t.quote}</p>
              </td>
              <td className="px-4 py-3 text-zinc-500">{"★".repeat(t.rating)}</td>
              <td className="px-4 py-3">
                <button
                  disabled={isPending}
                  onClick={() => handleToggleActive(t.id, !t.isActive)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium",
                    t.isActive ? "bg-green-50 text-green-700" : "bg-zinc-100 text-zinc-500"
                  )}
                >
                  {t.isActive ? "Yayında" : "Gizli"}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/admin/yorumlar/${t.id}`}
                    className="text-sm font-medium text-brand-700 hover:text-brand-900"
                  >
                    Düzenle
                  </Link>
                  <ConfirmDialog
                    message={`"${t.authorName}" yorumunu silmek istediğinize emin misiniz?`}
                    onConfirm={() => handleDelete(t.id)}
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
          {testimonials.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-zinc-400">
                Henüz yorum eklenmedi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
