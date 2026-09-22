"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { techStack, designTools } from "@/data/techstack";

function TechBadge({ item }: { item: string }) {
  const [scanned, setScanned] = useState(false);

  return (
    <motion.span
      key={item}
      onMouseEnter={() => setScanned(true)}
      onMouseLeave={() => setScanned(false)}
      animate={
        scanned
          ? { scale: [1, 1.08, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 0.25 }}
      className={`relative rounded border px-2.5 py-1 text-xs font-mono cursor-default select-none transition-colors duration-150 ${
        scanned
          ? "border-signal/50 bg-signal/10 text-signal"
          : "border-border bg-surface2 text-muted"
      }`}
      style={
        scanned
          ? { textShadow: "0 0 8px var(--color-signal)", boxShadow: "0 0 10px 1px color-mix(in srgb, var(--color-signal) 25%, transparent)" }
          : undefined
      }
    >
      {scanned && (
        <motion.span
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-signal"
          initial={{ scaleX: 0, opacity: 0.8 }}
          animate={{ scaleX: [0, 1, 1, 0], opacity: [0.8, 1, 1, 0], top: ["0%", "0%", "100%", "100%"] }}
          transition={{ duration: 0.4, ease: "linear" }}
        />
      )}
      {item}
    </motion.span>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="05" command="cat stack.yml" title="Tech Stack" />

        <div className="grid md:grid-cols-2 gap-6">
          {techStack.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <p className="font-mono text-xs tracking-wider text-accent mb-4">
                {cat.title.toUpperCase()}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <TechBadge key={item} item={item} />
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="rounded-lg border border-dashed border-border p-6"
          >
            <p className="font-mono text-xs tracking-wider text-muted2 mb-4">
              {designTools.title.toUpperCase()}
            </p>
            <div className="flex flex-wrap gap-2">
              {designTools.items.map((item) => (
                <TechBadge key={item} item={item} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}