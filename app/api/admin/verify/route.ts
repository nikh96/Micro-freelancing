import { NextResponse } from "next/server";
import { verifyTOTP, createSignedSessionToken } from "@/lib/totp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const code = body?.code;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { success: false, error: "6-digit code is required." },
        { status: 400 }
      );
    }

    const isValid = verifyTOTP(code);
    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid verification code. Please check your Google Authenticator app and try again.",
        },
        { status: 401 }
      );
    }

    const token = createSignedSessionToken("admin");
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error during verification." },
      { status: 500 }
    );
  }
}
