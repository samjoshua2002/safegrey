"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"

export function ContactHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[var(--theme-dark-base)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(174,32,18,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 mb-8 mt-10">
            <MessageCircle className="w-4 h-4 text-[var(--theme-accent)]" />
            <span className="text-sm font-semibold text-[var(--theme-accent)]">Get in Touch</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Ready to Secure</span>
            <br />
            <span className="text-[var(--foreground)]">Your Business?</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-[var(--muted-foreground)] mb-8 max-w-3xl mx-auto leading-relaxed">
            Get started with a free security consultation. Our experts are ready to help you build a comprehensive
            cybersecurity strategy.
          </p>
        </div>
      </div>
    </section>
  )
}
