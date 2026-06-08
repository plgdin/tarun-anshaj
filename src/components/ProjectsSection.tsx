import React, { useState } from 'react';
import { ContainerScroll } from './ui/container-scroll-animation';
import { useCms } from '@/context/CmsContext';

export const ProjectsSection: React.FC = () => {
    const { data } = useCms();
    const [filter, setFilter] = useState<string>('all');

    const filtered = filter === 'all' ? data.videos : data.videos.filter(p => p.category === filter);

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
                            <div key={p.id} className="studio-item">
                                <div className="studio-item-visual">
                                    <img
                                        src={p.thumbnail || ''}
                                        alt={p.title}
                                    />
                                    <div className="studio-play-overlay">
                                        <div className="studio-play-btn">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                                <polygon points="5 3 19 12 5 21 5 3" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className="studio-creator-badge">
                                        <img src="/tarun-avatar.png" alt={p.title} />
                                        <span>{data.siteSettings.siteName || "Tarun Kapoor"}</span>
                                    </div>
                                </div>
                                
                                <div className="studio-item-info">
                                    <h4 className="studio-item-name">{p.title}</h4>
                                    <p className="studio-item-desc">{p.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ContainerScroll>
        </section>
    );
};
