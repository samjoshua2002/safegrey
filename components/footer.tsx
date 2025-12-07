"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import { useRouter } from "next/navigation";

// Reuse the same section mapping from navigation
const sectionMap: Record<string, { section: string; tab?: string }> = {
  // Main Sections
  "Security Assessment": { section: "security-assessment" },
  "Security Posture Assessment": { section: "posture-assessment" },
  "Cloud Security": { section: "cloud-security" },
  "Managed Security Services": { section: "manage-security" },
  "Risk Management": { section: "risk-management" },
  "Security Enablement Services": { section: "security-enablement" },
};

export function Footer() {
  const router = useRouter();

  // Handle service navigation - same function as in navigation
  const handleServiceNavigation = (title: string) => {
    const mapping = sectionMap[title];
    if (!mapping) return;

    const { section } = mapping;
    const url = `/services?section=${section}`;
    router.push(url);
  };

  // Main service categories for "What We Do"
  const serviceCategories = [
    "Security Assessment",
    "Security Posture Assessment", 
    "Cloud Security",
    "Managed Security Services",
    "Risk Management",
    "Security Enablement Services"
  ];

  // Footer links structure
  const footerLinks = {
    "What We Do": serviceCategories.map(category => ({
      name: category,
      onClick: () => handleServiceNavigation(category)
    })),
    "Who We Are": [
      { name: "About", href: "/about" },
      { name: "Partners", href: "/partners" },
      { name: "Contact", href: "/contact" },
    ],
    "Resources": [
      { name: "Tools", href: "/tools" },
      { name: "GitHub", href: "https://github.com/safegrey", external: true },
    ],
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/safegrey/",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      href: "https://x.com/safegrey_",
      icon: Twitter,
    },
    {
      name: "GitHub",
      href: "https://github.com/safegrey",
      icon: Github,
    },
  ];

  return (
    <footer className="bg-[var(--theme-dark-base)] border-t border-[var(--theme-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" className="h-10 w-auto" alt="safegrey" />
            </Link>
            <p className="text-[var(--theme-text-secondary)] mb-6 max-w-md">
              Advanced cybersecurity solutions that protect your business before threats become breaches. Proactive.
              Reliable. Always vigilant.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-[var(--theme-text-secondary)]">
                <Mail className="w-4 h-4 mr-2 text-[var(--theme-accent)]" />
                contact@safegrey.com
              </div>
              <div className="flex items-center text-sm text-[var(--theme-text-secondary)]">
                <Phone className="w-4 h-4 mr-2 text-[var(--theme-accent)]" />
                +91 7540081007
              </div>
              <div className="flex items-start text-sm text-[var(--theme-text-secondary)]">
                <MapPin className="w-4 h-4 mr-2 text-[var(--theme-accent)]" />
               BANGALORE - 560036
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-[var(--theme-text-primary)]">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => {
                  if (category === "What We Do" && 'onClick' in link) {
                    return (
                      <li key={link.name}>
                        <button
                          onClick={link.onClick}
                          className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors text-sm text-left hover:underline cursor-pointer"
                        >
                          {link.name}
                        </button>
                      </li>
                    );
                  } else if ('href' in link && 'external' in link && link.external) {
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors text-sm hover:underline"
                        >
                          {link.name}
                        </a>
                      </li>
                    );
                  } else if ('href' in link) {
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors text-sm hover:underline"
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--theme-border)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[var(--theme-text-secondary)]">© 2025 SafeGrey. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/security"
              className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors hover:underline"
            >
              Security
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors hover:underline"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}