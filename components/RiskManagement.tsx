import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Shield, Monitor, Zap, Users, ArrowRight, Sparkles, Eye, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RiskManagementServices() {
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
        "Recommendations for policies, controls, and documentation improvements",
        "Support for remediation planning and compliance readiness"
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
        "Evaluation of consent handling, subject rights workflows, and security controls",
        "Recommendations for policy updates, documentation, and governance processes",
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
    <section className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Governance & Compliance
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Risk Management
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mx-auto leading-relaxed">
            Strong governance and compliance are essential for maintaining trust, meeting regulatory obligations, and ensuring long-term operational stability. Risk Management services help organisations understand where their controls stand, how well policies align with industry requirements, and which areas need improvement. These assessments evaluate people, processes, and technical safeguards to confirm whether the organisation is prepared to meet standards such as ISO, SOC, HIPAA, and GDPR. The insights support clearer decision-making, reduced compliance exposure, and a more structured approach to managing risk across the business.
          </p>
        </div>

        <Tabs defaultValue={serviceTypes[0].id} className="w-full items-center">
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
                      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border">
                        <Icon className="w-5 h-5 text-accent" />
                        <span className="text-sm font-semibold text-accent">{service.title}</span>
                      </div>

                      <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                        {service.fullTitle}
                      </h3>

                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
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

                    {/* Features & Illustration Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">

                      {/* Left Side: Features */}
                      <div className="space-y-8">
                        <div className="space-y-6">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-accent" />
                            <h4 className="text-xl font-bold">What's Included</h4>
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            {service.features.map((feature, index) => (
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

                      {/* Right Side: Illustration */}
                      <div className="relative lg:order-last order-first">
                        <div className={`aspect-[4/3] rounded-3xl bg-gradient-to-br ${service.gradient} border border-border overflow-hidden shadow-2xl`}>
                          <div className="w-full h-full flex items-center justify-center">
                            <Icon className="w-48 h-48 text-foreground/10" strokeWidth={0.5} />
                          </div>
                        </div>

                        {/* Decorative Orbs */}
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