"use client";
import { useState, useEffect, useRef } from 'react';
import { Users, Target, Shield, Eye, Sparkles, ArrowRight, Globe, Heart, Zap, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { gsap } from 'gsap';
import FlowingMenu from './FlowingMenu';
import GridMotion from './GridMotion';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InteractiveTypography from './InteractiveTypography';
import { motion } from 'framer-motion';

export function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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
      title: "Securing Your Digital Future",
      subtitle: "Advanced Threat Protection",
      description:
        "Comprehensive security services that protect your organization from evolving cyber threats with cutting-edge technology and expert oversight.",
      image: "https://images.pexels.com/photos/17766789/pexels-photo-17766789.jpeg?auto=compress&cs=tinysrgb&w=1920"
    },
    {
      id: 2,
      title: "Zero Trust Security Framework",
      subtitle: "Modern Security Architecture",
      description:
        "Implementing never trust, always verify principles across your entire digital ecosystem for maximum protection.",
      video: "/bg.mp4"
    },
    {
      id: 3,
      title: "24/7 Security Operations Center",
      subtitle: "Continuous Monitoring",
      description:
        "Round-the-clock surveillance and threat detection to keep your assets secure against emerging threats.",

      image: "./img.png"
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

  // GSAP Animations
  const animateSlideChange = (direction: 'next' | 'prev' | 'jump') => {
    const tl = gsap.timeline();

    // Reset progress bar
    if (progressRef.current) {
      gsap.set(progressRef.current, { width: '0%' });
    }

    // Exit animation for current content
    tl.to(contentRef.current, {
      duration: 0.6,
      y: direction === 'next' ? -50 : 50,
      opacity: 0,
      ease: "power2.inOut"
    })
      .to(imageRef.current, {
        duration: 0.8,
        scale: 1.1,
        opacity: 0.3,
        ease: "power2.inOut"
      }, 0)
      // Update slide (this happens in the middle of the animation)
      .add(() => {
        if (direction === 'next') {
          setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        } else if (direction === 'prev') {
          setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
        }
      }, 0.4)
      // Enter animation for new content
      .fromTo(imageRef.current,
        { scale: 1.1, opacity: 0.3 },
        {
          duration: 0.8,
          scale: 1,
          opacity: 1,
          ease: "power2.out"
        }, 0.4
      )
      .fromTo(contentRef.current,
        { y: direction === 'next' ? 50 : -50, opacity: 0 },
        {
          duration: 0.6,
          y: 0,
          opacity: 1,
          ease: "power2.out"
        }, 0.6
      )
      // Restart progress bar animation if playing
      .add(() => {
        if (isPlaying && progressRef.current) {
          gsap.to(progressRef.current, {
            duration: 5,
            width: '100%',
            ease: "none"
          });
        }
      }, 0.8);

    return tl;
  };

  const nextSlide = () => {
    animateSlideChange('next');
  };

  const prevSlide = () => {
    animateSlideChange('prev');
  };

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      animateSlideChange('jump');
      setCurrentSlide(index);
    }
  };

  // Initial animation on mount
  useEffect(() => {
    if (contentRef.current && imageRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(carouselRef.current,
        { opacity: 0 },
        { duration: 1, opacity: 1, ease: "power2.out" }
      )
        .fromTo(imageRef.current,
          { scale: 1.2 },
          { duration: 1.5, scale: 1, ease: "power2.out" },
          0
        )
        .fromTo(contentRef.current,
          { y: 30, opacity: 0 },
          { duration: 1, y: 0, opacity: 1, ease: "power2.out" },
          0.5
        );

      // Initial progress bar animation
      if (isPlaying && progressRef.current) {
        gsap.fromTo(progressRef.current,
          { width: '0%' },
          { duration: 5, width: '100%', ease: "none" }
        );
      }
    }
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSlide]);

  const currentCarousel = carouselSlides[currentSlide];

  return (
    <div className="min-h-screen bg-[var(--theme-dark-base)] text-[var(--foreground)] overflow-hidden">
      <section ref={carouselRef} className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        {/* Background Media */}
        <div className="absolute inset-0">
          {/* If image exists */}
          {currentCarousel.image && (
            <div
              ref={imageRef}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  typeof currentCarousel.image === "string"
                    ? `url(${currentCarousel.image})`
                    : `url(${URL.createObjectURL(currentCarousel.image)})`,
                filter: "brightness(0.4)"
              }}
            />
          )}

          {/* If video exists */}
          {currentCarousel.video && (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              style={{ filter: "brightness(0.4)" }}
            >
              <source
                src={
                  typeof currentCarousel.video === "string"
                    ? currentCarousel.video
                    : URL.createObjectURL(currentCarousel.video)
                }
                type="video/mp4"
              />
            </video>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

        <div className="absolute inset-0 z-5 opacity-20">
          <GridMotion items={gridItems} />
        </div>

        {/* Content */}
        <div ref={contentRef} className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full">
            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 mb-6">
                <Sparkles className="w-4 h-4 text-[var(--theme-accent)]" />
                <span className="text-sm font-semibold text-[var(--theme-accent)]">
                  {currentCarousel.subtitle}
                </span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-none text-[var(--foreground)]">
                {currentCarousel.title}
              </h1>

              <p className="text-xl lg:text-2xl text-[var(--muted-foreground)] mb-12 leading-relaxed">
                {currentCarousel.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 ">
                <Button
                  size="lg"
                  className="glow-accent animate-pulse-glow group cursor-pointer"
                  style={{ backgroundColor: "var(--primary)", color: "var(--foreground)" }}
                >
                  Start Your Security Assessment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Link href="/services" passHref legacyBehavior>
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass-effect bg-transparent border border-primary text-foreground hover:bg-primary hover:text-foreground transition-colors cursor-pointer"
                  >
                    View Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Carousel Controls */}
        <div className="hidden md:absolute md:bottom-12 md:right-8 lg:right-16 md:z-30 md:flex">
          <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm border border-white/20 p-4 rounded-lg shadow-2xl">

            {/* Play/Pause Button */}
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                if (!isPlaying && progressRef.current) {
                  gsap.to(progressRef.current, {
                    duration: 5 - (gsap.getProperty(progressRef.current, "width") as number) / 100 * 5,
                    width: '100%',
                    ease: "none"
                  });
                }
              }}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 rounded-lg group"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ?
                <Pause className="w-4 h-4 group-hover:scale-110 transition-transform" /> :
                <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
              }
            </button>

            {/* Previous Slide */}
            <button
              onClick={prevSlide}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 rounded-lg group"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Slide Dashes */}
            <div className="flex gap-1 mx-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative overflow-hidden transition-all duration-300 ${index === currentSlide
                    ? 'w-8 h-1 shadow-lg'
                    : 'w-4 h-1 bg-white/30 hover:bg-white/50'
                    }`}
                  style={{
                    backgroundColor: index === currentSlide ? "var(--primary)" : undefined,
                  }}
                  title={`Go to slide ${index + 1}`}
                  onMouseEnter={(e) => {
                    if (index !== currentSlide) {
                      gsap.to(e.currentTarget, {
                        duration: 0.3,
                        scaleX: 1.2,
                        ease: "power2.out"
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== currentSlide) {
                      gsap.to(e.currentTarget, {
                        duration: 0.3,
                        scaleX: 1,
                        ease: "power2.out"
                      });
                    }
                  }}
                />
              ))}
            </div>

            {/* Next Slide */}
            <button
              onClick={nextSlide}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 rounded-lg group"
              title="Next"
            >
              <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

          </div>
        </div>
        {/* GSAP Controlled Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
          <div
            ref={progressRef}
            className="h-full"
            style={{
              backgroundColor: "var(--primary)",
            }}
          />
        </div>
      </section>

      <FlowingMenu items={flowingItems} />

      <section className="relative py-32 px-8 lg:px-16 overflow-hidden">
        {/* Dotted Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
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
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-56 h-56 rounded-full bg-[var(--theme-accent-dim)]/10 blur-3xl animate-float"
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
            <div className="space-y-8 sticky top-8">
              {/* Expertise Badge */}


              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 mb-6">
                <Users className="w-4 h-4 text-[var(--theme-accent)]" />
                <span className="text-sm font-semibold text-[var(--theme-accent)]">
                  Expertise
                </span>
              </div>

              <InteractiveTypography
                text="Expertise That Makes a Difference"
                className="text-5xl lg:text-7xl font-bold text-[var(--foreground)]"

              />

              <div
                className="w-20 h-1 rounded-full"
                style={{
                  backgroundColor: "var(--primary)",
                }}
              />
            </div>

            <div className="space-y-8">
              <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
                At <span style={{ color: "var(--primary)" }} className="font-semibold">Safegrey</span>, our strength comes from a team of highly qualified professionals who are passionate about cybersecurity. Our consultants and engineers hold leading industry certifications.
              </p>

              <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
                This deep expertise ensures our clients receive not only world-class security solutions but also practical guidance that stands up to real-world threats.
              </p>

              <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
                We are committed to advancing the state of cybersecurity for organizations of all sizes—empowering you to build resilience and confidently secure your digital assets.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8">
                {teamStats.map((stat, index) => (
                  <div key={index} className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 p-8 hover:border-[var(--theme-accent)]/50 transition-all duration-300 group shadow-lg rounded-xl backdrop-blur-sm">
                    <div
                      className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform"
                      style={{
                        color: "var(--primary)",
                      }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)] uppercase tracking-wider font-medium">
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
              <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
                At Safegrey, we go beyond checklists and automated scans. Our team works hand-in-hand with your organization, applying an adversary-focused mindset and real-world attack simulations to uncover true vulnerabilities.
              </p>

              <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
                We believe every engagement should be collaborative, transparent, and tailored to your specific risks—empowering you with actionable insights and practical solutions that make a measurable difference.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 p-6 hover:border-[var(--theme-accent)]/50 transition-all duration-300 group shadow-lg rounded-xl backdrop-blur-sm">
                      <Icon
                        className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform"
                        style={{
                          color: "var(--primary)",
                        }}
                      />
                      <h4 className="font-semibold text-lg mb-2 text-[var(--foreground)]">{value.title}</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">{value.description}</p>
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
                className="text-5xl lg:text-7xl font-bold text-[var(--foreground)]"

              />

              <div
                className="w-20 h-1 rounded-full"
                style={{
                  backgroundColor: "var(--primary)",
                }}
              />

              <div className="aspect-[4/3] relative overflow-hidden border border-[var(--theme-border)] rounded-xl shadow-2xl">
                <img
                  src="/image.png"
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
            <div className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 p-12 hover:border-[var(--theme-accent)]/50 transition-all duration-500 group relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm">
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

                <h3 className="text-4xl font-bold mb-6 text-[var(--foreground)]">
                  Empower Through <span style={{ color: "var(--primary)" }}>Visibility</span>
                </h3>

                <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8">
                  Empower clients and communities to defend against cyber threats through enhanced visibility and proactive countermeasures.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["Client Empowerment", "Community Defense", "Proactive Security", "Enhanced Visibility"].map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-[var(--theme-dark-base)] border border-[var(--theme-border)] text-sm font-medium hover:border-[var(--theme-accent)] transition-colors rounded-lg shadow-lg text-[var(--foreground)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 p-12 hover:border-[var(--theme-accent)]/50 transition-all duration-500 group relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm">
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

                <h3 className="text-4xl font-bold mb-6 text-[var(--foreground)]">
                  A More <span style={{ color: "var(--primary)" }}>Secure World</span>
                </h3>

                <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8">
                  To build a more secure world by demystifying adversary tradecraft and making effective, actionable security approaches accessible to all.
                </p>

                <div className="flex flex-wrap gap-3">
                  {["Demystifying Threats", "Accessible Security", "Actionable Approaches", "Global Impact"].map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-[var(--theme-dark-base)] border border-[var(--theme-border)] text-sm font-medium hover:border-[var(--theme-accent)] transition-colors rounded-lg shadow-lg text-[var(--foreground)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-32">
            <Button
              size="lg"
              className="glow-accent animate-pulse-glow group cursor-pointer"
              style={{ backgroundColor: "var(--primary)", color: "var(--foreground)" }}
            >
              Start Your Security Assessment
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-[var(--muted-foreground)] mt-6 text-lg">
              Ready to strengthen your security posture? Let's talk.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}