import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ShowreelSection } from './components/ShowreelSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import Admin from './pages/Admin';
import { CmsProvider } from './context/CmsContext';
import { Toaster } from 'sonner';
import { useCms } from './context/CmsContext';

function Frontend() {
  const { isLoading, data } = useCms();

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
  }, [isLoading]);

  if (isLoading) {
    return <div className="min-h-screen bg-darkBg" />;
  }

  const selectedVideoId = data.heroContent.slideshowVideos?.[0];
  const hasShowreelVideo = !!selectedVideoId;

  return (
    <div className="bg-darkBg text-textLight min-h-screen w-full overflow-x-clip">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Showreel Section */}
      {hasShowreelVideo && <ShowreelSection />}

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* 6. Contact Section (Footer) */}
      <ContactSection />
    </div>
  );
}

function App() {
  return (
    <CmsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontend />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" theme="dark" richColors />
    </CmsProvider>
  );
}

export default App;
