/**
 * content/services.js
 * All services / plans offered. Components read from here.
 * "service" is the generic term; label each as you like per client.
 */

const services = [
  {
    id:          "quran-basics",
    name:        "الأساسيات",
    subtitle:    "للمبتدئين وتصحيح التلاوة",
    price:       "149",
    currency:    "ريال",
    period:      "شهرياً",
    sessions:    "8 حصص / شهر",
    duration:    "45 دقيقة / حصة",
    description: "مثالي لمن يبدأ رحلته مع القرآن الكريم أو يرغب في تصحيح نطقه وتجويده من الأساس.",
    features: [
      "تعلّم الحروف والمخارج",
      "أحكام التجويد الأساسية",
      "تصحيح التلاوة فردياً",
      "تقرير أسبوعي للولي",
      "مواد مكملة رقمية",
    ],
    highlighted: false,
    cta:         "ابدأ الآن",
    badge:       null,
  },
  {
    id:          "tajweed-pro",
    name:        "التجويد المتقدم",
    subtitle:    "لإتقان أحكام التلاوة",
    price:       "229",
    currency:    "ريال",
    period:      "شهرياً",
    sessions:    "12 حصة / شهر",
    duration:    "60 دقيقة / حصة",
    description: "برنامج شامل يأخذك من المتوسط إلى الإتقان مع شهادة معتمدة عند الإتمام.",
    features: [
      "جميع أحكام التجويد",
      "المدود والغنن والوقف",
      "تسجيل الحصص لمراجعتها",
      "شهادة إتمام معتمدة",
      "مجموعة واتساب للطلاب",
      "أولوية في جدولة المواعيد",
    ],
    highlighted: true,
    cta:         "احجز الآن",
    badge:       "الأكثر طلباً",
  },
  {
    id:          "hifz-program",
    name:        "برنامج الحفظ",
    subtitle:    "حفظ القرآن بمنهج علمي",
    price:       "349",
    currency:    "ريال",
    period:      "شهرياً",
    sessions:    "20 حصة / شهر",
    duration:    "60 دقيقة / حصة",
    description: "منهج متكامل للحفظ والمراجعة بإشراف حافظ معتمد بإسناد متصل.",
    features: [
      "خطة حفظ مخصصة",
      "مراجعة يومية منظمة",
      "تسميع أسبوعي مع التقييم",
      "إجازة في ما تحفظ",
      "دعم نفسي وتحفيزي",
      "تقارير شهرية مفصّلة",
      "إمكانية تغيير المعلم",
    ],
    highlighted: false,
    cta:         "احجز الآن",
    badge:       "متاح محدوداً",
  },
];

export default services;
