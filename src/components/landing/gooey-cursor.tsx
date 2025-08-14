"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function GooeyCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dots = useRef<any[]>([]);
  const lastRenderTime = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const idle = useRef(false);
  const timeoutID = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const amount = 20;
    const width = 26;
    const idleTimeout = 150;

    class Dot {
      index: number;
      anglespeed: number;
      scale: number;
      range: number;
      x: number;
      y: number;
      el: HTMLSpanElement;
      lockX: number = 0;
      lockY: number = 0;
      angleX: number = 0;
      angleY: number = 0;

      constructor(i: number) {
        this.index = i;
        this.anglespeed = 0.05;
        this.scale = 1 - 0.05 * i;
        this.range = width / 2 - (width / 2) * this.scale + 2;
        this.x = this.y = 0;
        this.el = document.createElement("span");
        gsap.set(this.el, { scale: this.scale });
        cursor.appendChild(this.el);
      }
      lock() {
        this.lockX = this.x;
        this.lockY = this.y;
        this.angleX = Math.random() * Math.PI * 2;
        this.angleY = Math.random() * Math.PI * 2;
      }
      draw() {
        if (!idle.current || this.index <= Math.floor(amount * 0.3)) {
          gsap.set(this.el, { x: this.x, y: this.y });
        } else {
          this.angleX += this.anglespeed;
          this.angleY += this.anglespeed;
          this.x = this.lockX + Math.sin(this.angleX) * this.range;
          this.y = this.lockY + Math.sin(this.angleY) * this.range;
          gsap.set(this.el, { x: this.x, y: this.y });
        }
      }
    }

    const buildDots = () => {
      dots.current = [];
      // Clear any existing spans
      while(cursor.firstChild) {
        cursor.removeChild(cursor.firstChild);
      }
      for (let i = 0; i < amount; i++) {
        dots.current.push(new Dot(i));
      }
    };

    const idleTimer = () => {
      if (timeoutID.current) clearTimeout(timeoutID.current);
      idle.current = false;
      timeoutID.current = setTimeout(() => {
        idle.current = true;
        dots.current.forEach((d) => d.lock());
      }, idleTimeout);
    };

    const move = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      mouse.current.x = clientX - width / 2;
      mouse.current.y = clientY - width / 2;
      idleTimer();
    };

    const render = (t: number) => {
      lastRenderTime.current = t;
      let x = mouse.current.x;
      let y = mouse.current.y;
      dots.current.forEach((d, i, arr) => {
        let next = arr[i + 1] || arr[0];
        d.x = x;
        d.y = y;
        d.draw();
        if (!idle.current || i <= Math.floor(amount * 0.3)) {
          x += (next.x - d.x) * 0.35;
          y += (next.y - d.y) * 0.35;
        }
      });
      requestAnimationFrame(render);
    };

    buildDots();
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
    const animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      cancelAnimationFrame(animationFrame);
      if (timeoutID.current) clearTimeout(timeoutID.current);
    };
  }, []);

  return (
    <>
      <svg id="gooey-filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 35 -15" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div id="cursor" ref={cursorRef}></div>
    </>
  );
}
