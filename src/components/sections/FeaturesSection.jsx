/**
 * components/sections/FeaturesSection.jsx
 */

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { features } from "@content/home";
import Container from "@components/ui/Container";
import SectionTitle from "@components/ui/SectionTitle";
import Card from "@components/ui/Card";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesSection() {
  return (
    <section
      id="features"
      aria-label="مزايا الأكاديمية"
      className="py-24 bg-[var(--color-bg-muted)]"
    >
      <Container>
        <SectionTitle heading={features.heading} subheading={features.subheading} />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.items.map((feat) => {
            const Icon = LucideIcons[feat.icon] ?? LucideIcons.Star;
            return (
              <motion.div key={feat.title} variants={item}>
                <Card className="h-full group cursor-default">
                  <div className="mb-4 inline-flex p-3 rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                    {feat.desc}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
