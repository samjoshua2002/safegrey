"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
    content,
    contentClassName,
}: {
    content: {
        title: string;
        description: string;
        content?: React.ReactNode | any;
    }[];
    contentClassName?: string;
}) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        setActiveCard(closestBreakpointIndex);
    });

    const backgroundColors = [
        "var(--theme-dark-base)",
        "var(--theme-dark-base)",
        "var(--theme-dark-base)",
    ];
    const linearGradients = [
        "linear-gradient(to bottom right, var(--theme-accent), var(--theme-accent-secondary, var(--theme-accent)))",
        "linear-gradient(to bottom right, var(--theme-accent), var(--theme-accent-secondary, var(--theme-accent)))",
        "linear-gradient(to bottom right, var(--theme-accent), var(--theme-accent-secondary, var(--theme-accent)))",
    ];

    const [backgroundGradient, setBackgroundGradient] = useState(
        linearGradients[0]
    );

    useEffect(() => {
        setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
    }, [activeCard]);

    return (
        <div
            ref={ref}
            className="relative"
            style={{
                height: `${content.length * 100}vh`,
            }}
        >
            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
                <motion.div
                    animate={{
                        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
                    }}
                    className="flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-10 items-center justify-between"
                >
                    <div className="relative flex items-start max-w-2xl">
                        <div className="w-full">
                            {content.map((item, index) => (
                                <div key={item.title + index}>
                                    <motion.h2
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity: activeCard === index ? 1 : 0.3,
                                        }}
                                        className="text-2xl font-bold text-[var(--foreground)] mb-4"
                                    >
                                        {item.title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity: activeCard === index ? 1 : 0.3,
                                        }}
                                        className="text-lg text-[var(--muted-foreground)] max-w-lg"
                                    >
                                        {item.description}
                                    </motion.p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <motion.div
                        style={{ background: backgroundGradient }}
                        className={cn(
                            "hidden lg:block h-[500px] w-[600px] rounded-xl bg-white sticky top-20 overflow-hidden border border-[var(--theme-border)]",
                            contentClassName
                        )}
                    >
                        {content[activeCard].content ?? null}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};
