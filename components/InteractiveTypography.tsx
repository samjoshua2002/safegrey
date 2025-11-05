import { useState } from 'react';

interface InteractiveTypographyProps {
  text: string;
  className?: string;
  highlightColor?: string;
}

export default function InteractiveTypography({
  text,
  className = '',
  highlightColor = 'text-red-500'
}: InteractiveTypographyProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const words = text.split(' ');

  return (
    <h2 className={`${className} leading-tight`}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block mr-3 transition-all duration-300 cursor-default ${
            hoveredIndex === index ? `${highlightColor} scale-110` : ''
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {word}
        </span>
      ))}
    </h2>
  );
}
