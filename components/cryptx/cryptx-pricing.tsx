"use client"

import { motion } from "framer-motion"
import { Check, Shield, Zap, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
    {
        name: "1-Year License",
        price: "$1,250",
        period: "/year",
        description: "Standard license for professional teams.",
        features: [
            "Minimum order: 5 seats",
            "Free updates for the duration of the license",
            "Access to private Discord server",
        ],
        popular: false,
        icon: Shield,
    },
    {
        name: "2-Year License",
        price: "$2,250",
        period: "/2 years",
        description: "Save 10% off the original price!",
        features: [
            "Minimum order: 5 seats",
            "Save 10% off the original price!",
            "Free updates for the duration of the license",
            "Access to private Discord server",
        ],
        popular: true,
        icon: Zap,
    },
    {
        name: "Enterprise",
        price: "$25,000",
        period: "/year",
        description: "Unlimited potential for large organizations.",
        features: [
            "Unlimited users!",
            "Free updates for the duration of the license",
            "Access to private Discord server",
            "Priority Support"
        ],
        popular: false,
        icon: Lock,
    },
]

export function CryptXPricing() {
    return (
        <section className="py-24 relative overflow-hidden bg-[var(--theme-dark-base)]">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-dark-base)] via-[var(--theme-dark-secondary)]/50 to-[var(--theme-dark-base)]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--theme-text-primary)] to-[var(--theme-text-secondary)] bg-clip-text text-transparent mb-6">
                        Pricing Plans
                    </h2>
                    <p className="text-xl text-[var(--theme-text-secondary)] max-w-2xl mx-auto">
                        Choose the license that best fits your operational needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => {
                        const Icon = plan.icon
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                {/* Glow Effect for Popular Plan */}
                                {plan.popular && (
                                    <div className="absolute -inset-[1px] bg-gradient-to-r from-[var(--theme-accent)] via-red-500 to-[var(--theme-accent)] rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
                                )}

                                <div className={`relative h-full p-8 rounded-2xl border backdrop-blur-xl flex flex-col ${plan.popular
                                        ? "bg-[var(--theme-dark-base)] border-[var(--theme-accent)]"
                                        : "bg-[var(--theme-dark-secondary)]/40 border-[var(--theme-border)] hover:border-[var(--theme-accent)]/30 transition-colors"
                                    }`}>
                                    {plan.popular && (
                                        <div className="absolute top-0 right-0 -mt-3 mr-6 px-3 py-1 bg-[var(--theme-accent)] text-white text-xs font-bold rounded-full shadow-lg">
                                            BEST VALUE
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${plan.popular
                                                ? "bg-[var(--theme-accent)]/20 text-[var(--theme-accent)]"
                                                : "bg-[var(--theme-glass)] text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-accent)] transition-colors"
                                            }`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-2">{plan.name}</h3>
                                        <p className="text-[var(--theme-text-secondary)] text-sm">{plan.description}</p>
                                    </div>

                                    <div className="mb-8 p-4 rounded-xl bg-[var(--theme-dark-base)]/50 border border-[var(--theme-border)]">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-[var(--theme-text-primary)]">{plan.price}</span>
                                            <span className="text-[var(--theme-text-secondary)]">{plan.period}</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 mb-8 space-y-4">
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="mt-1 min-w-[18px]">
                                                    <Check className={`w-4 h-4 ${plan.popular ? "text-[var(--theme-accent)]" : "text-[var(--theme-text-secondary)]"}`} />
                                                </div>
                                                <span className="text-sm text-[var(--theme-text-secondary)]">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        className={`w-full py-6 font-semibold shadow-lg transition-all duration-300 ${plan.popular
                                                ? "bg-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/90 text-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(174,32,18,0.4)]"
                                                : "glass-effect hover:bg-[var(--theme-glass)] text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]/50"
                                            }`}
                                    >
                                        Contact Sales
                                    </Button>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
