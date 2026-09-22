"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);
  const headerClass = scrolled
    ? "fixed top-0 inset-x-0 z-50 transition-colors duration-300 bg-bg/85 backdrop-blur border-b border-border"
    : "fixed top-0 inset-x-0 z-50 transition-colors duration-300 bg-transparent";

  return (
    <header className={headerClass}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5 font-display text-base font-semibold text-text">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          Mykhailo Rudovskyi
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-muted">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-text transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button aria-label="Toggle menu" className="md:hidden text-text" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-b border-border bg-bg"
          >
            <ul className="flex flex-col gap-1 px-6 py-4 text-sm text-muted">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={closeMenu} className="block py-2 hover:text-text transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}