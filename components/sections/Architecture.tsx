"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import FlowLine from "@/components/ui/FlowLine";

const LAYERS = [
  { label: "Frontend", detail: "React / Next.js" },
  { label: "REST API", detail: "" },
  { label: "Backend", detail: "Business logic · Services · Authentication" },
  { label: "Database", detail: "" },
];

export default function Architecture() {
  return (
    <section id="architecture" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading title="Software architecture" eyebrow="How a request travels through the stack" />

        <div className="flex flex-col items-center max-w-md mx-auto">
          {LAYERS.map((layer, i) => (
            <div key={layer.label} className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative overflow-hidden rounded-lg border border-border bg-surface px-6 py-4 text-center"
              >
                <span className="absolute left-0 top-0 h-full w-0.5 bg-signal/60" />
                <p className="font-display text-sm font-semibold text-text">{layer.label}</p>
                {layer.detail && <p className="text-xs text-muted2 mt-1">{layer.detail}</p>}
              </motion.div>
              {i < LAYERS.length - 1 && <FlowLine height={28} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}