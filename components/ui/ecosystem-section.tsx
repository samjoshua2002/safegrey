"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";
import { motionValue } from "framer-motion";
import { useAnimationControls } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TabKey = "protect" | "detect" | "respond";

const TABS: { key: TabKey; label: string; desc: string }[] = [
  {
    key: "protect",
    label: "Protect",
    desc: "We harden your defenses by identifying and remediating vulnerabilities across applications, networks, Active Directory, and cloud infrastructure through comprehensive assessments and risk management, securing your foundational assets.",
  },
  {
    key: "detect",
    label: "Detect",
    desc: "We empower your vigilance through continuous SIEM monitoring and test your security with targeted phishing campaigns, assumed breach scenarios, and Red Team exercises to swiftly identify lurking threats.",
  },
  {
    key: "respond",
    label: "Respond",
    desc: "We fortify your ability to act by validating and refining your incident response capabilities through Red Team and Assumed Breach simulations, ensuring swift and effective action against detected threats with Purple Team collaboration.",
  },
];

export default function EcosystemSection() {
  const [active, setActive] = React.useState<TabKey>("protect");
  const [paused, setPaused] = React.useState(false);

  // At the top of your component
  const progressValues = useRef(TABS.map(() => motionValue(0)));
  const controlsArray = useRef(TABS.map(() => useAnimationControls()));

  React.useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setActive((current) => {
        if (current === "protect") return "detect";
        if (current === "detect") return "respond";
        return "protect";
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <TooltipProvider delayDuration={80}>
      <div className="bg-[var(--theme-dark-base)]">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pt-20 lg:pb-36 overflow-hidden ">
          {/* Dotted background */}
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

          {/* Existing Content */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start mb-4 lg:mb-12 ">
            <div className="md:col-span-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white mb-3" />
                <div>
                  <div className="text-xl text-muted-foreground font-medium">
                    Ecosystem
                  </div>
                  <div className=" text-xl lg:text-2xl font-bold text-foreground">
                    THE SAFEGREY{" "}
                    <span className="text-[#E5453D]">ECOSYSTEM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-9">
              <div className="flex items-center gap-2 justify-between mt-5 ">
                {TABS.map((tab, index) => {
                  const isActive = active === tab.key;
                  const isCompleted =
                    TABS.findIndex((t) => t.key === active) > index;
                  const progress = useMotionValue(0);
                  const controls = useAnimationControls();

                  useEffect(() => {
                    if (isActive) {
                      controls.start({
                        width: "100%",
                        transition: { duration: 5, ease: "linear" },
                      });
                    } else {
                      controls.stop();
                      progress.set(isCompleted ? 100 : 0);
                    }
                  }, [isActive]);

                  useEffect(() => {
                    if (paused) {
                      controls.stop(); // freeze
                    } else if (isActive) {
                      controls.start({
                        width: "100%",
                        transition: { duration: 5, ease: "linear" },
                      });
                    }
                  }, [paused]);

                  return (
                    <div key={tab.key} className="flex-1 text-center">
                      <div className="flex gap-2 mb-2">
                        <button
                          onMouseEnter={() => setPaused(true)}
                          onMouseLeave={() => setPaused(false)}
                          onClick={() => {
                            setActive(tab.key);
                            setPaused(true); // <-- freeze after clicking
                          }}
                          className={cn(
                            "flex items-center gap-2 text-lg font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer",
                            isActive ? "text-white" : "text-gray-400"
                          )}
                        >
                          <div
                            className={cn(
                              "w-2 h-2 transition-colors duration-300",
                              isActive ? "bg-white" : "bg-gray-400"
                            )}
                          />
                          {tab.label}
                        </button>
                      </div>

                      <div className="relative h-1 bg-gray-600 rounded-full overflow-hidden">
                        <motion.div
                          className={cn(
                            "absolute top-0 left-0 h-full rounded-full",
                            isActive ? "bg-white" : "bg-transparent"
                          )}
                          style={{ width: progress }}
                          animate={controls}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10 ">
            <div className="lg:col-span-5 mt-14">
              <AnimatePresence mode="wait">
                {TABS.map(
                  (t) =>
                    t.key === active && (
                      <motion.div
                        key={t.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        <h3 className="text-2xl font-bold text-foreground">
                          {t.label}
                        </h3>
                        <p className="text-lg leading-8 text-muted-foreground">
                          {t.desc}
                        </p>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
            <div className="lg:col-span-7">
              <IsometricStack active={active} />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

// Other components (IsometricStack, IsometricLayer, SignalBoard, ProtectSignalBoards, DetectSignalBoards, RespondSignalBoards, GraphDots, DotMatrix, ResearchNodes, FloatingParticles, AnimatedMatrix)
// remain exactly the same but with minimal transition adjustments for smoother motion

function IsometricStack({ active }: { active: TabKey }) {
  const showDetect = active === "detect" || active === "respond";
  const showRespond = active === "respond";

  return (
    <div className="iso-scene relative mx-auto h-[350px] w-full ">
      {/* Enhanced background matrix */}
      <div className="pointer-events-none absolute -top-8 left-1/2 z-0 w-[80%] -translate-x-1/2 opacity-70">
        <AnimatedMatrix />
      </div>

      {/* Base layer: Protect */}
      <IsometricLayer
        zIndex={1}
        accent="hsl(142, 76%, 36%)"
        fill="linear-gradient(135deg, hsl(142 76% 36% / 0.02) 0%, hsl(142 76% 36% / 0.08) 100%)"
        dashed
        depth={-60}
        offsetY={15}
        className="border-opacity-40"
      >
        <ProtectSignalBoards />
      </IsometricLayer>

      {/* Layer 2: Detect */}
      <AnimatePresence>
        {showDetect && (
          <motion.div
            key="detect"
            initial={{ opacity: 0, y: 20, scale: 0.96, rotateX: -5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 15, scale: 0.98, rotateX: -3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-10"
          >
            <IsometricLayer
              zIndex={10}
              accent="var(--threatops-neutral)"
              fill="linear-gradient(135deg, rgba(156,163,175,0.05) 0%, rgba(156,163,175,0.1) 100%)"
              dashed
              elevated
              depth={-20}
              offsetY={5}
            >
              <DetectSignalBoards />
              <GraphDots />
            </IsometricLayer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 3: Respond */}
      <AnimatePresence>
        {showRespond && (
          <motion.div
            key="respond"
            initial={{ opacity: 0, y: 25, scale: 0.94, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.97, rotateX: -4 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 z-20"
          >
            <IsometricLayer
              zIndex={20}
              accent="hsl(0, 84%, 60%)"
              fill="linear-gradient(135deg, hsl(0 84% 60% / 0.05) 0%, hsl(0 84% 60% / 0.12) 100%)"
              dashed={false}
              elevated
              depth={25}
              offsetY={-8}
            >
              <RespondSignalBoards />
              <ResearchNodes />
            </IsometricLayer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating particles effect */}
      <FloatingParticles />
    </div>
  );
}

function IsometricLayer({
  children,
  accent,
  fill,
  dashed = false,
  elevated = false,
  zIndex = 1,
  depth = 0,
  offsetY = 0,
  className = "",
}: {
  children?: React.ReactNode;
  accent: string;
  fill: string;
  dashed?: boolean;
  elevated?: boolean;
  zIndex?: number;
  depth?: number;
  offsetY?: number;
  className?: string;
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex }}
    >
      <div
        className="iso w-[75%] max-w-[500px]"
        style={
          {
            "--iso-z": `${depth}px`,
            "--iso-y": `${offsetY}px`,
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "relative aspect-square rounded-lg backdrop-blur-sm",
            elevated
              ? "shadow-xl shadow-black/30 border"
              : "shadow-lg shadow-black/20 border",
            dashed ? "border-dashed border-2" : "border",
            "transition-all duration-500",
            className
          )}
          style={{
            borderColor: accent,
            background: fill,
          }}
        >
          {/* Enhanced inner glow */}
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-accent/30 rounded-tl" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-accent/30 rounded-tr" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-accent/30 rounded-bl" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-accent/30 rounded-br" />

          {children}
        </div>
      </div>
    </div>
  );
}

function ProtectSignalBoards() {
  const items = [
    {
      x: "15%",
      y: "25%",
      label: "ASSESS",
      color: "hsl(142, 76%, 36%)",
      tooltip: "Comprehensive Vulnerability Assessments",
    },
    {
      x: "40%",
      y: "60%",
      label: "HARDEN",
      color: "hsl(142, 76%, 36%)",
      tooltip: "Infrastructure Hardening & Remediation",
    },
    {
      x: "69%",
      y: "28%",
      label: "SECURE",
      color: "hsl(142, 76%, 36%)",
      tooltip: "Cloud & Network Security",
    },
  ];

  return (
    <div className="absolute inset-0">
      {items.map((item, index) => (
        <SignalBoard
          key={index}
          x={item.x}
          y={item.y}
          label={item.label}
          color={item.color}
          tooltip={item.tooltip}
          delay={index * 0.15}
          height={60}
          stickHeight={0}
        />
      ))}

      {/* Base layer center marker */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-green-500/20 border-2 border-green-500/50"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  );
}

function DetectSignalBoards() {
  const items = [
    {
      x: "15%",
      y: "65%",
      label: "MONITOR",
      color: "var(--threatops-neutral)",
      tooltip: "Continuous SIEM Monitoring",
    },
    {
      x: "40%",
      y: "20%",
      label: "PHISH",
      color: "var(--threatops-neutral)",
      tooltip: "Targeted Phishing Campaigns",
    },
    {
      x: "70%",
      y: "65%",
      label: "HUNT",
      color: "var(--threatops-neutral)",
      tooltip: "Threat Hunting & Red Team Exercises",
    },
  ];

  return (
    <div className="absolute inset-0">
      {items.map((item, index) => (
        <SignalBoard
          key={index}
          x={item.x}
          y={item.y}
          label={item.label}
          color={item.color}
          tooltip={item.tooltip}
          delay={index * 0.15}
          height={70}
          stickHeight={0}
          elevated
        />
      ))}

      {/* Detect layer center marker */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/20 border-2 border-white/50"
        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  );
}

function RespondSignalBoards() {
  const items = [
    {
      x: "20%",
      y: "28%",
      label: "VALIDATE",
      color: "hsl(0, 84%, 60%)",
      tooltip: "Incident Response Validation",
    },
    {
      x: "45%",
      y: "65%",
      label: "SIMULATE",
      color: "hsl(0, 84%, 60%)",
      tooltip: "Assumed Breach Scenarios",
    },
    {
      x: "70%",
      y: "30%",
      label: "COLLAB",
      color: "hsl(0, 84%, 60%)",
      tooltip: "Purple Team Collaboration",
    },
  ];

  return (
    <div className="absolute inset-0">
      {items.map((item, index) => (
        <SignalBoard
          key={index}
          x={item.x}
          y={item.y}
          label={item.label}
          color={item.color}
          tooltip={item.tooltip}
          delay={index * 0.15}
          height={80}
          stickHeight={0}
          elevated
        />
      ))}

      {/* Respond layer center marker */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-red-500/30 border-2 border-red-500/70"
        animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  );
}

function SignalBoard({
  x,
  y,
  label,
  color,
  tooltip,
  delay = 0,
  height = 60,
  stickHeight = 30,
  elevated = false,
}: {
  x: string;
  y: string;
  label: string;
  color: string;
  tooltip: string;
  delay?: number;
  height?: number;
  stickHeight?: number;
  elevated?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      className="absolute"
      style={{ left: x, top: y }}
    >
      {/* Signal Stick */}
      <div
        className="absolute w-1 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t"
        style={{
          height: `${stickHeight}px`,
          bottom: `${height}px`,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Dashed Rectangle Board */}
      <motion.div
        className={cn(
          "relative rounded border-2 border-dashed backdrop-blur-sm",
          elevated ? "shadow-md" : "shadow-sm"
        )}
        style={{
          width: "80px",
          height: `${height}px`,
          borderColor: color,
          background: `linear-gradient(135deg, ${color}10, ${color}05)`,
        }}
        whileHover={{ scale: 1.55, y: -2 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {/* Pulsing dot indicator */}
        <motion.div
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
          transition={{
            duration: 1 + Math.random(), // was 2 + Math.random()*2
            delay: Math.random() * 1, // was *2
            repeat: Infinity,
          }}
        />
        <div className="graph-dots absolute inset-[6%] opacity-10">
          <DotMatrix />
        </div>

        {/* Label */}
        <div className="absolute inset-0 flex items-center justify-center p-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.span
                className="text-xs font-bold uppercase tracking-wider text-center cursor-pointer"
                style={{ color }}
                whileHover={{ scale: 1.1 }}
              >
                {label}
              </motion.span>
            </TooltipTrigger>
            {/* <TooltipContent 
              className="text-xs max-w-xs border-2 bg-background/95 backdrop-blur-md"
              style={{ borderColor: color }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "white" }} />
                {tooltip}
              </div>
            </TooltipContent> */}
          </Tooltip>
        </div>

        {/* Connection lines animation */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-1 overflow-hidden">
          <motion.div
            className="w-full h-0.5 rounded-full "
            style={{ backgroundColor: color }}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              delay: delay + 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function GraphDots() {
  return (
    <div className="absolute inset-0">
      {/* Enhanced dotted matrix */}
      <div className="graph-dots absolute inset-[8%] opacity-10">
        <DotMatrix />
      </div>

      {/* Enhanced shimmer */}
      <motion.div
        aria-hidden
        className="absolute inset-[8%] bg-gradient-to-r from-transparent via-white/15 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{ mixBlendMode: "overlay" }}
      />
    </div>
  );
}

function DotMatrix() {
  return (
    <div className="grid grid-cols-12 grid-rows-12 h-full w-full gap-4">
      {Array.from({ length: 64 }).map((_, i) => (
        <motion.div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-current opacity-40"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      ))}
    </div>
  );
}

function ResearchNodes() {
  const nodes = [
    { x: "30%", y: "60%", size: "medium" },
    { x: "45%", y: "45%", size: "large" },
    { x: "60%", y: "60%", size: "small" },
  ];

  return (
    <div className="absolute inset-0">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-red-500/40 ${
            node.size === "small"
              ? "w-3 h-3"
              : node.size === "medium"
              ? "w-4 h-4"
              : "w-5 h-5"
          }`}
          style={{
            left: node.x,
            top: node.y,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      ))}
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1 + Math.random(), // was 3 + Math.random()*2
            repeat: Infinity,
            delay: Math.random() * 1, // was *2
          }}
        />
      ))}
    </div>
  );
}

function AnimatedMatrix() {
  const rows = 5;
  const cols = 15;

  // ✅ Generate matrix ONCE after client mounts (prevents SSR mismatch)
  const [values, setValues] = React.useState<number[]>([]);

  React.useEffect(() => {
    const newValues = Array.from({ length: rows * cols }, () =>
      Math.random() > 0.7
        ? Math.floor(Math.random() * 2)
        : Math.floor(Math.random() * 10)
    );
    setValues(newValues);
  }, []);

  // ✅ Return empty placeholder on SSR (prevents hydration error)
  if (values.length === 0) {
    return (
      <div className="grid select-none grid-cols-20 gap-1 text-xs leading-5 font-mono text-muted-foreground/40">
        {Array.from({ length: rows * cols }).map((_, i) => (
          <span key={i} className="text-center opacity-30">
            0
          </span>
        ))}
      </div>
    );
  }

  // ✅ Lightweight framer-motion animations (less lag)
  return (
    <div className="grid select-none grid-cols-20 gap-1 text-xs leading-5 font-mono text-muted-foreground/40">
      {values.map((v, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 1 + (i % cols) * 0.05, // was 2 + (i % cols) * 0.1
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn("text-center", v === 1 ? "text-primary/50" : "")}
        >
          {v}
        </motion.span>
      ))}
    </div>
  );
}

// CSS styles for 3D effects
const isoStyles = `
.iso {
  transform: rotateX(60deg) rotateZ(45deg) translate3d(var(--iso-y), 0, var(--iso-z));
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.billboard {
  transform: rotateX(-60deg) rotateZ(-45deg) translate3d(0, 0, var(--billboard-z, 0px));
  transform-style: preserve-3d;
}

.graph-dots {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 15px 15px;
}

.iso-scene {
  perspective: 1000px;
  transform-style: preserve-3d;
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = isoStyles;
  document.head.appendChild(styleSheet);
}
