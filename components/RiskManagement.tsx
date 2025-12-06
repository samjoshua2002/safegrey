import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Shield, Monitor, Zap, Users, ArrowRight, Sparkles, Eye, AlertTriangle, Download, Mail, User } from "lucide-react"
import { toast } from "sonner"
import { Captcha } from "@/components/ui/captcha"

// Download Dialog Component
interface ServiceDownloadDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: { name: string; email: string }
  onFormChange: (data: { name: string; email: string }) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  serviceTitle: string
}

function ServiceDownloadDialog({ isOpen, onOpenChange, formData, onFormChange, onSubmit, isLoading, serviceTitle }: ServiceDownloadDialogProps) {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)

  // Reset captcha when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setIsCaptchaVerified(false)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 justify-center text-white px-5 py-3 rounded-lg bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 group">
          <Download className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          Download Datasheets
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-card/30 to-accent/5 pointer-events-none rounded-lg" />

        <DialogHeader className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-accent/10 border border-accent/20">
              <Download className="w-6 h-6 text-accent" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Download {serviceTitle} Guide
            </DialogTitle>
          </div>
          <DialogDescription className="text-base text-muted-foreground leading-relaxed">
            Get your comprehensive {serviceTitle.toLowerCase()} guide delivered directly to your inbox.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 mt-6 relative z-10">
          <div className="space-y-3">
            <Label htmlFor="service-name" className="text-sm font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-accent" />
              Full Name
            </Label>
            <div className="relative">
              <Input
                id="service-name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
                required
                className="h-11 pl-10 bg-background/50 border-border/70 focus:border-accent/50 transition-colors"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="service-email" className="text-sm font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              Company Email
            </Label>
            <div className="relative">
              <Input
                id="service-email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
                required
                className="h-11 pl-10 bg-background/50 border-border/70 focus:border-accent/50 transition-colors"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg border border-border/30">
              Please use your company email address for verification purposes.
            </p>
          </div>

          <Captcha onVerify={setIsCaptchaVerified} />

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !isCaptchaVerified}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            {isLoading ? (
              <div className="flex items-center gap-2 relative z-10">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending Guide...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 relative z-10">
                <Download className="w-4 h-4" />
                <span>Send to Email</span>
              </div>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Custom toast configuration removed in favor of Sonner toast.promise

export function RiskManagementServices() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [selectedService, setSelectedService] = useState("")
  const [activeTab, setActiveTab] = useState("iso27001")

  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")

  useEffect(() => {
    if (tab && serviceTypes.some(t => t.id === tab)) {
      setActiveTab(tab)
    }
  }, [tab])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const submitPromise = async () => {
      try {
        const response = await fetch('/api/risk-management', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, serviceType: selectedService }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to send email. Please try again.')
        }
        return data
      } finally {
        setIsLoading(false)
      }
    }

    toast.promise(submitPromise(), {
      loading: 'Sending Guide...',
      success: (data) => {
        setIsDialogOpen(false)
        setFormData({ name: "", email: "" })
        return 'Email Sent Successfully! Check your inbox for the service guide'
      },
      error: (err) => {
        return err.message || 'An unexpected error occurred. Please try again.'
      },
    })
  }

  const serviceTypes = [
    {
      id: "iso27001",
      title: "ISO 27001",
      fullTitle: "ISO 27001 Consulting",
      icon: Shield,
      description: "Achieving ISO 27001 compliance requires a clear understanding of how information is managed, protected, and governed across the organisation. This consulting service guides teams through the entire certification journey, evaluating current practices, identifying gaps against the standard, and building a structured roadmap for implementation. The focus is on creating practical controls, policies, and processes that support sustained compliance rather than short-term checklists. Organisations gain confidence in their readiness and a repeatable framework for maintaining certification year after year.",
      highlights: [
        "End-to-End Certification Guidance",
        "Gap Analysis & Control Mapping",
        "Policy, Process & Framework Support",
        "Practical, Sustainable Recommendations",
        "Clear Path to Audit Readiness"
      ],
      features: [
        "Assessment of current information security management practices",
        "Gap analysis against ISO 27001 requirements",
        "Development or enhancement of policies, controls, and procedures",
        "Support for risk assessments, SoA creation, and ISMS documentation",
        "Guidance throughout pre-audit and audit preparation"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "hipaa",
      title: "HIPAA",
      fullTitle: "HIPAA Compliance",
      icon: AlertTriangle,
      description: "Protecting healthcare data requires strict adherence to the safeguards defined under HIPAA. This assessment reviews how sensitive health information is stored, accessed, and transmitted across your environment, identifying gaps that could lead to compliance violations or data exposure. The process evaluates administrative, technical, and physical controls, ensuring that each requirement is addressed with practical, enforceable measures. Organisations receive clear direction on strengthening privacy practices, reducing risk, and maintaining compliance with regulatory expectations.",
      highlights: [
        "Comprehensive HIPAA Requirement Review",
        "Clear Identification of Control Gaps",
        "Privacy & Data Handling Focus",
        "Practical Policy & Process Enhancements",
        "Strong Path Toward Compliance Assurance"
      ],
      features: [
        "Evaluation of PHI handling, storage, and access procedures",
        "Review of administrative, technical, and physical safeguards",
        "Gap analysis aligned with HIPAA Security & Privacy Rules",
        "Recommendations for policies, controls & documentation improvements",
        "Support for remediation planning & compliance readiness"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "gdpr",
      title: "GDPR",
      fullTitle: "GDPR Consulting",
      icon: Eye,
      description: "GDPR places strict expectations on how personal data is collected, processed, and protected. This consulting service helps organisations understand their obligations and identify where current practices fall short of the regulation. The assessment covers data flows, consent mechanisms, security controls, and documentation requirements to ensure compliance is both achievable and sustainable. The guidance focuses on building privacy practices that reduce regulatory risk and strengthen customer trust.",
      highlights: [
        "End-to-End GDPR Readiness Support",
        "Strong Focus on Data Protection & Privacy",
        "Clear Insight Into Compliance Gaps",
        "Practical Policy & Process Improvements",
        "Structured Path to Regulatory Alignment"
      ],
      features: [
        "Review of data collection, processing activities, and retention practices",
        "Gap analysis aligned with GDPR principles and legal requirements",
        "Evaluation of consent handling, subject rights workflows & security controls",
        "Recommendations for policy updates & governance processes",
        "Support for building a sustainable privacy and compliance framework"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "soc",
      title: "SOC 1/2",
      fullTitle: "SOC 1 / SOC 2 Readiness",
      icon: CheckCircle,
      description: "Preparing for a SOC audit requires clarity on how your organisation manages controls related to security, availability, integrity, and confidentiality. This readiness service identifies gaps within current processes and technical safeguards, ensuring your environment aligns with Trust Services Criteria. The goal is to simplify audit preparation by highlighting what needs improvement and how to implement it effectively. Organisations gain confidence in their audit posture and a structured path to achieving a successful SOC 1 or SOC 2 report.",
      highlights: [
        "Comprehensive Control Gap Analysis",
        "Trust Services Criteria Alignment",
        "Practical Audit Preparation Support",
        "Clear Documentation & Process Guidance",
        "Strong Foundation for Successful Certification"
      ],
      features: [
        "Review of control design, implementation, and operational maturity",
        "Gap analysis mapped to SOC 1 / SOC 2 requirements",
        "Recommendations for process, documentation, and security improvements",
        "Guidance on evidence collection and audit expectations",
        "Support throughout readiness planning and remediation"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    }
  ]

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-left mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Risk Management
          </h2>
          <p className="text-xl md:text-lg md:text-justify text-muted-foreground mx-auto leading-relaxed">
            Strong governance and compliance are essential for maintaining trust, meeting regulatory obligations, and ensuring long-term operational stability. Risk Management services help organisations understand where their controls stand, how well policies align with industry requirements, and which areas need improvement. These assessments evaluate people, processes, and technical safeguards to confirm whether the organisation is prepared to meet standards such as ISO, SOC, HIPAA, and GDPR. The insights support clearer decision-making, reduced compliance exposure, and a more structured approach to managing risk across the business.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full items-center">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2 bg-card/50 backdrop-blur-sm rounded-2xl h-auto border border-border/50 shadow-xl mb-12">
            {serviceTypes.map((service) => {
              const Icon = service.icon
              return (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-background data-[state=active]:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-data-[state=active]:text-accent transition-colors" />
                  <span className="text-xs md:text-sm font-medium text-center leading-tight">{service.title}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {serviceTypes.map((service) => {
            const Icon = service.icon
            return (
              <TabsContent key={service.id} value={service.id} className="mt-0">
                <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-8 md:p-12">

                    {/* Header Section */}
                    <div className="space-y-4">
                      <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                        {service.fullTitle}
                      </h3>

                      <p className="text-lg md:text-lg md:text-justify text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Highlights Section */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      {service.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span className="text-sm font-semibold">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* What's Included Grid */}
                    <div className="space-y-6 pt-10">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-6 h-6 text-accent" />
                        <h4 className="text-xl font-bold">What's Included</h4>
                      </div>

                      {/* 2-column layout */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                        {/* Left column features (F1, F2, F3) */}
                        {service.features.slice(0, 3).map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border hover:border-accent/30 transition-all duration-300 hover:translate-x-1 group"
                          >
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                              {feature}
                            </span>
                          </div>
                        ))}

                        {/* Right column features (F4, F5) + Download button */}
                        {service.features.slice(3).map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border hover:border-accent/30 transition-all duration-300 hover:translate-x-1 group"
                          >
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                              {feature}
                            </span>
                          </div>
                        ))}

                        {/* Download PDF button */}
                        <div className="flex items-start pt-2">
                          <div onClick={() => setSelectedService(service.title)}>
                            <ServiceDownloadDialog
                              isOpen={isDialogOpen && selectedService === service.title}
                              onOpenChange={(open) => {
                                setIsDialogOpen(open)
                                if (!open) setSelectedService("")
                              }}
                              formData={formData}
                              onFormChange={setFormData}
                              onSubmit={handleSubmit}
                              isLoading={isLoading}
                              serviceTitle={service.title}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}