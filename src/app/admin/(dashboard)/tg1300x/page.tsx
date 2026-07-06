import { getShowcase } from "@/db/queries";
import { ShowcaseImageEditor } from "@/components/admin/showcase-image-editor";
import { ShowcaseDescriptionForm } from "@/components/admin/showcase-description-form";

export const dynamic = "force-dynamic";

const SLUG = "tg1300x";

export default async function AdminTg1300xPage() {
  const showcase = await getShowcase(SLUG);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">TG1300X Yüzey Temizleme Makinası</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Ana sayfada ve sekmede gösterilecek görsel ve açıklamayı buradan yönetin.
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-sm font-semibold text-zinc-700">Görsel</h2>
          <ShowcaseImageEditor slug={SLUG} imageUrl={showcase?.imageUrl ?? null} />
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold text-zinc-700">Açıklama</h2>
          <ShowcaseDescriptionForm defaultValue={showcase?.description ?? ""} />
        </div>
      </div>
    </div>
  );
}
