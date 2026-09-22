"use client";

import { motion } from "framer-motion";

export default function FlowLine({ height = 32 }: { height?: number }) {
  return (
    <svg width="24" height={height} viewBox={`0 0 24 ${height}`} className="mx-auto overflow-visible">
      <line x1="12" y1="0" x2="12" y2={height} stroke="currentColor" strokeWidth="1.5" className="text-border" />
      <motion.circle
        cx="12"
        r="3"
        fill="currentColor"
        className="text-signal"
        initial={{ opacity: 0 }}
        whileInView={{ cy: [0, height], opacity: [0, 1, 1, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, repeat: 1, repeatDelay: 0.6, ease: "easeInOut" }}
      />
    </svg>
  );
}