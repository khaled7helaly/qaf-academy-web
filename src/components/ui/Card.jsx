/** components/ui/Card.jsx */
import React, { forwardRef } from "react";
import { cn } from "@utils/cn";

/*
 * Class lists are plain strings (no nested arrays) so they work with any `cn`.
 * The `color:` / `shadow:` hints stop Tailwind from guessing the wrong utility
 * type when the value is a CSS variable (v3 can read shadow-[var(--x)] as a
 * shadow *colour*, which silently drops the shadow).
 */
const BASE =
  "rounded-[var(--radius-lg)] bg-[var(--color-bg-surface)] p-6 " +
  "transition-[box-shadow,transform,translate,scale] duration-300 motion-reduce:transition-none";

const HIGHLIGHTED =
  "shadow-[shadow:var(--shadow-lg)] ring-2 ring-[color:var(--color-accent)] " +
  "ring-offset-2 ring-offset-[color:var(--color-bg-muted)] " +
  // Scale only on wide screens so it never causes horizontal scroll on mobile
  "lg:scale-[1.02]";

const DEFAULT =
  "shadow-[shadow:var(--shadow-md)] hover:shadow-[shadow:var(--shadow-lg)] " +
  "hover:-translate-y-0.5 motion-reduce:hover:translate-y-0";

/**
 * Surface container.
 *
 * - `as`          : rendered element ("div" | "article" | "section" | "li" ...)
 * - `highlighted` : emphasised variant (ring + larger shadow)
 * - any other prop (aria-*, id, data-*, onClick, ...) is forwarded to the element
 *
 * `className` is merged last so it can override the defaults, e.g.
 * `ring-offset-[color:var(--color-bg)]` when the card sits on another background.
 */
const Card = forwardRef(function Card(
  { children, className, highlighted = false, as: Tag = "div", ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={cn(BASE, highlighted ? HIGHLIGHTED : DEFAULT, className)}
      {...props}
    >
      {children}
    </Tag>
  );
});

export default Card;