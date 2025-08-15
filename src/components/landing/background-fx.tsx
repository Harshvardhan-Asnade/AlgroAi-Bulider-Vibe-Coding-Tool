
"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

const BackgroundFx = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollY = useRef(0);

  const handleScroll = () => {
    scrollY.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const memoizedAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // The original code was trying to get a '3d' context which is incorrect.
    // It should be 'webgl' or 'webgl2' for 3D rendering.
    // However, the rest of the code uses 2D context APIs.
    // Let's stick to '2d' to match the actual drawing commands.
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let perspective = width * 0.8;
    let projection_center_x = width / 2;
    let projection_center_y = height / 2;
    let fov = 400;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      perspective = width * 0.8;
      projection_center_x = width / 2;
      projection_center_y = height / 2;
    });

    const vertices: number[][] = [];
    const edges: number[][] = [];
    const particles: Particle[] = [];
    const numParticles = 50;

    const codeSnippets = [
      "<div>", "<span>", "<a>", "<h1>", "() => {}", "class", "function",
      "const", "let", "var", "import", "export", "[]", "{}", "/>"
    ];

    class Particle {
      x: number;
      y: number;
      z: number;
      xProjected: number = 0;
      yProjected: number = 0;
      scaleProjected: number = 0;
      text: string;

      constructor() {
        this.x = (Math.random() - 0.5) * width;
        this.y = (Math.random() - 0.5) * height;
        this.z = Math.random() * width;
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      }

      project() {
        this.z -= 0.5;
        if (this.z < -width / 2) {
          this.z = width / 2;
        }

        const p = perspective / (perspective + this.z);
        this.xProjected = this.x * p + projection_center_x;
        this.yProjected = this.y * p + projection_center_y + (scrollY.current * p * 0.1);
        this.scaleProjected = p;
      }

      draw() {
        this.project();
        const alpha = Math.abs(1 - (this.z / (width / 2)) * 2);
        // This is a 2D context, so we can't check for WebGL2RenderingContext.
        // We'll just use the 2D context methods directly.
        ctx.font = `${12 * this.scaleProjected}px 'Space Mono', monospace`;
        ctx.fillStyle = `rgba(125, 249, 255, ${alpha * 0.7})`;
        ctx.fillText(this.text, this.xProjected, this.yProjected);
      }
    }
    
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }

    let cube_size = height / 4;
    let half_cube_size = cube_size / 2;

    vertices.push([-half_cube_size, -half_cube_size, -half_cube_size]);
    vertices.push([half_cube_size, -half_cube_size, -half_cube_size]);
    vertices.push([half_cube_size, half_cube_size, -half_cube_size]);
    vertices.push([-half_cube_size, half_cube_size, -half_cube_size]);
    vertices.push([-half_cube_size, -half_cube_size, half_cube_size]);
    vertices.push([half_cube_size, -half_cube_size, half_cube_size]);
    vertices.push([half_cube_size, half_cube_size, half_cube_size]);
    vertices.push([-half_cube_size, half_cube_size, half_cube_size]);

    for (let i = 0; i < 4; i++) {
      edges.push([i, (i + 1) % 4]);
      edges.push([i + 4, ((i + 1) % 4) + 4]);
      edges.push([i, i + 4]);
    }
    
    let time = 0;
    
    const render = () => {
      time += 0.5;
      
      // We already know ctx is a 2D context from the check above.
      ctx.clearRect(0, 0, width, height);

      let angle = time * 0.005 + (scrollY.current * 0.001);

      let rotation_x = [
          [1, 0, 0],
          [0, Math.cos(angle), -Math.sin(angle)],
          [0, Math.sin(angle), Math.cos(angle)]
      ];

      let rotation_y = [
          [Math.cos(angle), 0, Math.sin(angle)],
          [0, 1, 0],
          [-Math.sin(angle), 0, Math.cos(angle)]
      ];
      
      let rotation_z = [
          [Math.cos(angle), -Math.sin(angle), 0],
          [Math.sin(angle), Math.cos(angle), 0],
          [0, 0, 1]
      ];

      let t: number[][] = [];
      for (let i = 0; i < vertices.length; i++) {
          let rotated_x = [
              vertices[i][0] * rotation_x[0][0] + vertices[i][1] * rotation_x[1][0] + vertices[i][2] * rotation_x[2][0],
              vertices[i][0] * rotation_x[0][1] + vertices[i][1] * rotation_x[1][1] + vertices[i][2] * rotation_x[2][1],
              vertices[i][0] * rotation_x[0][2] + vertices[i][1] * rotation_x[1][2] + vertices[i][2] * rotation_x[2][2]
          ];
          let rotated_xy = [
              rotated_x[0] * rotation_y[0][0] + rotated_x[1] * rotation_y[1][0] + rotated_x[2] * rotation_y[2][0],
              rotated_x[0] * rotation_y[0][1] + rotated_x[1] * rotation_y[1][1] + rotated_x[2] * rotation_y[2][1],
              rotated_x[0] * rotation_y[0][2] + rotated_x[1] * rotation_y[1][2] + rotated_x[2] * rotation_y[2][2]
          ];
          t.push(rotated_xy);
      }

      ctx.beginPath();
      for (let i = 0; i < edges.length; i++) {
          const p1z = 1 / (fov + t[edges[i][0]][2]);
          const p1x = (t[edges[i][0]][0] * fov * p1z) + projection_center_x;
          const p1y = (t[edges[i][0]][1] * fov * p1z) + projection_center_y;

          const p2z = 1 / (fov + t[edges[i][1]][2]);
          const p2x = (t[edges[i][1]][0] * fov * p2z) + projection_center_x;
          const p2y = (t[edges[i][1]][1] * fov * p2z) + projection_center_y;

          ctx.moveTo(p1x, p1y);
          ctx.lineTo(p2x, p2y);
      }
      ctx.strokeStyle = "hsla(217.2, 91.2%, 59.8%, 0.2)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      particles.forEach(p => p.draw());
      
      window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.cancelAnimationFrame(0);
      window.removeEventListener('resize', () => {});
    };
  }, [scrollY]);

  useEffect(() => {
    const cleanup = memoizedAnimation();
    return cleanup;
  }, [memoizedAnimation]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-[-1] h-full w-full" />
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-background via-background/50 to-transparent" />
    </>
  );
};

export default BackgroundFx;
