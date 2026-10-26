/**
 * sections.config.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Ordered list of home-page sections.
 * • enabled: false   → section is hidden everywhere (nav link + rendering)
 * • navLabel         → text shown in the navbar. Omit to exclude from nav.
 *
 * Reorder array items = reorder sections. No code changes needed.
 */

const sectionsConfig = [
  {
    id:       "hero",
    component:"HeroSection",
    enabled:  true,
    // hero is never shown in nav
  },
  {
    id:        "about",
    component: "AboutSection",
    enabled:   true,
    navLabel:  "من نحن",
  },
  {
    id:        "features",
    component: "FeaturesSection",
    enabled:   true,
    navLabel:  "لماذا قاف؟",
  },
  {
    id:        "steps",
    component: "StepsSection",
    enabled:   true,
    navLabel:  "كيف تبدأ؟",
  },
  {
    id:        "services",
    component: "ServicesSection",
    enabled:   true,
    navLabel:  "الخدمات",
  },
  {
    id:        "trial",
    component: "TrialSection",
    enabled:   true,    // mirrors site.config.js trial.enabled – both must be true
    navLabel:  "جلسة مجانية",
  },
  {
    id:        "faq",
    component: "FaqSection",
    enabled:   true,
    navLabel:  "الأسئلة الشائعة",
  },
];

export default sectionsConfig;
