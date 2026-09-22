"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { education } from "@/data/education";

export default function Education() {
  return (
    <section id="education" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="03" command="ls ./education" title="Education" />

        <div className="relative border-l border-border pl-8 space-y-10">
          {education.map((item, i) => (
            <motion.div
              key={item.title + item.period}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <span
                className={`absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full ${
                  item.current ? "bg-accent" : "bg-muted2"
                }`}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="font-mono text-base font-bold text-text">
                  {item.title}
                </h3>
                <span className="font-mono text-xs text-muted2">
                  {item.period}
                </span>
              </div>
              <p className="text-sm text-muted">
                {item.institution}
                {item.specialization ? ` — ${item.specialization}` : ""}
              </p>
              <p className="text-xs text-muted2 mt-1">{item.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}