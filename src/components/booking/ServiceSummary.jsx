/**
 * components/booking/ServiceSummary.jsx
 * Displays a summary card for the selected service on the booking page.
 */

import React from "react";
import { Check } from "lucide-react";
import Card from "@components/ui/Card";
import bookingContent from "@content/booking";

const { serviceSummary: labels } = bookingContent;

export default function ServiceSummary({ service }) {
  if (!service) return null;

  const isHighlighted = service.highlighted ?? false;

  return (
    <Card
      highlighted={isHighlighted}
      className="sticky top-24"
      aria-label={`ملخص الخدمة: ${service.name}`}
    >
      {/* Badge */}
      {service.badge && (
        <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-accent)] text-white">
          {service.badge}
        </span>
      )}

      <h2
        className="text-xl font-bold text-[var(--color-primary)] mb-1"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {service.name}
      </h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-4">{service.subtitle}</p>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-muted)] text-center">
          <p className="text-xs text-[var(--color-text-muted)]">{labels.sessionLabel}</p>
          <p className="font-bold text-sm text-[var(--color-text-primary)]">{service.sessions}</p>
        </div>
        <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-muted)] text-center">
          <p className="text-xs text-[var(--color-text-muted)]">{labels.durationLabel}</p>
          <p className="font-bold text-sm text-[var(--color-text-primary)]">{service.duration}</p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-5 pb-5 border-b border-[var(--color-border)]">
        <span className="text-3xl font-black text-[var(--color-primary)]">
          {service.price}
        </span>
        <span className="text-sm text-[var(--color-text-muted)]">
          {service.currency}
          {service.period && ` / ${service.period}`}
        </span>
      </div>

      {/* Features */}
      <ul className="space-y-2.5">
        {service.features?.map((feat) => (
          <li key={feat} className="flex items-center gap-2.5 text-sm text-[var(--color-text-primary)]">
            <Check size={15} className="shrink-0 text-[var(--color-primary)]" />
            {feat}
          </li>
        ))}
      </ul>
    </Card>
  );
}
