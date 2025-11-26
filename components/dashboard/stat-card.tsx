import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface StatCardProps {
    icon: LucideIcon
    label: string
    value: string | number
    color: "emerald" | "amber" | "red" | "cyan" | "blue"
    index?: number
    className?: string
}

export function StatCard({
    icon: Icon,
    label,
    value,
    color,
    index = 0,
    className = ""
}: StatCardProps) {
    const colorStyles = {
        emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        red: "text-red-500 bg-red-500/10 border-red-500/20",
        cyan: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
        blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    }

    const glowColors = {
        emerald: "hover:glow-emerald",
        amber: "hover:glow-amber",
        red: "hover:glow-red",
        cyan: "hover:glow-cyan",
        blue: "hover:glow-blue",
    }

    const style = colorStyles[color] || colorStyles.blue
    const glowStyle = glowColors[color] || glowColors.blue

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={className}
        >
            <Card className={`h-full glass-effect border border-[var(--theme-border)] hover:scale-[1.03] transition-all duration-300 ${glowStyle}`}>
                <CardContent className="p-6 flex items-center gap-4 h-full">
                    {/* Icon */}
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${style}`}>
                        <Icon className="h-6 w-6" />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold font-mono text-[var(--theme-text-primary)] leading-none mb-1">
                            {value}
                        </span>
                        <span className="text-sm font-medium text-[var(--theme-text-secondary)] uppercase tracking-wider">
                            {label}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}