// 'use client';

// import { motion } from 'framer-motion';
// import {
//   Marquee,
//   MarqueeContent,
//   MarqueeFade,
//   MarqueeItem,
// } from '@/components/ui/shadcn-io/marquee';

// export function LogoSection() {
//   const logos = [
//     'OSCP',
//     'OSCE',
//     'CRTO',
//     'CRISC',
//     'ISO 27001',
//     'Miter & Attack',
//     'OWASP',
//     'NIST',
//     'PTES',
//   ];

//   return (
//     <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-[var(--theme-dark-base)] text-[var(--theme-text-primary)]">
//       {/* Dotted Background */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute inset-0 grid grid-cols-4 gap-24 transform -rotate-6 scale-150">
//           {[...Array(16)].map((_, i) => (
//             <div key={i} className="flex items-center justify-center">
//               <div className="w-2 h-2 rounded-full bg-[var(--theme-accent)]" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Floating accent blobs */}
//       <motion.div
//         className="absolute top-10 left-20 w-48 h-48 rounded-full bg-[var(--theme-accent)]/10 blur-3xl animate-float"
//         transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
//       />
//       <motion.div
//         className="absolute bottom-10 right-20 w-56 h-56 rounded-full bg-[var(--theme-accent-dim)]/10 blur-3xl animate-float"
//         transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
//       />

//       <div className="relative z-10 max-w-6xl mx-auto text-center">
//         {/* Heading */}
//         <motion.h2
//           className="text-3xl md:text-5xl font-bold mb-6 text-white"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Compliance & Trust
//         </motion.h2>

//         {/* Content Text */}
//         <motion.p
//           className="max-w-3xl mx-auto mb-12 text-xl text-[var(--theme-text-secondary)]"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           With certified professionals and a deep understanding of global compliance standards,
//           SafeGrey delivers security you can trust and ensures you receive best-in-class
//           security outcomes.
//         </motion.p>

//         {/* Marquee Logos */}
//         <div className="relative overflow-hidden">
//           <Marquee>
//             <MarqueeFade side="left" />
//             <MarqueeFade side="right" />
//             <MarqueeContent className="flex items-center gap-8">
//               {logos.map((logo, index) => (
//                 <MarqueeItem
//                   key={index}
//                   className="flex items-center justify-center h-20 w-32 bg-muted rounded-lg text-white font-semibold shadow-md"
//                 >
//                   {logo}
//                 </MarqueeItem>
//               ))}
//             </MarqueeContent>
//           </Marquee>
//         </div>
//       </div>
//     </section>
//   );
// }






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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax + motion effects
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), { stiffness: 100, damping: 30 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [-100, 100]), { stiffness: 100, damping: 30 });
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [50, -150]), { stiffness: 80, damping: 25 });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // ✅ Manually defined logo PNGs
  const logos = [
    { name: "OSCP", file: "/logos/OSCP.png" },
    { name: "OSEP", file: "/logos/osep.png" },
    { name: "CRTO", file: "/logos/CRTO.png" },
    { name: "OWASP", file: "/logos/owasp-logo.webp" },
    { name: "CRICS", file: "/logos/cris-logo.png" },
    { name: "ISO", file: "/logos/iso-logo.png" },
    { name: "MITRE", file: "/logos/mna-logo.png" },
    { name: "NIST", file: "/logos/nist-logo.webp" },
    { name: "PTES", file: "/logos/pte-logo.png" },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8 bg-[var(--theme-dark-base)] text-[var(--theme-text-primary)]"
    >
      {/* Floating grid dots */}
      <motion.div className="absolute inset-0 opacity-20" style={{ y: y1 }}>
        <div className="absolute inset-0 grid grid-cols-8 gap-16 transform -rotate-12 scale-150">
          {[...Array(64)].map((_, i) => (
            <motion.div key={i} className="flex items-center justify-center">
              <motion.div 
                className="w-2 h-2 rounded-full bg-[var(--theme-accent)]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.05 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Animated outline squares */}
      <motion.div className="absolute inset-0 opacity-10" style={{ y: y2 }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border-2 border-[var(--theme-accent)]"
            style={{ left: `${(i * 20) % 100}%`, top: `${(i * 30) % 100}%`, rotate }}
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{
              rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, delay: i * 0.5 },
            }}
          />
        ))}
      </motion.div>

      {/* Gradient motion blobs */}
      <motion.div
        className="absolute top-10 left-20 w-64 h-64 rounded-full bg-[var(--theme-accent)]/20 blur-3xl"
        style={{ y: y3, scale }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-[var(--theme-accent-dim)]/20 blur-3xl"
        style={{ y: y2, scale }}
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror', ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-[var(--theme-accent)]/10 blur-3xl"
        style={{ y: y1, x: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror' }}
      />

      {/* Subtle grid background */}
      <motion.div className="absolute inset-0 opacity-5" style={{ y: y3 }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Content area */}
      <motion.div className="relative z-10 max-w-6xl mx-auto text-center" style={{ opacity }}>
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-8 text-white relative"
          style={{ y: useTransform(scrollYProgress, [0, 0.5, 1], [0, -20, 0]) }}
        >
          <span className="relative inline-block">
            <motion.span
              className="absolute inset-0 blur-2xl bg-gradient-to-r from-[var(--theme-accent)] to-[var(--theme-accent-dim)] opacity-50"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="relative">Compliance & Trust</span>
          </span>
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto mb-16 text-xl md:text-2xl text-[var(--theme-text-secondary)] leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          With certified professionals and a deep understanding of global compliance standards,
          SafeGrey delivers security you can trust and ensures you receive{' '}
          <motion.span 
            className="text-[var(--theme-accent)] font-semibold"
            animate={{ textShadow: ["0 0 10px var(--theme-accent)", "0 0 20px var(--theme-accent)", "0 0 10px var(--theme-accent)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            best-in-class security outcomes
          </motion.span>.
        </motion.p>

        {/* ✅ Scrolling marquee with PNG logos */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Marquee>
            <MarqueeFade side="left" />
            <MarqueeFade side="right" />
            <MarqueeContent className="flex items-center gap-8">
              {logos.map((logo, index) => (
                <MarqueeItem
                  key={index}
                  className="group relative flex items-center justify-center h-24 w-40 bg-gradient-to-br from-muted/80 to-muted rounded-2xl shadow-xl backdrop-blur-sm border border-white/10 cursor-pointer overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[var(--theme-accent)]/20 to-[var(--theme-accent-dim)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <motion.div
                    className="relative z-10 w-28 h-12 md:w-32 md:h-14 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src={logo.file}
                      alt={logo.name}
                      width={80}
                      height={80}
                      className="object-contain brightness-95 group-hover:brightness-110 transition-all duration-300"
                    />
                  </motion.div>
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[var(--theme-accent)]/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[var(--theme-accent)]/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>
        </motion.div>
      </motion.div>
    </section>
  );
}


