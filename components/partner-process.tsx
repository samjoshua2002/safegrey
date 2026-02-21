"use client";
import Image from "next/image"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Zap, Target, Shield, Lock, Users } from "lucide-react";

const stickyContent = [
    {
        title: "Project Coordination",
        description:
            "Maintain an agreed point of contact for project and commercial coordination to ensure smooth communication and alignment throughout our partnership.",
        content: (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--theme-accent),#8a1515)] text-white p-8 text-center">
                <div className="text-3xl font-bold text-balance">Coordinate Responsibly</div>
            </div>
        ),
    },
    {
        title: "Enablement & Compliance",
        description:
            "Complete minimum enablement and compliance requirements for the selected tier. This ensures delivery excellence and adherence to our high security standards.",
        content: (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#9b1b1b,#1e1e1f)] text-white p-8 text-center">
                <div className="text-3xl font-bold text-balance">Stay Compliant</div>
            </div>
        ),
    },
    {
        title: "Co-selling Guidelines",
        description:
            "Follow co-selling guidelines and maintain strict confidentiality on shared materials. We believe in mutual trust and protecting sensitive go-to-market strategies.",
        content: (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#2a2a2c,#111)] text-white p-8 text-center">
                <div className="text-3xl font-bold text-balance">Protect Shared Data</div>
            </div>
        ),
    },
    {
        title: "Client Management",
        description:
            "Deliver local customer communications and provide first-line client management where white-labeling is used to maintain brand consistency and client trust.",
        content: (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--theme-accent),#000)] text-white p-8 text-center">
                <div className="text-3xl font-bold text-balance">Manage Relationships</div>
            </div>
        ),
    },
];

const iconMap = {
    "Commitment": Zap,
    "Strategy": Target,
    "Responsibility": Shield,
};

export function PartnerProcess() {
    return (
        <section className="relative py-24">
            {/* Futuristic 2026 Responsibilities Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 group">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/30 mb-4 shadow-[0_0_15px_rgba(235,54,54,0.1)]">
                            <Zap className="w-4 h-4 text-[var(--theme-accent)] animate-pulse" />
                            <span className="text-xs font-mono font-bold text-[var(--theme-accent)] uppercase tracking-widest">Protocol Framework</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter">
                            Typical Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-accent)] to-[#4a0b0b]">Responsibilities</span>
                        </h2>
                    </div>
                    <div className="text-right">
                        <p className="text-[var(--muted-foreground)] max-w-sm text-sm font-medium border-l-[2px] border-[var(--theme-accent)]/50 pl-4">
                            Understand what it takes to build a successful and secure partnership with SafeGrey.
                        </p>
                    </div>
                </div>

                {/* 2026 Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Item 1 */}
                    <div className="group/card relative p-8 rounded-2xl bg-[#0a0a0c] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/50 hover:bg-[#111114] transition-all duration-500 overflow-hidden min-h-[200px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-accent)]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--theme-accent)]/20 blur-[50px] rounded-full group-hover/card:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10 flex flex-col items-start gap-4">
                            <div className="flex justify-between items-start w-full">
                                <div className="text-[10px] uppercase font-mono tracking-widest text-[var(--theme-accent)] mb-2 mt-1">SYS.01</div>
                                <div className="p-3 bg-[var(--theme-dark-secondary)] border border-[var(--theme-accent)]/20 rounded shadow-[0_0_10px_rgba(235,54,54,0.1)] group-hover/card:bg-[var(--theme-accent)]/10 group-hover/card:border-[var(--theme-accent)]/40 transition-colors">
                                    <Target className="w-6 h-6 text-[var(--theme-accent)]" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-3 tracking-wide">Project Coordination</h3>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                    Maintain an agreed point of contact for project and commercial coordination to ensure smooth communication and alignment throughout our partnership.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="group/card relative p-8 rounded-2xl bg-[#0a0a0c] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/50 hover:bg-[#111114] transition-all duration-500 overflow-hidden min-h-[200px]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--theme-accent)]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--theme-accent)]/20 blur-[50px] rounded-full group-hover/card:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10 flex flex-col items-start gap-4">
                            <div className="flex justify-between items-start w-full">
                                <div className="text-[10px] uppercase font-mono tracking-widest text-[var(--theme-accent)] mb-2 mt-1">SYS.02</div>
                                <div className="p-3 bg-[var(--theme-dark-secondary)] border border-[var(--theme-accent)]/20 rounded shadow-[0_0_10px_rgba(235,54,54,0.1)] group-hover/card:bg-[var(--theme-accent)]/10 group-hover/card:border-[var(--theme-accent)]/40 transition-colors">
                                    <Shield className="w-6 h-6 text-[var(--theme-accent)]" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-3 tracking-wide">Enablement & Compliance</h3>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                    Complete minimum enablement and compliance requirements for the selected tier. This ensures delivery excellence and adherence to our high security standards.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="group/card relative p-8 rounded-2xl bg-[#0a0a0c] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/50 hover:bg-[#111114] transition-all duration-500 overflow-hidden min-h-[200px]">
                        <div className="absolute inset-0 bg-gradient-to-bl from-[var(--theme-accent)]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-0 left-0 w-24 h-24 bg-[var(--theme-accent)]/20 blur-[50px] rounded-full group-hover/card:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10 flex flex-col items-start gap-4">
                            <div className="flex justify-between items-start w-full">
                                <div className="text-[10px] uppercase font-mono tracking-widest text-[var(--theme-accent)] mb-2 mt-1">SYS.03</div>
                                <div className="p-3 bg-[var(--theme-dark-secondary)] border border-[var(--theme-accent)]/20 rounded shadow-[0_0_10px_rgba(235,54,54,0.1)] group-hover/card:bg-[var(--theme-accent)]/10 group-hover/card:border-[var(--theme-accent)]/40 transition-colors">
                                    <Lock className="w-6 h-6 text-[var(--theme-accent)]" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-3 tracking-wide">Co-selling Guidelines</h3>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                    Follow co-selling guidelines and maintain strict confidentiality on shared materials. We believe in mutual trust and protecting sensitive go-to-market strategies.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="group/card relative p-8 rounded-2xl bg-[#0a0a0c] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/50 hover:bg-[#111114] transition-all duration-500 overflow-hidden min-h-[200px]">
                        <div className="absolute inset-0 bg-gradient-to-tl from-[var(--theme-accent)]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[var(--theme-accent)]/20 blur-[50px] rounded-full group-hover/card:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10 flex flex-col items-start gap-4">
                            <div className="flex justify-between items-start w-full">
                                <div className="text-[10px] uppercase font-mono tracking-widest text-[var(--theme-accent)] mb-2 mt-1">SYS.04</div>
                                <div className="p-3 bg-[var(--theme-dark-secondary)] border border-[var(--theme-accent)]/20 rounded shadow-[0_0_10px_rgba(235,54,54,0.1)] group-hover/card:bg-[var(--theme-accent)]/10 group-hover/card:border-[var(--theme-accent)]/40 transition-colors">
                                    <Users className="w-6 h-6 text-[var(--theme-accent)]" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-3 tracking-wide">Client Management</h3>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                    Deliver local customer communications and provide first-line client management where white-labeling is used to maintain brand consistency and client trust.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Enhanced Process Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Process Column - Enhanced with cards */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="sticky top-8">
                            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 lg:mb-12">
                                How the program <span className="text-[var(--theme-accent)]">works</span>
                            </h2>

                            <div className="space-y-6">
                                {[
                                    { step: "01", title: "Apply", desc: "Complete a short partner application (company details, offerings, target markets)." },
                                    { step: "02", title: "Qualify", desc: "Partner manager reviews fit and recommends an initial tier." },
                                    { step: "03", title: "Onboard", desc: "Contracting, access to partner portal, technical enablement, and sales collateral." },
                                    { step: "04", title: "Enable & Launch", desc: "Joint go-to-market plan, pilot engagements or co-sell opportunities." },
                                    { step: "05", title: "Grow", desc: "Ongoing support, quarterly business reviews, performance incentives, and roadmap alignment." }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="group p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card-bg)] hover:border-[var(--theme-accent)] transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 bg-[var(--theme-accent)] rounded-full flex items-center justify-center">
                                                <span className="text-sm font-bold text-white">{item.step}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-[var(--foreground)] text-lg group-hover:text-[var(--theme-accent)] transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-2 font-medium text-[var(--muted-foreground)]">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center Image Column - Enhanced with overlay content */}
                    <div className="lg:col-span-4 h-full min-h-[700px] relative rounded-2xl overflow-hidden border border-[var(--theme-border)] group">
                        <Image
                            src="https://images.pexels.com/photos/10649807/pexels-photo-10649807.jpeg"
                            alt="Partnership Process"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-dark-base)] via-transparent to-transparent opacity-70" />

                        {/* Floating stats overlay */}
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="bg-[var(--theme-card-bg)]/80 backdrop-blur-sm rounded-xl p-6 border border-[var(--theme-border)]">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[var(--theme-accent)]">95%</div>
                                        <div className="text-sm text-[var(--muted-foreground)]">Success Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[var(--theme-accent)]">24h</div>
                                        <div className="text-sm text-[var(--muted-foreground)]">Onboarding</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expectations Column - Enhanced with icons */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="sticky top-8">
                            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 lg:mb-12 text-right">
                                What we <span className="text-[var(--theme-accent)]">expect</span>
                            </h2>

                            <div className="space-y-6">
                                {[
                                    { iconName: "Commitment", title: "Commitment", desc: "Commitment to ethical and compliant delivery of security services." },
                                    { iconName: "Strategy", title: "Strategy", desc: "Clear go-to-market plan and willingness to participate in joint sales motions." },
                                    { iconName: "Responsibility", title: "Responsibility", desc: "Shared responsibility for customer success and transparent reporting of engagements." }
                                ].map((item, index) => {
                                    const Icon = iconMap[item.iconName as keyof typeof iconMap];
                                    return (
                                        <div
                                            key={index}
                                            className="group p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card-bg)] hover:border-[var(--theme-accent)] transition-all duration-300 hover:shadow-lg text-right"
                                        >
                                            <div className="flex items-start justify-end gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-[var(--foreground)] text-lg group-hover:text-[var(--theme-accent)] transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="mt-2 font-medium text-[var(--muted-foreground)]">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0 p-2 rounded-lg bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20">
                                                    <Icon className="h-5 w-5 text-[var(--theme-accent)]" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Enhanced Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="relative h-[800px] rounded-2xl overflow-hidden border border-[var(--theme-border)] group">
                    <Image
                        src="https://images.pexels.com/photos/33723163/pexels-photo-33723163.jpeg"
                        alt="Partner Success"
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-dark-base)] via-[var(--theme-dark-base)]/70 to-transparent" />

                    {/* Enhanced content overlay */}
                    <div className="relative h-full flex flex-col justify-end px-8 pb-12 lg:px-16 lg:pb-16 z-10">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 mb-6">
                                <div className="w-2 h-2 bg-[var(--theme-accent)] rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-[var(--theme-accent)]">Partner Program</span>
                            </div>

                            <p className="text-lg md:text-xl max-w-xl mb-6 font-semibold text-[var(--muted-foreground)]">
                                Partners must execute a partner agreement and adhere to SafeGrey's code of conduct, data protection policies, and any regulatory constraints applicable to joint engagements.
                            </p>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[var(--foreground)] md:text-balance leading-tight mb-8">
                                Ready to grow <br />with SafeGrey?
                            </h2>
                            <button className="relative flex items-center justify-center font-bold transition-all duration-300 ease-in-out select-none rounded-lg text-white bg-[var(--theme-accent)] shadow-[0_0_20px_rgba(235,54,54,0.3)] hover:shadow-[0_0_30px_rgba(235,54,54,0.6)] hover:-translate-y-1 h-14 px-8 text-lg w-fit">
                                Complete our partner application
                            </button>
                        </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-8 right-8 hidden lg:block">
                        <div className="bg-[var(--theme-card-bg)]/80 backdrop-blur-sm rounded-xl p-4 border border-[var(--theme-border)]">
                            <div className="text-sm text-[var(--muted-foreground)]">Legal & Compliance</div>
                            <div className="text-base font-bold text-[var(--foreground)]">Snapshot</div>
                        </div>
                    </div>
                </div>
            </div>



            {/* New Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { number: "2M+", label: "Protected Assets" },
                        { number: "500+", label: "Global Partners" },
                        { number: "99.9%", label: "Uptime SLA" },
                        { number: "24/7", label: "Support Coverage" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card-bg)]">
                            <div className="text-2xl lg:text-3xl font-bold text-[var(--theme-accent)] mb-2">
                                {stat.number}
                            </div>
                            <div className="text-sm text-[var(--muted-foreground)] font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}