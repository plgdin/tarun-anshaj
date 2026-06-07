import React from 'react';
import { FadeIn } from './FadeIn';

interface ServiceItem {
  num: string;
  name: string;
  desc: string;
}

const servicesList: ServiceItem[] = [
  {
    num: '01',
    name: '3D Modeling',
    desc: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    num: '02',
    name: 'Rendering',
    desc: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    num: '03',
    name: 'Motion Design',
    desc: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    num: '04',
    name: 'Branding',
    desc: 'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    num: '05',
    name: 'Web Design',
    desc: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-white text-darkBg rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none mb-16 sm:mb-20 md:mb-28">
            Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="w-full max-w-5xl flex flex-col">
          {servicesList.map((service, index) => (
            <FadeIn
              key={service.num}
              delay={index * 0.1}
              y={30}
              className="border-t border-[rgba(12,12,12,0.15)] last:border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-12 w-full text-left"
            >
              {/* Number (Left) */}
              <div className="flex-shrink-0 min-w-[120px] md:min-w-[180px]">
                <span className="font-black text-[clamp(3rem,10vw,140px)] text-[#0C0C0C] leading-none select-none">
                  {service.num}
                </span>
              </div>

              {/* Name & Description (Right stacked) */}
              <div className="flex-grow flex flex-col gap-2 sm:gap-3">
                <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1.2rem,2.2vw,2.1rem)] leading-tight">
                  {service.name}
                </h3>
                <p className="font-light leading-relaxed text-[#0C0C0C] opacity-60 max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)]">
                  {service.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
