import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Check if the path starts with /dashboard
    if (path.startsWith("/dashboard")) {
        const token = request.cookies.get("admin_token")?.value

        // If trying to access login page while already logged in, redirect to dashboard
        if (path === "/dashboard/login" && token) {
            return NextResponse.redirect(new URL("/dashboard", request.url))
        }

        // If trying to access dashboard pages (except login) without token, redirect to login
        if (path !== "/dashboard/login" && !token) {
            return NextResponse.redirect(new URL("/dashboard/login", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*"],
}
