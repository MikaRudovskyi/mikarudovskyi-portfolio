"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { languages } from "@/data/languages";

const LEVEL_SIGNAL: Record<string, number> = {
  Native: 100,
  Fluent: 90,
  Advanced: 75,
  Intermediate: 55,
  Beginner: 30,
};

export default function Languages() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="languages" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="04" command="cat languages.json" title="Languages" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {languages.map((lang, i) => {
            const pct = LEVEL_SIGNAL[lang.level] ?? 50;
            const isActive = active === lang.name;

            return (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onMouseEnter={() => setActive(lang.name)}
                onMouseLeave={() => setActive(null)}
                className={`relative rounded-lg border bg-surface p-5 cursor-default overflow-hidden transition-colors duration-200 ${
                  isActive
                    ? "border-signal/60 bg-surface2"
                    : "border-border"
                }`}
              >
                <span className={`pointer-events-none absolute top-0 left-0 h-3 w-3 border-t border-l transition-all duration-300 ${isActive ? "border-signal opacity-100" : "border-signal opacity-0"}`} />
                <span className={`pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r transition-all duration-300 ${isActive ? "border-magenta opacity-100" : "border-magenta opacity-0"}`} />

                <p className={`font-mono text-xs tracking-wider mb-2 transition-colors duration-200 ${isActive ? "text-signal" : "text-muted2"}`}>
                  {isActive ? "> " : ""}{lang.name.toUpperCase()}
                </p>

                <p className={`text-sm font-medium mb-3 ${lang.level === "Native" ? "text-accent" : "text-muted"}`}>
                  {lang.level}
                </p>

                <div className="h-px w-full bg-border overflow-hidden">
                  <motion.div
                    className="h-full bg-signal"
                    style={{
                      boxShadow: isActive ? "0 0 6px 1px var(--color-signal)" : "none",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? `${pct}%` : "0%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>

                <motion.p
                  className="font-mono text-xs text-signal mt-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {pct}%
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}