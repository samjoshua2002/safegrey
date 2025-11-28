import { Navigation } from "@/components/navigation"
import { ResourcesHero } from "@/components/resources-hero"
import { BlogSection } from "@/components/blog-section"
import { WhitepapersSection } from "@/components/whitepapers-section"
import { SecurityAlertsSection } from "@/components/security-alerts-section"
import { Footer } from "@/components/footer"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resources",
  description: "Access Safegrey's cybersecurity resources including blogs, whitepapers, security alerts, and industry insights to stay ahead of threats.",
}

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ResourcesHero />
      <BlogSection />
      <WhitepapersSection />
      <SecurityAlertsSection />
      <Footer />
    </main>
  )
}
