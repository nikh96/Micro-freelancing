import Link from "next/link";

interface ShowcaseProject {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  link?: {
    label: string;
    href: string;
  };
  highlights: string[];
  hasVideoPlaceholder?: boolean;
}

const projects: ShowcaseProject[] = [
  {
    id: "varidhi",
    index: "01",
    title: "Varidhi – Island Travel Experience",
    category: "Frontend Engineering & Concept Design (College Project)",
    description:
      "A complete frontend travel platform concept offering curated 15-day voyages across 10 selected islands worldwide. Features a group-booking mechanism requiring a minimum of five travellers for trips to commence, engineered entirely without a backend.",
    link: {
      label: "varidhi.netlify.app",
      href: "https://varidhi.netlify.app",
    },
    highlights: ["10 Island Itineraries", "Group Travel Funnel", "Zero-Backend Frontend"],
  },
  {
    id: "ai-video",
    index: "02",
    title: "AI Video Generation & Commercial Production",
    category: "AI Research & Generative Media",
    description:
      "Conducted extensive research across generative video platforms to identify the optimal tool for business advertisements. Generated comparative test suites and delivered a client-selected commercial produced via Omni Video Generation.",
    highlights: ["Omni Video Generation", "Commercial Ad Scripting", "Tool Benchmarking"],
    hasVideoPlaceholder: true,
  },
  {
    id: "trading-automation",
    index: "03",
    title: "TradingView to Delta Exchange Automation",
    category: "Integration & Webhook Automation",
    description:
      "An automated 24/7 trade execution pipeline connecting TradingView strategy alerts directly to Delta Exchange via secure webhooks. Dispatches real-time BUY and SELL signals for hands-free trading with continuous reliability.",
    highlights: ["TradingView Webhooks", "Delta Exchange API", "24/7 Automated Execution"],
  },
  {
    id: "living-soundscapes",
    index: "04",
    title: "Living Soundscapes – Musical Instruments & Cultural Heritage",
    category: "Cultural Ethnography & In-Depth Research",
    description:
      "A comprehensive cross-cultural research initiative documenting traditional musical instruments and melodic traditions across the UK, USA, Canada, India, and Europe. Mapped by territories and provinces into an archived digital showcase and client monograph.",
    link: {
      label: "sites.google.com/view/living-soundscapes",
      href: "https://sites.google.com/view/living-soundscapes?usp=sharing",
    },
    highlights: ["Global Cultural Mapping", "Regional Soundscapes", "Archival Documentation"],
  },
];

export const metadata = {
  title: "Works & Case Studies | Nikhil Jaiswal",
  description: "Curated showcase of frontend platforms, generative AI research, automation, and deep research.",
};

export default function WorksPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 px-4 sm:px-6 md:px-8 bg-obsidian text-text-primary antialiased">
      {/* Ambient Gold & Red Spotlight Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-110 sm:h-130 overflow-hidden z-0 select-none"
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-180 h-65 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(226,177,93,0.14)_0%,rgba(140,8,8,0.1)_45%,transparent_75%)] blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-3xl lg:max-w-4xl mx-auto">
        {/* Top Navigation: Minimal Back to Home */}
        <div className="flex items-center justify-between mb-12 sm:mb-16 pb-4 border-b border-white/8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-text-secondary hover:text-white transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </Link>

          <span className="font-playwrite text-xs sm:text-sm text-white/40 tracking-wider">
            Nikhil Jaiswal
          </span>
        </div>

        {/* Page Header */}
        <header className="mb-14 sm:mb-20 text-left">
          <span className="font-sans text-xs sm:text-[0.8rem] font-medium tracking-widest uppercase text-brand-red">
            Selected Case Studies
          </span>
          <h1 className="mt-2.5 font-oswald text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary tracking-[-0.01em] leading-tight">
            Curated Deliveries &amp; Research
          </h1>
          <p className="mt-3.5 font-sans text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
            A transparent record of live frontend engineering, generative AI workflows, automated integrations, and cultural research.
          </p>
        </header>

        {/* Projects Feed: One below another consistently across Desktop & Mobile */}
        <div className="flex flex-col gap-12 sm:gap-16 md:gap-20 w-full">
          {projects.map((project, idx) => (
            <article
              key={project.id}
              className="group relative flex flex-col gap-3.5 text-left"
            >
              {/* Divider between items (except the first) */}
              {idx > 0 && (
                <div
                  className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8 sm:mb-12"
                  aria-hidden="true"
                />
              )}

              {/* Index & Category Row */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs sm:text-sm font-semibold text-brand-red tracking-wider">
                  {project.index}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" aria-hidden="true" />
                <span className="font-sans text-xs sm:text-sm font-medium text-text-secondary/70">
                  {project.category}
                </span>
              </div>

              {/* Title & Optional Live Link */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-semibold text-text-primary tracking-tight">
                  {project.title}
                </h2>

                {project.link && (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-sans text-xs sm:text-sm font-medium text-brand-red hover:text-red-400 transition-colors duration-200 mt-0.5"
                  >
                    <span>{project.link.label}</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>

              {/* Concise Description */}
              <p className="font-sans text-sm sm:text-base text-text-secondary font-normal leading-relaxed">
                {project.description}
              </p>

              {/* Video Player Showcase Placeholder for Project 2 */}
              {project.hasVideoPlaceholder && (
                <div className="mt-3 w-full aspect-video rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden flex flex-col items-center justify-center text-center p-6 shadow-inner group/video">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-red/15 border border-brand-red/30 flex items-center justify-center text-brand-red mb-3 transition-transform duration-300 group-hover/video:scale-105">
                    <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-medium text-text-primary">
                    Omni Video Generation – Client Commercial
                  </span>
                  <span className="mt-1 font-sans text-[0.75rem] sm:text-xs text-text-secondary/70">
                    Video showcase frame ready for hosting integration
                  </span>
                </div>
              )}

              {/* Highlights / Tags */}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {project.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-xs sm:text-[0.8rem] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/8 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Footer Note */}
        <footer className="mt-20 sm:mt-24 pt-8 border-t border-white/8 text-center">
          <p className="font-sans text-xs sm:text-sm text-text-secondary">
            Have a project or technical task?{" "}
            <a
              href="https://wa.me/916268011085?text=Hi%20Nikhil,%20I%20saw%20your%20works%20page%20and%20wanted%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>Connect on WhatsApp</span>
              <svg className="w-3 h-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
