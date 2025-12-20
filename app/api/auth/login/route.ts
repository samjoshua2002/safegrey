import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import connectDB from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        const adminEmail = process.env.Admin_Dashboard
        const adminPassword = process.env.Admin_Password

        // 1. Check Hardcoded Admin
        if (email === adminEmail && password === adminPassword) {
            cookies().set("admin_token", "admin_authenticated_token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            })
            return NextResponse.json({ success: true })
        }

        // 2. Check Database User
        try {
            await connectDB()
            // improved security: explicitly select password which is usually hidden
            const user = await User.findOne({ email }).select('+password +status')

            if (user && user.password && user.status === 'approved') {
                const isValid = await bcrypt.compare(password, user.password)

                if (isValid) {
                    // Reuse the same token name so middleware works for both
                    // In a real app we'd encode user ID in a JWT here
                    cookies().set("admin_token", `user_${user._id}`, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "strict",
                        maxAge: 60 * 60 * 24, // 1 day
                        path: "/",
                    })
                    return NextResponse.json({ success: true })
                }
            }
        } catch (dbError) {
            console.error("Database login error:", dbError)
            // Fallthrough to generic error
        }

        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
