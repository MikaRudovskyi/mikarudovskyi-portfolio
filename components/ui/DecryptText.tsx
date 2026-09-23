"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01";

export default function DecryptText({
  text,
  trigger,
  duration = 650,
  className = "",
}: {
  text: string;
  trigger: boolean;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const started = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    const start = performance.now();
    const len = text.length;

    function frame(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const revealCount = Math.floor(progress * len);

      let out = "";
      for (let i = 0; i < len; i++) {
        if (text[i] === " ") {
          out += " ";
        } else if (i < revealCount) {
          out += text[i];
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(out);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(frame);
      } else {
        setDisplay(text);
      }
    }

    rafId.current = requestAnimationFrame(frame);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [trigger, text, duration]);

  return <span className={className}>{display}</span>;
}