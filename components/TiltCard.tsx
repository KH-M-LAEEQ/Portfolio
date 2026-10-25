"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

/**
 * Wraps a card in a subtle cursor-driven 3D tilt. Transform is written
 * straight to the DOM node on move instead of through state, so the tilt
 * stays smooth at 60fps without triggering React re-renders per pixel.
 */
export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`[transform-style:preserve-3d] transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
