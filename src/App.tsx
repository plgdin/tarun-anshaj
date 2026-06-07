import { useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ShowreelSection } from './components/ShowreelSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';

function App() {

  // Enable smooth scroll behavior on HTML anchor clicks
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', handleAnchorClick as any);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleAnchorClick as any);
      });
    };
  }, []);

  return (
    <div className="bg-darkBg text-textLight min-h-screen w-full overflow-x-clip">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Showreel Section */}
      <ShowreelSection />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* 6. Contact Section (Footer) */}
      <ContactSection />
    </div>
  );
}

export default App;
