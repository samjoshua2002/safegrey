"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Lock, Globe, Search, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToolsLayoutProps {
    children: ReactNode
}

export default function ToolsLayout({ children }: ToolsLayoutProps) {
    const pathname = usePathname()

    const tools = [
        {
            name: "Security Header Scanner",
            href: "/tools",
            icon: Shield,
            description: "Analyze HTTP security headers",
            active: true
        }
    ]

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                {/* Sidebar */}
                <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:pt-20 lg:border-r lg:border-border/50 bg-card/30 backdrop-blur-sm">
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <div className="p-6 space-y-2">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Security Tools
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Professional security analysis tools
                            </p>
                        </div>

                        <nav className="flex-1 px-4 pb-4 space-y-2">
                            {tools.map((tool) => {
                                const Icon = tool.icon
                                const isActive = pathname === tool.href

                                return (
                                    <Link
                                    
                                        key={tool.href}
                                        href={tool.comingSoon ? "#" : tool.href}
                                        className={cn(
                                            "flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                                            isActive
                                                ? "bg-accent/10 border border-accent/20 shadow-lg"
                                                : tool.comingSoon
                                                    ? "opacity-50 cursor-not-allowed hover:bg-muted/30"
                                                    : "hover:bg-muted/50 border border-transparent hover:border-border/50"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-2 rounded-lg transition-colors",
                                            isActive
                                                ? "bg-accent/20"
                                                : "bg-muted/50 group-hover:bg-accent/10"
                                        )}>
                                            <Icon className={cn(
                                                "w-5 h-5",
                                                isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"
                                            )} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className={cn(
                                                    "font-semibold text-sm",
                                                    isActive ? "text-accent" : "text-foreground"
                                                )}>
                                                    {tool.name}
                                                </p>
                                                {tool.comingSoon && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                                                        Soon
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {tool.description}
                                            </p>
                                        </div>
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full" />
                                        )}
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* Bottom Info */}
                        <div className="p-6 border-t border-border/50">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20">
                                <h3 className="font-semibold text-sm mb-2">Need Professional Help?</h3>
                                <p className="text-xs text-muted-foreground mb-3">
                                    Get comprehensive security assessments from our experts.
                                </p>
                                <Link href="/contact">
                                    <button className="w-full px-4 py-2 text-xs font-semibold rounded-lg bg-accent/20 hover:bg-accent/30 text-accent transition-colors">
                                        Contact Us
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Mobile Menu - Top Bar */}
                <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-card/80 backdrop-blur-sm border-b border-border/50 p-4">
                    <div className="flex items-center gap-2 overflow-x-auto">
                        {tools.filter(t => t.active).map((tool) => {
                            const Icon = tool.icon
                            return (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 whitespace-nowrap"
                                >
                                    <Icon className="w-4 h-4 text-accent" />
                                    <span className="text-sm font-semibold">{tool.name}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 lg:pl-72">
                    <div className="pt-16 lg:pt-0">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
