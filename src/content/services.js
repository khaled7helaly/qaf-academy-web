/**
 * content/services.js
 * Monthly subscription plans and services.
 * All plans are managed from this file.
 */

const services = [
  {
    id: "quran-basics",
    name: "باقة المبتدئ",
    subtitle: "للبداية الصحيحة في تعلّم القرآن الكريم",
    price: "12",
    currency: "دينار",
    period: "شهرياً",
    sessions: "8 حصص / شهر",
    duration: "30 دقيقة / حصة",
    description:
      "الباقة المثالية للمبتدئين، بخطوات منظمة تساعد على بناء أساس قوي في تعلّم القرآن الكريم.",
    features: [
      "حصتان أسبوعياً",
      "8 حصص شهرياً",
      "مدة الحصة 30 دقيقة",
      "متابعة مستمرة للتقدم",
      "خطة تعليمية مناسبة للمستوى",
    ],
    highlighted: false,
    cta: "اشترك الآن",
    badge: null,
    // originalPrice: "12",
  },
  {
    id: "tajweed-pro",
    name: "باقة المتميز",
    subtitle: "تعلم أكثر وتقدم أسرع",
    price: "16",
    currency: "دينار",
    period: "شهرياً",
    sessions: "12 حصة / شهر",
    duration: "30 دقيقة / حصة",
    description:
      "برنامج تعليمي مكثف يساعدك على تطوير مستواك من خلال حصص منتظمة ومتابعة مستمرة.",
    features: [
      "3 حصص أسبوعياً",
      "12 حصة شهرياً",
      "مدة الحصة 30 دقيقة",
      "متابعة وتقييم مستمر",
      "خطة تعليمية متكاملة",
      "تطوير المستوى بشكل منتظم",
    ],
    highlighted: true,
    cta: "اشترك الآن",
    badge: "الأكثر طلباً",
    // originalPrice: "18",
  },
  {
    id: "hifz-program",
    name: "باقة التقدم",
    subtitle: "خطوات أعمق نحو التميز والإتقان",
    price: "15",
    currency: "دينار",
    period: "شهرياً",
    sessions: "8 حصص / شهر",
    duration: "40 دقيقة / حصة",
    description:
      "باقة تمنحك وقتاً أطول في كل حصة، مع برنامج تعليمي يساعدك على تحقيق تقدم ملحوظ.",
    features: [
      "حصتان أسبوعياً",
      "8 حصص شهرياً",
      "مدة الحصة 40 دقيقة",
      "وقت إضافي للتعلم والتطبيق",
      "متابعة دورية للمستوى",
      "خطة تعليمية مخصصة",
    ],
    highlighted: false,
    cta: "اشترك الآن",
    badge: null,
    // originalPrice: "16",
  },
];

export default services;