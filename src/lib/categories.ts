export const CATEGORIES = [
  { slug: "ebatlama", label: "Ebatlama Makinası Yedek Parça" },
  { slug: "bantlama", label: "Bantlama Makinası Yedek Parça" },
  { slug: "cnc", label: "CNC Makinası Yedek Parça" },
  { slug: "yaglar", label: "Yağlar" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORIES.some((c) => c.slug === value);
}

export function getCategoryLabel(slug: CategorySlug): string {
  return CATEGORIES.find((c) => c.slug === slug)!.label;
}
