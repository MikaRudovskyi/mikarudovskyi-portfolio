"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const LAYERS = [
  { label: "FRONTEND", detail: "React / Next.js" },
  { label: "REST API", detail: "" },
  { label: "BACKEND", detail: "Business Logic · Services · Authentication" },
  { label: "DATABASE", detail: "" },
];

export default function Architecture() {
  return (
    <section id="architecture" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          index="07"
          command="inspect ./architecture"
          title="Software Architecture"
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          className="flex flex-col items-center gap-3 max-w-md mx-auto"
        >
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              className="w-full"
            >
              <div className="rounded-lg border border-border bg-surface px-6 py-4 text-center">
                <p className="font-mono text-sm font-bold text-text">
                  {layer.label}
                </p>
                {layer.detail && (
                  <p className="text-xs text-muted2 mt-1">{layer.detail}</p>
                )}
              </div>
              {i < LAYERS.length - 1 && (
                <div className="flex justify-center py-2 text-muted2 font-mono">
                  ▼
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}