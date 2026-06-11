import { Instagram, Linkedin, Mail } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { useCms } from '@/context/CmsContext';

export const HeroSection = () => {
  const { data } = useCms();
  const { siteSettings, aboutContent, heroContent } = data;

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

  const siteName = siteSettings.siteName || "Tarun Kapoor";
  const firstName = siteName.split(' ')[0].toLowerCase();

  const rawDescription = aboutContent?.heroDescription || "A director, writer, and storyteller driven by compelling storytelling, rich character development, and cinematic experiences. Crafting narratives that evoke raw emotion and capture human truth.";
  const badgeText = heroContent.badge || "Director / Writer / Story";

  let processedMainText = rawDescription;
  
  // Extract words (ignore special characters like slashes, dashes, spaces, etc.)
  const badgeWords = badgeText
    .split(/[^a-zA-Z0-9]+/)
    .map(w => w.trim())
    .filter(w => w.length > 0);

  if (badgeWords.length >= 3) {
    const w1 = badgeWords[0].toLowerCase();
    const w2 = badgeWords[1].toLowerCase();
    const w3 = badgeWords[2].toLowerCase();
    const article = /^[aeiou]/i.test(w1) ? "An" : "A";
    const newPrefix = `${article} ${w1}, ${w2}, and ${w3}`;

    const drivenByMatch = rawDescription.match(/driven\s+by/i);
    if (drivenByMatch && drivenByMatch.index !== undefined) {
      processedMainText = `${newPrefix} ${rawDescription.slice(drivenByMatch.index)}`;
    } else {
      const replaced = rawDescription.replace(/^(An?|an?)\s+[a-zA-Z0-9]+,\s+[a-zA-Z0-9]+,\s+and\s+[a-zA-Z0-9]+/i, newPrefix);
      if (replaced !== rawDescription) {
        processedMainText = replaced;
      }
    }
  }

  return (
    <MinimalistHero
      logoText={siteName}
      navLinks={navLinks}
      mainText={processedMainText}
      readMoreLink="#about"
      imageSrc={heroContent.backgroundImage || "/tarun-hero.png"}
      imageAlt={`${siteName} — Portrait`}
      overlayText={{
        part1: "hi, i'm",
        part2: `${firstName}.`,
      }}
      socialLinks={socialLinks}
      locationText={badgeText}
      popOutImage={heroContent.popOutHeroImage ?? true}
      heroImageScale={heroContent.heroImageScale}
      heroImageXOffset={heroContent.heroImageXOffset}
      heroImageYOffset={heroContent.heroImageYOffset}
      circleColor={heroContent.circleColor}
    />
  );
};
