"use client";

import { useRef } from "react";

const barcodeWidths = [2, 1, 3, 1, 1, 4, 2, 1, 3, 2, 1, 1, 4, 1, 2, 3, 1, 2, 1, 4, 2, 1, 3, 1];

export default function HoloIDCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    el.style.setProperty("--rx", `${(px - 0.5) * 16}deg`);
    el.style.setProperty("--ry", `${(0.5 - py) * 16}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  }

  function handleLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--gx", "50%");
    el.style.setProperty("--gy", "50%");
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="holo-card"
    >
      <div className="holo-card-glare" />
      <span className="holo-corner holo-corner-tl" />
      <span className="holo-corner holo-corner-tr" />
      <span className="holo-corner holo-corner-bl" />
      <span className="holo-corner holo-corner-br" />

      <div className="holo-card-inner">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-muted2">
          <span>ID // MR-2006</span>
          <span className="flex items-center gap-1 text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
            VERIFIED
          </span>
        </div>

        <div className="holo-avatar">
          <div className="holo-avatar-ring" />
          <span className="holo-avatar-initials">MR</span>
        </div>

        <div className="text-center">
          <div className="font-display text-lg text-text">
            Mykhailo Rudovskyi
          </div>
          <div className="font-mono text-[11px] text-signal">
            FULL-STACK / SUPPORT ENGINEER
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[10px] text-muted2">
          <div>
            CLEARANCE
            <div className="text-text">LEVEL 999</div>
          </div>
          <div>
            LOCATION
            <div className="text-text">IT / REMOTE</div>
          </div>
          <div>
            UPTIME
            <div className="text-text">24 / 7</div>
          </div>
          <div>
            STACK
            <div className="text-text">WEB + TELECOM</div>
          </div>
        </div>

        <div className="holo-barcode">
          {barcodeWidths.map((w, i) => (
            <span key={i} style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>
    </div>
  );
}