"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface TaskItem {
  id: string;
  category: string;
  title: string;
  turnaround: string;
  problemSolution: string;
  tech: string[];
  clientReview?: string;
}

interface ProjectShowcase {
  title: string;
  url: string;
  logo: string;
  tagline: string;
  description: string;
  highlights: string[];
}

const taskDeliveries: TaskItem[] = [
  {
    id: "task-1",
    category: "Automation & Scripting",
    title: "Multi-Source Real Estate Data Scraping & Pipeline",
    turnaround: "Delivered in 4 Hours",
    problemSolution:
      "Automated the daily extraction of 500+ property listings, cleaning unstructured pricing data into a structured Excel sheet with custom filters and automated email dispatch.",
    tech: ["Python", "Playwright", "Pandas", "Excel Automation"],
    clientReview:
      "\"Saved me at least 15 hours of manual weekly work. Clean code and delivered well ahead of time!\"",
  },
  {
    id: "task-2",
    category: "Web & Platforms",
    title: "Next.js Custom Booking Flow & Payment Gateway",
    turnaround: "Delivered in 24 Hours",
    problemSolution:
      "Engineered an interactive slot-booking wizard with instant QR payment verification and automated WhatsApp notification webhooks.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Razorpay / UPI"],
    clientReview:
      "\"Smooth experience, pristine animations, and responsive on all screens. Highly recommended!\"",
  },
  {
    id: "task-3",
    category: "Integration & Setup",
    title: "Automated WhatsApp Business Bot & Order Routing",
    turnaround: "Delivered in 6 Hours",
    problemSolution:
      "Connected WhatsApp Cloud API to a client's CRM table to auto-reply to new inquiries, capture lead requirements, and send immediate quote estimates.",
    tech: ["Webhooks", "REST API", "Node.js", "Google Sheets API"],
    clientReview:
      "\"Quick turnaround, very communicative, and made sure our team knew exactly how to use it.\"",
  },
  {
    id: "task-4",
    category: "Deep Research & Analysis",
    title: "Market Competitor Matrix & Pricing Intelligence Report",
    turnaround: "Delivered in 12 Hours",
    problemSolution:
      "Synthesized pricing tiers, feature breakdowns, and customer sentiment across 8 direct SaaS competitors into an executive deck with actionable takeaways.",
    tech: ["Market Intelligence", "Quantitative Modeling", "Slide Deck", "Data Synthesis"],
    clientReview:
      "\"Super thorough and structured. Exactly the analytical rigor you'd expect from an IITian.\"",
  },
  {
    id: "task-5",
    category: "Academic & Technical Projects",
    title: "Machine Learning Classifier & Statistical Report",
    turnaround: "Delivered in 8 Hours",
    problemSolution:
      "Trained and evaluated Random Forest and Gradient Boosted models on multi-dimensional clinical test data, visualizing ROC curves, feature importances, and error distributions.",
    tech: ["Python", "Scikit-Learn", "Matplotlib", "Seaborn"],
    clientReview:
      "\"Flawless documentation, clear explanations of mathematical formulas, and crisp graphs.\"",
  },
  {
    id: "task-6",
    category: "Small Coding & Bug Fixes",
    title: "Cross-Browser Responsive Layout & Hydration Bug Resolution",
    turnaround: "Delivered in 90 Minutes",
    problemSolution:
      "Diagnosed and resolved critical SSR hydration mismatches, layout shifts, and mobile overflow bugs on an existing production web application.",
    tech: ["React", "CSS Grid", "Tailwind CSS", "DevTools Profiling"],
    clientReview:
      "\"Pinpointed the exact bug in minutes when others were stuck. Super sharp!\"",
  },
];

const featuredProjects: ProjectShowcase[] = [
  {
    title: "Tabiji Trails",
    url: "https://tabijitrails.com",
    logo: "/tabijitrails.png",
    tagline: "Curated Travel & Experiential Journeys",
    description:
      "A modern travel and experiential tourism platform offering custom itineraries, guided routes, and interactive booking experiences with optimized performance.",
    highlights: ["Interactive Route Maps", "Speed-Optimized Architecture", "Direct Booking Funnel"],
  },
  {
    title: "Star Studios",
    url: "https://starstudios.in",
    logo: "/starstudios.png",
    tagline: "Cinematography & Visual Production",
    description:
      "A high-end visual storytelling portfolio highlighting documentary sessions, brand campaigns, and multimedia showcases with cinematic fluidity.",
    highlights: ["Media Gallery Grid", "Mobile-First Touch Interactions", "Dark Mode Elegance"],
  },
  {
    title: "Thenikflow",
    url: "https://thenikflow.com",
    logo: "/tnf.png",
    tagline: "Digital Content & Creative Essays",
    description:
      "A publication brand focused on startup culture, technology essays, curated resources, and long-form intellectual storytelling.",
    highlights: ["Editorial Readability", "Clean Minimalist Theme", "Fast Static Generation"],
  },
];

export default function WorksPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Automation & Scripting",
    "Web & Platforms",
    "Integration & Setup",
    "Deep Research & Analysis",
    "Academic & Technical Projects",
  ];

  const filteredTasks =
    activeCategory === "All"
      ? taskDeliveries
      : taskDeliveries.filter((t) => t.category === activeCategory);

  const handleBackHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      router.push("/");
    }, 400);
  };

  return (
    <main
      className={`relative flex min-h-screen w-full flex-col items-center pt-16 sm:pt-20 pb-24 px-4 sm:px-6 md:px-8 overflow-hidden bg-obsidian transition-opacity duration-400 ${
        isExiting ? "opacity-0 scale-[0.99]" : "opacity-100 scale-100"
      }`}
    >
      {/* 3D Ambient Gold & Wine Spotlight Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-120 sm:h-140 overflow-hidden z-0 select-none"
      >
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[90vw] max-w-180 h-70 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(226,177,93,0.16)_0%,rgba(140,8,8,0.12)_45%,transparent_75%)] blur-2xl" />
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[110vw] max-w-260 h-90 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(217,160,65,0.08)_0%,rgba(160,110,35,0.03)_50%,transparent_75%)] blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-4xl lg:max-w-5xl mx-auto">
        {/* Top Navigation Bar: Back to Home button */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <button
            onClick={handleBackHome}
            type="button"
            className="group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/4 border border-white/10 backdrop-blur-sm text-text-primary font-sans text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-white/8 hover:border-white/20 hover:-translate-x-0.5 cursor-pointer"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </button>

          <span className="font-playwrite text-xs sm:text-sm text-white/40 tracking-wider">
            Nikhil Jaiswal Works
          </span>
        </div>

        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-sans font-medium text-brand-red bg-brand-red/10 border border-brand-red/25 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            Proof of Work & Client Deliveries
          </span>

          <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary tracking-[-0.01em] leading-tight">
            Curated Works & Projects
          </h1>

          <p className="mt-3.5 sm:mt-4 font-sans text-sm sm:text-base text-text-secondary leading-relaxed antialiased">
            A transparent log of completed micro-freelancing tasks, technical problem-solving, and live digital products crafted with speed and precision.
          </p>
        </div>

        {/* Section 1: Completed Micro-Freelancing Tasks */}
        <section className="mb-20 sm:mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-3 border-b border-white/10">
            <div>
              <h2 className="font-playwrite text-[clamp(1.2rem,2.4vw,1.65rem)] font-normal text-text-primary">
                Recent Task Deliveries
              </h2>
              <p className="mt-1 font-sans text-xs sm:text-sm text-text-secondary">
                Real tasks solved for clients, businesses, and creators.
              </p>
            </div>

            {/* Turnaround Guarantee Badge */}
            <div className="inline-flex items-center gap-1.5 text-[0.75rem] sm:text-xs font-sans text-white/60 bg-white/4 px-3 py-1 rounded-full border border-white/8 shrink-0 w-fit">
              <span className="text-emerald-400 font-semibold">100%</span>
              <span>On-Time Completion Rate</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-brand-red text-white shadow-[0_0_15px_rgba(140,8,8,0.6)] font-medium"
                    : "bg-white/4 border border-white/8 text-text-secondary hover:text-white hover:bg-white/8"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Task Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="group flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6),0_0_20px_-4px_rgba(226,177,93,0.08)]"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[0.7rem] sm:text-xs font-sans font-medium text-white/55 tracking-wide uppercase">
                      {task.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[0.7rem] sm:text-xs font-sans font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <span>⚡</span>
                      <span>{task.turnaround}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-base sm:text-[1.05rem] font-semibold text-text-primary tracking-[-0.01em] leading-snug group-hover:text-white transition-colors">
                    {task.title}
                  </h3>

                  {/* Problem & Solution */}
                  <p className="mt-2.5 font-sans text-xs sm:text-[0.875rem] text-text-secondary font-normal leading-relaxed">
                    {task.problemSolution}
                  </p>

                  {/* Tech stack badges */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    {task.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[0.68rem] sm:text-[0.72rem] font-sans font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client Review quote */}
                {task.clientReview && (
                  <div className="mt-4 pt-3.5 border-t border-white/8">
                    <p className="font-sans italic text-xs text-text-secondary/85 leading-relaxed">
                      {task.clientReview}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-amber-400 text-xs">
                      {"★".repeat(5)}
                      <span className="text-[0.68rem] text-white/45 ml-1.5 font-sans not-italic">
                        Verified Delivery
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Live Digital Platforms & Websites */}
        <section className="mb-20 sm:mb-24">
          <div className="mb-6 sm:mb-8 pb-3 border-b border-white/10">
            <h2 className="font-playwrite text-[clamp(1.2rem,2.4vw,1.65rem)] font-normal text-text-primary">
              Live Digital Platforms
            </h2>
            <p className="mt-1 font-sans text-xs sm:text-sm text-text-secondary">
              Production websites built from the ground up with clean engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((p) => (
              <a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/6 hover:-translate-y-1 hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.7)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center p-1 bg-white/5 border border-white/10 shrink-0">
                      <Image
                        src={p.logo}
                        alt={p.title}
                        width={40}
                        height={40}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <svg
                      className="w-4 h-4 text-text-secondary opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-red"
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
                  </div>

                  <h3 className="font-sans text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-sans text-xs text-brand-red font-medium mt-0.5">
                    {p.tagline}
                  </p>
                  <p className="mt-2.5 font-sans text-xs sm:text-[0.85rem] text-text-secondary leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-white/8 flex flex-wrap gap-1.5">
                  {p.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[0.68rem] font-sans px-2 py-0.5 rounded-full bg-white/4 border border-white/8 text-white/60"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Section 3: Direct Consultation & Booking CTA */}
        <section className="relative p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-b from-white/5 to-white/2 border border-white/12 text-center backdrop-blur-md overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(140,8,8,0.25)_0%,transparent_70%)]"
          />

          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="font-playwrite text-xl sm:text-2xl md:text-3xl font-normal text-text-primary leading-snug">
              Have a task in mind?
            </h2>
            <p className="mt-2.5 font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
              Delegate your small or medium technical work, automation, coding bugs, or desktop tasks. Discuss scope and get it delivered on time.
            </p>

            <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/916268011085?text=Hi%20Nikhil,%20I%20saw%20your%20works%20page%20and%20have%20a%20task!"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-black font-sans text-xs sm:text-sm font-semibold transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.08 7.4 8.84 7.66C8.61 7.92 7.94 8.55 7.94 9.83C7.94 11.11 8.87 12.35 9 12.53C9.13 12.7 10.8 15.42 13.45 16.46C15.65 17.33 16.1 17.15 16.57 17.11C17.04 17.07 18.1 16.49 18.32 15.87C18.54 15.25 18.54 14.72 18.47 14.61C18.4 14.5 18.23 14.44 17.97 14.31C17.71 14.18 16.43 13.55 16.19 13.46C15.95 13.37 15.78 13.33 15.61 13.59C15.44 13.85 14.95 14.44 14.8 14.61C14.65 14.78 14.5 14.8 14.24 14.67C13.98 14.54 13.14 14.27 12.15 13.38C11.38 12.69 10.86 11.84 10.71 11.58C10.56 11.32 10.7 11.18 10.83 11.05C10.95 10.93 11.09 10.75 11.22 10.6C11.35 10.45 11.39 10.34 11.48 10.17C11.57 10 11.53 9.85 11.46 9.72C11.39 9.59 10.83 8.23 10.6 7.68C10.37 7.15 10.14 7.22 9.97 7.21C9.81 7.21 9.68 7.34 9.53 7.34Z" />
                </svg>
                <span>WhatsApp Me</span>
              </a>

              <a
                href="tel:+916268011085"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-red text-text-primary font-playwrite text-xs sm:text-sm font-normal shadow-[0_4px_20px_-2px_rgba(140,8,8,0.5)] transition-all duration-300 hover:bg-[#a30b0b] hover:shadow-[0_0_25px_rgba(140,8,8,0.7)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Call Now</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
