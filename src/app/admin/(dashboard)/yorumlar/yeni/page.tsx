import { createTestimonial } from "../actions";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Yeni Yorum Ekle</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Müşteri referansını ekleyin, ana sayfada gösterilsin.
      </p>

      <div className="mt-6">
        <TestimonialForm action={createTestimonial} submitLabel="Yorumu Kaydet" />
      </div>
    </div>
  );
}
