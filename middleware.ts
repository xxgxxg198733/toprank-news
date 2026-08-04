import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/tools", "/profile"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    try {
      const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
      });

      if (!token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      // If auth check fails (e.g. secret not set), allow access
      console.error("Middleware auth check failed");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.svg|robots.txt|sitemap.xml).*)"],
};
