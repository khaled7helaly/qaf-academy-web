/** components/ui/TimePicker.jsx */
import React, { useState } from "react";
import { cn } from "@utils/cn";

const baseSelect =
  "w-full appearance-none rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] ps-3 pe-7 py-3 text-[var(--color-text-primary)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent cursor-pointer";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

const PERIODS = [
  { value: "am", label: "ص", title: "صباحاً" },
  { value: "pm", label: "م", title: "مساءً" },
];

/** Split a 24-hour "HH:MM" into the 12-hour parts the control displays. */
function parse(value) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value ?? "");
  if (!match) return { hour: "", minute: "", period: "am" };

  const hour24 = Number(match[1]);
  return {
    hour: String(hour24 % 12 === 0 ? 12 : hour24 % 12),
    minute: match[2],
    period: hour24 < 12 ? "am" : "pm",
  };
}

/** Combine a 12-hour hour + AM/PM back into a 24-hour "HH". */
function to24(hour, period) {
  const base = Number(hour) % 12;
  return String(period === "pm" ? base + 12 : base).padStart(2, "0");
}

function Chevron() {
  return (
    <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-[var(--color-text-muted)]">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function TimePicker({
  id,
  label,
  error,
  required = false,
  value,
  onChange,
  onBlur,
  className = "",
}) {
  const initial = parse(value);

  const [hour, setHour] = useState(initial.hour);
  const [minute, setMinute] = useState(initial.minute);
  const [period, setPeriod] = useState(initial.period);

  // Always emit a complete 24-hour value as soon as an hour is chosen;
  // the minute falls back to "00" so the field stays consistent.
  const commit = (nextHour, nextMinute, nextPeriod) => {
    const resolvedMinute = nextHour === "" ? nextMinute : nextMinute || "00";

    setHour(nextHour);
    setMinute(resolvedMinute);
    setPeriod(nextPeriod);

    onChange(nextHour === "" ? "" : `${to24(nextHour, nextPeriod)}:${resolvedMinute}`);
  };

  const handleHour = (next) => commit(next, minute, period);
  const handleMinute = (next) => commit(hour, next, period);

  const handlePeriod = (next) => {
    if (hour === "") {
      setPeriod(next);
      return;
    }
    commit(hour, minute, next);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[var(--color-text-primary)]">
          {label}
          {required && <span className="text-[var(--color-error)] ms-1">*</span>}
        </label>
      )}

      <div className={cn("flex items-stretch gap-2", className)}>
        {/* Hour */}
        <div className="relative flex-1 min-w-0">
          <select
            id={id}
            value={hour}
            onChange={(event) => handleHour(event.target.value)}
            onBlur={onBlur}
            aria-label="الساعة"
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              baseSelect,
              error && "border-[var(--color-error)] focus:ring-[var(--color-error)]"
            )}
          >
            <option value="">الساعة</option>
            {HOURS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          <Chevron />
        </div>

        <span className="flex items-center text-[var(--color-text-muted)]" aria-hidden="true">
          :
        </span>

        {/* Minute */}
        <div className="relative flex-1 min-w-0">
          <select
            value={minute}
            onChange={(event) => handleMinute(event.target.value)}
            onBlur={onBlur}
            aria-label="الدقيقة"
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              baseSelect,
              error && "border-[var(--color-error)] focus:ring-[var(--color-error)]"
            )}
          >
            <option value="">الدقيقة</option>
            {MINUTES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <Chevron />
        </div>

        {/* AM / PM */}
        <div className="flex shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
          {PERIODS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handlePeriod(option.value)}
              aria-pressed={period === option.value}
              aria-label={option.title}
              title={option.title}
              className={cn(
                "px-3 py-3 text-sm font-semibold transition-colors",
                period === option.value
                  ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)]"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-[var(--color-error)] mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
