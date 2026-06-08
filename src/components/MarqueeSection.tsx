import React, { useRef, useState, useEffect } from 'react';
import { useCms } from '@/context/CmsContext';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const { data } = useCms();

  const row1Images = data.heroContent?.marqueeRow1 || [];
  const row2Images = data.heroContent?.marqueeRow2 || [];

  // Tripled lists for seamless scrolling illusion
  const row1Tripled = [...row1Images, ...row1Images, ...row1Images];
  const row2Tripled = [...row2Images, ...row2Images, ...row2Images];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Calculate sectionTop as the absolute offset relative to document
      const sectionTop = rect.top + window.scrollY;
      // Scroll offset formula: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const computedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(computedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial compute

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-darkBg pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full flex flex-col gap-3"
    >
      {/* Row 1: Moves RIGHT on scroll (translateX(offset - 200)) */}
      <div className="w-full flex">
        <div
          className="flex gap-3 transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${offset - 200}px, 0px, 0px)`,
            willChange: 'transform',
          }}
        >
          {row1Tripled.map((imgUrl, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 w-[420px] h-[270px] select-none"
            >
              <img
                src={imgUrl}
                alt={`Marquee Row 1 Tile ${index}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moves LEFT on scroll (translateX(-(offset - 200))) */}
      <div className="w-full flex justify-end">
        <div
          className="flex gap-3 transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${-(offset - 200)}px, 0px, 0px)`,
            willChange: 'transform',
          }}
        >
          {row2Tripled.map((imgUrl, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 w-[420px] h-[270px] select-none"
            >
              <img
                src={imgUrl}
                alt={`Marquee Row 2 Tile ${index}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
