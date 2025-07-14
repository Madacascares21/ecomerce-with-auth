import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // Define all auth-related routes that shouldn't be accessible when logged in
  const restrictedAuthRoutes = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password"
  ];

  const isRestrictedRoute = restrictedAuthRoutes.some(route =>
    pathname.startsWith(route)
  );

  // If the user is logged in and trying to access a restricted auth route, redirect to home
  if (sessionCookie && isRestrictedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Run the middleware only for the specified routes
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password"
  ],
};
