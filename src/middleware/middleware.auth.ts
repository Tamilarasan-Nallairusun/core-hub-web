import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export  function  authMiddleware(req: NextRequest) {
  const token = req.cookies.get("auth_data")?.value; 
  const isAuthenticated = Boolean(token);
  const { pathname } = req.nextUrl;

  if (!isAuthenticated && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isAuthenticated && pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}
