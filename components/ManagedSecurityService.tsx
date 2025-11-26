import { useState, useEffect } from "react"
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

// Custom toast configuration
const showSuccessToast = () => {
  toast.success(
    <div className="flex items-center gap-3">
      <div className="p-1.5 rounded-full bg-green-500/20 border border-green-500/30">
        <CheckCircle className="w-4 h-4 text-green-500" />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-foreground">Email Sent Successfully!</span>
        <span className="text-sm text-muted-foreground">Check your inbox for the service guide</span>
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

export function ManagedSecurityServices() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [selectedService, setSelectedService] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/managed-security', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, serviceType: selectedService }),
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

  const serviceTypes = [

    {
      id: "siem",
      title: "SIEM Detection",
      fullTitle: "SIEM Monitoring & Threat Detection",
      icon: Monitor,
      description: "Security incidents often begin with subtle indicators that are easy to miss without continuous monitoring. SIEM Monitoring & Threat Detection provides round-the-clock visibility into logs, events, and behavioural patterns across your environment. By identifying suspicious activity early, this service helps prevent small anomalies from turning into serious compromises. The goal is to ensure that threats are detected quickly, escalated appropriately, and addressed with clear guidance, giving organisations stronger control over their operational security.",
      highlights: [
        "Continuous Log & Event Visibility",
        "Rapid Detection of Suspicious Activity",
        "Clear, High-Fidelity Alerts",
        "Analyst-Driven Investigation",
        "Actionable Response Support"
      ],

      features: [
        "Centralised log collection and correlation across critical systems",
        "Detection of anomalies, unauthorised access, and malicious behaviour",
        "Triage and investigation support for high-risk alerts",
        "Escalation workflows with clear recommended actions",
        "Reporting on trends, incidents, and improvement opportunities"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "vulnerability",
      title: "Vulnerability Management",
      fullTitle: "Vulnerability Management",
      icon: Zap,
      description: "New vulnerabilities emerge constantly, and without structured management, even a small oversight can create significant exposure. This service provides ongoing visibility into weaknesses across systems, applications, and infrastructure, helping teams understand which issues require immediate attention. By analysing severity, exploitability, and business impact, the process ensures that remediation efforts stay focused on the risks that matter most. The result is a more predictable, controlled, and efficient approach to reducing attack surface over time.",
      highlights: [
        "Continuous Exposure Awareness",
        "Prioritised Risk-Based Insights",
        "Clear Focus on High-Impact Issues",
        "Streamlined Remediation Guidance",
        "Improved Security Hygiene Over Time"
      ],

      features: [
        "Regular vulnerability scans across relevant assets",
        "Identification of critical flaws and misconfigurations",
        "Impact-based prioritisation and expert analysis",
        "Remediation recommendations aligned with operational constraints",
        "Periodic reports tracking progress and long-term risk reduction"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "purple-team",
      title: "Purple Team",
      fullTitle: "Purple Team ",
      icon: Users,
      description: "Purple Team engagements bring offensive and defensive teams together to strengthen detection and response capabilities in a controlled, collaborative setting. Instead of focusing solely on attack or defence, this exercise bridges the gap—showing how real attack techniques behave and how well existing tools and processes identify them. Each scenario is tested, observed, and refined in real time, giving organisations practical insight into what works and what needs improvement. The outcome is a sharper, more coordinated security posture built on shared understanding and measurable progress.",
      highlights: [
        "Collaborative Attack & Defence Exercises",
        "Technique-by-Technique Validation",
        "Clear Detection Gaps Identified",
        "Real-Time Improvement Cycles",
        "Stronger Coordination Between Teams"
      ],

      features: [
        "Execution of curated attacker techniques mapped to frameworks like MITRE ATT&CK",
        "Joint analysis of detection coverage, alert behaviour, and response workflow",
        "Identification of monitoring gaps and tuning opportunities",
        "Hands-on improvement sessions for SOC and defensive teams",
        "Detailed reporting with validated controls and targeted enhancements"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },

  ]

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-left mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Managed Security Services
          </h2>
          <p className="text-xl md:text-lg md:text-justify text-muted-foreground mx-auto leading-relaxed">
            Security operations demand constant attention, and many organisations struggle to maintain the visibility and expertise needed to stay ahead of evolving threats. Managed Security Services provide continuous monitoring, rapid detection, and structured response support, ensuring that risks are addressed before they escalate. These services strengthen day-to-day security operations by combining skilled analysts, proven processes, and reliable visibility into what is happening across your environment. The result is a more controlled, informed, and resilient security posture without the overhead of managing everything internally.
          </p>
        </div>

        <Tabs defaultValue={serviceTypes[0].id} className="w-full items-center">
          <TabsList className="grid grid-cols-3 md:grid-cols-3 gap-3 p-2 bg-card/50 backdrop-blur-sm rounded-2xl h-auto border border-border/50 shadow-xl mb-12">
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