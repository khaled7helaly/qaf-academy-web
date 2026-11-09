/**
 * site.config.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Brand-level settings for the site. Change these values (and images) to
 * rebrand the template for any client without touching component code.
 */

/**
 * Public base path injected by Vite.
 * - "/" in dev and on root hosts (Vercel).
 * - "/<repo>/" on GitHub Pages project sites.
 * All public asset paths must be prefixed with it so they resolve after deploy.
 */
const base = import.meta.env.BASE_URL;

const siteConfig = {
  /** Brand identity */
  brand: {
    // name: "قاف",
    fullName: "أكاديمية قاف لتعليم القرآن الكريم",
    tagline: "تعلّم القرآن الكريم بأسلوب أصيل وتجربة معاصرة",
    logoPath: `${base}images/logo2.svg.png`,
    faviconPath: `${base}favicon.svg`,
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
    ogImage: `${base}images/logo2.svg.png`,
  },

  /** i18n / direction */
  lang: "ar",
  dir: "rtl",       // "rtl" | "ltr" – flips the whole layout

  /**
   * Trial / free-session feature toggle
   */
  trial: {
    enabled: true,
  },
};

export default siteConfig;
