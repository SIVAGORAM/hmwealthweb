"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  ShoppingBag,
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
  calculateAnnualSIP,
  generateAnnualSIPTrajectory,
} from "@/lib/finance-math";
import dynamic from "next/dynamic";
import { DualControl } from "./DualControl";
import { MilestoneRoadmap } from "./MilestoneRoadmap";

const WealthAreaChart = dynamic(
  () => import("./WealthAreaChart").then((mod) => mod.WealthAreaChart),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[320px] w-full items-center justify-center rounded-2xl bg-soft/60">
        <div className="flex items-center gap-2 text-sm text-body/60">
          <div className="size-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          Loading growth curve...
        </div>
      </div>
    ),
  }
);
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type CategoryId = "accumulation" | "milestones" | "cashflow";

type AccumulationCalc = "sip" | "stepup" | "lumpsum" | "annual";
type MilestoneCalc = "target" | "retirement" | "education";
type CashflowCalc = "swp" | "targetLump" | "emi";

type CalcKey = "sip" | "stepup" | "lumpsum" | "annual" | "target" | "targetLump" | "retirement" | "education" | "swp" | "emi";
type CalcGroup = "invest" | "goals" | "income";

const CALC_FILTERS: { id: "all" | CalcGroup; label: string }[] = [
  { id: "all", label: "All" },
  { id: "invest", label: "Investing" },
  { id: "goals", label: "Goal planning" },
  { id: "income", label: "Income & loans" },
];

const CALC_TABS: { key: CalcKey; label: string; group: CalcGroup; icon: typeof CalendarClock }[] = [
  { key: "sip", label: "SIP", group: "invest", icon: CalendarClock },
  { key: "stepup", label: "Step-Up SIP", group: "invest", icon: TrendingUp },
  { key: "lumpsum", label: "Lump Sum", group: "invest", icon: Wallet },
  { key: "annual", label: "Annual SIP", group: "invest", icon: PiggyBank },
  { key: "target", label: "Target Goal SIP", group: "goals", icon: Target },
  { key: "targetLump", label: "Target Lump Sum", group: "goals", icon: Layers },
  { key: "retirement", label: "Retirement", group: "goals", icon: Sunset },
  { key: "education", label: "Child Education", group: "goals", icon: GraduationCap },
  { key: "swp", label: "SWP", group: "income", icon: Repeat },
  { key: "emi", label: "Loan EMI", group: "income", icon: Home },
];

export function WealthStudio() {
  // Category State
  // Deep links like /calculators?c=retirement open the matching calculator.
  const param = useSearchParams().get("c") ?? "";
  const key = param === "goal" ? "target" : param;
  const accumKeys: AccumulationCalc[] = ["sip", "stepup", "lumpsum", "annual"];
  const milestoneKeys: MilestoneCalc[] = ["target", "retirement", "education"];
  const cashflowKeys: CashflowCalc[] = ["swp", "targetLump", "emi"];
  const isAccum = (accumKeys as string[]).includes(key);
  const isMilestone = (milestoneKeys as string[]).includes(key);
  const isCashflow = (cashflowKeys as string[]).includes(key);

  const [activeCategory, setActiveCategory] = useState<CategoryId>(
    isMilestone ? "milestones" : isCashflow ? "cashflow" : "accumulation"
  );

  // Specific Calculator State inside each category
  const [activeAccum, setActiveAccum] = useState<AccumulationCalc>(isAccum ? (key as AccumulationCalc) : "sip");
  const [activeMilestone, setActiveMilestone] = useState<MilestoneCalc>(isMilestone ? (key as MilestoneCalc) : "target");
  const [activeCashflow, setActiveCashflow] = useState<CashflowCalc>(isCashflow ? (key as CashflowCalc) : "swp");

  // Category filter for the calculator picker
  const [calcFilter, setCalcFilter] = useState<"all" | CalcGroup>("all");
  const pickCalc = (k: CalcKey) => {
    if ((["sip", "stepup", "lumpsum", "annual"] as string[]).includes(k)) { setActiveCategory("accumulation"); setActiveAccum(k as AccumulationCalc); }
    else if ((["target", "retirement", "education"] as string[]).includes(k)) { setActiveCategory("milestones"); setActiveMilestone(k as MilestoneCalc); }
    else { setActiveCategory("cashflow"); setActiveCashflow(k as CashflowCalc); }
  };

  // Inflation Adjustment State (Realtime Purchasing Power)
  const [showInflation, setShowInflation] = useState<boolean>(true);
  const [inflationRate, setInflationRate] = useState<number>(6); // 6% standard long-term India CPI inflation

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

  // Keep linked inputs valid: retirement age > current age, life expectancy >= retirement age + 5,
  // college age > child's age. Runs whenever one of them changes.
  useEffect(() => {
    if (retirementAge <= currentAge) setRetirementAge(Math.min(75, currentAge + 1));
  }, [currentAge, retirementAge]);
  useEffect(() => {
    if (lifeExpectancy < retirementAge + 5) setLifeExpectancy(Math.min(100, retirementAge + 5));
  }, [retirementAge, lifeExpectancy]);
  useEffect(() => {
    if (collegeAge <= childCurrentAge) setCollegeAge(Math.min(25, childCurrentAge + 1));
  }, [childCurrentAge, collegeAge]);

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
          headline: "Estimated Value",
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
          headline: "Estimated Value with Step-Up",
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
          headline: "Estimated Value",
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
        // Annual SIP: invested at the start of each year, compounded yearly
        const res = calculateAnnualSIP(annualAmount, annualRate, annualYears);
        const trajectory = generateAnnualSIPTrajectory(annualAmount, annualRate, annualYears, inflationRate);
        const realValue = adjustForInflation(res.maturityValue, inflationRate, annualYears);
        return {
          headline: "Estimated Value",
          primaryValue: res.maturityValue,
          primaryLabel: `Value from ${formatCurrency(annualAmount)}/year over ${annualYears} Years`,
          investedCapital: res.totalInvestment,
          wealthGain: res.estimatedReturns,
          realValue,
          trajectory,
          years: annualYears,
          multiplier: res.totalInvestment > 0 ? (res.maturityValue / res.totalInvestment).toFixed(2) : "1.0",
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
          headline: "Education Fund Needed",
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
    const text = `HM Wealth Investment & SIP Summary:
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
      {/* Calculator picker with category filters */}
      <div className="flex flex-col gap-3 rounded-[24px] border border-line bg-white p-3 shadow-card sm:p-4">
        <div className="-mx-3 flex flex-nowrap items-center gap-1.5 overflow-x-auto px-3 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
          {CALC_FILTERS.map((f) => {
            const count = f.id === "all" ? CALC_TABS.length : CALC_TABS.filter((t) => t.group === f.id).length;
            const on = calcFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setCalcFilter(f.id)}
                aria-pressed={on}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-bold transition-colors",
                  on ? "bg-ink text-white" : "bg-soft text-body hover:text-ink"
                )}
              >
                {f.label}
                <span className={cn("rounded-full px-1.5 text-[11px] tnum", on ? "bg-white/20 text-white" : "bg-white text-body")}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="-mx-3 flex flex-nowrap gap-2 overflow-x-auto px-3 pb-0.5 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {CALC_TABS.filter((t) => calcFilter === "all" || t.group === calcFilter).map(({ key, label, icon: Icon }) => {
            const on = activeCalcKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => pickCalc(key)}
                aria-pressed={on}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-left text-[13.5px] font-bold transition-all",
                  on
                    ? "border-brand bg-mint text-brand shadow-[inset_0_0_0_1px_var(--color-brand)]"
                    : "border-line bg-white text-body hover:border-brand/40 hover:text-ink"
                )}
              >
                <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg", on ? "bg-brand text-white" : "bg-soft text-body")}>
                  <Icon className="size-3.5" />
                </span>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================================
          2. Master Wealth Studio Grid (Controls on Left, Visuals on Right)
          ====================================================================== */}
      <div className="grid items-start gap-5 lg:grid-cols-12">
        {/* Left Column: Synchronized Input Controls */}
        <div className="flex flex-col gap-5 rounded-[24px] border border-line bg-white p-5 shadow-card sm:p-6 lg:sticky lg:top-24 lg:col-span-5">
          <div>
            <h2 className="text-2xl font-extrabold text-ink">
              {activeCalcKey === "sip" && "Monthly SIP Calculator"}
              {activeCalcKey === "stepup" && "Step-Up SIP Calculator"}
              {activeCalcKey === "lumpsum" && "Lump Sum Calculator"}
              {activeCalcKey === "annual" && "Annual SIP Calculator"}
              {activeCalcKey === "target" && "Target Goal SIP Calculator"}
              {activeCalcKey === "retirement" && "Retirement Calculator"}
              {activeCalcKey === "education" && "Child Education Calculator"}
              {activeCalcKey === "swp" && "SWP Calculator"}
              {activeCalcKey === "targetLump" && "Target Lump Sum Calculator"}
              {activeCalcKey === "emi" && "Loan EMI Calculator"}
            </h2>
            <p className="mt-1 text-[14px] leading-relaxed text-body">
              {activeCalcKey === "sip" && "See how a fixed monthly investment may grow over time."}
              {activeCalcKey === "stepup" && "Increase your SIP a little every year as your income grows."}
              {activeCalcKey === "lumpsum" && "See how a one-time investment may grow over time."}
              {activeCalcKey === "annual" && "See how a fixed yearly investment, like an annual bonus, may grow over time."}
              {activeCalcKey === "target" && "Find the monthly SIP you may need to reach a goal amount."}
              {activeCalcKey === "retirement" && "Estimate the retirement corpus you may need and the monthly SIP to build it."}
              {activeCalcKey === "education" && "Estimate the future cost of your child’s education and the monthly SIP to save for it."}
              {activeCalcKey === "swp" && "See how long a fixed monthly withdrawal may last from your investment."}
              {activeCalcKey === "targetLump" && "Find the one-time amount you may need to invest today to reach a goal."}
              {activeCalcKey === "emi" && "Calculate your monthly loan EMI, total interest and total amount payable."}
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
                  helperText="Start with what is comfortable"
                />

                <DualControl
                  id="sip-rate"
                  label="Expected Annual Return"
                  value={sipRate}
                  min={1}
                  max={13}
                  step={0.5}
                  unit="percent"
                  quickChips={[
                    { label: "10%", addValue: 10 - sipRate },
                    { label: "12%", addValue: 12 - sipRate },
                    { label: "13%", addValue: 13 - sipRate },
                  ]}
                  onChange={setSipRate}
                  helperText="Assumed rate, capped at 13% for illustration"
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
                  helperText="Longer periods show more compounding"
                />

                {/* Inflation Adjustment Control Section */}
                <div className="rounded-2xl border border-line bg-soft/60 p-4 transition-all">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700">
                        <ShoppingBag className="size-4" />
                      </span>
                      <div>
                        <span className="text-[13px] font-bold text-ink">Adjust for Inflation</span>
                        <p className="text-[11px] text-body">Estimate purchasing power in today&apos;s money</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={showInflation}
                      aria-label="Toggle inflation adjustment"
                      onClick={() => setShowInflation((v) => !v)}
                      className={cn(
                        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                        showInflation ? "bg-brand" : "bg-slate-300"
                      )}
                    >
                      <span
                        className={cn(
                          "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
                          showInflation ? "translate-x-5" : "translate-x-0"
                        )}
                      />
                    </button>
                  </div>

                  {showInflation && (
                    <div className="mt-3.5 border-t border-line/60 pt-3">
                      <DualControl
                        id="sip-inflation-rate"
                        label="Expected Annual Inflation"
                        value={inflationRate}
                        min={3}
                        max={10}
                        step={0.5}
                        unit="percent"
                        quickChips={[
                          { label: "5%", addValue: 5 - inflationRate },
                          { label: "6% (Avg)", addValue: 6 - inflationRate },
                          { label: "7%", addValue: 7 - inflationRate },
                        ]}
                        onChange={setInflationRate}
                        helperText="Historical long-term Indian CPI inflation averages ~6%"
                      />
                    </div>
                  )}
                </div>
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
                  max={13}
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
                  max={13}
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
                  max={13}
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
                  max={13}
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
                    max={13}
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
                    max={13}
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
                  helperText="Choose a withdrawal you are comfortable with"
                />

                <DualControl
                  id="swp-rate"
                  label="Expected Portfolio Growth"
                  value={swpRate}
                  min={1}
                  max={13}
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
                  max={13}
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

        </div>

        {/* Right Column: Wealth Studio Results & Visuals */}
        <div className="flex flex-col gap-5 lg:col-span-7">
          {/* A. Result card (compact) */}
          <div className="rounded-[24px] border border-line bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-brand">{currentResult.headline}</span>
              <span className="rounded-full bg-soft px-2.5 py-0.5 text-[11px] font-semibold text-body">Illustration only</span>
            </div>
            <p className="mt-2 text-[32px] font-extrabold leading-none tracking-[-0.03em] text-ink tnum sm:text-[38px]">
              {formatCurrency(currentResult.primaryValue)}
            </p>
            <p className="mt-1.5 text-[13.5px] text-body">{currentResult.primaryLabel}</p>

            {(() => {
              const r = currentResult as typeof currentResult & Record<string, unknown>;
              const n = (v: unknown) => formatCurrency(Number(v) || 0);
              const stats: { l: string; v: string; tone?: "gain" }[] =
                r.isEMI ? [
                  { l: "Loan amount", v: n(r.investedCapital) },
                  { l: "Total interest", v: n(r.totalInterest) },
                  { l: "Total payable", v: n(r.totalPayable) },
                ] : r.isSWP ? [
                  { l: "Amount invested", v: n(r.investedCapital) },
                  { l: "Total withdrawn", v: n(r.totalWithdrawn) },
                  { l: "Money lasts", v: r.isExhausted ? `${Math.floor(Number(r.exhaustedMonth ?? 0) / 12)}y ${Number(r.exhaustedMonth ?? 0) % 12}m` : "Full period" },
                ] : r.isRetirement ? [
                  { l: "Monthly SIP needed", v: n(r.requiredMonthlySIP) },
                  { l: "Monthly expense then", v: n(r.monthlyExpenseAtRetirement) },
                  { l: "Total investment", v: n(r.investedCapital) },
                ] : r.isEducation ? [
                  { l: "Monthly SIP needed", v: n(r.requiredMonthlySIP) },
                  { l: "Cost today", v: n(r.currentCost) },
                  { l: "Total investment", v: n(r.investedCapital) },
                ] : r.isMonthlyTarget || r.isTargetLump ? [
                  { l: "Goal amount", v: n(r.targetCorpus) },
                  { l: "Total investment", v: n(r.investedCapital) },
                  { l: "Estimated gains", v: `+${n(r.wealthGain)}`, tone: "gain" },
                ] : [
                  { l: "Amount invested", v: n(r.investedCapital) },
                  { l: "Estimated gains", v: `+${n(r.wealthGain)}`, tone: "gain" },
                  ...(showInflation && typeof r.realValue === "number" ? [{ l: `Inflation-adjusted (${inflationRate}%)`, v: n(r.realValue) }] : []),
                  ...(r.finalMonthly ? [{ l: "Final monthly SIP", v: n(r.finalMonthly) }] : []),
                ];
              return (
                <dl className={cn("mt-5 grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line", stats.length === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2")}>
                  {stats.map((st, idx) => (
                    <div key={st.l} className={cn("min-w-0 bg-soft/70 px-3.5 py-3", stats.length === 3 && idx === 2 && "col-span-2 sm:col-span-1")}>
                      <dt className="truncate text-[11.5px] font-medium text-body">{st.l}</dt>
                      <dd className={cn("mt-0.5 truncate text-[15.5px] font-extrabold tnum", st.tone === "gain" ? "text-brand" : "text-ink")}>{st.v}</dd>
                    </div>
                  ))}
                </dl>
              );
            })()}

            {/* Dedicated Inflation-Adjusted Corpus Section */}
            {showInflation && typeof currentResult.realValue === "number" && !currentResult.isEMI && !currentResult.isSWP && (
              <div className="mt-4 rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 p-4 shadow-2xs">
                <div className="flex items-center justify-between gap-2 border-b border-amber-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700">
                      <ShoppingBag className="size-3.5" />
                    </span>
                    <span className="text-[11.5px] font-extrabold uppercase tracking-wider text-amber-950">
                      Inflation-Adjusted Corpus
                    </span>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10.5px] font-bold text-amber-800">
                    @{inflationRate}% p.a.
                  </span>
                </div>

                <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[26px] sm:text-[30px] font-black tracking-tight text-amber-950 tnum">
                    {formatCurrency(currentResult.realValue)}
                  </span>
                  <span className="text-xs font-semibold text-amber-800/90">
                    today&apos;s purchasing power
                  </span>
                </div>

                <p className="mt-1 text-[12px] leading-relaxed text-amber-900/80">
                  Due to {inflationRate}% annual inflation, your projected {formatCurrency(currentResult.primaryValue)} after {currentResult.years} years will have the purchasing power of <strong>{formatCurrency(currentResult.realValue)}</strong> in today&apos;s money.
                  {currentResult.realValue > currentResult.investedCapital ? (
                    <span className="text-emerald-700 font-semibold">
                      {" "}Your investment still beats inflation by {formatCurrency(currentResult.realValue - currentResult.investedCapital)} in real wealth creation!
                    </span>
                  ) : null}
                </p>
              </div>
            )}
          </div>

          {/* B. Distinct Dual Gradient Growth Chart */}
          <div className="flex flex-col gap-3 rounded-[24px] border border-line bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h3 className="text-base font-extrabold text-ink">
                  Growth over {currentResult.years} years
                </h3>
              </div>
            </div>

            <WealthAreaChart
              data={currentResult.trajectory}
              showInflation={showInflation}
              capitalLabel={currentResult.isEMI ? "Principal Repaid" : "Total Capital Invested"}
              wealthLabel={currentResult.isEMI ? "Remaining Loan Balance" : "Estimated Value"}
              height={250}
            />
          </div>
        </div>
      </div>

      {/* ======================================================================
          3. Mandatory Statutory Regulatory Compliance Disclaimer
          ====================================================================== */}
      <div className="rounded-2xl border border-line/80 bg-white p-4 shadow-xs sm:p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="size-5 shrink-0 text-brand mt-0.5" />
          <div className="flex flex-col gap-1 text-xs leading-relaxed font-medium text-slate-700">
            <span className="font-bold uppercase tracking-wider text-ink">
              Statutory Assumptions &amp; Disclosures
            </span>
            <p>
              Calculator illustrations assume a constant rate of return and are for educational illustration only. They do not account for market fluctuations, scheme Total Expense Ratios (TER), exit loads, or prevailing income tax rates, and do not represent a guarantee of future returns. Mutual Fund investments are subject to market risks; read all scheme related documents carefully. Past performance may or may not be sustained in the future. HM Wealth is an AMFI-registered Mutual Fund Distributor (ARN-341412) and does not provide investment advisory services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
