"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationProps {
    children: React.ReactNode;
    animation: {
        from: gsap.TweenVars;
        to: gsap.TweenVars;
    };
    className?: string;
}

export function ScrollAnimationWrapper({ children, animation, className }: ScrollAnimationProps) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current || !animation) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(ref.current, animation.from, {
                ...animation.to,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [animation]);

    return <div ref={ref} className={className}>{children}</div>;
}
