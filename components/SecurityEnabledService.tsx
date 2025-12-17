import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Shield, Monitor, Zap, Users, ArrowRight, Sparkles, Eye, AlertTriangle, Briefcase, Cloud, UserCheck, Download, Mail, User } from "lucide-react"
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

export function SecurityEnablementServices() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [selectedService, setSelectedService] = useState("")
  const [activeTab, setActiveTab] = useState("subscriptions")

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
        const response = await fetch('/api/security-enablement', {
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
      id: "subscriptions",
      title: "Security Subscriptions",
      fullTitle: "Security Subscriptions",
      icon: Shield,
      description: "Security Subscriptions provide ongoing defensive support designed to keep organisations informed, prepared, and consistently improving. Instead of one-time assessments, this model offers continuous visibility into vulnerabilities, misconfigurations, and shifts in security posture. Each cycle delivers expert analysis, scheduled reviews, and clear recommendations tailored to your environment. The result is predictable, year-round oversight that helps reduce exposure and ensures your security practices evolve with emerging threats.",
      highlights: [
        "Ongoing Security Visibility",
        "Predictable Monthly or Yearly Coverage",
        "Expert-Led Reviews & Recommendations",
        // "Consistent Posture Improvement",
        "Flexible Subscription Options"
      ],
      features: [
        "Regular security posture reviews and targeted assessments",
        "Monthly/quarterly advisory sessions with security experts",
        "Analysis of new vulnerabilities and environment-specific risks",
        "Prioritised remediation and improvement guidance",
        "Continuous support throughout the subscription period"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "staffing",
      title: "Security Staffing",
      fullTitle: "Security Staffing",
      icon: UserCheck,
      description: "Security Staffing provides organisations with skilled professionals who can support daily operations, ongoing projects, or long-term security needs. Whether you require analysts, engineers, or specialised expertise, this service ensures the right talent is available without the challenges of recruiting and training internally. Each engagement is tailored to fit operational priorities, helping teams increase capacity, improve response capability, and maintain consistent security performance.",
      highlights: [
        // "On-Demand Security Talent",
        "Short-Term or Long-Term Engagements",
        "Skilled Analysts & Engineers",
        "Reduced Hiring & Training Overhead",
        "Flexible Placement Models"
      ],
      features: [
        "Deployment of security professionals based on required roles",
        "Support for operations, monitoring, engineering, or project-based tasks",
        "Regular performance updates and engagement oversight",
        "Optional full-time, part-time, or hybrid resource models",
        "Smooth integration with existing internal teams"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "cryptx",
      title: "CryptX",
      fullTitle: "CryptX",
      icon: Cloud,
      description: "CryptX is built for offensive teams who want reliable evasion without turning every engagement into a research project. The platform transforms raw shellcode into tailored execution artefacts using a flexible, cloud-driven workflow. Each build incorporates evolving evasion logic designed to reduce detection and minimise analyst scrutiny. Instead of maintaining custom loaders or rewriting tooling every few months, teams can generate what they need in minutes and move straight to the operation. CryptX gives red teams a repeatable, controlled way to prepare tradecraft while keeping development effort close to zero.",
      highlights: [
        "Rapid creation of customised execution artefacts",
        // "Continually updated evasion logic powered by platform intelligence",
        "Artefacts built without relying on static signatures",
        "API-first design for seamless pipeline integration",
        // "Built to save time, reduce effort, and increase operational tempo"
      ],
      features: [
        "Cloud-based generator for EXE, DLL, and packaged output formats",
        "Options to apply trusted signing profiles or self-generated signatures",
        "Built-in countermeasures against debugging, sandboxing & analysis tools",
        "Target-scoped execution controls to limit accidental exposure",
        "Evolutionary evasion techniques refined through ongoing research"
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
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-relaxed">
            Security Enablement Services
          </h2>
          <p className="text-xl md:text-lg text-justify text-muted-foreground mx-auto leading-relaxed">
            Organisations often struggle to maintain the skills, resources, and continuous oversight needed to stay ahead of evolving threats. Security Enablement Services provide ongoing support, specialised expertise, and purpose-built tools that strengthen operational capability throughout the year. These services help teams address talent gaps, improve defensive maturity, and gain consistent access to actionable security insights. With flexible models and practical guidance, organisations can scale their security efforts without the burden of managing everything internally.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full items-center">
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
                  <span
  className="
    text-xs
    md:text-sm
    font-medium
    text-center
    leading-tight
    break-words
    whitespace-normal
    max-w-full
  "
>
  {service.title}
</span>

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
                      <h3 className="text-3xl md:text-5xl font-bold leading-relaxed">
                        {service.fullTitle}
                      </h3>

                      <p className="text-lg md:text-lg text-justify text-muted-foreground leading-relaxed">
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