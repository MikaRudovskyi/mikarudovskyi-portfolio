"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CircuitTimeline({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bus, setBus] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function measure() {
      const nodes = container!.querySelectorAll<HTMLElement>("[data-timeline-node]");
      if (nodes.length === 0) return;
      const containerRect = container!.getBoundingClientRect();
      const first = nodes[0].getBoundingClientRect();
      const last = nodes[nodes.length - 1].getBoundingClientRect();
      const top = first.top + first.height / 2 - containerRect.top;
      const bottom = last.top + last.height / 2 - containerRect.top;
      setBus({ top, height: Math.max(0, bottom - top) });
    }

    measure();
    // re-measure after framer-motion entrance animations settle
    const settleTimer = setTimeout(measure, 900);

    const ro = new ResizeObserver(measure);
    ro.observe(container);

    return () => {
      clearTimeout(settleTimer);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`timeline ${className}`}>
      {bus && (
        <motion.div
          className="timeline-bus"
          style={{ top: bus.top, height: bus.height }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      )}
      {children}
    </div>
  );
}