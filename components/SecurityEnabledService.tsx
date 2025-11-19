import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Shield, Monitor, Zap, Users, ArrowRight, Sparkles, Eye, AlertTriangle, Briefcase, Cloud, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SecurityEnablementServices() {
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
        "Consistent Posture Improvement",
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
        "On-Demand Security Talent",
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
        "Continually updated evasion logic powered by platform intelligence",
        "Artefacts built without relying on static signatures",
        "API-first design for seamless pipeline integration",
        "Built to save time, reduce effort, and increase operational tempo"
      ],
      features: [
        "Cloud-based generator for EXE, DLL, and packaged output formats",
        "Options to apply trusted signing profiles or self-generated signatures",
        "Built-in countermeasures against debugging, sandboxing, and analysis tools",
        "Target-scoped execution controls to limit accidental exposure",
        "Evolutionary evasion techniques refined through ongoing research"
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
              Operational Security Support
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Security Enablement Services
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mx-auto leading-relaxed">
            Organisations often struggle to maintain the skills, resources, and continuous oversight needed to stay ahead of evolving threats. Security Enablement Services provide ongoing support, specialised expertise, and purpose-built tools that strengthen operational capability throughout the year. These services help teams address talent gaps, improve defensive maturity, and gain consistent access to actionable security insights. With flexible models and practical guidance, organisations can scale their security efforts without the burden of managing everything internally.
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
                            <h4 className="text-xl font-bold">
                              {service.id === "cryptx" ? "What's Included" : "What's Included"}
                            </h4>
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