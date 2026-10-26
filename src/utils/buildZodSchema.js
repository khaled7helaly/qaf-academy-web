/**
 * utils/buildZodSchema.js
 * Generates a Zod schema dynamically from form.config.js.
 * Adding/removing a field in form.config.js automatically updates validation.
 */

import { z } from "zod";
import formConfig from "@config/form.config";

export function buildZodSchema() {
  const shape = {};

  formConfig.forEach((field) => {
    if (field.honeypot) {
      // Honeypot must be empty; bots fill it in
      shape[field.id] = z.string().max(0).optional();
      return;
    }

    let schema;
    const { type, required, validation = {}, options } = field;

    switch (type) {
      case "email":
        schema = z.string().email("أدخل بريداً إلكترونياً صحيحاً");
        break;

      case "tel":
        schema = z.string();
        if (validation.pattern) {
          schema = schema.regex(
            new RegExp(validation.pattern),
            validation.patternMsg ?? "قيمة غير صحيحة"
          );
        }
        break;

      case "select":
      case "radio":
        if (options && options.length) {
          schema = z.enum(options.map((o) => o.value), {
            errorMap: () => ({ message: "اختر قيمة من القائمة" }),
          });
        } else {
          schema = z.string();
        }
        break;

      default:
        schema = z.string();
        if (validation.min) {
          schema = schema.min(validation.min, `أدخل ${validation.min} أحرف على الأقل`);
        }
        if (validation.max) {
          schema = schema.max(validation.max, `الحد الأقصى ${validation.max} حرف`);
        }
        if (validation.pattern) {
          schema = schema.regex(
            new RegExp(validation.pattern),
            validation.patternMsg ?? "قيمة غير صحيحة"
          );
        }
    }

    if (!required) {
      // Allow empty string for optional fields
      schema = z.union([z.literal(""), schema]).optional();
    }

    shape[field.id] = schema;
  });

  // service is always injected (not in form fields)
  shape.service = z.string().min(1, "اختر خدمة");

  return z.object(shape);
}
