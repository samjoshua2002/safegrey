"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, KeyRound, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Setup State
    const [setupEmail, setSetupEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [captchaInput, setCaptchaInput] = useState("")
    const [captchaChallenge, setCaptchaChallenge] = useState({ num1: 0, num2: 0 })

    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        generateCaptcha()
    }, [])

    const generateCaptcha = () => {
        setCaptchaChallenge({
            num1: Math.floor(Math.random() * 10),
            num2: Math.floor(Math.random() * 10)
        })
        setCaptchaInput("")
    }

    const handleLogin = async (e: React.FormEvent) => {
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

    const handleSetup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccessMessage("")

        // Basic Validation
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }

        const sum = captchaChallenge.num1 + captchaChallenge.num2
        if (parseInt(captchaInput) !== sum) {
            setError("Incorrect captcha verification")
            generateCaptcha() // Reset captcha on failure
            return
        }

        setIsLoading(true)

        try {
            const res = await fetch("/api/auth/complete-setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: setupEmail,
                    otp,
                    newPassword
                }),
            })

            const data = await res.json()

            if (res.ok) {
                setSuccessMessage("Account setup successful! Redirecting to dashboard...")
                // Wait briefly for user to see success message, then redirect
                setTimeout(() => {
                    router.push("/dashboard")
                    router.refresh()
                }, 1500)
            } else {
                setError(data.error || "Setup failed")
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex bg-black text-[var(--foreground)] overflow-hidden">

            {/* Left Side - Image */}
            <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10" />
                <img
                    src="/sssss.png"
                    alt="SafeGrey Security"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />


            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative">
                {/* Decorative background elements for form side */}
                <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-[var(--theme-accent)]/5 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-[var(--theme-accent)]/5 blur-[100px]" />

                <Card className="w-full max-w-md border-0 sm:border border-[var(--theme-border)] bg-transparent sm:bg-[var(--theme-dark-secondary)]/30 sm:backdrop-blur-xl shadow-none sm:shadow-2xl relative z-10">
                    <CardHeader className="space-y-2 text-center pb-6">
                        <div className="lg:hidden mx-auto w-12 h-12 rounded-full bg-[var(--theme-accent)]/10 flex items-center justify-center  border border-[var(--theme-accent)]/20 shadow-[0_0_15px_rgba(174,32,18,0.3)]">
                            <Lock className="h-6 w-6 text-[var(--theme-accent)]" />
                        </div>
                        <CardTitle className="text-3xl font-bold tracking-tight">SafeGrey Login</CardTitle>

                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6 bg-[var(--theme-dark-base)]/50">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="setup">Account Setup</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login">
                                <form onSubmit={handleLogin} className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="font-medium">Email Address</Label>
                                        <div className="relative group">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-[var(--muted-foreground)] group-focus-within:text-[var(--theme-accent)] transition-colors" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="admin@safegrey.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-10 h-11 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)] focus:border-[var(--theme-accent)] transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="font-medium">Password</Label>
                                        <div className="relative group">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-[var(--muted-foreground)] group-focus-within:text-[var(--theme-accent)] transition-colors" />
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="pl-10 h-11 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)] focus:border-[var(--theme-accent)] transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {error && activeTab === 'login' && (
                                        <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-200">
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
                            </TabsContent>

                            <TabsContent value="setup">
                                <form onSubmit={handleSetup} className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                                    <div className="space-y-2">
                                        <Label htmlFor="setup-email" className="font-medium">Email Address</Label>
                                        <Input
                                            id="setup-email"
                                            type="email"
                                            placeholder="admin@safegrey.com"
                                            value={setupEmail}
                                            onChange={(e) => setSetupEmail(e.target.value)}
                                            className="h-10 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)]"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="otp" className="font-medium">One Time Password (from Email)</Label>
                                        <div className="relative">
                                            <KeyRound className="absolute left-3 top-3 h-4 w-4 text-[var(--muted-foreground)]" />
                                            <Input
                                                id="otp"
                                                type="text"
                                                placeholder="123456"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                className="pl-10 h-10 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)] font-mono tracking-widest uppercase"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password" className="font-medium">New Password</Label>
                                            <Input
                                                id="new-password"
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="h-10 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)]"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password" className="font-medium">Confirm</Label>
                                            <Input
                                                id="confirm-password"
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="h-10 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)]"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="font-medium">Verification</Label>
                                        <div className="flex gap-4">
                                            <div className="flex items-center justify-center bg-[var(--theme-dark-base)]/80 border border-[var(--theme-border)] rounded-md px-4 min-w-[140px] select-none font-mono text-lg">
                                                {captchaChallenge.num1} + {captchaChallenge.num2} = ?
                                            </div>
                                            <Input
                                                type="number"
                                                placeholder="Answer"
                                                value={captchaInput}
                                                onChange={(e) => setCaptchaInput(e.target.value)}
                                                className="h-11 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)]"
                                                required
                                            />
                                            <Button type="button" variant="ghost" size="icon" onClick={generateCaptcha}>
                                                <RefreshCw className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {error && activeTab === 'setup' && (
                                        <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-200">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    {successMessage && (
                                        <Alert className="bg-green-900/20 border-green-900/50 text-green-200">
                                            <ShieldCheck className="h-4 w-4" />
                                            <AlertDescription>{successMessage}</AlertDescription>
                                        </Alert>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full h-11 bg-[var(--theme-accent)] text-white hover:bg-[var(--theme-accent)]/90 transition-all duration-300"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Verifying..." : "Initialize Account"}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
