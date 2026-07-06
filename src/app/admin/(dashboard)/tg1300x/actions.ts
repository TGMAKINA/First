"use server";

import { eq } from "drizzle-orm";
import { del } from "@vercel/blob";
import { requireAdmin } from "@/lib/auth-dal";
import { db } from "@/db";
import { showcases } from "@/db/schema";

const SLUG = "tg1300x";

export type ShowcaseFormState = { error?: string; success?: boolean };

async function ensureShowcaseRow() {
  const existing = await db.query.showcases.findFirst({ where: eq(showcases.slug, SLUG) });
  if (existing) return existing;

  const [created] = await db.insert(showcases).values({ slug: SLUG }).returning();
  return created;
}

export async function updateShowcaseDescription(
  _prevState: ShowcaseFormState,
  formData: FormData
): Promise<ShowcaseFormState> {
  await requireAdmin();

  const description = String(formData.get("description") ?? "").trim();
  const row = await ensureShowcaseRow();

  await db
    .update(showcases)
    .set({ description: description || null, updatedAt: new Date() })
    .where(eq(showcases.id, row.id));

  return { success: true };
}

export async function recordShowcaseImage(blobUrl: string, blobPathname: string): Promise<void> {
  await requireAdmin();

  const row = await ensureShowcaseRow();
  if (row.imagePathname) {
    await del(row.imagePathname).catch(() => {});
  }

  await db
    .update(showcases)
    .set({ imageUrl: blobUrl, imagePathname: blobPathname, updatedAt: new Date() })
    .where(eq(showcases.id, row.id));
}

export async function deleteShowcaseImage(): Promise<void> {
  await requireAdmin();

  const row = await ensureShowcaseRow();
  if (row.imagePathname) {
    await del(row.imagePathname).catch(() => {});
  }

  await db
    .update(showcases)
    .set({ imageUrl: null, imagePathname: null, updatedAt: new Date() })
    .where(eq(showcases.id, row.id));
}
