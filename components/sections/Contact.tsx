"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading title="Get in touch" eyebrow="Contact" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl rounded-lg border border-border bg-surface p-8"
        >
          <p className="text-muted leading-relaxed mb-8">
            Looking for collaboration, development opportunities, or interesting technical problems? Let's talk.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="mailto:mikhail.rudovsky@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-sm font-medium text-bg hover:bg-signal/90 transition-colors">
              <Mail size={16} />
              <span>Email</span>
            </a>
            <a href="https://github.com/MikaRudovskyi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-text hover:border-borderHover hover:bg-surface2 transition-colors">
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/mykhailo-rudovskyi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-text hover:border-borderHover hover:bg-surface2 transition-colors">
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}