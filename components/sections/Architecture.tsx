"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const LAYERS = [
  {
    label: "Frontend",
    detail: "React / Next.js",
    id: "frontend",
    meta: "render · hydrate · route",
    latency: "~12ms",
  },
  {
    label: "REST API",
    detail: "",
    id: "api",
    meta: "validate · auth · serialize",
    latency: "~4ms",
  },
  {
    label: "Backend",
    detail: "Business logic · Services · Authentication",
    id: "backend",
    meta: "process · transform · emit",
    latency: "~31ms",
  },
  {
    label: "Database",
    detail: "",
    id: "db",
    meta: "query · index · persist",
    latency: "~8ms",
  },
];

function LayerConnector({ lit }: { lit: boolean }) {
  return (
    <div className="relative w-px h-7 mx-auto my-0.5 overflow-hidden">
      <div className={`absolute inset-0 transition-colors duration-300 ${lit ? "bg-signal/60" : "bg-border"}`} />
      {lit && (
        <motion.span
          className="absolute left-0 right-0 h-3 bg-gradient-to-b from-transparent via-signal to-transparent"
          initial={{ top: "-100%" }}
          animate={{ top: "200%" }}
          transition={{ duration: 0.4, ease: "linear" }}
        />
      )}
    </div>
  );
}

export default function Architecture() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const activeIndex = LAYERS.findIndex((l) => l.id === activeLayer);

  return (
    <section id="architecture" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          title="Software architecture"
          eyebrow="How a request travels through the stack"
        />

        <div className="flex flex-col items-center max-w-md mx-auto">
          {LAYERS.map((layer, i) => {
            const isActive = activeLayer === layer.id;
            const connectorLit = activeIndex === i || activeIndex === i + 1;

            return (
              <div key={layer.id} className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onMouseEnter={() => setActiveLayer(layer.id)}
                  onMouseLeave={() => setActiveLayer(null)}
                  className={`relative overflow-hidden rounded-lg border px-6 py-4 cursor-default transition-colors duration-200 min-h-[72px] flex items-center ${
                    isActive
                      ? "border-signal/60 bg-surface2"
                      : "border-border bg-surface"
                  }`}
                >
                  <span className={`absolute left-0 top-0 h-full w-0.5 transition-colors duration-200 ${isActive ? "bg-signal" : "bg-signal/60"}`} />

                  {isActive && (
                    <motion.span
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-signal/80"
                      initial={{ scaleX: 0, transformOrigin: "left" }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.35 }}
                    />
                  )}

                  <div className="flex items-center justify-between w-full">
                    <div className="text-left">
                      <p className={`font-display text-sm font-semibold transition-colors duration-200 ${isActive ? "text-signal" : "text-text"}`}>
                        {isActive ? "> " : ""}{layer.label}
                      </p>
                      <div className="h-4 mt-0.5">
                        <AnimatePresence mode="wait">
                          {isActive ? (
                            <motion.p
                              key="meta"
                              className="text-xs text-signal/60 font-mono leading-none"
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                            >
                              {layer.meta}
                            </motion.p>
                          ) : layer.detail ? (
                            <motion.p
                              key="detail"
                              className="text-xs text-muted2 leading-none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              {layer.detail}
                            </motion.p>
                          ) : <span key="empty" />}
                        </AnimatePresence>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="text-right"
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="font-mono text-xs text-muted2">latency</p>
                          <p className="font-mono text-sm text-signal">{layer.latency}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {i < LAYERS.length - 1 && <LayerConnector lit={connectorLit} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}