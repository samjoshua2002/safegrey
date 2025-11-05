import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Target, Shield, Eye, Lock, Sparkles, ArrowRight, Globe, Heart, Zap } from "lucide-react"
import GridMotion from "@/components/grid-motion"

export function AboutSection() {
  const teamStats = [
    { number: "50+", label: "Certified Experts" },
    { number: "100+", label: "Projects Completed" },
    { number: "24/7", label: "Security Operations" },
    { number: "99%", label: "Client Satisfaction" }
  ]

  const values = [
    {
      icon: Target,
      title: "Adversary-Focused",
      description: "We think like attackers to build better defenses"
    },
    {
      icon: Shield,
      title: "Collaborative",
      description: "Working hand-in-hand with your team for maximum impact"
    },
    {
      icon: Eye,
      title: "Transparent",
      description: "Clear insights and actionable recommendations"
    },
    {
      icon: Zap,
      title: "Proactive",
      description: "Staying ahead of emerging threats"
    }
  ]

  // Grid items for the motion effect
  const gridItems = [
    "Security", "ThreatOps", "Cyber", "Defense",
    "Protection", "Risk", "Analysis", "Monitoring",
    "Incident", "Response", "Forensics", "Compliance",
    "Network", "Cloud", "Endpoint", "Mobile",
    "IoT", "Zero Trust", "SOC", "SIEM",
    "EDR", "XDR", "MDR", "Vulnerability",
    "Penetration", "Red Team", "Blue Team", "Purple Team"
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section with GridMotion Background */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center">
        {/* GridMotion Background */}
        <div className="absolute inset-0 z-0">
          <GridMotion 
            items={gridItems}
            gradientColor="rgba(0, 0, 0, 0.8)"
          />
        </div>
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-primary/20 to-accent/10 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent z-10" />
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              About ThreatOps
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-background/30 rounded-2xl p-6">
            Building cyber resilience through expert-led security solutions and adversary-focused testing
          </p>
        </div>
      </section>

      {/* Rest of the About Page Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold text-accent">Company Introduction</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Expertise That <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Makes a Difference</span>
                </h2>
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  At <span className="font-semibold text-accent">ThreatOps</span>, our strength comes from a team of highly qualified professionals who are passionate about cybersecurity. Our consultants and engineers hold leading industry certifications.
                </p>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  This deep expertise ensures our clients receive not only world-class security solutions but also practical guidance that stands up to real-world threats.
                </p>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  We are committed to advancing the state of cybersecurity for organizations of all sizes—empowering you to build resilience and confidently secure your digital assets.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                {teamStats.map((stat, index) => (
                  <div key={index} className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-accent/30 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium mt-2">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-accent/20 via-primary/20 to-accent/20 border border-border overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center">
                  <Users className="w-48 h-48 text-foreground/10" strokeWidth={0.5} />
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Our Approach Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative order-last lg:order-first">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 border border-border overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center">
                  <Target className="w-48 h-48 text-foreground/10" strokeWidth={0.5} />
                </div>
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold text-accent">Our Approach</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Beyond <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Checklists</span>
                </h2>
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  At ThreatOps, we go beyond checklists and automated scans. Our team works hand-in-hand with your organization, applying an adversary-focused mindset and real-world attack simulations to uncover true vulnerabilities.
                </p>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  We believe every engagement should be collaborative, transparent, and tailored to your specific risks—empowering you with actionable insights and practical solutions that make a measurable difference.
                </p>
              </div>

              {/* Values Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((value, index) => {
                  const Icon = value.icon
                  return (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border hover:border-accent/30 transition-all duration-300 group">
                      <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden group hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                    <Heart className="w-5 h-5 text-accent" />
                    <span className="text-sm font-semibold text-accent">Our Mission</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                    Empower Through <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Visibility</span>
                  </h3>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Empower clients and communities to defend against cyber threats through enhanced visibility and proactive countermeasures.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {["Client Empowerment", "Community Defense", "Proactive Security", "Enhanced Visibility"].map((item, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-muted/50 border border-border text-sm font-medium"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden group hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">Our Vision</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                    A More <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Secure World</span>
                  </h3>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To build a more secure world by demystifying adversary tradecraft and making effective, actionable security approaches accessible to all.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {["Demystifying Threats", "Accessible Security", "Actionable Approaches", "Global Impact"].map((item, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-muted/50 border border-border text-sm font-medium"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-xl">
              Start Your Security Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-muted-foreground mt-4">
              Ready to strengthen your security posture? Let's talk.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}