// Calculator maths. All growth uses monthly compounding at the assumed annual rate.
// Illustrative returns are capped at 13% p.a. in the UI, in line with AMFI guidance on illustrations.

export type CalcId = "sip" | "lumpsum" | "stepup" | "swp" | "emi" | "goal";

export type SliderDef = { key: string; label: string; min: number; max: number; step: number; def: number; kind: "inr" | "pct" | "yr" };

export type CalcDef = { id: CalcId; name: string; title: string; summary: string; sliders: SliderDef[] };

export const CALCS: CalcDef[] = [
  { id: "sip", name: "SIP", title: "SIP calculator", summary: "What a fixed monthly investment could grow to.",
    sliders: [
      { key: "amount", label: "Monthly investment", min: 500, max: 100000, step: 500, def: 10000, kind: "inr" },
      { key: "rate", label: "Expected return a year", min: 1, max: 13, step: 0.5, def: 12, kind: "pct" },
      { key: "years", label: "Time period", min: 1, max: 40, step: 1, def: 15, kind: "yr" },
    ] },
  { id: "lumpsum", name: "Lumpsum", title: "Lumpsum calculator", summary: "How a one-time investment could grow.",
    sliders: [
      { key: "amount", label: "One-time investment", min: 10000, max: 10000000, step: 10000, def: 500000, kind: "inr" },
      { key: "rate", label: "Expected return a year", min: 1, max: 13, step: 0.5, def: 12, kind: "pct" },
      { key: "years", label: "Time period", min: 1, max: 40, step: 1, def: 10, kind: "yr" },
    ] },
  { id: "stepup", name: "Step-up SIP", title: "Step-up SIP calculator", summary: "The effect of raising your SIP a little every year.",
    sliders: [
      { key: "amount", label: "Starting monthly SIP", min: 500, max: 100000, step: 500, def: 10000, kind: "inr" },
      { key: "step", label: "Yearly increase", min: 0, max: 25, step: 1, def: 10, kind: "pct" },
      { key: "rate", label: "Expected return a year", min: 1, max: 13, step: 0.5, def: 12, kind: "pct" },
      { key: "years", label: "Time period", min: 1, max: 40, step: 1, def: 15, kind: "yr" },
    ] },
  { id: "swp", name: "SWP", title: "SWP calculator", summary: "A regular monthly income drawn from your investment.",
    sliders: [
      { key: "amount", label: "Total investment", min: 100000, max: 50000000, step: 100000, def: 5000000, kind: "inr" },
      { key: "withdraw", label: "Monthly withdrawal", min: 1000, max: 500000, step: 1000, def: 30000, kind: "inr" },
      { key: "rate", label: "Expected return a year", min: 1, max: 13, step: 0.5, def: 8, kind: "pct" },
      { key: "years", label: "Time period", min: 1, max: 30, step: 1, def: 15, kind: "yr" },
    ] },
  { id: "emi", name: "Loan EMI", title: "Loan EMI calculator", summary: "The monthly EMI for a home, car or personal loan.",
    sliders: [
      { key: "amount", label: "Loan amount", min: 100000, max: 50000000, step: 100000, def: 3000000, kind: "inr" },
      { key: "rate", label: "Interest rate a year", min: 5, max: 20, step: 0.1, def: 8.5, kind: "pct" },
      { key: "years", label: "Loan tenure", min: 1, max: 30, step: 1, def: 20, kind: "yr" },
    ] },
  { id: "goal", name: "Goal SIP", title: "Goal SIP calculator", summary: "The monthly SIP needed to reach a future amount.",
    sliders: [
      { key: "amount", label: "Goal amount", min: 100000, max: 100000000, step: 100000, def: 2500000, kind: "inr" },
      { key: "rate", label: "Expected return a year", min: 1, max: 13, step: 0.5, def: 12, kind: "pct" },
      { key: "years", label: "Years to goal", min: 1, max: 40, step: 1, def: 12, kind: "yr" },
    ] },
];

export type Result = {
  headLabel: string;
  head: number;
  rows: { label: string; value: number }[];
  split: { a: number; b: number; la: string; lb: string };
  /** yearly series for the chart: primary line and optional baseline */
  series: { year: number; primary: number; base?: number }[];
  primaryLabel: string;
  baseLabel?: string;
};

export function sipFutureValue(monthly: number, ratePct: number, years: number) {
  const i = ratePct / 1200, n = Math.round(years * 12);
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

export function compute(id: CalcId, v: Record<string, number>): Result {
  const i = v.rate / 1200;
  const years = Math.round(v.years);
  const n = years * 12;

  if (id === "sip" || id === "stepup") {
    let bal = 0, inv = 0, amt = v.amount;
    const series = [{ year: 0, primary: 0, base: 0 }];
    for (let m = 0; m < n; m++) {
      if (id === "stepup" && m > 0 && m % 12 === 0) amt *= 1 + v.step / 100;
      bal = (bal + amt) * (1 + i);
      inv += amt;
      if ((m + 1) % 12 === 0) series.push({ year: (m + 1) / 12, primary: bal, base: inv });
    }
    return { headLabel: `Estimated value after ${years} ${years === 1 ? "year" : "years"}`, head: bal,
      rows: [{ label: "Amount invested", value: inv }, { label: "Estimated gains", value: bal - inv }, { label: "Estimated value", value: bal }],
      split: { a: inv, b: bal - inv, la: "Invested", lb: "Gains" }, series, primaryLabel: "Value", baseLabel: "Invested" };
  }
  if (id === "lumpsum") {
    const series = Array.from({ length: years + 1 }, (_, y) => ({ year: y, primary: v.amount * Math.pow(1 + v.rate / 100, y), base: v.amount }));
    const fv = series[years].primary;
    return { headLabel: `Estimated value after ${years} ${years === 1 ? "year" : "years"}`, head: fv,
      rows: [{ label: "Amount invested", value: v.amount }, { label: "Estimated gains", value: fv - v.amount }, { label: "Estimated value", value: fv }],
      split: { a: v.amount, b: fv - v.amount, la: "Invested", lb: "Gains" }, series, primaryLabel: "Value", baseLabel: "Invested" };
  }
  if (id === "swp") {
    let bal = v.amount, wd = 0;
    const series = [{ year: 0, primary: bal, base: 0 }];
    for (let m = 0; m < n; m++) {
      const w = Math.min(v.withdraw, Math.max(bal, 0));
      bal -= w; wd += w; bal = Math.max(bal, 0) * (1 + i);
      if ((m + 1) % 12 === 0) series.push({ year: (m + 1) / 12, primary: bal, base: wd });
    }
    return { headLabel: `Value left after ${years} ${years === 1 ? "year" : "years"}`, head: bal,
      rows: [{ label: "Total investment", value: v.amount }, { label: "Total withdrawn", value: wd }, { label: "Value left", value: bal }],
      split: { a: wd, b: bal, la: "Withdrawn", lb: "Left" }, series, primaryLabel: "Value left", baseLabel: "Withdrawn" };
  }
  if (id === "emi") {
    const p = Math.pow(1 + i, n);
    const emi = (v.amount * i * p) / (p - 1);
    const total = emi * n;
    let out = v.amount;
    const series = [{ year: 0, primary: out }];
    for (let m = 0; m < n; m++) {
      out = out * (1 + i) - emi;
      if ((m + 1) % 12 === 0) series.push({ year: (m + 1) / 12, primary: Math.max(out, 0) });
    }
    return { headLabel: "Monthly EMI", head: emi,
      rows: [{ label: "Loan amount", value: v.amount }, { label: "Total interest", value: total - v.amount }, { label: "Total payment", value: total }],
      split: { a: v.amount, b: total - v.amount, la: "Principal", lb: "Interest" }, series, primaryLabel: "Loan outstanding" };
  }
  // goal
  const sip = (v.amount * i) / ((Math.pow(1 + i, n) - 1) * (1 + i));
  const inv = sip * n;
  const series = Array.from({ length: years + 1 }, (_, y) => ({ year: y, primary: sipFutureValue(sip, v.rate, y), base: sip * y * 12 }));
  return { headLabel: "Monthly SIP needed", head: sip,
    rows: [{ label: "Goal amount", value: v.amount }, { label: "Amount invested", value: inv }, { label: "Estimated gains", value: v.amount - inv }],
    split: { a: inv, b: v.amount - inv, la: "Invested", lb: "Gains" }, series, primaryLabel: "Value", baseLabel: "Invested" };
}
