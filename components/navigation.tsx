"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Target,
  Cloud,
  Cog,
  FileCheck,
  Users,
  FolderGit2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const sectionMap: Record<string, { section: string; tab?: string }> = {
  // Main Sections
  "Security Assessment": { section: "security-assessment" },
  "Security Posture Assessment": { section: "posture-assessment" },
  "Cloud Security": { section: "cloud-security" },
  "Managed Security Services": { section: "manage-security" },
  "Risk Management": { section: "risk-management" },
  "Security Enablement Services": { section: "security-enablement" },

  // Sub-links (Security Assessment)
  "Web Application Assessment": { section: "security-assessment", tab: "web-app" },
  "Mobile Application Assessment": { section: "security-assessment", tab: "mobile-app" },
  "API Security Assessment": { section: "security-assessment", tab: "api" },
  "Network Assessment": { section: "security-assessment", tab: "network" },
  "Active Directory Assessment": { section: "security-assessment", tab: "active-directory" },

  // Sub-links (Security Posture)
  "Phishing Campaign": { section: "posture-assessment", tab: "phishing-campaign" },
  "Mystery Guest (Physical security)": { section: "posture-assessment", tab: "mystery-guest" },
  "Assumed Breach": { section: "posture-assessment", tab: "assumed-breach" },
  "Traditional RedTeam": { section: "posture-assessment", tab: "red-team" },

  // Sub-links (Cloud Security)
  "Cloud Infrastructure Security Assessment": { section: "cloud-security", tab: "cloud-infrastructure" },
  "Container Security Assessment": { section: "cloud-security", tab: "container" },
  "Kubernetes Security Assessment": { section: "cloud-security", tab: "kubernetes" },

  // Sub-links (Managed Security)
  "SIEM Monitoring & Threat Detection": { section: "manage-security", tab: "siem" },
  "Vulnerability Management": { section: "manage-security", tab: "vulnerability" },
  "Purple Team": { section: "manage-security", tab: "purple-team" },

  // Sub-links (Risk Management)
  "ISO 27001 Consulting": { section: "risk-management", tab: "iso27001" },
  "HIPAA Compliance": { section: "risk-management", tab: "hipaa" },
  "GDPR Consulting": { section: "risk-management", tab: "gdpr" },
  "SOC 1 / SOC 2 Readiness": { section: "risk-management", tab: "soc" },

  // Sub-links (Security Enablement)
  "Security Subscriptions": { section: "security-enablement", tab: "subscriptions" },
  "Security Staffing": { section: "security-enablement", tab: "staffing" },
  "CryptX": { section: "security-enablement", tab: "cryptx" },
};

interface NavigationProps {
  onServiceSelect?: (id: string) => void;
}

export function Navigation({ onServiceSelect }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle click outside for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[data-nav-item]')
      ) {
        setActiveDropdown(null);
        setHoveredSection(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
      setHoveredSection(null);
    } else {
      setActiveDropdown(menu);
      setHoveredSection(null);
    }
  };

  const handleDropdownMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredSection(null);
    }, 200);
  };

  const handleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleServiceNavigation = (title: string) => {
    const mapping = sectionMap[title];
    if (!mapping) return;

    const { section, tab } = mapping;
    const url = tab ? `/services?section=${section}&tab=${tab}` : `/services?section=${section}`;
    router.push(url);
    setIsOpen(false);
    setActiveDropdown(null);
    setHoveredSection(null);
  };

  // Scroll effect for navbar
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatWeDoSections = [
    {
      title: "Security Assessment",
      links: [
        "Web Application Assessment",
        "Mobile Application Assessment",
        "API Security Assessment",
        "Network Assessment",
        "Active Directory Assessment",
      ],
    },
    {
      title: "Security Posture Assessment",
      links: [
        "Phishing Campaign",
        "Mystery Guest (Physical security)",
        "Assumed Breach",
        "Traditional RedTeam",
      ],
    },
    {
      title: "Cloud Security",
      links: [
        "Cloud Infrastructure Security Assessment",
        "Container Security Assessment",
        "Kubernetes Security Assessment",
      ],
    },
    {
      title: "Managed Security Services",
      links: [
        "SIEM Monitoring & Threat Detection",
        "Vulnerability Management",
        "Purple Team",
      ],
    },
    {
      title: "Risk Management",
      links: [
        "ISO 27001 Consulting",
        "HIPAA Compliance",
        "GDPR Consulting",
        "SOC 1 / SOC 2 Readiness",
      ],
    },
    {
      title: "Security Enablement Services",
      links: ["Security Subscriptions", "Security Staffing", "CryptX"],
    },
  ];

  const iconMap: Record<string, React.ElementType> = {
    "Security Assessment": ShieldCheck,
    "Security Posture Assessment": Target,
    "Cloud Security": Cloud,
    "Managed Security Services": Cog,
    "Risk Management": FileCheck,
    "Security Enablement Services": Users,
  };

  const navItems = [
    {
      title: "What We Do",
      key: "whatwedo",
      content: whatWeDoSections,
    },
    {
      title: "Who We Are",
      key: "whoweare",
      links: [
        { name: "About", href: "/about" },
        { name: "Partners", href: "/partners" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      key: "resources",
      links: [
        { name: "Tools", href: "/tools" },
        { name: "GitHub", href: "https://github.com/", external: true },
      ],
    },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--theme-dark-base)]/95 backdrop-blur-sm shadow-lg border-b border-[var(--theme-border)]"
            : "bg-[var(--theme-dark-base)] border-b border-[var(--theme-border)]"
        }`}
      >
        <div className={`h-px w-full bg-gradient-to-r from-transparent via-[var(--theme-accent)]/30 to-transparent transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}></div>

        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Brand */}
              <Link href="/" className="flex items-center space-x-2 z-50">
                <span className="text-2xl font-bold text-[var(--theme-accent)]">SafeGrey</span>
              </Link>

              {/* Desktop Navigation Items */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => handleDropdownMouseEnter(item.key)}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <button
                      data-nav-item
                      onClick={() => toggleDropdown(item.key)}
                      className={`flex items-center transition-colors gap-1 px-4 py-2 rounded-lg hover:bg-[var(--theme-accent)]/10 hover:text-[var(--theme-accent)] ${
                        activeDropdown === item.key
                          ? "text-[var(--theme-accent)] bg-[var(--theme-accent)]/10"
                          : "text-[var(--theme-text-primary)]"
                      }`}
                    >
                      {item.title}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.key ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:flex">
                <Button
                  className="flex items-center gap-2 group relative overflow-hidden border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all duration-300"
                  style={{
                    backgroundColor: "var(--theme-accent)",
                    color: "white",
                  }}
                >
                  <span className="relative z-10">Got hacked?</span>
                  <ArrowRight
                    className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10"
                >
                  <div className="w-6 h-5 flex flex-col justify-between items-center">
                    <span className={`w-full h-0.5 bg-current block origin-center rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`w-full h-0.5 bg-current block rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <span className={`w-full h-0.5 bg-current block origin-center rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Dropdown */}
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="fixed left-0 right-0 top-16 bg-[var(--theme-dark-base)] z-40 border-t border-[var(--theme-border)] shadow-xl"
                onMouseEnter={() => {
                  if (dropdownTimeoutRef.current) {
                    clearTimeout(dropdownTimeoutRef.current);
                  }
                }}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-3">
                      <div className="sticky top-8">
                        <h3 className="text-2xl font-bold text-[var(--theme-accent)] mb-4 flex items-center gap-2">
                          {navItems.find(item => item.key === activeDropdown)?.title}
                          <ArrowRight className="h-6 w-6 ml-2 text-[var(--theme-accent)]/80" />
                        </h3>
                        <p className="text-[var(--theme-text-secondary)] mb-6">
                          {activeDropdown === "whatwedo" && "Comprehensive cybersecurity solutions tailored to your needs"}
                          {activeDropdown === "whoweare" && "Learn more about our team, partners, and mission"}
                          {activeDropdown === "resources" && "Tools and resources to enhance your security posture"}
                        </p>

                        {/* Left side headings - Only for What We Do */}
                        {activeDropdown === "whatwedo" && (
                          <div className="space-y-2">
                            <div className="p-3 rounded-lg bg-[var(--theme-accent)]/5 border border-[var(--theme-accent)]/20 mb-4">
                              <h4 className="font-bold text-[var(--theme-accent)] text-md">Service Categories</h4>
                              <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
                                Select a category to explore services
                              </p>
                            </div>
                            
                            {whatWeDoSections.map((section, i) => {
                              const Icon = iconMap[section.title] ?? ShieldCheck;
                              return (
                                <button
                                  key={i}
                                  onMouseEnter={() => setHoveredSection(section.title)}
                                  onClick={() => setHoveredSection(section.title)}
                                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                                    hoveredSection === section.title
                                      ? "bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30"
                                      : "text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-dark-base)]/80 border border-transparent"
                                  }`}
                                >
                                  <Icon className="h-4 w-4 flex-shrink-0" />
                                  <span className="font-medium text-md">{section.title}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-9">
                      <div className="border border-[var(--theme-border)] rounded-xl p-6 bg-[var(--theme-dark-base)]/90">
                        {activeDropdown === "whatwedo" && (
                          <div className="h-full">
                            {/* Always show the main title */}
                            <div className="mb-6">
                              <h3 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-2">
                                What We Do
                              </h3>
                              <p className="text-[var(--theme-text-secondary)]">
                                Comprehensive cybersecurity solutions tailored to your needs
                              </p>
                            </div>

                            {hoveredSection ? (
                              // Show subheadings for hovered section
                              whatWeDoSections
                                .filter(section => section.title === hoveredSection)
                                .map((section, i) => {
                                  const Icon = iconMap[section.title] ?? ShieldCheck;
                                  return (
                                    <div key={i} className="animate-in fade-in duration-200">
                                      <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 rounded-lg bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20">
                                          <Icon className="h-5 w-5 text-[var(--theme-accent)]" />
                                        </div>
                                        <h4 className="text-xl font-bold text-[var(--theme-text-primary)]">{section.title}</h4>
                                      </div>
                                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {section.links.map((link, j) => (
                                          <li key={j}>
                                            <button
                                              onClick={() => handleServiceNavigation(link)}
                                              className="group flex items-center justify-between p-3 rounded-lg border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/30 transition-all duration-200 hover:bg-[var(--theme-dark-base)]/70 w-full text-left"
                                            >
                                              <span className="text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-text-primary)] transition-colors">
                                                {link}
                                              </span>
                                              <ArrowRight className="h-3 w-3 text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-accent)] transform group-hover:translate-x-1 transition-all duration-200" />
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  );
                                })
                            ) : (
                              // Show all subheadings in columns
                              <div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                  {whatWeDoSections.map((section, i) => {
                                    const Icon = iconMap[section.title] ?? ShieldCheck;
                                    return (
                                      <div
                                        key={i}
                                        onMouseEnter={() => setHoveredSection(section.title)}
                                        className="group cursor-pointer"
                                      >
                                        <div className="flex items-center gap-2 mb-3">
                                          <div className="p-1.5 rounded-md bg-[var(--theme-accent)]/10 group-hover:bg-[var(--theme-accent)]/20 transition-colors border border-[var(--theme-accent)]/20">
                                            <Icon className="h-4 w-4 text-[var(--theme-accent)]" />
                                          </div>
                                          <h4 className="font-semibold text-[var(--theme-text-primary)] text-sm group-hover:text-[var(--theme-accent)] transition-colors">
                                            {section.title}
                                          </h4>
                                        </div>
                                        <ul className="space-y-1.5">
                                          {section.links.slice(0, 4).map((link, j) => (
                                            <li key={j}>
                                              <button
                                                onClick={() => handleServiceNavigation(link)}
                                                className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors block py-1 hover:pl-1 transition-all duration-150 w-full text-left"
                                              >
                                                {link}
                                              </button>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    );
                                  })}
                                </div>
                                {/* Call to action or additional info */}
                                <div className="p-4 border border-[var(--theme-border)] rounded-lg bg-gradient-to-r from-[var(--theme-dark-base)] to-[var(--theme-dark-base)]/50">
                                  <p className="text-[var(--theme-text-secondary)] text-sm">
                                    <span className="text-[var(--theme-accent)] font-semibold">Hover over any section</span> to see detailed services or <span className="text-[var(--theme-accent)] font-semibold">click on a service</span> to learn more
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {activeDropdown === "whoweare" && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {navItems
                              .find(item => item.key === "whoweare")
                              ?.links?.map((link, i) => (
                                <Link
                                  key={i}
                                  href={link.href}
                                  className="group p-5 rounded-lg border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/30 transition-all duration-200 hover:bg-[var(--theme-dark-base)]/70"
                                >
                                  <h4 className="text-lg font-semibold text-[var(--theme-text-primary)] mb-2">{link.name}</h4>
                                  <p className="text-sm text-[var(--theme-text-secondary)] mb-3">
                                    {link.name === "About" && "Learn about our mission and values"}
                                    {link.name === "Partners" && "Our trusted security partners"}
                                    {link.name === "Contact" && "Get in touch with our team"}
                                  </p>
                                  <div className="flex items-center text-sm text-[var(--theme-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                                    Explore <ArrowRight className="ml-2 h-3 w-3" />
                                  </div>
                                </Link>
                              ))}
                          </div>
                        )}

                        {activeDropdown === "resources" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {navItems
                              .find(item => item.key === "resources")
                              ?.links?.map((link, i) => (
                                <a
                                  key={i}
                                  href={link.href}
                                  target={link.external ? "_blank" : "_self"}
                                  rel={link.external ? "noopener noreferrer" : ""}
                                  className="group p-5 rounded-lg border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/30 transition-all duration-200 hover:bg-[var(--theme-dark-base)]/70"
                                >
                                  <div className="flex items-center gap-3 mb-3">
                                    {link.name === "Tools" ? (
                                      <Cog className="h-5 w-5 text-[var(--theme-accent)]" />
                                    ) : (
                                      <FolderGit2 className="h-5 w-5 text-[var(--theme-accent)]" />
                                    )}
                                    <h4 className="text-lg font-semibold text-[var(--theme-text-primary)]">{link.name}</h4>
                                  </div>
                                  <p className="text-sm text-[var(--theme-text-secondary)] mb-3">
                                    {link.name === "Tools" && "Our security tools and utilities"}
                                    {link.name === "GitHub" && "Open-source security projects"}
                                  </p>
                                  <div className="flex items-center text-sm text-[var(--theme-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                                    {link.external ? "Visit external" : "Explore"}
                                    <ArrowRight className="ml-2 h-3 w-3" />
                                  </div>
                                </a>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-0 z-40 bg-[var(--theme-dark-base)] pt-20 overflow-y-auto"
          >
            <div className="p-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.key} className="border-b border-[var(--theme-border)]/50 last:border-0 pb-4 last:pb-0">
                  <button
                    onClick={() => handleAccordion(item.key)}
                    className="w-full flex justify-between items-center py-4 text-[var(--theme-text-primary)] font-medium text-lg cursor-pointer hover:text-[var(--theme-accent)] transition-colors"
                  >
                    <span className="tracking-wide">{item.title}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[var(--theme-text-secondary)] transition-transform duration-300 ${
                        activeAccordion === item.key ? "rotate-180 text-[var(--theme-accent)]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeAccordion === item.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pb-2 pl-4 space-y-3 border-l-2 border-[var(--theme-border)] ml-2">
                          {item.key === "whatwedo" ? (
                            <div className="space-y-4">
                              <div className="mb-4">
                                <h4 className="text-lg font-semibold text-[var(--theme-accent)] mb-2">What We Do</h4>
                                <p className="text-sm text-[var(--theme-text-secondary)]">
                                  Comprehensive cybersecurity solutions tailored to your needs
                                </p>
                              </div>
                              
                              {whatWeDoSections.map((section, i) => {
                                const Icon = iconMap[section.title] ?? ShieldCheck;
                                return (
                                  <div key={i} className="space-y-2">
                                    <button
                                      onClick={() => handleServiceNavigation(section.title)}
                                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--theme-accent)]/5 transition-all group text-left"
                                    >
                                      <div className="p-2 rounded-md bg-[var(--theme-accent)]/10 group-hover:bg-[var(--theme-accent)]/20 transition-colors">
                                        <Icon className="h-5 w-5 text-[var(--theme-accent)]" />
                                      </div>
                                      <span className="text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-text-primary)] font-medium transition-colors">
                                        {section.title}
                                      </span>
                                    </button>
                                    <div className="pl-11 space-y-2">
                                      {section.links.map((link, j) => (
                                        <button
                                          key={j}
                                          onClick={() => handleServiceNavigation(link)}
                                          className="w-full text-left text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] hover:pl-2 transition-all py-1"
                                        >
                                          • {link}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            item.links?.map((link, i) => (
                              <Link
                                key={i}
                                href={link.href}
                                target={link.external ? "_blank" : "_self"}
                                rel={link.external ? "noopener noreferrer" : ""}
                                onClick={() => setIsOpen(false)}
                                className="block py-3 px-3 text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/5 rounded-md transition-colors text-base"
                              >
                                {link.name}
                              </Link>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="pt-6">
                <Button
                  className="w-full h-14 text-lg font-medium flex items-center justify-center gap-2 group relative overflow-hidden border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all duration-300 rounded-xl"
                  style={{
                    backgroundColor: "var(--theme-accent)",
                    color: "white",
                  }}
                >
                  <span className="relative z-10">Got hacked?</span>
                  <ArrowRight
                    className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}