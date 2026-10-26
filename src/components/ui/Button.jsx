/**
 * components/ui/Button.jsx
 * Reusable button primitive with variants and sizes.
 */

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@utils/cn";

const variants = {
  primary:   "bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-light)] shadow-[var(--shadow-md)]",
  secondary: "bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)] border border-[var(--color-border)]",
  accent:    "bg-[var(--color-accent)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-light)] shadow-[var(--shadow-glow)]",
  ghost:     "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-bg-muted)] border border-[var(--color-primary)]",
  danger:    "bg-[var(--color-error)] text-[var(--color-text-inverse)] hover:opacity-90",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  as: Tag = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius-full)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  return (
    <motion.div
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      className={fullWidth ? "w-full" : "inline-flex"}
    >
      <Tag
        className={cn(
          base,
          variants[variant] ?? variants.primary,
          sizes[size] ?? sizes.md,
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>جارٍ الإرسال...</span>
          </>
        ) : (
          children
        )}
      </Tag>
    </motion.div>
  );
}
