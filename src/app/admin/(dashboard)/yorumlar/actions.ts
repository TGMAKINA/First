"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth-dal";
import { db } from "@/db";
import { testimonials } from "@/db/schema";

const testimonialSchema = z.object({
  authorName: z.string().trim().min(1, "Müşteri adı gereklidir."),
  companyName: z.string().trim().optional(),
  quote: z.string().trim().min(1, "Yorum metni gereklidir."),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  displayOrder: z.coerce.number().int().default(0),
  isActive: z.coerce.boolean().default(false),
});

export type TestimonialFormState = { error?: string };

function parseTestimonialForm(formData: FormData) {
  return testimonialSchema.safeParse({
    authorName: formData.get("authorName"),
    companyName: formData.get("companyName") || undefined,
    quote: formData.get("quote"),
    rating: formData.get("rating") || 5,
    displayOrder: formData.get("displayOrder") || 0,
    isActive: formData.get("isActive") === "on",
  });
}

export async function createTestimonial(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAdmin();

  const parsed = parseTestimonialForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  await db.insert(testimonials).values(parsed.data);

  redirect("/admin/yorumlar");
}

export async function updateTestimonial(
  testimonialId: string,
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAdmin();

  const parsed = parseTestimonialForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  await db.update(testimonials).set(parsed.data).where(eq(testimonials.id, testimonialId));

  redirect("/admin/yorumlar");
}

export async function deleteTestimonial(testimonialId: string): Promise<void> {
  await requireAdmin();
  await db.delete(testimonials).where(eq(testimonials.id, testimonialId));
}

export async function toggleTestimonialActive(
  testimonialId: string,
  isActive: boolean
): Promise<void> {
  await requireAdmin();
  await db.update(testimonials).set({ isActive }).where(eq(testimonials.id, testimonialId));
}
