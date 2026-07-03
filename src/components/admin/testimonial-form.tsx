"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import type { TestimonialFormState } from "@/app/admin/(dashboard)/yorumlar/actions";

export type TestimonialFormValues = {
  authorName: string;
  companyName: string;
  quote: string;
  rating: number;
  displayOrder: number;
  isActive: boolean;
};

const emptyValues: TestimonialFormValues = {
  authorName: "",
  companyName: "",
  quote: "",
  rating: 5,
  displayOrder: 0,
  isActive: true,
};

export function TestimonialForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (state: TestimonialFormState, formData: FormData) => Promise<TestimonialFormState>;
  defaultValues?: TestimonialFormValues;
  submitLabel: string;
}) {
  const values = defaultValues ?? emptyValues;
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div>
        <label htmlFor="authorName" className="text-sm font-medium text-zinc-700">
          Müşteri Adı
        </label>
        <input
          id="authorName"
          name="authorName"
          defaultValue={values.authorName}
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="companyName" className="text-sm font-medium text-zinc-700">
          Firma Adı <span className="font-normal text-zinc-400">(opsiyonel)</span>
        </label>
        <input
          id="companyName"
          name="companyName"
          defaultValue={values.companyName}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="quote" className="text-sm font-medium text-zinc-700">
          Yorum Metni
        </label>
        <textarea
          id="quote"
          name="quote"
          defaultValue={values.quote}
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <div>
          <label htmlFor="rating" className="text-sm font-medium text-zinc-700">
            Puan (1-5)
          </label>
          <select
            id="rating"
            name="rating"
            defaultValue={values.rating}
            className="mt-1 w-24 rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

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
