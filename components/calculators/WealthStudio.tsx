"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  Target,
  Repeat,
  CalendarClock,
  Wallet,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sunset,
  Home,
  GraduationCap,
  Award,
  Layers,
  Info,
  Clock,
  PiggyBank,
  Check,
  Zap,
  Table,
  Share2,
  Copy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  calculateSIP,
  calculateStepUpSIP,
  calculateLumpsum,
  calculateTargetSIP,
  calculateTargetLumpsum,
  calculateSWP,
  calculateEMI,
  calculateRetirement,
  formatCurrency,
  formatCurrencyExact,
  adjustForInflation,
  generateSIPTrajectory,
  generateStepUpTrajectory,
  generateLumpsumTrajectory,
  generateSWPTrajectory,
  generateEMITrajectory,
  type TrajectoryPoint,
} from "@/lib/finance-math";
import { DualControl } from "./DualControl";
import { WealthAreaChart } from "./WealthAreaChart";
import { MilestoneRoadmap } from "./MilestoneRoadmap";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type CategoryId = "accumulation" | "milestones" | "cashflow";

type AccumulationCalc = "sip" | "stepup" | "lumpsum" | "annual";
type MilestoneCalc = "target" | "retirement" | "education";
type CashflowCalc = "swp" | "targetLump" | "emi";

export function WealthStudio() {
  // Category State
  const [activeCategory, setActiveCategory] = useState<CategoryId>("accumulation");

  // Specific Calculator State inside each category
  const [activeAccum, setActiveAccum] = useState<AccumulationCalc>("sip");
  const [activeMilestone, setActiveMilestone] = useState<MilestoneCalc>("target");
  const [activeCashflow, setActiveCashflow] = useState<CashflowCalc>("swp");

  // Global Inflation Toggle
  const [showInflation, setShowInflation] = useState<boolean>(false);
  const inflationRate = 6; // 6% standard India inflation

  // Interactive View Toggles
  const [showGrowthTable, setShowGrowthTable] = useState<boolean>(false);
  const [copiedPlan, setCopiedPlan] = useState<boolean>(false);

  /* ==========================================================================
     Calculator Form Inputs
     ========================================================================== */

  // 1. SIP
  const [sipMonthly, setSipMonthly] = useState(10000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  // 2. Step-Up SIP
  const [stepUpMonthly, setStepUpMonthly] = useState(10000);
  const [stepUpPercent, setStepUpPercent] = useState(10);
  const [stepUpRate, setStepUpRate] = useState(12);
  const [stepUpYears, setStepUpYears] = useState(10);

  // 3. Lump Sum
  const [lumpAmount, setLumpAmount] = useState(100000);
  const [lumpRate, setLumpRate] = useState(12);
  const [lumpYears, setLumpYears] = useState(10);

  // 4. Annual SIP
  const [annualAmount, setAnnualAmount] = useState(120000);
  const [annualRate, setAnnualRate] = useState(12);
  const [annualYears, setAnnualYears] = useState(10);

  // 5. Target Goal SIP
  const [targetCorpus, setTargetCorpus] = useState(2500000);
  const [targetRate, setTargetRate] = useState(12);
  const [targetYears, setTargetYears] = useState(10);

  // 6. Retirement Planning
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentMonthlyExpense, setCurrentMonthlyExpense] = useState(50000);
  const [preRetirementReturn, setPreRetirementReturn] = useState(12);
  const [postRetirementReturn, setPostRetirementReturn] = useState(8);

  // 7. Child Higher Education
  const [childCurrentAge, setChildCurrentAge] = useState(5);
  const [collegeAge, setCollegeAge] = useState(18);
  const [currentEducationCost, setCurrentEducationCost] = useState(2500000);
  const [educationInflation, setEducationInflation] = useState(8);
  const [educationReturn, setEducationReturn] = useState(12);

  // 8. SWP
  const [swpPrincipal, setSwpPrincipal] = useState(5000000);
  const [swpWithdrawal, setSwpWithdrawal] = useState(35000);
  const [swpRate, setSwpRate] = useState(8);
  const [swpYears, setSwpYears] = useState(15);

  // 9. Target Lump Sum
  const [targetLumpCorpus, setTargetLumpCorpus] = useState(5000000);
  const [targetLumpRate, setTargetLumpRate] = useState(12);
  const [targetLumpYears, setTargetLumpYears] = useState(10);

  // 10. Loan EMI
  const [emiPrincipal, setEmiPrincipal] = useState(2500000);
  const [emiRate, setEmiRate] = useState(8.5);
  const [emiYears, setEmiYears] = useState(20);

  /* ==========================================================================
     Mathematical Computations & Trajectory Data
     ========================================================================== */

  // Active calculator identifier for dynamic rendering
  const activeCalcKey =
    activeCategory === "accumulation"
      ? activeAccum
      : activeCategory === "milestones"
      ? activeMilestone
      : activeCashflow;

  const currentResult = useMemo(() => {
    switch (activeCalcKey) {
      case "sip": {
        const res = calculateSIP(sipMonthly, sipRate, sipYears);
        const trajectory = generateSIPTrajectory(sipMonthly, sipRate, sipYears, inflationRate);
        const realValue = adjustForInflation(res.maturityValue, inflationRate, sipYears);
        return {
          headline: "Projected Wealth Corpus",
          primaryValue: res.maturityValue,
          primaryLabel: `Maturity Value after ${sipYears} ${sipYears === 1 ? "Year" : "Years"}`,
          investedCapital: res.totalInvestment,
          wealthGain: res.estimatedReturns,
          realValue,
          trajectory,
          years: sipYears,
          multiplier: res.totalInvestment > 0 ? (res.maturityValue / res.totalInvestment).toFixed(2) : "1.0",
        };
      }
      case "stepup": {
        const res = calculateStepUpSIP(stepUpMonthly, stepUpPercent, stepUpRate, stepUpYears);
        const trajectory = generateStepUpTrajectory(stepUpMonthly, stepUpPercent, stepUpRate, stepUpYears, inflationRate);
        const realValue = adjustForInflation(res.maturityValue, inflationRate, stepUpYears);
        return {
          headline: "Projected Wealth with Step-Up",
          primaryValue: res.maturityValue,
          primaryLabel: `Value after ${stepUpYears} Years with ${stepUpPercent}% Annual Hike`,
          investedCapital: res.totalInvestment,
          wealthGain: res.estimatedReturns,
          realValue,
          trajectory,
          years: stepUpYears,
          finalMonthly: res.finalMonthlySIP,
          multiplier: res.totalInvestment > 0 ? (res.maturityValue / res.totalInvestment).toFixed(2) : "1.0",
        };
      }
      case "lumpsum": {
        const res = calculateLumpsum(lumpAmount, lumpRate, lumpYears);
        const trajectory = generateLumpsumTrajectory(lumpAmount, lumpRate, lumpYears, inflationRate);
        const realValue = adjustForInflation(res.maturityValue, inflationRate, lumpYears);
        return {
          headline: "Compound Growth Value",
          primaryValue: res.maturityValue,
          primaryLabel: `One-Time Investment Growth over ${lumpYears} Years`,
          investedCapital: res.investedAmount,
          wealthGain: res.estimatedReturns,
          realValue,
          trajectory,
          years: lumpYears,
          multiplier: res.investedAmount > 0 ? (res.maturityValue / res.investedAmount).toFixed(2) : "1.0",
        };
      }
      case "annual": {
        // Annual SIP compounding
        const monthlyEquivalent = annualAmount / 12;
        const res = calculateSIP(monthlyEquivalent, annualRate, annualYears);
        const trajectory = generateSIPTrajectory(monthlyEquivalent, annualRate, annualYears, inflationRate);
        const realValue = adjustForInflation(res.maturityValue, inflationRate, annualYears);
        return {
          headline: "Projected Annual SIP Wealth",
          primaryValue: res.maturityValue,
          primaryLabel: `Value from ${formatCurrency(annualAmount)}/year over ${annualYears} Years`,
          investedCapital: annualAmount * annualYears,
          wealthGain: Math.max(0, res.maturityValue - annualAmount * annualYears),
          realValue,
          trajectory,
          years: annualYears,
          multiplier: (res.maturityValue / (annualAmount * annualYears)).toFixed(2),
        };
      }
      case "target": {
        const res = calculateTargetSIP(targetCorpus, targetRate, targetYears);
        const trajectory = generateSIPTrajectory(res.requiredMonthlySIP, targetRate, targetYears, inflationRate);
        return {
          headline: "Required Monthly SIP",
          primaryValue: res.requiredMonthlySIP,
          primaryLabel: `Monthly SIP to Reach ${formatCurrency(targetCorpus)} in ${targetYears} Years`,
          isMonthlyTarget: true,
          targetCorpus: res.targetCorpus,
          investedCapital: res.totalInvestment,
          wealthGain: res.estimatedReturns,
          trajectory,
          years: targetYears,
          multiplier: res.totalInvestment > 0 ? (res.targetCorpus / res.totalInvestment).toFixed(2) : "1.0",
        };
      }
      case "retirement": {
        const res = calculateRetirement({
          currentAge,
          retirementAge,
          lifeExpectancy,
          currentMonthlyExpense,
          inflationPercent: inflationRate,
          preRetirementReturn,
          postRetirementReturn,
        });
        const trajectory = generateSIPTrajectory(res.requiredMonthlySIP, preRetirementReturn, res.yearsToRetire, inflationRate);
        return {
          headline: "Target Retirement Corpus",
          primaryValue: res.requiredCorpus,
          primaryLabel: `Corpus Needed at Age ${retirementAge} to Sustain Till Age ${lifeExpectancy}`,
          requiredMonthlySIP: res.requiredMonthlySIP,
          monthlyExpenseAtRetirement: res.monthlyExpenseAtRetirement,
          investedCapital: res.totalInvestmentNeeded,
          wealthGain: res.estimatedReturns,
          trajectory,
          years: res.yearsToRetire,
          isRetirement: true,
          multiplier: res.totalInvestmentNeeded > 0 ? (res.requiredCorpus / res.totalInvestmentNeeded).toFixed(2) : "1.0",
        };
      }
      case "education": {
        const yearsToCollege = Math.max(1, collegeAge - childCurrentAge);
        const inflatedCost = Math.round(
          currentEducationCost * Math.pow(1 + educationInflation / 100, yearsToCollege)
        );
        const sipNeeded = calculateTargetSIP(inflatedCost, educationReturn, yearsToCollege);
        const trajectory = generateSIPTrajectory(sipNeeded.requiredMonthlySIP, educationReturn, yearsToCollege, educationInflation);
        return {
          headline: "Target Higher Education Fund",
          primaryValue: inflatedCost,
          primaryLabel: `College Cost in ${yearsToCollege} Years (at ${educationInflation}% education inflation)`,
          requiredMonthlySIP: sipNeeded.requiredMonthlySIP,
          currentCost: currentEducationCost,
          investedCapital: sipNeeded.totalInvestment,
          wealthGain: sipNeeded.estimatedReturns,
          trajectory,
          years: yearsToCollege,
          isEducation: true,
          multiplier: sipNeeded.totalInvestment > 0 ? (inflatedCost / sipNeeded.totalInvestment).toFixed(2) : "1.0",
        };
      }
      case "swp": {
        const res = calculateSWP(swpPrincipal, swpWithdrawal, swpRate, swpYears);
        const trajectory = generateSWPTrajectory(swpPrincipal, swpWithdrawal, swpRate, swpYears);
        return {
          headline: "Remaining Portfolio Balance",
          primaryValue: res.finalBalance,
          primaryLabel: `Balance After ${swpYears} Years of Regular Withdrawals`,
          investedCapital: res.initialInvestment,
          totalWithdrawn: res.totalWithdrawn,
          isExhausted: res.isExhausted,
          exhaustedMonth: res.exhaustedMonth,
          exhaustedYear: res.exhaustedYear,
          trajectory,
          years: swpYears,
          isSWP: true,
        };
      }
      case "targetLump": {
        const res = calculateTargetLumpsum(targetLumpCorpus, targetLumpRate, targetLumpYears);
        const trajectory = generateLumpsumTrajectory(res.requiredLumpSum, targetLumpRate, targetLumpYears, inflationRate);
        return {
          headline: "Required One-Time Investment",
          primaryValue: res.requiredLumpSum,
          primaryLabel: `Invest Today to Reach ${formatCurrency(targetLumpCorpus)} in ${targetLumpYears} Years`,
          targetCorpus: res.targetCorpus,
          investedCapital: res.requiredLumpSum,
          wealthGain: res.estimatedReturns,
          trajectory,
          years: targetLumpYears,
          isTargetLump: true,
        };
      }
      case "emi": {
        const res = calculateEMI(emiPrincipal, emiRate, emiYears);
        const trajectory = generateEMITrajectory(emiPrincipal, emiRate, emiYears);
        return {
          headline: "Monthly Loan EMI",
          primaryValue: res.monthlyEMI,
          primaryLabel: `Monthly Installment for ${formatCurrency(emiPrincipal)} Loan`,
          investedCapital: res.principal,
          totalInterest: res.totalInterest,
          totalPayable: res.totalPayable,
          trajectory,
          years: emiYears,
          isEMI: true,
        };
      }
      default:
        throw new Error("Unhandled calculator type");
    }
  }, [
    activeCalcKey,
    sipMonthly,
    sipRate,
    sipYears,
    stepUpMonthly,
    stepUpPercent,
    stepUpRate,
    stepUpYears,
    lumpAmount,
    lumpRate,
    lumpYears,
    annualAmount,
    annualRate,
    annualYears,
    targetCorpus,
    targetRate,
    targetYears,
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentMonthlyExpense,
    preRetirementReturn,
    postRetirementReturn,
    childCurrentAge,
    collegeAge,
    currentEducationCost,
    educationInflation,
    educationReturn,
    swpPrincipal,
    swpWithdrawal,
    swpRate,
    swpYears,
    targetLumpCorpus,
    targetLumpRate,
    targetLumpYears,
    emiPrincipal,
    emiRate,
    emiYears,
    inflationRate,
  ]);

  // Asset class comparison
  const assetComparison = useMemo(() => {
    if (currentResult.isEMI) return null;

    let fdValue = 0;
    let savingsValue = 0;

    if (activeCalcKey === "sip") {
      fdValue = calculateSIP(sipMonthly, 6.5, sipYears).maturityValue;
      savingsValue = calculateSIP(sipMonthly, 3.5, sipYears).maturityValue;
    } else if (activeCalcKey === "lumpsum") {
      fdValue = calculateLumpsum(lumpAmount, 6.5, lumpYears).maturityValue;
      savingsValue = calculateLumpsum(lumpAmount, 3.5, lumpYears).maturityValue;
    } else if (activeCalcKey === "stepup") {
      fdValue = calculateStepUpSIP(stepUpMonthly, stepUpPercent, 6.5, stepUpYears).maturityValue;
      savingsValue = calculateStepUpSIP(stepUpMonthly, stepUpPercent, 3.5, stepUpYears).maturityValue;
    } else {
      fdValue = Math.round(currentResult.investedCapital * Math.pow(1 + 0.065, currentResult.years));
      savingsValue = Math.round(currentResult.investedCapital * Math.pow(1 + 0.035, currentResult.years));
    }

    const cashPurchasingPower = adjustForInflation(
      currentResult.investedCapital,
      inflationRate,
      currentResult.years
    );

    const extraOverFD = Math.max(0, currentResult.primaryValue - fdValue);
    const extraOverSavings = Math.max(0, currentResult.primaryValue - savingsValue);

    return {
      modeledValue: currentResult.primaryValue,
      fdValue,
      savingsValue,
      cashPurchasingPower,
      extraOverFD,
      extraOverSavings,
    };
  }, [
    currentResult,
    activeCalcKey,
    sipMonthly,
    sipYears,
    lumpAmount,
    lumpYears,
    stepUpMonthly,
    stepUpPercent,
    stepUpYears,
    inflationRate,
  ]);

  const handleCopyPlan = () => {
    const text = `HM Wealth Financial Plan Summary:
• Goal / Model: ${currentResult.primaryLabel}
• Capital Invested: ${formatCurrencyExact(currentResult.investedCapital)}
• Projected Corpus: ${formatCurrencyExact(currentResult.primaryValue)}
• Wealth Multiplier: ${currentResult.multiplier}x Capital
Modeled at: https://hmwealth.in/calculators`;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedPlan(true);
        setTimeout(() => setCopiedPlan(false), 2500);
      });
    }
  };

  const shareWhatsAppUrl = `${site.whatsappHref}?text=${encodeURIComponent(
    `Hi HM Wealth, I modeled a plan in the Wealth Studio:\n\n` +
      `📌 Model: ${currentResult.primaryLabel}\n` +
      `💰 Capital: ${formatCurrencyExact(currentResult.investedCapital)}\n` +
      `📈 Projected Wealth: ${formatCurrencyExact(currentResult.primaryValue)}\n` +
      `🏆 Multiplier: ${currentResult.multiplier}x Capital\n\n` +
      `Please help me review suitable schemes to set this up.`
  )}`;

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* ======================================================================
          1. Segmented Categorization Switcher (Unified Luxury Terminal Dock)
          ====================================================================== */}
      <div className="flex flex-col gap-3">
        {/* Main 3 Categories Dock */}
        <div className="grid grid-cols-1 gap-2.5 rounded-3xl border border-line bg-white/90 p-2.5 shadow-card backdrop-blur-md sm:grid-cols-3">
          {/* Category 1: Wealth Accumulation */}
          <button
            type="button"
            onClick={() => setActiveCategory("accumulation")}
            className={cn(
              "group relative flex items-center justify-between gap-3 rounded-2xl p-4 text-left transition-all duration-200",
              activeCategory === "accumulation"
                ? "bg-gradient-to-br from-brand via-brand to-brand-dark text-white shadow-[0_12px_24px_-8px_rgba(11,122,85,0.6)]"
                : "text-body hover:bg-soft hover:text-ink"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl transition-all",
                  activeCategory === "accumulation"
                    ? "bg-white text-brand shadow-sm"
                    : "bg-mint text-brand group-hover:scale-105"
                )}
              >
                <TrendingUp className="size-5" />
              </div>
              <div>
                <h3 className={cn("text-[15px] font-extrabold tracking-tight", activeCategory === "accumulation" ? "text-white" : "text-ink")}>
                  Wealth Accumulation
                </h3>
                <p className={cn("text-xs font-medium", activeCategory === "accumulation" ? "text-white/80" : "text-body")}>
                  SIP · Step-Up · Lump Sum · Annual
                </p>
              </div>
            </div>
            <span
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold shadow-2xs",
                activeCategory === "accumulation"
                  ? "bg-white/20 text-white backdrop-blur-xs"
                  : "bg-soft text-body"
              )}
            >
              4 Models
            </span>
          </button>

          {/* Category 2: Life Milestones */}
          <button
            type="button"
            onClick={() => setActiveCategory("milestones")}
            className={cn(
              "group relative flex items-center justify-between gap-3 rounded-2xl p-4 text-left transition-all duration-200",
              activeCategory === "milestones"
                ? "bg-gradient-to-br from-brand via-brand to-brand-dark text-white shadow-[0_12px_24px_-8px_rgba(11,122,85,0.6)]"
                : "text-body hover:bg-soft hover:text-ink"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl transition-all",
                  activeCategory === "milestones"
                    ? "bg-white text-brand shadow-sm"
                    : "bg-sky text-sky-ink group-hover:scale-105"
                )}
              >
                <Target className="size-5" />
              </div>
              <div>
                <h3 className={cn("text-[15px] font-extrabold tracking-tight", activeCategory === "milestones" ? "text-white" : "text-ink")}>
                  Life Milestones
                </h3>
                <p className={cn("text-xs font-medium", activeCategory === "milestones" ? "text-white/80" : "text-body")}>
                  Goal SIP · Retirement · Education
                </p>
              </div>
            </div>
            <span
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold shadow-2xs",
                activeCategory === "milestones"
                  ? "bg-white/20 text-white backdrop-blur-xs"
                  : "bg-soft text-body"
              )}
            >
              3 Models
            </span>
          </button>

          {/* Category 3: Cashflow & Loans */}
          <button
            type="button"
            onClick={() => setActiveCategory("cashflow")}
            className={cn(
              "group relative flex items-center justify-between gap-3 rounded-2xl p-4 text-left transition-all duration-200",
              activeCategory === "cashflow"
                ? "bg-gradient-to-br from-brand via-brand to-brand-dark text-white shadow-[0_12px_24px_-8px_rgba(11,122,85,0.6)]"
                : "text-body hover:bg-soft hover:text-ink"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl transition-all",
                  activeCategory === "cashflow"
                    ? "bg-white text-brand shadow-sm"
                    : "bg-peach text-peach-ink group-hover:scale-105"
                )}
              >
                <Repeat className="size-5" />
              </div>
              <div>
                <h3 className={cn("text-[15px] font-extrabold tracking-tight", activeCategory === "cashflow" ? "text-white" : "text-ink")}>
                  Cashflow &amp; Loans
                </h3>
                <p className={cn("text-xs font-medium", activeCategory === "cashflow" ? "text-white/80" : "text-body")}>
                  SWP Income · Lump Sum · Loan EMI
                </p>
              </div>
            </div>
            <span
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold shadow-2xs",
                activeCategory === "cashflow"
                  ? "bg-white/20 text-white backdrop-blur-xs"
                  : "bg-soft text-body"
              )}
            >
              3 Models
            </span>
          </button>
        </div>

        {/* Secondary Sub-Category Navigator Ribbon & Inflation Switch */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white/90 p-2 shadow-sm">
          <div className="flex w-full flex-nowrap items-center gap-1.5 overflow-x-auto [scrollbar-width:none] sm:w-auto sm:flex-wrap [&::-webkit-scrollbar]:hidden">
            {activeCategory === "accumulation" && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveAccum("sip")}
                  className={cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-[13px] font-extrabold transition-all sm:px-4",
                    activeAccum === "sip"
                      ? "bg-brand text-white shadow-xs"
                      : "text-body hover:bg-soft hover:text-ink"
                  )}
                >
                  <CalendarClock className="size-3.5" />
                  Monthly SIP
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAccum("stepup")}
                  className={cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-[13px] font-extrabold transition-all sm:px-4",
                    activeAccum === "stepup"
                      ? "bg-brand text-white shadow-xs"
                      : "text-body hover:bg-soft hover:text-ink"
                  )}
                >
                  <TrendingUp className="size-3.5" />
                  Step-Up SIP
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAccum("lumpsum")}
                  className={cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-[13px] font-extrabold transition-all sm:px-4",
                    activeAccum === "lumpsum"
                      ? "bg-brand text-white shadow-xs"
                      : "text-body hover:bg-soft hover:text-ink"
                  )}
                >
                  <Wallet className="size-3.5" />
                  Lump Sum
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAccum("annual")}
                  className={cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-[13px] font-extrabold transition-all sm:px-4",
                    activeAccum === "annual"
                      ? "bg-brand text-white shadow-xs"
                      : "text-body hover:bg-soft hover:text-ink"
                  )}
                >
                  <PiggyBank className="size-3.5" />
                  Annual SIP
                </button>
              </>
            )}

            {activeCategory === "milestones" && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveMilestone("target")}
                  className={cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-[13px] font-extrabold transition-all sm:px-4",
                    activeMilestone === "target"
                      ? "bg-brand text-white shadow-xs"
                      : "text-body hover:bg-soft hover:text-ink"
                  )}
                >
                  <Target className="size-3.5" />
                  Target Goal SIP
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMilestone("retirement")}
                  className={cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-[13px] font-extrabold transition-all sm:px-4",
                    activeMilestone === "retirement"
                      ? "bg-brand text-white shadow-xs"
                      : "text-body hover:bg-soft hover:text-ink"
                  )}
                >
                  <Sunset className="size-3.5" />
                  Retirement Independence
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMilestone("education")}
                  className={cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-[13px] font-extrabold transition-all sm:px-4",
                    activeMilestone === "education"
                      ? "bg-brand text-white shadow-xs"
                      : "text-body hover:bg-soft hover:text-ink"
                  )}
                >
                  <GraduationCap className="size-3.5" />
                  Child Higher Education
                </button>
              </>
            )}

            {activeCategory === "cashflow" && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveCashflow("swp")}
                  className={cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-[13px] font-extrabold transition-all sm:px-4",
                    activeCashflow === "swp"
                      ? "bg-brand text-white shadow-xs"
                      : "text-body hover:bg-soft hover:text-ink"
                  )}
                >
                  <Sunset className="size-3.5" />
                  SWP Monthly Income
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCashflow("targetLump")}
                  className={cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-[13px] font-extrabold transition-all sm:px-4",
                    activeCashflow === "targetLump"
                      ? "bg-brand text-white shadow-xs"
                      : "text-body hover:bg-soft hover:text-ink"
                  )}
                >
                  <Layers className="size-3.5" />
                  Target Lump Sum
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCashflow("emi")}
                  className={cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-[13px] font-extrabold transition-all sm:px-4",
                    activeCashflow === "emi"
                      ? "bg-brand text-white shadow-xs"
                      : "text-body hover:bg-soft hover:text-ink"
                  )}
                >
                  <Home className="size-3.5" />
                  Loan EMI &amp; Interest
                </button>
              </>
            )}
          </div>

          {/* Adjust for Inflation (6%) Switch */}
          <div className="flex items-center gap-3 border-t border-line/60 pt-2 sm:border-t-0 sm:pt-0">
            <label
              htmlFor="inflation-toggle"
              className="flex cursor-pointer items-center gap-2 text-xs font-bold text-body select-none transition-colors hover:text-ink"
            >
              <span>Adjust for 6% Inflation (Real Purchasing Power)</span>
              <div className="relative inline-flex items-center">
                <input
                  id="inflation-toggle"
                  type="checkbox"
                  checked={showInflation}
                  onChange={(e) => setShowInflation(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="h-5 w-9 rounded-full bg-line transition-colors peer-checked:bg-amber-500 peer-focus:outline-none" />
                <div className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white transition-transform peer-checked:translate-x-4 shadow-xs" />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* ======================================================================
          2. Master Wealth Studio Grid (Controls on Left, Visuals on Right)
          ====================================================================== */}
      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        {/* Left Column: Synchronized Input Controls */}
        <div className="flex flex-col gap-6 rounded-[28px] border border-line bg-white p-5 sm:p-8 shadow-card lg:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-xs font-bold text-brand">
                <Zap className="size-3 text-brand" />
                Live Dynamic Model
              </span>
              <span className="text-xs font-semibold text-body/75">
                AMFI-compliant illustrations
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-extrabold text-ink">
              {activeCalcKey === "sip" && "Monthly SIP Calculator"}
              {activeCalcKey === "stepup" && "Step-Up SIP Calculator"}
              {activeCalcKey === "lumpsum" && "Lump Sum Calculator"}
              {activeCalcKey === "annual" && "Annual SIP Calculator"}
              {activeCalcKey === "target" && "Target Goal SIP Calculator"}
              {activeCalcKey === "retirement" && "Retirement Independence Engine"}
              {activeCalcKey === "education" && "Child Higher Education Fund"}
              {activeCalcKey === "swp" && "SWP Regular Cashflow Calculator"}
              {activeCalcKey === "targetLump" && "Target Lump Sum (Present Value)"}
              {activeCalcKey === "emi" && "Loan EMI & Reducing Balance"}
            </h2>
            <p className="mt-1 text-[14px] leading-relaxed text-body">
              {activeCalcKey === "sip" && "Calculate how consistent monthly mutual fund investments compound into substantial long-term wealth."}
              {activeCalcKey === "stepup" && "Increase your monthly SIP by a small percentage each year as your income and salary grow."}
              {activeCalcKey === "lumpsum" && "Estimate how a one-time capital deposit multiplies over long investment horizons."}
              {activeCalcKey === "annual" && "Model disciplined annual investments (e.g. from year-end performance bonuses)."}
              {activeCalcKey === "target" && "Determine the exact monthly SIP required today to achieve your dream financial target."}
              {activeCalcKey === "retirement" && "Calculate the inflation-adjusted corpus and monthly SIP needed for lifelong financial independence."}
              {activeCalcKey === "education" && "Account for college tuition inflation (8%) and ensure your child enters college debt-free."}
              {activeCalcKey === "swp" && "Draw a steady, tax-efficient monthly income from your capital while keeping the rest invested."}
              {activeCalcKey === "targetLump" && "Calculate how much one-time capital you need to deposit today to achieve a future goal."}
              {activeCalcKey === "emi" && "Calculate monthly loan EMIs, interest load, and total payout using reducing balance formula."}
            </p>
          </div>

          <div className="flex flex-col gap-6 border-t border-line/60 pt-6">
            {/* 1. Monthly SIP Controls */}
            {activeCalcKey === "sip" && (
              <>
                <DualControl
                  id="sip-monthly"
                  label="Monthly Investment Amount"
                  value={sipMonthly}
                  min={500}
                  max={200000}
                  step={500}
                  unit="currency"
                  quickChips={[
                    { label: "₹1k", addValue: 1000 },
                    { label: "₹5k", addValue: 5000 },
                    { label: "₹10k", addValue: 10000 },
                    { label: "₹25k", addValue: 25000 },
                  ]}
                  onChange={setSipMonthly}
                  helperText="Even ₹1,000/mo creates wealth"
                />

                <DualControl
                  id="sip-rate"
                  label="Expected Annual Return"
                  value={sipRate}
                  min={1}
                  max={20}
                  step={0.5}
                  unit="percent"
                  quickChips={[
                    { label: "10%", addValue: 10 - sipRate },
                    { label: "12%", addValue: 12 - sipRate },
                    { label: "14%", addValue: 14 - sipRate },
                  ]}
                  onChange={setSipRate}
                  helperText="Long-term equity average: 12-14%"
                />

                <DualControl
                  id="sip-years"
                  label="Investment Time Horizon"
                  value={sipYears}
                  min={1}
                  max={40}
                  step={1}
                  unit="years"
                  quickChips={[
                    { label: "+1 yr", addValue: 1 },
                    { label: "+5 yrs", addValue: 5 },
                    { label: "+10 yrs", addValue: 10 },
                  ]}
                  onChange={setSipYears}
                  helperText="Time in market beats timing"
                />
              </>
            )}

            {/* 2. Step-Up SIP Controls */}
            {activeCalcKey === "stepup" && (
              <>
                <DualControl
                  id="stepup-monthly"
                  label="Starting Monthly SIP"
                  value={stepUpMonthly}
                  min={1000}
                  max={200000}
                  step={500}
                  unit="currency"
                  quickChips={[
                    { label: "₹5k", addValue: 5000 },
                    { label: "₹10k", addValue: 10000 },
                    { label: "₹25k", addValue: 25000 },
                  ]}
                  onChange={setStepUpMonthly}
                />

                <DualControl
                  id="stepup-percent"
                  label="Annual Step-Up Hike"
                  value={stepUpPercent}
                  min={1}
                  max={30}
                  step={1}
                  unit="percent"
                  quickChips={[
                    { label: "5%", addValue: 5 - stepUpPercent },
                    { label: "10%", addValue: 10 - stepUpPercent },
                    { label: "15%", addValue: 15 - stepUpPercent },
                  ]}
                  onChange={setStepUpPercent}
                  helperText="Match your annual salary increments"
                />

                <DualControl
                  id="stepup-rate"
                  label="Expected Annual Return"
                  value={stepUpRate}
                  min={1}
                  max={20}
                  step={0.5}
                  unit="percent"
                  onChange={setStepUpRate}
                />

                <DualControl
                  id="stepup-years"
                  label="Time Period"
                  value={stepUpYears}
                  min={1}
                  max={40}
                  step={1}
                  unit="years"
                  onChange={setStepUpYears}
                />
              </>
            )}

            {/* 3. Lump Sum Controls */}
            {activeCalcKey === "lumpsum" && (
              <>
                <DualControl
                  id="lump-amount"
                  label="Total One-Time Deposit"
                  value={lumpAmount}
                  min={10000}
                  max={10000000}
                  step={10000}
                  unit="currency"
                  quickChips={[
                    { label: "+₹50k", addValue: 50000 },
                    { label: "+₹1L", addValue: 100000 },
                    { label: "+₹5L", addValue: 500000 },
                  ]}
                  onChange={setLumpAmount}
                />

                <DualControl
                  id="lump-rate"
                  label="Expected Annual Return"
                  value={lumpRate}
                  min={1}
                  max={20}
                  step={0.5}
                  unit="percent"
                  quickChips={[
                    { label: "10%", addValue: 10 - lumpRate },
                    { label: "12%", addValue: 12 - lumpRate },
                  ]}
                  onChange={setLumpRate}
                />

                <DualControl
                  id="lump-years"
                  label="Tenure / Duration"
                  value={lumpYears}
                  min={1}
                  max={40}
                  step={1}
                  unit="years"
                  quickChips={[
                    { label: "+3 yrs", addValue: 3 },
                    { label: "+5 yrs", addValue: 5 },
                  ]}
                  onChange={setLumpYears}
                />
              </>
            )}

            {/* 4. Annual SIP Controls */}
            {activeCalcKey === "annual" && (
              <>
                <DualControl
                  id="annual-amount"
                  label="Annual Investment Amount"
                  value={annualAmount}
                  min={10000}
                  max={2500000}
                  step={5000}
                  unit="currency"
                  quickChips={[
                    { label: "+₹25k", addValue: 25000 },
                    { label: "+₹50k", addValue: 50000 },
                    { label: "+₹1L", addValue: 100000 },
                  ]}
                  onChange={setAnnualAmount}
                  helperText="e.g. Annual bonus or dividend"
                />

                <DualControl
                  id="annual-rate"
                  label="Expected Annual Return"
                  value={annualRate}
                  min={1}
                  max={20}
                  step={0.5}
                  unit="percent"
                  onChange={setAnnualRate}
                />

                <DualControl
                  id="annual-years"
                  label="Investment Years"
                  value={annualYears}
                  min={1}
                  max={40}
                  step={1}
                  unit="years"
                  onChange={setAnnualYears}
                />
              </>
            )}

            {/* 5. Target Goal SIP Controls */}
            {activeCalcKey === "target" && (
              <>
                <DualControl
                  id="target-corpus"
                  label="Target Wealth Goal (Future Corpus)"
                  value={targetCorpus}
                  min={100000}
                  max={100000000}
                  step={50000}
                  unit="currency"
                  quickChips={[
                    { label: "+₹5L", addValue: 500000 },
                    { label: "+₹10L", addValue: 1000000 },
                    { label: "+₹25L", addValue: 2500000 },
                  ]}
                  onChange={setTargetCorpus}
                  helperText="Goal for home, wedding, or venture"
                />

                <DualControl
                  id="target-rate"
                  label="Expected Annual Return"
                  value={targetRate}
                  min={1}
                  max={20}
                  step={0.5}
                  unit="percent"
                  onChange={setTargetRate}
                />

                <DualControl
                  id="target-years"
                  label="Years Left to Reach Goal"
                  value={targetYears}
                  min={1}
                  max={40}
                  step={1}
                  unit="years"
                  quickChips={[
                    { label: "+2 yrs", addValue: 2 },
                    { label: "+5 yrs", addValue: 5 },
                  ]}
                  onChange={setTargetYears}
                />
              </>
            )}

            {/* 6. Retirement Planning Controls */}
            {activeCalcKey === "retirement" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <DualControl
                    id="current-age"
                    label="Current Age"
                    value={currentAge}
                    min={18}
                    max={60}
                    step={1}
                    unit="age"
                    onChange={setCurrentAge}
                  />

                  <DualControl
                    id="retirement-age"
                    label="Retirement Age"
                    value={retirementAge}
                    min={Math.max(45, currentAge + 1)}
                    max={75}
                    step={1}
                    unit="age"
                    onChange={setRetirementAge}
                  />
                </div>

                <DualControl
                  id="life-expectancy"
                  label="Life Expectancy (Planning Age)"
                  value={lifeExpectancy}
                  min={Math.max(70, retirementAge + 5)}
                  max={100}
                  step={1}
                  unit="age"
                  onChange={setLifeExpectancy}
                />

                <DualControl
                  id="monthly-expense"
                  label="Current Monthly Living Expense"
                  value={currentMonthlyExpense}
                  min={10000}
                  max={500000}
                  step={2000}
                  unit="currency"
                  quickChips={[
                    { label: "+₹5k", addValue: 5000 },
                    { label: "+₹10k", addValue: 10000 },
                  ]}
                  onChange={setCurrentMonthlyExpense}
                  helperText="Household expenses in today's terms"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <DualControl
                    id="pre-return"
                    label="Pre-Retirement Return"
                    value={preRetirementReturn}
                    min={6}
                    max={16}
                    step={0.5}
                    unit="percent"
                    onChange={setPreRetirementReturn}
                    helperText="During wealth building"
                  />

                  <DualControl
                    id="post-return"
                    label="Post-Retirement Return"
                    value={postRetirementReturn}
                    min={4}
                    max={12}
                    step={0.5}
                    unit="percent"
                    onChange={setPostRetirementReturn}
                    helperText="Conservative / Debt heavy"
                  />
                </div>
              </>
            )}

            {/* 7. Child Higher Education Controls */}
            {activeCalcKey === "education" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <DualControl
                    id="child-age"
                    label="Child's Current Age"
                    value={childCurrentAge}
                    min={0}
                    max={17}
                    step={1}
                    unit="age"
                    onChange={setChildCurrentAge}
                  />

                  <DualControl
                    id="college-age"
                    label="College Admission Age"
                    value={collegeAge}
                    min={Math.max(16, childCurrentAge + 1)}
                    max={25}
                    step={1}
                    unit="age"
                    onChange={setCollegeAge}
                  />
                </div>

                <DualControl
                  id="education-cost"
                  label="Cost of Course (In Today's Money)"
                  value={currentEducationCost}
                  min={500000}
                  max={20000000}
                  step={50000}
                  unit="currency"
                  quickChips={[
                    { label: "+₹5L", addValue: 500000 },
                    { label: "+₹10L", addValue: 1000000 },
                  ]}
                  onChange={setCurrentEducationCost}
                  helperText="Tuition + accommodation in today's rates"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <DualControl
                    id="education-inflation"
                    label="Education Inflation"
                    value={educationInflation}
                    min={4}
                    max={14}
                    step={0.5}
                    unit="percent"
                    onChange={setEducationInflation}
                    helperText="College inflation averages ~8-10%"
                  />

                  <DualControl
                    id="education-return"
                    label="Expected Return"
                    value={educationReturn}
                    min={6}
                    max={18}
                    step={0.5}
                    unit="percent"
                    onChange={setEducationReturn}
                  />
                </div>
              </>
            )}

            {/* 8. SWP Controls */}
            {activeCalcKey === "swp" && (
              <>
                <DualControl
                  id="swp-principal"
                  label="Total Capital to Invest"
                  value={swpPrincipal}
                  min={500000}
                  max={50000000}
                  step={50000}
                  unit="currency"
                  quickChips={[
                    { label: "+₹5L", addValue: 500000 },
                    { label: "+₹10L", addValue: 1000000 },
                  ]}
                  onChange={setSwpPrincipal}
                />

                <DualControl
                  id="swp-withdrawal"
                  label="Monthly Income Withdrawal"
                  value={swpWithdrawal}
                  min={2000}
                  max={500000}
                  step={1000}
                  unit="currency"
                  quickChips={[
                    { label: "+₹5k", addValue: 5000 },
                    { label: "+₹10k", addValue: 10000 },
                    { label: "+₹25k", addValue: 25000 },
                  ]}
                  onChange={setSwpWithdrawal}
                  helperText="Recommended withdrawal: 6-8% annually"
                />

                <DualControl
                  id="swp-rate"
                  label="Expected Portfolio Growth"
                  value={swpRate}
                  min={1}
                  max={15}
                  step={0.5}
                  unit="percent"
                  onChange={setSwpRate}
                />

                <DualControl
                  id="swp-years"
                  label="Withdrawal Timeframe"
                  value={swpYears}
                  min={1}
                  max={30}
                  step={1}
                  unit="years"
                  onChange={setSwpYears}
                />
              </>
            )}

            {/* 9. Target Lump Sum Controls */}
            {activeCalcKey === "targetLump" && (
              <>
                <DualControl
                  id="target-lump-corpus"
                  label="Future Target Corpus Needed"
                  value={targetLumpCorpus}
                  min={100000}
                  max={100000000}
                  step={50000}
                  unit="currency"
                  quickChips={[
                    { label: "+₹5L", addValue: 500000 },
                    { label: "+₹10L", addValue: 1000000 },
                  ]}
                  onChange={setTargetLumpCorpus}
                />

                <DualControl
                  id="target-lump-rate"
                  label="Expected Annual Return"
                  value={targetLumpRate}
                  min={1}
                  max={20}
                  step={0.5}
                  unit="percent"
                  onChange={setTargetLumpRate}
                />

                <DualControl
                  id="target-lump-years"
                  label="Years until Required"
                  value={targetLumpYears}
                  min={1}
                  max={30}
                  step={1}
                  unit="years"
                  onChange={setTargetLumpYears}
                />
              </>
            )}

            {/* 10. Loan EMI Controls */}
            {activeCalcKey === "emi" && (
              <>
                <DualControl
                  id="emi-principal"
                  label="Loan Amount Required"
                  value={emiPrincipal}
                  min={100000}
                  max={50000000}
                  step={50000}
                  unit="currency"
                  quickChips={[
                    { label: "+₹2L", addValue: 200000 },
                    { label: "+₹5L", addValue: 500000 },
                    { label: "+₹10L", addValue: 1000000 },
                  ]}
                  onChange={setEmiPrincipal}
                  helperText="Home, Car or Personal Loan"
                />

                <DualControl
                  id="emi-rate"
                  label="Annual Interest Rate (Reducing)"
                  value={emiRate}
                  min={5}
                  max={18}
                  step={0.1}
                  unit="percent"
                  quickChips={[
                    { label: "8.5%", addValue: 8.5 - emiRate },
                    { label: "9.0%", addValue: 9.0 - emiRate },
                    { label: "9.5%", addValue: 9.5 - emiRate },
                  ]}
                  onChange={setEmiRate}
                />

                <DualControl
                  id="emi-years"
                  label="Loan Tenure"
                  value={emiYears}
                  min={1}
                  max={30}
                  step={1}
                  unit="years"
                  quickChips={[
                    { label: "+1 yr", addValue: 1 },
                    { label: "+5 yrs", addValue: 5 },
                  ]}
                  onChange={setEmiYears}
                />
              </>
            )}
          </div>

          {/* Actuarial Assurance Footer */}
          <div className="mt-auto pt-4 border-t border-line/60 flex items-center justify-between text-[11.5px] text-body">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="size-3.5 text-brand" />
              AMFI / Actuarial Formula Verified
            </span>
            <span className="font-semibold text-brand">Real-time Compounding</span>
          </div>
        </div>

        {/* Right Column: Wealth Studio Results & Visuals */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* A. Hero Headline Value Card (Ultra-Luxury Obsidian & Emerald Terminal) */}
          <div className="relative isolate overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-br from-[#021f15] via-[#053b2a] to-[#04261c] p-6 text-white shadow-[0_30px_70px_-25px_rgba(4,38,28,0.5)] sm:p-8">
            {/* Ambient radial luxury glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 -z-10 size-64 rounded-full bg-[#19c38a]/25 blur-[75px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-12 -z-10 size-60 rounded-full bg-gold/15 blur-[75px]"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {currentResult.headline}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold text-[#7ff0c4] ring-1 ring-white/15 backdrop-blur-xs">
                <Sparkles className="size-3 text-gold" />
                Live Dynamic Model
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <div className="text-[38px] font-extrabold leading-none tracking-tight sm:text-[48px] tnum">
                {formatCurrency(currentResult.primaryValue)}
              </div>
              <div className="text-xs font-medium text-emerald-200/90 tnum">
                Exact: {formatCurrencyExact(currentResult.primaryValue)}
              </div>
            </div>

            <p className="mt-2 text-[14px] text-white/80">
              {currentResult.primaryLabel}
            </p>

            {/* Quick Metrics Strip */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/15 pt-5 sm:grid-cols-3">
              {/* Invested Capital */}
              <div className="rounded-xl bg-white/10 p-3 backdrop-blur-xs">
                <span className="text-[11px] font-medium text-white/70">
                  {currentResult.isEMI ? "Loan Principal" : "Capital Invested"}
                </span>
                <p className="mt-1 text-[16px] font-extrabold text-white tnum">
                  {formatCurrency(currentResult.investedCapital)}
                </p>
              </div>

              {/* Gains or Interest */}
              <div className="rounded-xl bg-white/10 p-3 backdrop-blur-xs">
                <span className="text-[11px] font-medium text-white/70">
                  {currentResult.isEMI
                    ? "Total Interest"
                    : currentResult.isSWP
                    ? "Total Withdrawn"
                    : "Estimated Gains"}
                </span>
                <p className="mt-1 text-[16px] font-extrabold text-gold tnum">
                  {currentResult.isEMI
                    ? formatCurrency(currentResult.totalInterest || 0)
                    : currentResult.isSWP
                    ? formatCurrency(currentResult.totalWithdrawn || 0)
                    : `+${formatCurrency(currentResult.wealthGain || 0)}`}
                </p>
              </div>

              {/* Multiplier or Total Payout */}
              <div className="col-span-2 rounded-xl bg-white/10 p-3 backdrop-blur-xs sm:col-span-1">
                <span className="text-[11px] font-medium text-white/70">
                  {currentResult.isEMI
                    ? "Total Outflow"
                    : currentResult.isSWP
                    ? "Status"
                    : "Return Multiplier"}
                </span>
                <p className="mt-1 text-[16px] font-extrabold text-white tnum">
                  {currentResult.isEMI
                    ? formatCurrency(currentResult.totalPayable || 0)
                    : currentResult.isSWP
                    ? currentResult.isExhausted
                      ? `Exhausts Yr ${currentResult.exhaustedYear}`
                      : "Sustainable"
                    : `${currentResult.multiplier}x Capital`}
                </p>
              </div>
            </div>

            {/* Optional Inflation Callout */}
            {showInflation && currentResult.realValue !== undefined && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-amber-500/20 p-3 text-xs text-amber-100 backdrop-blur-xs border border-amber-400/30">
                <span className="flex items-center gap-1.5 font-medium">
                  <Info className="size-3.5 text-amber-300" />
                  Real Purchasing Power in Today&apos;s Terms (6% inflation):
                </span>
                <span className="font-extrabold text-white tnum">
                  {formatCurrency(currentResult.realValue)}
                </span>
              </div>
            )}
          </div>

          {/* B. Distinct Dual Gradient Growth Chart */}
          <div className="flex flex-col gap-3 rounded-[28px] border border-line bg-white p-6 shadow-card sm:p-7">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">
                  Trajectory &amp; Compounding Curve
                </h3>
                <p className="text-xs text-body">
                  Dual layer: Capital Invested vs Accumulated Wealth
                </p>
              </div>
              <span className="rounded-lg bg-soft px-2.5 py-1 text-xs font-semibold text-body">
                {currentResult.years} Years Journey
              </span>
            </div>

            <WealthAreaChart
              data={currentResult.trajectory}
              showInflation={showInflation}
              capitalLabel={currentResult.isEMI ? "Principal Repaid" : "Total Capital Invested"}
              wealthLabel={currentResult.isEMI ? "Remaining Loan Balance" : "Accumulated Wealth & Value"}
              height={290}
            />
          </div>
        </div>
      </div>

      {/* ======================================================================
          TIER 2: Milestone Growth Roadmap (Full Width across all 12 cols)
          ====================================================================== */}
      {!currentResult.isEMI && (
        <div className="rounded-[28px] border border-line bg-white p-6 shadow-card sm:p-7">
          <MilestoneRoadmap
            totalYears={currentResult.years}
            trajectory={currentResult.trajectory}
            showInflation={showInflation}
          />
        </div>
      )}

      {/* ======================================================================
          TIER 3: Comparative Edge & Execution Hub (Balanced 2-Column, 12 cols)
          ====================================================================== */}
      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        {/* Left (7 cols): The Compounding Edge vs Alternative Options */}
        {assetComparison && (
          <div className="flex flex-col justify-between rounded-[28px] border border-line bg-white p-6 shadow-card sm:p-7 lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
                <div>
                  <h3 className="flex items-center gap-2 text-base font-extrabold text-ink">
                    <TrendingUp className="size-4 text-brand" />
                    The Compounding Edge vs Alternative Options
                  </h3>
                  <p className="text-xs text-body">
                    Comparing your investment against standard Indian financial instruments
                  </p>
                </div>
                {assetComparison.extraOverFD > 0 && (
                  <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-brand">
                    +{formatCurrency(assetComparison.extraOverFD)} vs Bank FD
                  </span>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-3.5">
                {/* 1. Modeled Mutual Fund */}
                <div className="rounded-2xl border border-brand/20 bg-mint/40 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 font-extrabold text-brand">
                      <span className="size-2.5 rounded-full bg-brand" />
                      Mutual Fund Portfolio (Modeled Return)
                    </span>
                    <span className="text-sm font-extrabold text-ink tnum">
                      {formatCurrency(assetComparison.modeledValue)}
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-mint">
                    <div className="h-full bg-brand" style={{ width: "100%" }} />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[11px] font-semibold text-brand/80">
                    <span>Highest Wealth Creation Potential</span>
                    <span>Exact: {formatCurrencyExact(assetComparison.modeledValue)}</span>
                  </div>
                </div>

                {/* 2. Bank Fixed Deposit (6.5%) */}
                <div className="rounded-2xl border border-line bg-soft/60 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 font-bold text-body">
                      <span className="size-2.5 rounded-full bg-slate-600" />
                      Bank Fixed Deposit (Assumed 6.5% p.a.)
                    </span>
                    <span className="text-sm font-bold text-ink tnum">
                      {formatCurrency(assetComparison.fdValue)}
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full bg-slate-600"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(
                            5,
                            (assetComparison.fdValue / assetComparison.modeledValue) * 100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[11px] font-medium text-body/70">
                    <span>Loses purchasing power after tax &amp; inflation</span>
                    <span>Lag: -{formatCurrency(assetComparison.extraOverFD)}</span>
                  </div>
                </div>

                {/* 3. Bank Savings Account (3.5%) */}
                <div className="rounded-2xl border border-line bg-soft/60 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 font-bold text-body">
                      <span className="size-2.5 rounded-full bg-sky-ink" />
                      Bank Savings Account (3.5% p.a.)
                    </span>
                    <span className="text-sm font-bold text-ink tnum">
                      {formatCurrency(assetComparison.savingsValue)}
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-sky">
                    <div
                      className="h-full bg-sky-ink"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(
                            5,
                            (assetComparison.savingsValue / assetComparison.modeledValue) * 100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* 4. Uninvested Cash in Locker */}
                <div className="rounded-2xl border border-line bg-amber-50/50 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 font-bold text-amber-900">
                      <span className="size-2.5 rounded-full bg-amber-600" />
                      Uninvested Cash / Locker (Eroded by 6% Inflation)
                    </span>
                    <span className="text-sm font-bold text-amber-900 tnum">
                      {formatCurrency(assetComparison.cashPurchasingPower)}
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-amber-200/50">
                    <div
                      className="h-full bg-amber-600"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(
                            5,
                            (assetComparison.cashPurchasingPower / assetComparison.modeledValue) * 100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[11px] font-medium text-amber-800">
                    <span>Inflation destroys idle purchasing power over time</span>
                    <span>Severe Wealth Decay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right (5 cols): Plan Execution & Specialist Consultation Desk */}
        <div
          className={cn(
            "flex flex-col justify-between rounded-[28px] border border-brand/20 bg-gradient-to-br from-mint via-white to-mint p-6 shadow-card sm:p-7",
            assetComparison ? "lg:col-span-5" : "lg:col-span-12"
          )}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white shadow-xs">
                <CheckCircle2 className="size-3.5" />
                Action Plan Ready
              </span>
              <span className="text-xs font-bold text-brand">
                {currentResult.multiplier}x Multiplier
              </span>
            </div>

            <h3 className="mt-3.5 text-xl font-extrabold text-ink">
              Turn This Model into Real Wealth
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-body">
              Get an AMFI-registered mutual fund specialist to review your risk appetite and recommend vetted schemes aligned with this exact target.
            </p>

            {/* Quick Summary Pill Box */}
            <div className="mt-5 rounded-2xl border border-line/80 bg-white/90 p-4 shadow-2xs backdrop-blur-xs">
              <div className="flex justify-between text-xs text-body">
                <span>Model Selected:</span>
                <span className="font-bold text-ink">{activeCalcKey.toUpperCase()} Plan</span>
              </div>
              <div className="mt-2 flex justify-between text-xs text-body border-t border-line/60 pt-2">
                <span>Total Capital Outlay:</span>
                <span className="font-bold text-ink tnum">{formatCurrency(currentResult.investedCapital)}</span>
              </div>
              <div className="mt-2 flex justify-between text-xs text-body border-t border-line/60 pt-2">
                <span>Projected Maturity Corpus:</span>
                <span className="font-extrabold text-brand tnum">{formatCurrency(currentResult.primaryValue)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            {/* Primary Action Button */}
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-center text-sm font-extrabold text-white shadow-xs transition hover:bg-brand-dark hover:shadow-md"
            >
              Start This Plan Now
              <ArrowRight className="size-4" />
            </Link>

            {/* WhatsApp Specialist Button */}
            <a
              href={shareWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-brand/30 bg-white py-2.5 text-xs font-bold text-brand shadow-2xs transition hover:bg-mint"
            >
              <Share2 className="size-3.5" />
              WhatsApp This Plan to Specialist
            </a>

            {/* Copy Plan Button */}
            <button
              type="button"
              onClick={handleCopyPlan}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-white/70 py-2 text-xs font-semibold text-body transition hover:bg-white hover:text-ink active:scale-95"
            >
              {copiedPlan ? <Check className="size-3 text-brand" /> : <Copy className="size-3" />}
              {copiedPlan ? "Plan Summary Copied!" : "Copy Summary Text"}
            </button>

            <p className="mt-1 text-center text-[10.5px] font-medium text-body/75">
              Zero separate client fees · AMFI ARN-341412 · 100% paperless KYC
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================================
          TIER 4: Year-by-Year Growth Schedule (Full Width Expandable Table)
          ====================================================================== */}
      <div className="flex flex-col gap-2.5 rounded-[24px] sm:rounded-[28px] border border-line bg-white p-4 sm:p-5 shadow-card">
        <button
          type="button"
          onClick={() => setShowGrowthTable(!showGrowthTable)}
          className="flex w-full items-center justify-between text-left transition-colors hover:text-brand"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-soft text-body">
              <Table className="size-4" />
            </span>
            <div>
              <h4 className="text-sm font-bold text-ink">
                {showGrowthTable ? "Hide Annual Amortization Table" : "View Annual Year-by-Year Growth Schedule"}
              </h4>
              <p className="text-xs text-body">
                Complete breakdown of Capital vs Compounding by Year
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl border border-line bg-soft px-3 py-1.5 text-xs font-bold text-ink">
            <span>{showGrowthTable ? "Collapse" : "Expand Table"}</span>
            {showGrowthTable ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </div>
        </button>

        {showGrowthTable && (
          <div className="mt-3 max-h-80 overflow-auto rounded-2xl border border-line">
            <table className="w-full min-w-[480px] text-left text-xs">
              <thead className="sticky top-0 bg-soft text-[11px] font-extrabold uppercase tracking-wider text-body">
                <tr>
                  <th className="px-3.5 py-2.5">Year</th>
                  <th className="px-3.5 py-2.5">Invested Capital</th>
                  <th className="px-3.5 py-2.5">Wealth Gain</th>
                  <th className="px-3.5 py-2.5">Total Value</th>
                  {showInflation && <th className="px-3.5 py-2.5 text-amber-800">Real Power (6%)</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {currentResult.trajectory.map((row) => (
                  <tr key={row.year} className="transition-colors hover:bg-soft/40">
                    <td className="px-3.5 py-2 font-bold text-ink">
                      {row.year === 0 ? "Start" : `Year ${row.year}`}
                    </td>
                    <td className="px-3.5 py-2 text-body tnum">
                      {formatCurrencyExact(row.investedCapital)}
                    </td>
                    <td className="px-3.5 py-2 font-bold text-brand tnum">
                      +{formatCurrencyExact(row.wealthGain)}
                    </td>
                    <td className="px-3.5 py-2 font-extrabold text-ink tnum">
                      {formatCurrencyExact(row.totalValue)}
                    </td>
                    {showInflation && (
                      <td className="px-3.5 py-2 font-bold text-amber-800 tnum">
                        {row.realPurchasingPower !== undefined ? formatCurrencyExact(row.realPurchasingPower) : "-"}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ======================================================================
          3. Mandatory Statutory Regulatory Compliance Disclaimer (PART 4)
          ====================================================================== */}
      <div className="rounded-2xl border border-line/80 bg-white p-4 shadow-xs sm:p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="size-5 shrink-0 text-brand mt-0.5" />
          <div className="flex flex-col gap-1 text-xs leading-relaxed text-body">
            <span className="font-bold uppercase tracking-wider text-ink">
              Statutory Regulatory Compliance Notice
            </span>
            <p>
              Disclaimer: Calculator results are for illustration only and assume a constant rate of return. Mutual Fund investments are subject to market risks, read all scheme related documents carefully. Past performance may or may not be sustained in the future and is not a guarantee of future returns. Tax benefits are subject to prevailing tax laws.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
