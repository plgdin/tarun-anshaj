import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeroSection } from './components/HeroSection';
import { LazySection } from './components/LazySection';
import { CmsProvider } from './context/CmsContext';
import { Toaster } from 'sonner';
import { useCms } from './context/CmsContext';

// Lazy load below-the-fold sections
const MarqueeSection = lazy(() => import('./components/MarqueeSection').then((m) => ({ default: m.MarqueeSection })));
const AboutSection = lazy(() => import('./components/AboutSection').then((m) => ({ default: m.AboutSection })));
const ShowreelSection = lazy(() => import('./components/ShowreelSection').then((m) => ({ default: m.ShowreelSection })));
const ProjectsSection = lazy(() => import('./components/ProjectsSection').then((m) => ({ default: m.ProjectsSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then((m) => ({ default: m.ContactSection })));

// Lazy load Admin route (contains heavy libraries like recharts, dnd-kit, supabase, etc.)
const Admin = lazy(() => import('./pages/Admin'));

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
      {/* 1. Hero Section (Eagerly loaded - critical for FCP/LCP) */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <LazySection height="120px" rootMargin="300px">
        <Suspense fallback={<div className="h-[120px] bg-darkBg" />}>
          <MarqueeSection />
        </Suspense>
      </LazySection>

      {/* 3. About Section */}
      <LazySection height="600px" rootMargin="400px">
        <Suspense fallback={<div className="min-h-screen bg-darkBg" />}>
          <AboutSection />
        </Suspense>
      </LazySection>

      {/* 4. Showreel Section (Very heavy video container - deferred loading) */}
      {hasShowreelVideo && (
        <LazySection height="100vh" rootMargin="600px">
          <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
            <ShowreelSection />
          </Suspense>
        </LazySection>
      )}

      {/* 5. Projects Section (Deferred thumbnails and modal wrapper) */}
      <LazySection height="800px" rootMargin="500px">
        <Suspense fallback={<div className="min-h-screen bg-darkBg" />}>
          <ProjectsSection />
        </Suspense>
      </LazySection>

      {/* 6. Contact Section (Footer) */}
      <LazySection height="400px" rootMargin="300px">
        <Suspense fallback={<div className="h-[400px] bg-darkBg" />}>
          <ContactSection />
        </Suspense>
      </LazySection>
    </div>
  );
}

function App() {
  return (
    <CmsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontend />} />
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={
                <div className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center text-[#D7E2EA]">
                  <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="font-mono text-sm tracking-widest text-[#D7E2EA]/60 uppercase">Loading CMS Admin...</p>
                </div>
              }>
                <Admin />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" theme="dark" richColors />
    </CmsProvider>
  );
}

export default App;
