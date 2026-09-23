"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import DecryptText from "@/components/ui/DecryptText";
import TiltCard from "@/components/ui/TiltCard";
import CircuitTimeline from "@/components/ui/CircuitTimeline";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="02" command="ls ./experience" title="Experience" />

        <CircuitTimeline className="space-y-14">
          {experience.map((item, i) => (
            <ExperienceItem key={item.role + item.company} item={item} index={i} />
          ))}
        </CircuitTimeline>
      </div>
    </section>
  );
}

function ExperienceItem({
  item,
  index,
}: {
  item: (typeof experience)[number];
  index: number;
}) {
  const [inView, setInView] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <span
        data-timeline-node
        className={`locator-node ${item.current ? "is-current text-accent" : "text-muted2"}`}
      >
        <span className="locator-node-core" />
        <span className="locator-node-ping" style={{ ["--ping-delay" as string]: `${index * 0.1 + 0.35}s` }} />
      </span>
      <span className={`locator-stub ${item.current ? "text-accent" : "text-muted2"}`} />

      <TiltCard>
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
          <h3 className="font-mono text-lg font-bold text-text">
            <DecryptText text={item.role} trigger={inView} duration={650} />
          </h3>
          <span className={`timeline-chip text-xs text-muted2 ${item.current ? "is-current" : ""}`}>
            {item.period}
            {item.current && <span className="animate-blink text-accent">▍</span>}
          </span>
        </div>

        <p className="text-sm text-accent font-medium mb-3">
          <span className="timeline-underline">
            {item.company} — {item.location}
          </span>
        </p>

        <motion.ul
          className="space-y-1.5"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
          }}
        >
          {item.points.map((p) => (
            <motion.li
              key={p}
              variants={{ hidden: { opacity: 0, x: 10 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.35 }}
              className="flex gap-2 text-sm text-muted leading-relaxed"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
              {p}
            </motion.li>
          ))}
        </motion.ul>
      </TiltCard>
    </motion.div>
  );
}