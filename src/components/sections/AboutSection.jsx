/**
 * components/sections/AboutSection.jsx
 */

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { about } from "@content/home";
import Container from "@components/ui/Container";
import SectionTitle from "@components/ui/SectionTitle";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="من نحن"
      className="py-24 bg-[var(--color-bg-base)]"
    >
      <Container>
        <SectionTitle heading={about.heading} subheading={about.subheading} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            {about.body.map((para, i) => (
              <p key={i} className="text-[var(--color-text-secondary)] leading-relaxed text-lg">
                {para}
              </p>
            ))}

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {about.values.map((v) => {
                const Icon = LucideIcons[v.icon] ?? LucideIcons.Star;
                return (
                  <motion.div
                    key={v.title}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-start gap-3 p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-muted)] border border-[var(--color-border)]"
                  >
                    <span className="mt-0.5 p-2 rounded-[var(--radius-sm)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-bold text-sm text-[var(--color-text-primary)]">{v.title}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{v.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10" />
              <div className="absolute -inset-2 rounded-[var(--radius-xl)] border-2 border-dashed border-[var(--color-accent)]/30" />
              <img
                src={about.image}
                alt="تعليم القرآن الكريم"
                className="relative w-full rounded-[var(--radius-xl)]"
                onError={(e) => {
                  // Fallback decorative placeholder
                  e.currentTarget.parentElement.innerHTML = `
                    <div class="relative w-full aspect-square rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center">
                      <span style="font-family:var(--font-heading); font-size:8rem; color:rgba(201,168,76,0.6);">ق</span>
                    </div>`;
                }}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
