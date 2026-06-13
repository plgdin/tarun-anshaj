import React, { useState, useEffect } from 'react';
import { ContainerScroll } from './ui/container-scroll-animation';
import { useCms } from '@/context/CmsContext';

export const ProjectsSection: React.FC = () => {
    const { data } = useCms();
    const [filter, setFilter] = useState<string>('youtube');
    const [activeMedia, setActiveMedia] = useState<{ 
        type: 'video' | 'iframe', 
        url: string,
        title?: string,
        description?: string,
        duration?: string,
        year?: string
    } | null>(null);

    const filtered = data.videos.filter(p => p.category === filter);

    // Deduplicate videos by title to avoid database duplicates in UI
    const uniqueFiltered: typeof data.videos = [];
    const seenTitles = new Set<string>();
    filtered.forEach(vid => {
        const titleKey = vid.title.trim().toLowerCase();
        if (!seenTitles.has(titleKey)) {
            seenTitles.add(titleKey);
            uniqueFiltered.push(vid);
        }
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveMedia(null);
            }
        };
        if (activeMedia) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [activeMedia]);

    return (
        <section className="work" id="projects" style={{ height: 'auto', padding: '0 0 6rem 0' }}>
            <ContainerScroll
                titleComponent={
                    <div className="section-header">
                        <div className="section-tag">Portfolio</div>
                        <h2 className="font-montserrat uppercase">
                          <span className="font-black">Selected</span> <span className="font-extralight text-foreground/60">Work</span>
                        </h2>
                        <p>A collection of cinematic work, writing masterclasses, and actor showcases. Click any card to watch.</p>
                    </div>
                }
            >
                <div className="w-full bg-[#121212] text-white">
                    {/* Mock Window Header */}
                    <div className="portfolio-studio-header">
                        <div className="window-dots">
                            <span className="window-dot red" />
                            <span className="window-dot yellow" />
                            <span className="window-dot green" />
                        </div>
                        
                        {/* Filter Tabs inside the window dashboard */}
                        <div className="portfolio-studio-tabs">
                            <button
                                onClick={() => setFilter('youtube')}
                                className={`portfolio-studio-tab-btn ${filter === 'youtube' ? 'active' : ''}`}
                            >
                                Direction
                            </button>
                            <button
                                onClick={() => setFilter('DA/CD')}
                                className={`portfolio-studio-tab-btn ${filter === 'DA/CD' ? 'active' : ''}`}
                            >
                                DA / AD
                            </button>
                            <button
                                onClick={() => setFilter('pitch-decks')}
                                className={`portfolio-studio-tab-btn ${filter === 'pitch-decks' ? 'active' : ''}`}
                            >
                                Pitch Decks
                            </button>
                        </div>
                    </div>

                    {/* Grid of images and videos inside the scroll card */}
                    <div className="portfolio-studio-grid custom-scrollbar">
                        {filter === 'pitch-decks' ? (
                            (data.pitchDecks || []).map((deck) => (
                                <button 
                                    key={deck.id} 
                                    className="studio-item text-left w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-xl"
                                    onClick={() => setActiveMedia({ 
                                        type: 'iframe', 
                                        url: deck.embedUrl,
                                        title: deck.title
                                    })}
                                >
                                    <div className="studio-item-visual relative bg-black/50">
                                        {/* Dynamic Fallback Background */}
                                        <div 
                                            className="absolute inset-0 flex items-center justify-center p-6 text-center"
                                            style={{ 
                                                background: `linear-gradient(135deg, ${deck.accent || '#F5D467'}15, ${deck.accent || '#F5D467'}40)`,
                                            }}
                                        >
                                            <span className="font-display text-2xl font-bold tracking-wide opacity-90 shadow-sm" style={{ color: deck.accent || '#F5D467' }}>
                                                {deck.title}
                                            </span>
                                        </div>

                                        {/* Actual Thumbnail (If provided and valid) */}
                                        {deck.thumbnail && (
                                            <img
                                                src={deck.thumbnail}
                                                alt={deck.title}
                                                className="relative w-full h-full object-cover"
                                                loading="lazy"
                                                decoding="async"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                }}
                                            />
                                        )}
                                        <div className="studio-play-overlay">
                                            <div className="studio-play-btn">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="studio-item-info">
                                        <h4 className="studio-item-name">{deck.title}</h4>
                                    </div>
                                </button>
                            ))
                        ) : (
                            uniqueFiltered.map((p) => (
                                <button 
                                    key={p.id} 
                                    className="studio-item text-left w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-xl"
                                    onClick={() => setActiveMedia({ 
                                        type: 'video', 
                                        url: p.videoUrl,
                                        title: p.title,
                                        description: p.description,
                                        duration: p.duration,
                                        year: p.year
                                    })}
                                >
                                    <div className="studio-item-visual">
                                        <img
                                            src={p.thumbnail || ''}
                                            alt={p.title}
                                            loading="lazy"
                                            decoding="async"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80';
                                            }}
                                        />
                                        <div className="studio-play-overlay">
                                            <div className="studio-play-btn">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="studio-item-info">
                                        <h4 className="studio-item-name">{p.title}</h4>
                                        <p className="studio-item-desc">{p.description}</p>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </ContainerScroll>

            {/* Video/Iframe Modal Overlay */}
            {activeMedia && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto"
                    onClick={() => setActiveMedia(null)}
                >
                    <div 
                        className="relative w-full max-w-4xl bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col my-8 max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black transition-colors shadow-lg"
                            onClick={() => setActiveMedia(null)}
                            aria-label="Close modal"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        
                        {/* Video Wrapper (Forces 16:9 Aspect Ratio) */}
                        <div className="w-full aspect-video bg-black relative">
                            {activeMedia.type === 'video' ? (
                                <video 
                                    src={activeMedia.url} 
                                    autoPlay 
                                    controls 
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <iframe 
                                    src={activeMedia.url}
                                    className="w-full h-full border-0 bg-white"
                                    allowFullScreen
                                    allow="fullscreen"
                                />
                            )}
                        </div>

                        {/* Credits & Description Section */}
                        {activeMedia.title && (
                            <div className="p-6 overflow-y-auto border-t border-white/10 bg-zinc-900/30 text-left flex-1 max-h-[35vh]">
                                <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/5">
                                    <h3 className="text-lg sm:text-xl font-bold font-montserrat text-white">
                                        {activeMedia.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs">
                                        {activeMedia.year && (
                                            <span className="px-2 py-1 rounded bg-white/10 text-white/90 font-medium">
                                                {activeMedia.year}
                                            </span>
                                        )}
                                        {activeMedia.duration && (
                                            <span className="px-2 py-1 rounded bg-white/10 text-white/90 font-medium">
                                                {activeMedia.duration}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {activeMedia.description ? (
                                    <p className="text-sm text-gray-300 font-sans whitespace-pre-wrap leading-relaxed pt-3">
                                        {activeMedia.description}
                                    </p>
                                ) : (
                                    <p className="text-xs text-muted-foreground italic pt-3">No credits or description available for this project.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

