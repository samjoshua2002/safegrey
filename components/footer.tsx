import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const footerLinks = {
    "What We Do": [
      { name: "Security Assessment", href: "/services#security-assessment" },
      { name: "Cloud Security", href: "/services#cloud-security" },
      { name: "Managed Security", href: "/services#managed-security" },
      { name: "Risk Management", href: "/services#risk-management" },
    ],
    "Who We Are": [
      { name: "About", href: "/about" },
      { name: "Partners", href: "/partners" },
      { name: "Contact", href: "/contact" },
    ],
    "Resources": [
      { name: "Tools", href: "/tools" },
      { name: "GitHub", href: "https://github.com/" },
    ],
  }

  return (
    <footer className="bg-[var(--theme-dark-base)] border-t border-[var(--theme-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-[var(--theme-accent)]">SafeGrey</span>
            </Link>
            <p className="text-[var(--theme-text-secondary)] mb-6 max-w-md">
              Advanced cybersecurity solutions that protect your business before threats become breaches. Proactive.
              Reliable. Always vigilant.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-[var(--theme-text-secondary)]">
                <Mail className="w-4 h-4 mr-2 text-[var(--theme-accent)]" />
                contact@safegrey.com
              </div>
              <div className="flex items-center text-sm text-[var(--theme-text-secondary)]">
                <Phone className="w-4 h-4 mr-2 text-[var(--theme-accent)]" />
                +91 7540081007
              </div>
              <div className="flex items-center text-sm text-[var(--theme-text-secondary)]">
                <MapPin className="w-4 h-4 mr-2 text-[var(--theme-accent)]" />
                No. 50 & 51, TEJA RESIDENCY - 1, <br /> COCONUT GARDEN,
KODIGEHALLI MAIN ROAD, <br />AYYAPPA NAGAR,
K.R PURAM, <br /> BANGALORE - 560036
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-[var(--theme-text-primary)]">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--theme-border)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[var(--theme-text-secondary)]">© 2024 SafeGrey. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link 
              href="/privacy" 
              className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/security" 
              className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}