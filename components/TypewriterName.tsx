"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function TypewriterName({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [tickCount, setTickCount] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const count = reduceMotion ? text.length : tickCount;
  const typing = reduceMotion ? false : isTyping;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    function startTyping() {
      if (interval) clearInterval(interval);
      setTickCount(0);
      setIsTyping(true);

      interval = setInterval(() => {
        setTickCount((c) => {
          if (c >= text.length) {
            if (interval) clearInterval(interval);
            setIsTyping(false);
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
  }, [text, reduceMotion]);

  return (
    <span ref={ref} className="relative inline-block">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="gradient-name">
        {text.slice(0, count)}
      </span>
      <span
        aria-hidden="true"
        className={`ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.08em] bg-accent align-middle transition-opacity duration-500 ${
          typing ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
}
