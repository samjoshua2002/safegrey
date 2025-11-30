"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            if (res.ok) {
                router.push("/dashboard")
                router.refresh()
            } else {
                const data = await res.json()
                setError(data.error || "Invalid credentials")
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--theme-dark-base)] p-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--theme-accent)]/5 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--theme-accent)]/5 blur-[120px]" />

            <Card className="w-full max-w-md border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 backdrop-blur-xl shadow-2xl relative z-10">
                <CardHeader className="space-y-2 text-center pb-8">
                    <div className="mx-auto w-12 h-12 rounded-full bg-[var(--theme-accent)]/10 flex items-center justify-center mb-4 border border-[var(--theme-accent)]/20 shadow-[0_0_15px_rgba(174,32,18,0.3)]">
                        <Lock className="h-6 w-6 text-[var(--theme-accent)]" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-[var(--foreground)] tracking-tight">Admin Portal</CardTitle>
                    <CardDescription className="text-[var(--muted-foreground)] text-base">
                        Secure access for authorized personnel only
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[var(--foreground)] font-medium">Email Address</Label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-[var(--muted-foreground)] group-focus-within:text-[var(--theme-accent)] transition-colors" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@safegrey.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-11 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)] text-[var(--foreground)] focus:border-[var(--theme-accent)] focus:ring-[var(--theme-accent)]/20 transition-all"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[var(--foreground)] font-medium">Password</Label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-[var(--muted-foreground)] group-focus-within:text-[var(--theme-accent)] transition-colors" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 h-11 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)] text-[var(--foreground)] focus:border-[var(--theme-accent)] focus:ring-[var(--theme-accent)]/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-200 animate-in slide-in-from-top-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-11 bg-[var(--primary)] text-[var(--foreground)] hover:bg-[var(--primary)]/90 glow-accent transition-all duration-300 group"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                "Authenticating..."
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Access Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
