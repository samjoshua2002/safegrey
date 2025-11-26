"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

export function DashboardHeader() {
    return (
        <div className="text-center space-y-4 pt-12 pb-6 mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-[var(--theme-accent)] text-sm font-medium mb-2"
            >
                <ShieldCheck className="h-4 w-4" />
                <span>Professional Security Analysis</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--theme-text-primary)]"
            >
                Security Header Scanner
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-[var(--theme-text-secondary)] max-w-2xl mx-auto"
            >
                A Precise Assessment of Your Website's Defensive Controls
            </motion.p>
        </div>
    )
}
