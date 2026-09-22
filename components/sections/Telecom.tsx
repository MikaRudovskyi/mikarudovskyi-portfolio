"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import FlowLine from "@/components/ui/FlowLine";

const PROTOCOLS = ["SIP", "RTP", "SMPP", "VoIP"];

function Node({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div
      className={
        accent
          ? "relative overflow-hidden rounded-md border border-signal/40 bg-signal/10 px-5 py-3 text-center"
          : "relative overflow-hidden rounded-md border border-border bg-surface2 px-5 py-3 text-center"
      }
    >
      {accent && <span className="absolute left-0 top-0 h-full w-0.5 bg-signal" />}
      <span className={accent ? "font-mono text-sm text-signal" : "font-mono text-sm text-text"}>{label}</span>
    </div>
  );
}

export default function Telecom() {
  return (
    <section id="telecom" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading title="Telecom & API integration" eyebrow="From client request to protocol layer" />
        <p className="max-w-2xl text-muted leading-relaxed mb-12">
          A simplified view of how a request travels from the client through the API layer into backend logic that speaks directly to telecommunications protocols.
        </p>

        <div className="flex flex-col items-center max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4 }} className="w-full">
            <Node label="Client" />
          </motion.div>
          <FlowLine height={28} />
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: 0.08 }} className="w-full">
            <Node label="REST API" />
          </motion.div>
          <FlowLine height={28} />
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: 0.16 }} className="w-full">
            <Node label="Backend" accent />
          </motion.div>
          <FlowLine height={20} />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {PROTOCOLS.map((p) => (
              <motion.div key={p} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                <Node label={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}