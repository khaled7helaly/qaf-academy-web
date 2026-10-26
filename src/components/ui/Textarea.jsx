/** components/ui/Textarea.jsx */
import React from "react";
import { cn } from "@utils/cn";

const baseTextarea =
  "w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-y min-h-[80px] disabled:opacity-50 disabled:cursor-not-allowed";

export default function Textarea({
  id,
  label,
  error,
  rows = 4,
  className = "",
  required = false,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[var(--color-text-primary)]">
          {label}
          {required && <span className="text-[var(--color-error)] ms-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          baseTextarea,
          error && "border-[var(--color-error)] focus:ring-[var(--color-error)]",
          className
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-[var(--color-error)] mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
