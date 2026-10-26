/**
 * theme.config.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Design tokens. Applied as CSS custom properties at app startup by
 * src/utils/applyTheme.js. Change these to completely restyle the site.
 */

const themeConfig = {
  colors: {
    /** Primary brand color */
    primary:        "#1B4332",   // deep forest green
    primaryLight:   "#2D6A4F",
    primaryDark:    "#0D2B21",

    /** Accent / call-to-action */
    accent:         "#C9A84C",   // warm gold
    accentLight:    "#E8C97A",
    accentDark:     "#A67C32",

    /** Backgrounds */
    bgBase:         "#FAFAF7",   // off-white parchment
    bgSurface:      "#FFFFFF",
    bgMuted:        "#F3F0E8",

    /** Text */
    textPrimary:    "#1A1A1A",
    textSecondary:  "#4A5568",
    textMuted:      "#718096",
    textInverse:    "#FFFFFF",

    /** UI states */
    success:        "#276749",
    error:          "#C53030",
    warning:        "#D69E2E",
    info:           "#2B6CB0",

    /** Borders */
    border:         "#E2DDD0",
    borderStrong:   "#C8C0AE",
  },

  fonts: {
    heading: "'Amiri', 'Reem Kufi', serif",
    body:    "'Cairo', 'Tajawal', sans-serif",
    mono:    "'Courier New', monospace",
  },

  /** Google Fonts import URL */
  googleFontsUrl:
    "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@300;400;600;700;900&family=Reem+Kufi:wght@400;600;700&family=Tajawal:wght@300;400;700&display=swap",

  radius: {
    sm:   "0.375rem",
    md:   "0.75rem",
    lg:   "1.25rem",
    xl:   "2rem",
    full: "9999px",
  },

  shadow: {
    sm:  "0 1px 3px rgba(27,67,50,0.08), 0 1px 2px rgba(27,67,50,0.06)",
    md:  "0 4px 16px rgba(27,67,50,0.10), 0 2px 6px rgba(27,67,50,0.06)",
    lg:  "0 10px 40px rgba(27,67,50,0.14), 0 4px 12px rgba(27,67,50,0.08)",
    glow:"0 0 24px rgba(201,168,76,0.30)",
  },

  /** Islamic geometric overlay opacity (0 = hidden) */
  patternOpacity: "0.04",
};

export default themeConfig;
