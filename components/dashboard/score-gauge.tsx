"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ScoreGaugeProps {
    score: number
    domain: string
}

export function ScoreGauge({ score, domain }: ScoreGaugeProps) {
    const getColor = (score: number) => {
        if (score >= 90) return "text-emerald-500 stroke-emerald-500"
        if (score >= 70) return "text-amber-500 stroke-amber-500"
        return "text-red-500 stroke-red-500"
    }

    const getGrade = (score: number) => {
        if (score >= 90) return "A"
        if (score >= 80) return "B"
        if (score >= 70) return "C"
        if (score >= 60) return "D"
        return "F"
    }

    const colorClass = getColor(score)
    const radius = 80
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (score / 100) * circumference

    return (
        <Card className="h-full bg-card border-[var(--theme-border)] relative overflow-hidden glass-effect">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-dark-base)] via-[var(--theme-dark-base)] to-[var(--theme-accent)]/5" />
            <CardContent className="p-6 h-full flex flex-col items-center justify-center relative z-10">
                <div className="relative h-48 w-48 flex items-center justify-center">
                    {/* Background Circle */}
                    <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 200 200">
                        <circle
                            cx="100"
                            cy="100"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-[var(--theme-text-secondary)]/20"
                        />
                        {/* Progress Circle */}
                        <motion.circle
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            cx="100"
                            cy="100"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeLinecap="round"
                            className={colorClass}
                        />
                    </svg>

                    {/* Center Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Shield className={`h-8 w-8 mb-1 ${colorClass.split(" ")[0]}`} />
                        <span className={`text-3xl font-bold font-mono ${colorClass.split(" ")[0]}`}>
                            {score}
                        </span>
                        <span className="text-xs text-[var(--theme-text-secondary)] font-medium uppercase tracking-wider mt-1">
                            Score
                        </span>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-dark-base)] border border-[var(--theme-border)] shadow-sm">
                        <span className="text-sm text-[var(--theme-text-secondary)]">Grade:</span>
                        <span className={`font-bold ${colorClass.split(" ")[0]}`}>{getGrade(score)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
