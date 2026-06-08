import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useCms } from '@/context/CmsContext';

export const ShowreelSection: React.FC = () => {
  const { data } = useCms();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001
  });

  // 1. Background "SHOWREEL" Text Animations (Scroll-linked movement & inverse scaling)
  const bgTextY = useTransform(smoothProgress, [0, 0.85, 1.0], ["15vh", "-8vh", "-8vh"]);
  const bgTextScale = useTransform(smoothProgress, [0, 0.85, 1.0], [1.05, 0.85, 0.85]);
  const bgTextOpacity = useTransform(smoothProgress, [0, 0.35, 0.75, 1.0], [0.95, 0.8, 0.0, 0.0]);

  // 2. Showcase Video Card Animations
  // Card slides up from the bottom and scales up to fill the viewport
  const cardScale = useTransform(smoothProgress, [0.05, 0.85, 1.0], [isMobile ? 0.45 : 0.3, 1.0, 1.0]);
  const cardY = useTransform(smoothProgress, [0.05, 0.85, 1.0], ["45vh", "0vh", "0vh"]);
  const cardBorderRadius = isMobile ? 24 : 40;

  const selectedVideoId = data.heroContent.slideshowVideos?.[0];
  const selectedVideo = selectedVideoId ? data.videos.find(v => v.id === selectedVideoId) : null;
  const videoUrl = selectedVideo?.videoUrl || "/6.mp4";

  return (
    <div ref={containerRef} className="hero-scroll-wrapper relative z-10" id="showreel">
      <div className="hero-sticky-container">
        {/* Big Background "SHOWREEL" Text */}
        <div className="hero-bg-text-container">
          <motion.div 
            style={{ 
              y: bgTextY,
              scale: bgTextScale,
              opacity: bgTextOpacity
            }}
            className="hero-bg-text"
          >
            SHOWREEL
          </motion.div>
        </div>

        {/* Scaling video card (Expands in-place with rounded corners and border) */}
        <div className="hero-scroll-card-container">
          <motion.div
            style={{
              scale: cardScale,
              y: cardY,
              borderRadius: cardBorderRadius
            }}
            className="hero-scroll-card-wrapper"
          >
            {/* Card inner media content */}
            <motion.div 
              style={{ borderRadius: cardBorderRadius }}
              className="hero-video-card-inner scroll-card-inner-override"
            >
              {/* Cinematic Video */}
              <video 
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover brightness-95"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
