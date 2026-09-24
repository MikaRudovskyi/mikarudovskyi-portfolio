"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import DecryptText from "@/components/ui/DecryptText";
import HoloIDCard from "@/components/ui/HoloIDCard";

const paragraphs = [
  `I'm a Full-Stack Engineer with a background that combines web development and telecommunications. My work sits across the full stack — from building interfaces in React and Next.js to designing backend services, APIs and database schemas that hold up in production.`,
  `Alongside development, I currently work as a Support Engineer at VX Telecom, where I troubleshoot real technical incidents in live telecom environments. That side of the work has given me a practical understanding of communication protocols and infrastructure — SIP, RTP, SMPP and VoIP — and how software systems actually behave once they're running for real users, not just in a local dev environment.`,
  `I care about software architecture — how a frontend, an API layer and a backend's business logic fit together, and how a database schema should be shaped to support that. I like building things end to end, and I like the kind of problem-solving that comes from supporting systems in production, not just writing code for them.`,
  `I'm still early in my career and I'm continuously learning — but everything on this site is real: real projects, real technology choices, and a genuine mix of development and telecom experience.`,
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState<boolean[]>(
    () => paragraphs.map(() => false)
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          paragraphs.forEach((_, i) => {
            setTimeout(() => {
              setTriggered((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 220);
          });
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative border-b border-border overflow-hidden">
      <div className="grid-noise pointer-events-none absolute inset-0 opacity-40" />

      <div ref={sectionRef} className="relative mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="01" command="cat about.md" title="About" />

        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="max-w-3xl space-y-5 text-muted leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i} data-scan-target>
                <DecryptText text={p} trigger={triggered[i]} duration={900} />
              </p>
            ))}
          </div>

          <HoloIDCard />
        </div>
      </div>
    </section>
  );
}