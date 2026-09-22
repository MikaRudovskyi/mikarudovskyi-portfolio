"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          index="02"
          command="ls ./experience"
          title="Experience"
        />

        <div className="relative border-l border-border pl-8 space-y-12">
          {experience.map((item, i) => (
            <motion.div
              key={item.role + item.company}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span
                className={`absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full ${
                  item.current ? "bg-accent" : "bg-muted2"
                }`}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="font-mono text-lg font-bold text-text">
                  {item.role}
                </h3>
                <span className="font-mono text-xs text-muted2">
                  {item.period}
                </span>
              </div>
              <p className="text-sm text-accent font-medium mb-3">
                {item.company} — {item.location}
              </p>
              <ul className="space-y-1.5">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-muted leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}