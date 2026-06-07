import React from 'react';
import { FadeIn } from './FadeIn';
import { Mail, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const socialLinks = [
    { name: 'Email', icon: Mail, url: 'mailto:tarun@3dcreator.com', handle: 'tarun@3dcreator.com' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com', handle: 'Tarun Kapoor' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/tarun_kapoor10', handle: '@tarun_kapoor10' },
  ];

  return (
    <section
      id="contact"
      className="bg-darkBg text-textLight px-6 md:px-10 py-24 sm:py-32 relative overflow-hidden border-t border-[#D7E2EA]/10"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#B600A8]/10 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* Heading */}
        <FadeIn delay={0} y={30} className="z-10">
          <h2 className="hero-heading uppercase text-[clamp(2.5rem,10vw,120px)] leading-none mb-6 font-montserrat">
            <span className="font-black">Get</span> <span className="font-extralight text-foreground/60">In Touch</span>
          </h2>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.15} y={20} className="z-10 max-w-lg mb-12 sm:mb-16">
          <p className="text-textLight/70 font-light tracking-wide text-sm sm:text-base md:text-lg leading-relaxed uppercase">
            driven by crafting striking and unforgettable projects. Let&apos;s talk about your next vision.
          </p>
        </FadeIn>

        {/* Socials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl z-10 mb-20">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <FadeIn
                key={social.name}
                delay={0.2 + index * 0.08}
                y={20}
                className="w-full"
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-[#D7E2EA]/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#D7E2EA]/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 sm:p-3 rounded-xl bg-white/[0.04] text-textLight group-hover:text-[#B600A8] transition-colors">
                      <Icon size={20} />
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-[#D7E2EA]/50 uppercase tracking-wider block">
                        {social.name}
                      </span>
                      <span className="text-sm sm:text-base font-medium text-textLight">
                        {social.handle}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-[#D7E2EA]/40 group-hover:text-textLight group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </a>
              </FadeIn>
            );
          })}
        </div>

        {/* Footer info */}
        <FadeIn delay={0.5} y={10} className="z-10 text-xs sm:text-sm text-[#D7E2EA]/40 uppercase tracking-widest mt-8">
          <p>© {new Date().getFullYear()} TARUN KAPOOR. ALL RIGHTS RESERVED.</p>
        </FadeIn>
      </div>
    </section>
  );
};
