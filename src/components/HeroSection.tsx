import { Instagram, Linkedin, Mail } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SHOWREEL', href: '#showreel' },
  { label: 'PROJECTS', href: '#projects' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/tarun_kapoor10' },
  { icon: Linkedin, href: 'https://linkedin.com' },
  { icon: Mail, href: 'mailto:contact@tarunkapoor.com' },
];

export const HeroSection = () => {
  return (
    <MinimalistHero
      logoText="Tarun Kapoor"
      navLinks={navLinks}
      mainText="A director, actor, and writer driven by compelling storytelling, rich character development, and cinematic experiences. Crafting narratives that evoke raw emotion and capture human truth."
      readMoreLink="#about"
      imageSrc="/tarun-hero.png"
      imageAlt="Tarun Kapoor — Director, Actor & Writer portrait"
      overlayText={{
        part1: "hi, i'm",
        part2: 'tarun.',
      }}
      socialLinks={socialLinks}
      locationText="Director / Actor / Writer"
    />
  );
};
