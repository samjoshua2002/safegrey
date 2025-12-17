"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// ✅ Correct imports for all icons
import { SiExpertsexchange } from "react-icons/si";
import { GiArcheryTarget } from "react-icons/gi";
import { LuSendToBack } from "react-icons/lu";
import { FaInstalod } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";

export function TestimonialsSection() {
  const features = [
    {
      title: "Personalized, Expert Service",
      description:
        "Work with hand-picked consultants and industry-recognized professionals, each committed to your security success.",
      icon: SiExpertsexchange,
    },
    {
      title: "Real-World Attack Simulation",
      description:
        "Experience assessments modeled after genuine adversary techniques—delivering clarity on your true risk exposure.",
      icon: GiArcheryTarget,
    },
    {
      title: "End-to-End Security",
      description:
        "From cloud to infrastructure, applications to networks, we provide comprehensive coverage against today's advanced threats.",
      icon: LuSendToBack,
    },
    {
      title: "Continuous Security Improvement",
      description:
        "Our mission is to leave you stronger—not just protected while we're there, but resilient for the long term.",
      icon: FaInstalod,
    },
    {
      title: "Proven Experience",
      description:
        "Over half our team consists of highly trained cybersecurity engineers, architects, and consultants with experience across commercial and government sectors.",
      icon: GrCertificate,
    },
  ];

  // Split features into top row (3 cards) and bottom row (2 cards)
  const topFeatures = features.slice(0, 3);
  const bottomFeatures = features.slice(3, 5);

  return (
    <section className="relative overflow-hidden py-12 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--theme-dark-base)] text-[var(--theme-text-primary)]">
      {/* Dotted Matrix Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 grid grid-cols-4 gap-24 transform -rotate-6 scale-150">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--theme-accent)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Dotted Matrix Pattern */}
      <div className="absolute inset-0 opacity-30">
        {/* Top left cluster */}
        <div className="absolute top-20 left-10 grid grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
          ))}
        </div>
        
        {/* Bottom right cluster */}
        <div className="absolute bottom-20 right-10 grid grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-14 text-center text-[var(--theme-text-primary)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Choosing Us
        </motion.h2>

        {/* Top Row - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {topFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full glass-effect border border-[var(--theme-border)] hover:glow-accent hover:scale-[1.03] transition-all duration-300 flex flex-col text-left p-6  hover:border-[var(--theme-accent)]/50 transition-all duration-300">
                  <CardContent className="flex flex-col justify-start h-full p-0">
                    {/* Icon */}
                    <div className="mb-4">
                      <Icon
                        className="w-10 h-10 text-[var(--theme-accent)]"
                      />
                    </div>

                    {/* Title - White and left aligned */}
                    <h3 className="font-semibold text-xl mb-3 text-white text-left">
                      {feature.title}
                    </h3>

                    {/* Description - Left aligned */}
                    <p className="text-[var(--theme-text-secondary)] text-lg leading-relaxed text-left">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Row - 2 Cards (centered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-2xl md:mx-auto">
          {bottomFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
              >
                <Card className="h-full glass-effect border border-[var(--theme-border)] hover:glow-accent hover:scale-[1.03] transition-all duration-300 flex flex-col text-left p-6 hover:border-[var(--theme-accent)]/50 transition-all duration-300">
                  <CardContent className="flex flex-col justify-start h-full p-0">
                    {/* Icon */}
                    <div className="mb-4">
                      <Icon
                        className="w-10 h-10 text-[var(--theme-accent)]"
                      />
                    </div>

                    {/* Title - White and left aligned */}
                    <h3 className="font-semibold text-xl mb-3 text-white text-left">
                      {feature.title}
                    </h3>

                    {/* Description - Left aligned */}
                    <p className="text-[var(--theme-text-secondary)] text-lg  leading-relaxed text-left">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}