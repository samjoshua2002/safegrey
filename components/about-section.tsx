"use client";
import { useState, useEffect } from 'react';
import { Users, Target, Shield, Eye, Lock, ArrowRight, Globe, Heart, Zap, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import FlowingMenu from './FlowingMenu';
import GridMotion from './GridMotion';
import InteractiveTypography from './InteractiveTypography';

export function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const teamStats = [
    { number: "50+", label: "Certified Experts" },
    { number: "100+", label: "Projects Completed" },
    { number: "24/7", label: "Security Operations" },
    { number: "99%", label: "Client Satisfaction" }
  ];

  const values = [
    {
      icon: Target,
      title: "Adversary-Focused",
      description: "We think like attackers to build better defenses"
    },
    {
      icon: Shield,
      title: "Collaborative",
      description: "Working hand-in-hand with your team for maximum impact"
    },
    {
      icon: Eye,
      title: "Transparent",
      description: "Clear insights and actionable recommendations"
    },
    {
      icon: Zap,
      title: "Proactive",
      description: "Staying ahead of emerging threats"
    }
  ];

  const carouselSlides = [
    {
      id: 1,
      title: "Security Solutions That Defend Your Digital Future",
      subtitle: "Advanced Threat Protection",
      description: "Comprehensive security services that protect your organization from evolving cyber threats with cutting-edge technology and expert oversight.",
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1920"
    },
    {
      id: 2,
      title: "Zero Trust Security Framework",
      subtitle: "Modern Security Architecture",
      description: "Implementing never trust, always verify principles across your entire digital ecosystem for maximum protection.",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1920"
    },
    {
      id: 3,
      title: "24/7 Security Operations Center",
      subtitle: "Continuous Monitoring",
      description: "Round-the-clock surveillance and threat detection to keep your assets secure against emerging threats.",
      image: "https://images.pexels.com/photos/17766789/pexels-photo-17766789.jpeg?auto=compress&cs=tinysrgb&w=1920"
    }
  ];

  const gridItems = [
    "Security", "ThreatOps", "Cyber", "Defense",
    "Protection", "Risk", "Analysis", "Monitoring",
    "Incident", "Response", "Forensics", "Compliance"
  ];

  const flowingItems = [
    "Penetration Testing",
    "Red Team Operations",
    "Security Audits",
    "Threat Intelligence",
    "Incident Response",
    "Vulnerability Assessment",
    "Security Architecture",
    "Compliance & Risk"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSlide]);

  const currentCarousel = carouselSlides[currentSlide];

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentCarousel.image})`,
            filter: 'brightness(0.4)'
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

        <div className="absolute inset-0 z-5 opacity-20">
          <GridMotion items={gridItems} />
        </div>

        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full">
            <div className="max-w-3xl">
              {/* Badge with CSS variables */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-8 shadow-lg"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--foreground)",
                }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--foreground)" }} />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  {currentCarousel.subtitle}
                </span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-none">
                {currentCarousel.title}
              </h1>

              <p className="text-xl lg:text-2xl text-zinc-300 mb-12 leading-relaxed">
                {currentCarousel.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="px-8 py-4 font-semibold rounded-none transition-all duration-300 hover:translate-x-1 flex items-center justify-center gap-2 group shadow-lg"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--foreground)",
                  }}
                >
                  Get Protected
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-semibold rounded-none transition-all duration-300 shadow-lg shadow-white/10">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls - Moved to Right with Dashes */}
        <div className="absolute bottom-12 right-8 lg:right-16 z-30">
          <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm border border-white/20 p-4 rounded-lg shadow-2xl">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 rounded-lg group"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? 
                <Pause className="w-4 h-4 group-hover:scale-110 transition-transform" /> : 
                <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
              }
            </button>

            <button
              onClick={prevSlide}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 rounded-lg group"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Dashes instead of dots */}
            <div className="flex gap-1 mx-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 h-1 shadow-lg'
                      : 'w-4 h-1 bg-white/30 hover:bg-white/50'
                  }`}
                  style={{
                    backgroundColor: index === currentSlide ? "var(--primary)" : undefined,
                  }}
                  title={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 rounded-lg group"
              title="Next"
            >
              <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
          <div
            className={`h-full ${isPlaying ? 'animate-progress' : ''}`}
            style={{
              backgroundColor: "var(--primary)",
            }}
          />
        </div>
      </section>

      <FlowingMenu items={flowingItems} />

      <section className="py-32 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
            <div className="space-y-8 sticky top-8">
              {/* Expertise Badge */}
              <div 
                className="inline-flex items-center gap-3 px-4 py-2 border rounded-lg shadow-lg"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--foreground)",
                }}
              >
                <Users className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Expertise</span>
              </div>

              <InteractiveTypography
                text="Expertise That Makes a Difference"
                className="text-5xl lg:text-7xl font-bold"
                highlightColor="text-red-500"
              />

              <div 
                className="w-20 h-1 rounded-full"
                style={{
                  backgroundColor: "var(--primary)",
                }}
              />
            </div>

            <div className="space-y-8">
              <p className="text-xl text-zinc-300 leading-relaxed">
                At <span style={{ color: "var(--primary)" }} className="font-semibold">Safegrey</span>, our strength comes from a team of highly qualified professionals who are passionate about cybersecurity. Our consultants and engineers hold leading industry certifications.
              </p>

              <p className="text-xl text-zinc-300 leading-relaxed">
                This deep expertise ensures our clients receive not only world-class security solutions but also practical guidance that stands up to real-world threats.
              </p>

              <p className="text-xl text-zinc-300 leading-relaxed">
                We are committed to advancing the state of cybersecurity for organizations of all sizes—empowering you to build resilience and confidently secure your digital assets.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8">
                {teamStats.map((stat, index) => (
                  <div key={index} className="border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 p-8 hover:border-zinc-600 transition-all duration-300 group shadow-lg rounded-xl">
                    <div 
                      className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform"
                      style={{
                        color: "var(--primary)",
                      }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-zinc-400 uppercase tracking-wider font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div 
            className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent mb-32"
            style={{
              background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
            <div className="space-y-8 order-last lg:order-first">
              <p className="text-xl text-zinc-300 leading-relaxed">
                At Safegrey, we go beyond checklists and automated scans. Our team works hand-in-hand with your organization, applying an adversary-focused mindset and real-world attack simulations to uncover true vulnerabilities.
              </p>

              <p className="text-xl text-zinc-300 leading-relaxed">
                We believe every engagement should be collaborative, transparent, and tailored to your specific risks—empowering you with actionable insights and practical solutions that make a measurable difference.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 p-6 hover:border-zinc-600 transition-all duration-300 group shadow-lg rounded-xl">
                      <Icon 
                        className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform"
                        style={{
                          color: "var(--primary)",
                        }}
                      />
                      <h4 className="font-semibold text-lg mb-2">{value.title}</h4>
                      <p className="text-sm text-zinc-400">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-8 sticky top-8">
              {/* Approach Badge */}
              <div 
                className="inline-flex items-center gap-3 px-4 py-2 border rounded-lg shadow-lg"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--foreground)",
                }}
              >
                <Zap className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Our Approach</span>
              </div>

              <InteractiveTypography
                text="Beyond Checklists"
                className="text-5xl lg:text-7xl font-bold"
                highlightColor="text-red-500"
              />

              <div 
                className="w-20 h-1 rounded-full"
                style={{
                  backgroundColor: "var(--primary)",
                }}
              />

              <div className="aspect-[4/3] relative overflow-hidden border border-zinc-800 rounded-xl shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Security Operations"
                  className="w-full h-full object-cover filter brightness-50 hover:brightness-75 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <Target 
                    className="w-16 h-16 drop-shadow-2xl"
                    style={{
                      color: "var(--primary)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div 
            className="h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent mb-32"
            style={{
              background: `linear-gradient(to right, transparent, var(--primary), transparent)`,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="border border-zinc-800 bg-gradient-to-br from-zinc-900/30 to-zinc-800/20 p-12 hover:border-zinc-600 transition-all duration-500 group relative overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl group-hover:opacity-20 transition-all duration-500"
                style={{
                  backgroundColor: "var(--primary)",
                  opacity: 0.05,
                }}
              />
              <div className="relative z-10">
                {/* Mission Badge */}
                <div 
                  className="inline-flex items-center gap-3 px-4 py-2 border rounded-lg mb-8 shadow-lg"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--foreground)",
                  }}
                >
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Our Mission</span>
                </div>

                <h3 className="text-4xl font-bold mb-6">
                  Empower Through <span style={{ color: "var(--primary)" }}>Visibility</span>
                </h3>

                <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                  Empower clients and communities to defend against cyber threats through enhanced visibility and proactive countermeasures.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["Client Empowerment", "Community Defense", "Proactive Security", "Enhanced Visibility"].map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-zinc-800 to-zinc-700 border border-zinc-600 text-sm font-medium hover:border-zinc-400 transition-colors rounded-lg shadow-lg"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-zinc-800 bg-gradient-to-br from-zinc-900/30 to-zinc-800/20 p-12 hover:border-zinc-600 transition-all duration-500 group relative overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl group-hover:opacity-20 transition-all duration-500"
                style={{
                  backgroundColor: "var(--primary)",
                  opacity: 0.05,
                }}
              />
              <div className="relative z-10">
                {/* Vision Badge */}
                <div 
                  className="inline-flex items-center gap-3 px-4 py-2 border rounded-lg mb-8 shadow-lg"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--foreground)",
                  }}
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Our Vision</span>
                </div>

                <h3 className="text-4xl font-bold mb-6">
                  A More <span style={{ color: "var(--primary)" }}>Secure World</span>
                </h3>

                <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                  To build a more secure world by demystifying adversary tradecraft and making effective, actionable security approaches accessible to all.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["Demystifying Threats", "Accessible Security", "Actionable Approaches", "Global Impact"].map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-zinc-800 to-zinc-700 border border-zinc-600 text-sm font-medium hover:border-zinc-400 transition-colors rounded-lg shadow-lg"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-32">
            <button 
              className="px-12 py-6 font-semibold text-lg rounded-xl transition-all duration-300 hover:translate-y-[-4px] shadow-2xl flex items-center justify-center gap-3 mx-auto group"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--foreground)",
              }}
            >
              Start Your Security Journey
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-zinc-400 mt-6 text-lg">
              Ready to strengthen your security posture? Let's talk.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 5s linear;
        }
      `}</style>
    </div>
  );
}