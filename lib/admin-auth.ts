import "server-only";

import { cookies } from "next/headers";

import { authAdmin } from "./firebase-admin";

export const ADMIN_COOKIE = "hf_admin_session";
export const ADMIN_SESSION_MAX_AGE_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

function allowedEmails(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return allowedEmails().includes(email.toLowerCase());
}

/**
 * Returns the admin's email if the request carries a valid session cookie for
 * an allowlisted account, otherwise null. Used by protected pages and the
 * status-update Server Action.
 */
export async function getAdminEmail(): Promise<string | null> {
  const store = await cookies();
  const cookie = store.get(ADMIN_COOKIE)?.value;
  if (!cookie) return null;
  try {
    const decoded = await authAdmin.verifySessionCookie(cookie, true);
    return isAllowedEmail(decoded.email) ? (decoded.email ?? null) : null;
  } catch {
    return null;
  }
}
