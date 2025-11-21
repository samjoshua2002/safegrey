"use client";

import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ServicesOverview } from "@/components/services-overview";
import { StatsSection } from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { ServicesSection } from "@/components/ui/services-section";
import { Footer } from "@/components/footer";
import EcosystemSection from "@/components/ui/ecosystem-section";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoSection } from "@/components/ui/logosection";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  const ecosystemRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const sections = [
      {
        ref: heroRef,
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 1 },
      },
      {
        ref: servicesRef,
        from: { opacity: 0, y: 80 },
        to: { opacity: 1, y: 0, duration: 1 },
      },
      {
        ref: statsRef,
        from: { opacity: 0, scale: 0.9 },
        to: { opacity: 1, scale: 1, duration: 1 },
      },
      {
        ref: ecosystemRef,
        from: { opacity: 0, x: -100 },
        to: { opacity: 1, x: 0, duration: 1.2 },
      },
      {
        ref: testimonialsRef,
        from: { opacity: 0, y: 100 },
        to: { opacity: 1, y: 0, duration: 1 },
      },
      {
        ref: ctaRef,
        from: { opacity: 0, scale: 0.95 },
        to: { opacity: 1, scale: 1, duration: 1 },
      },
      {
        ref: servicesSectionRef,
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 1 },
      },
      {
        ref: logoRef,
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 1 },
      },
    ];

    sections.forEach(({ ref, from, to }) => {
      if (ref.current) {
        gsap.fromTo(ref.current, from, {
          ...to,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    // Clean up ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Navigation />
      <div ref={heroRef}>
        <HeroSection />
      </div>
      <div ref={servicesRef}>
        <ServicesOverview />
      </div>
      {/* <div ref={statsRef}>
        <StatsSection />
      </div> */}
      <div ref={ecosystemRef}>
        <EcosystemSection />
      </div>
      <div ref={testimonialsRef}>
        <TestimonialsSection />
      </div>

      <div ref={servicesSectionRef}>
        <ServicesSection />
      </div>
      <div ref={logoRef}>
        <LogoSection />
      </div>
      
      <Footer />
    </main>
  );
}
