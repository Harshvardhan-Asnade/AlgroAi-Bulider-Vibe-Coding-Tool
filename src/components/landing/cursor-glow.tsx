"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={cn(
        'pointer-events-none fixed -inset-40 z-[9999] hidden transition-all duration-300 lg:block',
      )}
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, hsl(var(--accent) / 0.1), transparent 80%)`,
      }}
    />
  );
}
