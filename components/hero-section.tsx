"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RippleGrid from "./RippleGrid";
import { motion } from "framer-motion";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#E5453D"); // fallback color

  useEffect(() => {
    setMounted(true);
    const color = getComputedStyle(document.documentElement).getPropertyValue("--primary");
    if (color) setPrimaryColor(color.trim());
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--theme-dark-base)] text-[var(--foreground)]">

      {/* Dotted Background */}
      <div className="absolute inset-0 opacity-20">
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

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-5 items-center relative z-10">

        {/* Left Side - Text */}
        <div className={`relative z-10 max-w-xl text-left transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <h1 className="text-3xl pt-[80px] sm:pt-[100px] md:pt-[70px] lg:pt-[50px] sm:text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
            <span style={{ color: "var(--primary)" }}>Find the breach point</span>{" "}
            <span>before They Do.</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed text-[var(--muted-foreground)]">
            Real-world attack simulations and end-to-end cybersecurity — proactively protecting your digital assets from emerging threats
          </p>

          <div className="flex flex-col sm:flex-row gap-4 ">
            <Button
              size="lg"
              className="glow-accent animate-pulse-glow group cursor-pointer"
              style={{ backgroundColor: "var(--primary)", color: "var(--foreground)" }}
            >
              Start Your Security Assessment<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Link href="/services" passHref legacyBehavior>
              <Button
                variant="outline"
                size="lg"
                className="glass-effect bg-transparent border border-primary text-foreground hover:bg-primary hover:text-foreground transition-colors cursor-pointer"
              >
                View Our Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side - Ripple Background */}
        {mounted && (
          <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[700px]">
            <RippleGrid
              gridColor={primaryColor}
              rippleIntensity={0.07}
              gridSize={12}
              gridThickness={18}
              fadeDistance={1.5}
              vignetteStrength={2.2}
              glowIntensity={0.2}
              opacity={1}
              gridRotation={0}
              mouseInteraction={true}
              mouseInteractionRadius={1.2}
            />
          </div>
        )}
      </div>
    </section>
  );
}