import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get("admin_token")?.value

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 })
        }

        // Check if Superadmin (hardcoded token)
        if (token === "admin_authenticated_token") {
            return NextResponse.json({
                authenticated: true,
                role: 'superadmin'
            })
        }

        // Otherwise (DB User)
        // Token format is "user_<id>"
        return NextResponse.json({
            authenticated: true,
            role: 'user'
        })
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
