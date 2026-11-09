/**
 * components/sections/ServicesSection.jsx
 */

import React, { memo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Check, Clock } from "lucide-react";
import services from "@content/services";
import Container from "@components/ui/Container";
import SectionTitle from "@components/ui/SectionTitle";
import Card from "@components/ui/Card";
import Button from "@components/ui/Button";

/* -------------------------------------------------------------------------- */
/* Theme tokens: one place to change how a card looks in each state            */
/* -------------------------------------------------------------------------- */

const THEME = {
  highlighted: {
    header:
      "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]",
    title: "text-white",
    subtitle: "text-white/80",
    price: "text-[var(--color-accent-light)]",
    unit: "text-white/80",
    meta: "text-white/75",
    button: "accent",
  },
  default: {
    // Must differ from BOTH the section background (--color-bg-muted) and the
    // white card body; otherwise the header blends into the page and the card
    // looks cut off at the top.
    header:
      "bg-[color:color-mix(in_srgb,var(--color-primary)_10%,var(--color-bg-surface))]",
    title: "text-[var(--color-text-primary)]",
    subtitle: "text-[var(--color-text-secondary)]",
    price: "text-[var(--color-primary)]",
    unit: "text-[var(--color-text-secondary)]",
    meta: "text-[var(--color-text-secondary)]",
    button: "primary",
  },
};

/* -------------------------------------------------------------------------- */
/* Service card                                                                */
/* -------------------------------------------------------------------------- */

const ServiceCard = memo(function ServiceCard({ service }) {
  const t = service.highlighted ? THEME.highlighted : THEME.default;
  const titleId = `service-${service.id}-title`;

  // Discount is derived from the plan data – no hardcoded percentages
  const original = Number(service.originalPrice);
  const current = Number(service.price);
  const hasDiscount =
    Number.isFinite(original) && Number.isFinite(current) && original > current;
  const discountPercent = hasDiscount
    ? Math.round((1 - current / original) * 100)
    : 0;

  return (
    <Card
      as="article"
      highlighted={service.highlighted}
      className="flex h-full w-full flex-col overflow-hidden"
      aria-labelledby={titleId}
    >
      {/* Header: name, badge, price and session details */}
      <header className={`-mx-6 -mt-6 mb-6 px-6 pb-6 pt-7 ${t.header}`}>
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3
            id={titleId}
            className={`text-xl font-bold leading-snug ${t.title}`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {service.name}
          </h3>

          {service.badge && (
            <span className="shrink-0 whitespace-nowrap rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-bold text-white shadow-[var(--shadow-sm)]">
              {service.badge}
            </span>
          )}
        </div>

        <p className={`mb-5 text-sm ${t.subtitle}`}>{service.subtitle}</p>

        <p className="flex items-baseline gap-1.5">
          <span
            className={`text-4xl font-black tabular-nums leading-none ${t.price}`}
          >
            {service.price}
          </span>
          <span className={`text-sm ${t.unit}`}>
            {service.currency} / {service.period}
          </span>
        </p>

        {hasDiscount && (
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <span className={`text-sm line-through tabular-nums ${t.unit}`}>
              {service.originalPrice} {service.currency}
            </span>
            <span className="rounded-full bg-[var(--color-accent)] px-2.5 py-0.5 text-xs font-bold text-white shadow-[var(--shadow-sm)]">
              خصم {discountPercent}%
            </span>
          </div>
        )}

        <dl className={`mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs ${t.meta}`}>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">عدد الحصص</dt>
            <CalendarDays size={14} aria-hidden="true" />
            <dd>{service.sessions}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">مدة الحصة</dt>
            <Clock size={14} aria-hidden="true" />
            <dd>{service.duration}</dd>
          </div>
        </dl>
      </header>

      {/* Description */}
      <p className="mb-5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {service.description}
      </p>

      {/* Features */}
      <ul className="mb-8 flex-1 space-y-3">
        {service.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm leading-snug text-[var(--color-text-primary)]"
          >
            <Check
              size={16}
              className="mt-0.5 shrink-0 text-[var(--color-primary)]"
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to={`/booking?service=${encodeURIComponent(service.id)}`}
        className="mt-auto block rounded-[var(--radius-md,0.5rem)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        aria-label={`${service.cta}: ${service.name}`}
      >
        {/* The link is the single tab stop; the button is visual only */}
        <Button variant={t.button} fullWidth tabIndex={-1}>
          {service.cta}
        </Button>
      </Link>
    </Card>
  );
});

/* -------------------------------------------------------------------------- */
/* Section                                                                     */
/* -------------------------------------------------------------------------- */

export default function ServicesSection() {
  const reduceMotion = useReducedMotion();

  if (!services?.length) return null;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[var(--color-bg-muted)] py-16 md:py-24"
    >
      <Container>
        <SectionTitle
          id="services-heading"
          heading="خدماتنا"
          subheading="اختر الخطة التي تناسب هدفك ومستواك"
        />

        <ul className="mt-12 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((service, idx) => (
            <motion.li
              key={service.id}
              className="flex"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: reduceMotion ? 0 : idx * 0.08,
              }}
            >
              <ServiceCard service={service} />
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}