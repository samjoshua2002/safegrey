"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';

const Marquee: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeWrapperRef = useRef<HTMLDivElement>(null);

    const images = [
        "/a4.webp",
        "/image.png",
        "/image2.webp",
        "/image.png",
        "/a5.jpg"
       
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, Flip);

        const ctx = gsap.context((self) => {
            const lenis = new Lenis();
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);

            // Theme colors 
            const baseDark = "#0f0606";
            const secondaryDark = "#1e1e1f";

            const startColor = baseDark;
            const endColor = baseDark;

            const interpolateColor = (color1: string, color2: string, factor: number) => {
                return gsap.utils.interpolate(color1, color2, factor);
            };

            // Marquee Animation
            gsap.to(".marquee-images", {
                scrollTrigger: {
                    trigger: ".marquee",
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const xPosition = -75 + progress * 25;
                        gsap.set(".marquee-images", {
                            x: `${xPosition}%`,
                        });
                    }
                }
            });

            let pinnedMarqueeImgClone: HTMLElement | null = null;
            let isImgCloneActive = false;
            let flipAnimation: gsap.core.Timeline | null = null;

            const createPinnedMarqueeImgClone = () => {
                if (isImgCloneActive) return;
                const originalMarqueeImg = document.querySelector(".marquee-img.pin img") as HTMLElement;
                if (!originalMarqueeImg) return;

                const rect = originalMarqueeImg.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                pinnedMarqueeImgClone = originalMarqueeImg.cloneNode(true) as HTMLElement;

                // GSAP set styles for fixed positioning
                gsap.set(pinnedMarqueeImgClone, {
                    position: "fixed",
                    left: centerX - originalMarqueeImg.offsetWidth / 2 + "px",
                    top: centerY - originalMarqueeImg.offsetHeight / 2 + "px",
                    width: originalMarqueeImg.offsetWidth + "px",
                    height: originalMarqueeImg.offsetHeight + "px",
                    transform: "rotate(-5deg)",
                    transformOrigin: "center center",
                    pointerEvents: "none",
                    willChange: "transform",
                    zIndex: 100,
                    objectFit: "cover"
                });

                document.body.appendChild(pinnedMarqueeImgClone);
                gsap.set(originalMarqueeImg, { opacity: 0 });
                isImgCloneActive = true;
            };

            const removePinnedMarqueeImgClone = () => {
                if (!isImgCloneActive) return;
                if (pinnedMarqueeImgClone) {
                    pinnedMarqueeImgClone.remove();
                    pinnedMarqueeImgClone = null;
                }
                const originalMarqueeImg = document.querySelector(".marquee-img.pin img");
                if (originalMarqueeImg) {
                    gsap.set(originalMarqueeImg, { opacity: 1 });
                }
                isImgCloneActive = false;
            };

            // Pin Horizontal Scroll Section
            ScrollTrigger.create({
                trigger: ".horizontal-scroll",
                start: "top top",
                end: () => `+=${window.innerHeight * 5}`,
                pin: true,
            });

            // Handle Pinning Logic on Marquee Enter/Leave
            ScrollTrigger.create({
                trigger: ".marquee",
                start: "top top",
                onEnter: createPinnedMarqueeImgClone,
                onEnterBack: createPinnedMarqueeImgClone,
                onLeaveBack: removePinnedMarqueeImgClone,
            });

            // Flip Animation Creation
            ScrollTrigger.create({
                trigger: ".horizontal-scroll",
                start: "top 50%",
                end: () => `+=${window.innerHeight * 5.5}`,
                onEnter: () => {
                    if (pinnedMarqueeImgClone && isImgCloneActive && !flipAnimation) {
                        const state = Flip.getState(pinnedMarqueeImgClone);
                        gsap.set(pinnedMarqueeImgClone, {
                            position: "fixed",
                            left: "0px",
                            top: "0px",
                            width: "100%",
                            height: "100svh",
                            transform: "rotate(0deg)",
                            transformOrigin: "center center",
                        });
                        flipAnimation = Flip.from(state, {
                            duration: 1,
                            ease: "none",
                            paused: true,
                        });
                    }
                },
                onLeaveBack: () => {
                    if (flipAnimation) {
                        flipAnimation.kill();
                        flipAnimation = null;
                    }
                    gsap.set(".marquee-container", {
                        backgroundColor: startColor,
                    });
                    gsap.set(".horizontal-scroll-wrapper", {
                        x: "0%",
                    });
                },
            });

            // Animation Update Loop for Colors and Horizontal Move
            ScrollTrigger.create({
                trigger: ".horizontal-scroll",
                start: "top 50%",
                end: () => `+=${window.innerHeight * 5.5}`,
                onUpdate: (self) => {
                    const progress = self.progress;

                    // Background Color Transition
                    if (progress <= 0.05) {
                        const bgColorProgress = Math.min(progress / 0.05, 1);
                        const newBgColor = interpolateColor(startColor, endColor, bgColorProgress);
                        gsap.set(".marquee-container", { backgroundColor: newBgColor });
                    } else if (progress > 0.05) {
                        gsap.set(".marquee-container", { backgroundColor: endColor });
                    }

                    // Flip Animation Progress
                    if (progress <= 0.2) {
                        const scaleProgress = progress / 0.2;
                        if (flipAnimation) {
                            flipAnimation.progress(scaleProgress);
                        }
                    }

                    // Horizontal Scroll Progress
                    if (progress > 0.2 && progress <= 0.95) {
                        if (flipAnimation) flipAnimation.progress(1);

                        const horizontalProgress = (progress - 0.2) / 0.75;
                        const wrapperTranslateX = -66.67 * horizontalProgress;
                        gsap.set(".horizontal-scroll-wrapper", {
                            x: `${wrapperTranslateX}%`,
                        });

                        const slideMovement = (66.67 / 100) * 3 * horizontalProgress;
                        const imageTranslateX = -slideMovement * 100;
                        gsap.set(pinnedMarqueeImgClone, {
                            x: `${imageTranslateX}%`,
                        });
                    } else if (progress > 0.95) {
                        if (flipAnimation) flipAnimation.progress(1);
                        gsap.set(pinnedMarqueeImgClone, { x: "-200%" });
                        gsap.set(".horizontal-scroll-wrapper", { x: "-66.67%" });
                    }
                }
            });

            return () => {
                lenis.destroy();
                if (pinnedMarqueeImgClone) {
                    pinnedMarqueeImgClone.remove();
                }
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const getImgSrc = (index: number) => {
        return images[index % images.length];
    };

    return (
        <div
            className="marquee-container relative w-full h-full bg-[#0f0606] text-[#f8f9fa] overflow-hidden"
            ref={containerRef}
        >
            <section className="hero relative w-full h-[100svh] p-8 flex flex-col justify-center items-center text-center">
                <h1 className="text-[4rem] font-medium tracking-[-0.075rem] leading-[1.125] w-3/4 mx-auto max-[1000px]:text-[2.25rem] max-[1000px]:tracking-[-0.05rem] max-[1000px]:w-full text-gradient">
                    Digital fortresses are built on vigilance, where every packet of data is scrutinized.
                </h1>
            </section>

            <section className="marquee relative w-full h-[50svh] overflow-hidden" ref={marqueeRef}>
                <div className="marquee-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[5deg] w-[150%] h-full max-[1000px]:w-[300%]" ref={marqueeWrapperRef}>
                    <div className="marquee-images absolute top-1/2 left-1/2 -translate-x-[75%] -translate-y-1/2 w-[200%] h-full flex justify-between items-center gap-4">
                        {[...Array(13)].map((_, i) => (
                            <div key={i} className={`marquee-img flex-1 w-full aspect-[5/3] ${i === 6 ? 'pin' : ''}`}>
                                <img
                                    src={getImgSrc(i)}
                                    alt={`Cybersecurity Concept ${i + 1}`}
                                    className="w-full h-full object-cover rounded-lg border border-[rgba(255,255,255,0.1)]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="horizontal-scroll relative w-full h-[100svh] overflow-hidden">
                <div className="horizontal-scroll-wrapper relative w-[300%] h-[100svh] flex">
                    <div className="horizontal-slide horizontal-spacer flex-1 h-full"></div>

                    <div className="horizontal-slide flex-1 h-full flex gap-8 p-8 bg-[#0f0606] text-[#f8f9fa] max-[1000px]:p-16 max-[1000px]:flex-col-reverse max-[1000px]:gap-8">
                        <div className="col flex-[3] flex items-center justify-center max-[1000px]:items-start">
                            <h3 className="w-3/4 text-[2.25rem] font-medium tracking-[-0.025rem] leading-[1.125] max-[1000px]:text-[1.5rem] max-[1000px]:w-full text-gradient">
                                Threat landscapes shift constantly; what was secure yesterday may be vulnerable today.
                            </h3>
                        </div>
                        <div className="col flex-[2] flex items-center justify-center">
                            <img
                                src={getImgSrc(0)}
                                alt="Threat Landscape"
                                className="w-3/4 h-[75%] object-cover max-[1000px]:w-full max-[1000px]:h-full rounded-2xl border border-[rgba(255,255,255,0.1)]"
                            />
                        </div>
                    </div>

                    <div className="horizontal-slide flex-1 h-full flex gap-8 p-8 bg-[#0f0606] text-[#f8f9fa] max-[1000px]:p-16 max-[1000px]:flex-col-reverse max-[1000px]:gap-8">
                        <div className="col flex-[3] flex items-center justify-center max-[1000px]:items-start">
                            <h3 className="w-3/4 text-[2.25rem] font-medium tracking-[-0.025rem] leading-[1.125] max-[1000px]:text-[1.5rem] max-[1000px]:w-full text-gradient">
                                Encryption acts as the silent guardian, transforming clarity into chaos for those without the key.
                            </h3>
                        </div>
                        <div className="col flex-[2] flex items-center justify-center">
                            <img
                                src={getImgSrc(2)}
                                alt="Encryption"
                                className="w-3/4 h-[75%] object-cover max-[1000px]:w-full max-[1000px]:h-full rounded-2xl border border-[rgba(255,255,255,0.1)]"
                            />
                        </div>
                    </div>
                </div>
            </section>

           {/* Enhanced Partner Categories Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="text-center mb-16">
                    <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[16rem] font-black text-[var(--foreground)] tracking-tighter leading-none mb-4">
                        Safe<span className="text-[var(--theme-accent)]">Grey</span>
                    </h1>
                    <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
                        Building the future of cybersecurity through strategic partnerships and innovative solutions.
                    </p>
                </div>

                {/* Enhanced navigation with badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {[
                        { name: "Technology Partners", count: "120+" },
                        { name: "Solution Partners", count: "85+" },
                        { name: "Resellers", count: "200+" },
                        { name: "Integrations", count: "50+" }
                    ].map((category, index) => (
                        <a
                            key={index}
                            href="#_"
                            className="group relative px-6 py-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card-bg)] hover:border-[var(--theme-accent)] transition-all duration-300 hover:shadow-lg min-w-[200px] text-center"
                        >
                            <div className="font-medium text-[var(--foreground)] group-hover:text-[var(--theme-accent)] transition-colors">
                                {category.name}
                            </div>
                            <div className="text-sm text-[var(--muted-foreground)] mt-1">
                                {category.count}
                            </div>
                            <div className="absolute inset-0 rounded-xl border-2 border-[var(--theme-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </a>
                    ))}
                </div>

                {/* Enhanced CTA Section */}
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--foreground)] uppercase mb-8 lg:text-balance">
                        Collaborate, <span className="text-[var(--theme-accent)]">Secure</span>, and launch your next big initiative
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                        <button className="px-8 py-4 bg-[var(--theme-accent)] text-white font-semibold rounded-xl hover:bg-[var(--theme-accent)]/90 transition-colors duration-300 transform hover:scale-105">
                            Become a Partner
                        </button>
                        <button className="px-8 py-4 border border-[var(--theme-border)] text-[var(--foreground)] font-semibold rounded-xl hover:border-[var(--theme-accent)] transition-colors duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marquee;
