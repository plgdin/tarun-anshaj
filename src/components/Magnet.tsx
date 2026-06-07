import React, { useState, useEffect, useRef } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
  style = {},
}) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [transition, setTransition] = useState(inactiveTransition);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      // Calculate center coordinates relative to viewport
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from cursor to element center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Check if cursor is within padding distance of the element bounding box
      const isWithinX = e.clientX >= rect.left - padding && e.clientX <= rect.right + padding;
      const isWithinY = e.clientY >= rect.top - padding && e.clientY <= rect.bottom + padding;

      if (isWithinX && isWithinY) {
        // Active transform
        setTransform({
          x: deltaX / strength,
          y: deltaY / strength,
        });
        setTransition(activeTransition);
      } else {
        // Inactive reset
        setTransform({ x: 0, y: 0 });
        setTransition(inactiveTransition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        ...style,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0px)`,
        transition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
