import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Shield, Search, Cloud, Lock, BarChart3, Zap } from 'lucide-react';
import { RadarIcon } from './RadarIcon';
import { RadarBeam } from './RadarBeam';
import { SecurityService } from '../types';

interface RadarSystemProps {
  onScan?: (angle: number) => void;
}

// Manual placement configuration
const SERVICES_BASE: SecurityService[] = [
  { id: '1', title: 'Security Assessment', description: 'Vulnerability scanning', icon: Search, x: -0.1, y: 0.32 },
  { id: '2', title: 'Posture Assessment', description: 'Compliance checks', icon: BarChart3, x: -0.49, y: -0.5 },
  { id: '3', title: 'Cloud Security', description: 'AWS/Azure protection', icon: Cloud, x: -0.1, y: -0.47 },
  { id: '4', title: 'Managed Security', description: '24/7 Monitoring', icon: Shield, x: 0.3, y: -0.2 },
  { id: '5', title: 'Risk Management', description: 'Threat modeling', icon: Lock, x: -0.6, y: 0.2 },
  { id: '6', title: 'Enablement Services', description: 'Training & Sims', icon: Zap, x: -0.87, y: -0.1 },
];

export const RadarSystem: React.FC<RadarSystemProps> = ({ onScan }) => {
  // Use a Ref to track rotation without re-rendering component
  const rotationRef = useRef(0);
  const beamRef = useRef<HTMLDivElement>(null);
  const centerLogoRef = useRef<HTMLDivElement>(null);

  // Track active IDs to trigger re-renders ONLY for specific icons when they light up
  const [activeServiceIds, setActiveServiceIds] = useState<Set<string>>(new Set());

  // Refs for loop management
  const requestRef = useRef<number>(0);
  const isHoveredRef = useRef(false);

  const [radius, setRadius] = useState(400);
  // const [waveAmplitude, setWaveAmplitude] = useState(1);

  // Calculate service positions and angles once based on radius
  const servicesWithPosition = useMemo(() => {
    return SERVICES_BASE.map((service) => {
      const xPixels = (service.x || 0) * radius;
      const yPixels = (service.y || 0) * radius;

      // Calculate angle for beam hit detection
      // Atan2(y, x) gives radians from +X axis.
      // We need to match the beam's rotation system.
      // Beam rotation 0 deg = Up (transform is -50% -50% then rotate).
      // CSS 0deg Usually implies upright or right depending on element?
      // In RadarIcon logic previously: radian = (angle - 90)... implies 0 was Top.
      // Let's standardise: 0 deg = Top (12 o'clock). 90 = Right.
      // Atan2: 0 = Right, 90 = Bottom.
      // So Angle = Atan2_deg + 90.
      const theta = Math.atan2(yPixels, xPixels) * (180 / Math.PI);
      const angle = (theta + 90 + 360) % 360; // Normalize 0-360

      return {
        ...service,
        angle,
        x: xPixels,
        y: yPixels
      };
    });
  }, [radius]);

  // // Pulse animation for waves (Low frequency update is fine, or move to CSS)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setWaveAmplitude(prev => 0.8 + Math.sin(Date.now() * 0.003) * 0.2);
  //   }, 50);
  //   return () => clearInterval(interval);
  // }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setRadius(250);
      else if (window.innerWidth < 1024) setRadius(350);
      else setRadius(450);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ---------------------------------------------------------------------------
  // OPTIMIZED ANIMATION LOOP
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const beamWidth = 15; // Beam width in degrees

    const animate = (timestamp: number) => {
  // 1. Update Rotation - CONSTANT FAST SPEED (no hover slowdown)
  const speed = isHoveredRef.current ? 0.9 : 1.2;// Always fast, consistent speed
  rotationRef.current = (rotationRef.current + speed) % 360;

  // 2. Direct DOM Manipulation (Zero React Render)
  if (beamRef.current) {
    beamRef.current.style.transform = `translate(-50%, -50%) rotate(${rotationRef.current}deg)`;
  }

  // 3. Check Interactions (Batch State Updates)
  if (onScan) onScan(rotationRef.current);

  const newActiveIds = new Set<string>();
  const currentRot = rotationRef.current;
  const beamHalfWidth = 10;

  // Optimized: Use for loop instead of forEach
  for (let i = 0; i < servicesWithPosition.length; i++) {
    const service = servicesWithPosition[i];
    let diff = Math.abs(currentRot - service.angle);
    diff = Math.min(diff, 360 - diff);
    
    if (diff < beamHalfWidth) {
      newActiveIds.add(service.id);
    }
  }

  // Only trigger React render if active set changes
  setActiveServiceIds(prev => {
    if (prev.size !== newActiveIds.size) return newActiveIds;
    for (let id of newActiveIds) {
      if (!prev.has(id)) return newActiveIds;
    }
    return prev;
  });

  requestRef.current = requestAnimationFrame(animate);
};

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [servicesWithPosition, onScan]); // dependencies usually stable

  // Hover handlers that don't trigger re-renders of the whole tree unnecessarily
  const handleMouseEnter = () => { isHoveredRef.current = true; };
  const handleMouseLeave = () => { isHoveredRef.current = false; };

  // Generate wave rings config static or cached
const waveRings = useMemo(() => [
  { size: 1.0, duration: '8s', opacity: 0.20, blur: 12, delay: '0s' },
  { size: 1.2, duration: '9s', opacity: 0.16, blur: 16, delay: '0.5s' },
  { size: 1.4, duration: '10s', opacity: 0.14, blur: 20, delay: '1s' },
  { size: 1.6, duration: '11s', opacity: 0.10, blur: 24, delay: '1.5s' },
  { size: 1.8, duration: '12s', opacity: 0.08, blur: 28, delay: '2s' },
  { size: 2.0, duration: '13s', opacity: 0.05, blur: 32, delay: '2.5s' },
], []);

  return (
    <div
      className="relative flex items-center justify-center w-full h-full min-h-screen overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background elements remain same... */}
      <div className="absolute inset-0 bg-transparent">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Main Radar Container */}
      <div className="relative flex items-center justify-center perspective-[1200px] z-10">

        {/* Wave Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {waveRings.map((wave, index) => (
  <div
    key={index}
    className="absolute rounded-full border border-red-400/40 gpu-accelerated"
    style={{
      width: `${radius * 2 * wave.size}px`,
      height: `${radius * 2 * wave.size}px`,
      opacity: wave.opacity,
      filter: `blur(${wave.blur * 0.8}px)`,
      animation: `smooth-pulse ${wave.duration} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
      animationDelay: wave.delay,
      boxShadow: 'inset 0 0 40px rgba(239, 68, 68, 0.4), 0 0 80px rgba(239, 68, 68, 0.3)',
      background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.08) 50%, transparent 70%)',
    }}
  />
))}

          {/* Dynamic Grid Pattern - More Visible */}
<div
            className="absolute rounded-full opacity-30"
            style={{
              width: `${radius * 2 * 1.5}px`,
              height: `${radius * 2 * 1.5}px`,
              backgroundImage: `
                conic-gradient(from 0deg at 50% 50%, 
                  transparent 0deg 45deg, 
                  rgba(239, 68, 68, 0.08) 45deg 90deg, 
                  transparent 90deg 135deg, 
                  rgba(239, 68, 68, 0.08) 135deg 180deg,
                  transparent 180deg 225deg,
                  rgba(239, 68, 68, 0.08) 225deg 270deg,
                  transparent 270deg 315deg,
                  rgba(239, 68, 68, 0.08) 315deg 360deg
                )
              `,
              maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
            }}
          />
        </div>

        {/* Static Circles */}
        {/* Static Circles - More Visible */}
<div className="absolute flex items-center justify-center pointer-events-none">
  {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => (
    <div
      key={index}
      className="absolute rounded-full border border-red-500/40 animate-spin-slow"
      style={{
        width: `${radius * 2 * scale}px`,
        height: `${radius * 2 * scale}px`,
        borderWidth: index === 0 ? '2px' : '1px',
        boxShadow: 'inset 0 0 20px rgba(239, 68, 68, 0.3), 0 0 30px rgba(239, 68, 68, 0.2)',
        opacity: 0.7 - (index * 0.1),
      }}
    />
  ))}
</div>

        {/* The Beam Container - Rotated via DOM Ref */}
        <div ref={beamRef} className="absolute left-1/2 top-1/2 will-change-transform z-10" style={{ transform: 'translate(-50%, -50%)' }}>
          <RadarBeam radius={radius * 1.2} />
        </div>

     <div className="relative z-40 flex items-center justify-center w-28 h-28 md:w-40 md:h-40 rounded-full bg-black backdrop-blur-xl border border-[var(--primary)]/20 shadow-[0_0_60px_rgba(var(--primary-rgb),0.4)] group cursor-pointer overflow-hidden transition-all duration-700 hover:scale-110 hover:shadow-[0_0_80px_rgba(var(--primary-rgb),0.6)]">
  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
  
  {/* Central Logo - Simple, no rotation */}
  <div className="relative z-10 w-10 h-10 md:w-16 md:h-16 flex items-center justify-center">
    <div className="w-8 h-8 md:w-14 md:h-14 flex items-center justify-center">
      <img
        src="/fav.svg"
        alt="Central System"
        className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 ease-out filter drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.7)]"
      />
    </div>
  </div>
  <div className="absolute -inset-2 rounded-full bg-[var(--primary)]/10 blur-md group-hover:blur-xl transition-all duration-700"></div>
</div>

        {/* Icons placed according to calculated x/y, active state from set */}
        {servicesWithPosition.map((service) => (
          <RadarIcon
            key={service.id}
            {...service}
            isActive={activeServiceIds.has(service.id)}
            x={service.x}
            y={service.y}
          />
        ))}

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="absolute rounded-full bg-[var(--primary)]/30"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: `0 0 5px rgba(var(--primary-rgb), 0.5)`
              }}
            />
          ))}
        </div>

      </div>

      <style jsx>{`
        /* Existing keyframes kept for ambient rings */
        @keyframes pulse { 0%, 100% { transform: scale(0.95); opacity: 0.1; } 50% { transform: scale(1.05); opacity: 0.4; } }
        @keyframes pulse-fast { 0%, 100% { opacity: 0.5; transform: scale(0.98); } 50% { opacity: 0.8; transform: scale(1.02); } }
        @keyframes float { 0%, 100% { transform: translateY(0) translateX(0); } 33% { transform: translateY(-10px) translateX(10px); } 66% { transform: translateY(10px) translateX(-10px); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-pulse-fast { animation: pulse-fast 1.5s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-spin-medium { animation: spin 8s linear infinite; }
        .animate-spin-medium-reverse { animation: spin 10s linear infinite reverse; }
      `}</style>
      <style jsx>{`
  /* Smoother pulse animation */
  @keyframes smooth-pulse { 
    0% { 
      transform: scale(0.98); 
      opacity: 0.15; 
    } 
    50% { 
      transform: scale(1.02); 
      opacity: 0.25; 
    }
    100% { 
      transform: scale(0.98); 
      opacity: 0.15; 
    } 
  }
  
  .animate-pulse {
    animation: smooth-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`}</style>
    </div>
  );
};