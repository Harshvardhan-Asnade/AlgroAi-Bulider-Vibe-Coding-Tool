"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingSnippet = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
  <div
    className={cn(
      "absolute flex items-center gap-2 rounded-lg border border-primary/20 bg-background/50 p-2 text-xs text-primary/80 shadow-lg shadow-primary/10 backdrop-blur-sm",
      className
    )}
    style={style}
  >
    {children}
  </div>
);

export default function BackgroundFx() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxStyle = (factor: number) => ({
    transform: `translate(${mousePosition.x / -factor}px, ${mousePosition.y / -factor}px)`,
  });

  return (
    <>
      <div
        className="fixed inset-0 z-[-1] h-full w-full bg-background"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border) / 0.5) 1px, hsl(var(--background)) 1px)',
          backgroundSize: '4rem 4rem',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
      </div>
      <div className="fixed inset-0 z-[-1] h-full w-full bg-gradient-to-b from-primary/10 via-transparent to-background" />

      <div className="fixed inset-0 z-[-1] hidden transition-all duration-300 ease-out lg:block">
        <FloatingSnippet className="left-[10%] top-[20%]" style={parallaxStyle(50)}>
            <Terminal className="h-4 w-4" /> `npm install vibecoder`
        </FloatingSnippet>
        <FloatingSnippet className="right-[15%] top-[30%]" style={parallaxStyle(80)}>
            `// Generating UI...`
        </FloatingSnippet>
        <FloatingSnippet className="left-[20%] top-[70%]" style={parallaxStyle(40)}>
          {`<Button>Deploy</Button>`}
        </FloatingSnippet>
         <FloatingSnippet className="right-[10%] top-[85%]" style={parallaxStyle(60)}>
          {`{ "status": "success" }`}
        </FloatingSnippet>
      </div>
    </>
  );
}
