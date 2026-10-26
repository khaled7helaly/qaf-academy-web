/**
 * utils/applyTheme.js
 * Reads theme.config.js and writes CSS custom properties to :root.
 * Called once at app startup so all components can use var(--color-primary) etc.
 */

import themeConfig from "@config/theme.config";

export function applyTheme() {
  const root = document.documentElement;
  const { colors, fonts, radius, shadow, patternOpacity } = themeConfig;

  // Colors
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${camel2kebab(key)}`, value);
  });

  // Fonts
  Object.entries(fonts).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value);
  });

  // Radius
  Object.entries(radius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });

  // Shadow
  Object.entries(shadow).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });

  // Pattern opacity
  root.style.setProperty("--pattern-opacity", patternOpacity ?? "0.04");
}

/** camelCase → kebab-case */
function camel2kebab(str) {
  return str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
}
