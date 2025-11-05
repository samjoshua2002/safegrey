import { useState, useEffect } from 'react';

interface FlowingMenuProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
}

export default function FlowingMenu({ items, direction = 'left', speed = 50 }: FlowingMenuProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        const newOffset = direction === 'left' ? prev - 1 : prev + 1;
        return Math.abs(newOffset) >= 2000 ? 0 : newOffset;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, speed]);

  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden py-8 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-3 text-zinc-400 hover:text-red-500 transition-colors duration-300 cursor-pointer"
          >
            <span className="text-sm font-medium uppercase tracking-wider">{item}</span>
            <span className="text-red-500">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
