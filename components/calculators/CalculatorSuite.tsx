"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { CalendarClock, Wallet, TrendingUp, Sunset, Home, Target } from "lucide-react";
import { CALCS, compute, type CalcId } from "@/lib/calc";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { Donut } from "@/components/charts/Donut";
import { Button } from "@/components/ui/kit";
import { cn, inr } from "@/lib/utils";

const ICONS: Record<CalcId, typeof Wallet> = { sip: CalendarClock, lumpsum: Wallet, stepup: TrendingUp, swp: Sunset, emi: Home, goal: Target };
const fmt = (v: number, k: "inr" | "pct" | "yr") => (k === "inr" ? inr(v) : k === "pct" ? `${Math.round(v * 10) / 10}%` : `${v} ${v === 1 ? "yr" : "yrs"}`);

function Count({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const t = useTransform(mv, (v) => inr(v));
  useEffect(() => { const c = animate(mv, value, { duration: 0.45, ease: "easeOut" }); return () => c.stop(); }, [value, mv]);
  return <motion.span>{t}</motion.span>;
}

const initial = () => Object.fromEntries(CALCS.map((c) => [c.id, Object.fromEntries(c.sliders.map((s) => [s.key, s.def]))])) as Record<CalcId, Record<string, number>>;

export function CalculatorSuite() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("c") as CalcId | null;
  const valid = (id: string | null): id is CalcId => !!id && CALCS.some((c) => c.id === id);
  const [active, setActive] = useState<CalcId>(valid(q) ? q : "sip");
  const [values, setValues] = useState(initial);
  useEffect(() => { if (valid(q)) setActive(q); }, [q]);

  const calc = CALCS.find((c) => c.id === active)!;
  const v = values[active];
  const r = useMemo(() => compute(active, v), [active, v]);

  const pick = (id: CalcId) => { setActive(id); router.replace(`/calculators?c=${id}`, { scroll: false }); };
  const setVal = (k: string, n: number) => setValues((p) => ({ ...p, [active]: { ...p[active], [k]: n } }));

  return (
    <div className="flex flex-col gap-6">
      <div role="tablist" aria-label="Calculators" className="flex gap-2 overflow-x-auto rounded-2xl border border-line bg-white p-2 shadow-card">
        {CALCS.map((c) => {
          const I = ICONS[c.id];
          return (
            <button key={c.id} role="tab" id={`tab-${c.id}`} aria-selected={active === c.id} aria-controls="calc-panel" onClick={() => pick(c.id)}
              className={cn("relative flex min-h-12 shrink-0 items-center gap-2 rounded-xl px-4 text-[15px] font-bold transition-colors", active === c.id ? "text-white" : "text-body hover:text-ink")}>
              {active === c.id && <motion.span layoutId="calc-tab" className="absolute inset-0 rounded-xl bg-brand" transition={{ type: "spring", bounce: 0.15, duration: 0.4 }} />}
              <I className="relative size-[18px]" /><span className="relative">{c.name}</span>
            </button>
          );
        })}
      </div>

      <div id="calc-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col rounded-[28px] border border-line bg-white p-6 shadow-card sm:p-8">
          <h2 className="text-2xl font-extrabold text-ink">{calc.title}</h2>
          <p className="mt-1 text-[15px] text-body">{calc.summary}</p>
          <div className="mt-6 flex flex-col gap-7">
            {calc.sliders.map((s) => {
              const id = `in-${active}-${s.key}`;
              const fill = ((v[s.key] - s.min) / (s.max - s.min)) * 100;
              return (
                <div key={id} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <label htmlFor={id} className="text-[15px] font-semibold text-ink">{s.label}</label>
                    <output htmlFor={id} className="rounded-lg bg-mint px-3 py-1 text-[15px] font-bold text-brand tnum">{fmt(v[s.key], s.kind)}</output>
                  </div>
                  <input id={id} type="range" min={s.min} max={s.max} step={s.step} value={v[s.key]} onChange={(e) => setVal(s.key, parseFloat(e.target.value))}
                    className="range" style={{ ["--fill" as string]: `${fill}%` }} />
                  <div className="flex justify-between text-xs font-medium text-body tnum" aria-hidden><span>{fmt(s.min, s.kind)}</span><span>{fmt(s.max, s.kind)}</span></div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 rounded-2xl bg-soft p-5">
            <Donut a={r.split.a} b={r.split.b} la={r.split.la} lb={r.split.lb} size={120} />
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-[28px] border border-line bg-white p-6 shadow-card sm:p-8">
          <div className="rounded-2xl bg-[linear-gradient(145deg,#eaf6f0_0%,#f8fbf9_60%,#fbf6ea_100%)] p-6 text-ink ring-1 ring-line">
            <p className="text-[15px] text-body">{r.headLabel}</p>
            <p className="mt-1 text-[38px] font-extrabold leading-none text-brand-dark tnum sm:text-[46px]" aria-live="polite"><Count value={r.head} /></p>
          </div>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {r.rows.map((row) => (
              <div key={row.label} className="rounded-2xl bg-soft p-4">
                <dt className="text-[13px] font-medium text-body">{row.label}</dt>
                <dd className="mt-1 text-lg font-extrabold text-ink tnum">{inr(row.value)}</dd>
              </div>
            ))}
          </dl>
          <GrowthChart series={r.series} primaryLabel={r.primaryLabel} baseLabel={r.baseLabel} height={230} />
          <div className="mt-auto flex flex-col gap-3 border-t border-line pt-5">
            <Button href="/contact" className="w-full">{active === "emi" ? "Talk to us about this loan" : "Start investing for this goal"}</Button>
            <p className="text-xs leading-relaxed text-body">
              Illustration only.{" "}
              {active === "emi" ? "Actual EMI depends on your lender’s terms." : "Return capped at 13% a year. Past performance may or may not be sustained in the future and is not a guarantee of future returns."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
