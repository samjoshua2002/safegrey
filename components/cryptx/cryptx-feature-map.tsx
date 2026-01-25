"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Syringe, VenetianMask, ShieldAlert, Search, Box, Zap, BarChart3, Plus, Minus, Command } from "lucide-react"
import { cn } from "@/lib/utils"

// Data definition
const features = [
    // Left Side (Indices 0-3)
    {
        id: "encryption",
        icon: Lock,
        label: "Advanced Encryption",
        description: "Multiple encryption algorithms including AES-256, ChaCha20, RC4, and custom XOR implementations to protect shellcode from static analysis."
    },
    {
        id: "injection",
        icon: Syringe,
        label: "Process Injection",
        description: "Support for various injection techniques: Process Hollowing, APC Injection, Thread Hijacking, and Process Doppelgänging for stealthy execution."
    },
    {
        id: "polymorphic",
        icon: VenetianMask,
        label: "Polymorphic Code",
        description: "Generate unique payloads every time with polymorphic code generation, ensuring each executable has a different signature to bypass hash-based detection."
    },
    {
        id: "edr",
        icon: ShieldAlert,
        label: "EDR Evasion",
        description: "Built-in techniques for AMSI bypass, ETW patching, API unhooking, and direct syscalls to evade endpoint detection and response systems."
    },
    // Right Side (Indices 4-7)
    {
        id: "analysis",
        icon: Search,
        label: "Anti-Analysis",
        description: "Sandbox detection, debugger checks, timing analysis, and VM detection to prevent analysis by security researchers and automated systems."
    },
    {
        id: "output",
        icon: Box,
        label: "Multiple Output Formats",
        description: "Generate standalone EXE, reflective DLL, service executables, or packed binaries depending on your deployment requirements."
    },
    {
        id: "generation",
        icon: Zap,
        label: "Quick Generation",
        description: "Simple mode with preset templates for rapid payload creation, or complex mode for fine-tuned control over every evasion parameter."
    },
    {
        id: "history",
        icon: BarChart3,
        label: "Generation History",
        description: "Track all payload generation jobs with detailed metadata, configuration settings, and status tracking for better operational management."
    }
]

// Single Feature Node Component
const FeatureCard = ({
    feature,
    side, // 'left' | 'right'
    index,
    hubRef,
    containerRef,
    onUpdate // Callback to trigger re-render of lines
}: {
    feature: any,
    side: 'left' | 'right',
    index: number,
    hubRef: React.RefObject<HTMLDivElement>,
    containerRef: React.RefObject<HTMLDivElement>,
    onUpdate: () => void
}) => {
    const [expanded, setExpanded] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    // Update lines when expanded state changes
    useEffect(() => {
        // Wait for animation frame or timeout for height transition
        const timer = setTimeout(onUpdate, 350)
        return () => clearTimeout(timer)
    }, [expanded, onUpdate])

    return (
        <div
            ref={cardRef}
            className={cn(
                "relative group rounded-3xl border transition-all duration-300 w-full max-w-[340px] z-20",
                expanded
                    ? "bg-black/90 border-[var(--theme-accent)] shadow-[0_0_30px_rgba(var(--theme-accent-rgb),0.3)]"
                    : "bg-black/60 border-[var(--theme-border)] hover:border-[var(--theme-accent)]/50 backdrop-blur-md"
            )}
            data-node-id={feature.id} // Identifier for line drawing
            data-side={side}
        >
            <div className="p-5">
                <div className="flex items-center justify-between gap-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center border transition-colors shrink-0",
                            expanded ? "bg-[var(--theme-accent)]/20 border-[var(--theme-accent)] text-[var(--theme-accent)]" : "bg-[var(--theme-dark-base)] border-[var(--theme-border)] text-[var(--theme-text-secondary)]"
                        )}>
                            <feature.icon size={20} />
                        </div>
                        <span className="font-bold text-[var(--theme-text-primary)] text-base">{feature.label}</span>
                    </div>

                    <button
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center border transition-all shrink-0 hover:bg-[var(--theme-accent)] hover:border-[var(--theme-accent)] hover:text-white",
                            expanded ? "bg-[var(--theme-accent)] border-[var(--theme-accent)] text-white" : "border-[var(--theme-border)] text-[var(--theme-text-secondary)]"
                        )}
                    >
                        {expanded ? <Minus size={16} /> : <Plus size={16} />}
                    </button>
                </div>

                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden border-t border-[var(--theme-border)]/50"
                        >
                            <div className="pt-4 pb-2">
                                <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Connection Points (Invisible, used for calculating anchor points) */}
            {side === 'left' && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1" data-anchor="right" />}
            {side === 'right' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1" data-anchor="left" />}
        </div>
    )
}

export function CryptXFeatureMap() {
    const containerRef = useRef<HTMLDivElement>(null)
    const hubRef = useRef<HTMLDivElement>(null)
    const [lines, setLines] = useState<{ id: string, path: string }[]>([])

    // Function to calculate lines (wrapped in useCallback to prevent infinite loops)
    const drawLines = React.useCallback(() => {
        if (!containerRef.current || !hubRef.current) return

        // Hub Center/Anchor Points
        const hubRect = hubRef.current.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()

        // Relative coordinates for Hub Anchors
        const hubLeftX = hubRect.left - containerRect.left
        const hubRightX = hubRect.right - containerRect.left
        const hubCenterY = hubRect.top - containerRect.top + (hubRect.height / 2)

        const newLines: { id: string, path: string }[] = []

        // Find all feature nodes
        const nodes = containerRef.current.querySelectorAll('[data-node-id]')

        nodes.forEach((node) => {
            const id = node.getAttribute('data-node-id') || ''
            const side = node.getAttribute('data-side')
            const rect = node.getBoundingClientRect()

            // Target Anchor
            const targetY = rect.top - containerRect.top + (rect.height / 2)

            let startX, endX, c1x, c1y, c2x, c2y

            if (side === 'left') {
                startX = hubLeftX
                endX = rect.right - containerRect.left

                // Bezier Control Points
                // Curve out from hub left (-x), curve in to target right (+x)
                c1x = startX - 100
                c1y = hubCenterY
                c2x = endX + 100
                c2y = targetY
            } else {
                startX = hubRightX
                endX = rect.left - containerRect.left

                // Bezier Control Points
                // Curve out from hub right (+x), curve in to target left (-x)
                c1x = startX + 100
                c1y = hubCenterY
                c2x = endX - 100
                c2y = targetY
            }

            const path = `M ${startX} ${hubCenterY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${targetY}`
            newLines.push({ id, path })
        })

        setLines(newLines)
    }, [containerRef, hubRef])

    // Effect to re-draw lines on resize
    useEffect(() => {
        drawLines()
        window.addEventListener('resize', drawLines)
        return () => window.removeEventListener('resize', drawLines)
    }, [drawLines])

    return (
        <section className="py-24 bg-[var(--theme-dark-base)] w-full relative overflow-hidden">

            {/* Title */}
            <div className="text-center  relative z-30">
                <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[var(--theme-text-primary)] to-[var(--theme-text-secondary)] bg-clip-text text-transparent ">
                    Key Features & Capabilities
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent mx-auto rounded-full" />
            </div>

            <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 min-h-[800px] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">

                {/* SVG Background Layer for Desktop Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0 overflow-visible">
                    <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--theme-accent)" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {lines.map(line => (
                        <path
                            key={line.id}
                            d={line.path}
                            stroke="var(--theme-accent)"
                            strokeWidth="2"
                            strokeOpacity="0.3"
                            fill="none"
                            className="transition-all duration-300"
                        />
                    ))}
                </svg>

                {/* Left Column */}
                <div className="flex flex-col gap-8 w-full md:w-1/3 items-center md:items-end">
                    {features.slice(0, 4).map((feature, idx) => (
                        <FeatureCard
                            key={feature.id}
                            feature={feature}
                            side="left"
                            index={idx}
                            hubRef={hubRef}
                            containerRef={containerRef}
                            onUpdate={drawLines}
                        />
                    ))}
                </div>

                {/* Center Hub */}
                <div ref={hubRef} className="relative w-32 h-32 shrink-0 z-30">
                    <div className="w-full h-full rounded-full border-2 bg-[var(--theme-accent)]/10 border-[var(--theme-accent)] backdrop-blur-xl animate-pulse-slow flex flex-col items-center justify-center shadow-[0_0_50px_rgba(var(--theme-accent-rgb),0.2)]">
                        <Command className="w-10 h-10 text-[var(--theme-accent)] mb-2" />
                        <span className="text-xs font-bold text-white tracking-widest uppercase">CryptX</span>
                    </div>
                    {/* Orbital Ring */}
                    <div className="absolute inset-[-8px] rounded-full border border-[var(--theme-accent)]/30 border-dashed animate-spin-slow pointer-events-none" />
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-8 w-full md:w-1/3 items-center md:items-start">
                    {features.slice(4, 8).map((feature, idx) => (
                        <FeatureCard
                            key={feature.id}
                            feature={feature}
                            side="right"
                            index={idx}
                            hubRef={hubRef}
                            containerRef={containerRef}
                            onUpdate={drawLines}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}
