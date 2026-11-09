/**
 * components/sections/TrialSection.jsx
 * Only rendered when siteConfig.trial.enabled === true (enforced by Home.jsx).
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { trial } from "@content/home";
import Container from "@components/ui/Container";
import Button from "@components/ui/Button";


const HAS_500 = /\b500\b/;

const bullets = (trial.bullets ?? []).filter((b) => !HAS_500.test(b));
const note = trial.note && !HAS_500.test(trial.note) ? trial.note : null;

export default function TrialSection() {
  return (
    <section
      id="trial"
      aria-label="الجلسة التجريبية المجانية"
      className="py-24 relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, var(--color-primary-light) 100%)",
      }}
    >
      {/* Soft glows */}
      <div
        className="absolute -top-20 -start-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "var(--color-accent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -end-20 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
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
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "#fff" }}
          >
            {trial.heading}
          </h2>
          <p className="text-lg mb-8 mx-auto max-w-2xl" style={{ color: "rgba(255,255,255,0.8)" }}>
            {trial.subheading}
          </p>

          {/* Bullets */}
          <ul className="flex flex-wrap justify-center gap-3 mb-10 max-w-2xl mx-auto list-none p-0">
            {bullets.map((b) => (
              <li
                key={b}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm !text-white/90"
              >
                <CheckCircle2
                  size={16}
                  className="shrink-0"
                  style={{ color: "var(--color-accent-light, #e3c877)" }}
                />
                {b}
              </li>
            ))}
          </ul>

          <Link to="/booking?service=free-trial">
            <Button variant="accent" size="lg">
              {trial.cta}
            </Button>
          </Link>
          {note && <p className="mt-4 text-xs !text-white/65">{note}</p>}
        </motion.div>
      </Container>
    </section>
  );
}