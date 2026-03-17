import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /studio routes (except login page and login API)
  if (!pathname.startsWith("/studio")) return NextResponse.next();
  if (pathname === "/studio/login") return NextResponse.next();
  if (pathname === "/api/studio-auth") return NextResponse.next();

  const authCookie = request.cookies.get("studio-auth");
  if (authCookie?.value === process.env.STUDIO_AUTH_SECRET) {
    return NextResponse.next();
  }

  // Redirect to login
  const loginUrl = new URL("/studio/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/studio/:path*"],
};
