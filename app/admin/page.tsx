import { cookies } from "next/headers";
import { verifySignedSessionToken, getOtpAuthUrl } from "@/lib/totp";
import AdminLoginClient from "./AdminLoginClient";

export const metadata = {
  title: "Admin Panel | Nikhil Jaiswal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const isAuthenticated = verifySignedSessionToken(sessionToken);

  // If authenticated, leave the admin panel completely blank as strictly requested
  // matching the existing website UI and overall theme (bg-obsidian).
  if (isAuthenticated) {
    return <main className="min-h-screen w-full bg-obsidian" />;
  }

  const secretKey = process.env.ADMIN_2FA_SECRET || "NQXRT5QQJMW5ARGUXGUN";
  const otpauthUrl = getOtpAuthUrl(secretKey, "Admin", "Nikhil Jaiswal");

  return <AdminLoginClient secretKey={secretKey} otpauthUrl={otpauthUrl} />;
}
