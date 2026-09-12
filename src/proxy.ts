import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Gates every in-app screen behind a session: The Gate ("/") is the only
 * public page. (Next.js 16 renamed the `middleware` file convention to
 * `proxy` — same mechanism, defaults to the Node.js runtime, which is what
 * lets auth.ts's Credentials provider go through Prisma/pg here at all.)
 */
export default auth((req) => {
  if (!req.auth) {
    const gate = new URL("/", req.nextUrl.origin);
    gate.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(gate);
  }
});

export const config = {
  matcher: [
    "/onboarding/:path*",
    "/camp/:path*",
    "/chronicle/:path*",
    "/merchant/:path*",
    "/relics/:path*",
    "/moments/:path*",
  ],
};
