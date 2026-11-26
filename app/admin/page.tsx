import { cookies } from "next/headers";
import { verifySignedSessionToken, getOtpAuthUrl } from "@/lib/totp";
import { getProjects } from "@/lib/projects";
import AdminLoginClient from "./AdminLoginClient";
import AdminDashboardClient from "./AdminDashboardClient";

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

  if (isAuthenticated) {
    const projects = getProjects();
    return <AdminDashboardClient initialProjects={projects} />;
  }

  const secretKey = process.env.ADMIN_2FA_SECRET || "NQXRT5QQJMW5ARGUXGUN";
  const otpauthUrl = getOtpAuthUrl(secretKey, "Admin", "Nikhil Jaiswal");

  return <AdminLoginClient secretKey={secretKey} otpauthUrl={otpauthUrl} />;
}
