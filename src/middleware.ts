// import { NextResponse, NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// import NextAuth from "next-auth";
// import { authConfig } from "./app/api/auth/config";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
//   const url = request.nextUrl;

//     if (
//         token &&
//             url.pathname === "/sign-in" || 
//             url.pathname === "/sign-up" || 
//             url.pathname === "/verify" || 
//             url.pathname === "/"
//         ) {
//         return NextResponse.redirect(new URL("/dashboard", request.url));
//     }
//         if (!token && url.pathname.startsWith("/dashboard")) {
//         return NextResponse.redirect(new URL("/sign-in", request.url));
//     }
//     return NextResponse.next();
// }

import NextAuth from "next-auth"
import { authConfig } from "@/app/api/auth/config"
import { 
    publicRoutes,
    authRoutes,
    authPrefix,
    DEFAULT_LOGIN_REDIRECT
} from "./routes"
import { NextResponse } from "next/server"
const { auth } = NextAuth(authConfig)
export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isApiAuthRoute = nextUrl.pathname.startsWith(authPrefix)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    if (isApiAuthRoute) {
        return NextResponse.next()
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return NextResponse.next()
    }
    if (!isPublicRoute && !isLoggedIn) {
        return Response.redirect(new URL("sign-in", nextUrl))
    }
    return NextResponse.next()
})
export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  }