import Image from "next/image"

export function PartnerProcess() {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 mx-auto">
            {/* Enhanced Process Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24">
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
                                { icon: "⚡", title: "Commitment", desc: "Commitment to ethical and compliant delivery of security services." },
                                { icon: "🎯", title: "Strategy", desc: "Clear go-to-market plan and willingness to participate in joint sales motions." },
                                { icon: "🛡️", title: "Responsibility", desc: "Shared responsibility for customer success and transparent reporting of engagements." }
                            ].map((item, index) => (
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
                                        <div className="flex-shrink-0 text-2xl">
                                            {item.icon}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Hero Section */}
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
                            Collaborate in real time and launch security initiatives faster than ever before.
                        </p>
                        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--foreground)] md:text-balance leading-tight">
                            Instant Partnership
                        </h2>
                    </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-8 right-8 hidden lg:block">
                    <div className="bg-[var(--theme-card-bg)]/80 backdrop-blur-sm rounded-xl p-4 border border-[var(--theme-border)]">
                        <div className="text-sm text-[var(--muted-foreground)]">Trusted by</div>
                        <div className="text-lg font-bold text-[var(--foreground)]">500+ Partners</div>
                    </div>
                </div>
            </div>

            {/* Enhanced Partner Categories Section */}
            <div className="mt-24">
                <div className="text-center mb-16">
                    <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[16rem] font-black text-[var(--foreground)] tracking-tighter leading-none mb-4">
                        Safe<span className="text-[var(--theme-accent)]">Grey</span>
                    </h1>
                    <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
                        Building the future of cybersecurity through strategic partnerships and innovative solutions.
                    </p>
                </div>

                {/* Enhanced navigation with badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {[
                        { name: "Technology Partners", count: "120+" },
                        { name: "Solution Partners", count: "85+" },
                        { name: "Resellers", count: "200+" },
                        { name: "Integrations", count: "50+" }
                    ].map((category, index) => (
                        <a
                            key={index}
                            href="#_"
                            className="group relative px-6 py-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card-bg)] hover:border-[var(--theme-accent)] transition-all duration-300 hover:shadow-lg min-w-[200px] text-center"
                        >
                            <div className="font-medium text-[var(--foreground)] group-hover:text-[var(--theme-accent)] transition-colors">
                                {category.name}
                            </div>
                            <div className="text-sm text-[var(--muted-foreground)] mt-1">
                                {category.count}
                            </div>
                            <div className="absolute inset-0 rounded-xl border-2 border-[var(--theme-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </a>
                    ))}
                </div>

                {/* Enhanced CTA Section */}
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--foreground)] uppercase mb-8 lg:text-balance">
                        Collaborate, <span className="text-[var(--theme-accent)]">Secure</span>, and launch your next big initiative
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                        <button className="px-8 py-4 bg-[var(--theme-accent)] text-white font-semibold rounded-xl hover:bg-[var(--theme-accent)]/90 transition-colors duration-300 transform hover:scale-105">
                            Become a Partner
                        </button>
                        <button className="px-8 py-4 border border-[var(--theme-border)] text-[var(--foreground)] font-semibold rounded-xl hover:border-[var(--theme-accent)] transition-colors duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* New Stats Section */}
            <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8">
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
        </section>
    )
}