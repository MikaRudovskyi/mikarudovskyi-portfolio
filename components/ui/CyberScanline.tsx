"use client";

import { useEffect, useRef } from "react";

const AUTO_BASE_SPEED = 0.05;
const AUTO_SPEED_VARIANCE = 0.7;
const GLITCH_DURATION_MS = 220;

interface ScanTarget {
  el: HTMLElement;
  top: number;
  bottom: number;
  triggered: boolean;
}

export default function CyberScanline({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const y = useRef(-8);
  const autoPhase = useRef(0);
  const containerHeight = useRef(0);
  const targets = useRef<ScanTarget[]>([]);

  const diagnosticTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container === null) {
      return;
    }

    const element = container;

    function recalc() {
      const rect = element.getBoundingClientRect();

      containerHeight.current = rect.height;

      const els = Array.from(
        element.querySelectorAll<HTMLElement>("[data-scan-target]")
      );

      targets.current = els.map((el) => {
        const r = el.getBoundingClientRect();

        return {
          el,
          top: ((r.top - rect.top) / rect.height) * 100,
          bottom: ((r.bottom - rect.top) / rect.height) * 100,
          triggered: false,
        };
      });
    }

    recalc();

    const settleTimer = setTimeout(recalc, 900);

    const ro = new ResizeObserver(recalc);
    ro.observe(element);

    function scheduleDiagnostic() {
      const delay = 11000 + Math.random() * 9000;

      diagnosticTimer.current = setTimeout(() => {
        wrapRef.current?.classList.add("scan-diagnostic");

        setTimeout(() => {
          wrapRef.current?.classList.remove("scan-diagnostic");
        }, 650);

        scheduleDiagnostic();
      }, delay);
    }

    scheduleDiagnostic();

    function tick() {
      autoPhase.current += 0.012;

      const speed =
        AUTO_BASE_SPEED *
        (1 + AUTO_SPEED_VARIANCE * Math.sin(autoPhase.current));

      y.current += Math.max(speed, AUTO_BASE_SPEED * 0.25);

      if (y.current > 108) {
        y.current = -8;
      }

      const px = (y.current / 100) * containerHeight.current;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(0, ${px}px, 0)`;

        const edgeFade =
          y.current < 4
            ? y.current / 4
            : y.current > 96
              ? (100 - y.current) / 4
              : 1;

        wrapRef.current.style.opacity = String(
          Math.max(0, Math.min(1, edgeFade))
        );
      }

      for (const target of targets.current) {
        const inRange =
          y.current >= target.top - 1 &&
          y.current <= target.bottom + 1;

        if (inRange && !target.triggered) {
          target.triggered = true;

          target.el.classList.add("scan-glitch");

          setTimeout(() => {
            target.el.classList.remove("scan-glitch");
          }, GLITCH_DURATION_MS);
        } else if (!inRange && target.triggered) {
          target.triggered = false;
        }
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      clearTimeout(settleTimer);

      ro.disconnect();

      if (diagnosticTimer.current) {
        clearTimeout(diagnosticTimer.current);
      }

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [containerRef]);

  return (
    <div className="scanline-wrap">
      <div ref={wrapRef} className="scan-beam-wrap">
        <div className="scan-line-secondary scan-line-sec-1" />
        <div className="scan-line-secondary scan-line-sec-2" />

        <div className="scan-line-main">
          <div className="scan-core" />
        </div>

        <div className="scan-line-secondary scan-line-sec-3" />
        <div className="scan-line-secondary scan-line-sec-4" />
      </div>
    </div>
  );
}