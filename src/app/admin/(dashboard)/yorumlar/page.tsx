import Link from "next/link";
import { getAllTestimonialsAdmin } from "@/db/queries";
import { TestimonialTable } from "@/components/admin/testimonial-table";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Yorumlar</h1>
          <p className="mt-1 text-sm text-zinc-500">Müşteri referanslarını yönetin.</p>
        </div>
        <Link
          href="/admin/yorumlar/yeni"
          className="rounded-lg bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          Yeni Yorum Ekle
        </Link>
      </div>

      <div className="mt-6">
        <TestimonialTable testimonials={testimonials} />
      </div>
    </div>
  );
}
