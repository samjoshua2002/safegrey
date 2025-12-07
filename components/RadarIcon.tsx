import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface RadarIconProps {
  icon: LucideIcon;
  title: string;
  isActive: boolean; // Simplified prop
  intensity?: number; // Optional intensity for smooth fade
  x?: number;
  y?: number;
}

export const RadarIcon = React.memo(({
  icon: Icon,
  title,
  isActive,
  intensity = 0,
  x = 0,
  y = 0
}: RadarIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Combine beam activity and manual hover
  const showActive = isActive || isHovered;

  // Use passed intensity or max if hovered
  const currentIntensity = isHovered ? 1 : intensity;

  return (
    <div
      className="absolute flex flex-col items-center justify-center z-20 pointer-events-auto cursor-pointer group"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        left: '50%',
        top: '50%',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon Circle */}
      <div
        className={`
          relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center
          border backdrop-blur-md transition-all duration-300 ease-out
        `}
        style={{
          // Use CSS variables or calc for smoother updates if intensity is rapid
          backgroundColor: showActive ? 'rgba(var(--primary-rgb), 0.2)' : 'rgba(0, 0, 0, 0.6)',
          borderColor: showActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: showActive
            ? `0 0 ${20 + (currentIntensity * 30)}px var(--primary), inset 0 0 10px rgba(var(--primary-rgb), 0.5)`
            : '0 0 0px transparent',
          color: showActive ? 'white' : '#94a3b8',
          transform: showActive ? 'scale(1.1)' : 'scale(1.0)'
        }}
      >
        <Icon
          size={24}
          className={`
            relative z-10 transition-transform duration-300 ease-out
            ${showActive ? 'scale-110' : 'scale-100'}
          `}
        />

        {/* Inner ring for aesthetic */}
        <div className={`absolute inset-1 rounded-full border border-dashed border-white/20 transition-opacity duration-500 ${showActive ? 'animate-spin-slow opacity-100' : 'opacity-0'}`}></div>
      </div>

      {/* Tooltip Name Label */}
      <div
        className={`
          absolute top-full mt-4 px-3 py-1.5 rounded-lg
          bg-black/90 border border-[var(--primary)]/30 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]
          text-center whitespace-nowrap z-30
          transition-all duration-300 ease-out
          ${showActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-90 pointer-events-none'}
        `}
      >
        <div className="text-xs md:text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
          {title}
          {/* Tiny status dot in tooltip */}
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse shadow-[0_0_8px_var(--primary)]"></span>
        </div>
        {/* Little triangle arrow */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-t border-l border-[var(--primary)]/30 rotate-45"></div>
      </div>
    </div>
  );
});

RadarIcon.displayName = 'RadarIcon';