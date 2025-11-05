import { useEffect, useState } from 'react';

interface GridMotionProps {
  items: string[];
  gradientColor?: string;
}

export default function GridMotion({ items, gradientColor = 'rgba(0, 0, 0, 0.8)' }: GridMotionProps) {
  const [positions, setPositions] = useState<{ x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    const newPositions = items.map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setPositions(newPositions);

    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((pos) => ({
          x: (pos.x + Math.random() * 2 - 1) % 100,
          y: (pos.y + Math.random() * 2 - 1) % 100,
          opacity: Math.random() * 0.3 + 0.1,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item, index) => (
        <div
          key={index}
          className="absolute text-xs font-mono text-zinc-600 transition-all duration-3000 ease-in-out"
          style={{
            left: `${positions[index]?.x || 0}%`,
            top: `${positions[index]?.y || 0}%`,
            opacity: positions[index]?.opacity || 0.1,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
