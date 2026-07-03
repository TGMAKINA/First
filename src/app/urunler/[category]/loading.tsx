export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-brand-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-9 w-40 animate-pulse rounded-full bg-brand-800" />
          ))}
        </div>
        <div className="mt-6 h-8 w-64 animate-pulse rounded bg-brand-800" />
        <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-brand-800" />

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-hairline">
              <div className="aspect-square animate-pulse bg-brand-800" />
              <div className="space-y-2 bg-brand-900 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-brand-800" />
                <div className="h-3 w-full animate-pulse rounded bg-brand-800" />
                <div className="h-9 w-full animate-pulse rounded-full bg-brand-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
