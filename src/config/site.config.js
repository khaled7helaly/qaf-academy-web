/**
 * site.config.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Brand-level settings for the site. Change these values (and images) to
 * rebrand the template for any client without touching component code.
 */

const siteConfig = {
  /** Brand identity */
  brand: {
    name: "قاف",
    fullName: "أكاديمية قاف لتعليم القرآن الكريم",
    tagline: "تعلّم القرآن الكريم بأسلوب أصيل وتجربة معاصرة",
    logoPath: "/images/logo.svg",      // public/images/logo.svg
    faviconPath: "/favicon.svg",
  },

  /** Contact & social */
  contact: {
    whatsapp: "966500000000",           // without + or leading 00
    email: "info@qaf-academy.com",
  },

  social: [
    { id: "instagram", label: "إنستغرام", url: "https://instagram.com/qaf_academy", icon: "Instagram" },
    { id: "twitter",   label: "تويتر",    url: "https://twitter.com/qaf_academy",   icon: "Twitter" },
    { id: "youtube",   label: "يوتيوب",   url: "https://youtube.com/@qaf_academy",  icon: "Youtube" },
  ],

  /** SEO */
  seo: {
    title: "أكاديمية قاف | تعليم القرآن الكريم عبر الإنترنت",
    description:
      "أكاديمية قاف – تعلّم القرآن الكريم تجويداً وحفظاً وتفسيراً مع نخبة من المعلمين المعتمدين عبر الإنترنت.",
    keywords: "تعليم القرآن, أكاديمية قاف, تجويد, حفظ القرآن, تعليم أونلاين",
    ogImage: "/images/og-image.jpg",
  },

  /** i18n / direction */
  lang: "ar",
  dir: "rtl",       // "rtl" | "ltr" – flips the whole layout

  /**
   * Google Apps Script Web App URL.
   * Set VITE_APPS_SCRIPT_URL in .env (never commit the real URL to git).
   */
  appsScriptUrl: import.meta.env.VITE_APPS_SCRIPT_URL ?? "",

  /** Trial / free-session feature toggle */
  trial: {
    enabled: true,
  },
};

export default siteConfig;
