import crypto from "crypto";

const DEFAULT_SECRET = process.env.ADMIN_2FA_SECRET || "NQXRT5QQJMW5ARGUXGUN";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "e327d80fb0856d21857fbce73650f4402c74d1237e3228b6241a55a9763d581c";

/**
 * Decodes a Base32 string into a Buffer.
 * Alphabet: RFC 4648 (A-Z, 2-7)
 */
function base32Decode(str: string): Buffer {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let value = 0;
  const output: number[] = [];
  const cleaned = str.toUpperCase().replace(/[^A-Z2-7]/g, "");

  for (const char of cleaned) {
    const idx = alphabet.indexOf(char);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(output);
}

/**
 * Generates an RFC 6238 TOTP 6-digit code for a given counter.
 */
function generateCodeForCounter(secret: string, counter: number): string {
  const key = base32Decode(secret);
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(counter), 0);

  const hmac = crypto.createHmac("sha1", key).update(buf).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;

  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  return (code % 1000000).toString().padStart(6, "0");
}

/**
 * Verifies a 6-digit TOTP code against the secret.
 * Allows a +/- window to accommodate clock drift (default 1 window = +/- 30s).
 */
export function verifyTOTP(
  token: string,
  secret: string = DEFAULT_SECRET,
  window: number = 1
): boolean {
  if (!token) return false;
  const cleaned = token.replace(/\s+/g, "");
  if (!/^\d{6}$/.test(cleaned)) return false;

  const currentCounter = Math.floor(Date.now() / 1000 / 30);

  for (let i = -window; i <= window; i++) {
    const expected = generateCodeForCounter(secret, currentCounter + i);
    if (crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(cleaned))) {
      return true;
    }
  }

  return false;
}

/**
 * Returns the otpauth:// URL for Google Authenticator QR / setup.
 */
export function getOtpAuthUrl(
  secret: string = DEFAULT_SECRET,
  accountName: string = "Admin",
  issuer: string = "Nikhil Jaiswal"
): string {
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedAccount = encodeURIComponent(accountName);
  return `otpauth://totp/${encodedIssuer}:${encodedAccount}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;
}

/**
 * Creates a signed session token with expiry (default 7 days).
 */
export function createSignedSessionToken(
  adminId: string = "admin",
  maxAgeMs: number = 7 * 24 * 60 * 60 * 1000
): string {
  const expiresAt = Date.now() + maxAgeMs;
  const payload = Buffer.from(JSON.stringify({ adminId, expiresAt })).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

/**
 * Verifies the signed session token. Returns true if valid and not expired.
 */
export function verifySignedSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("base64url");

  if (signature.length !== expectedSignature.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return false;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.expiresAt !== "number" || Date.now() > data.expiresAt) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
