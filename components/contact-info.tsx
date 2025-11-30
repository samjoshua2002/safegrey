import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, MessageCircle, Calendar } from "lucide-react"
import { Star } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl hover:border-[var(--theme-accent)]/50 transition-all duration-300">
      {/* Paper-style content */}
      <div className="space-y-6 text-[var(--foreground)]">
        <p className="text-base leading-relaxed text-[var(--muted-foreground)]">
          At <span className="font-semibold" style={{ color: "var(--primary)" }}>Safegrey</span>, we combine the power of Cyber Intelligence, Brand Monitoring, Attack Surface Monitoring, Infrastructure Monitoring and Supply chain to give visibility and context to our customers' Initial Attack Vectors.
        </p>

        <p className="text-base leading-relaxed text-[var(--muted-foreground)]">
          Our single unified dashboard allows customers to build custom dashboards, triage and visualize all digital threats in one place. In addition, we offer workflows and integrations to manage and remediate the identified threats. The Safegrey Platform helps you by identifying and reporting below listed business-critical threats from Day 1:
        </p>

        {/* Threats List */}
        <div className="space-y-4 pl-4 border-l-2" style={{ borderColor: "var(--primary)" }}>
          <div>
            <h4 className="font-semibold mb-2 text-[var(--foreground)]">Credential Leaks</h4>
            <p className="text-sm text-[var(--muted-foreground)]">
              Related to your organisation, linked to the Domain Address.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-[var(--foreground)]">Brand Threats</h4>
            <p className="text-sm text-[var(--muted-foreground)]">
              Phishing/Impersonating domains, Fake Social Media Brand Profiles, Rogue Mobile apps, and Fake Customer care scams.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-[var(--foreground)]">Public Infrastructure/Public Attack Surface Threats</h4>
            <p className="text-sm text-[var(--muted-foreground)]">
              Vulnerabilities and Misconfigurations on the Internet-facing assets, feeble SSL certificates and open ports.
            </p>
          </div>
        </div>

        {/* Customer First Section */}
        <div className="pt-6 mt-6 border-t border-[var(--theme-border)]">
          <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">We are a Customer First Vendor</h3>

          <div className="flex items-center gap-3 p-4 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-dark-base)]/50">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-current"
                  style={{ color: i < 4 ? "var(--primary)" : "var(--muted-foreground)" }}
                />
              ))}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[var(--foreground)]">4.8 stars in Gartner Peer Insights</p>
              <p className="text-xs text-[var(--muted-foreground)]">for Safegrey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
