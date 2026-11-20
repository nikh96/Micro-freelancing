export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* 
        Hero content container:
        Horizontally centered, elevated into the upper-middle portion of the screen 
        for refined luxury balance across all device sizes.
      */}
      <div className="w-full max-w-6xl text-center -translate-y-16 sm:-translate-y-20 md:-translate-y-24 lg:-translate-y-28 xl:-translate-y-32">
        {/* 
          Main Title:
          - Mobile: Vertically stacked in exact order: 
                    1. Nikhil Jaiswal
                    2. X
                    3. Micro Freelancing
          - Desktop (md+): Smooth single inline title: Nikhil Jaiswal X Micro Freelancing
        */}
        <h1 className="font-serif-condensed text-[clamp(2rem,5.5vw,3.85rem)] font-normal tracking-[-0.015em] text-[#F9F8FA] leading-tight select-none flex flex-col items-center md:block">
          <span className="inline-block">Nikhil Jaiswal</span>
          
          <span className="font-sans font-semibold text-[#8C0808] my-2 sm:my-2.5 md:my-0 md:mx-3.5 lg:mx-4.5 inline-block text-[0.8em] md:text-[0.82em] align-baseline">
            X
          </span>
          
          <span className="inline-block">Micro Freelancing</span>
        </h1>

        {/* 
          Tagline:
          Directly underneath with balanced breathing room and refined Inter typography
        */}
        <p className="mt-5 sm:mt-6 md:mt-7 font-sans text-[clamp(0.875rem,1.85vw,1.35rem)] font-normal tracking-wide text-[#B4B4B4] antialiased">
          No time? I&apos;ll do it for a dime....
        </p>
      </div>
    </main>
  );
}
