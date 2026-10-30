"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
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

/* Desktop placement around the oval: 1-3 on the right (top to bottom), 6-4 on the left */
const PLACE = [
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-3 lg:row-start-3",
  "lg:col-start-1 lg:row-start-3",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-1 lg:row-start-1",
];

const ease = [0.22, 1, 0.36, 1] as const;

export function SixStepProcess() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section aria-labelledby="six-step-title" className="py-8 sm:py-12">
      <Container>
        {/* heading */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center gap-3 text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand shadow-sm">
            <RefreshCw className="size-3.5" aria-hidden />How we work
          </span>
          <h2 id="six-step-title" className="text-[30px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[42px]">
            Our <span className="bg-gradient-to-r from-brand to-brand-bright bg-clip-text text-transparent">Six-Step</span> Process
          </h2>
          <p className="text-[15.5px] leading-relaxed text-body sm:text-[17px]">
            Every investment journey begins with understanding your needs and objectives. Our six-step process outlines a structured approach to exploring mutual fund investment options and supporting investors throughout their investment journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)_minmax(0,1fr)] xl:gap-x-10 lg:grid-rows-3 lg:gap-y-6">
          {/* ---------- the oval diagram ---------- */}
          <figure className="relative mx-auto mb-4 w-full max-w-[560px] sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mb-0 lg:max-w-none lg:self-center">
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
                    <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0a3d2c" floodOpacity="0.18" />
                  </filter>
                  <filter id="six-oval" x="-20%" y="-20%" width="140%" height="150%">
                    <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0a3d2c" floodOpacity="0.14" />
                  </filter>
                </defs>

                {/* soft halo */}
                <ellipse cx={CX} cy={CY} rx={OUT.rx + 12} ry={OUT.ry + 12} fill="#ebf6f0" opacity="0.7" />

                {/* six segments */}
                <g filter="url(#six-shadow)">
                  {SEGMENTS.map((s, i) => {
                    const on = active === i;
                    const dim = active !== null && !on;
                    return (
                      <motion.g
                        key={i}
                        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: reduce ? 0 : 0.15 + i * 0.12, ease }}
                      >
                        <motion.path
                          d={s.d}
                          fill={`url(#six-g${i})`}
                          stroke="#ffffff"
                          strokeWidth={on ? 2.5 : 1.2}
                          animate={{ x: on ? s.dx : 0, y: on ? s.dy : 0, opacity: dim ? 0.55 : 1 }}
                          transition={{ duration: reduce ? 0 : 0.25, ease }}
                          onMouseEnter={() => setActive(i)}
                          onMouseLeave={() => setActive(null)}
                          className="cursor-pointer"
                        />
                        <motion.text
                          x={s.lx}
                          y={s.ly}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={SHADES[i].text}
                          animate={{ x: on ? s.dx : 0, y: on ? s.dy : 0, opacity: dim ? 0.6 : 1 }}
                          transition={{ duration: reduce ? 0 : 0.25, ease }}
                          className="pointer-events-none select-none text-[34px] font-extrabold tabular-nums"
                        >
                          {i + 1}
                        </motion.text>
                      </motion.g>
                    );
                  })}
                </g>

                {/* central oval */}
                <ellipse cx={CX} cy={CY} rx={IN.rx - 14} ry={IN.ry - 12} fill="#ffffff" filter="url(#six-oval)" />
                <ellipse cx={CX} cy={CY} rx={IN.rx - 24} ry={IN.ry - 21} fill="none" stroke="#cfeedf" strokeWidth="1.5" strokeDasharray="3 6" />
              </svg>

              {/* centre label (HTML so it stays crisp and uses the real logo) */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="relative mb-[1.5%] aspect-[320/258] w-[9%] min-w-7">
                  <ProtectedImage src="/images/brand/hm-wealth-icon-transparent.png" alt="" fill sizes="64px" className="object-contain" />
                </div>
                <p className="text-[clamp(13px,2.7vw,22px)] font-extrabold leading-tight tracking-[-0.02em] text-ink lg:text-[clamp(15px,1.55vw,22px)]">
                  Our Six-Step<br />Process
                </p>
                <p className="mt-[1%] text-[clamp(9px,1.6vw,11.5px)] font-bold uppercase tracking-[0.18em] text-brand lg:text-[clamp(9px,0.8vw,11.5px)]">HM Wealth</p>
              </div>
            </div>
          </figure>

          {/* ---------- the six steps (DOM order 1→6) ---------- */}
          <ol role="list" className="contents">
            {STEPS.map((s, i) => {
              const left = i >= 3; // steps 4-6 sit on the left of the oval on desktop
              const on = active === i;
              return (
                <motion.li
                  key={s.title}
                  tabIndex={0}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: reduce ? 0 : 0.2 + i * 0.08, ease }}
                  className={cn(
                    "group flex min-w-0 gap-3.5 rounded-[20px] border bg-white p-4 outline-none transition-[box-shadow,border-color] duration-200 focus-visible:ring-2 focus-visible:ring-brand sm:p-5 lg:self-center",
                    PLACE[i],
                    left && "lg:flex-row-reverse lg:text-right",
                    on ? "border-brand/40 shadow-[0_18px_40px_-20px_rgba(11,122,85,0.45)]" : "border-line shadow-[0_1px_2px_rgba(20,24,30,0.04)]"
                  )}
                >
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_8px_16px_-8px_rgba(11,122,85,0.6)]"
                    style={{ backgroundImage: `linear-gradient(135deg, ${SHADES[i].from}, ${SHADES[i].to})`, color: SHADES[i].text }}
                    aria-hidden
                  >
                    <s.icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-brand">Step {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-0.5 text-[16px] font-extrabold leading-snug tracking-[-0.01em] text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-body">{s.desc}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-[12px] leading-relaxed text-body/80">
          HM Wealth is an AMFI-registered Mutual Fund Distributor. Mutual fund investments are subject to market risks, read all scheme related documents carefully. The final investment decision is always yours.
        </p>
      </Container>
    </section>
  );
}
