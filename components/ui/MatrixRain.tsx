"use client";

import { useEffect, useRef } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" 
  + "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん" 
  + "漢字日本東京京都大阪侍忍者刀神社寺城桜月空海山川雨雪風火水木金土";

const FONT_SIZE = 14;
const SIGNAL = "#45d6c2";
const MAGENTA = "#ff2e7a";
const COL_WIDTH = 22;
const SIDE_WIDTH = 210;
const FPS = 24;
const FRAME_TIME = 1000 / FPS;
const MAX_COLUMNS = 55;
const SPAWN_RATE = 0.22;

type Col = {
  x: number;
  y: number;
  speed: number;
  length: number;
  color: string;
  chars: string[];
  opacity: number;
};

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId: number | null = null;
    let lastTime = 0;
    let isVisible = false;
    let cols: Col[] = [];

    const usedSlots = new Set<number>();

    function randomChar() {
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    function getSideX(): number | null {
    const w = canvas!.width;
    const side = Math.min(SIDE_WIDTH, w * 0.2);
    const slots: number[] = [];

    const slotsCount = Math.floor(side / COL_WIDTH);

    for (let i = 0; i < slotsCount; i++) {
        const leftX = i * COL_WIDTH + 4;
        if (!usedSlots.has(leftX)) slots.push(leftX);
    }

    const rightStart = w - side;
    for (let i = 0; i < slotsCount; i++) {
        const rightX = rightStart + i * COL_WIDTH + 4;
        if (!usedSlots.has(rightX)) slots.push(rightX);
    }

    if (slots.length === 0) return null;

    const x = slots[Math.floor(Math.random() * slots.length)];
    usedSlots.add(x);
    return x;
    }

    function makeCol(x: number, randomStart = false): Col {
    const length = 10 + Math.floor(Math.random() * 16);
    const isMagenta = Math.random() < 0.15;
    return {
        x,
        y: randomStart ? -Math.random() * canvas!.height : -FONT_SIZE * 2,
        speed: (0.5 + Math.random() * 0.7) * FONT_SIZE * 2.2,
        length,
        color: isMagenta ? MAGENTA : SIGNAL,
        chars: Array.from({ length }, randomChar),
        opacity: 0.35 + Math.random() * 0.3,
    };
    }

    function setSize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      if (canvas!.width === parent.offsetWidth && canvas!.height === parent.offsetHeight) return;
      canvas!.width = parent.offsetWidth;
      canvas!.height = parent.offsetHeight;
      ctx!.font = `${FONT_SIZE}px monospace`;
      ctx!.textBaseline = "alphabetic";
    }

    setSize();

    for (let i = 0; i < 18; i++) {
    const x = getSideX();
    if (x !== null) {
        cols.push(makeCol(x, true));
    }
    }

    const ro = new ResizeObserver(setSize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible && rafId === null) {
          lastTime = performance.now();
          rafId = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    function draw(now: number) {
      if (!isVisible) { rafId = null; return; }
      rafId = requestAnimationFrame(draw);

      const delta = now - lastTime;
      if (delta < FRAME_TIME) return;
      lastTime = now - (delta % FRAME_TIME);

      const w = canvas!.width;
      const h = canvas!.height;
      const side = Math.min(SIDE_WIDTH, w * 0.2);

      ctx!.clearRect(0, 0, side + COL_WIDTH, h);
      ctx!.clearRect(w - side - COL_WIDTH, 0, side + COL_WIDTH, h);

      ctx!.font = `${FONT_SIZE}px monospace`;
      ctx!.shadowBlur = 0;
      ctx!.shadowColor = "transparent";

      if (cols.length < MAX_COLUMNS && Math.random() < SPAWN_RATE) {
        const x = getSideX();
        if (x !== null) cols.push(makeCol(x));
      }

      for (let ci = 0; ci < cols.length; ci++) {
        const col = cols[ci];

        for (let j = 0; j < col.length; j++) {
          const charY = col.y - j * FONT_SIZE;
          if (charY < -FONT_SIZE || charY > h) continue;

          const t = 1 - j / col.length;

          if (j === 0) {
            ctx!.globalAlpha = Math.min(col.opacity * 4.5, 1.0);
            ctx!.fillStyle = "#ffffff";
            ctx!.fillText(col.chars[0], col.x, charY);

            ctx!.globalAlpha = Math.min(col.opacity * 1.5, 0.55);
            ctx!.fillStyle = col.color;
            ctx!.fillText(col.chars[0], col.x, charY);
          } else {
            const alpha = col.opacity * t * t;
            if (alpha < 0.015) continue;
            ctx!.globalAlpha = alpha;
            ctx!.fillStyle = col.color;
            ctx!.fillText(col.chars[j], col.x, charY);
          }
        }

        if (Math.random() < 0.06) {
          col.chars[Math.floor(Math.random() * col.length)] = randomChar();
        }

        col.y += col.speed * (delta / 1000);
      }

      cols = cols.filter((col) => {
        const alive = col.y - col.length * FONT_SIZE <= h;
        if (!alive) usedSlots.delete(col.x);
        return alive;
    });

      ctx!.globalAlpha = 1;
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-0"
    />
  );
}