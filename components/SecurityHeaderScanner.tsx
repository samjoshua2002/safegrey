"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Shield,
    CheckCircle,
    AlertTriangle,
    Globe,
    Zap,
    AlertCircle,
    Terminal,
    Lock,
    Wifi,
    Eye,
    Server,
    Clock,
    Scan,
    Database,
    Radio,
} from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardHeader } from "./dashboard/header"
import { ScoreGauge } from "./dashboard/score-gauge"
import { StatCard } from "./dashboard/stat-card"
import { HeaderResultCard } from "./dashboard/header-result-card"
import { ScannerCapabilities } from "./dashboard/scanner-capabilities"

interface HeaderResult {
    name: string
    status: "implemented" | "partial" | "missing"
    value?: string
    risk: string
    recommendation: string
    impact: "high" | "medium" | "low"
    category: "content-security" | "transport-security" | "authentication" | "privacy"
}

interface ScanResult {
    score: number
    domain: string
    headers: HeaderResult[]
    scanDate: string
    responseTime: number
    serverInfo: string
    recommendations: number
    criticalIssues: number
    ipAddress?: string
    sslGrade?: string
}

export function SecurityHeaderScanner() {
    const [domain, setDomain] = useState("")
    const [isScanning, setIsScanning] = useState(false)
    const [scanResult, setScanResult] = useState<ScanResult | null>(null)

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!domain.trim()) {
            toast.error("Please enter a domain to scan")
            return
        }

        setIsScanning(true)
        setScanResult(null)

        try {
            const response = await fetch("/api/scan-headers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ domain: domain.trim() }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || `Scan failed with status ${response.status}`)
            }

            setScanResult(data)
            toast.success(`Security scan completed for ${data.domain}`)
        } catch (error) {
            console.error("Scan error:", error)
            const errorMessage = error instanceof Error ? error.message : "Scan failed"
            toast.error(errorMessage)
            setScanResult(null)
        } finally {
            setIsScanning(false)
        }
    }

    const implementedCount = scanResult?.headers.filter((h) => h.status === "implemented").length ?? 0
    const issuesCount = scanResult?.headers.filter((h) => h.status !== "implemented").length ?? 0
    const highImpactCount =
        scanResult?.headers.filter((h) => h.impact === "high" && h.status !== "implemented").length ?? 0

    return (
        <div className="min-h-screen bg-[var(--theme-dark-base)] text-[var(--theme-text-primary)]">
            {/* Grid background effect */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,200,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,200,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-20" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--theme-accent),transparent_50%)] pointer-events-none opacity-10" />

            <div className="relative z-10">
                <DashboardHeader />

                <main className="p-4 md:p-6 lg:p-8">
                    <div className="max-w-[1600px] mx-auto space-y-6">
                        {/* Top row - Scanner input + quick stats */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                            {/* Scanner Input */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-8">
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--theme-accent)] to-[var(--theme-accent-dim)] rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500" />
                                    <div className="relative bg-card border border-[var(--theme-border)] rounded-lg p-4 md:p-6 glass-effect">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-8 w-8 rounded bg-[var(--theme-accent)]/10 flex items-center justify-center">
                                                <Scan className="h-4 w-4 text-[var(--theme-accent)]" />
                                            </div>
                                            <div>
                                                <h2 className="font-semibold text-[var(--theme-text-primary)]">Target Analysis</h2>
                                                <p className="text-xs text-[var(--theme-text-secondary)]">Enter domain for security assessment</p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
                                            <div className="relative flex-1">
                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="example.com"
                                                    value={domain}
                                                    onChange={(e) => setDomain(e.target.value)}
                                                    className="pl-10 h-12 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)] font-mono text-sm focus:border-[var(--theme-accent)]/50 text-[var(--theme-text-primary)]"
                                                    disabled={isScanning}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={isScanning || !domain.trim()}
                                                className="h-12 px-8 bg-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/90 text-white font-semibold "
                                            >
                                                {isScanning ? (
                                                    <>
                                                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                                        Scanning...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Zap className="h-4 w-4 mr-2" />
                                                        Initialize Scan
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Quick Status */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="lg:col-span-4"
                            >
                                <div className="bg-card border border-[var(--theme-border)] rounded-lg p-4 md:p-6 h-full glass-effect">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-medium text-[var(--theme-text-secondary)] uppercase tracking-wider">
                                            System Status
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-xs font-mono text-emerald-500">ONLINE</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-[var(--theme-dark-base)]/50 rounded p-3 border border-[var(--theme-border)]/30">
                                            <div className="text-xs text-[var(--theme-text-secondary)] mb-1">Latency</div>
                                            <div className="text-lg font-mono font-bold text-[var(--theme-text-primary)]">12ms</div>
                                        </div>
                                        <div className="bg-[var(--theme-dark-base)]/50 rounded p-3 border border-[var(--theme-border)]/30">
                                            <div className="text-xs text-[var(--theme-text-secondary)] mb-1">Uptime</div>
                                            <div className="text-lg font-mono font-bold text-[var(--theme-text-primary)]">99.9%</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <AnimatePresence mode="wait">
                            {scanResult ? (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    {/* Score + Stats Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
                                        {/* Score Gauge */}
                                        <div className="lg:col-span-4">
                                            <ScoreGauge score={scanResult.score} domain={scanResult.domain} />
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-2 gap-4">
                                            <StatCard icon={CheckCircle} label="Passed" value={implementedCount} color="emerald" />
                                            <StatCard icon={AlertCircle} label="Issues" value={issuesCount} color="amber" />
                                            <StatCard icon={AlertTriangle} label="Critical" value={highImpactCount} color="red" />
                                            <StatCard icon={Clock} label="Response" value={`${scanResult.responseTime}ms`} color="cyan" />
                                        </div>
                                    </div>

                                    {/* Analysis Results */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                                        {/* Header Results */}
                                        <div className="lg:col-span-8">
                                            <div className="bg-card border border-[var(--theme-border)] rounded-lg overflow-hidden glass-effect">
                                                <div className="p-4 border-b border-[var(--theme-border)] flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded bg-[var(--theme-accent)]/10 flex items-center justify-center">
                                                            <Terminal className="h-4 w-4 text-[var(--theme-accent)]" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-[var(--theme-text-primary)]">Security Headers Analysis</h3>
                                                            <p className="text-xs text-[var(--theme-text-secondary)]">
                                                                {scanResult.headers.length} headers evaluated
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="font-mono text-xs border-[var(--theme-border)] text-[var(--theme-text-secondary)]">
                                                        {scanResult.domain}
                                                    </Badge>
                                                </div>

                                                <div className="divide-y divide-[var(--theme-border)]/30">
                                                    {scanResult.headers.map((header, index) => (
                                                        <HeaderResultCard key={index} header={header} index={index} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sidebar Info */}
                                        <div className="lg:col-span-4 space-y-4">
                                            {/* Target Info */}
                                            <div className="bg-card border border-[var(--theme-border)] rounded-lg p-4 glass-effect">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Server className="h-4 w-4 text-[var(--theme-accent)]" />
                                                    <span className="text-sm font-medium text-[var(--theme-text-primary)]">Target Information</span>
                                                </div>
                                                <div className="space-y-3 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-[var(--theme-text-secondary)]">Domain</span>
                                                        <span className="font-mono text-[var(--theme-text-primary)]">{scanResult.domain}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-[var(--theme-text-secondary)]">Server</span>
                                                        <span className="font-mono text-[var(--theme-text-primary)]">{scanResult.serverInfo || "N/A"}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-[var(--theme-text-secondary)]">Scan Time</span>
                                                        <span className="font-mono text-[var(--theme-text-primary)]">{scanResult.scanDate}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Category Breakdown */}
                                            <div className="bg-card border border-[var(--theme-border)] rounded-lg p-4 glass-effect">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Database className="h-4 w-4 text-[var(--theme-accent)]" />
                                                    <span className="text-sm font-medium text-[var(--theme-text-primary)]">Category Breakdown</span>
                                                </div>
                                                <div className="space-y-2">
                                                    {[
                                                        {
                                                            label: "Content Security",
                                                            count: scanResult.headers.filter((h) => h.category === "content-security").length,
                                                        },
                                                        {
                                                            label: "Transport Security",
                                                            count: scanResult.headers.filter((h) => h.category === "transport-security").length,
                                                        },
                                                        {
                                                            label: "Privacy",
                                                            count: scanResult.headers.filter((h) => h.category === "privacy").length,
                                                        },
                                                        {
                                                            label: "Authentication",
                                                            count: scanResult.headers.filter((h) => h.category === "authentication").length,
                                                        },
                                                    ].map((cat) => (
                                                        <div key={cat.label} className="flex items-center justify-between text-sm">
                                                            <span className="text-[var(--theme-text-secondary)]">{cat.label}</span>
                                                            <span className="font-mono text-[var(--theme-accent)]">{cat.count}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <ScannerCapabilities />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-4"
                                >
                                    {/* Empty State */}
                                    <div className="lg:col-span-8">
                                        <div className="bg-card border border-dashed border-[var(--theme-border)] rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px] glass-effect">
                                            <div className="h-16 w-16 rounded-full bg-[var(--theme-accent)]/10 flex items-center justify-center mb-6 relative">
                                                <Shield className="h-8 w-8 text-[var(--theme-accent)]" />
                                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[var(--theme-accent)] animate-ping" />
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2 text-[var(--theme-text-primary)]">Ready to Scan</h3>
                                            <p className="text-[var(--theme-text-secondary)] text-center max-w-md mb-6">
                                                Enter a target domain above to initiate a comprehensive security header analysis.
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-[var(--theme-text-secondary)]">
                                                <Radio className="h-3 w-3 text-[var(--theme-accent)] animate-pulse" />
                                                <span>Awaiting target input...</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Capabilities Panel */}
                                    <div className="lg:col-span-4 space-y-4">
                                        <ScannerCapabilities />

                                        {/* Features */}
                                        <div className="bg-card border border-[var(--theme-border)] rounded-lg p-4 glass-effect">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Zap className="h-4 w-4 text-[var(--theme-accent)]" />
                                                <span className="text-sm font-medium text-[var(--theme-text-primary)]">Features</span>
                                            </div>
                                            <div className="space-y-3">
                                                {[
                                                    { icon: Lock, text: "TLS/SSL Analysis" },
                                                    { icon: Eye, text: "Privacy Headers Check" },
                                                    { icon: Shield, text: "XSS Protection" },
                                                    { icon: Wifi, text: "CORS Configuration" },
                                                ].map((feature) => (
                                                    <div key={feature.text} className="flex items-center gap-3 text-sm">
                                                        <div className="h-6 w-6 rounded bg-[var(--theme-accent)]/10 flex items-center justify-center">
                                                            <feature.icon className="h-3 w-3 text-[var(--theme-accent)]" />
                                                        </div>
                                                        <span className="text-[var(--theme-text-secondary)]">{feature.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    )
}
