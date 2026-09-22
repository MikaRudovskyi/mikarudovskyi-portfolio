"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { languages } from "@/data/languages";

export default function Languages() {
  return (
    <section id="languages" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="04" command="cat languages.json" title="Languages" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <p className="font-mono text-xs tracking-wider text-muted2 mb-2">
                {lang.name.toUpperCase()}
              </p>
              <p
                className={`text-sm font-medium ${
                  lang.level === "Native" ? "text-accent" : "text-muted"
                }`}
              >
                {lang.level}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}