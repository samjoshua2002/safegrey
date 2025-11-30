import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        const adminEmail = process.env.Admin_Dashboard
        const adminPassword = process.env.Admin_Password

        if (email === adminEmail && password === adminPassword) {
            // In a real app, we would sign a JWT here.
            // For simplicity and as per requirements, we'll set a secure cookie.
            // We'll use a simple token value for now, but in production this should be a signed JWT.
            const token = "admin_authenticated_token"

            cookies().set("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            })

            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
