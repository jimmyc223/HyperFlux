import { NextResponse, type NextRequest } from "next/server";

import { authAdmin } from "@/lib/firebase-admin";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE_MS,
  isAllowedEmail,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let idToken: string | undefined;
  try {
    ({ idToken } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!idToken) {
    return NextResponse.json({ error: "Missing token." }, { status: 400 });
  }

  try {
    const decoded = await authAdmin.verifyIdToken(idToken);
    if (!isAllowedEmail(decoded.email)) {
      return NextResponse.json(
        { error: "This account is not authorised for admin access." },
        { status: 403 },
      );
    }

    const sessionCookie = await authAdmin.createSessionCookie(idToken, {
      expiresIn: ADMIN_SESSION_MAX_AGE_MS,
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE_MS / 1000,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Authentication failed." }, { status: 401 });
  }
}
