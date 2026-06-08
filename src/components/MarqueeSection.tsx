import React, { useRef, useState, useEffect } from 'react';

const row1Images = [
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
];

const row2Images = [
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1503095391755-111c1867e997?w=600&auto=format&fit=crop&q=80',
];

// Tripled lists for seamless scrolling illusion
const row1Tripled = [...row1Images, ...row1Images, ...row1Images];
const row2Tripled = [...row2Images, ...row2Images, ...row2Images];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

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
