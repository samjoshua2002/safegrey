"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter } from "lucide-react";

export function TeamSection() {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: "/placeholder-user.jpg",
      description: "Former NSA cybersecurity analyst with 15+ years of experience."
    },
    {
      name: "Marcus ",
      role: "CTO & Co-Founder",
      image: "/placeholder-user.jpg",
      description: "Ex-Google security engineer specializing in AI-powered threat detection."
    },
    {
      name: "Dr. Emily Watson",
      role: "Head",
      image: "/placeholder-user.jpg",
      description: "PhD in Computer Security with expertise in nation-state attack patterns."
    },
    {
      name: "James Park",
      role: "Director of Incident Response",
      image: "/placeholder-user.jpg",
      description: "Former FBI cybercrime investigator"
    },
    {
      name: "Alex Rivera",
      role: "Head of Operations",
      image: "/placeholder-user.jpg",
      description: "Former FBI cybercrime investigator with extensive experience in digital forensics."
    },
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: "/placeholder-user.jpg",
      description: "Former NSA cybersecurity analyst with 15+ years of experience."
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--theme-dark-base)] overflow-hidden" id="team">
      {/* Soft Background Accents */}

            <style jsx>{`
        .brush-frame-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(12px);
          clip-path: polygon(10% 0%, 100% 5%, 90% 100%, 0% 95%);
          z-index: 2;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .brush-frame-secondary {
          position: absolute;
          top: -12px;
          left: -10px;
          width: 112%;
          height: 108%;
          background: linear-gradient(135deg, rgba(var(--theme-accent-rgb), 0.2) 0%, rgba(255, 255, 255, 0.05) 100%);
          clip-path: polygon(15% 5%, 95% 0%, 85% 95%, 5% 100%);
          z-index: 1;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .brush-accent-red {
          position: absolute;
          background: var(--theme-accent);
          z-index: 3;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 0 15px var(--theme-accent);
        }
        .accent-top-left {
          width: 60px;
          height: 4px;
          top: -8px;
          left: 10%;
          transform: rotate(-3deg);
        }
        .accent-bottom-right {
          width: 80px;
          height: 6px;
          bottom: -15px;
          right: 5%;
          transform: rotate(2deg);
        }
        .portrait-bw {
          filter: grayscale(100%) contrast(120%) brightness(0.9);
          width: 100%;
          height: auto;
          display: block;
          position: relative;
          z-index: 4;
          clip-path: polygon(5% 2%, 98% 0%, 95% 98%, 0% 95%);
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .card-wrapper:hover .brush-frame-bg {
          transform: translateY(-8px) scale(1.02);
          background: rgba(30, 30, 30, 0.9);
          border-color: rgba(var(--theme-accent-rgb), 0.3);
        }
        .card-wrapper:hover .brush-frame-secondary {
          transform: translateY(-4px) scale(1.05);
          background: rgba(var(--theme-accent-rgb), 0.15);
        }
        .card-wrapper:hover .portrait-bw {
          filter: grayscale(0%) contrast(100%) brightness(1.1);
          transform: translateY(-12px) scale(1.08);
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
        .card-wrapper:hover .brush-accent-red {
          background: #fff;
          box-shadow: 0 0 25px #fff;
        }
        .text-title {
          font-weight: 900;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }
        .glitch-text {
          position: relative;
          color: white;
        }
        .glitch-text::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: var(--theme-accent);
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
          animation: noise-before 3s infinite linear alternate-reverse;
          opacity: 0.5;
        }
        @keyframes noise-before {
          0% { clip: rect(20px, 9999px, 40px, 0); }
          100% { clip: rect(60px, 9999px, 80px, 0); }
        }
      `}</style>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--theme-accent)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--theme-accent)]/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--theme-accent)]">Our Experts</span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-[var(--theme-text-primary)] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Behind the <span className="text-[var(--theme-accent)]">Shield</span>
          </motion.h2>
          <motion.p
            className="text-lg text-[var(--theme-text-secondary)] max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 1, y: 0 }}
          >
            A collective of elite security professionals dedicated to protecting your digital enterprise.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full bg-card/40 backdrop-blur-sm border border-white/5 hover:border-[var(--theme-accent)]/30 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--theme-accent)]/10 overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  {/* Premium Profile Image */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-accent)] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full scale-110" />
                    <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-br from-white/10 to-transparent group-hover:from-[var(--theme-accent)]/50 transition-all duration-500">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-transparent bg-[var(--theme-dark-base)]">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pb-6">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[var(--theme-accent)] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--theme-accent)] bg-[var(--theme-accent)]/10 px-3 py-1 rounded-full inline-block">
                      {member.role}
                    </p>
                    <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed line-clamp-3 font-light">
                      {member.description}
                    </p>
                  </div>

                  {/* Elegant Social Actions */}
                  <div className="mt-auto w-full flex items-center justify-center gap-3 pt-6 border-t border-white/5">
                    <button className="p-2 rounded-xl bg-white/[0.03] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-accent)]/10 hover:text-[var(--theme-accent)] transition-all duration-300 hover:-translate-y-1">
                      <Linkedin size={18} />
                    </button>
                    <button className="p-2 rounded-xl bg-white/[0.03] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-accent)]/10 hover:text-[var(--theme-accent)] transition-all duration-300 hover:-translate-y-1">
                      <Twitter size={18} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
