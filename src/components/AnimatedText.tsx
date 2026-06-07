import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // useScroll targeting the paragraph element with offset ['start 0.8', 'end 0.2']
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  // Count character indices globally to map scroll position
  let charCounter = 0;
  const mappedWords = words.map((word) => {
    const chars = word.split('');
    const charsWithIndices = chars.map((char) => {
      const idx = charCounter;
      charCounter++;
      return { char, idx };
    });
    // Add 1 for the trailing space
    charCounter++;
    return { chars: charsWithIndices };
  });

  const totalChars = charCounter;

  return (
    <p ref={containerRef} className={`relative ${className}`}>
      {mappedWords.map((wordData, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {wordData.chars.map(({ char, idx }) => {
            // Map scroll progress (0 to 1) to character opacity (0.2 to 1)
            const start = idx / totalChars;
            const end = Math.min(1, (idx + 4) / totalChars); // Slight overlap for smooth wave effect
            const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

            return (
              <span key={idx} className="relative inline-block">
                {/* Invisible placeholder */}
                <span className="opacity-0">{char}</span>
                {/* Absolute positioned animated span */}
                <motion.span
                  style={{ opacity }}
                  className="absolute left-0 top-0 select-none"
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {/* Add a space between words if it is not the last word */}
          {wIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </p>
  );
};
