import { Navigation } from "@/components/navigation"
import { AboutHero } from "@/components/about-hero"
import { TeamSection } from "@/components/team-section"
import { CompanyValues } from "@/components/company-values"
import { CompanyStats } from "@/components/company-stats"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { AboutSection } from "@/components/about-section"

import { Metadata } from "next"
import { BookingScheduler } from "@/components/booking-sheduler"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Safegrey's mission, values, and the expert team behind our advanced cybersecurity solutions.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      {/* <AboutHero /> */}
      <AboutSection />

      {/*       
      <CompanyValues />
      <TeamSection />
      <CompanyStats />
      <CTASection /> */}
      <BookingScheduler/>
      <Footer />

    </main>
  )
}
