import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Shield, User, Target, Bug, ArrowRight, Sparkles, Eye, Lock } from "lucide-react"


export function SecurityPostureAssessment() {
  const assessmentTypes = [
    {
      id: "phishing-campaign",
      title: "Phishing Campaign",
      fullTitle: "Phishing Campaign",
      icon: User,
      description: "Phishing remains one of the most effective entry points for attackers, exploiting human behaviour rather than technical flaws. This assessment measures how employees react to deceptive emails, links, and requests crafted to mirror real attack patterns. The campaign helps identify behavioural gaps, high-risk user groups, and weaknesses in internal awareness. The insights provide a clear direction for improving training, reducing exposure, and strengthening organisational readiness against social engineering threats.",
      features: [
  "Deployment of tailored phishing scenarios based on industry relevance",
  "Measurement of click-through, credential submission, and reporting behaviour",
  "Identification of high-risk users and recurring patterns",
  "Analysis of user responses, escalation choices, and awareness gaps",
  "Reporting with targeted training and mitigation recommendations"
],
      highlights: [
  "Behaviour-Focused Assessment",
  "Realistic and Customised Scenarios",
  "Clear User Risk Segmentation",
  "Insightful Trend & Response Analysis",
  "Actionable Awareness Improvements"
],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "mystery-guest",
      title: "Mystery Guest",
      fullTitle: "Mystery Guest (Physical Security)",
      icon: Eye,
      description: "Physical access often becomes the quickest path to sensitive systems when entry controls are weak or inconsistently enforced. The Mystery Guest assessment evaluates how easily an unauthorised individual can navigate your workplace, interact with staff, or access restricted areas without raising suspicion. This exercise highlights gaps in visitor management, badge enforcement, staff awareness, and on-ground security procedures. The results provide clarity on how well your organisation can detect and deter physical intrusion attempts.",
      features: [
       
  "Covert entry attempts aligned with approved scope and safety guidelines",
  "Evaluation of badge checks, reception workflows, and tailgating exposure",
  "Observation of staff reactions, escalation responses, and trust behaviours",
  "Review of physical access controls, signage, and monitoring coverage",
  "Reporting with actionable recommendations to strengthen on-site security"

        
      ],
     highlights: [
  "Realistic On-Site Intrusion Simulation",
  "Staff Awareness & Response Evaluation",
  "Identification of Access Control Weaknesses",
  "Clear Findings with Operational Impact",
  "Practical Physical Security Enhancements"
],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "assumed-breach",
      title: "Assumed Breach",
      fullTitle: "Assumed Breach ",
      icon: Bug,
      description: "Assumed Breach assessments begin with the premise that an attacker has already gained a foothold inside your environment. Instead of proving entry, the focus shifts to what an intruder can do next, how far they can move, what they can access, and how quickly they can escalate privileges. This approach reveals the true impact of a compromised user, system, or endpoint. The outcome gives security teams a realistic view of internal exposure and the concrete steps needed to limit movement, contain threats, and strengthen detection across the organisation.",
     features: [
  "Evaluation of internal access from a controlled initial foothold",
  "Identification of escalation paths, credential exposure, and reachable assets",
  "Analysis of segmentation gaps, trust relationships, and monitoring blind spots",
  "Testing of defensive controls, alerts, and containment capabilities",
  "Comprehensive reporting focused on reducing internal risk and impact"
],
      highlights: [
  "Realistic Post-Compromise Exploration",
  "Lateral Movement & Privilege Path Mapping",
  "Clear Visibility into Internal Exposure",
  "High-Value Detection & Response Insights",
  "Prioritised Hardening Guidance"
],
      gradient: "from-accent/20 via-primary/20 to-accent/20"
    },
    {
      id: "red-team",
      title: "Traditional Red Team",
      fullTitle: "Traditional Red Team ",
      icon: Target,
      description: "FA Traditional Red Team engagement emulates the tactics and objectives of a focused adversary targeting your organisation. Instead of checking individual components, it evaluates how well people, processes, and technology work together to prevent, detect, and respond to a coordinated attack. The assessment uncovers weaknesses across digital, physical, and human layers, highlighting how an attacker could achieve meaningful impact. The results provide leadership with a realistic view of organisational readiness and the improvements needed to strengthen overall defence capability.",
     highlights: [
  "Full-Scope Adversary Simulation",
  "Multi-Layer Attack Chain Exploration",
  "Realistic Objective-Based Scenarios",
  "Clear Strengths & Weakness Mapping",
  "Insightful Detection & Response Evaluation"
],

features: [
  "Planning and execution of tailored threat scenarios",
  "Testing across initial access, privilege abuse, persistence, and objective pursuit",
  "Evaluation of monitoring effectiveness and response workflows",
  "Identification of control gaps across infrastructure, identity, and user behaviour",
  "Comprehensive reporting with strategic and technical recommendations"
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
              Advanced Security Testing
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Security Posture Assessment
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground  mx-auto leading-relaxed">
         Understanding how your organisation responds to threats requires more than technical testing. It demands insight into behaviour, processes, and real-world preparedness. Security Posture Assessments reveal how well teams, controls, and systems hold up when faced with targeted attacks or deceptive scenarios. These assessments expose gaps in response workflows, monitoring effectiveness, and internal security awareness. The outcome is a clear picture of your organisation’s current readiness and practical steps to strengthen detection, decision-making, and overall security maturity.

          </p>
        </div>

        <Tabs defaultValue="phishing-campaign" className="w-full items-center">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2 bg-card/50 backdrop-blur-sm rounded-2xl h-auto border border-border/50 shadow-xl mb-12">
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