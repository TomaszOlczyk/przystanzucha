import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const expectedUser = process.env.STUDIO_USERNAME || "admin";
  const expectedPass = process.env.STUDIO_PASSWORD;

  if (!expectedPass) {
    return NextResponse.json({ error: "Auth not configured" }, { status: 500 });
  }

  // Timing-safe comparison
  const userMatch =
    username.length === expectedUser.length &&
    crypto.timingSafeEqual(Buffer.from(username), Buffer.from(expectedUser));
  const passMatch =
    password.length === expectedPass.length &&
    crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expectedPass));

  if (!userMatch || !passMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate a secret for the cookie
  const secret = process.env.STUDIO_AUTH_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Auth not configured" }, { status: 500 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("studio-auth", secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
