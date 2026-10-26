/** components/ui/Accordion.jsx */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@utils/cn";

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden">
      <button
        id={`accordion-btn-${item.id}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${item.id}`}
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between gap-4 px-6 py-4 text-start",
          "font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-surface)]",
          "hover:bg-[var(--color-bg-muted)] transition-colors duration-200"
        )}
      >
        <span>{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-[var(--color-accent)]"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-panel-${item.id}`}
            role="region"
            aria-labelledby={`accordion-btn-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 pt-2 text-[var(--color-text-secondary)] leading-relaxed bg-[var(--color-bg-muted)] border-t border-[var(--color-border)]">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}
