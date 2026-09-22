"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const cardClass = project.featured
    ? "flex flex-col overflow-hidden rounded-lg border bg-surface transition-colors border-signal/40 md:col-span-2 bg-gradient-to-b from-surface to-surface2"
    : "flex flex-col overflow-hidden rounded-lg border bg-surface transition-colors border-border hover:border-borderHover";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={cn(cardClass)}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-danger/50" />
        <span className="h-2 w-2 rounded-full bg-amber/50" />
        <span className="h-2 w-2 rounded-full bg-signal/50" />
        <span className="ml-2 font-mono text-xs text-muted2">{project.slug}.ts</span>
        {project.featured && (
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 text-xs text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="font-display text-lg font-semibold text-text mb-2">{project.name}</h3>
        <p className="text-sm text-muted leading-relaxed mb-5">{project.description}</p>

        <div className="mb-5">
          <p className="text-xs text-muted2 mb-2">Tech stack</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded border border-border bg-surface2 px-2 py-1 text-xs font-mono text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 flex-1">
          <p className="text-xs text-muted2 mb-2">Key features</p>
          <ul className="space-y-1.5">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2 text-sm text-muted leading-relaxed">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 mt-auto">
          {project.live ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 text-sm font-medium text-bg hover:bg-signal/90 transition-colors">
              <ExternalLink size={15} />
              <span>Live demo</span>
            </a>
          ) : null}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-text hover:border-borderHover hover:bg-surface2 transition-colors">
            <Github size={15} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}