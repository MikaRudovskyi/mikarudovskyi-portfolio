"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { techStack, designTools } from "@/data/techstack";

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
                  <span
                    key={item}
                    className="rounded border border-border bg-surface2 px-2.5 py-1 text-xs font-mono text-muted"
                  >
                    {item}
                  </span>
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
                <span
                  key={item}
                  className="rounded border border-border bg-surface2 px-2.5 py-1 text-xs font-mono text-muted2"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}