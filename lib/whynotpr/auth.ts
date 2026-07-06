import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "wnp_session";
export const ADMIN_COOKIE = "wnp_admin";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Dev fallbacks. In production set these in Vercel.
const PASSWORD = process.env.WHYNOTPR_PASSWORD ?? "whynotpr";
const ADMIN_PASSWORD = process.env.WHYNOTPR_ADMIN_PASSWORD ?? "admin";
const SECRET = process.env.WHYNOTPR_SECRET ?? "dev-secret-change-me";

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

// Deterministic token derived from a password. The raw password is never
// stored in the cookie; rotating the password invalidates existing sessions.
function tokenFor(password: string): string {
  return createHmac("sha256", SECRET).update(password).digest("hex");
}

async function createSessionFor(cookie: string, password: string): Promise<void> {
  const store = await cookies();
  store.set(cookie, tokenFor(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

async function isValid(cookie: string, password: string): Promise<boolean> {
  const store = await cookies();
  const token = store.get(cookie)?.value;
  return Boolean(token) && safeEqual(token!, tokenFor(password));
}

// --- Press portal ---
export const verifyPassword = (input: string) => safeEqual(input ?? "", PASSWORD);
export const createSession = () => createSessionFor(SESSION_COOKIE, PASSWORD);
export const isAuthenticated = () => isValid(SESSION_COOKIE, PASSWORD);

// --- Admin ---
export const verifyAdminPassword = (input: string) =>
  safeEqual(input ?? "", ADMIN_PASSWORD);
export const createAdminSession = () =>
  createSessionFor(ADMIN_COOKIE, ADMIN_PASSWORD);
export const isAdmin = () => isValid(ADMIN_COOKIE, ADMIN_PASSWORD);

export async function destroySession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}
export async function destroyAdminSession(): Promise<void> {
  (await cookies()).delete(ADMIN_COOKIE);
}
