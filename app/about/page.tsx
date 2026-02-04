import { Navigation } from "@/components/navigation"
import { AboutSection } from "@/components/about-section"
import { TeamSection } from "@/components/team-section"
import { AboutTeam } from "@/components/about-team"
import { Footer } from "@/components/footer"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Safegrey's mission, values, and the expert team behind our advanced cybersecurity solutions.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <AboutSection />

      {/* Existing Team Section */}
      <TeamSection />

      {/* Premium Team Grid from reference */}
      {/* New Horizontal Team Cards */}
      <AboutTeam />

      <Footer />
    </main>
  )
}
