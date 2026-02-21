const fs = require('fs');
const file = 'components/about-section.tsx';
let txt = fs.readFileSync(file, 'utf8');

const startTag = '<section className="relative py-32 px-8 lg:px-16 overflow-hidden">';
const startIdx = txt.indexOf(startTag);
if (startIdx === -1) {
    console.error("Could not find start sequence");
    process.exit(1);
}

const endTag = '</div>\n  );\n}';
const endIdx = txt.lastIndexOf(endTag);
if (endIdx === -1) {
    console.error("Could not find end sequence");
    process.exit(1);
}

const replacement = `      {/* Expertise & Approach Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--theme-accent)]/5 rounded-full blur-[150px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#8a1515]/5 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Info Grid (Left/Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
            <div className="order-last lg:order-first">
              <div className="grid grid-cols-2 gap-6">
                {teamStats.map((stat, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    key={index} 
                    className="p-8 rounded-2xl border border-[var(--theme-border)] bg-[#0f0f11] hover:border-[var(--theme-accent)]/50 transition-all duration-300 group shadow-lg"
                  >
                    <div className="text-4xl lg:text-5xl font-black text-[var(--theme-accent)] mb-2 group-hover:scale-110 transition-transform origin-left">
                      {stat.number}
                    </div>
                    <div className="text-sm font-bold uppercase tracking-wider text-[var(--muted-foreground)] group-hover:text-white transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 mb-2">
                <Users className="w-4 h-4 text-[var(--theme-accent)]" />
                <span className="text-sm font-bold uppercase tracking-widest text-[var(--theme-accent)]">
                  The Team
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
                Expertise That <span className="text-[var(--theme-accent)]">Delivers.</span>
              </h2>
              <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
                At <span className="text-white font-semibold">Safegrey</span>, our strength is forged by highly qualified professionals passionate about cybersecurity. Our consultants and engineers hold leading industry certifications.
              </p>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                This deep expertise ensures our clients receive world-class security solutions and practical guidance that stands up to advanced real-world threats.
              </p>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--theme-border)] to-transparent mb-32"></div>

          {/* Mission & Vision Bento */}
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tight">
              Our <span className="text-[var(--theme-accent)]">Core Code</span>
            </h3>
            <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
              Driven by visibility, dedicated to a secure future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group p-10 rounded-3xl border border-[var(--theme-border)] bg-[#0f0f11] hover:border-[var(--theme-accent)]/50 transition-all duration-500 overflow-hidden relative flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-accent)]/10 rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-110 blur-2xl"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-[var(--theme-accent)]/10 flex items-center justify-center mb-8 border border-[var(--theme-accent)]/20 group-hover:bg-[var(--theme-accent)] transition-colors duration-500 relative z-10">
                <Heart className="w-8 h-8 text-[var(--theme-accent)] group-hover:text-white transition-colors duration-500" />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                Empower Through <span className="text-[var(--theme-accent)]">Visibility</span>
              </h3>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8 relative z-10">
                Empower clients and communities to defend against cyber threats through enhanced visibility and proactive countermeasures. We ensure no vulnerability remains hidden.
              </p>
              
              <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                 {["Client Empowerment", "Community Defense", "Proactive Security"].map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-[#1a1a20] border border-[var(--theme-border)] text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] rounded-md group-hover:border-[var(--theme-accent)]/30 transition-colors">
                      {item}
                    </span>
                 ))}
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="group p-10 rounded-3xl border border-[var(--theme-border)] bg-[#0f0f11] hover:border-[var(--theme-accent)]/50 transition-all duration-500 overflow-hidden relative flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-accent)]/10 rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-110 blur-2xl"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-[var(--theme-accent)]/10 flex items-center justify-center mb-8 border border-[var(--theme-accent)]/20 group-hover:bg-[var(--theme-accent)] transition-colors duration-500 relative z-10">
                <Globe className="w-8 h-8 text-[var(--theme-accent)] group-hover:text-white transition-colors duration-500" />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                A More <span className="text-[var(--theme-accent)]">Secure World</span>
              </h3>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8 relative z-10">
                To build a more secure world by demystifying adversary tradecraft and making effective, actionable security approaches accessible to all organizations.
              </p>
              
              <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                 {["Demystifying Threats", "Accessible Security", "Global Impact"].map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-[#1a1a20] border border-[var(--theme-border)] text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] rounded-md group-hover:border-[var(--theme-accent)]/30 transition-colors">
                      {item}
                    </span>
                 ))}
              </div>
            </motion.div>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--theme-border)] to-transparent mb-32"></div>

          {/* Core Values Grid */}
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tight">
              Beyond <span className="text-[var(--theme-accent)]">Checklists</span>
            </h3>
            <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
              Our approach is collaborative, transparent, and tailored directly to your specific risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index} 
                  className="group p-8 rounded-2xl border border-[var(--theme-border)] bg-[#0f0f11] hover:border-[var(--theme-accent)]/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--theme-accent)]/5 rounded-bl-full -mr-6 -mt-6 transition-transform duration-500 group-hover:scale-125"></div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--theme-accent)]/10 flex items-center justify-center mb-6 border border-[var(--theme-accent)]/20 group-hover:bg-[var(--theme-accent)] transition-colors duration-300 relative z-10">
                    <Icon className="w-6 h-6 text-[var(--theme-accent)] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--theme-accent)] transition-colors relative z-10 uppercase tracking-wide">{value.title}</h4>
                  <p className="text-[var(--muted-foreground)] leading-relaxed relative z-10 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center bg-[#0f0f11] border border-[var(--theme-border)] rounded-3xl p-16 relative overflow-hidden group mb-16"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--theme-accent)_0%,transparent_70%)] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000"></div>
            
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter relative z-10">
              Ready to Strengthen Your Posture?
            </h3>
            <p className="text-[var(--muted-foreground)] text-xl max-w-2xl mx-auto mb-10 relative z-10">
              Let's talk about dismantling generic defense strategies for your organization.
            </p>
            
            <Button
              size="lg"
              className="relative z-10 bg-[var(--theme-accent)] hover:bg-[#c22121] text-white px-8 py-6 text-lg font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(235,54,54,0.3)] hover:shadow-[0_0_30px_rgba(235,54,54,0.5)] hover:-translate-y-1 group/btn"
            >
              Start Your Assessment
              <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}`;

txt = txt.slice(0, startIdx) + replacement;
fs.writeFileSync(file, txt);
console.log("Replaced successfully!");
