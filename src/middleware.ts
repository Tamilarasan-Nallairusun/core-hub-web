import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middleware/middleware.auth";

export  function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Redirect root `/` to `/auth/login`
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Check authentication (if applicable)
  const authResult =  authMiddleware(req);
  if (authResult) return authResult;

  return NextResponse.next();
}

// Apply middleware to all paths
export const config = {
  matcher: ["/", "/((?!_next|api|static|favicon.ico).*)"], // Excludes Next.js assets
};
