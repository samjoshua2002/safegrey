import { Navigation } from "@/components/navigation"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { Footer } from "@/components/footer"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Safegrey for expert cybersecurity consultation, services, and support. We are here to secure your digital assets.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--theme-dark-base)]">
      <Navigation />
      
      <ContactHero />
      <div
        className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent"
        style={{
          background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <ContactForm />
        <ContactInfo />
      </div>
      <div
        className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent"
        style={{
          background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
        }}
      />
      <Footer />
    </main>
  )
}
