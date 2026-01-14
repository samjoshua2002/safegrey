"use client"

import { motion } from "framer-motion"
import { Lock, Syringe, VenetianMask, ShieldAlert, Search, Box, Zap, BarChart3, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const featuresData = [
    {
        title: "Advanced Encryption",
        description: "Multiple encryption algorithms including AES-256, ChaCha20, RC4, and custom XOR implementations to protect shellcode from static analysis.",
        icon: Lock,
    },
    {
        title: "Process Injection",
        description: "Support for various injection techniques: Process Hollowing, APC Injection, Thread Hijacking, and Process Doppelgänging for stealthy execution.",
        icon: Syringe,
    },
    {
        title: "Polymorphic Code",
        description: "Generate unique payloads every time with polymorphic code generation, ensuring each executable has a different signature to bypass hash-based detection.",
        icon: VenetianMask,
    },
    {
        title: "EDR Evasion",
        description: "Built-in techniques for AMSI bypass, ETW patching, API unhooking, and direct syscalls to evade endpoint detection and response systems.",
        icon: ShieldAlert,
    },
    {
        title: "Anti-Analysis",
        description: "Sandbox detection, debugger checks, timing analysis, and VM detection to prevent analysis by security researchers and automated systems.",
        icon: Search,
    },
    {
        title: "Multiple Output Formats",
        description: "Generate standalone EXE, reflective DLL, service executables, or packed binaries depending on your deployment requirements.",
        icon: Box,
    },
    {
        title: "Quick Generation",
        description: "Simple mode with preset templates for rapid payload creation, or complex mode for fine-tuned control over every evasion parameter.",
        icon: Zap,
    },
    {
        title: "Generation History",
        description: "Track all payload generation jobs with detailed metadata, configuration settings, and status tracking for better operational management.",
        icon: BarChart3,
    }
]

export function CryptXFeaturesTree() {
    return (
        <section className="py-24 bg-[var(--theme-dark-base)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--theme-text-primary)] mb-6">Key Features & Capabilities</h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuresData.map((feature, idx) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full border border-[var(--theme-border)] bg-card/50 backdrop-blur-sm hover:border-[var(--theme-accent)]/50 transition-all duration-300 group hover:bg-[var(--theme-accent)]/5">
                                    <CardContent className="p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 rounded-xl bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 group-hover:bg-[var(--theme-accent)]/20 transition-colors">
                                                <Icon className="w-6 h-6 text-[var(--theme-accent)]" />
                                            </div>
                                            <h3 className="text-xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                                                {feature.title}
                                            </h3>
                                        </div>
                                        <p className="text-[var(--theme-text-secondary)] leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
