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

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(
    otpauthUrl
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleaned = code.trim().replace(/\s+/g, "");
    if (!cleaned || cleaned.length !== 6) {
      setError("Please enter the 6-digit code.");
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
        window.location.reload();
      } else {
        setError(data.error || "Incorrect code. Please check your app.");
      }
    } catch {
      setError("Unable to verify. Please try again.");
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
      {/* Ambient Red Spotlight Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-100 overflow-hidden z-0 select-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-140 h-70 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(140,8,8,0.22)_0%,rgba(140,8,8,0.06)_45%,transparent_75%)] blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto">
        <div className="rounded-3xl bg-white/3 border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(140,8,8,0.15)]">
          {/* Header */}
          <div className="text-center mb-7">
            <h1 className="font-playwrite text-2xl sm:text-3xl font-normal text-text-primary tracking-tight">
              Admin Verification
            </h1>
            <p className="mt-2 font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
              Enter the 6-digit code from Google Authenticator.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="totp-code"
                className="block text-sm sm:text-base font-sans font-medium text-text-secondary mb-2"
              >
                Authentication Code
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
                className="w-full text-center tracking-[0.45em] font-mono text-2xl sm:text-3xl py-3.5 px-4 rounded-2xl bg-white/5 border border-white/15 text-text-primary placeholder-white/20 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
              />
            </div>

            {error && (
              <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-200 text-sm font-sans leading-relaxed text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full py-3.5 px-6 rounded-full bg-brand-red text-text-primary font-playwrite text-base sm:text-lg font-normal shadow-[0_4px_25px_-4px_rgba(140,8,8,0.7)] border border-white/20 transition-all duration-300 hover:bg-[#a30b0b] hover:shadow-[0_0_35px_rgba(140,8,8,0.85)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify & Access"}
            </button>
          </form>

          {/* QR Setup Toggle */}
          <div className="mt-7 pt-6 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={() => setShowSetup(!showSetup)}
              className="text-sm sm:text-base font-sans text-text-secondary hover:text-text-primary transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>{showSetup ? "Hide QR Setup" : "Set up Google Authenticator"}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${showSetup ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showSetup && (
              <div className="mt-5 p-5 rounded-2xl bg-white/2 border border-white/10 space-y-4">
                {/* QR Code */}
                <div className="flex justify-center p-3 rounded-2xl bg-white w-fit mx-auto shadow-lg">
                  <Image
                    src={qrImageUrl}
                    alt="Google Authenticator QR Code"
                    width={180}
                    height={180}
                    unoptimized
                    className="rounded-lg"
                  />
                </div>

                {/* Key Row */}
                <div>
                  <span className="block text-xs sm:text-sm font-sans text-text-secondary mb-1.5 text-center">
                    Setup Key:
                  </span>
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/50 border border-white/10 font-mono text-sm sm:text-base text-text-primary">
                    <span className="select-all tracking-wider break-all">{secretKey}</span>
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="shrink-0 px-3 py-1.5 text-xs sm:text-sm font-sans font-medium text-text-primary bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                    >
                      {copied ? "Copied" : "Copy"}
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
