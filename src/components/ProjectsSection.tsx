import React, { useState } from 'react';
import { ContainerScroll } from './ui/container-scroll-animation';

const projects = [
  { 
    id: 1, 
    type: 'youtube', 
    name: 'Echoes of Silence', 
    desc: 'Short Film • Director & Writer • 1.2M Views', 
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80', 
    aspect: 'wide' 
  },
  { 
    id: 2, 
    type: 'short', 
    name: 'Behind the Lens', 
    desc: 'Cinematic Reels • Actor • 500K Views', 
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80', 
    aspect: 'tall' 
  },
  { 
    id: 3, 
    type: 'youtube', 
    name: 'The Midnight Screenplay', 
    desc: 'Writing Masterclass • Writer • 850K Views', 
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80', 
    aspect: 'wide' 
  },
  { 
    id: 4, 
    type: 'short', 
    name: 'Monologue Series', 
    desc: 'TikTok Drama • Actor • 2.1M Views', 
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=80', 
    aspect: 'tall' 
  },
  { 
    id: 5, 
    type: 'youtube', 
    name: 'Indie Film Breakdown', 
    desc: 'Director Commentary • 400K Views', 
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80', 
    aspect: 'wide' 
  },
  { 
    id: 6, 
    type: 'short', 
    name: 'Scene Study: Hamlet', 
    desc: 'Instagram Reels • Actor • 3.5M Views', 
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80', 
    aspect: 'tall' 
  },
];

export const ProjectsSection: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'short' | 'youtube'>('all');

    const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter);

    return (
        <section className="work" id="projects" style={{ height: 'auto', padding: '0 0 6rem 0' }}>
            <ContainerScroll
                titleComponent={
                    <div className="section-header">
                        <div className="section-tag">Portfolio</div>
                        <h2 className="font-montserrat uppercase">
                          <span className="font-black">Selected</span> <span className="font-extralight text-foreground/60">Work</span>
                        </h2>
                        <p>A snapshot of content built for growth. Scroll to rotate.</p>
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
                            <div key={p.id} className="studio-item">
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
                                        <img src="/tarun-avatar.png" alt={p.name} />
                                        <span>Tarun Kapoor</span>
                                    </div>
                                </div>
                                
                                <div className="studio-item-info">
                                    <h4 className="studio-item-name">{p.name}</h4>
                                    <p className="studio-item-desc">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ContainerScroll>
        </section>
    );
};
