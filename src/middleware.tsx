import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authMiddleware, redirectToSignIn  } from "@clerk/nextjs";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/sign-up", "/sign-in", "/api/clerk-webhook", "/product"],
  ignoredRoutes: ["/api/clerk-webhook/user-delete",],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (
      !req.nextUrl.pathname.startsWith("/dashboard") &&
      !req.nextUrl.pathname.startsWith("/sign-in") &&
      !req.nextUrl.pathname.startsWith("/sign-up") &&
      !req.nextUrl.pathname.startsWith("/product")
    ) {
      if (auth.userId) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
    return NextResponse.next();
  },
});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};