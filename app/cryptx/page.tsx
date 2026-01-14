"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CryptXHero } from "@/components/cryptx/cryptx-hero"
import { WhyChooseCryptX } from "@/components/cryptx/why-choose-cryptx"
import { CryptXFeatureMap } from "@/components/cryptx/cryptx-feature-map"
import { UsingCryptX } from "@/components/cryptx/using-cryptx"
import { CryptXPricing } from "@/components/cryptx/cryptx-pricing"

export default function CryptxPage() {
    return (
        <main className="min-h-screen bg-[var(--theme-dark-base)]">
            <Navigation />

            <CryptXHero />

            <WhyChooseCryptX />

            <CryptXFeatureMap />

            <UsingCryptX />

            <CryptXPricing />

            <Footer />
        </main>
    )
}
