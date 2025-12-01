"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Target,
  Cloud,
  Cog,
  FileCheck,
  Repeat,
  Users,
  FolderGit2,
} from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when dropdown is open
  useEffect(() => {
    if (activeDropdown || isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeDropdown, isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
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
        "Container Security Assessment",
        "Kubernetes Security Assessment",
        "Cloud Infrastructure Security Assessment",
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
      title: "Subscriptions",
      links: ["Security Subscriptions", "CryptX"],
    },
  ];

  const iconMap: Record<string, React.ElementType> = {
    "Security Assessment": ShieldCheck,
    "Security Posture Assessment": Target,
    "Cloud Security": Cloud,
    "Managed Security Services": Cog,
    "Risk Management": FileCheck,
    Subscriptions: Repeat,
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
            ? "bg-[var(--theme-dark-base)] shadow-lg border-b border-[var(--theme-border)]" 
            : "bg-[var(--theme-dark-base)] border-b border-[var(--theme-border)]"
        }`}
      >
        {/* Top line separator */}
        <div className={`h-px w-full bg-gradient-to-r from-transparent via-[var(--theme-accent)]/30 to-transparent transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Brand */}
              <Link href="/" className="flex items-center space-x-2 z-50">
                <span className="text-2xl font-bold text-[var(--theme-accent)]">SafeGrey</span>
              </Link>

              {/* Desktop Navigation Items */}
              <div className="hidden md:flex items-center space-x-4 text-[var(--theme-text-primary)] font-medium">
                {navItems.map((item) => (
                  <div key={item.key} className="relative">
                    <button
                      onClick={() => toggleDropdown(item.key)}
                      onMouseEnter={() => setActiveDropdown(item.key)}
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
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Dropdown - Fixed positioned below navbar */}
          {activeDropdown && (
            <div 
              ref={dropdownRef}
              className="fixed left-0 right-0 top-16 bg-[var(--theme-dark-base)] z-50 border-t border-[var(--theme-border)] shadow-xl"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column - Main Title */}
                  <div className="lg:col-span-3">
                    <div className="sticky top-8">
                    <h3 className="text-2xl font-bold text-[var(--theme-accent)] mb-4 flex items-center gap-2">
  {navItems.find(item => item.key === activeDropdown)?.title}
  <ArrowRight className="h-6 w-6 ml-2 text-[var(--theme-accent)]/80 animate-pulse" />
</h3>
                      <p className="text-[var(--theme-text-secondary)] mb-6">
                        {activeDropdown === "whatwedo" && "Comprehensive cybersecurity solutions tailored to your needs"}
                        {activeDropdown === "whoweare" && "Learn more about our team, partners, and mission"}
                        {activeDropdown === "resources" && "Tools and resources to enhance your security posture"}
                      </p>
                      
                      {/* Left side headings - Only for What We Do */}
                      {activeDropdown === "whatwedo" && (
                        <div className="space-y-2">
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
                                          <Link
                                            href="#"
                                            className="group flex items-center justify-between p-3 rounded-lg border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/30 transition-all duration-200 hover:bg-[var(--theme-dark-base)]/70"
                                          >
                                            <span className="text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-text-primary)] transition-colors">
                                              {link}
                                            </span>
                                            <ArrowRight className="h-3 w-3 text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-accent)] transform group-hover:translate-x-1 transition-all duration-200" />
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                );
                              })
                          ) : (
                            // Show all subheadings in columns
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                          <Link
                                            href="#"
                                            className="text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors block py-1 hover:pl-1 transition-all duration-150"
                                          >
                                            {link}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                );
                              })}
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
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-[var(--theme-dark-base)] overflow-y-auto border-t border-[var(--theme-border)]">
          <div className="p-4 space-y-2">
            <div className="flex justify-end mb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)]"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            {navItems.map((item) => (
              <div key={item.key} className="border-b border-[var(--theme-border)] last:border-0">
                <button
                  onClick={() => handleAccordion(item.key)}
                  className="w-full flex justify-between items-center px-4 py-3 text-[var(--theme-text-primary)] font-semibold cursor-pointer hover:bg-[var(--theme-accent)]/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.title}
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      activeAccordion === item.key ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeAccordion === item.key && (
                  <div className="px-8 py-4 space-y-3">
                    {item.key === "whatwedo" ? (
                      whatWeDoSections.map((section, i) => {
                        const Icon = iconMap[section.title] ?? ShieldCheck;
                        return (
                          <div key={i} className="mb-4">
                            <div className="flex items-center gap-2 text-[var(--theme-accent)] font-medium mb-2">
                              <Icon className="w-4 h-4" />
                              <span className="text-sm font-semibold">{section.title}</span>
                            </div>
                            <ul className="text-[var(--theme-text-secondary)] space-y-1 pl-3">
                              {section.links.map((link, j) => (
                                <li key={j}>
                                  <Link
                                    href="#"
                                    className="block py-1.5 text-sm hover:text-[var(--theme-accent)] transition-colors"
                                  >
                                    {link}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })
                    ) : (
                      item.links?.map((link, i) => (
                        <Link
                          key={i}
                          href={link.href}
                          target={link.external ? "_blank" : "_self"}
                          rel={link.external ? "noopener noreferrer" : ""}
                          className="block py-2 text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition-colors text-sm"
                        >
                          {link.name}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="px-4 pt-6">
              <Button
                className="w-full flex items-center justify-center gap-2 group relative overflow-hidden border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-all duration-300"
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
          </div>
        </div>
      )}
    </>
  );
}