import Link from "next/link";
import ProjectVideoPlayer from "@/app/components/ProjectVideoPlayer";

interface ShowcaseProject {
  id: string;
  title: string;
  category: string;
  description: string;
  link?: {
    label: string;
    href: string;
  };
  hasVideoPlaceholder?: boolean;
}

const projects: ShowcaseProject[] = [
  {
    id: "varidhi",
    title: "Varidhi",
    category: "Frontend Engineering & Concept Design (College Project)",
    description:
      "A complete frontend travel platform concept offering curated 15-day voyages across 10 selected islands worldwide. Features a group-booking mechanism requiring a minimum of five travellers for trips to commence, engineered entirely without a backend.",
    link: {
      label: "varidhi.netlify.app",
      href: "https://varidhi.netlify.app",
    },
  },
  {
    id: "ai-video",
    title: "AI Video Generation",
    category: "AI Research & Generative Media",
    description:
      "Conducted extensive research across generative video platforms to identify the optimal tool for business advertisements. Generated comparative test suites and delivered a client-selected commercial produced via Omni Video Generation.",
    hasVideoPlaceholder: true,
  },
  {
    id: "trading-automation",
    title: "Integration & Automation",
    category: "FinTech & Webhook Automation",
    description:
      "An automated 24/7 trade execution pipeline connecting TradingView strategy alerts directly to Delta Exchange via secure webhooks. Dispatches real-time BUY and SELL signals for hands-free trading with continuous reliability.",
  },
  {
    id: "living-soundscapes",
    title: "Deep Research – Global Musical Instruments & Cultural Heritage",
    category: "Cultural Ethnography & In-Depth Research",
    description:
      "A comprehensive cross-cultural research initiative documenting traditional musical instruments and melodic traditions across the UK, USA, Canada, India, and Europe. Mapped by territories and provinces into an archived digital showcase and client monograph.",
    link: {
      label: "sites.google.com/view/living-soundscapes",
      href: "https://sites.google.com/view/living-soundscapes?usp=sharing",
    },
  },
];

export const metadata = {
  title: "Explore Works | Nikhil Jaiswal",
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
        {/* Top Navigation: Responsive Back to Home */}
        <div className="flex items-center justify-between mb-12 sm:mb-16 pb-4 border-b border-white/8">
          <Link
            href="/"
            aria-label="Back to home"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-text-secondary hover:text-white transition-colors duration-200"
          >
            <svg
              className="w-4.5 h-4.5 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden md:inline">Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="mb-14 sm:mb-20 text-left">
          <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary tracking-[-0.01em] leading-tight">
            Explore Works
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
              className="group relative flex flex-col gap-3 text-left"
            >
              {/* Divider between items (except the first) */}
              {idx > 0 && (
                <div
                  className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8 sm:mb-12"
                  aria-hidden="true"
                />
              )}

              {/* Category */}
              <span className="font-sans text-xs sm:text-sm font-medium text-text-secondary/70">
                {project.category}
              </span>

              {/* Title */}
              <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-semibold text-text-primary tracking-tight">
                {project.title}
              </h2>

              {/* Concise Description */}
              <p className="font-sans text-sm sm:text-base text-text-secondary font-normal leading-relaxed">
                {project.description}
              </p>

              {/* Live Link: Bold, White, Non-red */}
              {project.link && (
                <div className="pt-0.5">
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-sm sm:text-base font-bold text-white hover:text-white/80 underline underline-offset-4 decoration-white/40 hover:decoration-white transition-all w-fit"
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
                        strokeWidth="2.5"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}

              {/* Play / Pause Video for Project 2 */}
              {project.hasVideoPlaceholder && (
                <ProjectVideoPlayer src="/omni-ad.mp4" />
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
