/**
 * components/sections/HeroSection.jsx
 *
 * فكرة الهيرو: "الحصة المباشرة"
 * بدل ما نكتفي بالكلام، بنعرض حصة تحفيظ أونلاين مصغّرة:
 * معلم + طالب + مصحف بيتتبّع التلاوة كلمة كلمة + شريط تقدّم + "أحسنت".
 * اللي يبص يفهم فورًا: قرآن + حفظ + معلم + مباشر + أونلاين.
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Video,
  User,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  CalendarClock,
} from "lucide-react";
import { hero } from "@content/home";
import siteConfig from "@config/site.config";
import Button from "@components/ui/Button";
import Container from "@components/ui/Container";

/* ───────── محتوى (عدّله براحتك أو انقله إلى content/home) ───────── */

// ثلاث نقاط سريعة تجاوب على: إيه ده؟ وإزاي؟
const points = [
  { Icon: Video, text: "حصص فيديو مباشرة" },
  { Icon: GraduationCap, text: "معلم مخصص لك" },
  { Icon: CalendarClock, text: "في الوقت الذي يناسبك" },
];

// سورة الإخلاص: قصيرة وأول ما يحفظه أغلب الطلاب. بدّلها بأي آيات تحب.
const SURAH = "سورة الإخلاص";
const AYAT = [
  ["قُلْ", "هُوَ", "اللَّهُ", "أَحَدٌ"],
  ["اللَّهُ", "الصَّمَدُ"],
  ["لَمْ", "يَلِدْ", "وَلَمْ", "يُولَدْ"],
  ["وَلَمْ", "يَكُنْ", "لَهُ", "كُفُوًا", "أَحَدٌ"],
];

const QURAN_FONT =
  "var(--font-quran, 'Amiri Quran', 'Amiri', 'Scheherazade New', serif)";

const TOTAL = AYAT.flat().length;
const OFFSETS = AYAT.map((_, a) =>
  AYAT.slice(0, a).reduce((n, words) => n + words.length, 0)
);
const ayahOf = (step) =>
  OFFSETS.reduce((found, start, a) => (step >= start ? a : found), 0);
const toAr = (n) => n.toLocaleString("ar-EG");

const WORD_STYLE = {
  done: "text-[var(--color-primary-dark)]",
  now: "bg-[var(--color-accent)]/45 text-[var(--color-primary-dark)] scale-110",
  todo: "text-[var(--color-primary-dark)]/30",
};

/* ───────── مكوّنات صغيرة للنموذج ───────── */

function Wave({ active }) {
  return (
    <span className="ms-auto flex h-5 items-end gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="h-full w-0.5 origin-bottom rounded-full bg-[var(--color-accent-light)]"
          animate={{ scaleY: active ? [0.25, 1, 0.45, 0.9, 0.25] : 0.25 }}
          transition={{
            duration: 1,
            delay: i * 0.12,
            repeat: active ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

function Tile({ icon: Icon, name, note, children }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-3 text-white">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-accent-light)] text-[var(--color-primary-dark)]">
        <Icon size={20} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold">{name}</span>
        <span className="block truncate text-xs text-white/70">{note}</span>
      </span>
      {children}
    </div>
  );
}

function LiveLesson() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const done = step >= TOTAL;

  useEffect(() => {
    if (reduce) {
      setStep(TOTAL);
      return undefined;
    }
    const t = setTimeout(
      () => setStep((s) => (s >= TOTAL ? 0 : s + 1)),
      done ? 3000 : 650
    );
    return () => clearTimeout(t);
  }, [step, done, reduce]);

  const currentAyah = done ? AYAT.length : ayahOf(step) + 1;

  return (
    <div
      role="img"
      aria-label="نموذج لحصة تحفيظ مباشرة: معلم يتابع تلاوة الطالب على المصحف ويصحّح له"
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      <div
        className="pointer-events-none absolute -inset-6 rounded-full bg-[var(--color-accent)]/20 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-hidden rounded-[var(--radius-lg)] border border-white/15 bg-[var(--color-primary-dark)]/85 shadow-2xl backdrop-blur-md"
      >
        {/* شريط الحصة */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm text-white">
          <span className="flex items-center gap-2 font-bold">
            <BookOpen size={16} className="text-[var(--color-accent-light)]" />
            حلقة تحفيظ مباشرة
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            مباشر
          </span>
        </div>

        <div className="space-y-3 p-4">
          {/* المصحف */}
          <div
            dir="rtl"
            lang="ar"
            className="relative rounded-xl border-2 border-[var(--color-accent)]/60 bg-[#fbf6e8] px-4 py-4 text-center text-[var(--color-primary-dark)] shadow-inner"
          >
            <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold text-[var(--color-primary)]">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              {SURAH}
              <span className="h-px w-8 bg-[var(--color-accent)]" />
            </div>

            <div
              className="space-y-1 text-2xl leading-[2.1] sm:text-3xl"
              style={{ fontFamily: QURAN_FONT }}
            >
              {AYAT.map((words, a) => (
                <p key={a}>
                  {words.map((w, i) => {
                    const idx = OFFSETS[a] + i;
                    const state =
                      idx < step ? "done" : idx === step ? "now" : "todo";
                    return (
                      <span
                        key={i}
                        className={`mx-0.5 inline-block rounded-md px-1 transition-all duration-300 ${WORD_STYLE[state]}`}
                      >
                        {w}
                      </span>
                    );
                  })}
                  <span className="mx-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-accent)] align-middle text-xs leading-none text-[var(--color-primary)]">
                    {toAr(a + 1)}
                  </span>
                </p>
              ))}
            </div>

            <AnimatePresence>
              {done && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-bold text-white shadow-lg"
                >
                  <CheckCircle2 size={14} className="text-[var(--color-accent-light)]" />
                  أحسنت!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* المعلم والطالب */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Tile icon={GraduationCap} name="المعلم" note="يتابع ويصحّح لك" />
            <Tile icon={User} name="أنت" note={done ? "أتممت التسميع" : "تُسمّع الآن"}>
              <Wave active={!done && !reduce} />
            </Tile>
          </div>

          {/* التقدّم */}
          <div>
            <div className="mb-1.5 flex justify-between text-xs text-white/70">
              <span>تقدّم الحفظ</span>
              <span>
                الآية {toAr(currentAyah)} من {toAr(AYAT.length)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-l from-[var(--color-accent)] to-[var(--color-accent-light)] transition-[width] duration-500"
                style={{ width: `${(step / TOTAL) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ───────── الهيرو ───────── */

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="القسم الرئيسي"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-bl from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)] pb-36 pt-28 text-white"
    >
      {/* Islamic pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        style={{ opacity: "var(--pattern-opacity, 0.04)" }}
        aria-hidden="true"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="white" strokeWidth="0.5">
                <polygon points="40,10 47,28 66,28 52,40 57,58 40,47 23,58 28,40 14,28 33,28" />
                <polygon points="40,20 44,30 55,30 47,37 50,48 40,42 30,48 33,37 25,30 36,30" />
                <line x1="0" y1="40" x2="80" y2="40" />
                <line x1="40" y1="0" x2="40" y2="80" />
                <line x1="0" y1="0" x2="80" y2="80" />
                <line x1="80" y1="0" x2="0" y2="80" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-geo)" />
        </svg>
      </div>

      {/* Gold glow behind the lesson window */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 25% 50%, rgba(201,168,76,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* النص */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-right"
          >
            

            <h1
              className="mb-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)", color: "#fff" }}
            >
              {hero.heading}
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl lg:mx-0" style={{ color: "rgba(255,255,255,0.82)" }}>
              {hero.subheading}
            </p>

            <ul className="mb-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              {points.map(({ Icon, text }) => (
                <li
                  key={text}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white"
                >
                  <Icon size={16} className="text-[var(--color-accent-light)]" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/booking">
                <Button variant="accent" size="lg">
                  {hero.cta}
                  <ArrowLeft size={18} />
                </Button>
              </Link>
              {siteConfig.trial.enabled && (
                <Link to="/booking?service=free-trial">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="!border-white/40 !text-white hover:!border-white hover:!bg-white/10"
                  >
                    {hero.trialCta}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>

          {/* الحصة المباشرة */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          >
            <LiveLesson />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-[var(--radius-lg)] border border-white/10 bg-white/10 px-4 py-4 backdrop-blur-sm"
            >
              <span
                className="text-3xl font-black text-[var(--color-accent-light)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-white/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg-base))" }}
        aria-hidden="true"
      />
    </section>
  );
}