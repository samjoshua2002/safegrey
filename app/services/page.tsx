"use client"

import { useRef } from "react"
import { Navigation } from "@/components/navigation"
import { ServicesHero } from "@/components/services-hero"
import { SecurityAssessment } from "@/components/Security-Assessment"

import { Footer } from "@/components/footer"
import { SecurityPostureAssessment } from "@/components/ Security-Posture-Assessment"
import { CloudSecurityAssessment } from "@/components/cloudsecurityAssessment"
import { ManagedSecurityServices } from "@/components/ManagedSecurityService"
import { RiskManagementServices } from "@/components/RiskManagement"
import { SecurityEnablementServices } from "@/components/SecurityEnabledService"

export default function ServicesPage() {
  const securityAssessmentRef = useRef<HTMLDivElement>(null)
  const postureAssessmentRef = useRef<HTMLDivElement>(null)
  const CloudAssessmentRef = useRef<HTMLDivElement>(null)
  const ManangeSecurityRef = useRef<HTMLDivElement>(null)
  const RiskManagementRef = useRef<HTMLDivElement>(null)
  const SecurityEnablementRef = useRef<HTMLDivElement>(null)
  
  const handleServiceSelect = (serviceId: string) => {
    switch (serviceId) {
      case "security-assessment":
        securityAssessmentRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        break
         case "cloud-security":
        CloudAssessmentRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        break
        case "manage-security":
        ManangeSecurityRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        break
      case "posture-assessment":
        postureAssessmentRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        break
        case "risk-management":
        RiskManagementRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        break
      
        case "security-enablement":
        SecurityEnablementRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        break
      default:
        break
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <ServicesHero onServiceSelect={handleServiceSelect} />
      
      <div ref={securityAssessmentRef}>
        <SecurityAssessment />
      </div>
            <div
            className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent mt-20"
            style={{
              background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
            }}
          />
      
      <div ref={postureAssessmentRef}>
       <SecurityPostureAssessment/>
      </div>
       <div
            className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent mt-20"
            style={{
              background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
            }}
          />
       <div ref={CloudAssessmentRef}>
       <CloudSecurityAssessment/>
      </div>
       <div
            className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent mt-20"
            style={{
              background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
            }}
          />
      <div ref={ManangeSecurityRef}>
       <ManagedSecurityServices/>
      </div>
       <div
            className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent mt-20"
            style={{
              background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
            }}
          />
      <div ref={RiskManagementRef}>
       <RiskManagementServices/>
      </div>
       <div
            className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent mt-20"
            style={{
              background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
            }}
          />
      <div ref={SecurityEnablementRef}>
       <SecurityEnablementServices/>
      </div>
       <div
            className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent mt-20"
            style={{
              background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
            }}
          />
      
      <Footer />
    </main>
  )
}