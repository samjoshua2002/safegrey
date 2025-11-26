"use client"

import { useState, useEffect, useCallback } from "react"
import { RefreshCw, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface CaptchaProps {
    onVerify: (isValid: boolean) => void
    className?: string
}

export function Captcha({ onVerify, className }: CaptchaProps) {
    const [captchaCode, setCaptchaCode] = useState("")
    const [userInput, setUserInput] = useState("")
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

    const generateCaptcha = useCallback(() => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // Removed confusing chars like I, 1, O, 0
        let code = ""
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setCaptchaCode(code)
        setUserInput("")
        setStatus("idle")
        onVerify(false)
    }, [onVerify])

    useEffect(() => {
        generateCaptcha()
    }, [generateCaptcha])

    const handleVerify = () => {
        if (userInput.toUpperCase() === captchaCode) {
            setStatus("success")
            onVerify(true)
        } else {
            setStatus("error")
            onVerify(false)
            // Optional: Clear input on error
            // setUserInput("") 
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value)
        if (status !== "idle") {
            setStatus("idle")
        }
    }

    return (
        <div className={cn("space-y-3", className)}>
            <Label className="text-sm font-semibold flex items-center gap-2">
                Security Verification
            </Label>

            <div className="flex flex-col sm:flex-row gap-3">
                {/* Captcha Display */}
                <div className="relative flex-shrink-0 select-none overflow-hidden rounded-lg border border-border bg-muted/30 p-0 h-11 w-32 flex items-center justify-center">
                    {/* Background Noise/Pattern */}
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                            backgroundSize: "8px 8px"
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />

                    {/* Captcha Text */}
                    <span className="relative z-10 font-mono text-xl font-bold tracking-widest text-foreground/80"
                        style={{
                            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                            transform: "skew(-5deg)"
                        }}>
                        {captchaCode.split("").map((char, i) => (
                            <span key={i} style={{ display: "inline-block", transform: `rotate(${Math.random() * 20 - 10}deg)` }}>
                                {char}
                            </span>
                        ))}
                    </span>
                </div>

                {/* Refresh Button */}
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={generateCaptcha}
                    className="shrink-0 h-11 w-11 hover:bg-accent/10 hover:text-accent transition-colors"
                    title="Refresh Code"
                >
                    <RefreshCw className="w-4 h-4" />
                </Button>

                {/* Input Field */}
                <div className="relative flex-grow">
                    <Input
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Enter code"
                        className={cn(
                            "h-11 pr-10 font-mono tracking-widest uppercase transition-all",
                            status === "error" && "border-red-500 focus-visible:ring-red-500",
                            status === "success" && "border-green-500 focus-visible:ring-green-500"
                        )}
                        maxLength={6}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                handleVerify()
                            }
                        }}
                    />

                    {/* Status Icon */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        {status === "success" && <CheckCircle className="w-4 h-4 text-green-500 animate-in zoom-in" />}
                        {status === "error" && <XCircle className="w-4 h-4 text-red-500 animate-in zoom-in" />}
                    </div>
                </div>
            </div>

            {/* Verify Button (Optional, can rely on auto-verify or enter key, but explicit button is clearer) */}
            {status !== "success" && (
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="w-full h-8 text-xs"
                    onClick={handleVerify}
                    disabled={userInput.length < 6}
                >
                    Verify Captcha
                </Button>
            )}

            {status === "error" && (
                <p className="text-xs text-red-500 animate-in slide-in-from-top-1">
                    Incorrect code. Please try again.
                </p>
            )}
        </div>
    )
}
