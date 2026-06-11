import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useCms } from '@/context/CmsContext';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { Video } from '@/types/video';

const getShortTitle = (title: string) => {
  if (title.includes('|')) return title.split('|')[0].trim();
  if (title.includes('—')) return title.split('—')[0].trim();
  if (title.includes('-')) return title.split('-')[0].trim();
  return title;
};

export const ShowreelSection: React.FC = () => {
  const { data } = useCms();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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

  // Controls Panel Opacity (only fades in when fully expanded)
  const overlayOpacity = useTransform(smoothProgress, [0.75, 0.9], [0, 1]);

  // Extract Direction category videos
  const directionVideosRaw = data.videos.filter(v => v.category === 'youtube');
  
  // Deduplicate direction videos by short title
  const directionVideos: Video[] = [];
  const seenTitles = new Set<string>();
  directionVideosRaw.forEach(vid => {
    const shortTitle = getShortTitle(vid.title).toLowerCase();
    if (!seenTitles.has(shortTitle)) {
      seenTitles.add(shortTitle);
      directionVideos.push(vid);
    }
  });

  const defaultVideo = directionVideos.find(v => v.title.toLowerCase().includes('budweiser')) || directionVideos[0];
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  useEffect(() => {
    if (defaultVideo && (!activeVideo || !directionVideos.some(v => v.id === activeVideo.id))) {
      setActiveVideo(defaultVideo);
    }
  }, [defaultVideo]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVideoSelect = (video: Video) => {
    setActiveVideo(video);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.src = video.videoUrl;
      videoRef.current.load();
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Video play interrupted:", err));
    }
  };

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
                ref={videoRef}
                src={activeVideo?.videoUrl || "/6.mp4"}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover brightness-95"
              />

              {/* Sleek Interactive Controls Panel Overlay */}
              <motion.div 
                style={{ opacity: overlayOpacity }}
                className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col md:flex-row md:items-end justify-between gap-4 z-20 pointer-events-auto"
              >
                {/* Currently Playing Info & Mute/Play Controls */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest text-yellow-500 uppercase">DIRECTING WORK</span>
                  <h3 className="text-lg sm:text-2xl font-black text-white font-montserrat uppercase leading-tight">
                    {activeVideo?.title || "Budweiser Film"}
                  </h3>
                  
                  {/* Play & Mute Control Buttons */}
                  <div className="flex items-center gap-3 mt-1 sm:mt-2">
                    <button 
                      onClick={togglePlay}
                      className="p-2 sm:p-3 rounded-full bg-white text-black hover:bg-white/90 transition-all flex items-center justify-center shadow-lg pointer-events-auto cursor-pointer"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black text-black" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black text-black" />}
                    </button>
                    <button 
                      onClick={toggleMute}
                      className="p-2 sm:p-3 rounded-full bg-white/10 text-white border border-white/10 hover:bg-white/20 transition-all flex items-center justify-center backdrop-blur-sm pointer-events-auto cursor-pointer"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </button>
                  </div>
                </div>

                {/* Option Selector List */}
                <div className="flex flex-col gap-2 md:items-end max-w-full">
                  <span className="text-[9px] sm:text-[11px] font-medium text-white/50 uppercase tracking-wider md:text-right">Select Film</span>
                  <div className="flex flex-wrap gap-2 max-w-full justify-start md:justify-end">
                    {directionVideos.map((vid) => {
                      const isActive = activeVideo?.id === vid.id;
                      return (
                        <button
                          key={vid.id}
                          onClick={() => handleVideoSelect(vid)}
                          className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold rounded-full transition-all duration-300 pointer-events-auto cursor-pointer ${
                            isActive 
                              ? 'bg-white text-black shadow-md' 
                              : 'bg-white/10 text-white/90 border border-white/5 hover:bg-white/20 backdrop-blur-sm'
                          }`}
                        >
                          {getShortTitle(vid.title)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
