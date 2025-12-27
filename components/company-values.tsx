import { Shield, Eye, Zap, Users } from "lucide-react"

export function CompanyValues() {
  const values = [
    {
      icon: Shield,
      title: "Proactive Protection",
      description:
        "We believe in preventing threats before they become incidents. Our proactive approach keeps you ahead of cybercriminals.",
    },
    {
      icon: Eye,
      title: "Transparency",
      description:
        "Clear communication and honest reporting. You'll always know exactly what we're doing to protect your business.",
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description:
        "When seconds count, our expert team is ready. We pride ourselves on industry-leading response times.",
    },
    {
      icon: Users,
      title: "Partnership",
      description:
        "We're not just a vendor—we're your cybersecurity partner, invested in your long-term success and security.",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gradient">Core Values.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The principles that guide everything we do and shape how we protect your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div key={index} className="glass-effect p-8 rounded-lg hover:glow-accent transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-accent/10 flex-shrink-0">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
