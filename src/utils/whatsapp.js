/**
 * utils/whatsapp.js
 * Builds a wa.me deep-link with a prefilled message.
 * Uses field labels from form.config.js so the message adapts automatically
 * when fields are added or removed.
 */

import siteConfig from "@config/site.config";
import formConfig from "@config/form.config";

/**
 * @param {object} formValues  - submitted form data (key → value)
 * @param {string} serviceName - human-readable service name
 * @returns {string} wa.me URL
 */
export function buildWhatsAppUrl(formValues, serviceName) {
  const lines = [`*طلب حجز جديد – ${siteConfig.brand.name}*`, ""];

  if (serviceName) {
    lines.push(`*الخدمة:* ${serviceName}`);
  }

  formConfig.forEach((field) => {
    if (field.honeypot) return;
    const value = formValues[field.id];
    if (!value) return;

    // For select/radio, resolve the option label
    let display = value;
    if ((field.type === "select" || field.type === "radio") && field.options) {
      const opt = field.options.find((o) => o.value === value);
      display = opt ? opt.label : value;
    }

    lines.push(`*${field.label}:* ${display}`);
  });

  const text = lines.join("\n");
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
