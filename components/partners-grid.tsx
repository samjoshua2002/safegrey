"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, TrendingUp, Handshake, BookOpen, Megaphone, Users, Cpu, Server, Briefcase, Star, Award, Crown, ArrowRight, Lock, Activity, Eye, Loader2, Crosshair, Hexagon } from "lucide-react"

export function PartnersGrid() {
    const [activeFeature, setActiveFeature] = useState("expertise");

    const heroFeatures = [
        {
            id: "expertise",
            title: "Elite Cyber Expertise",
            description: "Access our specialized red team, pentesting, and managed defense capabilities to augment your service catalog and deliver uncompromising security.",
            icon: Shield
        },
        {
            id: "margins",
            title: "Predictable, High-Yield Margins",
            description: "Enjoy flexible commercial models including referral, reseller, and co-delivery options with transparent pricing designed to maximize your revenue.",
            icon: TrendingUp
        },
        {
            id: "enablement",
            title: "Zero-Friction Enablement",
            description: "Get up to speed rapidly with dedicated technical onboarding, pre-built sales playbooks, and continuous joint go-to-market support.",
            icon: Cpu
        }
    ];

    return (
        <div className="pt-10 pb-16">
            {/* 2026 Cyber Sec Hero Section */}
            <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden mb-32 border-b border-[var(--theme-border)]/50">
                {/* Cyber grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                {/* Deep shadows and gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-dark-base)]/50 to-[var(--theme-dark-base)]"></div>

                {/* Glowing Orbs for ambiance */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--theme-accent)]/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-950/30 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left Side: Bold Typography & CTAs */}
                        <div className="text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
                            {/* Target reticle decoration */}
                            <div className="absolute -left-12 -top-12 w-24 h-24 border-l border-t border-[var(--theme-border)]/50 opacity-50 hidden md:block"></div>

                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded border border-[var(--theme-accent)]/30 bg-[var(--theme-dark-secondary)]/50 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(235,54,54,0.1)]">
                                <div className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-accent)] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--theme-accent)]"></span>
                                </div>
                                <span className="text-xs font-mono font-bold tracking-[0.2em] text-[var(--theme-accent)] uppercase">SafeGrey Partner Network</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tighter text-white mb-6 uppercase leading-[1.05]">
                                Forge the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--theme-accent)] to-[#6a0d0d] relative inline-block">
                                    Ultimate
                                    {/* Scanline effect on text */}
                                    <span className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] mix-blend-overlay pointer-events-none"></span>
                                </span> <br />
                                Alliance.
                            </h1>

                            <div className="flex gap-4 mb-8">
                                <div className="w-12 h-1 bg-[var(--theme-accent)] shadow-[0_0_15px_rgba(235,54,54,0.6)]"></div>
                                <div className="w-2 h-1 bg-[var(--theme-accent)]/50"></div>
                                <div className="w-2 h-1 bg-[var(--theme-accent)]/30"></div>
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--foreground)] mb-6">
                                Strengthen client security. Expand revenue.
                            </h2>
                            <p className="text-lg text-[var(--muted-foreground)] mb-10 leading-relaxed max-w-xl font-medium">
                                Join our elite ecosystem. We equip trusted organizations to deliver world-class offensive and defensive cybersecurity services—from red team engagements to managed detection.
                            </p>

                            
                        </div>

                        {/* Right Side: Professional Accordion Design */}
                        <div className="hidden lg:flex flex-col gap-5 relative w-full h-full justify-center lg:pl-10 animate-in fade-in slide-in-from-right-8 duration-1000 z-20">
                            {heroFeatures.map((feature) => {
                                const isActive = activeFeature === feature.id;
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={feature.id}
                                        onClick={() => setActiveFeature(feature.id)}
                                        className={`relative overflow-hidden cursor-pointer transition-all duration-500 rounded-2xl border p-6 backdrop-blur-md ${isActive
                                                ? 'bg-[#111114] border-[var(--theme-accent)]/50 shadow-[0_0_30px_rgba(235,54,54,0.15)] ring-1 ring-[var(--theme-accent)]/20'
                                                : 'bg-[#0a0a0c]/80 border-[var(--theme-border)]/50 hover:bg-[#111114] hover:border-[var(--theme-accent)]/30'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-hero-highlight"
                                                className="absolute inset-0 bg-gradient-to-br from-[var(--theme-accent)]/10 via-transparent to-transparent pointer-events-none"
                                                initial={false}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}

                                        <div className="relative flex items-center gap-5 z-10">
                                            <div className={`p-4 rounded-xl transition-all duration-500 shadow-inner ${isActive ? 'bg-[var(--theme-accent)] text-white shadow-[0_0_15px_rgba(235,54,54,0.5)] rotate-3' : 'bg-[var(--theme-dark-secondary)] text-[var(--theme-accent)] border border-[var(--theme-border)]'}`}>
                                                <Icon className="w-7 h-7" />
                                            </div>
                                            <h3 className={`text-2xl font-black uppercase tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-[var(--foreground)]'}`}>
                                                {feature.title}
                                            </h3>
                                        </div>

                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                    animate={{ height: 'auto', opacity: 1, marginTop: '1.25rem' }}
                                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                    className="relative z-10"
                                                >
                                                    <p className="text-[var(--muted-foreground)] text-lg leading-relaxed pl-[4.5rem]">
                                                        {feature.description}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Partner with SafeGrey */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                        Why partner with <span className="text-[var(--theme-accent)]">SafeGrey</span>
                    </h3>
                    <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
                        Unlock new opportunities and deliver unparalleled security expertise to your clients.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <WhyCard icon={Shield} title="Differentiated capabilities" desc="Access advanced offensive security, purple team exercises, and Breach & Attack Simulation expertise to offer high-value services your clients need." />
                    <WhyCard icon={TrendingUp} title="Flexible commercial models" desc="Choose referral, reseller, or co-delivery options with transparent margins and predictable invoicing." />
                    <WhyCard icon={Handshake} title="White-label & co-brand support" desc="Deliver SafeGrey services under your brand or collaborate on joint go-to-market offers." />
                    <WhyCard icon={BookOpen} title="Technical enablement" desc="Onboarding, product training, playbooks, and regular technical workshops to accelerate time-to-value." />
                    <WhyCard icon={Megaphone} title="Marketing & sales support" desc="Co-branded collateral, case studies, joint webinars, and lead-sharing for pipeline growth." />
                    <WhyCard icon={Users} title="Dedicated partner success" desc="A named partner manager, quarterly business reviews, and priority technical escalation." />
                </div>
            </div>

            {/* Partner Types */}
            <div className="bg-[var(--theme-dark-secondary)]/30 border-y border-[var(--theme-border)] py-24 mb-32 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent opacity-20"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                            Partner <span className="text-[var(--theme-accent)]">Types</span> & What We Provide
                        </h3>
                        <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
                            Tailored partnership models designed to align with your business model and growth objectives.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <TypeCard
                            icon={Cpu}
                            title="Technology Partners"
                            forWho="ISVs, platform providers, and security tool vendors seeking integrations or joint solutions."
                            get="Integration guidance, joint technical validations, engineering collaboration, and co-marketing opportunities."
                        />
                        <TypeCard
                            icon={Server}
                            title="Service Providers"
                            subtitle="(MSSPs / Resellers)"
                            forWho="Managed service providers and resellers looking to add advanced security assessments and managed detection capabilities."
                            get="White-label delivery options, service playbooks, SOC onboarding support, and recurring revenue models."
                        />
                        <TypeCard
                            icon={Briefcase}
                            title="Consulting & Advisory"
                            subtitle="Partners"
                            forWho="Consulting firms and system integrators that need specialist offensive security, AD hardening, cloud security, or compliance services."
                            get="Access to specialist consultants, joint engagements, prebuilt assessment templates, and certification for delivery."
                        />
                    </div>
                </div>
            </div>

            {/* Partner Tiers */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                        Partner <span className="text-[var(--theme-accent)]">Tiers</span>
                    </h3>
                    <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
                        Grow with us. We map your organization to the appropriate tier to maximize mutual success.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6">
                    <TierCard
                        icon={Star}
                        tier="Associate"
                        desc="Ideal for new partners, access to basic enablement, standard referral fees, and marketing assets."
                    />
                    <TierCard
                        icon={Award}
                        tier="Preferred"
                        desc="For established partners with a joint pipeline, higher margins, dedicated onboarding, and co-selling support."
                        featured={true}
                    />
                    <TierCard
                        icon={Crown}
                        tier="Strategic"
                        desc="For large partners or technology alliances, bespoke commercial terms, product integrations, and executive sponsorship."
                    />
                </div>
                <div className="text-center mt-12 mb-8">
                    <p className="text-sm font-medium text-[var(--muted-foreground)] flex items-center justify-center gap-2">
                        <span className="w-10 h-[1px] bg-[var(--theme-border)]"></span>
                        We will map a partner to the appropriate tier during qualification.
                        <span className="w-10 h-[1px] bg-[var(--theme-border)]"></span>
                    </p>
                </div>
            </div>
        </div>
    )
}

function FloatingNode({ delay, icon: Icon, top, left, label }: { delay: string, icon: any, top: string, left: string, label: string }) {
    return (
        <div
            className="absolute p-3 rounded bg-[#0f0f11]/90 backdrop-blur border border-[var(--theme-accent)]/30 text-[var(--foreground)] flex items-center gap-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-30 group hover:border-[var(--theme-accent)] transition-colors hover:shadow-[0_0_20px_rgba(235,54,54,0.3)]"
            style={{
                top, left,
                transform: 'translate(-50%, -50%)',
                animation: `pulse 4s cubic-bezier(0.4, 0, 0.6, 1) ${delay} infinite`
            }}
        >
            <div className="w-8 h-8 rounded bg-[var(--theme-dark-secondary)] flex items-center justify-center border border-[var(--theme-border)] group-hover:bg-[var(--theme-accent)]/10">
                <Icon className="w-4 h-4 text-[var(--theme-accent)]" />
            </div>
            <div className="pr-2 text-left">
                <div className="text-[9px] text-[var(--muted-foreground)] font-mono uppercase tracking-widest leading-none mb-1">Status: OK</div>
                <div className="text-xs font-bold uppercase tracking-widest leading-none">{label}</div>
            </div>
        </div>
    )
}

function WhyCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="group p-8 rounded-2xl border border-[var(--theme-border)] bg-[#0f0f11] hover:border-[var(--theme-accent)]/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--theme-accent)]/5 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="w-14 h-14 rounded-xl bg-[var(--theme-accent)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--theme-accent)] transition-colors duration-300 relative z-10 border border-[var(--theme-accent)]/20">
                <Icon className="w-7 h-7 text-[var(--theme-accent)] group-hover:text-white transition-colors duration-300" />
            </div>
            <h4 className="text-xl font-bold text-[var(--foreground)] mb-4 group-hover:text-[var(--theme-accent)] transition-colors relative z-10">{title}</h4>
            <p className="text-[var(--muted-foreground)] leading-relaxed group-hover:text-[var(--foreground)]/80 transition-colors relative z-10">{desc}</p>
        </div>
    )
}

function TypeCard({ icon: Icon, title, subtitle, forWho, get }: { icon: any, title: string, subtitle?: string, forWho: string, get: string }) {
    return (
        <div className="relative p-8 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card-bg)] hover:bg-[#121214] transition-colors duration-300 overflow-hidden group flex flex-col h-full">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                <Icon className="w-48 h-48 -mr-16 -mt-16 text-[var(--foreground)]" />
            </div>
            <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-lg bg-[var(--theme-accent)]/10 flex items-center justify-center border border-[var(--theme-accent)]/20">
                        <Icon className="w-6 h-6 text-[var(--theme-accent)]" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-[var(--foreground)] leading-tight">{title}</h4>
                        {subtitle && <h5 className="text-sm font-medium text-[var(--theme-accent)] mt-1">{subtitle}</h5>}
                    </div>
                </div>

                <div className="mb-8 flex-1">
                    <div className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)] opacity-50 mb-3 flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-current"></span> Who this is for
                    </div>
                    <p className="text-[var(--muted-foreground)] leading-relaxed">{forWho}</p>
                </div>

                <div className="mt-auto">
                    <div className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent)] mb-3 flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-current"></span> What you get
                    </div>
                    <p className="text-[var(--foreground)]/90 leading-relaxed font-medium">{get}</p>
                </div>
            </div>
        </div>
    )
}

function TierCard({ icon: Icon, tier, desc, featured = false }: { icon: any, tier: string, desc: string, featured?: boolean }) {
    return (
        <div className={`relative p-8 rounded-2xl border ${featured ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/5' : 'border-[var(--theme-border)] bg-[#0f0f11]'} text-center flex flex-col items-center group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] h-full ${featured ? '-mt-4 mb-4 md:mb-0 lg:scale-105 z-10 shadow-[0_0_30px_rgba(235,54,54,0.15)]' : ''}`}>
            {featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[var(--theme-accent)] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg whitespace-nowrap">
                    Recommended Tier
                </div>
            )}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${featured ? 'bg-gradient-to-br from-[var(--theme-accent)] to-[#8a1515] text-white shadow-lg shadow-[var(--theme-accent)]/30' : 'bg-[var(--theme-dark-secondary)] border border-[var(--theme-border)] text-[var(--theme-accent)] group-hover:border-[var(--theme-accent)]/50'}`}>
                <Icon className="w-10 h-10" />
            </div>
            <h4 className="text-3xl font-bold text-[var(--foreground)] mb-6 tracking-tight">{tier}</h4>
            <div className={`w-12 h-1 mx-auto mb-6 rounded-full transition-all duration-300 ${featured ? 'bg-[var(--theme-accent)] w-16' : 'bg-[var(--theme-border)] group-hover:bg-[var(--theme-accent)] group-hover:w-16'}`}></div>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-lg">
                {desc}
            </p>
        </div>
    )
}
