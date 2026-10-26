/**
 * components/sections/ServicesSection.jsx
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import services from "@content/services";
import Container from "@components/ui/Container";
import SectionTitle from "@components/ui/SectionTitle";
import Card from "@components/ui/Card";
import Button from "@components/ui/Button";

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-label="خدماتنا"
      className="py-24 bg-[var(--color-bg-muted)]"
    >
      <Container>
        <SectionTitle heading="خدماتنا" subheading="اختر الخطة التي تناسب هدفك ومستواك" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex"
            >
              <Card
                highlighted={service.highlighted}
                className="flex flex-col w-full relative overflow-hidden"
              >
                {/* Badge */}
                {service.badge && (
                  <span className="absolute top-4 start-4 px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-accent)] text-white shadow-[var(--shadow-sm)]">
                    {service.badge}
                  </span>
                )}

                {/* Header */}
                <div className={`-mx-6 -mt-6 mb-6 px-6 pt-8 pb-6 ${service.highlighted ? "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]" : "bg-[var(--color-bg-muted)]"}`}>
                  <h3
                    className={`text-xl font-bold mb-1 ${service.highlighted ? "text-white" : "text-[var(--color-text-primary)]"}`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.name}
                  </h3>
                  <p className={`text-sm mb-4 ${service.highlighted ? "text-white/75" : "text-[var(--color-text-muted)]"}`}>
                    {service.subtitle}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-black ${service.highlighted ? "text-[var(--color-accent-light)]" : "text-[var(--color-primary)]"}`}
                    >
                      {service.price}
                    </span>
                    <span className={`text-sm ${service.highlighted ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
                      {service.currency} / {service.period}
                    </span>
                  </div>
                  <div className={`flex gap-3 mt-2 text-xs ${service.highlighted ? "text-white/60" : "text-[var(--color-text-muted)]"}`}>
                    <span>📅 {service.sessions}</span>
                    <span>⏱ {service.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[var(--color-text-secondary)] mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="flex-1 space-y-2.5 mb-6">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-[var(--color-text-primary)]">
                      <Check size={16} className="shrink-0 text-[var(--color-primary)]" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link to={`/booking?service=${service.id}`} className="mt-auto">
                  <Button
                    variant={service.highlighted ? "accent" : "primary"}
                    fullWidth
                  >
                    {service.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
