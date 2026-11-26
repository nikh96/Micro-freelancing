import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedSessionToken } from "@/lib/totp";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const authenticated = verifySignedSessionToken(token);
  return NextResponse.json({ authenticated });
}
