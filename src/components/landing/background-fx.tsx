
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function BackgroundFx() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let rotation = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        const points: { x: number, y: number, z: number }[] = [];
        const numPoints = 8;
        for (let i = 0; i < numPoints; i++) {
            for (let j = 0; j < numPoints; j++) {
                for (let k = 0; k < numPoints; k++) {
                    if (i === 0 || i === numPoints - 1 || j === 0 || j === numPoints - 1 || k === 0 || k === numPoints - 1) {
                        points.push({
                            x: (i / (numPoints - 1) - 0.5) * 2,
                            y: (j / (numPoints - 1) - 0.5) * 2,
                            z: (k / (numPoints - 1) - 0.5) * 2,
                        });
                    }
                }
            }
        }
        
        const project = (p: { x: number, y: number, z: number }) => {
            const fov = 300;
            const z = p.z * Math.cos(rotation) - p.x * Math.sin(rotation);
            const x = p.x * Math.cos(rotation) + p.z * Math.sin(rotation);
            const y = p.y;

            const scale = fov / (fov + z);
            
            return {
                x: x * scale + width / 2,
                y: y * scale + height / 2,
                scale: scale
            };
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = 'hsla(var(--primary) / 0.2)';
            ctx.lineWidth = 1;

            const projectedPoints = points.map(project);
            
            for (let i = 0; i < projectedPoints.length; i++) {
                for (let j = i + 1; j < projectedPoints.length; j++) {
                    const p1 = points[i];
                    const p2 = points[j];
                    
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dz = p1.z - p2.z;
                    
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < 0.2) { // Adjust for density
                        const proj1 = projectedPoints[i];
                        const proj2 = projectedPoints[j];
                        ctx.beginPath();
                        ctx.moveTo(proj1.x, proj1.y);
                        ctx.lineTo(proj2.x, proj2.y);
                        ctx.stroke();
                    }
                }
            }
        };

        gsap.ticker.add(() => {
            rotation += 0.0005;
            draw();
        });

        return () => {
            window.removeEventListener('resize', resize);
            gsap.ticker.remove(draw);
        }
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] opacity-50" />;
}
