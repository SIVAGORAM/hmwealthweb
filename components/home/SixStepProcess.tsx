"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Handshake, ClipboardList, Search, Lightbulb, BadgeCheck, RefreshCw, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/kit";
import { ProtectedImage } from "@/components/ui/ProtectedImage";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
   Content: keep wording reviewed for AMFI/SEBI (distributor, not adviser).
   ------------------------------------------------------------------------- */
type Step = { title: string; desc: string; icon: LucideIcon };

const STEPS: Step[] = [
  {
    title: "Establish and Define the Relationship",
    desc: "We begin by understanding your expectations, investment objectives, and the support you are looking for. This helps establish clear communication and a shared understanding of the investment process.",
    icon: Handshake,
  },
  {
    title: "Collect Information",
    desc: "We gather relevant information about your investment goals, time horizon, financial priorities, and risk preferences to better understand your investment requirements.",
    icon: ClipboardList,
  },
  {
    title: "Analyze and Evaluate",
    desc: "We review the information collected to understand your investment requirements and identify relevant mutual fund categories and investment options for further consideration.",
    icon: Search,
  },
  {
    title: "Develop Recommendations",
    desc: "Based on the information available, we present relevant mutual fund options and explain their investment objectives, features, potential risks, and other important considerations.",
    icon: Lightbulb,
  },
  {
    title: "Implement Recommendations",
    desc: "Once you have reviewed the available information and made your investment decision, we help facilitate the applicable mutual fund investment process through our available services.",
    icon: BadgeCheck,
  },
  {
    title: "Review and Revise",
    desc: "Investment needs and circumstances can change over time. We provide appropriate investor support and help you access relevant information about your investments and available transaction services.",
    icon: RefreshCw,
  },
];

/* Six shades of the HM green, light (step 1) to deep (step 6) */
const SHADES = [
  { from: "#8be3bd", to: "#4fcb98", text: "#064e36" },
  { from: "#4fcb98", to: "#22b07c", text: "#ffffff" },
  { from: "#22b07c", to: "#12956a", text: "#ffffff" },
  { from: "#12956a", to: "#0b7a55", text: "#ffffff" },
  { from: "#0b7a55", to: "#0a6a4a", text: "#ffffff" },
  { from: "#0a6a4a", to: "#08533b", text: "#ffffff" },
];

/* -------------------------------------------------------------------------
   Geometry: a horizontal oval ring split into six arrow-shaped segments,
   running clockwise from the top (1) round to the top-left (6).
   ------------------------------------------------------------------------- */
const W = 640, H = 420, CX = W / 2, CY = H / 2;
const OUT = { rx: 306, ry: 200 };
const IN = { rx: 206, ry: 132 };
const MID = { rx: (OUT.rx + IN.rx) / 2, ry: (OUT.ry + IN.ry) / 2 };
const GAP = 1.6; // degrees between segments
const TIP = 7; // degrees the arrow tip pushes into the next segment

const rad = (d: number) => (d * Math.PI) / 180;
const pt = (e: { rx: number; ry: number }, deg: number) =>
  [CX + e.rx * Math.cos(rad(deg)), CY + e.ry * Math.sin(rad(deg))] as const;
const f = (n: number) => n.toFixed(2);

function arc(e: { rx: number; ry: number }, from: number, to: number) {
  const n = 28;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const [x, y] = pt(e, from + ((to - from) * i) / n);
    pts.push(`${f(x)} ${f(y)}`);
  }
  return pts;
}

const SEGMENTS = STEPS.map((_, i) => {
  const a = -90 + i * 60 + GAP;
  const b = -90 + (i + 1) * 60 - GAP;
  const outer = arc(OUT, a, b);
  const inner = arc(IN, b, a);
  const [tx, ty] = pt(MID, b + TIP);
  const [nx, ny] = pt(MID, a + TIP);
  const d = `M ${outer.join(" L ")} L ${f(tx)} ${f(ty)} L ${inner.join(" L ")} L ${f(nx)} ${f(ny)} Z`;
  const c = -90 + i * 60 + 30 + TIP / 2;
  const [lx, ly] = pt(MID, c);
  // unit vector pointing outward, used to "lift" the active segment
  const ox = Math.cos(rad(c)), oy = Math.sin(rad(c)) * (MID.ry / MID.rx);
  const len = Math.hypot(ox, oy);
  return { d, lx, ly, dx: (ox / len) * 9, dy: (oy / len) * 9 };
});

const ease = [0.22, 1, 0.36, 1] as const;

export function SixStepProcess() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Gently walk through the steps while the section is on screen, until the visitor interacts
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 4500);
    return () => clearInterval(t);
  }, [auto, inView, reduce]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section ref={sectionRef} aria-labelledby="six-step-title" className="py-5 sm:py-8">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#f1f7f3_0%,#ffffff_55%,#fbf6ea_100%)] p-4 ring-1 ring-line sm:rounded-[32px] sm:p-7 lg:p-8">
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 -z-10 size-72 rounded-full bg-brand-bright/10 blur-[90px]" />

          <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-2 lg:gap-10">
            {/* left: heading + oval */}
            <div className="min-w-0">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brand/15 bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand shadow-sm">
                <RefreshCw className="size-3" aria-hidden />How we work
              </span>
              <h2 id="six-step-title" className="mt-2.5 text-[24px] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[32px]">
                Our <span className="bg-gradient-to-r from-brand to-brand-bright bg-clip-text text-transparent">Six-Step</span> Process
              </h2>
              <p className="mt-2 max-w-[52ch] text-[13.5px] leading-relaxed text-body sm:text-[15px]">
                Every investment journey begins with understanding your needs and objectives. Our six-step process outlines a structured approach to exploring mutual fund investment options and supporting investors throughout their investment journey.
              </p>

              {/* ---------- the oval diagram ---------- */}
              <figure className="relative mx-auto mt-5 w-full max-w-[360px] sm:mt-6 sm:max-w-[440px] lg:mx-0">
                <figcaption className="sr-only">
                  A clockwise cycle of six steps: {STEPS.map((s, i) => `${i + 1}. ${s.title}`).join(", ")}, then back to step 1.
                </figcaption>
                <div className="relative aspect-[640/420] w-full">
                  <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" aria-hidden>
                    <defs>
                      {SHADES.map((s, i) => (
                        <linearGradient key={i} id={`six-g${i}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor={s.from} />
                          <stop offset="1" stopColor={s.to} />
                        </linearGradient>
                      ))}
                      <filter id="six-shadow" x="-10%" y="-10%" width="120%" height="130%">
                        <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0a3d2c" floodOpacity="0.16" />
                      </filter>
                      <filter id="six-oval" x="-20%" y="-20%" width="140%" height="150%">
                        <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0a3d2c" floodOpacity="0.12" />
                      </filter>
                    </defs>

                    <ellipse cx={CX} cy={CY} rx={OUT.rx + 12} ry={OUT.ry + 12} fill="#ebf6f0" opacity="0.8" />

                    <g filter="url(#six-shadow)">
                      {SEGMENTS.map((s, i) => {
                        const on = active === i;
                        return (
                          <motion.g
                            key={i}
                            initial={reduce ? false : { opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.45, delay: reduce ? 0 : 0.1 + i * 0.1, ease }}
                            onMouseEnter={() => pick(i)}
                            onClick={() => pick(i)}
                            className="cursor-pointer"
                          >
                            <motion.path
                              d={s.d}
                              fill={`url(#six-g${i})`}
                              stroke="#ffffff"
                              strokeWidth={on ? 3 : 1.2}
                              animate={{ x: on ? s.dx : 0, y: on ? s.dy : 0, opacity: on ? 1 : 0.82 }}
                              transition={{ duration: reduce ? 0 : 0.3, ease }}
                            />
                            <motion.text
                              x={s.lx}
                              y={s.ly}
                              textAnchor="middle"
                              dominantBaseline="central"
                              fill={SHADES[i].text}
                              animate={{ x: on ? s.dx : 0, y: on ? s.dy : 0 }}
                              transition={{ duration: reduce ? 0 : 0.3, ease }}
                              className="pointer-events-none select-none text-[34px] font-extrabold tabular-nums"
                            >
                              {i + 1}
                            </motion.text>
                          </motion.g>
                        );
                      })}
                    </g>

                    <ellipse cx={CX} cy={CY} rx={IN.rx - 14} ry={IN.ry - 12} fill="#ffffff" filter="url(#six-oval)" />
                    <ellipse cx={CX} cy={CY} rx={IN.rx - 24} ry={IN.ry - 21} fill="none" stroke="#cfeedf" strokeWidth="1.5" strokeDasharray="3 6" />
                  </svg>

                  {/* centre: logo + the active step */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="relative mb-[1.5%] aspect-[320/258] w-[8%] min-w-6">
                      <ProtectedImage src="/images/brand/hm-wealth-icon-transparent.png" alt="" fill sizes="48px" className="object-contain" />
                    </div>
                    <p className="text-[clamp(10px,2.2vw,12px)] font-bold uppercase tracking-[0.16em] text-brand lg:text-[11px]">
                      Step {String(active + 1).padStart(2, "0")} of 06
                    </p>
                    <p className="mt-[1%] max-w-[46%] text-[clamp(12px,3vw,17px)] font-extrabold leading-tight tracking-[-0.01em] text-ink lg:text-[16px]">
                      {STEPS[active].title}
                    </p>
                  </div>
                </div>
              </figure>

            </div>

            {/* right: steps */}
            {/* ---------- the six steps (one open at a time) ---------- */}
            <ol className="flex flex-col gap-1.5" aria-label="Six-step process">
              {STEPS.map((s, i) => {
                const on = active === i;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => pick(i)}
                      onMouseEnter={() => pick(i)}
                      onFocus={() => pick(i)}
                      aria-expanded={on}
                      aria-controls={`six-step-${i}`}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-2xl border px-3 py-2.5 text-left transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                        on ? "border-brand/30 bg-white shadow-[0_14px_34px_-18px_rgba(11,122,85,0.45)]" : "border-transparent hover:bg-white/70"
                      )}
                    >
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-[10px] text-[12.5px] font-extrabold tabular-nums"
                        style={{ backgroundImage: `linear-gradient(135deg, ${SHADES[i].from}, ${SHADES[i].to})`, color: SHADES[i].text }}
                        aria-hidden
                      >
                        {on ? <s.icon className="size-4" /> : String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 pt-[7px]">
                        <span className={cn("block text-[14.5px] font-bold leading-snug tracking-[-0.01em] sm:text-[15px]", on ? "text-ink" : "text-ink/80")}>
                          {s.title}
                        </span>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.span
                              id={`six-step-${i}`}
                              initial={reduce ? false : { height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={reduce ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease }}
                              className="block overflow-hidden"
                            >
                              <span className="block pb-0.5 pt-1 text-[13px] leading-relaxed text-body sm:text-[13.5px]">{s.desc}</span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <p className="mt-5 border-t border-line/80 pt-3 text-center text-[12px] sm:text-[12.5px] font-medium leading-relaxed text-slate-700">
            HM Wealth is an AMFI-registered Mutual Fund Distributor. Mutual fund investments are subject to market risks, read all scheme related documents carefully. The final investment decision is always yours.
          </p>
        </div>
      </Container>
    </section>
  );
}
