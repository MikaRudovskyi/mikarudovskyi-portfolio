"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";
import HudCorners from "@/components/ui/HudCorners";
import DecryptText from "@/components/ui/DecryptText";

export default function ProjectCard({ project }: { project: Project }) {
  const [accessed, setAccessed] = useState(false);
  const [booting, setBooting] = useState(false);

  const cardClass = project.featured
    ? "group relative flex flex-col overflow-hidden rounded-lg border bg-surface transition-colors neon-border-signal md:col-span-2 bg-gradient-to-b from-surface to-surface2"
    : "group relative flex flex-col overflow-hidden rounded-lg border bg-surface transition-colors border-border hover:border-borderHover";

  const imageSizes = project.featured
    ? "(min-width: 1024px) 1120px, 100vw"
    : "(min-width: 1024px) 544px, 100vw";

  function handleEnter() {
    if (accessed) return;
    setAccessed(true);
    setBooting(true);
    setTimeout(() => setBooting(false), 1300);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      onMouseEnter={handleEnter}
      className={cn(cardClass)}
    >
      <HudCorners />

      <div className="flex items-center gap-1.5 border-b border-border px-5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-danger/50" />
        <span className="h-2 w-2 rounded-full bg-amber/50" />
        <span className="h-2 w-2 rounded-full bg-signal/50" />
        <span className="ml-2 font-mono text-xs text-muted2">{project.slug}.ts</span>
        {project.featured && (
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 text-xs text-signal">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            Featured
          </span>
        )}
      </div>

      <div className="relative w-full overflow-hidden border-b border-border bg-surface2 aspect-[1920/907]">
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          sizes={imageSizes}
          quality={90}
          className="object-cover object-top transition-[filter] duration-300 group-hover:[filter:drop-shadow(2px_0_0_rgba(255,46,122,0.55))_drop-shadow(-2px_0_0_rgba(69,214,194,0.55))]"
        />

        <div className={cn("project-boot-overlay", booting && "is-active")}>
          <div className="project-boot-scanline" />
          <div className="space-y-1 font-mono text-[11px] text-signal">
            <p>
              <DecryptText text="> mounting asset..." trigger={accessed} duration={350} />
            </p>
            <p>
              <DecryptText text="> integrity check: OK" trigger={accessed} duration={450} />
            </p>
            <p>
              <DecryptText text={`> access granted: ${project.slug}`} trigger={accessed} duration={550} />
            </p>
          </div>
        </div>
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
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="neon-btn inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 text-sm font-medium text-bg hover:bg-signal/90 transition-colors">
              <ExternalLink size={15} />
              <span>Live demo</span>
            </a>
          ) : null}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-text hover:border-borderHover hover:bg-surface2 transition-colors">
            <Github size={15} />
            <span>GitHub</span>
          </a>
        </div>

        {project.demoNote && (
          <p className="mt-4 flex items-start gap-2 text-xs text-muted2 leading-relaxed">
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber" />
            <span>{project.demoNote}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}