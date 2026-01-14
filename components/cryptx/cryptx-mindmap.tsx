"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, AnimatePresence } from "framer-motion"
import { Lock, Syringe, VenetianMask, ShieldAlert, Search, Box, Zap, BarChart3, Plus, Minus, Command } from "lucide-react"
import { cn } from "@/lib/utils"

// Data Structure
const mindMapData = [
    {
        id: "encryption",
        title: "Advanced Encryption",
        icon: Lock,
        position: { x: 0, y: -220 },
        children: ["AES-256", "ChaCha20", "RC4", "Custom XOR"]
    },
    {
        id: "injection",
        title: "Process Injection",
        icon: Syringe,
        position: { x: 220, y: -150 },
        children: ["Process Hollowing", "APC Injection", "Thread Hijacking", "Doppelgänging"]
    },
    {
        id: "polymorphic",
        title: "Polymorphic Code",
        icon: VenetianMask,
        position: { x: 280, y: 50 },
        children: ["Unique Payloads", "Signature Randomization"]
    },
    {
        id: "edr",
        title: "EDR Evasion",
        icon: ShieldAlert,
        position: { x: 180, y: 200 },
        children: ["AMSI Bypass", "ETW Patching", "API Unhooking", "Direct Syscalls"]
    },
    {
        id: "analysis",
        title: "Anti-Analysis",
        icon: Search,
        position: { x: -180, y: 200 },
        children: ["Sandbox Detection", "Debugger Checks", "VM Detection", "Timing Analysis"]
    },
    {
        id: "output",
        title: "Output Formats",
        icon: Box,
        position: { x: -280, y: 50 },
        children: ["EXE", "Reflective DLL", "Service Binary", "Packed Payload"]
    },
    {
        id: "generation",
        title: "Generation Modes",
        icon: Zap,
        position: { x: -220, y: -150 },
        children: ["Simple Mode", "Complex Mode"]
    },
    {
        id: "history",
        title: "History",
        icon: BarChart3,
        position: { x: 0, y: 280 }, // Adjusted to bottom center
        children: ["Metadata", "Config Tracking", "Status Logs"]
    }
]

// Draggable Node Component
function MindMapNode({ node, isRoot = false }: { node: any, isRoot?: boolean }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // Physics for drag
    const x = useMotionValue(node.position?.x || 0)
    const y = useMotionValue(node.position?.y || 0)

    // Toggle expansion
    const toggleOpen = () => setIsOpen(!isOpen)

    return (
        <motion.div
            style={{ x, y }}
            drag
            dragMomentum={false}
            className={cn(
                "absolute flex flex-col items-center justify-center z-20 cursor-grab active:cursor-grabbing",
                isRoot ? "z-30" : "z-20"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Connector Line (Simplified visual, real line implementation is complex with drag) */}
            {/* ideally we render SVG lines from parent to child, but for this component we focus on node interactivity */}

            {/* Main Node Circle */}
            <div
                className={cn(
                    "relative flex items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300",
                    isRoot ? "w-24 h-24 bg-[var(--theme-accent)]/20 border-[var(--theme-accent)] shadow-[0_0_50px_rgba(var(--theme-accent-rgb),0.3)]" :
                        "w-16 h-16 bg-black/60 border-[var(--theme-border)] hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10"
                )}
                onClick={!isRoot ? toggleOpen : undefined}
            >
                {isRoot ? (
                    <div className="text-center">
                        <Command className="w-8 h-8 text-[var(--theme-accent)] mx-auto mb-1 animate-pulse" />
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">CryptX</span>
                    </div>
                ) : (
                    <node.icon className={cn(
                        "w-7 h-7 transition-colors duration-300",
                        isOpen || isHovered ? "text-[var(--theme-accent)]" : "text-[var(--theme-text-secondary)]"
                    )} />
                )}

                {/* Pulsing Ring for Root */}
                {isRoot && (
                    <div className="absolute inset-0 rounded-full border border-[var(--theme-accent)] animate-ping opacity-20" />
                )}

                {/* Expand/Collapse Indicator for Child Nodes */}
                {!isRoot && (
                    <div className={cn(
                        "absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200",
                        isOpen ? "bg-[var(--theme-accent)] border-[var(--theme-accent)] text-black" : "bg-black border-[var(--theme-border)] text-[var(--theme-text-secondary)]"
                    )}>
                        {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </div>
                )}
            </div>

            {/* Label */}
            {!isRoot && (
                <div className={cn(
                    "absolute top-full mt-3 px-3 py-1.5 rounded-md bg-black/80 border border-[var(--theme-border)] backdrop-blur-md transition-all duration-300 pointer-events-none whitespace-nowrap",
                    isHovered || isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                )}>
                    <span className="text-xs font-mono font-bold text-[var(--theme-text-primary)]">
                        {node.title}
                    </span>
                </div>
            )}

            {/* Children Nodes (Detail Layer) */}
            <AnimatePresence>
                {isOpen && node.children && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none">
                        {node.children.map((child: string, idx: number) => {
                            // Position children in a small circle around the parent
                            const angle = (idx / node.children.length) * Math.PI * 2
                            const radius = 90
                            const childX = Math.cos(angle) * radius
                            const childY = Math.sin(angle) * radius

                            return (
                                <motion.div
                                    key={child}
                                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                    animate={{ opacity: 1, scale: 1, x: childX, y: childY }}
                                    exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.05 }}
                                    className="absolute w-auto pointer-events-auto"
                                >
                                    <div className="px-3 py-1.5 rounded-full bg-[var(--theme-dark-base)] border border-[var(--theme-accent)]/30 text-[10px] text-[var(--theme-text-secondary)] font-mono shadow-lg hover:bg-[var(--theme-accent)]/20 hover:text-white transition-colors cursor-default whitespace-nowrap backdrop-blur-md">
                                        {child}
                                    </div>
                                    {/* Tiny line to parent node could be drawn here with SVG if needed */}
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export function CryptXMindMap() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <section className="py-24 bg-[var(--theme-dark-base)] overflow-hidden relative min-h-[800px] flex items-center justify-center">

            {/* Background Grid/Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-[var(--theme-dark-base)] via-transparent to-[var(--theme-dark-base)] pointer-events-none z-10" />

            {/* Header */}
            <div className="absolute top-10 left-0 right-0 text-center z-10 pointer-events-none">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)] mb-4">Interactive Feature Map</h2>
                <p className="text-[var(--theme-text-secondary)] text-sm md:text-base">Drag nodes to explore • Click <Plus className="inline w-3 h-3" /> to expand</p>
            </div>

            {/* Canvas */}
            <div ref={containerRef} className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center">

                {/* Connecting Lines (Static SVG for initial state - dynamic lines require complex state management) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                    <svg className="w-[800px] h-[800px] visible">
                        <circle cx="400" cy="400" r="150" fill="none" stroke="var(--theme-accent)" strokeWidth="1" strokeDasharray="4 4" className="animate-spin-slow-reverse" style={{ transformOrigin: "center" }} />
                        <circle cx="400" cy="400" r="280" fill="none" stroke="var(--theme-text-secondary)" strokeWidth="1" strokeOpacity="0.3" />
                    </svg>
                </div>

                {/* Root Node */}
                <MindMapNode
                    node={{ position: { x: 0, y: 0 } }}
                    isRoot={true}
                />

                {/* Category Nodes */}
                {mindMapData.map((node) => (
                    <MindMapNode key={node.id} node={node} />
                ))}

            </div>
        </section>
    )
}
