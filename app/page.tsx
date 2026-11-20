import type { JSX, CSSProperties } from "react";

interface SocialLink {
  name: string;
  href: string;
  brandColor: string;
  hoverGlow: string;
  borderColor: string;
  iconBg: string;
  icon: JSX.Element;
}

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
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center pt-[100px] px-4 sm:px-6 md:px-8 overflow-hidden bg-[#070709]">
      {/* 
        3D Gold / Warm Spotlight Glow:
        Positioned directly behind the top header to cast a luxurious ambient halo,
        creating atmospheric depth against the Deep Obsidian backdrop.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[20px] sm:top-[30px] md:top-[40px] left-1/2 -translate-x-1/2 w-full max-w-5xl h-[380px] sm:h-[440px] md:h-[500px] overflow-hidden -z-0 select-none"
      >
        {/* Core Warm Gold Spotlight */}
        <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[90vw] max-w-[750px] h-[220px] sm:h-[280px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(226,177,93,0.18)_0%,rgba(196,142,54,0.08)_45%,transparent_75%)] blur-2xl" />

        {/* Extended Ambient Warm Glow for 3D depth */}
        <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-[120vw] max-w-[1100px] h-[340px] sm:h-[400px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(217,160,65,0.09)_0%,rgba(160,110,35,0.03)_50%,transparent_75%)] blur-3xl" />
      </div>

      {/* 
        Hero content container:
        Horizontally centered, positioned ~100px from the top edge.
      */}
      <div className="relative z-10 w-full max-w-6xl text-center">
        {/* 
          Main Title:
          Strictly kept on a SINGLE LINE across all devices
        */}
        <h1 className="font-serif-condensed whitespace-nowrap text-[clamp(1.15rem,4.5vw,3.85rem)] font-normal tracking-[-0.015em] text-[#F9F8FA] leading-none select-none flex items-center justify-center">
          <span>Nikhil Jaiswal</span>

          <span className="font-sans font-semibold text-[#8C0808] mx-1.5 sm:mx-2.5 md:mx-4 lg:mx-4.5 text-[0.8em] md:text-[0.82em]">
            X
          </span>

          <span>Micro Freelancing</span>
        </h1>

        {/* 
          Tagline:
          Directly underneath on its own line
        */}
        <p className="mt-3 sm:mt-4 md:mt-5 font-sans text-[clamp(0.72rem,1.9vw,1.35rem)] font-normal tracking-wide text-[#B4B4B4] antialiased whitespace-nowrap">
          No time? I&apos;ll do it for a dime....
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
              className="group relative flex items-center justify-center gap-2.5 py-1.5 px-3 transition-all duration-300 active:opacity-75 md:active:opacity-100 md:gap-3 md:px-6 md:py-3.5 md:rounded-full md:bg-[#111116]/85 md:border md:[border-color:var(--brand-border)] md:backdrop-blur-md md:hover:-translate-y-0.5 md:active:translate-y-0"
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
              <span className="flex items-center justify-center w-5 h-5 md:w-7 md:h-7 md:rounded-full transition-colors duration-300 md:bg-[var(--brand-bg)]">
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
    </main>
  );
}
