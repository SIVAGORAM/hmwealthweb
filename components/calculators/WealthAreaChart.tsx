"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatCurrency, formatCurrencyExact, type TrajectoryPoint } from "@/lib/finance-math";
import { Calendar, DollarSign, TrendingUp, Sparkles, ShoppingBag } from "lucide-react";

interface WealthAreaChartProps {
  data: TrajectoryPoint[];
  showInflation?: boolean;
  inflationRate?: number;
  capitalLabel?: string;
  wealthLabel?: string;
  isEMI?: boolean;
  isSWP?: boolean;
  height?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
    payload: TrajectoryPoint;
  }>;
  label?: number;
  showInflation?: boolean;
  inflationRate?: number;
  isEMI?: boolean;
  isSWP?: boolean;
}

function CustomTooltip({ active, payload, label, showInflation, inflationRate = 6, isEMI = false, isSWP = false }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const point = payload[0].payload;
  const year = label ?? point.year;

  return (
    <div className="min-w-[240px] rounded-2xl border border-line/80 bg-white/95 p-4 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-line pb-2.5">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-body">
          <Calendar className="size-3.5 text-brand" />
          Year {year}
        </span>
        <span className="rounded-md bg-mint px-2 py-0.5 text-[11px] font-bold text-brand">
          {year === 0 ? "Starting" : `${year} ${year === 1 ? "Year" : "Years"}`}
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-2 text-xs">
        {/* Invested Capital / Principal Repaid / Total Withdrawn */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-body">
            <span className="size-2 rounded-full bg-slate-700" />
            {isEMI ? "Principal Repaid:" : isSWP ? "Total Withdrawn:" : "Invested Capital:"}
          </span>
          <span className="font-bold text-ink tnum">
            {formatCurrencyExact(point.investedCapital)}
          </span>
        </div>

        {/* Wealth Gain / Interest Paid */}
        {!isSWP && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-body">
              <span className="size-2 rounded-full bg-emerald-500" />
              {isEMI ? "Cumulative Interest:" : "Estimated Gain:"}
            </span>
            <span className="font-bold text-brand tnum">
              {isEMI ? formatCurrencyExact(point.wealthGain) : `+${formatCurrencyExact(point.wealthGain)}`}
            </span>
          </div>
        )}

        {/* Total Portfolio Value / Outstanding Balance */}
        <div className="flex items-center justify-between border-t border-line/60 pt-2 font-bold">
          <span className="flex items-center gap-1.5 text-ink">
            <Sparkles className="size-3.5 text-amber-500" />
            {isEMI ? "Outstanding Balance:" : isSWP ? "Remaining Portfolio:" : "Total Value:"}
          </span>
          <span className="text-[14px] text-ink tnum">
            {formatCurrencyExact(point.totalValue)}
          </span>
        </div>

        {/* Real Purchasing Power (if inflation toggle is enabled) */}
        {showInflation && point.realPurchasingPower !== undefined && (
          <div className="flex items-center justify-between rounded-lg bg-soft p-1.5 text-[11px]">
            <span className="flex items-center gap-1 text-body">
              <ShoppingBag className="size-3 text-peach-ink" />
              Real Value ({inflationRate}% Inflation):
            </span>
            <span className="font-bold text-peach-ink tnum">
              {formatCurrencyExact(point.realPurchasingPower)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function WealthAreaChart({
  data,
  showInflation = false,
  inflationRate = 6,
  capitalLabel = "Your Total Capital Invested",
  wealthLabel = "Accumulated Wealth & Returns",
  isEMI = false,
  isSWP = false,
  height = 320,
}: WealthAreaChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="flex w-full items-center justify-center rounded-2xl bg-soft/60"
        style={{ height }}
      >
        <div className="flex items-center gap-2 text-sm text-body/60">
          <div className="size-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          Loading growth curve...
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 12, right: 12, left: -10, bottom: 0 }}
          >
            <defs>
              {/* Bottom Layer: Deep Navy/Slate fill for Capital Invested */}
              <linearGradient id="capitalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e293b" stopOpacity={0.85} />
                <stop offset="95%" stopColor="#0f172a" stopOpacity={0.45} />
              </linearGradient>

              {/* Top Layer: Glowing Emerald/Gold fill for Wealth & Returns */}
              <linearGradient id="wealthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                <stop offset="60%" stopColor="#0b7a55" stopOpacity={0.65} />
                <stop offset="95%" stopColor="#053b2a" stopOpacity={0.2} />
              </linearGradient>

              {/* Real Purchasing Power dashed fill */}
              <linearGradient id="realGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
              opacity={0.6}
            />

            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(y) => (y === 0 ? "Yr 0" : `Yr ${y}`)}
            />

            <YAxis
              width={62}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 10.5 }}
              tickFormatter={(v) => formatCurrency(v)}
              domain={[0, "auto"]}
            />

            <Tooltip
              content={<CustomTooltip showInflation={showInflation} inflationRate={inflationRate} isEMI={isEMI} isSWP={isSWP} />}
              cursor={{ stroke: "#0b7a55", strokeWidth: 1.5, strokeDasharray: "4 4" }}
            />

            {/* Layer 2: Accumulated Wealth & Returns (Top Layer) */}
            <Area
              type="monotone"
              dataKey="totalValue"
              name={wealthLabel}
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#wealthGradient)"
              activeDot={{ r: 6, fill: "#10b981", stroke: "#ffffff", strokeWidth: 2 }}
            />

            {/* Layer 1: Total Capital Invested (Base Layer) */}
            <Area
              type="monotone"
              dataKey="investedCapital"
              name={capitalLabel}
              stroke="#334155"
              strokeWidth={2}
              fill="url(#capitalGradient)"
              activeDot={{ r: 5, fill: "#334155", stroke: "#ffffff", strokeWidth: 2 }}
            />

            {/* Inflation-adjusted Line (optional toggle) */}
            {showInflation && (
              <Area
                type="monotone"
                dataKey="realPurchasingPower"
                name="Real Purchasing Power (Today's Value)"
                stroke="#d97706"
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="url(#realGradient)"
                activeDot={{ r: 5, fill: "#d97706", stroke: "#ffffff", strokeWidth: 2 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-body">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-slate-700" />
          <span>{capitalLabel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" />
          <span>{wealthLabel}</span>
        </div>
        {showInflation && (
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full border border-dashed border-amber-600 bg-amber-500/20" />
            <span className="text-amber-700">Real Purchasing Power (Adjusted for {inflationRate}% Inflation)</span>
          </div>
        )}
      </div>
    </div>
  );
}

