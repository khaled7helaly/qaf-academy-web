/**
 * content/booking.js
 * All text used on the Booking page (not the form labels, those live in form.config.js).
 */

const bookingContent = {
  pageTitle:       "احجز جلستك",
  pageSubtitle:    "أكمل النموذج وسنتواصل معك خلال ٢٤ ساعة لتأكيد الموعد",
  backLink:        "← العودة للرئيسية",
  submitButton:    "إرسال طلب الحجز",
  submitting:      "جارٍ الإرسال...",
  fallbackLabel:   "اختر الخدمة",

  success: {
    heading:   "تم استلام طلبك! 🎉",
    body:      "شكراً لتواصلك مع أكاديمية قاف. سيتصل بك فريقنا خلال ٢٤ ساعة لتأكيد الموعد.",
    whatsapp:  "تواصل معنا عبر واتساب",
    backHome:  "العودة للرئيسية",
  },

  error: {
    heading: "حدث خطأ في الإرسال",
    body:    "يُرجى المحاولة مرة أخرى. إن استمرت المشكلة، تواصل معنا مباشرة عبر واتساب.",
    retry:   "حاول مجدداً",
  },

  /** Summary card shown on the booking page */
  serviceSummary: {
    sessionLabel:    "عدد الحصص",
    durationLabel:   "مدة الحصة",
    priceLabel:      "السعر",
    trialBadge:      "تجريبية مجانية",
  },

  trial: {
    id:          "free-trial",
    name:        "الجلسة التجريبية المجانية",
    subtitle:    "٣٠ دقيقة مع معلم معتمد",
    price:       "٠",
    currency:    "ريال",
    period:      "",
    sessions:    "١ حصة",
    duration:    "٣٠ دقيقة",
    description: "جرّب تجربة قاف بالكامل بلا التزام.",
    features:    ["تقييم المستوى", "خطة تعلّم مبدئية", "بلا رسوم"],
    highlighted: false,
    cta:         "احجز الجلسة المجانية",
    badge:       "مجاني",
  },
};

export default bookingContent;
