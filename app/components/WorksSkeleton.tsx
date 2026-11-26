export default function WorksSkeleton() {
  const cards = Array.from({ length: 6 });
  const chips = ["w-14", "w-24", "w-28", "w-20", "w-32", "w-22"];

  return (
    <div className="min-h-screen w-full bg-obsidian text-text-primary pt-8 sm:pt-10 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden select-none">
      <div className="w-full max-w-6xl mx-auto">
        {/* Top bar placeholder */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div className="relative overflow-hidden h-9 w-28 rounded-full bg-white/[0.05] border border-white/10">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-skeleton-shimmer" />
          </div>
          <div className="relative overflow-hidden h-4 w-32 rounded bg-white/[0.05]">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-skeleton-shimmer" />
          </div>
        </div>

        {/* Filter Chips Placeholder Row (YouTube style) */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {chips.map((w, i) => (
            <div
              key={i}
              className={`relative overflow-hidden h-8 ${w} rounded-full ${
                i === 0 ? "bg-white/15" : "bg-white/[0.05]"
              } shrink-0`}
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-skeleton-shimmer" />
            </div>
          ))}
        </div>

        {/* YouTube Video / Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((_, idx) => (
            <div key={idx} className="flex flex-col">
              {/* Thumbnail Placeholder */}
              <div className="relative overflow-hidden w-full aspect-video rounded-2xl bg-white/[0.05] border border-white/5">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-skeleton-shimmer" />
              </div>

              {/* Details Row: Avatar + Title & Meta lines */}
              <div className="flex items-start gap-3 mt-3.5 px-0.5">
                {/* Circular Avatar */}
                <div className="relative overflow-hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.06] shrink-0">
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-skeleton-shimmer" />
                </div>

                {/* Text placeholders */}
                <div className="flex-1 space-y-2 pt-0.5">
                  <div className="relative overflow-hidden h-4 w-5/6 rounded-md bg-white/[0.09]">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-skeleton-shimmer" />
                  </div>
                  <div className="relative overflow-hidden h-3 w-1/2 rounded-md bg-white/[0.05]">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-skeleton-shimmer" />
                  </div>
                  <div className="relative overflow-hidden h-3 w-1/3 rounded-md bg-white/[0.04]">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-skeleton-shimmer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
