"use client";

import { useId, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { inrShort } from "@/lib/utils";

type Point = { year: number; primary: number; base?: number };

/** Area chart for growth: green value line with soft fill, dashed invested line. */
export function GrowthChart({ series, primaryLabel, baseLabel, height = 240, drawOnMount, compact }: {
  series: Point[]; primaryLabel: string; baseLabel?: string; height?: number; drawOnMount?: boolean; compact?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const W = 520, H = height, padL = 4, padR = 4, padT = 24, padB = compact ? 8 : 30;

  const { line, area, baseLine, ticks, yTicks, end } = useMemo(() => {
    const maxY = Math.max(1, ...series.map((p) => Math.max(p.primary, p.base ?? 0)));
    const last = series[series.length - 1]?.year || 1;
    const x = (yr: number) => padL + (yr / last) * (W - padL - padR);
    const y = (v: number) => padT + (1 - v / maxY) * (H - padT - padB);
    const path = (k: "primary" | "base") => series.map((p, i) => `${i ? "L" : "M"}${x(p.year).toFixed(1)} ${y((p[k] ?? 0) as number).toFixed(1)}`).join(" ");
    const l = path("primary");
    const lastP = series[series.length - 1];
    return {
      line: l,
      area: `${l} L${x(last).toFixed(1)} ${H - padB} L${x(0).toFixed(1)} ${H - padB} Z`,
      baseLine: series.some((p) => p.base !== undefined) ? path("base") : null,
      ticks: series.filter((p) => p.year % (last <= 10 ? 2 : last <= 20 ? 5 : 10) === 0).map((p) => ({ x: x(p.year), label: p.year === 0 ? "Today" : `Yr ${p.year}` })),
      yTicks: [0.5, 1].map((f) => ({ y: y(maxY * f), label: inrShort(maxY * f) })),
      end: lastP ? { x: x(lastP.year), y: y(lastP.primary) } : { x: 0, y: 0 },
    };
  }, [series, H, padB]);

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" role="img" aria-label={`${primaryLabel} over time`}>
        <defs>
          <linearGradient id={`g-${uid}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#19c38a" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#19c38a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {!compact && yTicks.map((t) => (
          <g key={t.label}>
            <line x1={padL} x2={W - padR} y1={t.y} y2={t.y} stroke="#e3ebe7" strokeDasharray="3 4" />
            <text x={padL} y={t.y - 6} fontSize="13" fill="#56665f" className="tnum">{t.label}</text>
          </g>
        ))}
        <motion.path d={area} fill={`url(#g-${uid})`} animate={{ d: area }} transition={{ duration: 0.35 }} />
        {baseLine && <motion.path d={baseLine} fill="none" stroke="#9fb3aa" strokeWidth="2" strokeDasharray="5 6" animate={{ d: baseLine }} transition={{ duration: 0.35 }} />}
        <motion.path
          d={line} fill="none" stroke="#0b7a55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          initial={drawOnMount && !reduce ? { pathLength: 0 } : false}
          animate={{ pathLength: 1, d: line }}
          transition={{ pathLength: { duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }, d: { duration: 0.35 } }}
        />
        <motion.circle r="6" fill="#fff" stroke="#0b7a55" strokeWidth="3" animate={{ cx: end.x, cy: end.y }} transition={{ duration: 0.35 }} />
        {!compact && ticks.map((t) => <text key={t.label} x={t.x} y={H - 6} textAnchor="middle" fontSize="13" fill="#56665f">{t.label}</text>)}
      </svg>
      {!compact && (
        <figcaption className="mt-3 flex flex-wrap gap-5 text-[13px] font-medium text-body">
          <span className="flex items-center gap-2"><span className="h-[3px] w-5 rounded bg-brand" />{primaryLabel}</span>
          {baseLabel && <span className="flex items-center gap-2"><span className="w-5 border-t-2 border-dashed border-[#9fb3aa]" />{baseLabel}</span>}
        </figcaption>
      )}
    </figure>
  );
}
