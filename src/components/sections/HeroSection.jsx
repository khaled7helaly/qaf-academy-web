/**
 * components/sections/HeroSection.jsx
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { hero } from "@content/home";
import siteConfig from "@config/site.config";
import Button from "@components/ui/Button";
import Container from "@components/ui/Container";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="القسم الرئيسي"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)] pt-20"
    >
      {/* Islamic pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{ opacity: "var(--pattern-opacity, 0.04)" }}
        aria-hidden="true"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="white" strokeWidth="0.5">
                {/* Simple 8-point star pattern */}
                <polygon points="40,10 47,28 66,28 52,40 57,58 40,47 23,58 28,40 14,28 33,28" />
                <polygon points="40,20 44,30 55,30 47,37 50,48 40,42 30,48 33,37 25,30 36,30" />
                <line x1="0" y1="40" x2="80" y2="40" />
                <line x1="40" y1="0" x2="40" y2="80" />
                <line x1="0" y1="0" x2="80" y2="80" />
                <line x1="80" y1="0" x2="0" y2="80" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-geo)" />
        </svg>
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/40 text-[var(--color-accent-light)] text-sm font-semibold backdrop-blur-sm">
            <Sparkles size={14} />
            {hero.badge}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 max-w-4xl mx-auto"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {hero.heading}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {hero.subheading}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/booking">
            <Button variant="accent" size="lg">
              {hero.cta}
              <ArrowLeft size={18} />
            </Button>
          </Link>
          {siteConfig.trial.enabled && (
            <Link to="/booking?service=free-trial">
              <Button
                variant="ghost"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 hover:border-white"
              >
                {hero.trialCta}
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 px-4 py-4 rounded-[var(--radius-lg)] bg-white/10 backdrop-blur-sm border border-white/10"
            >
              <span
                className="text-3xl font-black text-[var(--color-accent-light)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-white/70">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </Container>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg-base))" }}
        aria-hidden="true"
      />
    </section>
  );
}
