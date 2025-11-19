import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Shield, Monitor, Zap, Users, ArrowRight, Sparkles, Eye, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ManagedSecurityServices() {
  const serviceTypes = [
  
    {
      id: "siem",
      title: "SIEM & Threat Detection",
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
    <section className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Proactive Security Operations
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Managed Security Services
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground  mx-auto leading-relaxed">
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
              <h4 className="text-xl font-bold">Service Features</h4>
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