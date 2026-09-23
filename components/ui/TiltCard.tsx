"use client";

import { useRef } from "react";

export default function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const pending = useRef<{ rx: number; ry: number; mx: number; my: number } | null>(null);

  function schedule() {
    if (raf.current !== null) return;
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      const p = pending.current;
      if (el && p) {
        el.style.transform = `perspective(900px) rotateX(${p.rx}deg) rotateY(${p.ry}deg)`;
        el.style.setProperty("--spot-x", `${p.mx}%`);
        el.style.setProperty("--spot-y", `${p.my}%`);
      }
      raf.current = null;
    });
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    pending.current = {
      rx: (0.5 - py) * 5,
      ry: (px - 0.5) * 7,
      mx: px * 100,
      my: py * 100,
    };
    schedule();
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    el.style.setProperty("--spot-x", "50%");
    el.style.setProperty("--spot-y", "50%");
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="tilt-card-spotlight" />
      <div className="tilt-card-content">{children}</div>
    </div>
  );
}