"use client";

import { motion } from "framer-motion";

export function TeamSections() {
const team = [
  {
    name: "Vivek Balaji",
    role: "Co-Founder & Head of Cyber Defense",
    image: "profile.jpg",
    description:
      "Cybersecurity leader specializing in enterprise security architecture, cyber defense operations, and strategic risk management."
  },
  {
    name: "Dhiwakar Gurumurthy",
    role: "CFO & Head of Operations",
    image: "profile.jpg",
    description:
      "Leads financial planning, business operations, and organizational growth with a focus on efficiency and scalability."
  },
  {
    name: "Monu Kumar",
    role: "Offensive Security Lead",
    image: "profile.jpg",
    description:
      "Certified security professional focused on penetration testing, red teaming, and proactive threat assessment."
  },
  {
    name: "Jaggajit Vasishta",
    role: "Security Research Specialist",
    image: "profile.jpg",
    description:
      "Specializes in security research, threat intelligence, vulnerability analysis, and security operations excellence."
  },
  {
    name: "Naveen Vijay",
    role: "Associate Security Analyst",
    image: "profile.jpg",
    description:
      "Focused on security monitoring, incident analysis, threat detection, and strengthening organizational security posture."
  },
  {
    name: "Sam Joshua",
    role: "Offensive R&D Engineer",
    image: "profile.jpg",
    description:
      "Researches emerging attack vectors, develops security tools, automates offensive testing workflows, and advances security innovation."
  }
];
  return (
    <section className="relative py-24 lg:py-40 px-4 sm:px-6 lg:px-8 bg-[var(--theme-dark-base)] overflow-hidden" id="team">
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
          height: 100%;
          object-fit: cover;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
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
         <div className="text-center mb-1 px-4">
       
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
      
     

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-32 text-center">

       
     
  
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-12">

          
          {team.map((member, index) => (
            <motion.article 
              key={index}
              className="flex flex-col items-center card-wrapper"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="relative w-full aspect-square max-w-[240px] mb-8 group cursor-crosshair">
                <div className="brush-frame-secondary" />
                <div className="brush-frame-bg shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
                <div className="brush-accent-red accent-top-left" />
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="portrait-bw shadow-2xl" 
                />
                <div className="brush-accent-red accent-bottom-right" />
                
                {/* Data Overlay on Hover */}
                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] space-y-2 translate-y-20 group-hover:translate-y-0 transition-transform duration-700">
       
                  
                  </div>
                </div>
              </div>
              
              <div className="text-center w-full group">
                <motion.h3 
                  className="text-3xl font-black uppercase tracking-tighter text-white mb-3"
                >
                  {member.name}
                </motion.h3>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-8 h-px bg-[var(--theme-accent)] opacity-50" />
                  <p className="text-[var(--theme-accent)] font-black text-xs uppercase tracking-[0.3em]">
                    {member.role}
                  </p>
                  <div className="w-8 h-px bg-[var(--theme-accent)] opacity-50" />
                </div>
                <p className="text-white/60 text-sm leading-relaxed px-6 font-light italic tracking-wide group-hover:text-white transition-colors duration-500">
                  "{member.description}"
                </p>
                
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                 
                </div>
              </div>
            </motion.article>
          ))}
        </main>
      </div>
    </section>
  );
}
