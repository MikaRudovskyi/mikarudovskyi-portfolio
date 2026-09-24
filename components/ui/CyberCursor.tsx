"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const RING_SMOOTHING_MS = 50;

export default function CyberCursor() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const active = useRef(false);
  const rafId = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    function setVisible(v: boolean) {
      const val = v ? "1" : "0";
      if (dotRef.current) dotRef.current.style.opacity = val;
      if (ringRef.current) ringRef.current.style.opacity = val;
      if (coordsRef.current) coordsRef.current.style.opacity = val;
    }

    function handleMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!active.current) {
        active.current = true;
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
        setVisible(true);
      }
    }

    function handleLeave() {
      active.current = false;
      setVisible(false);
    }

    function tick(timestamp: number) {
      if (lastTime.current === null) {
        lastTime.current = timestamp;
      }
      const dt = timestamp - lastTime.current;
      lastTime.current = timestamp;

      // коефіцієнт згладжування, незалежний від частоти кадрів
      const smoothing = 1 - Math.exp(-dt / RING_SMOOTHING_MS);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      ring.current.x += (mouse.current.x - ring.current.x) * smoothing;
      ring.current.y += (mouse.current.y - ring.current.y) * smoothing;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (coordsRef.current) {
        coordsRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(16px, 16px)`;
        coordsRef.current.textContent = `X:${String(Math.round(mouse.current.x)).padStart(4, "0")} Y:${String(Math.round(mouse.current.y)).padStart(4, "0")}`;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      lastTime.current = null;
    };
  }, []);

  const cursorElements = (
    <>
      <span ref={dotRef} className="hud-cursor-dot" style={{ opacity: 0 }} />

      <div ref={ringRef} className="hud-cursor-ring-wrap" style={{ opacity: 0 }}>
        <svg width="50" height="50" viewBox="0 0 50 50" className="hud-cursor-spin">
          <circle cx="25" cy="25" r="21" fill="none" stroke="var(--color-signal)" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="25" cy="25" r="14" fill="none" stroke="var(--color-magenta)" strokeOpacity="0.45" strokeWidth="1" />
        </svg>
        <span className="hud-cursor-tick hud-cursor-tick-t" />
        <span className="hud-cursor-tick hud-cursor-tick-r" />
        <span className="hud-cursor-tick hud-cursor-tick-b" />
        <span className="hud-cursor-tick hud-cursor-tick-l" />
      </div>

      <div ref={coordsRef} className="hud-cursor-coords" style={{ opacity: 0 }} />
    </>
  );

  if (!mounted) return null;

  return createPortal(cursorElements, document.body);
}