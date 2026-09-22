"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const PROTOCOLS = [
  { label: "SIP", desc: "Session init" },
  { label: "RTP", desc: "Media stream" },
  { label: "SMPP", desc: "SMS delivery" },
  { label: "VoIP", desc: "Voice over IP" },
];

const FLOW_NODES = [
  { label: "Client", id: "client" },
  { label: "REST API", id: "api" },
  { label: "Backend", id: "backend", accent: true },
];

function DataPacket({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-signal z-10"
          style={{ boxShadow: "0 0 6px 2px var(--color-signal)" }}
          initial={{ top: 0, opacity: 1 }}
          animate={{ top: "100%", opacity: [1, 1, 0] }}
          exit={{}}
          transition={{ duration: 0.45, ease: "linear" }}
        />
      )}
    </AnimatePresence>
  );
}

function FlowConnector({ sending }: { sending: boolean }) {
  return (
    <div className="relative w-px h-7 bg-border mx-auto my-0.5">
      <DataPacket active={sending} />
    </div>
  );
}

function FlowNode({
  label,
  accent = false,
  active,
  onActivate,
}: {
  label: string;
  accent?: boolean;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onActivate}
      animate={active ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.15 }}
      className={`relative overflow-hidden rounded-md border px-5 py-3 text-center cursor-default transition-colors duration-200 ${
        active
          ? accent
            ? "border-signal bg-signal/15"
            : "border-signal/50 bg-surface2"
          : accent
            ? "border-signal/40 bg-signal/10"
            : "border-border bg-surface2"
      }`}
    >
      {accent && (
        <span className="absolute left-0 top-0 h-full w-0.5 bg-signal" />
      )}
      {active && (
        <motion.span
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-signal/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <span className={`font-mono text-sm ${active || accent ? "text-signal" : "text-text"}`}>
        {active ? "> " : ""}{label}
      </span>
      {active && (
        <motion.span
          className="absolute top-1 right-2 font-mono text-[10px] text-signal/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          OK
        </motion.span>
      )}
    </motion.div>
  );
}

function ProtocolNode({ label, desc }: { label: string; desc: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={hovered ? { scale: 1.04 } : { scale: 1 }}
      transition={{ duration: 0.15 }}
      className={`relative overflow-hidden rounded-md border px-3 py-3 text-center cursor-default transition-colors duration-200 min-h-[64px] flex flex-col items-center justify-center ${
        hovered ? "border-signal/50 bg-signal/10" : "border-border bg-surface2"
      }`}
    >
      <span className={`font-mono text-sm block transition-colors duration-200 ${hovered ? "text-signal" : "text-text"}`}>
        {label}
      </span>
      <div className="h-5 flex items-center justify-center mt-1">
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.span
              key="active"
              className="flex items-center gap-1"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
              <span className="font-mono text-[10px] text-signal">ACTIVE</span>
            </motion.span>
          ) : (
            <motion.span
              key="desc"
              className="font-mono text-[10px] text-muted2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {desc}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Telecom() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  function handleActivate(id: string) {
    setActiveNode(id);
    setSending(false);
    setTimeout(() => setSending(true), 50);
    setTimeout(() => setSending(false), 550);
  }

  return (
    <section id="telecom" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          title="Telecom & API integration"
          eyebrow="From client request to protocol layer"
        />
        <p className="max-w-2xl text-muted leading-relaxed mb-12">
          A simplified view of how a request travels from the client through the
          API layer into backend logic that speaks directly to telecommunications
          protocols.
        </p>

        <div className="flex flex-col items-center max-w-md mx-auto">
          {FLOW_NODES.map((node, i) => (
            <div key={node.id} className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <FlowNode
                  label={node.label}
                  accent={node.accent}
                  active={activeNode === node.id}
                  onActivate={() => handleActivate(node.id)}
                />
              </motion.div>
              {i < FLOW_NODES.length - 1 && (
                <FlowConnector sending={activeNode === node.id && sending} />
              )}
            </div>
          ))}

          <div className="relative w-px h-5 bg-border mx-auto" />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {PROTOCOLS.map((p) => (
              <motion.div
                key={p.label}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              >
                <ProtocolNode label={p.label} desc={p.desc} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}