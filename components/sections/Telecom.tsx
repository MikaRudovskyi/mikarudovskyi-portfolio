"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const PROTOCOLS = ["SIP", "RTP", "SMPP", "VoIP"];

function Node({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-border bg-surface2 px-5 py-3 font-mono text-sm text-text text-center">
      {label}
    </div>
  );
}

export default function Telecom() {
  return (
    <section id="telecom" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          index="06"
          command="trace ./telecom-stack"
          title="Telecom & API Integration"
        />
        <p className="max-w-2xl text-muted leading-relaxed mb-12">
          A simplified view of how a request travels from the client through
          the API layer into backend logic that speaks directly to
          telecommunications protocols.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.12 }}
          className="flex flex-col items-center gap-3 max-w-md mx-auto"
        >
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full">
            <Node label="CLIENT" />
          </motion.div>
          <span className="text-muted2 font-mono">│</span>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full">
            <Node label="REST API" />
          </motion.div>
          <span className="text-muted2 font-mono">│</span>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full">
            <div className="rounded-md border border-accent/40 bg-accent/10 px-5 py-3 font-mono text-sm text-accent text-center">
              BACKEND
            </div>
          </motion.div>

          <div className="w-full mt-4 grid grid-cols-2 gap-3">
            {PROTOCOLS.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Node label={p} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}