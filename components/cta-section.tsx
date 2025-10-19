"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-[var(--theme-dark-base)] text-[var(--theme-text-primary)]"
    >
      {/* === Corner Dots (Static Placement) === */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {/* Top-left 5x5 grid */}
        <div className="absolute top-10 left-10 grid grid-cols-5 gap-8">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`w-[5px] h-[5px] ${
                i % 3 === 0 ? "bg-white" : "bg-[var(--theme-accent)]"
              } rounded-sm`}
            />
          ))}
        </div>

        {/* Right-bottom 5x5 grid */}
        <div className="absolute right-10 bottom-10 grid grid-cols-5 gap-8">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`w-[5px] h-[5px] ${
                i % 4 === 0 ? "bg-white" : "bg-[var(--theme-accent)]"
              } rounded-sm`}
            />
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

      {/* Main CTA Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="glass-effect p-12 rounded-2xl glow-accent">
          <Shield className="w-16 h-16 text-accent mx-auto mb-6 animate-pulse" />

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="text-gradient">Secure Your Future</span>?
          </h2>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Don't wait for a security incident to realize the importance of proactive cybersecurity. Get started with a
            comprehensive security assessment today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="glow-accent animate-pulse-glow group">
              Get Your Free Security Assessment
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform hover:text-white" />
            </Button>
            <Button variant="outline" size="lg" className="glass-effect bg-transparent">
              Schedule a Consultation
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No commitment required • Expert consultation • Tailored recommendations
          </p>
        </div>
      </div>
    </section>
  );
}
