export const CATEGORIES = [
  { slug: "tg1300x", label: "TG1300X Yüzey Temizleme Makinası", kind: "showcase" },
  { slug: "ebatlama", label: "Panel Ebatlama Makinası Yedek Parça", kind: "products" },
  { slug: "bantlama", label: "Bantlama Makinası Yedek Parça", kind: "products" },
  { slug: "cnc", label: "CNC Makinası Yedek Parça", kind: "products" },
  { slug: "yaglar", label: "Yağlar", kind: "products" },
] as const;

export type CategoryEntry = (typeof CATEGORIES)[number];
export type CategorySlug = CategoryEntry["slug"];
export type CategoryKind = CategoryEntry["kind"];

export const PRODUCT_CATEGORIES = CATEGORIES.filter(
  (c): c is Extract<CategoryEntry, { kind: "products" }> => c.kind === "products"
);
export type ProductCategorySlug = (typeof PRODUCT_CATEGORIES)[number]["slug"];

export function getCategory(slug: string): CategoryEntry | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function isCategorySlug(value: string): value is CategorySlug {
  return Boolean(getCategory(value));
}

export function getCategoryLabel(slug: CategorySlug): string {
  return getCategory(slug)!.label;
}
