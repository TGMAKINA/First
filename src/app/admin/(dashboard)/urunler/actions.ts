"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { requireAdmin } from "@/lib/auth-dal";
import { db } from "@/db";
import { products, productImages } from "@/db/schema";
import { PRODUCT_CATEGORIES, type ProductCategorySlug } from "@/lib/categories";
import { slugify } from "@/lib/slugify";

const categorySlugs = PRODUCT_CATEGORIES.map((c) => c.slug) as [
  ProductCategorySlug,
  ...ProductCategorySlug[],
];

const productSchema = z.object({
  name: z.string().trim().min(1, "Ürün adı gereklidir."),
  slug: z.string().trim().min(1, "Slug gereklidir."),
  category: z.enum(categorySlugs),
  description: z.string().trim().optional(),
  quoteNote: z.string().trim().optional(),
  displayOrder: z.coerce.number().int().default(0),
  isActive: z.coerce.boolean().default(false),
});

export type ProductFormState = { error?: string };

function parseProductForm(formData: FormData) {
  const rawName = String(formData.get("name") ?? "");
  const rawSlug = String(formData.get("slug") ?? "");

  return productSchema.safeParse({
    name: rawName,
    slug: rawSlug.trim() ? rawSlug : slugify(rawName),
    category: formData.get("category"),
    description: formData.get("description") || undefined,
    quoteNote: formData.get("quoteNote") || undefined,
    displayOrder: formData.get("displayOrder") || 0,
    isActive: formData.get("isActive") === "on",
  });
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  const [created] = await db.insert(products).values(parsed.data).returning({ id: products.id });

  redirect(`/admin/urunler/${created.id}`);
}

export async function updateProduct(
  productId: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form verisi." };
  }

  await db
    .update(products)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(products.id, productId));

  redirect("/admin/urunler");
}

export async function deleteProduct(productId: string): Promise<void> {
  await requireAdmin();

  const images = await db.query.productImages.findMany({
    where: eq(productImages.productId, productId),
  });

  for (const image of images) {
    await del(image.blobPathname).catch(() => {});
  }

  await db.delete(products).where(eq(products.id, productId));
}

export async function toggleProductActive(productId: string, isActive: boolean): Promise<void> {
  await requireAdmin();
  await db
    .update(products)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(products.id, productId));
}

export async function recordUploadedImage(
  productId: string,
  blobUrl: string,
  blobPathname: string
): Promise<void> {
  await requireAdmin();

  const [image] = await db
    .insert(productImages)
    .values({ productId, blobUrl, blobPathname })
    .returning({ id: productImages.id });

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
    columns: { primaryImageId: true },
  });

  if (product && !product.primaryImageId) {
    await db.update(products).set({ primaryImageId: image.id }).where(eq(products.id, productId));
  }
}

export async function deleteImage(imageId: string): Promise<void> {
  await requireAdmin();

  const image = await db.query.productImages.findFirst({ where: eq(productImages.id, imageId) });
  if (!image) return;

  await del(image.blobPathname).catch(() => {});
  await db.delete(productImages).where(eq(productImages.id, imageId));

  const product = await db.query.products.findFirst({
    where: eq(products.id, image.productId),
    columns: { id: true, primaryImageId: true },
  });

  if (product?.primaryImageId === imageId) {
    const fallback = await db.query.productImages.findFirst({
      where: eq(productImages.productId, image.productId),
    });
    await db
      .update(products)
      .set({ primaryImageId: fallback?.id ?? null })
      .where(eq(products.id, image.productId));
  }
}

export async function setPrimaryImage(productId: string, imageId: string): Promise<void> {
  await requireAdmin();

  const image = await db.query.productImages.findFirst({
    where: eq(productImages.id, imageId),
  });
  if (!image || image.productId !== productId) return;

  await db.update(products).set({ primaryImageId: imageId }).where(eq(products.id, productId));
}
