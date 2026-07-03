import { notFound } from "next/navigation";
import { getTestimonialByIdAdmin } from "@/db/queries";
import { updateTestimonial } from "../actions";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialByIdAdmin(id);
  if (!testimonial) notFound();

  const boundUpdate = updateTestimonial.bind(null, testimonial.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Yorumu Düzenle</h1>
      <p className="mt-1 text-sm text-zinc-500">{testimonial.authorName}</p>

      <div className="mt-6">
        <TestimonialForm
          action={boundUpdate}
          submitLabel="Değişiklikleri Kaydet"
          defaultValues={{
            authorName: testimonial.authorName,
            companyName: testimonial.companyName ?? "",
            quote: testimonial.quote,
            rating: testimonial.rating,
            displayOrder: testimonial.displayOrder,
            isActive: testimonial.isActive,
          }}
        />
      </div>
    </div>
  );
}
