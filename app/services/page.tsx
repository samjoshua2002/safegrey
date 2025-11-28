import { Metadata } from "next"
import { ServicesPageContent } from "@/components/services-page-content"

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore Safegrey's comprehensive cybersecurity services: Security Assessment, Cloud Security, Managed Security, Risk Management, and more.",
}

export default function ServicesPage() {
  return <ServicesPageContent />
}