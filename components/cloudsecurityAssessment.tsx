import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Shield, Cloud, Container, Server, ArrowRight, Sparkles, Cpu, Database } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CloudSecurityAssessment() {
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
  "Strong Visibility into Cloud Risks",
  "Architecture & Control Evaluation",
  "Clear, Prioritised Remediation Steps"
],

features: [
  "Assessment of IAM roles, policies, and trust relationships",
  "Review of storage permissions, encryption controls, and data access paths",
  "Evaluation of network configurations, security groups, and public-facing assets",
  "Inspection of logging, monitoring, and alerting coverage across cloud services",
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
  "Clear Attack Surface Mapping",
  "Privilege & Access Evaluation",
  "Actionable, Practical Improvements"
],

features: [
  "Review of container images, base layers, and dependency risks",
  "Evaluation of runtime controls, isolation boundaries, and privilege levels",
  "Assessment of secrets handling, environment variables, and storage practices",
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
  "Clear, Prioritised Recommendations"
],

features: [
  "Review of cluster configuration, control plane security, and namespace structure",
  "Analysis of RBAC roles, permissions, and identity bindings",
  "Evaluation of network policies, service exposure, and traffic flows",
  "Inspection of pod security, workload behaviour, and privilege settings",
  "Reporting with practical guidance aligned to Kubernetes hardening best practices"
],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },

  ]

  return (
    <section className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Cloud Security Excellence
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Cloud Security 
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground  mx-auto leading-relaxed">
           Cloud environments evolve quickly, and even small configuration gaps can create serious exposure. Cloud Security Assessments focus on understanding how identities, workloads, networks, and data are managed across your cloud platforms. The goal is to uncover weaknesses that arise from misconfigurations, overly permissive access, unmanaged resources, or insecure deployment practices. These reviews provide clarity on hidden risks, highlight improvement areas, and help organisations build stronger, more controlled cloud foundations without slowing operational agility.

          </p>
        </div>

        <Tabs defaultValue="cloud-infrastructure" className="w-full items-center">
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
                      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border">
                        <Icon className="w-5 h-5 text-accent" />
                        <span className="text-sm font-semibold text-accent">
                          {type.title}
                        </span>
                      </div>

                      <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                        {type.fullTitle}
                      </h3>

                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
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

                    {/* Grid Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">

                      {/* Left Side */}
                      <div className="space-y-8">
                        <div className="space-y-6">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-accent" />
                            <h4 className="text-xl font-bold">What's Included</h4>
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            {type.features.map((feature, index) => (
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
                          </div>
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="relative lg:order-last order-first">
                        <div className={`aspect-[4/3] rounded-3xl bg-gradient-to-br ${type.gradient} border border-border overflow-hidden shadow-2xl`}>
                          <div className="w-full h-full flex items-center justify-center">
                            <Icon className="w-48 h-48 text-foreground/10" strokeWidth={0.5} />
                          </div>
                        </div>

                        {/* Glow Orbs */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
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