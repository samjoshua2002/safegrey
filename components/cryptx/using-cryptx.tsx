"use client"

import { motion } from "framer-motion"
import { UploadCloud, Settings2, Rocket, CheckCircle } from "lucide-react"

const steps = [
    {
        title: "Upload Shellcode",
        description: "Operators can generate shellcode using popular tools such as Metasploit, Sliver, Cobalt Strike, or Mythic, then upload it to the CryptX platform. The tool accepts multiple formats including raw binary, hex-encoded, and base64-encoded shellcode.",
        icon: UploadCloud,
    },
    {
        title: "Customize Payload",
        description: "Operators select from a wide array of options, from basic application customization (e.g., icons and metadata) to advanced evasion techniques that help bypass detection by EDR systems. Choose encryption algorithms, injection methods, anti-analysis techniques, and obfuscation strategies.",
        icon: Settings2,
    },
    {
        title: "Generate & Deploy",
        description: "After selecting the desired options, the operator clicks \"Generate\" to create the customized payload. The payload is then ready for immediate download and deployment. Each generated executable is uniquely obfuscated to avoid signature-based detection.",
        icon: Rocket,
    }
]

export function UsingCryptX() {
    return (
        <section className="py-24 bg-black/40 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    {/* Left Side: Content List */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold text-[var(--theme-text-primary)] mb-6">Using CryptX</h2>
                            <p className="text-lg text-[var(--theme-text-secondary)] mb-12 leading-relaxed">
                                With the increasing complexity of security defenses, traditional payload generation tools fall short of the capabilities required to evade detection by sophisticated security systems. CryptX simplifies this process by providing operators with an intuitive, desktop-based platform that enables the creation of evasive and customizable payloads in just three steps.
                            </p>

                            <div className="space-y-8">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-6 group">
                                        <div className="shrink-0">
                                            <div className="w-14 h-14 rounded-2xl bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 flex items-center justify-center group-hover:bg-[var(--theme-accent)]/20 transition-all duration-300">
                                                <step.icon className="w-7 h-7 text-[var(--theme-accent)]" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="text-[var(--theme-text-secondary)] leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-6 rounded-2xl bg-[var(--theme-accent)]/5 border border-[var(--theme-accent)]/10">
                                <p className="text-[var(--theme-text-secondary)] italic leading-relaxed">
                                    CryptX significantly reduces the time and expertise needed for custom payload development, ensuring operators have more time to focus on executing comprehensive security assessments. The tool automates complex obfuscation and evasion techniques that would otherwise require hours of manual coding and testing.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Image with Red Glow */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            {/* Theme Red Shade Glow Background */}
                            <div className="absolute -inset-4 bg-[var(--theme-accent)]/20 blur-[80px] rounded-full z-0 opacity-60" />

                                <img
                                    src="/images/tt.webp"
                                    alt="CryptX Interface"
                                    className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 hue-rotate-[60deg]"
                                    style={{ filter: "hue-rotate(90deg)" }}
                                />
                           

                            {/* Decorative accents */}
                            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[var(--theme-accent)]/20 blur-3xl rounded-full" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
