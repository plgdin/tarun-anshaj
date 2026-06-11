import { Instagram, Linkedin, Mail, Youtube } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

import { useCms } from '@/context/CmsContext';

export const HeroSection = () => {
  const { data } = useCms();
  const { siteSettings, aboutContent } = data;

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SHOWREEL', href: '#showreel' },
    { label: 'PROJECTS', href: '#projects' },
  ];

  const socialLinks = [
    { icon: Instagram, href: siteSettings.instagramUrl || 'https://instagram.com/tarun_kapoor10' },
    { icon: Linkedin, href: siteSettings.linkedinUrl || 'https://linkedin.com' },
    { icon: Mail, href: siteSettings.email ? `mailto:${siteSettings.email}` : 'mailto:tarun@3dcreator.com' },
  ];
  return (
    <MinimalistHero
      logoText={siteSettings.siteName || "Tarun Kapoor"}
      navLinks={navLinks}
      mainText={aboutContent?.heroDescription || "A director, writer, and storyteller driven by compelling storytelling, rich character development, and cinematic experiences. Crafting narratives that evoke raw emotion and capture human truth."}
      readMoreLink="#about"
      imageSrc="/tarun-hero.png"
      imageAlt="Tarun Kapoor — Director, Writer & Storyteller portrait"
      overlayText={{
        part1: "hi, i'm",
        part2: 'tarun.',
      }}
      socialLinks={socialLinks}
      locationText="Director / Writer / Story"
    />
  );
};
