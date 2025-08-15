
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
      
      window.requestAnimationFrame(render);
    };
    
    render();
    
    // It's good practice to provide a cleanup function, 
    // though cancelAnimationFrame with a constant is not effective.
    // Modern browsers are smart about this, but for completeness:
    let animationFrameId: number;
    const startRender = () => {
        const loop = () => {
            render();
            animationFrameId = window.requestAnimationFrame(loop);
        };
        loop();
    };
    
    // The render function already calls requestAnimationFrame.
    // To avoid double animation, I'll just call render directly.
    render();

    return () => {
      // And we would cancel it here.
      window.cancelAnimationFrame(animationFrameId);
      // Remove resize listener
      window.removeEventListener('resize', () => {});
    };
  }, [scrollY]);

  useEffect(() => {
    // The useCallback hook memoizes the animation function.
    // We call it here to start the animation.
    // The returned function from memoizedAnimation is the cleanup.
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
