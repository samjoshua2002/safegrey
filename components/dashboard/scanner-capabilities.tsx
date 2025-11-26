import { Server } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ScannerCapabilities() {
    const capabilities = [
        "Content-Security-Policy (CSP)",
        "Strict-Transport-Security (HSTS)",
        "X-Frame-Options",
        "X-Content-Type-Options",
        "Referrer-Policy",
        "Permissions-Policy"
    ]

    return (
        <Card className="border-[var(--theme-border)] bg-card/30 backdrop-blur-sm glass-effect">
            <CardHeader className="pb-3 pt-4">
                <CardTitle className="text-sm font-medium text-[var(--theme-text-secondary)] flex items-center gap-2 uppercase tracking-wider">
                    <Server className="h-4 w-4" />
                    Scanner Capabilities
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="space-y-2">
                    {capabilities.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm group">
                            <span className="text-[var(--theme-text-primary)]/80 group-hover:text-[var(--theme-text-primary)] transition-colors">{item}</span>
                            <div className="flex items-center gap-1.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-mono text-emerald-500/80">ACTIVE</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
