/** components/ui/NumberInput.jsx */
import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@utils/cn";

const baseInput =
  "w-full min-w-0 appearance-none border-0 bg-transparent px-2 py-3 text-center text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const stepperButton =
  "flex w-11 shrink-0 items-center justify-center text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)] disabled:opacity-40 disabled:cursor-not-allowed";

export default function NumberInput({
  id,
  label,
  error,
  required = false,
  placeholder,
  min,
  max,
  step = 1,
  value,
  onChange,
  onBlur,
  className = "",
}) {
  const parsed = value === "" || value === null || value === undefined ? NaN : Number(value);
  const current = Number.isFinite(parsed) ? parsed : null;

  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };

  const nudge = (direction) => {
    const base = current ?? (min ?? 0);
    onChange(String(clamp(base + direction * step)));
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[var(--color-text-primary)]">
          {label}
          {required && <span className="text-[var(--color-error)] ms-1">*</span>}
        </label>
      )}

      <div
        className={cn(
          "flex items-stretch overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] transition-all duration-200 focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:border-transparent",
          error && "border-[var(--color-error)] focus-within:ring-[var(--color-error)]",
          className
        )}
      >
        <button
          type="button"
          aria-label={label ? `تقليل ${label}` : "تقليل"}
          onClick={() => nudge(-1)}
          disabled={current != null && min != null && current <= min}
          className={stepperButton}
        >
          <Minus size={16} aria-hidden="true" />
        </button>

        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={baseInput}
        />

        <button
          type="button"
          aria-label={label ? `زيادة ${label}` : "زيادة"}
          onClick={() => nudge(1)}
          disabled={current != null && max != null && current >= max}
          className={stepperButton}
        >
          <Plus size={16} aria-hidden="true" />
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-[var(--color-error)] mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
