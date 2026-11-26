import fs from "fs";
import path from "path";

export type ContentType = "image" | "video" | "link";

export interface Project {
  id: string;
  title: string;
  description: string;
  contentType: ContentType;
  linkUrl?: string;
  imageFile?: string;
  videoFile?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "projects.json");

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "varidhi",
    title: "Varidhi",
    description:
      "A complete frontend travel platform concept offering curated 15-day voyages across 10 selected islands worldwide. Features a group-booking mechanism requiring a minimum of five travellers for trips to commence, engineered entirely without a backend.",
    contentType: "link",
    linkUrl: "https://varidhi.netlify.app",
    createdAt: "2026-11-20T00:00:00.000Z",
  },
  {
    id: "ai-video",
    title: "AI Video Generation",
    description:
      "Conducted extensive research across generative video platforms to identify the optimal tool for business advertisements. Generated comparative test suites and delivered a client-selected commercial produced via Omni Video Generation.",
    contentType: "video",
    videoFile: "omni-ad.mp4",
    createdAt: "2026-11-21T00:00:00.000Z",
  },
  {
    id: "trading-automation",
    title: "Integration & Automation",
    description:
      "An automated 24/7 trade execution pipeline connecting TradingView strategy alerts directly to Delta Exchange via secure webhooks. Dispatches real-time BUY and SELL signals for hands-free trading with continuous reliability.",
    contentType: "link",
    createdAt: "2026-11-22T00:00:00.000Z",
  },
  {
    id: "living-soundscapes",
    title: "Deep Research – Global Musical Instruments & Cultural Heritage",
    description:
      "A comprehensive cross-cultural research initiative documenting traditional musical instruments and melodic traditions across the UK, USA, Canada, India, and Europe. Mapped by territories and provinces into an archived digital showcase and client monograph.",
    contentType: "link",
    linkUrl: "https://sites.google.com/view/living-soundscapes?usp=sharing",
    createdAt: "2026-11-23T00:00:00.000Z",
  },
];

export function getProjects(): Project[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_PROJECTS, null, 2), "utf8");
      return INITIAL_PROJECTS;
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading projects:", err);
    return INITIAL_PROJECTS;
  }
}

export function saveProjects(projects: Project[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), "utf8");
}
