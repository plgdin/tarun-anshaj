import React, { useRef, useState, useEffect } from 'react';
import { useCms } from '@/context/CmsContext';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const { data } = useCms();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  const row1Images = data.heroContent?.marqueeRow1 || [];
  const row2Images = data.heroContent?.marqueeRow2 || [];

  // Only duplicate and scroll if there are enough items to form a proper marquee loop
  const isRow1Scrollable = row1Images.length > 3;
  const isRow2Scrollable = row2Images.length > 3;

  const row1Render = isRow1Scrollable ? [...row1Images, ...row1Images, ...row1Images] : row1Images;
  const row2Render = isRow2Scrollable ? [...row2Images, ...row2Images, ...row2Images] : row2Images;

  const renderMedia = (url: string, index: number) => {
    const matchedVideo = data.videos.find((v) => v.id === url || v.thumbnail === url || v.videoUrl === url);
    const directVideo = (url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('bunnycdn') || url.includes('vimeo.com') || url.includes('youtube.com') || url.includes('youtu.be')) ? url : null;
    const targetVideoUrl = matchedVideo?.videoUrl || directVideo;
    const posterImage = matchedVideo?.thumbnail || url;
    
    if (isVisible && targetVideoUrl) {
      let videoUrl = targetVideoUrl;
      
      // Optimize marquee playback by using 360p resolution version instead of 720p
      if (videoUrl.includes('play_720p.mp4')) {
        videoUrl = videoUrl.replace('play_720p.mp4', 'play_360p.mp4');
      }
      
      // MP4 / WebM / BunnyCDN Direct Playback
      if (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.includes('bunnycdn') || videoUrl.includes('.m3u8')) {
        return (
          <div 
            className="w-full h-full relative overflow-hidden rounded-2xl bg-black"
            style={{ transform: 'translateZ(0)' }}
          >
            <video
              src={videoUrl}
              autoPlay
              preload="auto"
              loop
              muted
              playsInline
              className="w-full h-full object-cover pointer-events-none origin-center"
              style={{ transform: 'scale(1.45)' }}
              poster={posterImage}
            />
          </div>
        );
      }
      
      // Vimeo Playback
      if (videoUrl.includes('vimeo.com')) {
        const vimeoIdMatch = videoUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        if (vimeoIdMatch && vimeoIdMatch[1]) {
          return (
            <div 
              className="w-full h-full relative overflow-hidden rounded-2xl bg-black"
              style={{ transform: 'translateZ(0)' }}
            >
              <iframe
                src={`https://player.vimeo.com/video/${vimeoIdMatch[1]}?background=1&autoplay=1&loop=1&muted=1`}
                className="w-full h-full border-0 pointer-events-none origin-center"
                style={{ transform: 'scale(1.45)' }}
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          );
        }
      }
      
      // YouTube Playback
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        let ytId = '';
        if (videoUrl.includes('youtu.be/')) {
          ytId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
        } else if (videoUrl.includes('youtube.com')) {
          const params = new URLSearchParams(videoUrl.split('?')[1]);
          ytId = params.get('v') || '';
        }
        if (ytId) {
          return (
            <div 
              className="w-full h-full relative overflow-hidden rounded-2xl bg-black"
              style={{ transform: 'translateZ(0)' }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&modestbranding=1&playsinline=1`}
                className="w-full h-full border-0 pointer-events-none origin-center"
                style={{ transform: 'scale(1.45)' }}
                allow="autoplay; encrypted-media"
                loading="lazy"
              />
            </div>
          );
        }
      }
    }

    const matchedPitch = data.pitchDecks?.find((p) => p.id === url || p.thumbnail === url || p.embedUrl === url || p.originalUrl === url);
    if (matchedPitch && matchedPitch.embedUrl) {
      return (
        <div 
          className="w-full h-full relative overflow-hidden rounded-2xl bg-black"
          style={{ transform: 'translateZ(0)' }}
        >
          <iframe
            src={matchedPitch.embedUrl}
            className="w-full h-full border-0 pointer-events-none origin-center"
            style={{ transform: 'scale(1.45)' }}
            allow="fullscreen"
            loading="lazy"
          />
        </div>
      );
    }
    
    // Fallback: Standard Image with onError fallback
    return (
      <div className="w-full h-full relative overflow-hidden rounded-2xl bg-zinc-900">
        <img
          src={posterImage}
          alt={`Marquee Tile ${index}`}
          loading="lazy"
          className="w-full h-full object-cover rounded-2xl pointer-events-none"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80';
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Calculate sectionTop as the absolute offset relative to document
      const sectionTop = rect.top + window.scrollY;
      // Scroll offset formula: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const computedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(computedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial compute

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-darkBg pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full flex flex-col gap-3"
    >
      {/* Row 1: Moves RIGHT on scroll (if enough items) */}
      <div className={`w-full flex ${!isRow1Scrollable ? 'justify-center' : ''}`}>
        <div
          className="flex gap-3 transition-transform duration-75 ease-out"
          style={!isRow1Scrollable ? {} : {
            transform: `translate3d(${offset - 200}px, 0px, 0px)`,
            willChange: 'transform',
          }}
        >
          {row1Render.map((imgUrl, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 w-[420px] h-[270px] select-none"
            >
              {renderMedia(imgUrl, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moves LEFT on scroll (if enough items) */}
      <div className={`w-full flex ${!isRow2Scrollable ? 'justify-center' : 'justify-end'}`}>
        <div
          className="flex gap-3 transition-transform duration-75 ease-out"
          style={!isRow2Scrollable ? {} : {
            transform: `translate3d(${-(offset - 200)}px, 0px, 0px)`,
            willChange: 'transform',
          }}
        >
          {row2Render.map((imgUrl, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 w-[420px] h-[270px] select-none"
            >
              {renderMedia(imgUrl, index)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
