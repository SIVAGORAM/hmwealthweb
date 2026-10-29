"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const LEVELS = [
  { name: "Low", color: "#34b67a", text: "Very small ups and downs. Typically overnight and some liquid funds, for money you may need any day." },
  { name: "Low to moderate", color: "#8fcb5a", text: "Small movements in value. Typically liquid, ultra-short and money market funds." },
  { name: "Moderate", color: "#f2c94c", text: "Some movement over months. Typically short-duration debt and conservative hybrid funds." },
  { name: "Moderately high", color: "#f2a03d", text: "Noticeable swings over a year. Typically balanced advantage and some hybrid funds." },
  { name: "High", color: "#e8743b", text: "Large swings over a year or two. Typically aggressive hybrid and gold funds." },
  { name: "Very high", color: "#d64545", text: "Sharp falls are possible in the short term. Typically equity, index and ELSS funds, suited to 5 years or more." },
];

/** SEBI-style semicircular riskometer with six levels. */
export function Riskometer() {
  const [level, setLevel] = useState(5);
  const cx = 160, cy = 160, R = 140, r = 88, seg = Math.PI / 6;
  const arc = (k: number) => {
    const a0 = Math.PI + k * seg, a1 = a0 + seg;
    const p = (rad: number, a: number) => `${(cx + rad * Math.cos(a)).toFixed(1)} ${(cy + rad * Math.sin(a)).toFixed(1)}`;
    return `M${p(R, a0)} A${R} ${R} 0 0 1 ${p(R, a1)} L${p(r, a1)} A${r} ${r} 0 0 0 ${p(r, a0)} Z`;
  };
  const a = Math.PI + (level + 0.5) * seg;
  const tip = { x2: cx + 116 * Math.cos(a), y2: cy + 116 * Math.sin(a) };

  return (
    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,360px)_1fr]">
      <svg viewBox="0 0 320 180" className="w-full" role="img" aria-label={`Riskometer showing ${LEVELS[level].name} risk`}>
        {LEVELS.map((l, k) => (
          <path key={l.name} d={arc(k)} fill={l.color} opacity={k === level ? 1 : 0.35} stroke="#fff" strokeWidth="3" className="cursor-pointer transition-opacity duration-300" onClick={() => setLevel(k)} />
        ))}
        <motion.line x1={cx} y1={cy} initial={false} animate={tip} transition={{ type: "spring", stiffness: 90, damping: 14 }} stroke="#0f1f1a" strokeWidth="4" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="11" fill="#0f1f1a" /><circle cx={cx} cy={cy} r="4" fill="#fff" />
      </svg>
      <div className="flex flex-col gap-5">
        <div role="radiogroup" aria-label="Risk level" className="flex flex-wrap gap-2">
          {LEVELS.map((l, k) => (
            <button key={l.name} type="button" role="radio" aria-checked={level === k} onClick={() => setLevel(k)}
              className={cn("flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors", level === k ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink/30")}>
              <span className="size-2.5 rounded-full" style={{ background: l.color }} />{l.name}
            </button>
          ))}
        </div>
        <div className="rounded-2xl bg-soft p-5" aria-live="polite">
          <p className="text-lg font-bold" style={{ color: LEVELS[level].color === "#f2c94c" ? "#a07c10" : LEVELS[level].color }}>{LEVELS[level].name} risk</p>
          <p className="mt-1 text-[16px] leading-relaxed text-body">{LEVELS[level].text}</p>
        </div>
      </div>
    </div>
  );
}
