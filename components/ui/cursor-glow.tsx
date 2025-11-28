"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Center the cursor glow
            mouseX.set(e.clientX - 110);
            mouseY.set(e.clientY - 110);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed pointer-events-none z-50 mix-blend-screen"
            style={{
                x,
                y,
                width: 300,
                height: 300,
                background:
                    "radial-gradient(circle, rgba(174, 32, 18, 0.4) 0%, rgba(174, 32, 18, 0) 70%)",
                filter: "blur(50px)",
                opacity: 0.6,
            }}
        />
    );
}
