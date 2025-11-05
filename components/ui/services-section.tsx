"use client";

import type React from "react";
import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Cog, Target, Cloud, FileCheck, Repeat } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    key: "security-assessments",
    title: "Security Assessments",
    sections: [
      {
        subTitle: "Web Application Security Assessment",
        description:
          "We uncover vulnerabilities across your web applications by simulating real-world attacks, from logic flaws to advanced injection vectors, ensuring every critical function is secure before attackers find it.",
      },
      {
        subTitle: "Mobile Application Security Assessment",
        description:
          "Our team tests your mobile applications from code to API calls, identifying insecure storage, communication leaks, and privilege misuse that could compromise user data or platform integrity.",
      },
      {
        subTitle: "API Security Assessment",
        description:
          "We analyze and exploit API endpoints to detect authentication gaps, data exposure risks, and logic abuses, ensuring your integrations remain secure across modern cloud and microservice environments.",
      },
      {
        subTitle: "Network Security Assessment",
        description:
          "Through internal and external testing, we map and exploit realistic network attack paths to expose misconfigurations, weak segmentation, and exploitable services that could lead to complete compromise.",
      },
      {
        subTitle: "Active Directory Security Assessment",
        description:
          "We emulate adversaries within your domain to uncover privilege escalation paths, misconfigurations, and credential exposures, helping you strengthen your identity and access controls before they are abused.",
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
      },
      {
        subTitle: "Vulnerability Management",
        description:
          "Our team continuously scans, prioritizes, and tracks vulnerabilities across your assets, ensuring timely remediation through actionable insights and risk-based reporting.",
      },
      {
        subTitle: "Purple Team",
        description:
          "We align offensive and defensive teams to validate and enhance your detection, response, and threat-hunting capabilities, ensuring your defenses evolve with real adversary tactics.",
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
      },
      {
        subTitle: "Mystery Guest (Physical Security)",
        description:
          "Our specialists perform controlled on-site intrusion attempts to assess physical security controls, employee awareness, and procedural readiness against real-world breaches.",
      },
      {
        subTitle: "Assumed Breach",
        description:
          "We begin from a compromised state to evaluate internal detection, response, and containment capabilities, revealing how effectively your teams react once an attacker is inside.",
      },
      {
        subTitle: "Traditional Red Team",
        description:
          "Through multi-layered, goal-oriented operations, we emulate real adversaries to test your detection and defense capabilities across technical, human, and procedural layers.",
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
      },
      {
        subTitle: "Kubernetes Security Assessment",
        description:
          "Our experts assess cluster configurations, role-based access, and network policies to identify privilege risks and attack paths within your Kubernetes environment.",
      },
      {
        subTitle: "Cloud Infrastructure Security Assessment",
        description:
          "We review your cloud architecture, identity controls, and deployed assets to uncover configuration weaknesses, excessive privileges, and exposure risks across AWS, Azure, and GCP.",
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
      },
      {
        subTitle: "HIPAA Compliance",
        description:
          "Our experts help you identify gaps, implement safeguards, and validate compliance with HIPAA requirements to ensure the protection of sensitive healthcare data.",
      },
      {
        subTitle: "GDPR Consulting",
        description:
          "We assist in evaluating data handling practices, consent management, and cross-border transfers to ensure compliance with GDPR while maintaining business efficiency.",
      },
      {
        subTitle: "SOC 1 / SOC 2 Readiness",
        description:
          "We perform readiness assessments to identify control gaps, streamline documentation, and prepare your organization for successful SOC 1 and SOC 2 audits.",
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
      },
      {
        subTitle: "CryptX - Evasion Platform for Red Teams",
        description:
          "CryptX is an evasion-as-a-service platform that accelerates red-team operations by automating payload obfuscation, delivery hardening, and bypass techniques - letting teams spend less time on R&D and more time on validated engagements.",
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

export function ServicesSection() {
  const [activeService, setActiveService] = useState(services[0].key);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const activeIndex = useMemo(() => Math.max(0, services.findIndex((s) => s.key === activeService)), [activeService]);

  const currentService = services.find((s) => s.key === activeService) || services[0]; // <-- use activeService only

  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const focusItem = (index: number) => {
    const el = itemRefs.current[index];
    if (el) el.focus();
  };

  const onKeyDownTabs = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" ? 1 : -1;
    const next = (activeIndex + dir + services.length) % services.length;
    setActiveService(services[next].key);
    requestAnimationFrame(() => focusItem(next));
  };

  const listVariants = {
    initial: { opacity: 0, x: 16 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.25, when: "beforeChildren", staggerChildren: 0.05 } },
    exit: { opacity: 0, x: -16, transition: { duration: 0.2 } },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-[var(--theme-dark-base)] text-[var(--theme-text-primary)]">
      {/* Left 5x5 Corner Dots */}
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-40">
        <div className="grid grid-cols-5 gap-8 p-10">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`w-[5px] h-[5px] ${i % 5 === 0 ? "bg-white" : "bg-[var(--theme-accent)]"} rounded-sm`}
            />
          ))}
        </div>
      </div>

      {/* Floating accent blobs */}
      <motion.div className="absolute top-10 left-20 w-48 h-48 rounded-full bg-[var(--theme-accent)]/10 blur-3xl animate-float" transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }} />
      <motion.div className="absolute bottom-10 right-20 w-56 h-56 rounded-full bg-[var(--theme-accent-dim)]/10 blur-3xl animate-float" transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }} />

      {/* Section Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8">Explore Our Services</h2>
        <p className="max-w-3xl mx-auto mb-16 text-xl md:text-2xl text-[var(--theme-text-secondary)] leading-relaxed">
          SafeGrey offers a full spectrum of cybersecurity services designed to protect, detect, and respond to real-world attacks
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left Nav */}
        <div className="flex flex-col items-start w-full lg:w-1/3 relative">
  <div className="absolute left-9 top-0 flex flex-col items-center h-60 z-0">
    <div className="absolute left-[1px] top-[-2rem] h-[calc(100%+7rem)] w-[2px] border-l border-dashed border-white" />
    <div className="absolute top-[-2rem] -left-16  h-[2px] w-16 border-t border-dashed border-white" />
    <div className="absolute top-[-6rem] -left-16 h-[4rem] w-[2px] border-l border-dashed border-white" />
  </div>

  <div
  role="tablist"
  aria-orientation="vertical"
  onKeyDown={onKeyDownTabs}
  className="w-full pt-1 pl-6 space-y-4" // 👈 handles consistent spacing
>
  {services.map((service, idx) => {
    const isActive = activeService === service.key;
    const isHover = hoveredService === service.key;
    const Icon = serviceIcons[service.key] ?? ShieldCheck;

    return (
      <button
        key={service.key}
        ref={(el) => { itemRefs.current[idx] = el; }}
        role="tab"
        aria-selected={isActive}
        aria-controls={`panel-${service.key}`}
        id={`tab-${service.key}`}
        onMouseEnter={() => setHoveredService(service.key)}
        onMouseLeave={() => setHoveredService(null)}
        onClick={() => setActiveService(service.key)}
        className="relative flex items-center gap-3 w-full cursor-pointer focus:outline-none py-2 z-10"
      >
        <span
          className={`inline-flex items-center justify-center size-6 md:size-7 rounded-md ring-1 transition-colors z-10
            bg-muted
            ${
              isActive || isHover
                ? "text-primary ring-primary"
                : "text-foreground/70 ring-border"
            }
          `}
        >
          <Icon className="size-3.5 md:size-4" aria-hidden="true" />
        </span>
        <span
          className={`text-left text-base md:text-lg font-semibold transition-colors duration-300 ${
            isActive || isHover ? "text-primary" : "text-foreground"
          }`}
        >
          {service.title}
        </span>
      </button>
    );
  })}
</div>

</div>


        {/* Right Content */}
        <div className="w-full lg:w-2/3">
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-foreground">{currentService.title}</h3>
            <div className="mt-2 h-1 w-16 bg-primary rounded" aria-hidden="true" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentService.key}
              variants={listVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="space-y-4"
              role="tabpanel"
              id={`panel-${currentService.key}`}
              aria-labelledby={`tab-${currentService.key}`}
            >
              {currentService.sections.map((section, idx) => (
                <motion.div
                  variants={cardVariants}
                  key={`${currentService.key}-${idx}`}
                  className="p-5 md:p-6 glass-effect border border-[var(--theme-border)] hover:glow-accent hover:scale-[1.03] transition-all duration-300 rounded-xl text-left"
                >
                  <h4 className="text-base md:text-lg font-semibold mb-1.5 text-primary">{section.subTitle}</h4>
                  <p className="text-sm md:text-base leading-relaxed text-foreground">{section.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
