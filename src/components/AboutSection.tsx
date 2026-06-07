import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-darkBg text-textLight px-5 sm:px-8 md:px-10 py-20 flex flex-col justify-center items-center overflow-x-clip"
    >
      {/* Absolute Corner Images */}
      {/* Top-Left: Icon 1 (Director's Chair) */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 select-none pointer-events-none"
      >
        <img
          src="/1.png"
          alt="About Icon Top Left"
          className="w-[180px] sm:w-[240px] md:w-[310px] h-auto object-contain"
          style={{ transform: 'rotate(35deg)' }}
        />
      </FadeIn>

      {/* Bottom-Left: Icon 2 (Cinema Camera) */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0 select-none pointer-events-none"
      >
        <img
          src="/2.png"
          alt="About Icon Bottom Left"
          className="w-[150px] sm:w-[200px] md:w-[270px] h-auto object-contain"
          style={{ transform: 'scaleX(-1) rotate(25deg)' }}
        />
      </FadeIn>

      {/* Top-Right: Icon 3 (Clapperboard) */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 select-none pointer-events-none"
      >
        <img
          src="/3.png"
          alt="About Icon Top Right"
          className="w-[180px] sm:w-[240px] md:w-[310px] h-auto object-contain -rotate-[15deg]"
        />
      </FadeIn>

      {/* Bottom-Right: Icon 4 (Film Reel) */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0 select-none pointer-events-none"
      >
        <img
          src="/4.png"
          alt="About Icon Bottom Right"
          className="w-[190px] sm:w-[250px] md:w-[320px] h-auto object-contain -rotate-[12deg]"
        />
      </FadeIn>

      {/* Content Container */}
      <div className="flex flex-col items-center justify-center text-center z-10 w-full max-w-4xl">
        {/* Heading: About me */}
        <FadeIn delay={0} y={40} className="w-full">
          <h2 className="hero-heading uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)] font-montserrat">
            <span className="font-black">About</span> <span className="font-extralight text-foreground/60">me</span>
          </h2>
        </FadeIn>

        {/* Spacing Gap between heading and text: gap-10 sm:gap-14 md:gap-16 */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Animated paragraph */}
        <AnimatedText
          text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
          className="text-textLight font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)]"
        />
      </div>
    </section>
  );
};
