"use client";

import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { CATEGORIES, type CategorySlug } from "@/lib/categories";
import { slugify } from "@/lib/slugify";
import type { ProductFormState } from "@/app/admin/(dashboard)/urunler/actions";

export type ProductFormValues = {
  name: string;
  slug: string;
  category: CategorySlug;
  description: string;
  quoteNote: string;
  displayOrder: number;
  isActive: boolean;
};

const emptyValues: ProductFormValues = {
  name: "",
  slug: "",
  category: CATEGORIES[0].slug,
  description: "",
  quoteNote: "",
  displayOrder: 0,
  isActive: true,
};

export function ProductForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  defaultValues?: ProductFormValues;
  submitLabel: string;
}) {
  const values = defaultValues ?? emptyValues;
  const [state, formAction, isPending] = useActionState(action, {});
  const [slug, setSlug] = useState(values.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(values.slug));

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-zinc-700">
          Ürün Adı
        </label>
        <input
          id="name"
          name="name"
          defaultValue={values.name}
          required
          onChange={(e) => {
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="slug" className="text-sm font-medium text-zinc-700">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-mono focus:border-brand-600 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="category" className="text-sm font-medium text-zinc-700">
          Kategori
        </label>
        <select
          id="category"
          name="category"
          defaultValue={values.category}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium text-zinc-700">
          Açıklama
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={values.description}
          rows={3}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="quoteNote" className="text-sm font-medium text-zinc-700">
          Teklif Notu{" "}
          <span className="font-normal text-zinc-400">
            (WhatsApp mesajına eklenir, örn. parça kodu)
          </span>
        </label>
        <input
          id="quoteNote"
          name="quoteNote"
          defaultValue={values.quoteNote}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <div>
          <label htmlFor="displayOrder" className="text-sm font-medium text-zinc-700">
            Sıralama
          </label>
          <input
            id="displayOrder"
            name="displayOrder"
            type="number"
            defaultValue={values.displayOrder}
            className="mt-1 w-24 rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
          />
        </div>

        <label className="mt-6 flex items-center gap-2 text-sm font-medium text-zinc-700">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={values.isActive}
            className="h-4 w-4 rounded border-zinc-300 text-brand-900"
          />
          Yayında (sitede görünür)
        </label>
      </div>

      {state.error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {state.error}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-fit rounded-lg bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-50"
      >
        {isPending ? "Kaydediliyor..." : submitLabel}
      </button>
    </form>
  );
}
