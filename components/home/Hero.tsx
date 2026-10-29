"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowRight, CheckCircle2, PlayCircle, Sparkles, GraduationCap, Home, Sunset, ShieldCheck, Pause, Play } from "lucide-react";
import { Container } from "@/components/ui/kit";
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
  const [paused, setPaused] = useState(false);
  const story = STORIES[index];

  const next = useCallback(() => setIndex((i) => (i + 1) % STORIES.length), []);
  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
  }, [index, paused, reduce, next]);

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
    <section className="bg-white px-3 pb-2 pt-3 sm:px-4 sm:pt-4">
      <div
        onMouseMove={onMove}
        className="relative isolate mx-auto flex min-h-[680px] max-w-[1600px] flex-col overflow-hidden rounded-[28px] bg-[#04261c] sm:rounded-[40px] lg:h-[calc(100svh-128px)] lg:max-h-[760px] lg:min-h-[620px]"
      >
        {/* ---------- cinematic photo stories ---------- */}
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-x-0 top-0 -z-20 h-[330px] max-lg:overflow-hidden xs:h-[370px] sm:h-[460px] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[66%]"
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
              <Image
                src={story.photo.src}
                alt={story.photo.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : undefined}
                sizes="100vw"
                className={`object-cover ${story.flip ? "-scale-x-100" : ""}`}
                style={{ objectPosition: story.pos }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* legibility + mood overlays */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block lg:bg-[linear-gradient(90deg,#03241a_0%,#03241a_34%,rgba(3,36,26,0.75)_46%,rgba(3,36,26,0.15)_68%,transparent_85%)]" />
        {/* mobile: photo band on top, fading into the green panel */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[331px] xs:h-[371px] sm:h-[461px] bg-[linear-gradient(180deg,rgba(3,36,26,0.25)_0%,rgba(3,36,26,0.05)_25%,rgba(3,36,26,0.35)_55%,rgba(3,36,26,0.9)_82%,#04261c_100%)] lg:hidden" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#03241a]/90 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 -z-10 size-[520px] rounded-full bg-[#19c38a]/25 blur-[120px]" />

        {/* ---------- story progress (mobile: on top of the photo) ---------- */}
            <div className="absolute inset-x-4 top-4 z-10 flex items-center gap-3 sm:inset-x-6 sm:top-6 lg:hidden">
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
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7ff0c4] to-white"
                      initial={{ width: paused || reduce ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused || reduce ? 0 : DURATION / 1000, ease: "linear" }}
                    />
                  )}
                </span>
                <span className={`hidden text-xs font-semibold transition sm:block ${i === index ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>{s.label}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play stories" : "Pause stories"}
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md lg:size-10 lg:bg-white/10 transition hover:bg-white/20"
          >
            {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
          </button>
        </div>

        {/* ---------- content ---------- */}
        <Container className="relative flex flex-1 flex-col justify-end gap-6 pb-4 pt-[220px] xs:pt-[250px] sm:pt-[340px] sm:gap-8 sm:pb-5 lg:justify-center lg:pb-12 lg:pt-10">
          <div className="max-w-[680px]">
            <motion.div {...enter(0.05)}>
              <Link href="/about#registrations" className="group inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/20 bg-[#03241a]/55 sm:bg-white/10 py-1.5 pl-1.5 pr-4 text-[13px] font-semibold text-white backdrop-blur-md transition hover:bg-white/15">
                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#19c38a] px-2.5 py-1 text-[11px] font-bold text-[#03241a]">
                  <span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#03241a] opacity-60" /><span className="relative inline-flex size-1.5 rounded-full bg-[#03241a]" /></span>
                  Registered
                </span>
                <span className="min-w-0 text-left leading-snug"><span className="sm:hidden">AMFI MFD · </span><span className="hidden sm:inline">{site.tagline} · </span>{site.arn}</span>
              </Link>
            </motion.div>

            <h1 className="mt-6 text-[34px] font-extrabold leading-[1.04] tracking-[-0.04em] text-white xs:text-[40px] sm:text-[64px] xl:text-[72px]">
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
                    className="absolute left-0 top-0 max-w-full whitespace-nowrap bg-gradient-to-r from-[#7ff0c4] via-[#b8f5d6] to-[#f2d27a] bg-clip-text pb-[0.12em] text-transparent"
                  >
                    {story.goal}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
            </h1>

            <motion.p {...enter(0.35)} className="mt-6 max-w-[34rem] text-base leading-relaxed text-white/80 sm:text-lg">
              Mutual funds, SIPs, insurance and gold, chosen around your goals and explained in plain words. We handle the paperwork and stay with you for years.
            </motion.p>

            <motion.div {...enter(0.45)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="group relative inline-flex min-h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-8 text-[16px] font-bold text-[#04261c] shadow-[0_20px_40px_-15px_rgba(25,195,138,0.6)] transition hover:-translate-y-0.5 sm:w-auto">
                <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-[#19c38a]/25 to-transparent" />
                <Sparkles className="relative size-[18px] text-brand" />
                <span className="relative">Start your SIP</span>
                <ArrowRight className="relative size-[18px] transition group-hover:translate-x-1" />
              </Link>
              <Link href="/calculators" className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 text-[16px] font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto">
                <PlayCircle className="size-[18px]" /> Try SIP calculator
              </Link>
            </motion.div>

            <motion.ul {...enter(0.55)} className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold text-white/85">
              {["Start from ₹500 a month", "Paperless KYC in 10 minutes", "Free first call"].map((t) => (
                <li key={t} className="flex items-center gap-1.5"><CheckCircle2 className="size-[18px] text-[#7ff0c4]" />{t}</li>
              ))}
            </motion.ul>
          </div>

          {/* ---------- bottom bar: families + story progress ---------- */}
          <motion.div {...enter(0.7)} className="flex flex-col gap-6 border-t border-white/15 pt-5 lg:absolute lg:inset-x-8 lg:bottom-7 lg:flex-row lg:items-center lg:justify-between lg:border-t-0 lg:pt-0">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[photos.family, photos.seniors, photos.motherDaughter, photos.home].map((p) => (
                  <span key={p.src} className="relative size-9 overflow-hidden rounded-full ring-2 ring-[#04261c] lg:size-10">
                    <Image src={p.src} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                ))}
              </div>
              <p className="text-sm leading-snug text-white/75">
                <strong className="block text-[15px] font-bold text-white">Families across India</strong>
                invest with {site.name} for their future
              </p>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
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
                          key={`${index}-${paused}`}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7ff0c4] to-white"
                          initial={{ width: paused || reduce ? "100%" : "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: paused || reduce ? 0 : DURATION / 1000, ease: "linear" }}
                        />
                      )}
                    </span>
                    <span className={`hidden text-xs font-semibold transition sm:block ${i === index ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>{s.label}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play stories" : "Pause stories"}
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md lg:size-10 lg:bg-white/10 transition hover:bg-white/20"
              >
                {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </button>
            </div>
          </motion.div>
        </Container>

        {/* ---------- floating goal card (changes with each story) ---------- */}
        <motion.div style={{ x: cardX, y: cardY }} className="absolute bottom-32 right-8 z-10 hidden w-[320px] lg:block xl:right-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24, scale: 0.94, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, scale: 0.96, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease }}
              className="rounded-3xl border border-white/40 bg-white/80 p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <span className={`flex size-11 items-center justify-center rounded-2xl ${story.tint}`}><story.icon className="size-5" /></span>
                <div className="flex-1">
                  <p className="text-[15px] font-bold text-ink">{story.title}</p>
                  <p className="text-[13px] text-body">{story.value}</p>
                </div>
                {story.progress === null && <span className="rounded-full bg-mint px-2.5 py-1 text-[11px] font-bold text-brand">Active</span>}
              </div>
              {story.progress !== null && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-semibold text-body"><span>Progress</span><span className="text-ink">{story.progress}%</span></div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/10">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-bright" initial={{ width: 0 }} animate={{ width: `${story.progress}%` }} transition={{ delay: 0.3, duration: 1.2, ease }} />
                  </div>
                </div>
              )}
              <p className="mt-3 text-[11px] text-body/80">Sample for illustration</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ---------- 3D coin ---------- */}
        <motion.div style={{ x: coinX, y: coinY }} className="absolute bottom-[268px] right-2 z-20 hidden lg:block xl:right-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 120, damping: 12 }}
            className="animate-float drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
          >
            <Coin3D size={88} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
