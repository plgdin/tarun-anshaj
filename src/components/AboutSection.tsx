import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { useCms } from '@/context/CmsContext';

export const AboutSection: React.FC = () => {
  const { data } = useCms();

  return (
    <section
      id="about"
      className="relative min-h-screen bg-darkBg text-textLight px-5 sm:px-8 md:px-10 py-20 flex flex-col justify-center items-center overflow-x-clip"
    >
      {/* Absolute Corner Images - Made highly responsive with scaling and custom opacity scales */}
      {/* Top-Left: Icon 1 (Director's Chair) */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 select-none pointer-events-none opacity-20 sm:opacity-40 lg:opacity-85 xl:opacity-100"
      >
        <img
          src="/1.png"
          alt="About Icon Top Left"
          className="w-[120px] sm:w-[180px] md:w-[240px] lg:w-[290px] xl:w-[310px] h-auto object-contain"
          style={{ transform: 'rotate(35deg)' }}
        />
      </FadeIn>

      {/* Bottom-Left: Icon 2 (Cinema Camera) */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0 select-none pointer-events-none opacity-20 sm:opacity-40 lg:opacity-85 xl:opacity-100"
      >
        <img
          src="/2.png"
          alt="About Icon Bottom Left"
          className="w-[100px] sm:w-[150px] md:w-[200px] lg:w-[240px] xl:w-[270px] h-auto object-contain"
          style={{ transform: 'scaleX(-1) rotate(25deg)' }}
        />
      </FadeIn>

      {/* Top-Right: Icon 3 (Clapperboard) */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 select-none pointer-events-none opacity-20 sm:opacity-40 lg:opacity-85 xl:opacity-100"
      >
        <img
          src="/3.png"
          alt="About Icon Top Right"
          className="w-[120px] sm:w-[180px] md:w-[240px] lg:w-[290px] xl:w-[310px] h-auto object-contain -rotate-[15deg]"
        />
      </FadeIn>

      {/* Bottom-Right: Icon 4 (Film Reel) */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0 select-none pointer-events-none opacity-20 sm:opacity-40 lg:opacity-85 xl:opacity-100"
      >
        <img
          src="/4.png"
          alt="About Icon Bottom Right"
          className="w-[130px] sm:w-[180px] md:w-[240px] lg:w-[290px] xl:w-[320px] h-auto object-contain -rotate-[12deg]"
        />
      </FadeIn>

      {/* Content Container */}
      <div className="flex flex-col items-center justify-center text-center z-10 w-full max-w-4xl px-4">
        {/* Heading: About me */}
        <FadeIn delay={0} y={40} className="w-full">
          <h2 className="hero-heading uppercase leading-none tracking-tight text-center text-[clamp(2.5rem,10vw,140px)] font-montserrat">
            <span className="font-black">About</span> <span className="font-extralight text-foreground/60">me</span>
          </h2>
        </FadeIn>

        {/* Spacing Gap */}
        <div className="h-8 sm:h-12 md:h-16" />

        {/* Animated paragraph with filmmaker focus */}
        <AnimatedText
          text={data.aboutContent.description1 || "As a director, actor, and screenwriter, I focus on crafting rich visual narratives, compelling character development, and unforgettable cinematic journeys. I truly enjoy collaborating on projects that challenge boundaries and tell deep human truths. Let's create something extraordinary together!"}
          className="text-textLight font-medium text-center leading-relaxed max-w-[640px] text-[clamp(0.95rem,2vw,1.3rem)]"
        />
      </div>
    </section>
  );
};

