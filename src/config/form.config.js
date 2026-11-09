/**
 * form.config.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for the booking form.
 *
 * Each field object:
 *   id          – unique key, used as the form key
 *   label       – displayed label (Arabic)
 *   type        – "text" | "tel" | "email" | "select" | "textarea" | "radio"
 *                 | "number" (numeric input + −/+ stepper)
 *                 | "time"   (12-hour picker, stored as a 24-hour "HH:MM")
 *   placeholder – optional placeholder
 *   required    – boolean
 *   options     – for select/radio: [{ value, label }]
 *   validation  – Zod-compatible rules. For "text" min/max are lengths,
 *                 for "number" they are the allowed value range:
 *                 { min?, max?, pattern?, patternMsg?,
 *                   typeMsg?, minMsg?, maxMsg? }
 *   honeypot    – if true, field is hidden from users (bot trap)
 *   rows        – only for textarea
 *   colSpan     – "full" spans both grid columns, default = 1
 *
 * Adding a field here makes it appear in the form
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
    placeholder: "+962 7X XXX XXXX",
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
    id:          "age",
    label:       "العمر",
    type:        "number",
    placeholder: "مثال: 12",
    required:    true,
    validation:  {
      min:    4,
      max:    100,
      minMsg: "أدخل عمراً لا يقل عن 4 سنوات",
      maxMsg: "أدخل عمراً لا يزيد عن 100 سنة",
    },
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
    type:     "time",
    required: true,
    colSpan:  "full",
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
