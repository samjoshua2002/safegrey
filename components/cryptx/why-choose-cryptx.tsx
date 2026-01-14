"use client"

import { motion } from "framer-motion"
import { Timer, Target, Wrench, Briefcase, RefreshCw, Layout } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const whyChooseData = [
    {
        title: "Time Efficient",
        description: "Reduce payload development time from hours to minutes with automated obfuscation",
        icon: Timer,
    },
    {
        title: "High Success Rate",
        description: "Advanced evasion techniques maximize success rate against modern security solutions",
        icon: Target,
    },
    {
        title: "Customizable",
        description: "Full control over every aspect of payload behavior and evasion techniques",
        icon: Wrench,
    },
    {
        title: "Professional Tool",
        description: "Built specifically for red team operations and penetration testing engagements",
        icon: Briefcase,
    },
    {
        title: "Always Updated",
        description: "Regular updates with new evasion techniques as security solutions evolve",
        icon: RefreshCw,
    },
    {
        title: "Intuitive Interface",
        description: "User-friendly Windows application with modern design and clear workflow",
        icon: Layout,
    }
]

export function WhyChooseCryptX() {
    return (
        <section className="py-24 bg-black/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-[var(--theme-text-primary)] mb-4">Why Choose CryptX?</h2>
                    <div className="h-1 w-24 bg-[var(--theme-accent)] rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {whyChooseData.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full glass-effect border border-[var(--theme-border)] hover:glow-accent hover:scale-[1.03] transition-all duration-300 flex flex-col text-left p-6 hover:border-[var(--theme-accent)]/50">
                                <CardContent className="flex flex-col justify-start h-full p-0">
                                    <div className="mb-4">
                                        <item.icon className="w-10 h-10 text-[var(--theme-accent)]" />
                                    </div>
                                    <h3 className="font-semibold text-xl mb-3 text-white text-left">
                                        {item.title}
                                    </h3>
                                    <p className="text-[var(--theme-text-secondary)] text-lg leading-relaxed text-left">
                                        {item.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
