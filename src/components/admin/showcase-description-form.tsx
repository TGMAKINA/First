"use client";

import { useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  updateShowcaseDescription,
  type ShowcaseFormState,
} from "@/app/admin/(dashboard)/tg1300x/actions";

const initialState: ShowcaseFormState = {};

export function ShowcaseDescriptionForm({ defaultValue }: { defaultValue: string }) {
  const [state, formAction, isPending] = useActionState(updateShowcaseDescription, initialState);

  useEffect(() => {
    if (state.success) toast.success("Açıklama kaydedildi.");
  }, [state]);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-3">
      <label htmlFor="description" className="text-sm font-medium text-zinc-700">
        Açıklama Metni
      </label>
      <textarea
        id="description"
        name="description"
        defaultValue={defaultValue}
        rows={6}
        placeholder="TG1300X Yüzey Temizleme Makinası hakkında müşterilere gösterilecek açıklama..."
        className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
      />

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
        className="mt-1 w-fit rounded-lg bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-50"
      >
        {isPending ? "Kaydediliyor..." : "Açıklamayı Kaydet"}
      </button>
    </form>
  );
}
