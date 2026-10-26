/**
 * utils/cn.js
 * Tiny class-name merger (no external dependency).
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
