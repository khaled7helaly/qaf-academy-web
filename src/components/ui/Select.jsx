/** components/ui/Select.jsx */
import React from "react";
import { cn } from "@utils/cn";

const baseSelect =
  "w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3 text-[var(--color-text-primary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

export default function Select({
  id,
  label,
  error,
  options = [],
  placeholder = "اختر...",
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
      <div className="relative">
        <select
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            baseSelect,
            error && "border-[var(--color-error)] focus:ring-[var(--color-error)]",
            className
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Custom chevron */}
        <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-[var(--color-text-muted)]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-[var(--color-error)] mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
