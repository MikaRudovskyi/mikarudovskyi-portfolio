"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BOOT_LINES = [
  "loading profile: mykhailo_rudovskyi",
  "modules: react, node, dotnet, postgresql",
  "link established: sip · rtp · smpp · voip",
  "status: ready",
];

const STATUS = [
  { label: "Available", tone: "signal" as const },
  { label: "Backend", tone: "muted" as const },
  { label: "Full-stack", tone: "muted" as const },
  { label: "Telecom", tone: "muted" as const },
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) return;
    const id = setTimeout(() => setVisibleLines((v) => v + 1), 420);
    return () => clearTimeout(id);
  }, [visibleLines]);

  return (
    <section id="top" className="relative flex min-h-screen items-center border-b border-border grid-noise">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-32 w-full lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-text">
            Mykhailo Rudovskyi
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-4 text-lg md:text-xl text-muted">
            Full-Stack Engineer, Support Engineer, and someone who spends most days moving between application code and live telecom infrastructure.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="rounded-md bg-signal px-6 py-3 text-sm font-medium text-bg hover:bg-signal/90 transition-colors">
              View projects
            </a>
            <a href="#contact" className="rounded-md border border-border px-6 py-3 text-sm font-medium text-text hover:border-borderHover hover:bg-surface transition-colors">
              Get in touch
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} className="mt-12">
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
              {STATUS.map((s) => (
                <span key={s.label} className="flex items-center gap-2 text-sm text-muted">
                  <span className={s.tone === "signal" ? "h-1.5 w-1.5 rounded-full bg-signal" : "h-1.5 w-1.5 rounded-full bg-muted2"} />
                  {s.label}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 rounded-md border border-border bg-surface/60 px-4 py-3 max-w-sm">
              <span className="font-mono text-xs text-muted2 shrink-0">live signal</span>
              <svg viewBox="0 0 200 24" className="h-6 flex-1 text-signal" preserveAspectRatio="none">
                <motion.path
                  d="M0,12 H20 L24,4 L28,20 L32,12 H70 L74,6 L78,18 L82,12 H120 L124,3 L128,21 L132,12 H170 L174,6 L178,18 L182,12 H200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 0.6 }}
                />
              </svg>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-lg border border-border bg-surface overflow-hidden">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal/60" />
            <span className="ml-2 font-mono text-xs text-muted2">boot.log</span>
          </div>
          <div className="p-5 font-mono text-sm leading-relaxed min-h-[9.5rem]">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <p key={line} className={i === BOOT_LINES.length - 1 ? "text-signal" : "text-muted"}>
                <span className="text-muted2">$ </span>
                {line}
              </p>
            ))}
            {visibleLines < BOOT_LINES.length && <span className="inline-block h-4 w-2 bg-signal/70 animate-blink" />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}