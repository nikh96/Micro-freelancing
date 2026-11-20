export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* 
        Hero content container:
        Horizontally centered, shifted upwards further (approx 40% more) 
        to position the content prominently in the upper-middle portion of the screen.
      */}
      <div className="w-full max-w-6xl text-center -translate-y-14 sm:-translate-y-20 md:-translate-y-24 lg:-translate-y-28 xl:-translate-y-32">
        {/* Main Title: Nikhil Jaiswal X Micro Freelancing */}
        <h1 className="font-serif-condensed text-[clamp(1.75rem,5.2vw,3.85rem)] font-normal tracking-[-0.015em] text-[#F9F8FA] leading-tight select-none">
          <span className="inline-block">Nikhil Jaiswal</span>
          <span className="font-sans font-semibold text-[#8C0808] mx-2.5 sm:mx-3.5 md:mx-4.5 inline-block text-[0.82em] align-baseline">
            X
          </span>
          <span className="inline-block">Micro Freelancing</span>
        </h1>

        {/* Tagline: No time? I'll do it for a dime.... */}
        <p className="mt-4 sm:mt-5 md:mt-6 font-sans text-[clamp(0.9rem,1.9vw,1.35rem)] font-normal tracking-wide text-[#B4B4B4] antialiased">
          No time? I&apos;ll do it for a dime....
        </p>
      </div>
    </main>
  );
}
