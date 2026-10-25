import type { ReactNode } from "react";

/** Quiet surface with a hairline border; lifts gently on hover (see `.card`). */
export default function Card({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return <div className={`card ${hover ? "card-hover" : ""} ${className}`}>{children}</div>;
}
