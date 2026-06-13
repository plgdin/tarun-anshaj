import React, { useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  height?: string; // Est. height to prevent layout shifts (CLS)
  rootMargin?: string; // Pre-load margin before viewport entry
  className?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  height = '200px',
  rootMargin = '400px',
  className = '',
}) => {
  const [hasRendered, setHasRendered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fallback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      setHasRendered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRendered(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={!hasRendered ? { minHeight: height } : undefined}
    >
      {hasRendered ? children : null}
    </div>
  );
};
