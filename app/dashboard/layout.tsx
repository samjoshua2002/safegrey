"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, PlusCircle, MessageSquare, LogOut, Menu, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Hide sidebar on login page
    if (pathname === "/dashboard/login") {
        return <>{children}</>
    }

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" })
            if (res.ok) {
                router.push("/")
                router.refresh()
            }
        } catch (error) {
            console.error("Logout failed", error)
        }
    }

    const navItems = [

        {
            title: "Service",
            href: "/dashboard/service",
            icon: LayoutDashboard,
        },
        {
            title: "Bookings",
            href: "/dashboard/bookings",
            icon: Calendar,
        },
        {
            title: "Contact",
            href: "/dashboard/contact",
            icon: MessageSquare,
        },
        {
            title: "Upcoming Features",
            href: "/dashboard/create-service",
            icon: PlusCircle,
        }
    ]

    return (
        <div className="min-h-screen bg-[var(--theme-dark-base)] flex">
            {/* Mobile Sidebar Toggle */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden fixed top-4 left-4 z-50 text-[var(--foreground)]"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X /> : <Menu />}
            </Button>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-[var(--theme-dark-secondary)]/80 backdrop-blur-md border-r border-[var(--theme-border)] transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto md:flex md:flex-col",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 border-b border-[var(--theme-border)]">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-[var(--foreground)]">
                        <LayoutDashboard className="h-6 w-6 text-[var(--theme-accent)]" />
                        <span>Admin Panel</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                                    isActive
                                        ? "bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border border-[var(--theme-accent)]/20 shadow-[0_0_15px_rgba(174,32,18,0.2)]"
                                        : "text-[var(--muted-foreground)] hover:bg-[var(--theme-dark-base)] hover:text-[var(--foreground)] hover:border hover:border-[var(--theme-border)]"
                                )}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{item.title}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-[var(--theme-border)]">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto pt-16 md:pt-12 bg-[var(--theme-dark-base)]">
                {children}
            </main>
        </div>
    )
}
