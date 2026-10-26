/**
 * form.config.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for the booking form.
 *
 * Each field object:
 *   id          – unique key, used as form key + sheet column header
 *   label       – displayed label (Arabic)
 *   type        – "text" | "tel" | "email" | "select" | "textarea" | "radio"
 *   placeholder – optional placeholder
 *   required    – boolean
 *   options     – for select/radio: [{ value, label }]
 *   validation  – Zod-compatible rules: { min?, max?, pattern?, patternMsg? }
 *   honeypot    – if true, field is hidden from users (bot trap)
 *   rows        – only for textarea
 *   colSpan     – "full" spans both grid columns, default = 1
 *
 * Adding a field here makes it appear in the form, the sheet column,
 * AND the WhatsApp message automatically.
 */

const formConfig = [
  {
    id:          "fullName",
    label:       "الاسم الكامل",
    type:        "text",
    placeholder: "محمد عبدالله",
    required:    true,
    colSpan:     "full",
    validation:  { min: 3, max: 80 },
  },
  {
    id:          "phone",
    label:       "رقم الجوال",
    type:        "tel",
    placeholder: "05XXXXXXXX",
    required:    true,
    validation:  {
      pattern:    "^[+]?[0-9\\s\\-]{7,20}$",
      patternMsg: "أدخل رقم جوال صحيح",
    },
  },
  {
    id:          "email",
    label:       "البريد الإلكتروني",
    type:        "email",
    placeholder: "example@email.com",
    required:    false,
  },
  {
    id:       "age",
    label:    "الفئة العمرية",
    type:     "select",
    required: true,
    options:  [
      { value: "child",  label: "أطفال (6–12 سنة)" },
      { value: "teen",   label: "مراهقون (13–17 سنة)" },
      { value: "adult",  label: "بالغون (18+)" },
    ],
  },
  {
    id:       "level",
    label:    "مستوى القرآن الحالي",
    type:     "select",
    required: true,
    options:  [
      { value: "beginner",      label: "مبتدئ (لا أعرف القراءة)" },
      { value: "basic",         label: "أساسي (أقرأ ببطء)" },
      { value: "intermediate",  label: "متوسط (أقرأ بسلاسة)" },
      { value: "advanced",      label: "متقدم (أحفظ أجزاء)" },
    ],
  },
  {
    id:       "preferredTime",
    label:    "الوقت المفضل للحصص",
    type:     "select",
    required: true,
    options:  [
      { value: "morning",   label: "صباحاً (8 ص – 12 م)" },
      { value: "afternoon", label: "ظهراً (12 م – 4 م)" },
      { value: "evening",   label: "مساءً (4 م – 9 م)" },
      { value: "flexible",  label: "مرن (نتفق لاحقاً)" },
    ],
  },
  {
    id:          "notes",
    label:       "ملاحظات إضافية",
    type:        "textarea",
    placeholder: "أي تفاصيل تودّ مشاركتها...",
    required:    false,
    rows:        3,
    colSpan:     "full",
    validation:  { max: 500 },
  },
  {
    // Honeypot – must stay last
    id:       "website",
    label:    "الموقع الإلكتروني",
    type:     "text",
    required: false,
    honeypot: true,
  },
];

export default formConfig;
