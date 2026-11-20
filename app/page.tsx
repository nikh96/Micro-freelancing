"use client";

import { useState, useEffect, type JSX, type CSSProperties } from "react";
import Image from "next/image";

interface SocialLink {
  name: string;
  href: string;
  brandColor: string;
  hoverGlow: string;
  borderColor: string;
  iconBg: string;
  icon: JSX.Element;
}

interface ProcessStep {
  step: number;
  title: string;
}

interface ServiceItem {
  title: string;
  description: string;
  icon: JSX.Element;
}

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Send your details",
  },
  {
    step: 2,
    title: "Pay 20% advance",
  },
  {
    step: 3,
    title: "Get it done and pay the rest.",
  },
];

const serviceItems: ServiceItem[] = [
  {
    title: "MS Office Work",
    description: "(Excel, Word, PowerPoint, etc.)",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 stroke-current"
        fill="none"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zM9 13.5h6m-6 3.75h6"
        />
      </svg>
    ),
  },
  {
    title: "Simple Websites / Platforms",
    description: "(Frontend, basic backend, etc.)",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 stroke-current"
        fill="none"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3"
        />
      </svg>
    ),
  },
  {
    title: "Small Coding & Technical Tasks",
    description: "(Scripts, bug fixes, basic projects, etc.)",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 stroke-current"
        fill="none"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
  },
  {
    title: "Integrations & Setup",
    description: "(WhatsApp Business, Payment Gateway, etc.)",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 stroke-current"
        fill="none"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6.495 3.1 1.354 4.35L2.25 21.75l4.89-1.282A9.704 9.704 0 0012 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25 2.25 6.615 2.25 12z"
        />
      </svg>
    ),
  },
  {
    title: "Data Handling & Analysis",
    description: "(Data cleaning, charts, reports, etc.)",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 stroke-current"
        fill="none"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
  },
  {
    title: "Design & Social Media Work",
    description: "(Posts, banners, presentations – Canva, etc.)",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 stroke-current"
        fill="none"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
    ),
  },
  {
    title: "AI-based Tasks",
    description: "(Research, content, summaries, etc.)",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 stroke-current"
        fill="none"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
        />
      </svg>
    ),
  },
  {
    title: "College Projects & Other Work",
    description: "(Academic or general desktop tasks)",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-6.5 md:h-6.5 lg:w-7 lg:h-7 stroke-current"
        fill="none"
        strokeWidth="1.75"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
  },
];

const socialLinks: SocialLink[] = [
  {
    name: "Email",
    href: "mailto:nj7699844@gmail.com",
    brandColor: "#EA4335",
    hoverGlow: "rgba(234,67,53,0.25)",
    borderColor: "rgba(234,67,53,0.22)",
    iconBg: "rgba(234,67,53,0.12)",
    icon: (
      <svg
        className="w-5 h-5 fill-[#EA4335] transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4M20 8L12 13L4 8V6L12 11L20 6V8Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/nikh96",
    brandColor: "#E6EDF3",
    hoverGlow: "rgba(230,237,243,0.2)",
    borderColor: "rgba(230,237,243,0.18)",
    iconBg: "rgba(230,237,243,0.1)",
    icon: (
      <svg
        className="w-5 h-5 fill-[#E6EDF3] transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2A10 10 0 0 0 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21C9.5 20.77 9.5 20.14 9.5 19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26C14.5 19.6 14.5 20.68 14.5 21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/benikhil",
    brandColor: "#0A66C2",
    hoverGlow: "rgba(10,102,194,0.25)",
    borderColor: "rgba(10,102,194,0.22)",
    iconBg: "rgba(10,102,194,0.12)",
    icon: (
      <svg
        className="w-5 h-5 fill-[#0A66C2] transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/916268011085?text=Hii%20Nikhil%20!",
    brandColor: "#25D366",
    hoverGlow: "rgba(37,211,102,0.25)",
    borderColor: "rgba(37,211,102,0.22)",
    iconBg: "rgba(37,211,102,0.12)",
    icon: (
      <svg
        className="w-5 h-5 fill-[#25D366] transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.08 7.4 8.84 7.66C8.61 7.92 7.94 8.55 7.94 9.83C7.94 11.11 8.87 12.35 9 12.53C9.13 12.7 10.8 15.42 13.45 16.46C15.65 17.33 16.1 17.15 16.57 17.11C17.04 17.07 18.1 16.49 18.32 15.87C18.54 15.25 18.54 14.72 18.47 14.61C18.4 14.5 18.23 14.44 17.97 14.31C17.71 14.18 16.43 13.55 16.19 13.46C15.95 13.37 15.78 13.33 15.61 13.59C15.44 13.85 14.95 14.44 14.8 14.61C14.65 14.78 14.5 14.8 14.24 14.67C13.98 14.54 13.14 14.27 12.15 13.38C11.38 12.69 10.86 11.84 10.71 11.58C10.56 11.32 10.7 11.18 10.83 11.05C10.95 10.93 11.09 10.75 11.22 10.6C11.35 10.45 11.39 10.34 11.48 10.17C11.57 10 11.53 9.85 11.46 9.72C11.39 9.59 10.83 8.23 10.6 7.68C10.37 7.15 10.14 7.22 9.97 7.21C9.81 7.21 9.68 7.34 9.53 7.34Z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPhotoOpen(false);
      }
    };
    if (isPhotoOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPhotoOpen]);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center pt-25 px-4 sm:px-6 md:px-8 overflow-hidden bg-obsidian">
      {/* 
        3D Gold / Warm Spotlight Glow:
        Positioned directly behind the top header to cast a luxurious ambient halo,
        creating atmospheric depth against the Deep Obsidian backdrop.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-5 sm:top-7.5 md:top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-105 sm:h-120 md:h-135 overflow-hidden z-0 select-none"
      >
        {/* Core Warm Gold Spotlight */}
        <div className="absolute top-7.5 left-1/2 -translate-x-1/2 w-[90vw] max-w-187.5 h-65 sm:h-80 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(226,177,93,0.18)_0%,rgba(196,142,54,0.08)_45%,transparent_75%)] blur-2xl" />

        {/* Extended Ambient Warm Glow for 3D depth */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-[120vw] max-w-275 h-95 sm:h-110 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(217,160,65,0.09)_0%,rgba(160,110,35,0.03)_50%,transparent_75%)] blur-3xl" />
      </div>

      {/* 
        Hero content container:
        Horizontally centered, positioned ~100px from the top edge.
      */}
      <div className="relative z-10 w-full max-w-6xl text-center">
        {/* 
          Main Title:
          - Mobile (< md): Three separate lines (Nikhil Jaiswal / x / Micro Freelancing) with tight cohesive spacing
          - Desktop (md+): Restored to a single unified line with horizontal spacing
        */}
        <h1 className="font-oswald text-[clamp(1.75rem,4.8vw,2.35rem)] md:text-[clamp(2.5rem,4vw,3.65rem)] font-normal tracking-[0.01em] text-text-primary select-none flex flex-col md:flex-row items-center justify-center leading-[1.08] md:leading-none md:whitespace-nowrap">
          <span>Nikhil Jaiswal</span>

          <span className="font-sans font-medium text-brand-red text-[0.62em] md:text-[0.8em] my-1 sm:my-1.5 md:my-0 md:mx-3.5 lg:mx-4.5 leading-none select-none">
            x
          </span>

          <span>Micro Freelancing</span>
        </h1>

        {/* 
          Tagline:
          Directly underneath with balanced breathing room
        */}
        <p className="mt-4 sm:mt-5 md:mt-6 font-sans text-[clamp(0.8rem,1.9vw,1.35rem)] font-normal tracking-wide text-text-secondary antialiased">
          Got No time? I&apos;ll do it for a dime....
        </p>

        {/* 
          Social Actions:
          - Order: 1. Email, 2. GitHub, 3. LinkedIn, 4. WhatsApp
          - Desktop: Luxury glass pill buttons with brand borders and glow
          - Mobile: Clean, minimal, direct logo + text rows WITHOUT background cards or containers
        */}
        <div className="mt-9 sm:mt-11 md:mt-14 flex flex-col items-center justify-center gap-3.5 sm:gap-4 md:flex-row md:gap-4 lg:gap-5 w-auto mx-auto">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.name === "Email" ? undefined : "_blank"}
              rel={link.name === "Email" ? undefined : "noopener noreferrer"}
              className="group relative flex items-center justify-center gap-2.5 py-1.5 px-3 transition-all duration-300 active:opacity-75 md:active:opacity-100 md:gap-3 md:px-6 md:py-3.5 md:rounded-full md:bg-[#111116]/85 md:border md:border-(--brand-border) md:backdrop-blur-md md:hover:-translate-y-0.5 md:active:translate-y-0"
              style={
                {
                  "--brand-border": link.borderColor,
                  "--brand-glow": link.hoverGlow,
                  "--brand-bg": link.iconBg,
                } as CSSProperties
              }
            >
              {/* Subtle hover backlight glow (Desktop only) */}
              <span
                aria-hidden="true"
                className="hidden md:block absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"
                style={{
                  boxShadow: `0 0 25px ${link.hoverGlow}`,
                  backgroundColor: link.iconBg,
                }}
              />

              {/* Platform Logo */}
              <span className="flex items-center justify-center w-5 h-5 md:w-7 md:h-7 md:rounded-full transition-colors duration-300 md:bg-(--brand-bg)">
                {link.icon}
              </span>

              {/* Platform Name in Playwrite France Moderne */}
              <span
                className="font-playwrite text-[1rem] md:text-[1.05rem] font-normal transition-colors duration-300 group-hover:brightness-125"
                style={{ color: link.brandColor }}
              >
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* 
        Value Proposition / Services Intro Section:
        Positioned below the hero buttons with generous breathing room.
      */}
      <section className="relative z-10 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto text-center mt-20 sm:mt-24 md:mt-28 pb-4 sm:pb-6 px-4">
        {/* Main Section Heading */}
        <h2 className="font-playwrite text-[clamp(1.35rem,3.2vw,2.25rem)] font-normal text-text-primary leading-snug">
          Have a task but short on time?
        </h2>

        {/* Description in Grey */}
        <p className="mt-3.5 sm:mt-4 md:mt-5 font-sans text-[clamp(0.925rem,1.8vw,1.15rem)] font-normal leading-relaxed text-text-secondary max-w-2xl mx-auto antialiased">
          Delegate your small or medium desktop work to me and get it done on time and with quality.
        </p>

        {/* 
          Step-by-step process:
          - Desktop: Horizontal progression with wider, more spacious cards extending gracefully to the left and right
          - Mobile: Clean, container-free steps (no card backgrounds) with vertical progression
        */}
        <div className="mt-9 sm:mt-11 md:mt-14 flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 w-full">
          {processSteps.map((item, idx) => (
            <div
              key={item.step}
              className="flex flex-col md:flex-row items-center justify-center w-full md:w-auto"
            >
              {/* Step Item: Glass pill card with smooth luxury hover elevation */}
              <div className="group/step cursor-pointer flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 md:px-6 lg:px-7 md:py-3.5 lg:py-4 rounded-full bg-white/3 border border-white/10 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/6 hover:border-white/25 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6),0_0_20px_-3px_rgba(226,177,93,0.12)] active:translate-y-0">
                {/* Numbered Circle */}
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-8.5 md:h-8.5 lg:w-9 lg:h-9 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm md:text-sm lg:text-base font-sans font-semibold text-text-primary shrink-0 transition-all duration-300 group-hover/step:bg-white/20 group-hover/step:border-white/35 group-hover/step:scale-105">
                  {item.step}
                </span>

                {/* Step Text */}
                <span className="font-sans text-xs sm:text-sm md:text-base lg:text-[1.025rem] font-medium text-text-primary whitespace-nowrap transition-colors duration-300 group-hover/step:text-white">
                  {item.title}
                </span>
              </div>

              {/* Arrow Indicator pointing to next step (omitted after last step) */}
              {idx < processSteps.length - 1 && (
                <>
                  {/* Desktop Horizontal Arrow */}
                  <div
                    className="hidden md:flex items-center justify-center mx-2.5 lg:mx-4 text-white/35 shrink-0"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-4.5 h-4.5 lg:w-5.5 lg:h-5.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>

                  {/* Mobile Vertical Arrow */}
                  <div
                    className="flex md:hidden items-center justify-center my-1 text-white/35"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                      />
                    </svg>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Subheading */}
        <h3 className="mt-12 sm:mt-14 md:mt-16 font-playwrite text-[clamp(1.15rem,2.4vw,1.65rem)] font-normal text-text-primary leading-snug">
          I can help you with:
        </h3>

        {/* 
          Capabilities / Services Grid:
          - Desktop view: Two-column grid layout matching the reference image
          - Mobile view: Single column vertical stack
          - Clean, minimal layout without outer card backgrounds
        */}
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-10 lg:gap-x-12 xl:gap-x-14 gap-y-5 sm:gap-y-6 md:gap-y-7 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-left">
          {serviceItems.map((service) => (
            <div
              key={service.title}
              className="group flex items-start gap-3.5 sm:gap-4.5 md:gap-5 lg:gap-6 py-1 md:py-1.5"
            >
              {/* Icon Container: Larger tile on desktop, unchanged on mobile */}
              <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl bg-white/4 border border-white/10 text-text-primary shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:border-white/20">
                {service.icon}
              </div>

              {/* Content: Slightly larger on desktop, completely unchanged on mobile */}
              <div className="flex-1 min-w-0">
                <h4 className="font-sans text-[0.975rem] sm:text-[1.05rem] md:text-[1.15rem] lg:text-[1.25rem] font-semibold text-text-primary tracking-[-0.01em] leading-snug">
                  {service.title}
                </h4>
                <p className="mt-1 md:mt-1.5 font-sans text-xs sm:text-[0.875rem] md:text-[0.95rem] lg:text-[1rem] text-text-secondary font-normal leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        Profile / About Me Section:
        - Desktop: Photo on the left, Name and Designation on the right.
        - Mobile: Vertically stacked, centered photo, name, and designation.
      */}
      <section className="relative z-10 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto mt-14 sm:mt-18 md:mt-24 pb-24 sm:pb-32 px-4">
        {/* Subtle decorative divider line */}
        <div
          className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 sm:mb-14 md:mb-16"
          aria-hidden="true"
        />

        <div className="flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-6 md:gap-8 lg:gap-10 text-center md:text-left">
          {/* Profile Photo - Clickable to open full-screen */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsPhotoOpen(true)}
              className="group/photo relative block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-zoom-in transition-transform duration-300 hover:scale-105 active:scale-100"
              aria-label="View profile photo full screen"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-2 ring-white/15 ring-offset-4 ring-offset-obsidian shadow-[0_0_35px_-5px_rgba(226,177,93,0.15)] transition-all duration-300 group-hover/photo:ring-white/35 group-hover/photo:shadow-[0_0_45px_rgba(226,177,93,0.25)]">
                <Image
                  src="/profile.jpeg"
                  alt="Nikhil Jaiswal"
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-cover object-center transition-transform duration-500 group-hover/photo:scale-105"
                  priority
                />
              </div>
            </button>
          </div>

          {/* Name, Designation & CV Button */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-oswald text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.25rem] font-normal text-text-primary tracking-[-0.01em] leading-tight">
              Nikhil Jaiswal
            </h3>
            <p className="mt-1 sm:mt-1.5 md:mt-2 font-sans text-[clamp(0.82rem,3.4vw,1.125rem)] text-text-secondary font-normal tracking-wide whitespace-nowrap">
              Student | Data Science @ IIT Madras
            </p>

            {/* Action Buttons: My CV & Call Now */}
            <div className="mt-4 sm:mt-4.5 md:mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-3.5">
              {/* My CV Button */}
              <a
                href="/MYCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-brand-red text-text-primary font-playwrite text-[0.85rem] sm:text-[0.95rem] font-normal shadow-[0_4px_20px_-2px_rgba(140,8,8,0.5)] transition-all duration-300 hover:bg-[#a30b0b] hover:shadow-[0_0_25px_rgba(140,8,8,0.7)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>My CV</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

              {/* Call Now Button */}
              <a
                href="tel:+916268011085"
                className="group relative inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-brand-red text-text-primary font-playwrite text-[0.85rem] sm:text-[0.95rem] font-normal shadow-[0_4px_20px_-2px_rgba(140,8,8,0.5)] transition-all duration-300 hover:bg-[#a30b0b] hover:shadow-[0_0_25px_rgba(140,8,8,0.7)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Call Now</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Photo Full-Screen Lightbox Modal */}
      {isPhotoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Profile photo full screen view"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md cursor-zoom-out"
          onClick={() => setIsPhotoOpen(false)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsPhotoOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200 focus:outline-none cursor-pointer"
            aria-label="Close full screen view"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal Image Container */}
          <div
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[85vh] aspect-[1160/1356] rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/profile.jpeg"
              alt="Nikhil Jaiswal"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </main>
  );
}
