"use client";

import { useEffect, useRef, useState } from "react";

export default function TypewriterName({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setCount(text.length);
      setTyping(false);
      return;
    }

    let interval: ReturnType<typeof setInterval> | null = null;

    function startTyping() {
      if (interval) clearInterval(interval);
      setCount(0);
      setTyping(true);

      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            if (interval) clearInterval(interval);
            setTyping(false);
            return c;
          }
          return c + 1;
        });
      }, 65);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTyping();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [text]);

  return (
    <span ref={ref} className="relative inline-block">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="gradient-name">
        {text.slice(0, count)}
      </span>
      <span
        aria-hidden="true"
        className={`ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.08em] bg-accent align-middle ${
          typing ? "opacity-100" : "animate-caret-blink"
        }`}
      />
    </span>
  );
}
