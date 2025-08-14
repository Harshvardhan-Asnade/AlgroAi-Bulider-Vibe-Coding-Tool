"use client";

import React, { useRef, useEffect } from 'react';

const BackgroundFx = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const dots: Dot[] = [];
    const numDots = 50;

    class Dot {
      x: number;
      y: number;
      z: number;
      xProjected: number;
      yProjected: number;
      scaleProjected: number;
      
      constructor() {
        this.x = Math.random() * width - width / 2;
        this.y = Math.random() * height - height / 2;
        this.z = Math.random() * width;
        this.xProjected = 0;
        this.yProjected = 0;
        this.scaleProjected = 0;
      }

      project() {
        this.z = this.z - 1;
        if (this.z < 1) {
          this.z = width;
          this.x = Math.random() * width - width / 2;
          this.y = Math.random() * height - height / 2;
        }
        this.scaleProjected = width / (width + this.z);
        this.xProjected = this.x * this.scaleProjected + width / 2;
        this.yProjected = this.y * this.scaleProjected + height / 2;
      }

      draw() {
        this.project();
        if(ctx) {
            ctx.beginPath();
            ctx.arc(
              this.xProjected,
              this.yProjected,
              this.scaleProjected * 2,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = `hsla(285, 100%, 41.4%, ${this.scaleProjected})`;
            ctx.fill();
        }
      }
    }

    for (let i = 0; i < numDots; i++) {
      dots.push(new Dot());
    }

    const render = () => {
      if(ctx) {
        ctx.fillStyle = 'hsl(276 46.3% 11.6%)';
        ctx.fillRect(0, 0, width, height);
      }
      dots.forEach((dot) => dot.draw());
      window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(0);
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] h-full w-full" />;
};

export default BackgroundFx;
