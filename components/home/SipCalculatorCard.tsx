"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import {
  ArrowRight,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Zap,
  Repeat,
  Wallet,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { calculateSIP, calculateLumpsum, formatCurrency, formatCurrencyExact } from "@/lib/finance-math";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type CalcMode = "sip" | "lumpsum";

const SIP_PRESETS = [2500, 5000, 10000, 25000];
const LUMP_PRESETS = [50000, 100000, 250000, 500000];

function AnimatedCurrency({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const [display, setDisplay] = useState(formatCurrency(value));

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(formatCurrency(Math.round(latest)));
      },
    });
    return () => controls.stop();
  }, [value, mv]);

  return <span>{display}</span>;
}

export function SipCalculatorCard() {
  const [mode, setMode] = useState<CalcMode>("sip");

  // SIP parameters
  const [sipAmount, setSipAmount] = useState<number>(10000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // Lump sum parameters
  const [lumpAmount, setLumpAmount] = useState<number>(100000);
  const [lumpRate, setLumpRate] = useState<number>(12);
  const [lumpYears, setLumpYears] = useState<number>(10);

  const isSIP = mode === "sip";
  const amount = isSIP ? sipAmount : lumpAmount;
  const setAmount = isSIP ? setSipAmount : setLumpAmount;
  const rate = isSIP ? sipRate : lumpRate;
  const setRate = isSIP ? setSipRate : setLumpRate;
  const years = isSIP ? sipYears : lumpYears;
  const setYears = isSIP ? setSipYears : setLumpYears;

  // Primary calculation
  const result = useMemo(() => {
    if (isSIP) {
      return calculateSIP(amount, rate, years);
    }
    const ls = calculateLumpsum(amount, rate, years);
    return {
      totalInvestment: ls.investedAmount,
      maturityValue: ls.maturityValue,
      estimatedReturns: ls.estimatedReturns,
    };
  }, [isSIP, amount, rate, years]);

  // Comparison with Bank Fixed Deposit (assumed 6.5% p.a. compounded)
  const fdResult = useMemo(() => {
    if (isSIP) {
      return calculateSIP(amount, 6.5, years);
    }
    const ls = calculateLumpsum(amount, 6.5, years);
    return {
      maturityValue: ls.maturityValue,
    };
  }, [isSIP, amount, years]);

  const wealthAdvantage = Math.max(0, result.maturityValue - fdResult.maturityValue);
  const multiplier =
    result.totalInvestment > 0
      ? (result.maturityValue / result.totalInvestment).toFixed(1)
      : "1.0";

  // Pre-filled WhatsApp message
  const whatsappUrl = `${site.whatsappHref}?text=${encodeURIComponent(
    `Hi HM Wealth, I modeled a ${isSIP ? "Monthly SIP" : "Lump Sum"} of ${formatCurrency(
      amount
    )} for ${years} years (Projected: ${formatCurrency(
      result.maturityValue
    )}). I would like to review suitable mutual fund schemes.`
  )}`;

  // SVG Chart points
  const points = useMemo(() => {
    const pts: { year: number; value: number; capital: number }[] = [];
    for (let y = 0; y <= years; y++) {
      if (isSIP) {
        const r = calculateSIP(amount, rate, y);
        pts.push({ year: y, value: r.maturityValue, capital: r.totalInvestment });
      } else {
        const r = calculateLumpsum(amount, rate, y);
        pts.push({ year: y, value: r.maturityValue, capital: r.investedAmount });
      }
    }
    return pts;
  }, [isSIP, amount, rate, years]);

  const gid = useId().replace(/:/g, "");
  const W = 420;
  const H = 160;
  const P = 8;
  const maxVal = Math.max(...points.map((p) => p.value), 1);

  const getX = (i: number) => P + (i / Math.max(points.length - 1, 1)) * (W - P * 2);
  const getY = (v: number) => H - 6 - (v / maxVal) * (H - 24);

  const valuePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${getX(i).toFixed(1)} ${getY(p.value).toFixed(1)}`).join(" ");
  const valueArea = `${valuePath} L ${getX(points.length - 1).toFixed(1)} ${H} L ${getX(0).toFixed(1)} ${H} Z`;

  const capitalPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${getX(i).toFixed(1)} ${getY(p.capital).toFixed(1)}`).join(" ");
  const capitalArea = `${capitalPath} L ${getX(points.length - 1).toFixed(1)} ${H} L ${getX(0).toFixed(1)} ${H} Z`;

  const lastPoint = points[points.length - 1] || { value: 0, capital: 0 };

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-line bg-white shadow-[0_30px_70px_-25px_rgba(4,38,28,0.35)] ring-1 ring-black/5 transition-all">
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/80 bg-soft/50 px-4 py-3.5 sm:px-8 sm:py-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-mint text-brand shadow-xs">
            <Zap className="size-4" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-ink">
            Interactive Compounding Studio
          </span>
        </div>

        {/* Tab switcher: Monthly SIP vs Lump Sum */}
        <div className="flex w-full sm:w-auto rounded-xl bg-white p-1 ring-1 ring-line shadow-xs justify-center">
          <button
            type="button"
            onClick={() => setMode("sip")}
            className={cn(
              "flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition-all",
              mode === "sip"
                ? "bg-brand text-white shadow-xs"
                : "text-body hover:text-ink"
            )}
          >
            <CalendarClock className="size-3.5" />
            Monthly SIP
          </button>
          <button
            type="button"
            onClick={() => setMode("lumpsum")}
            className={cn(
              "flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition-all",
              mode === "lumpsum"
                ? "bg-brand text-white shadow-xs"
                : "text-body hover:text-ink"
            )}
          >
            <Wallet className="size-3.5" />
            One-Time Lump Sum
          </button>
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid lg:grid-cols-[1.1fr_1.3fr]">
        {/* Left Column: Input Sliders & Quick Chips */}
        <div className="flex flex-col gap-6 p-5 sm:p-8">
          {/* Quick Preset Buttons */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-body">
                Popular Amounts
              </span>
              <span className="text-[11px] font-semibold text-brand">
                {isSIP ? "Monthly" : "One-Time"}
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-2 xs:grid-cols-4 gap-2">
              {(isSIP ? SIP_PRESETS : LUMP_PRESETS).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className={cn(
                    "rounded-xl border py-2 text-center text-xs font-bold transition-all tnum",
                    amount === preset
                      ? "border-brand bg-brand text-white shadow-xs ring-2 ring-brand/15"
                      : "border-line bg-white text-ink hover:border-brand/40 hover:bg-mint"
                  )}
                >
                  {formatCurrency(preset)}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Slider */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="home-calc-amt" className="text-xs font-bold uppercase tracking-wider text-body">
                {isSIP ? "Monthly Investment" : "Lump Sum Deposit"}
              </label>
              <output htmlFor="home-calc-amt" className="shrink-0 whitespace-nowrap rounded-lg bg-mint px-2.5 py-0.5 text-[14px] font-extrabold text-brand tnum sm:text-[15px]">
                {formatCurrency(amount)}
              </output>
            </div>
            <input
              id="home-calc-amt"
              type="range"
              min={isSIP ? 500 : 10000}
              max={isSIP ? 100000 : 1000000}
              step={isSIP ? 500 : 10000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="range cursor-pointer"
              style={{
                ["--fill" as string]: `${
                  ((amount - (isSIP ? 500 : 10000)) / ((isSIP ? 100000 : 1000000) - (isSIP ? 500 : 10000))) * 100
                }%`,
              }}
            />
            <div className="flex justify-between text-[11px] font-medium text-body/60 tnum">
              <span>{formatCurrency(isSIP ? 500 : 10000)}</span>
              <span>{formatCurrency(isSIP ? 100000 : 1000000)}</span>
            </div>
          </div>

          {/* Rate Slider */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="home-calc-rate" className="text-xs font-bold uppercase tracking-wider text-body">
                Expected Annual Return
              </label>
              <output htmlFor="home-calc-rate" className="shrink-0 whitespace-nowrap rounded-lg bg-mint px-2.5 py-0.5 text-[14px] font-extrabold text-brand tnum sm:text-[15px]">
                {rate}% p.a.
              </output>
            </div>
            <input
              id="home-calc-rate"
              type="range"
              min={1}
              max={20}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="range cursor-pointer"
              style={{
                ["--fill" as string]: `${((rate - 1) / 19) * 100}%`,
              }}
            />
            <div className="flex justify-between text-[11px] font-medium text-body/60 tnum">
              <span>1% (Conservative)</span>
              <span>12-14% (Equity Historical)</span>
              <span>20%</span>
            </div>
          </div>

          {/* Years Slider */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="home-calc-yrs" className="text-xs font-bold uppercase tracking-wider text-body">
                Investment Horizon
              </label>
              <output htmlFor="home-calc-yrs" className="shrink-0 whitespace-nowrap rounded-lg bg-mint px-2.5 py-0.5 text-[14px] font-extrabold text-brand tnum sm:text-[15px]">
                {years} {years === 1 ? "Year" : "Years"}
              </output>
            </div>
            <input
              id="home-calc-yrs"
              type="range"
              min={1}
              max={35}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="range cursor-pointer"
              style={{
                ["--fill" as string]: `${((years - 1) / 34) * 100}%`,
              }}
            />
            <div className="flex justify-between text-[11px] font-medium text-body/60 tnum">
              <span>1 Year</span>
              <span>10 Years</span>
              <span>35 Years</span>
            </div>
          </div>

          <div className="mt-auto border-t border-line/60 pt-4">
            <Link
              href="/calculators"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:text-brand-dark"
            >
              Open Full HM Wealth Studio (10 Advanced Models)
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: High-End Obsidian Wealth Dashboard */}
        <div className="relative isolate flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#021f15] via-[#053b2a] to-[#04261c] p-5 sm:p-8 text-white">
          {/* Ambient radial lighting */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 -z-10 size-72 rounded-full bg-[#19c38a]/25 blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-12 -z-10 size-64 rounded-full bg-gold/15 blur-[90px]"
          />

          <div>
            {/* Top Badge & Live Advantage */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300/80">
                Projected Wealth in {years} {years === 1 ? "Year" : "Years"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#19c38a]/15 px-2.5 py-0.5 text-[11px] font-extrabold text-[#7ff0c4] ring-1 ring-[#19c38a]/30">
                <Sparkles className="size-3 text-gold" />
                {multiplier}x Wealth Multiplier
              </span>
            </div>

            {/* Headline Animated Value */}
            <div className="mt-2 text-[38px] font-extrabold leading-none tracking-tight text-white sm:text-[46px] tnum">
              <AnimatedCurrency value={result.maturityValue} />
            </div>
            <p className="mt-1 text-xs text-white/60 tnum">
              Exact: {formatCurrencyExact(result.maturityValue)}
            </p>

            {/* Comparison Pill vs Bank FD */}
            {wealthAdvantage > 0 && (
              <div className="mt-3.5 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2 text-xs backdrop-blur-xs border border-white/10">
                <span className="flex items-center gap-1.5 text-white/80 font-medium">
                  <TrendingUp className="size-3.5 text-gold" />
                  Wealth Advantage vs Bank FD (6.5%):
                </span>
                <span className="font-extrabold text-gold tnum">
                  +{formatCurrency(wealthAdvantage)}
                </span>
              </div>
            )}

            {/* Glowing SVG Compounding Chart */}
            <div className="mt-4">
              <svg viewBox={`0 0 ${W} ${H}`} className="h-32 w-full overflow-visible" aria-hidden>
                <defs>
                  <linearGradient id={`gradVal${gid}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#19c38a" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#19c38a" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id={`gradCap${gid}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                {[0.25, 0.5, 0.75].map((f) => (
                  <line
                    key={f}
                    x1={P}
                    x2={W - P}
                    y1={H * f}
                    y2={H * f}
                    stroke="white"
                    strokeOpacity="0.08"
                    strokeDasharray="3 4"
                  />
                ))}

                {/* Capital Area & Line */}
                <path d={capitalArea} fill={`url(#gradCap${gid})`} />
                <path
                  d={capitalPath}
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Value Area & Line */}
                <path d={valueArea} fill={`url(#gradVal${gid})`} />
                <path
                  d={valuePath}
                  fill="none"
                  stroke="#19c38a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Glowing endpoint marker */}
                <circle
                  cx={getX(points.length - 1)}
                  cy={getY(lastPoint.value)}
                  r="7"
                  fill="#f2d27a"
                  fillOpacity="0.3"
                  className="animate-ping"
                />
                <circle
                  cx={getX(points.length - 1)}
                  cy={getY(lastPoint.value)}
                  r="4.5"
                  fill="#f2d27a"
                  stroke="#04261c"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Breakdown Cards */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-white/10 p-3 backdrop-blur-xs">
                <span className="flex items-center gap-1.5 text-white/70">
                  <span className="size-2 rounded-full bg-white/60" />
                  Your Capital
                </span>
                <p className="mt-1 text-[16px] font-extrabold text-white tnum">
                  {formatCurrency(result.totalInvestment)}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-3 backdrop-blur-xs">
                <span className="flex items-center gap-1.5 text-white/70">
                  <span className="size-2 rounded-full bg-[#19c38a]" />
                  Estimated Gains
                </span>
                <p className="mt-1 text-[16px] font-extrabold text-[#7ff0c4] tnum">
                  +{formatCurrency(result.estimatedReturns)}
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/contact"
              className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 text-center text-[14px] font-extrabold text-[#04261c] shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#e7f6ef]"
            >
              Start This Plan
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold text-white backdrop-blur-xs transition hover:bg-white/20"
            >
              <MessageCircle className="size-4 text-emerald-400" />
              WhatsApp Specialist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
