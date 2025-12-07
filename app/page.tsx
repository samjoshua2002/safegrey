
import dynamic from 'next/dynamic';
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";

// Dynamically import heavy components
const HeroSection = dynamic(() => import("@/components/hero-section").then(mod => mod.HeroSection), {
  loading: () => <div className="min-h-screen bg-[var(--theme-dark-base)]" />, // Placeholder
});
const ServicesOverview = dynamic(() => import("@/components/services-overview").then(mod => mod.ServicesOverview), {
  ssr: true // Keep SSR for SEO critical content above/near fold
});
const ReviewTestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(mod => mod.TestimonialsSection), { ssr: false });
const ReviewServicesAccordion = dynamic(() => import("@/components/services-home"), { ssr: false });
const ReviewEcosystemSection = dynamic(() => import("@/components/ui/ecosystem-section"), { ssr: false });
const ReviewLogoSection = dynamic(() => import("@/components/ui/logosection").then(mod => mod.LogoSection), { ssr: false });
const TestimonialsSection = ReviewTestimonialsSection;
const ServicesAccordion = ReviewServicesAccordion;
const EcosystemSection = ReviewEcosystemSection;
const LogoSection = ReviewLogoSection;

export default function HomePage() {
  const spacerStyle = {
    background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
  };

  return (
    <main className="min-h-screen">
      <Navigation />

      <ScrollAnimationWrapper animation={{ from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0, duration: 1 } }}>
        <HeroSection />
      </ScrollAnimationWrapper>

      <div className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" style={spacerStyle} />

      <ScrollAnimationWrapper animation={{ from: { opacity: 0, y: 80 }, to: { opacity: 1, y: 0, duration: 1 } }}>
        <ServicesOverview />
      </ScrollAnimationWrapper>

      <div className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" style={spacerStyle} />

      <ScrollAnimationWrapper animation={{ from: { opacity: 0, x: -100 }, to: { opacity: 1, x: 0, duration: 1.2 } }}>
        <EcosystemSection />
      </ScrollAnimationWrapper>

      <div className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" style={spacerStyle} />

      <ScrollAnimationWrapper animation={{ from: { opacity: 0, y: 100 }, to: { opacity: 1, y: 0, duration: 1 } }}>
        <TestimonialsSection />
      </ScrollAnimationWrapper>

      <div className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" style={spacerStyle} />

      <ScrollAnimationWrapper animation={{ from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0, duration: 1 } }}>
        <ServicesAccordion />
      </ScrollAnimationWrapper>

      <div className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" style={spacerStyle} />

      <ScrollAnimationWrapper animation={{ from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0, duration: 1 } }}>
        <LogoSection />
      </ScrollAnimationWrapper>

      <div className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" style={spacerStyle} />

      <Footer />
    </main>
  );
}
