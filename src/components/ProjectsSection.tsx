import React, { useState, useEffect } from 'react';
import { ContainerScroll } from './ui/container-scroll-animation';
import { useCms } from '@/context/CmsContext';

export const ProjectsSection: React.FC = () => {
    const { data } = useCms();
    const [filter, setFilter] = useState<string>('all');
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    const filtered = filter === 'all' ? data.videos : data.videos.filter(p => p.category === filter);

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
                <div className="w-full bg-[#121212] text-white">
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
                            <button
                                onClick={() => setFilter('all')}
                                className={`portfolio-studio-tab-btn ${filter === 'all' ? 'active' : ''}`}
                            >
                                All Work
                            </button>
                            {data.categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilter(cat.slug)}
                                    className={`portfolio-studio-tab-btn ${
                                        filter === cat.slug ? 'active' : ''
                                    }`}
                                >
                                    {cat.title}
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
                                        src={p.thumbnail || ''}
                                        alt={p.title}
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
                                    
                                    <div className="studio-creator-badge">
                                        <img src="/tarun-avatar.png" alt={p.title} onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = 'https://placehold.co/40x40/eab308/ffffff?text=TK';
                                        }} />
                                        <span>{data.siteSettings.siteName || "Tarun Kapoor"}</span>
                                    </div>
                                </div>
                                
                                <div className="studio-item-info">
                                    <h4 className="studio-item-name">{p.title}</h4>
                                    <p className="studio-item-desc">{p.description}</p>
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

