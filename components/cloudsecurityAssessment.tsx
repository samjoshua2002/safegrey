import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Shield, Cloud, Container, Server, ArrowRight, Sparkles, Cpu, Database, Download, Mail, User } from "lucide-react"
import { toast } from "sonner"
import { Captcha } from "@/components/ui/captcha"

// Download Dialog Component for Cloud Security Assessment
interface SecurityDownloadDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: { name: string; email: string }
  onFormChange: (data: { name: string; email: string }) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  assessmentTitle: string
}

function SecurityDownloadDialog({ isOpen, onOpenChange, formData, onFormChange, onSubmit, isLoading, assessmentTitle }: SecurityDownloadDialogProps) {
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
              Download {assessmentTitle} Guide
            </DialogTitle>
          </div>
          <DialogDescription className="text-base text-muted-foreground leading-relaxed">
            Get your comprehensive {assessmentTitle.toLowerCase()} guide delivered directly to your inbox.
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

export function CloudSecurityAssessment() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [selectedAssessment, setSelectedAssessment] = useState("")
  const [activeTab, setActiveTab] = useState("cloud-infrastructure")

  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")

  useEffect(() => {
    if (tab && assessmentTypes.some(t => t.id === tab)) {
      setActiveTab(tab)
    }
  }, [tab])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const submitPromise = async () => {
      try {
        const response = await fetch('/api/cloud-security-assessment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, assessmentType: selectedAssessment }),
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
        return 'Email Sent Successfully! Check your inbox for the assessment guide'
      },
      error: (err) => {
        return err.message || 'An unexpected error occurred. Please try again.'
      },
    })
  }
  const assessmentTypes = [
    {
      id: "cloud-infrastructure",
      title: "Cloud Infrastructure",
      fullTitle: "Cloud Infrastructure Security Assessment",
      icon: Cloud,
      description: "Cloud environments often contain hidden risks created by identity misconfigurations, exposed services, and permissive policies. This assessment reviews how your cloud workloads, networks, and data are structured, identifying gaps that could allow unauthorised access or unintended exposure. It examines IAM, storage, networking, monitoring, and deployment controls to pinpoint weaknesses that matter most. The outcome is a clear understanding of your cloud risk footprint and the improvements needed to strengthen security without slowing operations.",
      highlights: [
        "Identity & Access Path Review",
        "Misconfiguration & Exposure Detection",
        // "Strong Visibility into Cloud Risks",
        "Architecture & Control Evaluation",
        "Clear, Prioritised Remediation Steps"
      ],

      features: [
        "Assessment of IAM roles, policies, and trust relationships",
        "Review of storage permissions, encryption controls, and data access paths",
        "Evaluation of network configurations, security groups & public-facing assets",
        "Inspection of logging, monitoring & alerting coverage across cloud services",
        "Reporting with structured guidance aligned to cloud security best practices"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "container",
      title: "Container Security",
      fullTitle: "Container Security Assessment",
      icon: Container,
      description: "Containers introduce speed and flexibility, but misconfigurations or insecure images can quickly expose an environment. This assessment reviews how containers are built, deployed, and managed, identifying weaknesses that allow privilege escalation, data access, or lateral movement. It examines image integrity, runtime behaviour, and orchestration practices to highlight areas that need tightening. The findings give teams a clear understanding of their container security gaps and the improvements required to operate safely at scale.",
      highlights: [
        "Image & Runtime Behaviour Analysis",
        "Misconfiguration & Hardening Review",
        // "Clear Attack Surface Mapping",
        "Privilege & Access Evaluation",
        "Actionable, Practical Improvements"
      ],

      features: [
        "Review of container images, base layers, and dependency risks",
        "Evaluation of runtime controls, isolation boundaries, and privilege levels",
        "Assessment of secrets handling, environment variables & storage practices",
        "Analysis of network exposure, communication paths, and service interaction",
        "Reporting with structured steps to strengthen container deployments"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "kubernetes",
      title: "Kubernetes Security",
      fullTitle: "Kubernetes Security Assessment",
      icon: Cpu,
      description: "Kubernetes environments can expand quickly, and small oversights in configuration or access control often create high-impact security gaps. This assessment examines how clusters are built, governed, and operated, covering workloads, RBAC policies, network controls, and core components. It highlights misconfigurations, privilege issues, and design decisions that could allow attackers to escalate, persist, or disrupt services. The end result is a precise understanding of cluster risks and a clear path to strengthening overall security and stability.",
      highlights: [
        "Comprehensive Cluster Review",
        "RBAC & Access Path Evaluation",
        "Strong Focus on Misconfigurations",
        "Detailed Component-Level Insights",
        // "Clear, Prioritised Recommendations"
      ],

      features: [
        "Review of cluster configuration, control plane  & namespace structure",
        "Analysis of RBAC roles, permissions, and identity bindings",
        "Evaluation of network policies, service exposure, and traffic flows",
        "Inspection of pod security, workload behaviour, and privilege settings",
        "Actionable reports following Kubernetes hardening guidelines"
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
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-relaxed">
            Cloud Security
          </h2>
          <p className="text-xl md:text-lg text-justify text-muted-foreground mx-auto leading-relaxed">
            Cloud environments evolve quickly, and even small configuration gaps can create serious exposure. Cloud Security Assessments focus on understanding how identities, workloads, networks, and data are managed across your cloud platforms. The goal is to uncover weaknesses that arise from misconfigurations, overly permissive access, unmanaged resources, or insecure deployment practices. These reviews provide clarity on hidden risks, highlight improvement areas, and help organisations build stronger, more controlled cloud foundations without slowing operational agility.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full items-center">
          <TabsList className="grid grid-cols-3 md:grid-cols-3 gap-3 p-2 bg-card/50 backdrop-blur-sm rounded-2xl h-auto border border-border/50 shadow-xl mb-12">
            {assessmentTypes.map((type) => {
              const Icon = type.icon
              return (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-background data-[state=active]:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 group"
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-data-[state=active]:text-accent transition-colors" />
                  <span className="text-xs
    md:text-sm
    font-medium
    text-center
    leading-tight
    break-words
    whitespace-normal
    max-w-full">{type.title}</span>
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
                      <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                        {type.fullTitle}
                      </h3>

                      <p className="text-lg md:text-lg text-justify text-muted-foreground leading-relaxed">
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
                          <div onClick={() => setSelectedAssessment(type.title)}>
                            <SecurityDownloadDialog
                              isOpen={isDialogOpen && selectedAssessment === type.title}
                              onOpenChange={(open) => {
                                setIsDialogOpen(open)
                                if (!open) setSelectedAssessment("")
                              }}
                              formData={formData}
                              onFormChange={setFormData}
                              onSubmit={handleSubmit}
                              isLoading={isLoading}
                              assessmentTitle={type.title}
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