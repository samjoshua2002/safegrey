import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Metadata } from "next"
import Image from "next/image"
import { PartnersGrid } from "@/components/partners-grid"
import { PartnerProcess } from "@/components/partner-process"

export const metadata: Metadata = {
    title: "Our Partners - Safegrey",
    description: "Explore our network of trusted partners and collaborations in the cybersecurity space.",
}

export default function PartnersPage() {
    return (
        <main className="min-h-screen bg-[var(--theme-dark-base)]">
            <Navigation />

           <PartnersGrid/>
           <PartnerProcess/>

            <Footer />
        </main>
    )
}
