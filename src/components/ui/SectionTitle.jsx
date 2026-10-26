/** components/ui/SectionTitle.jsx */
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@utils/cn";

export default function SectionTitle({ heading, subheading, centered = true, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className={cn("mb-12", centered && "text-center", className)}
    >
      <h2
        className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {heading}
      </h2>
      {subheading && (
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          {subheading}
        </p>
      )}
      {/* Decorative accent line */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="h-0.5 w-12 bg-[var(--color-accent)] rounded-full" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
        <span className="h-0.5 w-12 bg-[var(--color-accent)] rounded-full" />
      </div>
    </motion.div>
  );
}
