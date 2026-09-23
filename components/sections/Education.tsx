"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import DecryptText from "@/components/ui/DecryptText";
import TiltCard from "@/components/ui/TiltCard";
import CircuitTimeline from "@/components/ui/CircuitTimeline";
import { education } from "@/data/education";

export default function Education() {
  return (
    <section id="education" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="03" command="ls ./education" title="Education" />

        <CircuitTimeline className="space-y-12">
          {education.map((item, i) => (
            <EducationItem key={item.title + item.period} item={item} index={i} />
          ))}
        </CircuitTimeline>
      </div>
    </section>
  );
}

function EducationItem({
  item,
  index,
}: {
  item: (typeof education)[number];
  index: number;
}) {
  const [inView, setInView] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative"
    >
      <span
        data-timeline-node
        className={`locator-node ${item.current ? "is-current text-accent" : "text-muted2"}`}
      >
        <span className="locator-node-core" />
        <span className="locator-node-ping" style={{ ["--ping-delay" as string]: `${index * 0.08 + 0.35}s` }} />
      </span>
      <span className={`locator-stub ${item.current ? "text-accent" : "text-muted2"}`} />

      <TiltCard>
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
          <h3 className="font-mono text-base font-bold text-text">
            <DecryptText text={item.title} trigger={inView} duration={550} />
          </h3>
          <span className={`timeline-chip text-xs text-muted2 ${item.current ? "is-current" : ""}`}>
            {item.period}
            {item.current && <span className="animate-blink text-accent">▍</span>}
          </span>
        </div>

        <p className="text-sm text-muted">
          <span className="timeline-underline">
            {item.institution}
            {item.specialization ? ` — ${item.specialization}` : ""}
          </span>
        </p>
        <p className="text-xs text-muted2 mt-1">{item.location}</p>
      </TiltCard>
    </motion.div>
  );
}