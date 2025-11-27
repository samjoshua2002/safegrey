'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from '@/components/ui/shadcn-io/marquee';
import Image from "next/image";

export function LogoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8 
                 bg-[var(--theme-dark-base)] text-[var(--theme-text-primary)]"
    >

      {/* --- SIMPLE DOTTED BACKGROUND (same as ServicesOverview) --- */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 grid grid-cols-4 gap-24 transform -rotate-6 scale-150">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[var(--theme-accent)]" />
            </div>
          ))}
        </div>
      </div>

      {/* --- FLOATING ACCENT BLOBS (same styling as ServicesOverview) --- */}
      <motion.div
        className="absolute top-10 left-20 w-48 h-48 rounded-full 
                   bg-[var(--theme-accent)]/10 blur-3xl animate-float"
        transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
      />

      <motion.div
        className="absolute bottom-10 right-20 w-56 h-56 rounded-full 
                   bg-[var(--theme-accent-dim)]/10 blur-3xl animate-float"
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
      />

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">

        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Compliance & Trust
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto mb-16 text-xl md:text-2xl text-[var(--theme-text-secondary)] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          With certified professionals and a deep understanding of global compliance standards,
          SafeGrey delivers security you can trust and ensures you receive{' '}
          <span className="text-[var(--theme-accent)] font-semibold">
            best-in-class security outcomes
          </span>.
        </motion.p>

        {/* --- MARQUEE LOGOS (unchanged) --- */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Marquee>
            <MarqueeFade side="left" />
            <MarqueeFade side="right" />
            <MarqueeContent className="flex items-center gap-8">

              {[
                { name: "OSCP", file: "/logos/OSCP.png" },
                { name: "OSEP", file: "/logos/osep.png" },
                { name: "CRTO", file: "/logos/CRTO.png" },
                { name: "OWASP", file: "/logos/owasp-logo.webp" },
                { name: "CRISC", file: "/logos/cris-logo.png" },
                { name: "ISO", file: "/logos/iso-logo.png" },
                { name: "MITRE", file: "/logos/mna-logo.png" },
                { name: "NIST", file: "/logos/nist-logo.webp" },
                { name: "PTES", file: "/logos/pte-logo.png" },
              ].map((logo, index) => (
                <MarqueeItem
                  key={index}
                  className="group relative flex items-center justify-center h-24 w-40 
                             bg-muted/70 rounded-xl shadow-lg backdrop-blur-sm border border-white/10"
                >
                  <Image
                    src={logo.file}
                    alt={logo.name}
                    width={80}
                    height={80}
                    className="object-contain brightness-95 group-hover:brightness-110 transition-all"
                  />
                </MarqueeItem>
              ))}

            </MarqueeContent>
          </Marquee>
        </motion.div>

      </div>
    </section>
  );
}
