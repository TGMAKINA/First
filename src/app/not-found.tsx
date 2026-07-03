import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-400">404</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
          Aradığınız sayfa bulunamadı
        </h1>
        <p className="mt-4 max-w-md text-base leading-7 text-steel-400">
          Bu sayfa kaldırılmış veya hiç var olmamış olabilir. Ana sayfaya
          dönerek yedek parça kategorilerine göz atabilirsiniz.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-brand-950 shadow-premium transition-colors hover:bg-accent-400"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
