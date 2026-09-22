"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  index,
  command,
  title,
  eyebrow,
}: {
  index?: string;
  command?: string;
  title: string;
  eyebrow?: string;
}) {
  const label = eyebrow ?? command;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-10 flex items-start gap-3"
    >
      <span className="mt-2 h-4 w-0.5 shrink-0 bg-signal/70" />
      <div>
        {label && (
          <p className="font-mono text-xs text-muted2 mb-2">{label}</p>
        )}
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-text">
          {title}
        </h2>
      </div>
    </motion.div>
  );
}