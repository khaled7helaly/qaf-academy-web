/**
 * components/sections/TrialSection.jsx
 * Only rendered when siteConfig.trial.enabled === true (enforced by Home.jsx).
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";
import { trial } from "@content/home";
import Container from "@components/ui/Container";
import Button from "@components/ui/Button";

export default function TrialSection() {
  return (
    <section
      id="trial"
      aria-label="الجلسة التجريبية المجانية"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, var(--color-primary-light) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-20 -start-20 w-72 h-72 rounded-full opacity-20"
        style={{ background: "var(--color-accent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -end-20 w-96 h-96 rounded-full opacity-10"
        style={{ background: "var(--color-accent-light)" }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/40 text-[var(--color-accent-light)] text-sm font-semibold mb-6">
            <Zap size={14} />
            عرض محدود
          </div>

          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {trial.heading}
          </h2>
          <p className="text-lg text-white/75 mb-8">{trial.subheading}</p>

          {/* Bullets */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-start max-w-xl mx-auto">
            {trial.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-white/90 text-sm">
                <CheckCircle2 size={18} className="shrink-0 text-[var(--color-accent-light)]" />
                {b}
              </li>
            ))}
          </ul>

          <Link to="/booking?service=free-trial">
            <Button variant="accent" size="lg">
              {trial.cta}
            </Button>
          </Link>
          <p className="mt-4 text-xs text-white/50">{trial.note}</p>
        </motion.div>
      </Container>
    </section>
  );
}
