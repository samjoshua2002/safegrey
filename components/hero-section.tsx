"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RadarSystem } from "./RadarSystem";
import { motion } from "framer-motion";
import { AppointmentModalWrapper } from "./appointment-modal-wrapper";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle radar scan event
  // When beam points Left (approx 180 degrees), we trigger the text effect
  const handleRadarScan = useCallback((angle: number) => {
    // Left side is 180 degrees. We check a small window around it.
    // 160 to 200 degrees
    const isPointingLeft = angle > 160 && angle < 200;

    // We only want to trigger the glitch ONCE per rotation, so we can check if it just entered the zone
    // But simplistic state update is fine for CSS animation class toggling if handled carefully.
    // To avoid constant re-renders/flickers, we can set it and use a timeout to unset, or just let the angle drive it.
    // A clearer "hit" might be better:
    if (Math.abs(angle - 180) < 5) { // Narrow window for "Direct Hit"
      setIsScanning(true);
      // Reset after animation duration
      setTimeout(() => setIsScanning(false), 500);
    }
  }, []);

  return (
    <>
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
              <span
                style={{ color: "var(--primary)" }}
                className={cn("inline-block transition-all duration-200", isScanning && "animate-scan-glitch")}
              >
                Find the breach point
              </span>{" "}
              <span className={cn("inline-block transition-all duration-200 delay-100", isScanning && "animate-scan-glitch")}>
                before They Do.
              </span>
            </h1>

            <p className={cn(
              "text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed text-[var(--muted-foreground)] transition-all duration-300",
              isScanning && "text-[var(--foreground)] brightness-125"
            )}>
              Real-world attack simulations and end-to-end cybersecurity — proactively protecting your digital assets from emerging threats
            </p>

            <div className="flex flex-col sm:flex-row gap-4 ">

              {/* Button to open modal */}
              <Button
                size="lg"
                className="glow-accent animate-pulse-glow group cursor-pointer"
                style={{ backgroundColor: "var(--primary)", color: "var(--foreground)" }}
                onClick={() => setIsModalOpen(true)}
              >
                Book your consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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

          {/* Right Side - Radar System */}
          {mounted && (
            <div className="hidden lg:flex absolute p-10 lg:right-[-40%] w-[120%] min-h-screen items-center justify-center pointer-events-none md:pointer-events-auto">

              <div className="relative w-full h-full scale-125 md:scale-125 lg:scale-110">

                {/* Edge fade / glow */}
                <div
                  className="absolute inset-0 rounded-full
                 bg-[radial-gradient(circle,_rgba(174,32,18,0.28)_0%,_rgba(174,32,18,0.14)_40%,_rgba(174,32,18,0.06)_60%,_transparent_75%)]
                 blur-2xl"
                />

                {/* Radar */}
                <RadarSystem onScan={handleRadarScan} />

              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AppointmentModalWrapper
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}