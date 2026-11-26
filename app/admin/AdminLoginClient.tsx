"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  secretKey: string;
  otpauthUrl: string;
}

export default function AdminLoginClient({ secretKey, otpauthUrl }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [copied, setCopied] = useState(false);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(
    otpauthUrl
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleaned = code.trim().replace(/\s+/g, "");
    if (!cleaned || cleaned.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: cleaned }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Authenticated! Reload to show the completely blank admin canvas
        window.location.reload();
      } else {
        setError(data.error || "Invalid verification code. Please check your app.");
      }
    } catch {
      setError("Network or server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 bg-obsidian overflow-hidden">
      {/* 3D Ambient Red Spotlight Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-100 overflow-hidden z-0 select-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-140 h-70 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(140,8,8,0.22)_0%,rgba(140,8,8,0.06)_45%,transparent_75%)] blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(140,8,8,0.15)]">
          {/* Lock Icon & Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-red/15 border border-brand-red/30 mb-3 text-brand-red">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="font-playwrite text-2xl font-normal text-text-primary tracking-tight">
              Admin Verification
            </h1>
            <p className="mt-1.5 font-sans text-xs text-text-secondary leading-relaxed">
              Enter the 6-digit authentication code from your Google Authenticator app.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="totp-code"
                className="block text-[0.72rem] font-sans font-medium text-white/60 uppercase tracking-widest mb-1.5"
              >
                Verification Code
              </label>
              <input
                id="totp-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                placeholder="000000"
                autoFocus
                className="w-full text-center tracking-[0.4em] font-mono text-2xl py-3 px-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/20 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs font-sans leading-relaxed text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full py-3 px-4 rounded-full bg-brand-red text-white font-sans text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#a30b0b] hover:shadow-[0_0_25px_rgba(140,8,8,0.7)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify & Access"}
            </button>
          </form>

          {/* Setup / QR Code Helper Toggle */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={() => setShowSetup(!showSetup)}
              className="text-xs font-sans text-white/50 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{showSetup ? "Hide setup instructions" : "First time? Set up Google Authenticator"}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${showSetup ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showSetup && (
              <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-left space-y-3">
                <p className="text-xs font-sans text-white/70 leading-relaxed">
                  1. Open <strong>Google Authenticator</strong> on your phone.
                  <br />
                  2. Tap <strong>+</strong> &rarr; <strong>Scan a QR code</strong> (or Enter a setup key).
                </p>

                {/* QR Code image */}
                <div className="flex justify-center p-2 rounded-xl bg-white w-fit mx-auto shadow-md">
                  <Image
                    src={qrImageUrl}
                    alt="Google Authenticator QR Code"
                    width={180}
                    height={180}
                    unoptimized
                    className="rounded-lg"
                  />
                </div>

                <div className="pt-2">
                  <span className="block text-[0.7rem] font-sans text-white/50 mb-1">
                    Or manually enter this Secret Key:
                  </span>
                  <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black/40 border border-white/10 font-mono text-xs text-brand-red">
                    <span className="select-all tracking-wider">{secretKey}</span>
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="px-2.5 py-1 text-[0.7rem] font-sans text-white bg-white/10 rounded hover:bg-white/20 transition cursor-pointer"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
