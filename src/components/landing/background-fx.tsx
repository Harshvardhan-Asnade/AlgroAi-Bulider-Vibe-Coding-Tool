
"use client";

import { useRef, useEffect } from 'react';

export default function BackgroundFx() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        // --- Star Generation ---
        const stars: { x: number, y: number, radius: number, alpha: number, velocity: number }[] = [];
        const numStars = 300;
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.2 + 0.5,
                alpha: Math.random(), // initial opacity
                velocity: Math.random() * 0.1 + 0.05 // speed of twinkle
            });
        }
        
        // --- Planet Generation ---
        const planets: { x: number, y: number, radius: number, color: string }[] = [];
        const numPlanets = 5;
        const planetColors = ['hsla(276, 100%, 80%, 0.05)', 'hsla(185, 100%, 75%, 0.05)', 'hsla(263, 88%, 68%, 0.04)'];
        for (let i = 0; i < numPlanets; i++) {
            planets.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 150 + 50,
                color: planetColors[Math.floor(Math.random() * planetColors.length)]
            });
        }

        const draw = () => {
            if (!ctx) return;

            // Clear canvas with a subtle gradient for depth
            const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 2);
            gradient.addColorStop(0, 'hsl(270, 30%, 12%)'); // Center color
            gradient.addColorStop(1, 'hsl(270, 30%, 5%)'); // Outer color (matches dark purple bg)
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Draw planets
            planets.forEach(planet => {
                ctx.beginPath();
                ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
                const planetGradient = ctx.createRadialGradient(planet.x, planet.y, 0, planet.x, planet.y, planet.radius);
                planetGradient.addColorStop(0, planet.color);
                planetGradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = planetGradient;
                ctx.fill();
            });


            // Draw and animate stars
            stars.forEach(star => {
                // Twinkle effect
                star.alpha += star.velocity;
                if (star.alpha > 1 || star.alpha < 0) {
                    star.velocity *= -1;
                }
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.8})`; // Use alpha for twinkling
                ctx.fill();
            });
        };

        let animationFrameId: number;
        const render = () => {
            draw();
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.cancelAnimationFrame(animationFrameId);
        }
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] opacity-100" />;
}
