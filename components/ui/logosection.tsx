'use client';

import { motion } from 'framer-motion';
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from '@/components/ui/shadcn-io/marquee';

export function LogoSection() {
  const logos = [
    'OSCP',
    'OSCE',
    'CRTO',
    'CRISC',
    'ISO 27001',
    'Miter & Attack',
    'OWASP',
    'NIST',
    'PTES',
  ];

  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-[var(--theme-dark-base)] text-[var(--theme-text-primary)]">
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
        transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-56 h-56 rounded-full bg-[var(--theme-accent-dim)]/10 blur-3xl animate-float"
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Compliance & Trust
        </motion.h2>

        {/* Content Text */}
        <motion.p
          className="max-w-3xl mx-auto mb-12 text-xl text-[var(--theme-text-secondary)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          With certified professionals and a deep understanding of global compliance standards,
          SafeGrey delivers security you can trust and ensures you receive best-in-class
          security outcomes.
        </motion.p>

        {/* Marquee Logos */}
        <div className="relative overflow-hidden">
          <Marquee>
            <MarqueeFade side="left" />
            <MarqueeFade side="right" />
            <MarqueeContent className="flex items-center gap-8">
              {logos.map((logo, index) => (
                <MarqueeItem
                  key={index}
                  className="flex items-center justify-center h-20 w-32 bg-muted rounded-lg text-white font-semibold shadow-md"
                >
                  {logo}
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
