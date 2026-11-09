/**
 * utils/whatsapp.js
 * Builds a WhatsApp URL with a prefilled booking message.
 */

import siteConfig from "@config/site.config";
import formConfig from "@config/form.config";

const WHATSAPP_NUMBER = "201038618435";

export function buildWhatsAppUrl(formValues, serviceName) {
  // Safely get brand name
  const brandName = siteConfig?.brand?.name;

  const title = brandName
    ? `*طلب حجز جديد – ${brandName}*`
    : "*طلب حجز جديد*";

  const lines = [title, ""];

  // Selected package
  if (serviceName) {
    lines.push(`*الباقة:* ${serviceName}`);
  }

  // Customer information
  formConfig.forEach((field) => {
    if (field.honeypot) return;

    const value = formValues[field.id];

    if (value === undefined || value === null || String(value).trim() === "") {
      return;
    }

    let display = value;

    // Resolve select/radio values
    if (
      (field.type === "select" || field.type === "radio") &&
      field.options
    ) {
      const option = field.options.find(
        (item) => item.value === value
      );

      display = option ? option.label : value;
    }

    lines.push(`*${field.label}:* ${display}`);
  });

  const message = lines.join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}