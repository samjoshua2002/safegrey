"use client";

import type React from "react";
import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Cog, Target, Cloud, FileCheck, Repeat, ChevronDown, Sparkles, Zap, Shield, Lock } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    key: "security-assessments",
    title: "Security Assessments",
    sections: [
      {
        subTitle: "Web Application Security Assessment",
        description: "We uncover vulnerabilities across your web applications by simulating real-world attacks, from logic flaws to advanced injection vectors, ensuring every critical function is secure before attackers find it.",
        icon: Shield,
        features: ["OWASP Top 10 Coverage", "Business Logic Testing", "API Endpoint Security"]
      },
      {
        subTitle: "Mobile Application Security Assessment",
        description: "Our team tests your mobile applications from code to API calls, identifying insecure storage, communication leaks, and privilege misuse that could compromise user data or platform integrity.",
        icon: Zap,
        features: ["iOS & Android Testing", "Reverse Engineering", "Secure Communication"]
      },
      {
        subTitle: "API Security Assessment",
        description: "We analyze and exploit API endpoints to detect authentication gaps, data exposure risks, and logic abuses, ensuring your integrations remain secure across modern cloud and microservice environments.",
        icon: Lock,
        features: ["REST & GraphQL Testing", "Authentication Bypass", "Rate Limit Testing"]
      },
      {
        subTitle: "Network Security Assessment",
        description: "Through internal and external testing, we map and exploit realistic network attack paths to expose misconfigurations, weak segmentation, and exploitable services that could lead to complete compromise.",
        icon: Sparkles,
        features: ["Port & Service Discovery", "Vulnerability Scanning", "Firewall Testing"]
      },
      {
        subTitle: "Active Directory Security Assessment",
        description: "We emulate adversaries within your domain to uncover privilege escalation paths, misconfigurations, and credential exposures, helping you strengthen your identity and access controls before they are abused.",
        icon: Target,
        features: ["Kerberoasting", "Golden Ticket Attacks", "Group Policy Analysis"]
      },
    ],
  },
  {
    key: "managed-security",
    title: "Managed Security Services",
    sections: [
      {
        subTitle: "SIEM Monitoring & Threat Detection",
        description: "We provide continuous monitoring of your security events, correlating logs and detecting anomalies in real time to identify, contain, and respond to threats before they impact operations.",
        icon: Zap,
        features: ["24/7 Monitoring", "Custom Detection Rules", "Incident Response"]
      },
      {
        subTitle: "Vulnerability Management",
        description: "Our team continuously scans, prioritizes, and tracks vulnerabilities across your assets, ensuring timely remediation through actionable insights and risk-based reporting.",
        icon: ShieldCheck,
        features: ["Automated Scanning", "Risk Prioritization", "Remediation Tracking"]
      },
      {
        subTitle: "Purple Team",
        description: "We align offensive and defensive teams to validate and enhance your detection, response, and threat-hunting capabilities, ensuring your defenses evolve with real adversary tactics.",
        icon: Target,
        features: ["Collaborative Exercises", "Detection Validation", "Capability Improvement"]
      },
    ],
  },
  {
    key: "security-posture",
    title: "Security Posture Assessment",
    sections: [
      {
        subTitle: "Phishing Campaign",
        description: "We simulate targeted phishing attacks to measure user awareness, identify behavioral gaps, and help strengthen your organization's resilience against social engineering threats.",
        icon: Zap,
        features: ["Custom Templates", "User Training", "Click-rate Analytics"]
      },
      {
        subTitle: "Mystery Guest (Physical Security)",
        description: "Our specialists perform controlled on-site intrusion attempts to assess physical security controls, employee awareness, and procedural readiness against real-world breaches.",
        icon: Lock,
        features: ["Social Engineering", "Access Control Testing", "Tailgating Assessment"]
      },
      {
        subTitle: "Assumed Breach",
        description: "We begin from a compromised state to evaluate internal detection, response, and containment capabilities, revealing how effectively your teams react once an attacker is inside.",
        icon: Shield,
        features: ["Lateral Movement", "Privilege Escalation", "Data Exfiltration Testing"]
      },
      {
        subTitle: "Traditional Red Team",
        description: "Through multi-layered, goal-oriented operations, we emulate real adversaries to test your detection and defense capabilities across technical, human, and procedural layers.",
        icon: Target,
        features: ["Multi-vector Attacks", "Covert Operations", "Full-scope Assessment"]
      },
    ],
  },
  {
    key: "cloud-security",
    title: "Cloud Security",
    sections: [
      {
        subTitle: "Container Security Assessment",
        description: "We evaluate your containerized environments for misconfigurations, insecure images, and runtime risks, ensuring strong isolation and resilience across your DevOps pipelines.",
        icon: Shield,
        features: ["Image Vulnerability Scan", "Runtime Security", "Orchestration Security"]
      },
      {
        subTitle: "Kubernetes Security Assessment",
        description: "Our experts assess cluster configurations, role-based access, and network policies to identify privilege risks and attack paths within your Kubernetes environment.",
        icon: Zap,
        features: ["RBAC Assessment", "Network Policy Review", "Cluster Hardening"]
      },
      {
        subTitle: "Cloud Infrastructure Security Assessment",
        description: "We review your cloud architecture, identity controls, and deployed assets to uncover configuration weaknesses, excessive privileges, and exposure risks across AWS, Azure, and GCP.",
        icon: Cloud,
        features: ["CIS Benchmarking", "IAM Role Analysis", "Storage Security"]
      },
    ],
  },
  {
    key: "risk-compliance",
    title: "Risk and Compliance Assessment",
    sections: [
      {
        subTitle: "ISO 27001 Consulting",
        description: "We guide your organization through the ISO 27001 implementation and certification process, aligning people, processes, and technology to build a sustainable information security framework.",
        icon: ShieldCheck,
        features: ["Gap Analysis", "Documentation", "Certification Support"]
      },
      {
        subTitle: "HIPAA Compliance",
        description: "Our experts help you identify gaps, implement safeguards, and validate compliance with HIPAA requirements to ensure the protection of sensitive healthcare data.",
        icon: Lock,
        features: ["Risk Assessment", "Policy Development", "Technical Safeguards"]
      },
      {
        subTitle: "GDPR Consulting",
        description: "We assist in evaluating data handling practices, consent management, and cross-border transfers to ensure compliance with GDPR while maintaining business efficiency.",
        icon: FileCheck,
        features: ["Data Mapping", "DPIA Conducting", "Compliance Monitoring"]
      },
      {
        subTitle: "SOC 1 / SOC 2 Readiness",
        description: "We perform readiness assessments to identify control gaps, streamline documentation, and prepare your organization for successful SOC 1 and SOC 2 audits.",
        icon: Target,
        features: ["Control Testing", "Evidence Collection", "Auditor Liaison"]
      },
    ],
  },
  {
    key: "security-subscriptions",
    title: "Security Subscriptions",
    sections: [
      {
        subTitle: "Security Subscriptions",
        description: "A continuous engagement model that keeps your defenses evolving. Choose recurring pentesting, red teaming, or purple teaming plans that deliver scheduled assessments, prioritized remediation, and measurable posture improvement.",
        icon: Repeat,
        features: ["Continuous Testing", "Priority Support", "Progress Tracking"]
      },
      {
        subTitle: "CryptX - Evasion Platform for Red Teams",
        description: "CryptX is an evasion-as-a-service platform that accelerates red-team operations by automating payload obfuscation, delivery hardening, and bypass techniques - letting teams spend less time on R&D and more time on validated engagements.",
        icon: Zap,
        features: ["Payload Generation", "AV Evasion", "Custom Loaders"]
      },
    ],
  },
];

const serviceIcons: Record<string, LucideIcon> = {
  "security-assessments": ShieldCheck,
  "managed-security": Cog,
  "security-posture": Target,
  "cloud-security": Cloud,
  "risk-compliance": FileCheck,
  "security-subscriptions": Repeat,
};

// Feature badge component
const FeatureBadge = ({ text }: { text: string }) => (
  <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--theme-dark-base)] rounded-full border border-[var(--theme-border)] text-[var(--theme-text-primary)] mr-2 mb-2">
    {text}
  </span>
);

// Custom Accordion Item Component
function AccordionItem({ 
  service, 
  isOpen, 
  onToggle 
}: { 
  service: typeof services[0]; 
  isOpen: boolean; 
  onToggle: () => void; 
}) {
  const Icon = serviceIcons[service.key] ?? ShieldCheck;

  return (
    <div className="mb-3 border-none bg-transparent rounded-xl">
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center justify-between p-5 text-left
          transition-all duration-300
          border rounded-xl
          group
          ${isOpen 
            ? 'bg-[var(--theme-accent)]/10 border-[var(--theme-accent)]' 
            : 'glass-effect border-[var(--theme-border)] hover:border-[var(--theme-accent)]/50'
          }
        `}
      >
        <div className="flex items-center gap-4">
          <div 
            className={`
              flex items-center justify-center w-10 h-10 rounded-lg
              transition-colors duration-300
              ${isOpen 
                ? 'bg-[var(--theme-accent)] text-white' 
                : 'bg-[var(--theme-dark-base)] text-[var(--theme-accent)] border border-[var(--theme-border)]'
              }
            `}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span 
            className={`
              text-lg font-semibold transition-colors duration-300
              ${isOpen ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text-primary)]'}
            `}
          >
            {service.title}
          </span>
        </div>
        
        <div 
          className={`
            transition-transform duration-300
            ${isOpen ? 'rotate-180' : ''}
          `}
        >
          <ChevronDown className="w-5 h-5 text-[var(--theme-text-secondary)]" />
        </div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {service.sections.map((section, idx) => {
                const SectionIcon = section.icon || Shield;
                return (
                  <div
                    key={`${service.key}-${idx}`}
                    className="p-4 glass-effect border border-[var(--theme-border)] rounded-xl transition-colors duration-300 hover:border-[var(--theme-accent)]/30"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--theme-accent)] flex items-center justify-center">
                        <SectionIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold mb-2 text-[var(--theme-text-primary)]">
                          {section.subTitle}
                        </h4>
                        <p className="text-[var(--theme-text-secondary)] leading-relaxed text-sm">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    {/* Features badges */}
                    {section.features && (
                      <div className="flex flex-wrap">
                        {section.features.map((feature, featureIdx) => (
                          <FeatureBadge 
                            key={featureIdx} 
                            text={feature} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ServicesAccordion() {
  const [activeService, setActiveService] = useState<string | null>("security-assessments");

  const toggleAccordion = (serviceKey: string) => {
    setActiveService(activeService === serviceKey ? null : serviceKey);
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[var(--theme-dark-base)] text-[var(--theme-text-primary)] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 grid grid-cols-4 gap-24 transform -rotate-6 scale-150">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[var(--theme-accent)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Dotted clusters */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 grid grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
          ))}
        </div>
        
        <div className="absolute bottom-20 right-10 grid grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
          ))}
        </div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-accent)]/5 border border-[var(--theme-accent)]/20 mb-4">
          <Sparkles className="w-4 h-4 text-[var(--theme-accent)]" />
          <span className="text-sm font-medium text-[var(--theme-accent)]">Our Services</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--theme-text-primary)] mb-4">
          Explore Our Services
        </h2>
        <p className="max-w-3xl mx-auto text-base md:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
          SafeGrey offers a full spectrum of cybersecurity services designed to protect, detect, and respond to real-world attacks
        </p>
      </div>

      {/* Accordion Section */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {activeService && (
          <div className="mb-6 text-center">
            <h3 className="text-xl md:text-3xl font-bold text-[var(--theme-text-primary)] mb-3">
              {services.find(s => s.key === activeService)?.title}
            </h3>
            <div className="w-24 h-1 bg-[var(--theme-accent)] rounded mx-auto" />
          </div>
        )}

        {/* Accordion items */}
        <div className="w-full space-y-2">
          {services.map((service) => (
            <div key={service.key}>
              <AccordionItem
                service={service}
                isOpen={activeService === service.key}
                onToggle={() => toggleAccordion(service.key)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}