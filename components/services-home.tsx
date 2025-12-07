"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Zap,
  Lock,
  Sparkles,
  Target,
  ShieldCheck,
  Cloud,
  FileCheck,
  Repeat,
  ChevronDown,
} from "lucide-react";

// -------------------------------------------------------------------
// SERVICES DATA
// -------------------------------------------------------------------
const services = [
  {
    key: "security-assessments",
    title: "Security Assessments",
    sections: [
      {
        subTitle: "Web Application Security Assessment",
        description:
          "We uncover vulnerabilities across your web applications by simulating real-world attacks, from logic flaws to advanced injection vectors, ensuring every critical function is secure before attackers find it.",
        icon: Shield,
      },
      {
        subTitle: "Mobile Application Security Assessment",
        description:
          "Our team tests your mobile applications from code to API calls, identifying insecure storage, communication leaks, and privilege misuse that could compromise user data or platform integrity.",
        icon: Zap,
      },
      {
        subTitle: "API Security Assessment",
        description:
          "We analyze and exploit API endpoints to detect authentication gaps, data exposure risks, and logic abuses, ensuring your integrations remain secure across modern cloud and microservice environments.",
        icon: Lock,
      },
      {
        subTitle: "Network Security Assessment",
        description:
          "Through internal and external testing, we map and exploit realistic network attack paths to expose misconfigurations, weak segmentation, and exploitable services that could lead to complete compromise.",
        icon: Sparkles,
      },
      {
        subTitle: "Active Directory Security Assessment",
        description:
          "We emulate adversaries within your domain to uncover privilege escalation paths, misconfigurations, and credential exposures, helping you strengthen your identity and access controls before they are abused.",
        icon: Target,
      },
    ],
  },
  {
    key: "managed-security",
    title: "Managed Security Services",
    sections: [
      {
        subTitle: "SIEM Monitoring & Threat Detection",
        description:
          "We provide continuous monitoring of your security events, correlating logs and detecting anomalies in real time to identify, contain, and respond to threats before they impact operations.",
        icon: Zap,
      },
      {
        subTitle: "Vulnerability Management",
        description:
          "Our team continuously scans, prioritizes, and tracks vulnerabilities across your assets, ensuring timely remediation through actionable insights and risk-based reporting.",
        icon: ShieldCheck,
      },
      {
        subTitle: "Purple Team",
        description:
          "We align offensive and defensive teams to validate and enhance your detection, response, and threat-hunting capabilities, ensuring your defenses evolve with real adversary tactics.",
        icon: Target,
      },
    ],
  },
  {
    key: "security-posture",
    title: "Security Posture Assessment",
    sections: [
      {
        subTitle: "Phishing Campaign",
        description:
          "We simulate targeted phishing attacks to measure user awareness, identify behavioral gaps, and help strengthen your organization's resilience against social engineering threats.",
        icon: Zap,
      },
      {
        subTitle: "Mystery Guest (Physical Security)",
        description:
          "Our specialists perform controlled on-site intrusion attempts to assess physical security controls, employee awareness, and procedural readiness against real-world breaches.",
        icon: Lock,
      },
      {
        subTitle: "Assumed Breach",
        description:
          "We begin from a compromised state to evaluate internal detection, response, and containment capabilities, revealing how effectively your teams react once an attacker is inside.",
        icon: Shield,
      },
      {
        subTitle: "Traditional Red Team",
        description:
          "Through multi-layered, goal-oriented operations, we emulate real adversaries to test your detection and defense capabilities across technical, human, and procedural layers.",
        icon: Target,
      },
    ],
  },
  {
    key: "cloud-security",
    title: "Cloud Security",
    sections: [
      {
        subTitle: "Container Security Assessment",
        description:
          "We evaluate your containerized environments for misconfigurations, insecure images, and runtime risks, ensuring strong isolation and resilience across your DevOps pipelines.",
        icon: Shield,
      },
      {
        subTitle: "Kubernetes Security Assessment",
        description:
          "Our experts assess cluster configurations, role-based access, and network policies to identify privilege risks and attack paths within your Kubernetes environment.",
        icon: Zap,
      },
      {
        subTitle: "Cloud Infrastructure Security Assessment",
        description:
          "We review your cloud architecture, identity controls, and deployed assets to uncover configuration weaknesses, excessive privileges, and exposure risks across AWS, Azure, and GCP.",
        icon: Cloud,
      },
    ],
  },
  {
    key: "risk-compliance",
    title: "Risk and Compliance Assessment",
    sections: [
      {
        subTitle: "ISO 27001 Consulting",
        description:
          "We guide your organization through the ISO 27001 implementation and certification process, aligning people, processes, and technology to build a sustainable information security framework.",
        icon: ShieldCheck,
      },
      {
        subTitle: "HIPAA Compliance",
        description:
          "Our experts help you identify gaps, implement safeguards, and validate compliance with HIPAA requirements to ensure the protection of sensitive healthcare data.",
        icon: Lock,
      },
      {
        subTitle: "GDPR Consulting",
        description:
          "We assist in evaluating data handling practices, consent management, and cross-border transfers to ensure compliance with GDPR while maintaining business efficiency.",
        icon: FileCheck,
      },
      {
        subTitle: "SOC 1 / SOC 2 Readiness",
        description:
          "We perform readiness assessments to identify control gaps, streamline documentation, and prepare your organization for successful SOC 1 and SOC 2 audits.",
        icon: Target,
      },
    ],
  },
  {
    key: "security-subscriptions",
    title: "Security Subscriptions",
    sections: [
      {
        subTitle: "Security Subscriptions",
        description:
          "A continuous engagement model that keeps your defenses evolving. Choose recurring pentesting, red teaming, or purple teaming plans that deliver scheduled assessments, prioritized remediation, and measurable posture improvement.",
        icon: Repeat,
      },
      {
        subTitle: "CryptX - Evasion Platform for Red Teams",
        description:
          "CryptX is an evasion-as-a-service platform that accelerates red-team operations by automating payload obfuscation, delivery hardening, and bypass techniques - letting teams spend less time on R&D and more time on validated engagements.",
        icon: Zap,
      },
    ],
  },
];

// -------------------------------------------------------------------
// COLORS - Made more transparent for better image visibility
// -------------------------------------------------------------------
const rowColors = [
  "rgba(46, 46, 46, 0.7)",
  "rgba(69, 6, 6, 0.7)",
  "rgba(58, 58, 58, 0.7)",
  "rgba(69, 6, 6, 0.75)",
  "rgba(26, 26, 26, 0.7)",
  "rgba(107, 123, 127, 0.7)",
];

const rowImages = [
  "/service.webp",
  "/a2.webp",
  "/a3.webp",
  "/img.png",
  "/image2.webp",
  "/a4.webp",
];

// Preload images
if (typeof window !== "undefined") {
  rowImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// -------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------
export default function ServicesAccordion() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    setHoverIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  const handleAccordionToggle = useCallback((key: string) => {
    setActiveKey(prev => prev === key ? null : key);
  }, []);

  return (
    <section className="relative w-full py-20 px-4 md:px-6 lg:px-12">

      {/* Dotted clusters */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 grid grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]"
            />
          ))}
        </div>
      </div>

      {/* ---------------- HEADING ---------------- */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-accent)]/5 border border-[var(--theme-accent)]/20 mb-4">
          <Sparkles className="w-4 h-4 text-[var(--theme-accent)]" />
          <span className="text-sm font-medium text-[var(--theme-accent)]">
            Our Services
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide">
          Explore Our Services
        </h2>

        <p className="text-white/60 max-w-2xl mx-auto mt-3 leading-relaxed">
          SafeGrey offers a full spectrum of cybersecurity services designed to
          protect, detect, and respond to real-world attacks.
        </p>
      </div>

      {/* ---------------- ACCORDION CONTAINER ---------------- */}
      <div className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl ">
        {/* Default dark background - NO OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

        {/* Content wrapper */}
        <div className="relative z-10">
          {services.map((service, index) => {
            const isOpen = activeKey === service.key;
            const isHovered = hoverIndex === index;
            const showImage = isOpen || isHovered;

            return (
              <div
                key={service.key}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className="border-b border-white/10 relative overflow-hidden"
                style={{
                  backgroundColor: rowColors[index],
                  zIndex: isOpen ? 20 : isHovered ? 10 : 1,
                }}
              >
                {/* INDIVIDUAL ACCORDION IMAGE - Only for this specific accordion */}
                {/* Simple CSS transition version - smoothest */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ease-in-out will-change-[opacity] ${showImage ? 'opacity-100' : 'opacity-0'
                      }`}
                    style={{
                      backgroundImage: `url(${rowImages[index]})`,
                      filter: "brightness(0.95)",
                    }}
                  />

                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ease-in-out will-change-[opacity] ${showImage ? 'opacity-50' : 'opacity-0'
                      }`}
                    style={{
                      background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* HEADER */}
                  <button
                    className="w-full flex items-center justify-between px-4 md:px-7 py-6 text-left hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleAccordionToggle(service.key)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Red indicator */}
                      <div className={`w-2 h-8 rounded-full transition-all duration-200 ${isOpen ? "bg-red-500 shadow-lg shadow-red-500/50" :
                          isHovered ? "bg-red-500/80" : "bg-red-500/50"
                        }`} />

                      <span className="md:text-2xl text-lg font-semibold text-white tracking-wide">
                        {service.title}
                      </span>
                    </div>

                    <div className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200">
                      <ChevronDown
                        className={`text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        size={24}
                      />
                    </div>
                  </button>

                  {/* CONTENT */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="px-4 md:px-7 pb-7 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                          {service.sections.map((section, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.04, duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                              className="p-5 bg-gradient-to-br from-white/15 to-white/5 border border-white/20 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-200 group"
                            >
                              <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center shadow group-hover:bg-red-500 group-hover:shadow-lg transition-all duration-200">
                                  <section.icon className="text-white w-6 h-6" />
                                </div>

                                <div className="flex-1">
                                  <h4 className="text-white text-xl font-semibold mb-2">
                                    {section.subTitle}
                                  </h4>

                                  <p className="text-white/90 text-lg leading-relaxed">
                                    {section.description}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}