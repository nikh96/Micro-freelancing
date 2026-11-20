import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif, Noto_Serif_Ethiopic, Playwrite_FR_Moderne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerifEthiopic = Noto_Serif_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-noto-serif-ethiopic",
  display: "swap",
});

const playwriteFRModerne = Playwrite_FR_Moderne({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite-fr-moderne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nikhil Jaiswal × Micro Freelancing",
  description: "No time? I'll do it for a dime....",
};

export const viewport: Viewport = {
  themeColor: "#262920",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerif.variable} ${notoSerifEthiopic.variable} ${playwriteFRModerne.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#262920] text-[#F9F8FA] antialiased selection:bg-[#8C0808] selection:text-[#F9F8FA]"
      >
        {children}
      </body>
    </html>
  );
}
