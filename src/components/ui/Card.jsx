/** components/ui/Card.jsx */
import React from "react";
import { cn } from "@utils/cn";

export default function Card({ children, className = "", highlighted = false, as: Tag = "div" }) {
  return (
    <Tag
      className={cn(
        "rounded-[var(--radius-lg)] bg-[var(--color-bg-surface)] p-6 transition-all duration-300",
        highlighted
          ? "shadow-[var(--shadow-lg)] ring-2 ring-[var(--color-accent)] ring-offset-2 scale-[1.02]"
          : "shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </Tag>
  );
}
