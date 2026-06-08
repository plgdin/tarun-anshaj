import type { Video, VideoCategory } from './video';

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  behanceUrl?: string;
  email: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl?: string;
  titleFont: string;
  descriptionFont: string;
  headerFont: string;
  footerFont: string;
}

export interface PitchDeck {
  id: string;
  title: string;
  embedUrl: string;
  originalUrl: string;
  accent: string;
  thumbnail?: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  location: string;
  availability: string;
  description: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  portfolioUrl: string;
  featuredVideoUrl: string;
  featuredVideoThumbnail: string;
  backgroundImage: string;
  slideshowVideos: string[];
  marqueeRow1: string[];
  marqueeRow2: string[];
}

export interface FooterContent {
  description: string;
  copyright: string;
}

export interface AboutContent {
  heroDescription: string;
  aboutDescription: string;
}

export interface CmsData {
  siteSettings: SiteSettings;
  heroContent: HeroContent;
  aboutContent: AboutContent;
  categories: VideoCategory[];
  videos: Video[];
  footerContent: FooterContent;
  pitchDecks: PitchDeck[];
}
