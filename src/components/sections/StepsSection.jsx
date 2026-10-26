/**
 * components/sections/StepsSection.jsx
 */

import React from "react";
import { motion } from "framer-motion";
import { steps } from "@content/home";
import Container from "@components/ui/Container";
import SectionTitle from "@components/ui/SectionTitle";

export default function StepsSection() {
  return (
    <section
      id="steps"
      aria-label="خطوات البدء"
      className="py-24 bg-[var(--color-bg-base)]"
    >
      <Container>
        <SectionTitle heading={steps.heading} subheading={steps.subheading} />

        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-12 inset-x-16 h-0.5 bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-accent)] to-[var(--color-primary)]/20"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.items.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                {/* Number bubble */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center shadow-[var(--shadow-lg)] z-10 relative">
                    <span
                      className="text-3xl font-black text-[var(--color-accent-light)]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-[var(--color-accent)]/30 animate-ping" />
                </div>

                <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-48">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
