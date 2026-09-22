"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          index="08"
          command="ls ./projects --selected"
          title="Selected Projects"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}