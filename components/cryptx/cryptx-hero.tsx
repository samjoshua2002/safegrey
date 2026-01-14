import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AppointmentModalWrapper } from "@/components/appointment-modal-wrapper"
import { cn } from "@/lib/utils"
// import DarkVeil from "@/components/DarkVeil"

export function CryptXHero() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-[var(--theme-dark-base)]">
            {/* DarkVeil Background */}
            {/* <div className="absolute inset-0 z-0 opacity-40">
                <DarkVeil />
            </div> */}

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[var(--theme-accent)]/10 blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--theme-text-primary)] to-[var(--theme-text-secondary)] bg-clip-text text-transparent">
                        CryptX
                    </h1>
                    <p className="text-xl md:text-2xl text-[var(--theme-text-secondary)] max-w-3xl mx-auto leading-relaxed mb-12">
                        Shellcode Obfuscator for Antivirus and EDR Evasion
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        {/* Button to open modal */}
                        <Button
                            size="lg"
                            className="glow-accent animate-pulse-glow group cursor-pointer"
                            style={{
                                backgroundColor: "var(--primary)",
                                color: "var(--foreground)",
                            }}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Book your consultation
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <Link href="/contact" passHref legacyBehavior>
                            <Button
                                variant="outline"
                                size="lg"
                                className="glass-effect bg-transparent border border-primary text-foreground hover:bg-primary hover:text-foreground transition-colors cursor-pointer"
                            >
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Modal */}
                <AppointmentModalWrapper
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />

                {/* Dashboard Image Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative max-w-5xl mx-auto"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-dark-base)] via-transparent to-transparent z-20 pointer-events-none" />
                    <div className="rounded-2xl border border-[var(--theme-border)] overflow-hidden shadow-2xl bg-black/40 backdrop-blur-sm">
                       
                        <img
                            src="/images/das.jpeg"
                            alt="CryptX Dashboard"
                            className="w-full h-auto object-cover"
                            style={{
                                filter: `
      grayscale(40%)
      sepia(80%)
      saturate(18%)
      brightness(0.95)
      contrast(1.15)
    `
                            }}
                        />
                    </div>

                    {/* Decorative accents */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--theme-accent)]/20 blur-2xl rounded-full" />
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full" />
                </motion.div>
            </div>
        </section>
    )
}
