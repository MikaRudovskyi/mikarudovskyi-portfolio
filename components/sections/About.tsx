"use client";

import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading index="01" command="cat about.md" title="About" />
        <div className="max-w-3xl space-y-5 text-muted leading-relaxed">
          <p>
            I'm a Full-Stack Engineer with a background that combines web
            development and telecommunications. My work sits across the full
            stack — from building interfaces in React and Next.js to
            designing backend services, APIs and database schemas that hold
            up in production.
          </p>
          <p>
            Alongside development, I currently work as a Support Engineer at
            VX Telecom, where I troubleshoot real technical incidents in live
            telecom environments. That side of the work has given me a
            practical understanding of communication protocols and
            infrastructure — SIP, RTP, SMPP and VoIP — and how software
            systems actually behave once they're running for real users, not
            just in a local dev environment.
          </p>
          <p>
            I care about software architecture — how a frontend, an API layer
            and a backend's business logic fit together, and how a database
            schema should be shaped to support that. I like building things
            end to end, and I like the kind of problem-solving that comes
            from supporting systems in production, not just writing code for
            them.
          </p>
          <p>
            I'm still early in my career and I'm continuously learning — but
            everything on this site is real: real projects, real technology
            choices, and a genuine mix of development and telecom experience.
          </p>
        </div>
      </div>
    </section>
  );
}