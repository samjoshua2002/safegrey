"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Shield, Smartphone, Cloud, Network, Server, ArrowRight, Sparkles, Download, Mail, User } from "lucide-react"
import { toast } from "sonner"
import InteractiveTypography from "./InteractiveTypography"

// Download Dialog Component for Security Assessment
interface SecurityDownloadDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: { name: string; email: string }
  onFormChange: (data: { name: string; email: string }) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

function SecurityDownloadDialog({ isOpen, onOpenChange, formData, onFormChange, onSubmit, isLoading }: SecurityDownloadDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 justify-center text-white px-5 py-3 rounded-lg bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 group">
          <Download className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          Download PDF
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
              Download Assessment Guide
            </DialogTitle>
          </div>
          <DialogDescription className="text-base text-muted-foreground leading-relaxed">
            Get your comprehensive security assessment guide delivered directly to your inbox.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4 mt-6 relative z-10">
          <div className="space-y-3">
            <Label htmlFor="security-name" className="text-sm font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-accent" />
              Full Name
            </Label>
            <div className="relative">
              <Input
                id="security-name"
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
            <Label htmlFor="security-email" className="text-sm font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              Company Email
            </Label>
            <div className="relative">
              <Input
                id="security-email"
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
          
          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            disabled={isLoading}
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

// Custom toast configuration
const showSuccessToast = () => {
  toast.success(
    <div className="flex items-center gap-3">
      <div className="p-1.5 rounded-full bg-green-500/20 border border-green-500/30">
        <CheckCircle className="w-4 h-4 text-green-500" />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-foreground">Email Sent Successfully!</span>
        <span className="text-sm text-muted-foreground">Check your inbox for the assessment guide</span>
      </div>
    </div>,
    {
      duration: 5000,
      position: "top-right",
      style: {
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "12px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    }
  )
}

const showErrorToast = (message: string) => {
  toast.error(
    <div className="flex items-center gap-3">
      <div className="p-1.5 rounded-full bg-red-500/20 border border-red-500/30">
        <div className="w-4 h-4 flex items-center justify-center">
          <span className="text-red-500 font-bold text-sm">!</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-foreground">Failed to Send Email</span>
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    </div>,
    {
      duration: 5000,
      position: "top-right",
      style: {
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "12px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    }
  )
}

export function SecurityAssessment() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/send-security-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        showErrorToast(data.error || 'Failed to send email. Please try again.')
        setIsLoading(false)
        return
      }

      showSuccessToast()
      setIsDialogOpen(false)
      setFormData({ name: "", email: "" })
    } catch (error) {
      showErrorToast('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const assessmentTypes = [
    {
      id: "web-app",
      title: "Web Application",
      fullTitle: "Web Application Assessment",
      icon: Cloud,
      description: "Web applications often become the first point of contact for attackers due to their accessibility and business value. This assessment examines how the application handles user interactions, data flows, and trust boundaries, highlighting weaknesses that may allow unauthorised access or misuse. By analysing logic paths, session handling, and behaviour under unexpected conditions, it uncovers risks that traditional reviews often overlook. The findings give teams a clear, prioritised plan to strengthen the application and prevent exposure that could impact operations or user trust.",
      features: [
        "Analysis of access control, session management, and identity handling",
        "Review of input handling, error behaviour, and data exposure points",
        "Mapping of logic flaws, bypass opportunities, and misuse scenarios",
        "Evaluation against common exploitation methods and industry benchmarks",
        "Reporting with prioritised remediation guidance",
      ],
      highlights: ["Logic Inspection", "High-Value, Low-Noise Finding", "Focus on Real Attack Paths", "Business Risk Breakdown", "Structured Fix Recommendations"],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "mobile-app",
      title: "Mobile Application",
      fullTitle: "Mobile Application Assessment",
      icon: Smartphone,
      description: "Mobile applications introduce unique exposure points, from insecure data storage to unsafe device interactions and weak API communication paths. This assessment examines how the app behaves under hostile conditions—how data is handled, how permissions are used, and how an attacker may misuse functions or intercept traffic. The goal is to identify weaknesses that could compromise user information or allow unauthorised access. Findings are translated into clear, actionable improvements that help strengthen both functionality and trust.",
      features: [
        "Review of storage practices, encryption use, and sensitive data exposure",
        "Analysis of API communication, backend trust boundaries, request integrity",
        "Evaluation of login flows, session handling, and access controls",
        "Assessment of permissions, device interaction risks, and misuse potential",
        "Mapping against OWASP mobile testing principles"
      ],
      highlights: [
        "In-Depth Mobile Analysis",
        "Privacy & Sensitive Data Protection",
        "Abuse-Case Testing",
        "Focus on Real Impact",
        "Practical Remediation Paths"
      ], 
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "api",
      title: "API Security",
      fullTitle: "API Security Assessment",
      icon: Network,
      description: "APIs often become the most targeted component of an organisation's digital ecosystem due to direct data access and extensive integration points. This assessment inspects how APIs validate input, enforce permissions, communicate with backend services, and protect sensitive information. The focus is on uncovering weaknesses that enable data exposure, privilege escalation, or unauthorised operations. The results give teams a clear understanding of their API risk landscape and the steps required to strengthen control boundaries and system integrity.",
      features: [
        "Inspection of authentication, authorisation, and token handling",
        "Review of input validation, rate limiting, and error behaviour",
        "Analysis of data exposure, response structure, and trust boundaries",
        "Testing against common exploitation paths ",
        "Alignment with OWASP API Security standards"
      ],
      highlights: [
        "Deep Parameter & Endpoint Analysis",
        "Access Control Validation",
        "Detection of Flaws",
        "Clear Exposure Mapping",
        "Action-Oriented Guidance"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "network",
      title: "Network Infrastructure",
      fullTitle: "Network Assessment",
      icon: Server,
      description: "A network environment can hide misconfigurations, exposed services, and weak trust relationships that attackers rely on to move deeper into an organisation. This assessment examines internal and external pathways, identifying weaknesses that enable lateral movement, data access, or service disruption. By analysing system communication, access boundaries, and control gaps, the review highlights the areas that require immediate attention. Organisations gain a clear understanding of network exposure and the measures needed to reinforce their infrastructure.",
      features: [
        "Review of accessible services, open ports, and network segmentation",
        "Evaluation of protocol security, device configuration, and access controls",
        "Identification of misconfigurations enabling escalation or pivoting",
        "Analysis of firewall rules, monitoring gaps, and trust relationships",
        "Reporting with structured remediation guidance"
      ],
      highlights: [
        "Thorough Exposure Discovery",
        "Lateral Movement Path Analysis",
        "Clear Network Risk Mapping",
        "Prioritised Findings",
        "Effective Hardening "
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "active-directory",
      title: "Active Directory",
      fullTitle: "Active Directory Assessment",
      icon: Shield,
      description: "Active Directory often becomes the central target for attackers due to its extensive control over identity and access. This assessment explores the pathways that enable privilege escalation, persistence, and domain compromise. By analysing group structures, policy configurations, authentication flows, and inherited permissions, it highlights the weaknesses that create opportunity for misuse. The insights help organisations strengthen identity governance and reduce the likelihood of widespread impact during an incident.",
      features: [
        "Assessment of domain trusts, group memberships, and privilege structure",
        "Review of GPO configurations, authentication settings, and security controls",
        "Identification of escalation paths,misconfigurations, and persistence vectors",
        "Evaluation of password policies, delegation risks, and exposed identities",
        "Actionable reporting tailored to reduce identity-based threats"
      ],
      highlights: [
        "Privilege Path Mapping",
        "Misconfiguration & Policy Review",
        "Identity Abuse Detection",
        "Clear Attack Surface Visibility",
        "Practical Hardening Steps"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Expert-Led Security Services
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            <InteractiveTypography
                          text=" Security  Assessments"
                          className="text-5xl md:text-6xl lg:text-7xl font-bold"
                      
                        />
          </h2>
          <p className="text-xl md:text-lg md:text-justify text-muted-foreground mx-auto leading-relaxed">
            Modern organisations operate in environments where a single weakness can lead to significant business disruption. Security Assessments help expose blind spots across applications, networks, and identity systems before adversaries discover them. These evaluations focus on real-world attack behaviours, uncovering both technical flaws and misaligned security controls. The outcome is a clear view of the organisation's true risk posture and a practical direction for strengthening defences with confidence. SafeGrey brings a balanced approach that helps teams understand exposure, prioritise what matters, and build resilience without slowing operations.
          </p>
        </div>

        <Tabs defaultValue="web-app" className="w-full items-center">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 gap-3 p-2 bg-card/50 backdrop-blur-sm rounded-2xl h-auto border border-border/50 shadow-xl mb-12">
            {assessmentTypes.map((type) => {
              const Icon = type.icon
              return (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-background data-[state=active]:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-data-[state=active]:text-accent transition-colors" />
                  <span className="text-xs md:text-sm font-medium text-center leading-tight">{type.title}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {assessmentTypes.map((type) => {
            const Icon = type.icon
            return (
              <TabsContent key={type.id} value={type.id} className="mt-0">
                <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-8 md:p-12">
                    {/* Header Section */}
                    <div className="space-y-4">
                  

                      <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                        {type.fullTitle}
                      </h3>

                      <p className="text-lg md:text-lg md:text-justify text-muted-foreground leading-relaxed">
                        {type.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      {type.highlights.map((highlight, index) => (
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
                        {type.features.slice(0, 3).map((feature, index) => (
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
                        {type.features.slice(3).map((feature, index) => (
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
                          <SecurityDownloadDialog
                            isOpen={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                            formData={formData}
                            onFormChange={setFormData}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                          />
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