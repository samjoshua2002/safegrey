import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Shield, Search, Cloud, Lock, BarChart3, Zap } from 'lucide-react';
import { RadarIcon } from './RadarIcon';
import { RadarBeam } from './RadarBeam';
import { SecurityService } from '../types';

interface RadarSystemProps {
  onScan?: (angle: number) => void;
}

// Manual placement: x and y are multipliers of the radius (0,0 is center)
// Range roughly -1.0 to 1.0 (or even more if needed)
const SERVICES_BASE: SecurityService[] = [
  { id: '1', title: 'Security Assessment', description: 'Vulnerability scanning', icon: Search, x: -0.1, y: 0.32 },
  { id: '2', title: 'Posture Assessment', description: 'Compliance checks', icon: BarChart3, x: -0.49, y: -0.5 },
  { id: '3', title: 'Cloud Security', description: 'AWS/Azure protection', icon: Cloud, x: -0.1, y: -0.47 },
  { id: '4', title: 'Managed Security', description: '24/7 Monitoring', icon: Shield, x: 0.3, y: -0.2 },
  { id: '5', title: 'Risk Management', description: 'Threat modeling', icon: Lock, x: -0.6, y: 0.2 },
  { id: '6', title: 'Enablement Services', description: 'Training & Sims', icon: Zap, x: -0.87, y: -0.1 },
];

export const RadarSystem: React.FC<RadarSystemProps> = ({ onScan }) => {
  const [rotation, setRotation] = useState(0);
  const requestRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [radius, setRadius] = useState(400);
  const [waveAmplitude, setWaveAmplitude] = useState(1);

  // Generate pulsing animation for waves
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveAmplitude(prev => 0.8 + Math.sin(Date.now() * 0.003) * 0.2);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Use useMemo to just map the static services, but we need radius for the actual pixels
  // We'll calculate the pixel x/y during render or here dependent on radius
  const servicesWithPosition = useMemo(() => {
    return SERVICES_BASE.map((service) => {
      // Calculate absolute pixels based on manual multipliers and current radius
      // Fallback to 0 if undefined (shouldn't happen with our config)
      const xPixels = (service.x || 0) * radius;
      const yPixels = (service.y || 0) * radius;

      // Calculate an approximate "angle" for the beam interaction logic if needed
      // atan2 returns angle in radians, convert to degrees (0 is right, -90 is up/12 o'clock in many math systems, 
      // but our beam rotation might be 0 at top or right. Let's assume standard behavior first.
      // RadarIcon logic expects: const radian = (angle - 90) * ... implies 0deg is Top (if expected math holds).
      // Let's reverse engineer: angle 90 -> (0)*PI -> cos=1, sin=0 -> x=r, y=0 (Right). Correct.
      // So 0 deg -> -90 rad -> x=0, y=-r (Top).

      // Atan2(y, x) gives angle from X axis.
      // degrees = atan2(y, x) * 180/PI
      // To match "0 is Top" system where 90 is Right:
      // Standard geometric: 0 is Right, 90 is Bottom (screen coords y+ is down).
      // Let's just pass a 'simulated' angle for the beam logic.
      const theta = Math.atan2(yPixels, xPixels) * (180 / Math.PI);
      // Convert to "0 is Top, Clockwise" if that's what RadarIcon uses? 
      // RadarIcon: radian = (angle - 90)... x = cos... 
      // If angle=0, rad=-PI/2 (-90). cos(0)=0. sin(-90)=-1. y=-r (Top).
      // So RadarIcon expects 0 at Top, 90 at Right.

      // Theta from atan2(y,x) (Screen coords: y down is positive):
      // Right (x+, y0): 0. Bottom (x0, y+): 90. Left (x-, y0): 180. Top (x0, y-): -90.
      // We need: Top (-90 geometric) -> 0. Right (0 geometric) -> 90.
      // formula: angle = theta + 90.
      const angle = theta + 90;

      return {
        ...service,
        angle, // Used for beam detection
        x: xPixels,
        y: yPixels,
        distanceFactor: 1 // Not used for manual x/y but kept for type compat if needed
      };
    });
  }, [radius]); // Re-calc when radius changes

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius(250);
      } else if (window.innerWidth < 1024) {
        setRadius(350);
      } else {
        setRadius(450);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const animate = () => {
    setRotation(prevAngle => {
      const speed = isHovered ? 0.05 : 0.2;
      const nextAngle = (prevAngle + speed) % 360;

      if (onScan) {
        onScan(nextAngle);
      }

      return nextAngle;
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHovered, onScan]);

  // Generate wave rings with different properties
 const waveRings = [
  { size: 1.0, speed: 1.1, opacity: 0.18, blur: 12, delay: 0 },
  { size: 1.2, speed: 1.0, opacity: 0.14, blur: 16, delay: 60 },
  { size: 1.4, speed: 0.9, opacity: 0.12, blur: 20, delay: 120 },
  { size: 1.6, speed: 0.8, opacity: 0.08, blur: 24, delay: 180 },
  { size: 1.8, speed: 0.7, opacity: 0.05, blur: 28, delay: 240 },
  { size: 2.0, speed: 0.6, opacity: 0.03, blur: 32, delay: 300 },
];

  return (
    <div
      className="relative flex items-center justify-center w-full h-full min-h-[600px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient - Minimal & Red-Tinted */}
      <div className="absolute inset-0 bg-transparent">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--theme-accent-dim)]/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Main Radar Container */}
      <div className="relative flex items-center justify-center perspective-[1200px] z-10">

        {/* Enhanced Animated Wave Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {waveRings.map((wave, index) => (
            <div
              key={index}
              className="absolute rounded-full border border-[var(--primary)]/30"
              style={{
                width: `${radius * 2 * wave.size}px`,
                height: `${radius * 2 * wave.size}px`,
                opacity: wave.opacity * waveAmplitude * 1.5,
                filter: `blur(${wave.blur * 0.8}px)`, // Sharpen slightly
                animation: `pulse ${3 / wave.speed}s ease-in-out infinite`,
                animationDelay: `${wave.delay}ms`,
                boxShadow: `
                  inset 0 0 ${20 * wave.size}px rgba(var(--primary-rgb), 0.2),
                  0 0 ${40 * wave.size}px rgba(var(--primary-rgb), 0.1)
                `,
                background: `radial-gradient(circle, 
                  rgba(var(--primary-rgb), ${0.05 * waveAmplitude}) 0%,
                  transparent 70%
                )`,
              }}
            />
          ))}

          {/* Dynamic Grid Pattern - Red Tinted */}
          <div
            className="absolute rounded-full"
            style={{
              width: `${radius * 2 * 1.5}px`,
              height: `${radius * 2 * 1.5}px`,
              backgroundImage: `
                radial-gradient(circle at 30% 30%, rgba(var(--primary-rgb),0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(var(--primary-rgb),0.05) 0%, transparent 50%),
                conic-gradient(from 0deg, transparent 0deg 90deg, rgba(var(--primary-rgb),0.05) 90deg 180deg, transparent 180deg 270deg, rgba(var(--primary-rgb),0.05) 270deg 360deg)
              `,
            }}
          />
        </div>

        {/* Concentric Reference Circles - Red Tinted */}
        <div className="absolute flex items-center justify-center pointer-events-none">
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => (
            <div
              key={index}
              className="absolute rounded-full border border-[var(--primary)]/10"
              style={{
                width: `${radius * 2 * scale}px`,
                height: `${radius * 2 * scale}px`,
                boxShadow: 'inset 0 0 20px rgba(var(--primary-rgb),0.05)',
                background: index % 2 === 0
                  ? 'radial-gradient(circle, transparent 70%, rgba(var(--primary-rgb),0.02) 100%)'
                  : 'transparent',
              }}
            />
          ))}
        </div>

        {/* Radar Scan Lines */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[var(--primary)]/20 to-transparent"
              style={{
                transform: `translate(-50%, -50%) rotate(${index * 30}deg)`,
                transformOrigin: 'center center',
              }}
            />
          ))}
        </div>

        {/* The Beam */}
        <RadarBeam rotation={rotation} radius={radius * 1.5} />

        {/* Central Hub - Enhanced - Pure Dark & Red */}
        <div className="relative z-40 flex items-center justify-center w-28 h-28 md:w-40 md:h-40 rounded-full bg-black backdrop-blur-xl border border-[var(--primary)]/20 shadow-[0_0_60px_rgba(var(--primary-rgb),0.4)] group cursor-pointer overflow-hidden transition-all duration-700 hover:scale-110 hover:shadow-[0_0_80px_rgba(var(--primary-rgb),0.6)] animate-bounce-slow">
          {/* Glowing core effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-fast"></div>

          {/* Inner rotating rings - Faster */}
          <div className="absolute inset-4 rounded-full border border-[var(--primary)]/40 animate-spin-medium"></div>
          <div className="absolute inset-6 rounded-full border border-[var(--primary)]/20 animate-spin-medium-reverse"></div>

          {/* Central logo with enhanced effects - Smaller */}
          <div
            className="relative z-10 w-10 h-10 md:w-16 md:h-16 flex items-center justify-center"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <img
              src="/fav.svg"
              alt="Central System"
              className="w-8 h-8 md:w-14 md:h-14 object-contain opacity-90 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 ease-out filter drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.7)]"
            />
            {/* Logo glow effect */}
            <div className="absolute inset-0 rounded-full bg-[var(--primary)]/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          </div>

          {/* Outer glow */}
          <div className="absolute -inset-2 rounded-full bg-[var(--primary)]/10 blur-md group-hover:blur-xl transition-all duration-700"></div>
        </div>

        {/* Icons placed at calculated angles */}
        {servicesWithPosition.map((service) => (
          <RadarIcon
            key={service.id}
            {...service}
            currentRotation={rotation}
            radius={radius} // Passed radius isn't strictly needed for pos anymore if x/y are passed, but RadarIcon uses it for other things maybe? No, just pos.
            x={service.x}
            y={service.y}
          />
        ))}

        {/* Floating Particles - Red Tinted */}
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

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(0.95);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.4;
          }
        }

        @keyframes pulse-fast {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-10px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }

        @keyframes bounce-slow {
             0%, 100% { transform: translateY(0); }
             50% { transform: translateY(-5px); }
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .animate-pulse-fast {
           animation: pulse-fast 1.5s ease-in-out infinite;
        }

        .animate-bounce-slow {
            animation: bounce-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin 25s linear infinite reverse;
        }
        
        .animate-spin-medium {
          animation: spin 8s linear infinite;
        }
        
        .animate-spin-medium-reverse {
          animation: spin 10s linear infinite reverse;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};