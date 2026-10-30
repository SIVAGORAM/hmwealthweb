"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowRight, CheckCircle2, PlayCircle, Sparkles, GraduationCap, Home, Sunset, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/kit";
import { ProtectedImage } from "@/components/ui/ProtectedImage";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;
const DURATION = 6500; // ms per story

/* Each story pairs the rotating headline with its own photo and goal card. */
const STORIES = [
  {
    goal: "your child’s future", label: "Child’s future", photo: photos.family, pos: "38% 35%", flip: false,
    icon: GraduationCap, tint: "bg-[#efeaff] text-[#6b4fd1]", title: "Child’s education goal", value: "₹25 L target", progress: 62,
  },
  {
    goal: "your dream home", label: "Dream home", photo: photos.home, pos: "55% 45%", flip: false,
    icon: Home, tint: "bg-[#e6f0ff] text-[#2f6fd6]", title: "Home down-payment fund", value: "₹15 L target", progress: 45,
  },
  {
    goal: "a calm retirement", label: "Retirement", photo: photos.seniors, pos: "62% 30%", flip: false,
    icon: Sunset, tint: "bg-[#fff0e8] text-[#d6662f]", title: "Retirement income", value: "Monthly SWP set up", progress: null,
  },
  {
    goal: "your family’s safety", label: "Family safety", photo: photos.motherDaughter, pos: "50% 30%", flip: false,
    icon: ShieldCheck, tint: "bg-[#e7f6ef] text-[#0b7a55]", title: "Family health cover", value: "₹10 L floater · 4 members", progress: null,
  },
];

/* ---------- real 3D gold rupee coin (pure CSS 3D) ---------- */
function Coin3D({ size = 112 }: { size?: number }) {
  const layers = 10;
  const face = (back = false) => (
    <div
      className="absolute inset-0 flex items-center justify-center rounded-full [backface-visibility:hidden]"
      style={{
        transform: back ? `rotateY(180deg) translateZ(${layers / 2}px)` : `translateZ(${layers / 2}px)`,
        background: "radial-gradient(circle at 32% 28%, #fff3c4 0%, #f5cf63 22%, #e0a92e 52%, #b9831a 78%, #8f6312 100%)",
        boxShadow: "inset 0 0 0 4px rgba(255,236,170,0.65), inset 0 0 0 9px rgba(160,110,20,0.35), inset 0 -10px 24px rgba(120,80,10,0.45)",
      }}
    >
      <div className="absolute inset-[12%] rounded-full border-2 border-dashed border-[#fff1b8]/60" />
      <span className="relative font-extrabold text-[#7a5410] [text-shadow:0_1px_0_#fff3c4,0_-1px_0_rgba(90,60,5,0.5)]" style={{ fontSize: size * 0.42 }}>₹</span>
    </div>
  );
  return (
    <div className="[perspective:900px]" style={{ width: size, height: size }} aria-hidden>
      <div className="relative size-full animate-coin [transform-style:preserve-3d]">
        {Array.from({ length: layers }, (_, k) => (
          <div key={k} className="absolute inset-0 rounded-full" style={{ transform: `translateZ(${k - layers / 2}px)`, background: "linear-gradient(90deg, #8f6312, #d9a634 45%, #f3cf6a 55%, #8f6312)" }} />
        ))}
        {face()}
        {face(true)}
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const story = STORIES[index];

  const next = useCallback(() => setIndex((i) => (i + 1) % STORIES.length), []);
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
  }, [index, reduce, next]);

  // gentle mouse parallax for the floating elements
  const rawX = useMotionValue(0), rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 50, damping: 18 });
  const my = useSpring(rawY, { stiffness: 50, damping: 18 });
  const coinX = useTransform(mx, (v) => v * -22), coinY = useTransform(my, (v) => v * -22);
  const cardX = useTransform(mx, (v) => v * 12), cardY = useTransform(my, (v) => v * 12);
  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const enter = (d: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 30, filter: "blur(10px)" } as const),
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay: d, ease },
  });

  return (
    <section className="bg-white px-3 pb-3 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
      <div
        onMouseMove={onMove}
        className="relative isolate mx-auto flex min-h-[620px] max-w-[1600px] flex-col overflow-hidden rounded-[28px] bg-[#f5f6f3] ring-1 ring-line sm:rounded-[40px] lg:h-[calc(100svh-128px)] lg:max-h-[760px] lg:min-h-[620px]"
      >
        {/* ---------- cinematic photo stories ---------- */}
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-x-0 top-0 -z-20 h-[300px] max-lg:overflow-hidden xs:h-[340px] sm:h-[420px] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[66%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduce ? 1 : 1.14 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: (DURATION + 1500) / 1000, ease: "linear" }}
            >
              <ProtectedImage
                src={story.photo.src}
                alt={story.photo.alt}
                fill
                priority
                loading="eager"
                sizes="(min-width: 1024px) 66vw, 100vw"
                className={`object-cover ${story.flip ? "-scale-x-100" : ""}`}
                style={{ objectPosition: story.pos }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* legibility + mood overlays */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block lg:bg-[linear-gradient(90deg,#f5f6f3_0%,#f5f6f3_34%,rgba(245,246,243,0.82)_46%,rgba(245,246,243,0.12)_68%,transparent_85%)]" />
        {/* mobile: photo band on top, fading into the green panel */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[301px] xs:h-[341px] sm:h-[421px] bg-[linear-gradient(180deg,rgba(245,246,243,0)_0%,rgba(245,246,243,0.05)_25%,rgba(245,246,243,0.35)_55%,rgba(245,246,243,0.9)_82%,#f5f6f3_100%)] lg:hidden" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#f5f6f3]/90 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 -z-10 size-[520px] rounded-full bg-[#19c38a]/12 blur-[120px]" />

        {/* ---------- story progress (mobile: on top of the photo) ---------- */}
        <div className="absolute inset-x-4 top-4 z-10 flex items-center sm:inset-x-6 sm:top-6 lg:hidden">
          <div role="tablist" aria-label="Goals" className="grid flex-1 grid-cols-4 gap-2 sm:w-[520px] sm:flex-none">
            {STORIES.map((s, i) => (
              <button
                key={s.label}
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className="group flex flex-col gap-2 text-left"
              >
                <span className="relative h-[3px] overflow-hidden rounded-full bg-white/20">
                  {i < index && <span className="absolute inset-0 bg-white" />}
                  {i === index && (
                    <motion.span
                      key={index}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7ff0c4] to-white"
                      initial={{ width: reduce ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: reduce ? 0 : DURATION / 1000, ease: "linear" }}
                    />
                  )}
                </span>
                <span className={`hidden text-xs font-semibold transition sm:block ${i === index ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ---------- content ---------- */}
        <Container className="relative flex flex-1 flex-col justify-end gap-3 pb-5 pt-[190px] xs:pt-[220px] sm:pt-[290px] sm:gap-4 sm:pb-7 lg:justify-center lg:pb-12 lg:pt-8">
          <div className="max-w-[680px]">
            <h1 className="text-[32px] font-extrabold leading-[1.04] tracking-[-0.04em] text-ink xs:text-[38px] sm:text-[60px] xl:text-[68px]">
              <motion.span {...enter(0.15)} className="block">Invest today for</motion.span>
              <motion.span {...enter(0.25)} className="relative block max-w-full overflow-hidden pb-[0.12em] text-[0.82em] sm:text-[1em]">
                <span aria-hidden className="invisible block whitespace-nowrap">your family’s safety</span>
                <span className="sr-only">{story.goal}</span>
                <AnimatePresence initial={false}>
                  <motion.span
                    key={story.goal}
                    aria-hidden
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-105%" }}
                    transition={{ duration: 0.8, ease }}
                    className="absolute left-0 top-0 max-w-full whitespace-nowrap bg-gradient-to-r from-brand via-[#19c38a] to-[#c98a12] bg-clip-text pb-[0.12em] text-transparent"
                  >
                    {story.goal}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
            </h1>

            <motion.p {...enter(0.35)} className="mt-3.5 sm:mt-4 max-w-[34rem] text-[15px] sm:text-[17px] leading-relaxed text-body">
              Mutual funds, SIPs and insurance, explained around your goals in plain words. We handle the paperwork and stay with you for years.
            </motion.p>

            <motion.div {...enter(0.45)} className="mt-6 sm:mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="group relative inline-flex min-h-12 sm:min-h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-brand px-7 text-[15.5px] font-bold text-white shadow-[0_20px_40px_-15px_rgba(11,122,85,0.55)] transition hover:-translate-y-0.5 sm:w-auto">
                <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <Sparkles className="relative size-[18px] text-white" />
                <span className="relative">Start your SIP</span>
                <ArrowRight className="relative size-[18px] transition group-hover:translate-x-1" />
              </Link>
              <Link href="/calculators" className="inline-flex min-h-12 sm:min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-line bg-white px-6 text-[15.5px] font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 sm:w-auto">
                <PlayCircle className="size-[18px]" /> Try SIP calculator
              </Link>
            </motion.div>

          </div>

          {/* ---------- bottom bar: families + story progress ---------- */}
          <motion.div {...enter(0.7)} className="hidden lg:absolute lg:inset-x-8 lg:bottom-7 lg:flex lg:items-center lg:justify-end">
            <div className="hidden items-center lg:flex">
              <div role="tablist" aria-label="Goals" className="grid flex-1 grid-cols-4 gap-2 sm:w-[520px] sm:flex-none">
                {STORIES.map((s, i) => (
                  <button
                    key={s.label}
                    role="tab"
                    aria-selected={i === index}
                    onClick={() => setIndex(i)}
                    className="group flex flex-col gap-2 text-left"
                  >
                    <span className="relative h-[3px] overflow-hidden rounded-full bg-ink/10">
                      {i < index && <span className="absolute inset-0 bg-brand" />}
                      {i === index && (
                        <motion.span
                          key={index}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#19c38a] to-brand"
                          initial={{ width: reduce ? "100%" : "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: reduce ? 0 : DURATION / 1000, ease: "linear" }}
                        />
                      )}
                    </span>
                    <span className={`hidden text-xs font-semibold transition sm:block ${i === index ? "text-ink" : "text-body group-hover:text-body"}`}>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>

      </div>
    </section>
  );
}
