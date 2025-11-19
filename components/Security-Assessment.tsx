import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Shield, Smartphone, Cloud, Network, Server, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SecurityAssessment() {
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
      highlights: ["Detailed Logic & Flow Inspection", "High-Value, Low-Noise Findings", "Strong Focus on Real Attack Paths", "Clear Business Risk Breakdown", "Structured Fix Recommendations"],
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
        "Analysis of API communication, backend trust boundaries, and request integrity",
        "Evaluation of login flows, session handling, and access controls",
        "Assessment of permissions, device interaction risks, and misuse potential",
        "Mapping against OWASP mobile testing principles"
      ],
      highlights: [
        "In-Depth Mobile Behaviour Analysis",
        "Privacy & Sensitive Data Protection",
        "Abuse-Case Testing",
        "Focus on Real Impact",
        "Practical Remediation Paths"
      ], gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "api",
      title: "API Security",
      fullTitle: "API Security Assessment",
      icon: Network,
      description: "APIs often become the most targeted component of an organisation’s digital ecosystem due to direct data access and extensive integration points. This assessment inspects how APIs validate input, enforce permissions, communicate with backend services, and protect sensitive information. The focus is on uncovering weaknesses that enable data exposure, privilege escalation, or unauthorised operations. The results give teams a clear understanding of their API risk landscape and the steps required to strengthen control boundaries and system integrity.",
      features: [
        "Inspection of authentication, authorisation, and token handling",
        "Review of input validation, rate limiting, and error behaviour",
        "Analysis of data exposure, response structure, and trust boundaries",
        "Testing against common exploitation paths (injection, bypasses, abuse cases)",
        "Alignment with OWASP API Security standards"
      ],
      highlights: [
        "Deep Parameter & Endpoint Analysis",
        "Strong Access Control Validation",
        "Reliable Detection of High-Impact Flaws",
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
        "Effective Hardening Recommendations"
      ],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "active-directory",
      title: "Active Directory",
      fullTitle: "Active Directory  Assessment",
      icon: Shield,
      description: "Active Directory often becomes the central target for attackers due to its extensive control over identity and access. This assessment explores the pathways that enable privilege escalation, persistence, and domain compromise. By analysing group structures, policy configurations, authentication flows, and inherited permissions, it highlights the weaknesses that create opportunity for misuse. The insights help organisations strengthen identity governance and reduce the likelihood of widespread impact during an incident.",
      features: [
        "Assessment of domain trusts, group memberships, and privilege structure",
        "Review of GPO configurations, authentication settings, and security controls",
        "Identification of escalation paths, misconfigurations, and persistence vectors",
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
    <section className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Expert-Led Security Services
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Security Assessments
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground  mx-auto leading-relaxed">
            Modern organisations operate in environments where a single weakness can lead to significant business disruption. Security Assessments help expose blind spots across applications, networks, and identity systems before adversaries discover them. These evaluations focus on real-world attack behaviours, uncovering both technical flaws and misaligned security controls. The outcome is a clear view of the organisation's true risk posture and a practical direction for strengthening defences with confidence. SafeGrey brings a balanced approach that helps teams understand exposure, prioritise what matters, and build resilience without slowing operations.

          </p>
        </div>

        <Tabs defaultValue="web-app" className="w-full items-center">
          <TabsList className="grid grid-cols-3  md:grid-cols-5 gap-3 p-2 bg-card/50 backdrop-blur-sm rounded-2xl h-auto border border-border/50 shadow-xl mb-12">
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