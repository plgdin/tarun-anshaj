import { Instagram, Linkedin, Mail, Youtube } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

import { useCms } from '@/context/CmsContext';

export const HeroSection = () => {
  const { data } = useCms();
  const { siteSettings } = data;

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
      mainText={data.heroContent.description || "A director, actor, and writer driven by compelling storytelling, rich character development, and cinematic experiences. Crafting narratives that evoke raw emotion and capture human truth."}
      readMoreLink="#about"
      imageSrc="/tarun-hero.png"
      imageAlt={siteSettings.siteName || "Tarun Kapoor — Director, Actor & Writer portrait"}
      overlayText={{
        part1: data.heroContent.ctaPrimaryText || "hi, i'm",
        part2: data.heroContent.ctaSecondaryText || 'tarun.',
      }}
      socialLinks={socialLinks}
      locationText={data.heroContent.badge || "Director / Actor / Writer"}
    />
  );
};
