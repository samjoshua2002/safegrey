"use client";
import { useState, useEffect, useRef } from 'react';
import { Users, Target, Shield, Eye, Sparkles, ArrowRight, Globe, Heart, Zap, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { gsap } from 'gsap';
import FlowingMenu from './FlowingMenu';
import GridMotion from './GridMotion';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InteractiveTypography from './InteractiveTypography';
import { motion } from 'framer-motion';
import RotatingText from './ui/rotating-text';

export function AboutSection() {
  const teamStats = [
    { number: "50+", label: "Certified Experts" },
    { number: "100+", label: "Projects Completed" },
    { number: "24/7", label: "Security Operations" },
    { number: "99%", label: "Client Satisfaction" }
  ];

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
  ];

  const gridItems = [
    "Security", "ThreatOps", "Cyber", "Defense",
    "Protection", "Risk", "Analysis", "Monitoring",
    "Incident", "Response", "Forensics", "Compliance"
  ];

  const flowingItems = [
    "Penetration Testing",
    "Red Team Operations",
    "Security Audits",
    "Threat Intelligence",
    "Incident Response",
    "Vulnerability Assessment",
    "Security Architecture",
    "Compliance & Risk"
  ];



  return (
    <div className="min-h-screen bg-[var(--theme-dark-base)] text-[var(--foreground)] overflow-hidden">

      {/* 40vh Premium Banner */}
      <section className="relative h-[45vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden border-[var(--theme-border)]/50 border-b">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
          <GridMotion items={gridItems} />
        </div>

        {/* Deep shadows and gradients for background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-dark-base)]/50 to-[var(--theme-dark-base)] z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--theme-accent)]/15 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 mt-24 sm:px-6 lg:px-8 w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/30 mb-6 shadow-[0_0_20px_rgba(235,54,54,0.15)]">
            <Sparkles className="w-4 h-4 text-[var(--theme-accent)] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent)]">
              Securing Your Future
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-6 flex flex-col items-center justify-center gap-4 md:flex-row">
            <span>Advanced</span>
            <div className="flex border border-[var(--theme-accent)]/40 p-1 rounded-sm shadow-[0_0_30px_rgba(235,54,54,0.2)] bg-[#111114]">
              <RotatingText
                texts={['ThreatOps.', 'Defenses.', 'Red Teams.', 'Zero Trust.']}
                mainClassName="px-4 py-1 bg-[var(--theme-accent)] text-white overflow-hidden shadow-inner"
                staggerDuration={0.03}
                splitBy="characters"
                rotationInterval={3500}
              />
            </div>
          </h1>
         

          <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto font-medium leading-relaxed border-t border-[var(--theme-border)] pt-8 inline-block select-none">
            We are a collective of specialized operators dismantling generic defense strategies through adversary emulation and battle-tested methodologies.
          </p>
        </div>
      </section>

      <FlowingMenu items={flowingItems} />

      <section className="relative py-32 px-8 lg:px-16 overflow-hidden">
        {/* Dotted Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 grid grid-cols-4 gap-24 transform -rotate-6 scale-150">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[var(--theme-accent)]" />
              </div>
            ))}
          </div>
        </div>

        {/* Floating accent blobs */}
        <motion.div
          className="absolute top-10 left-20 w-48 h-48 rounded-full bg-[var(--theme-accent)]/10 blur-3xl animate-float"
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-56 h-56 rounded-full bg-[var(--theme-accent-dim)]/10 blur-3xl animate-float"
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
            <div className="space-y-8 sticky top-8">
              {/* Expertise Badge */}


              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 mb-6">
                <Users className="w-4 h-4 text-[var(--theme-accent)]" />
                <span className="text-sm font-semibold text-[var(--theme-accent)]">
                  Expertise
                </span>
              </div>

              <InteractiveTypography
                text="Expertise That Makes a Difference"
                className="text-5xl lg:text-7xl font-bold text-[var(--foreground)]"

              />

              <div
                className="w-20 h-1 rounded-full"
                style={{
                  backgroundColor: "var(--primary)",
                }}
              />
            </div>

            <div className="space-y-8">
              <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
                At <span style={{ color: "var(--primary)" }} className="font-semibold">Safegrey</span>, our strength comes from a team of highly qualified professionals who are passionate about cybersecurity. Our consultants and engineers hold leading industry certifications.
              </p>

              <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
                This deep expertise ensures our clients receive not only world-class security solutions but also practical guidance that stands up to real-world threats.
              </p>

              <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
                We are committed to advancing the state of cybersecurity for organizations of all sizes—empowering you to build resilience and confidently secure your digital assets.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8">
                {teamStats.map((stat, index) => (
                  <div key={index} className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 p-8 hover:border-[var(--theme-accent)]/50 transition-all duration-300 group shadow-lg rounded-xl backdrop-blur-sm">
                    <div
                      className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform"
                      style={{
                        color: "var(--primary)",
                      }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)] uppercase tracking-wider font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent mb-32"
            style={{
              background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
            <div className="space-y-8 order-last lg:order-first">
              <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
                At Safegrey, we go beyond checklists and automated scans. Our team works hand-in-hand with your organization, applying an adversary-focused mindset and real-world attack simulations to uncover true vulnerabilities.
              </p>

              <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
                We believe every engagement should be collaborative, transparent, and tailored to your specific risks—empowering you with actionable insights and practical solutions that make a measurable difference.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 p-6 hover:border-[var(--theme-accent)]/50 transition-all duration-300 group shadow-lg rounded-xl backdrop-blur-sm">
                      <Icon
                        className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform"
                        style={{
                          color: "var(--primary)",
                        }}
                      />
                      <h4 className="font-semibold text-lg mb-2 text-[var(--foreground)]">{value.title}</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-8 sticky top-8">
              {/* Approach Badge */}
              <div
                className="inline-flex items-center gap-3 px-4 py-2 border rounded-lg shadow-lg"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--foreground)",
                }}
              >
                <Zap className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Our Approach</span>
              </div>

              <InteractiveTypography
                text="Beyond Checklists"
                className="text-5xl lg:text-7xl font-bold text-[var(--foreground)]"

              />

              <div
                className="w-20 h-1 rounded-full"
                style={{
                  backgroundColor: "var(--primary)",
                }}
              />

              <div className="aspect-[4/3] relative overflow-hidden border border-[var(--theme-border)] rounded-xl shadow-2xl">
                <img
                  src="/image.png"
                  alt="Security Operations"
                  className="w-full h-full object-cover filter brightness-50 hover:brightness-75 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <Target
                    className="w-16 h-16 drop-shadow-2xl"
                    style={{
                      color: "var(--primary)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent mb-32"
            style={{
              background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 p-12 hover:border-[var(--theme-accent)]/50 transition-all duration-500 group relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm">
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl group-hover:opacity-20 transition-all duration-500"
                style={{
                  backgroundColor: "var(--primary)",
                  opacity: 0.05,
                }}
              />
              <div className="relative z-10">
                {/* Mission Badge */}
                <div
                  className="inline-flex items-center gap-3 px-4 py-2 border rounded-lg mb-8 shadow-lg"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--foreground)",
                  }}
                >
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Our Mission</span>
                </div>

                <h3 className="text-4xl font-bold mb-6 text-[var(--foreground)]">
                  Empower Through <span style={{ color: "var(--primary)" }}>Visibility</span>
                </h3>

                <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8">
                  Empower clients and communities to defend against cyber threats through enhanced visibility and proactive countermeasures.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["Client Empowerment", "Community Defense", "Proactive Security", "Enhanced Visibility"].map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-[var(--theme-dark-base)] border border-[var(--theme-border)] text-sm font-medium hover:border-[var(--theme-accent)] transition-colors rounded-lg shadow-lg text-[var(--foreground)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 p-12 hover:border-[var(--theme-accent)]/50 transition-all duration-500 group relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm">
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl group-hover:opacity-20 transition-all duration-500"
                style={{
                  backgroundColor: "var(--primary)",
                  opacity: 0.05,
                }}
              />
              <div className="relative z-10">
                {/* Vision Badge */}
                <div
                  className="inline-flex items-center gap-3 px-4 py-2 border rounded-lg mb-8 shadow-lg"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--foreground)",
                  }}
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Our Vision</span>
                </div>

                <h3 className="text-4xl font-bold mb-6 text-[var(--foreground)]">
                  A More <span style={{ color: "var(--primary)" }}>Secure World</span>
                </h3>

                <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8">
                  To build a more secure world by demystifying adversary tradecraft and making effective, actionable security approaches accessible to all.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["Demystifying Threats", "Accessible Security", "Actionable Approaches", "Global Impact"].map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-[var(--theme-dark-base)] border border-[var(--theme-border)] text-sm font-medium hover:border-[var(--theme-accent)] transition-colors rounded-lg shadow-lg text-[var(--foreground)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-32">
            <Button
              size="lg"
              className="glow-accent animate-pulse-glow group cursor-pointer"
              style={{ backgroundColor: "var(--primary)", color: "var(--foreground)" }}
            >
              Start Your Security Assessment
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-[var(--muted-foreground)] mt-6 text-lg">
              Ready to strengthen your security posture? Let's talk.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}