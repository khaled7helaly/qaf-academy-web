/**
 * pages/Home.jsx
 * Renders sections from sections.config.js in order.
 * To reorder/disable sections: edit sections.config.js only.
 */

import React from "react";
import sectionsConfig from "@config/sections.config";
import siteConfig from "@config/site.config";

// Section components map – add new section components here
import HeroSection     from "@components/sections/HeroSection";
import AboutSection    from "@components/sections/AboutSection";
import FeaturesSection from "@components/sections/FeaturesSection";
import StepsSection    from "@components/sections/StepsSection";
import ServicesSection from "@components/sections/ServicesSection";
import TrialSection    from "@components/sections/TrialSection";
import FaqSection      from "@components/sections/FaqSection";

const sectionMap = {
  HeroSection,
  AboutSection,
  FeaturesSection,
  StepsSection,
  ServicesSection,
  TrialSection,
  FaqSection,
};

export default function Home() {
  return (
    <main id="main-content">
      {sectionsConfig.map((section) => {
        if (!section.enabled) return null;

        // Trial section is also gated by siteConfig.trial.enabled
        if (section.id === "trial" && !siteConfig.trial.enabled) return null;

        const SectionComponent = sectionMap[section.component];
        if (!SectionComponent) {
          console.warn(`[Home] Unknown section component: ${section.component}`);
          return null;
        }

        return <SectionComponent key={section.id} />;
      })}
    </main>
  );
}
