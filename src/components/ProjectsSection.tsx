import React, { useState, useEffect } from 'react';
import { ContainerScroll } from './ui/container-scroll-animation';

const projects = [
  { 
    id: 1, 
    type: 'youtube', 
    name: 'Echoes of Silence', 
    desc: 'Short Film • Director & Writer • 1.2M Views', 
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80', 
    aspect: 'wide',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  { 
    id: 2, 
    type: 'short', 
    name: 'Behind the Lens', 
    desc: 'Cinematic Reels • Actor • 500K Views', 
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80', 
    aspect: 'tall',
    videoUrl: '/6.mp4'
  },
  { 
    id: 3, 
    type: 'youtube', 
    name: 'The Midnight Screenplay', 
    desc: 'Writing Masterclass • Writer • 850K Views', 
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80', 
    aspect: 'wide',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  { 
    id: 4, 
    type: 'short', 
    name: 'Monologue Series', 
    desc: 'TikTok Drama • Actor • 2.1M Views', 
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=80', 
    aspect: 'tall',
    videoUrl: '/6.mp4'
  },
  { 
    id: 5, 
    type: 'youtube', 
    name: 'Indie Film Breakdown', 
    desc: 'Director Commentary • 400K Views', 
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80', 
    aspect: 'wide',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  { 
    id: 6, 
    type: 'short', 
    name: 'Scene Study: Hamlet', 
    desc: 'Instagram Reels • Actor • 3.5M Views', 
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80', 
    aspect: 'tall',
    videoUrl: '/6.mp4'
  },
];

export const ProjectsSection: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'short' | 'youtube'>('all');
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveVideo(null);
            }
        };
        if (activeVideo) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [activeVideo]);

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
                <div className="h-full w-full bg-[#121212] text-white flex flex-col">
                    {/* Mock Window Header */}
                    <div className="portfolio-studio-header">
                        <div className="window-dots">
                            <span className="window-dot red" />
                            <span className="window-dot yellow" />
                            <span className="window-dot green" />
                            <span className="window-title">CreatorStudio_v1.0.4</span>
                        </div>
                        
                        {/* Filter Tabs inside the window dashboard */}
                        <div className="portfolio-studio-tabs">
                            {(['all', 'short', 'youtube'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setFilter(tab)}
                                    className={`portfolio-studio-tab-btn ${
                                        filter === tab ? 'active' : ''
                                    }`}
                                >
                                    {tab === 'all' ? 'All Work' : tab === 'short' ? 'Shorts' : 'YouTube'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid of images and videos inside the scroll card */}
                    <div className="portfolio-studio-grid custom-scrollbar">
                        {filtered.map((p) => (
                            <button 
                                key={p.id} 
                                className="studio-item text-left w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-xl"
                                onClick={() => setActiveVideo(p.videoUrl)}
                            >
                                <div className="studio-item-visual">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                    />
                                    <div className="studio-play-overlay">
                                        <div className="studio-play-btn">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                                <polygon points="5 3 19 12 5 21 5 3" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className="studio-creator-badge">
                                        <img src="/tarun-avatar.png" alt="Tarun Kapoor avatar" onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = 'https://placehold.co/40x40/eab308/ffffff?text=TK';
                                        }} />
                                        <span>Tarun Kapoor</span>
                                    </div>
                                </div>
                                
                                <div className="studio-item-info">
                                    <h4 className="studio-item-name">{p.name}</h4>
                                    <p className="studio-item-desc">{p.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </ContainerScroll>

            {/* Video Modal Overlay */}
            {activeVideo && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                    onClick={() => setActiveVideo(null)}
                >
                    <div 
                        className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black transition-colors"
                            onClick={() => setActiveVideo(null)}
                            aria-label="Close video"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        <video 
                            src={activeVideo} 
                            autoPlay 
                            controls 
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

