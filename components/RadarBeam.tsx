import React from 'react';

interface RadarBeamProps {
  rotation: number;
  radius: number;
}

export const RadarBeam: React.FC<RadarBeamProps> = ({ rotation, radius }) => {
  return (
    <div
      className="absolute left-1/2 top-1/2 pointer-events-none z-10"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      {/* 
         The "Smooth Shade" Beam. 
      */}

      {/* Layer 1: Wide, very soft ambient glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 300deg,
            transparent 315deg,
            var(--primary) 360deg,
            transparent 45deg,
            transparent 60deg
          )`,
          // Mask fading out at center (to avoid hard point) and outer edge
          maskImage: 'radial-gradient(circle at center, transparent 0%, black 30%, black 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, black 30%, black 70%, transparent 100%)',
          filter: 'blur(25px)',
          transform: 'scale(1.2)', // Make it bleed slightly outside
          mixBlendMode: 'screen',
          opacity: 0.2
        }}
      />

      {/* Layer 2: Core beam - narrower and smoother definition */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 330deg,
            transparent 340deg,
            var(--primary) 360deg,
            transparent 20deg,
            transparent 30deg
          )`,
          maskImage: 'radial-gradient(circle at center, transparent 10%, black 30%, black 80%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 10%, black 30%, black 80%, transparent 100%)',
          filter: 'blur(12px)',
          mixBlendMode: 'plus-lighter',
          opacity: 0.5
        }}
      />

      {/* Layer 3: Central Highlight Ray (Very subtle spine) */}
      <div
        className="absolute left-1/2 top-1/2 w-[4px] h-[55%] origin-bottom rounded-full"
        style={{
          background: 'linear-gradient(to top, var(--primary), transparent)',
          transform: 'translate(-50%, -100%)',
          filter: 'blur(8px)',
          opacity: 0.4
        }}
      />

    </div>
  );
};