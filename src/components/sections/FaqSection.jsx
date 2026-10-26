/**
 * components/sections/FaqSection.jsx
 */

import React from "react";
import faqItems from "@content/faq";
import Container from "@components/ui/Container";
import SectionTitle from "@components/ui/SectionTitle";
import Accordion from "@components/ui/Accordion";

export default function FaqSection() {
  return (
    <section
      id="faq"
      aria-label="الأسئلة الشائعة"
      className="py-24 bg-[var(--color-bg-base)]"
    >
      <Container>
        <SectionTitle
          heading="الأسئلة الشائعة"
          subheading="إجابات على أكثر الأسئلة التي يطرحها طلابنا"
        />

        <div className="max-w-3xl mx-auto">
          <Accordion items={faqItems} />
        </div>
      </Container>
    </section>
  );
}
