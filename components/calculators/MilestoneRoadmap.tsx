"use client";

import { Flag, Trophy, TrendingUp, CheckCircle, ShieldCheck, Sparkles } from "lucide-react";
import { formatCurrency, formatCurrencyExact, type TrajectoryPoint } from "@/lib/finance-math";
import { cn } from "@/lib/utils";

interface MilestoneRoadmapProps {
  totalYears: number;
  trajectory: TrajectoryPoint[];
  showInflation?: boolean;
  className?: string;
}

export function MilestoneRoadmap({
  totalYears,
  trajectory,
  showInflation = false,
  className,
}: MilestoneRoadmapProps) {
  if (!trajectory || trajectory.length === 0) return null;

  // Determine 3 logical checkpoints:
  // Checkpoint 1: 5 Years (or Math.max(1, Math.round(totalYears / 3)) if totalYears <= 5)
  // Checkpoint 2: 10 Years (or Math.round(totalYears * 2 / 3))
  // Checkpoint 3: Maturity (totalYears)
  let y1 = 5;
  let y2 = 10;
  const y3 = totalYears;

  if (totalYears <= 5) {
    y1 = 1;
    y2 = Math.max(2, Math.round(totalYears / 2));
  } else if (totalYears <= 10) {
    y1 = Math.round(totalYears / 3);
    y2 = Math.round((totalYears * 2) / 3);
  } else {
    // If totalYears > 10, keep 5 and 10 or scale if tenure is very large
    if (y1 >= y3) y1 = Math.round(y3 / 3);
    if (y2 >= y3) y2 = Math.round((y3 * 2) / 3);
  }

  const p1 = trajectory.find((p) => p.year === y1) || trajectory[Math.min(y1, trajectory.length - 1)];
  const p2 = trajectory.find((p) => p.year === y2) || trajectory[Math.min(y2, trajectory.length - 1)];
  const p3 = trajectory.find((p) => p.year === y3) || trajectory[trajectory.length - 1];

  const checkpoints = [
    {
      title: `Checkpoint 1 (${y1} ${y1 === 1 ? "Year" : "Years"})`,
      point: p1,
      badge: "Foundation Stage",
      icon: Flag,
      color: "border-sky/60 bg-sky/30 text-sky-ink",
    },
    {
      title: `Checkpoint 2 (${y2} Years)`,
      point: p2,
      badge: "Growth Acceleration",
      icon: TrendingUp,
      color: "border-mint bg-mint text-brand",
    },
    {
      title: `Maturity Goal (${y3} Years)`,
      point: p3,
      badge: "Financial Freedom",
      icon: Trophy,
      color: "border-amber-200 bg-amber-50 text-amber-800",
    },
  ];

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-body">
          <Sparkles className="size-3.5 text-brand" />
          Milestone Growth Roadmap
        </h4>
        <span className="text-[11px] font-semibold text-body/70">
          3-Phase Wealth Journey
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {checkpoints.map((cp, idx) => {
          const pt = cp.point;
          if (!pt) return null;

          const multiplier =
            pt.investedCapital > 0
              ? (pt.totalValue / pt.investedCapital).toFixed(1)
              : "1.0";

          return (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-2xl border border-line bg-white p-4 shadow-xs transition-transform hover:-translate-y-0.5 hover:shadow-card"
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold", cp.color)}>
                    <cp.icon className="size-2.5" />
                    {cp.badge}
                  </span>
                  <span className="text-[11px] font-extrabold text-body/75">
                    {cp.title}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-[20px] font-extrabold text-ink tnum">
                    {formatCurrency(pt.totalValue)}
                  </div>
                  <div className="text-[11px] text-body tnum">
                    Exact: {formatCurrencyExact(pt.totalValue)}
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-line/60 pt-2.5 text-[11px]">
                <div className="flex justify-between text-body">
                  <span>Capital:</span>
                  <span className="font-semibold text-ink tnum">
                    {formatCurrency(pt.investedCapital)}
                  </span>
                </div>
                <div className="flex justify-between text-brand">
                  <span>Wealth Gain:</span>
                  <span className="font-bold tnum">
                    +{formatCurrency(pt.wealthGain)}
                  </span>
                </div>
                {showInflation && pt.realPurchasingPower !== undefined && (
                  <div className="mt-1 flex justify-between text-amber-700">
                    <span>Purchasing Power:</span>
                    <span className="font-bold tnum">
                      {formatCurrency(pt.realPurchasingPower)}
                    </span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between rounded-md bg-soft px-2 py-1 text-[10px] font-bold text-ink">
                  <span>Multiplier:</span>
                  <span className="text-brand">{multiplier}x Capital</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

