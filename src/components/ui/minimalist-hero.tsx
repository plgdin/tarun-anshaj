// @ts-nocheck
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-base md:text-lg font-semibold tracking-wider text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  const [scale, setScale] = React.useState(1.9);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScale(1.5);
      } else if (window.innerWidth < 768) {
        setScale(1.6);
      } else if (window.innerWidth < 1024) {
        setScale(1.7);
      } else if (window.innerWidth < 1536) {
        setScale(1.8);
      } else {
        setScale(1.9);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-4 sm:p-8 font-sans md:p-12 pt-24 md:pt-32',
        className
      )}
    >
      {/* Sticky Header with Backdrop Blur */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full flex justify-center border-b border-foreground/5 bg-background/50 backdrop-blur-md px-6 py-4 sm:px-8 md:px-12">
        <div className="flex w-full max-w-7xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl tracking-tight font-montserrat"
          >
            {(() => {
              const parts = logoText.split(' ');
              if (parts.length >= 2) {
                return (
                  <>
                    <span className="font-black text-foreground">{parts[0]}</span>{' '}
                    <span className="font-extralight text-foreground/60">{parts.slice(1).join(' ')}</span>
                  </>
                );
              }
              return <span className="font-black text-foreground">{logoText}</span>;
            })()}
          </motion.div>
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-1.5 md:hidden focus:outline-none p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-foreground"></span>
            <span className="block h-0.5 w-6 bg-foreground"></span>
            <span className="block h-0.5 w-5 bg-foreground"></span>
          </motion.button>
        </div>
      </header>

      {/* Mobile Overlay Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-0 z-50 flex flex-col bg-background/95 p-6 shadow-2xl border-b border-foreground/10 backdrop-blur-lg md:hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="text-2xl font-black text-foreground">
                {logoText.split(' ')[0]} <span className="font-extralight text-foreground/60">{logoText.split(' ').slice(1).join(' ')}</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground focus:outline-none p-1"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col space-y-6 text-center pb-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold tracking-wider text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area - Grid Column Order Optimized for Responsiveness */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-[1fr_1.5fr_1fr] gap-y-8 sm:gap-y-10 md:gap-x-8 lg:gap-x-16 xl:gap-x-24 py-8 md:py-0">
        
        {/* Left Text Content - Displays last on mobile (order-3), first on desktop (md:order-1) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-3 md:order-1 text-center md:text-left px-4 md:px-0"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">{mainText}</p>
          <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font">
            Read More
          </a>
        </motion.div>

        {/* Center Image with Circle - Displays middle on mobile (order-2), middle on desktop (md:order-2) */}
        <div className="relative order-2 md:order-2 flex justify-center items-center h-full w-full py-2 md:py-0">
          <div className="relative flex items-end justify-center w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[300px] lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px] 2xl:w-[480px] 2xl:h-[480px]">

            {/* Yellow Circle Backdrop */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="absolute inset-0 rounded-full bg-yellow-500/80 shadow-[0_0_40px_rgba(234,179,8,0.15)]"
            ></motion.div>

            {/* 1. Clipped Image (Bottom portion of body is cut off by the circle shape) */}
            <div className="absolute inset-0 rounded-full overflow-hidden flex items-end justify-center">
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 w-32 h-[140px] sm:w-36 sm:h-[170px] md:w-44 md:h-[220px] lg:w-52 lg:h-[280px] xl:w-56 xl:h-[300px] 2xl:w-64 2xl:h-[350px] object-cover object-top origin-bottom"
                initial={{ opacity: 0, y: 50, scale }}
                animate={{ opacity: 1, y: 0, scale }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                }}
              />
            </div>

            {/* 2. Unclipped Image (Top portion of body/head pops out of the circle boundary) */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-20 w-32 h-[140px] sm:w-36 sm:h-[170px] md:w-44 md:h-[220px] lg:w-52 lg:h-[280px] xl:w-56 xl:h-[300px] 2xl:w-64 2xl:h-[350px] object-cover object-top origin-bottom"
                style={{
                  clipPath: 'inset(0% 0% 30% 0%)'
                }}
                initial={{ opacity: 0, y: 50, scale }}
                animate={{ opacity: 1, y: 0, scale }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                }}
              />
            </div>

          </div>
        </div>

        {/* Right Text - Displays first on mobile (order-1), last on desktop (md:order-3) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-1 md:order-3 flex items-center justify-center text-center md:justify-start"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground font-montserrat tracking-tight leading-none uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <span className="font-extralight text-foreground/75">{overlayText.part1}</span>
            <br />
            <span className="font-black text-foreground">{overlayText.part2}</span>
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between mt-8 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};

