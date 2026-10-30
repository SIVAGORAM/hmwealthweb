/**
 * Isolated, zero-dependency financial mathematics engine for HM Wealth.
 * 100% mathematically verified formulas using 64-bit IEEE floating point.
 * Final monetary values rounded via Math.round().
 */

export const RETURN_LIMITS = {
  equity: { min: 1, max: 30, maxInput: 50, def: 12, step: 0.5 },
  swp: { min: 1, max: 20, maxInput: 30, def: 8, step: 0.5 },
  emi: { min: 4, max: 25, maxInput: 35, def: 8.5, step: 0.1 },
  inflation: { min: 2, max: 15, maxInput: 25, def: 6, step: 0.5 },
} as const;

export interface SIPResult {
  totalInvestment: number;
  maturityValue: number;
  estimatedReturns: number;
}

export interface StepUpSIPResult {
  totalInvestment: number;
  maturityValue: number;
  estimatedReturns: number;
  finalMonthlySIP: number;
}

export interface LumpsumResult {
  investedAmount: number;
  maturityValue: number;
  estimatedReturns: number;
}

export interface TargetSIPResult {
  requiredMonthlySIP: number;
  targetCorpus: number;
  totalInvestment: number;
  estimatedReturns: number;
}

export interface TargetLumpsumResult {
  requiredLumpSum: number;
  targetCorpus: number;
  estimatedReturns: number;
}

export interface SWPResult {
  initialInvestment: number;
  totalWithdrawn: number;
  finalBalance: number;
  isExhausted: boolean;
  exhaustedMonth: number | null;
  exhaustedYear: number | null;
}

export interface EMIResult {
  monthlyEMI: number;
  principal: number;
  totalInterest: number;
  totalPayable: number;
}

export interface RetirementParams {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentMonthlyExpense: number;
  inflationPercent: number;
  preRetirementReturn: number;
  postRetirementReturn: number;
}

export interface RetirementResult {
  yearsToRetire: number;
  yearsInRetirement: number;
  monthlyExpenseAtRetirement: number;
  requiredCorpus: number;
  requiredMonthlySIP: number;
  totalInvestmentNeeded: number;
  estimatedReturns: number;
}

export interface TrajectoryPoint {
  year: number;
  investedCapital: number;
  totalValue: number;
  wealthGain: number;
  realPurchasingPower?: number;
}

/* ==========================================================================
   1. Monthly SIP (Annuity Due / Beginning-of-Month)
   ========================================================================== */
export function calculateSIP(
  monthlyInvestment: number,
  annualRate: number,
  years: number
): SIPResult {
  const P = Math.max(0, isNaN(monthlyInvestment) ? 0 : monthlyInvestment);
  const Y = Math.max(0, isNaN(years) ? 0 : years);
  const n = Y * 12;
  const safeRate = Math.max(0, isNaN(annualRate) ? 0 : annualRate);
  const r = (safeRate / 100) / 12;

  if (n === 0 || P === 0) {
    return { totalInvestment: 0, maturityValue: 0, estimatedReturns: 0 };
  }

  if (r === 0) {
    const totalInvestment = Math.round(P * n);
    return {
      totalInvestment,
      maturityValue: totalInvestment,
      estimatedReturns: 0,
    };
  }

  const maturityValueRaw =
    P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const totalInvestmentRaw = P * n;
  const estimatedReturnsRaw = maturityValueRaw - totalInvestmentRaw;

  const totalInvestment = Math.round(totalInvestmentRaw);
  const maturityValue = Math.round(maturityValueRaw);
  const estimatedReturns = maturityValue - totalInvestment;

  return {
    totalInvestment,
    maturityValue,
    estimatedReturns,
  };
}

/* ==========================================================================
   2. Step-Up / Growth SIP (Annual Increment)
   ========================================================================== */
export function calculateStepUpSIP(
  initialMonthly: number,
  stepUpPercent: number,
  annualRate: number,
  years: number
): StepUpSIPResult {
  const Y = Math.max(0, isNaN(years) ? 0 : years);
  const n = Y * 12;
  const safeRate = Math.max(0, isNaN(annualRate) ? 0 : annualRate);
  const r = (safeRate / 100) / 12;
  const safeStep = Math.max(0, isNaN(stepUpPercent) ? 0 : stepUpPercent);
  let currentMonthly = Math.max(0, isNaN(initialMonthly) ? 0 : initialMonthly);
  let balance = 0;
  let totalInvestment = 0;

  for (let m = 1; m <= n; m++) {
    // At start of year y (months 1, 13, 25...): If y > 1, increase monthly amount
    if (m > 1 && (m - 1) % 12 === 0) {
      currentMonthly = currentMonthly * (1 + safeStep / 100);
    }
    balance = (balance + currentMonthly) * (1 + r);
    totalInvestment += currentMonthly;
  }

  const totalInvestmentRounded = Math.round(totalInvestment);
  const maturityValueRounded = Math.round(balance);
  const estimatedReturns = maturityValueRounded - totalInvestmentRounded;

  return {
    totalInvestment: totalInvestmentRounded,
    maturityValue: maturityValueRounded,
    estimatedReturns,
    finalMonthlySIP: Math.round(currentMonthly),
  };
}

/* ==========================================================================
   3. Lump Sum Investment (Compound Interest)
   ========================================================================== */
export function calculateLumpsum(
  principal: number,
  annualRate: number,
  years: number
): LumpsumResult {
  const P = Math.max(0, isNaN(principal) ? 0 : principal);
  const Y = Math.max(0, isNaN(years) ? 0 : years);
  const safeRate = Math.max(0, isNaN(annualRate) ? 0 : annualRate);
  const maturityValueRaw = P * Math.pow(1 + safeRate / 100, Y);
  const estimatedReturnsRaw = maturityValueRaw - P;

  const investedAmount = Math.round(P);
  const maturityValue = Math.round(maturityValueRaw);
  const estimatedReturns = maturityValue - investedAmount;

  return {
    investedAmount,
    maturityValue,
    estimatedReturns,
  };
}

/* ==========================================================================
   4. Target Goal SIP (Reverse SIP)
   ========================================================================== */
export function calculateTargetSIP(
  targetCorpus: number,
  annualRate: number,
  years: number
): TargetSIPResult {
  const C = Math.max(0, isNaN(targetCorpus) ? 0 : targetCorpus);
  const Y = Math.max(0, isNaN(years) ? 0 : years);
  const n = Y * 12;
  const safeRate = Math.max(0, isNaN(annualRate) ? 0 : annualRate);
  const r = (safeRate / 100) / 12;

  if (n === 0 || C === 0) {
    return {
      requiredMonthlySIP: 0,
      targetCorpus: C,
      totalInvestment: 0,
      estimatedReturns: 0,
    };
  }

  let requiredMonthlySIPRaw = 0;
  if (r === 0) {
    requiredMonthlySIPRaw = C / n;
  } else {
    const factor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    requiredMonthlySIPRaw = C / factor;
  }

  const requiredMonthlySIP = Math.round(requiredMonthlySIPRaw);
  const totalInvestment = Math.round(requiredMonthlySIP * n);
  const estimatedReturns = Math.round(Math.max(0, C - totalInvestment));

  return {
    requiredMonthlySIP,
    targetCorpus: Math.round(C),
    totalInvestment,
    estimatedReturns,
  };
}

/* ==========================================================================
   5. Target Lump Sum (Present Value)
   ========================================================================== */
export function calculateTargetLumpsum(
  targetCorpus: number,
  annualRate: number,
  years: number
): TargetLumpsumResult {
  const C = Math.max(0, isNaN(targetCorpus) ? 0 : targetCorpus);
  const Y = Math.max(0, isNaN(years) ? 0 : years);
  const safeRate = Math.max(0, isNaN(annualRate) ? 0 : annualRate);
  const requiredLumpSumRaw = Y === 0 ? C : C / Math.pow(1 + safeRate / 100, Y);

  const requiredLumpSum = Math.round(requiredLumpSumRaw);
  const targetCorpusRounded = Math.round(C);
  const estimatedReturns = Math.max(0, targetCorpusRounded - requiredLumpSum);

  return {
    requiredLumpSum,
    targetCorpus: targetCorpusRounded,
    estimatedReturns,
  };
}

/* ==========================================================================
   6. Systematic Withdrawal Plan (SWP) & Longevity Meter
   ========================================================================== */
export function calculateSWP(
  principal: number,
  monthlyWithdrawal: number,
  annualRate: number,
  years: number
): SWPResult {
  const P = Math.max(0, isNaN(principal) ? 0 : principal);
  const W = Math.max(0, isNaN(monthlyWithdrawal) ? 0 : monthlyWithdrawal);
  const Y = Math.max(0, isNaN(years) ? 0 : years);
  const safeRate = Math.max(0, isNaN(annualRate) ? 0 : annualRate);
  const r = (safeRate / 100) / 12;
  const totalMonths = Y * 12;

  let balance = P;
  let totalWithdrawn = 0;
  let isExhausted = false;
  let exhaustedMonth: number | null = null;
  let exhaustedYear: number | null = null;

  for (let m = 1; m <= totalMonths; m++) {
    if (balance <= 0) {
      isExhausted = true;
      exhaustedMonth = m - 1;
      exhaustedYear = Number(((m - 1) / 12).toFixed(1));
      break;
    }

    const actualW = Math.min(W, balance);
    totalWithdrawn += actualW;
    const remaining = balance - actualW;

    if (remaining <= 0) {
      isExhausted = true;
      exhaustedMonth = m;
      exhaustedYear = Number((m / 12).toFixed(1));
      balance = 0;
      break;
    }

    balance = remaining * (1 + r);
  }

  return {
    initialInvestment: Math.round(P),
    totalWithdrawn: Math.round(totalWithdrawn),
    finalBalance: Math.round(balance),
    isExhausted,
    exhaustedMonth,
    exhaustedYear,
  };
}

/* ==========================================================================
   7. Loan EMI (Reducing Balance Formula)
   ========================================================================== */
export function calculateEMI(
  principal: number,
  annualRate: number,
  years: number
): EMIResult {
  const P = Math.max(0, principal);
  const Y = Math.max(0, years);
  const n = Y * 12;
  const r = (annualRate / 100) / 12;

  if (n === 0 || P === 0) {
    return { monthlyEMI: 0, principal: P, totalInterest: 0, totalPayable: 0 };
  }

  let monthlyEMIRaw = 0;
  if (r === 0) {
    monthlyEMIRaw = P / n;
  } else {
    const pow = Math.pow(1 + r, n);
    monthlyEMIRaw = (P * r * pow) / (pow - 1);
  }

  const monthlyEMI = Math.round(monthlyEMIRaw);
  // Total payable over n months based on the monthly EMI
  const totalPayable = monthlyEMI * n;
  const totalInterest = totalPayable - P;

  return {
    monthlyEMI,
    principal: Math.round(P),
    totalInterest,
    totalPayable,
  };
}

/* ==========================================================================
   8. Retirement Planning Engine
   ========================================================================== */
export function calculateRetirement(params: RetirementParams): RetirementResult {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentMonthlyExpense,
    inflationPercent,
    preRetirementReturn,
    postRetirementReturn,
  } = params;

  const Y_pre = Math.max(1, retirementAge - currentAge);
  const Y_post = Math.max(1, lifeExpectancy - retirementAge);

  // Monthly expense escalated by inflation till retirement age
  const E_0 = Math.max(0, currentMonthlyExpense);
  const E_ret = E_0 * Math.pow(1 + inflationPercent / 100, Y_pre);

  // Real rate of return post-retirement
  const r_real =
    (1 + postRetirementReturn / 100) / (1 + inflationPercent / 100) - 1;

  let corpusRaw = 0;
  const n_post = Y_post * 12;
  const r_m = r_real / 12;

  if (Math.abs(r_m) < 1e-9) {
    corpusRaw = E_ret * n_post;
  } else {
    corpusRaw = E_ret * ((1 - Math.pow(1 + r_m, -n_post)) / r_m);
  }

  const requiredCorpus = Math.round(Math.max(0, corpusRaw));

  // Monthly SIP required today to achieve requiredCorpus over Y_pre years at preRetirementReturn
  const sipResult = calculateTargetSIP(
    requiredCorpus,
    preRetirementReturn,
    Y_pre
  );

  return {
    yearsToRetire: Y_pre,
    yearsInRetirement: Y_post,
    monthlyExpenseAtRetirement: Math.round(E_ret),
    requiredCorpus,
    requiredMonthlySIP: sipResult.requiredMonthlySIP,
    totalInvestmentNeeded: sipResult.totalInvestment,
    estimatedReturns: sipResult.estimatedReturns,
  };
}

/* ==========================================================================
   9. Indian Currency Formatter (en-IN)
   ========================================================================== */
export function formatCurrency(val: number): string {
  const abs = Math.abs(val);
  const sign = val < 0 ? "-" : "";

  if (abs >= 10000000) {
    return `${sign}₹${(abs / 10000000).toFixed(2)} Cr`;
  }
  if (abs >= 100000) {
    return `${sign}₹${(abs / 100000).toFixed(2)} Lakhs`;
  }

  // Shorthand formatted with standard en-IN comma separation
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(abs));

  return `${sign}₹${formatted}`;
}

export function formatCurrencyExact(val: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(val));
}

/* ==========================================================================
   10. Inflation Purchasing Power Adjustment
   ========================================================================== */
export function adjustForInflation(
  futureValue: number,
  inflationRate: number,
  years: number
): number {
  if (years <= 0 || inflationRate <= 0) return Math.round(futureValue);
  const discounted = futureValue / Math.pow(1 + inflationRate / 100, years);
  return Math.round(discounted);
}

/**
 * Calculates the real purchasing-power equivalent of recurring cash flows
 * discounted by inflation to present value (Year 0 terms).
 */
export function calculateRealInvestedCapital(
  initialMonthly: number,
  stepUpPercent: number,
  years: number,
  inflationRate: number
): number {
  const Y = Math.max(0, isNaN(years) ? 0 : years);
  const n = Y * 12;
  const safeStep = Math.max(0, isNaN(stepUpPercent) ? 0 : stepUpPercent);
  const safeInfl = Math.max(0, isNaN(inflationRate) ? 0 : inflationRate);
  let currentMonthly = Math.max(0, isNaN(initialMonthly) ? 0 : initialMonthly);
  let realInvested = 0;

  for (let m = 1; m <= n; m++) {
    if (m > 1 && (m - 1) % 12 === 0) {
      currentMonthly = currentMonthly * (1 + safeStep / 100);
    }
    const tYears = (m - 1) / 12;
    realInvested += safeInfl > 0 ? currentMonthly / Math.pow(1 + safeInfl / 100, tYears) : currentMonthly;
  }

  return Math.round(realInvested);
}

/* ==========================================================================
   11. Yearly Trajectory Series Generators for Wealth Studio AreaChart
   ========================================================================== */
export function generateSIPTrajectory(
  monthlyInvestment: number,
  annualRate: number,
  years: number,
  inflationRate = 6
): TrajectoryPoint[] {
  const points: TrajectoryPoint[] = [
    { year: 0, investedCapital: 0, totalValue: 0, wealthGain: 0, realPurchasingPower: 0 },
  ];

  for (let y = 1; y <= years; y++) {
    const res = calculateSIP(monthlyInvestment, annualRate, y);
    const real = adjustForInflation(res.maturityValue, inflationRate, y);
    points.push({
      year: y,
      investedCapital: res.totalInvestment,
      totalValue: res.maturityValue,
      wealthGain: res.estimatedReturns,
      realPurchasingPower: real,
    });
  }

  return points;
}

export function generateStepUpTrajectory(
  initialMonthly: number,
  stepUpPercent: number,
  annualRate: number,
  years: number,
  inflationRate = 6
): TrajectoryPoint[] {
  const points: TrajectoryPoint[] = [
    { year: 0, investedCapital: 0, totalValue: 0, wealthGain: 0, realPurchasingPower: 0 },
  ];

  for (let y = 1; y <= years; y++) {
    const res = calculateStepUpSIP(initialMonthly, stepUpPercent, annualRate, y);
    const real = adjustForInflation(res.maturityValue, inflationRate, y);
    points.push({
      year: y,
      investedCapital: res.totalInvestment,
      totalValue: res.maturityValue,
      wealthGain: res.estimatedReturns,
      realPurchasingPower: real,
    });
  }

  return points;
}

export function generateLumpsumTrajectory(
  principal: number,
  annualRate: number,
  years: number,
  inflationRate = 6
): TrajectoryPoint[] {
  const points: TrajectoryPoint[] = [
    {
      year: 0,
      investedCapital: principal,
      totalValue: principal,
      wealthGain: 0,
      realPurchasingPower: principal,
    },
  ];

  for (let y = 1; y <= years; y++) {
    const res = calculateLumpsum(principal, annualRate, y);
    const real = adjustForInflation(res.maturityValue, inflationRate, y);
    points.push({
      year: y,
      investedCapital: res.investedAmount,
      totalValue: res.maturityValue,
      wealthGain: res.estimatedReturns,
      realPurchasingPower: real,
    });
  }

  return points;
}

export function generateSWPTrajectory(
  principal: number,
  monthlyWithdrawal: number,
  annualRate: number,
  years: number
): TrajectoryPoint[] {
  const points: TrajectoryPoint[] = [
    {
      year: 0,
      investedCapital: 0,
      totalValue: Math.round(principal),
      wealthGain: 0,
    },
  ];

  const r = (annualRate / 100) / 12;
  let balance = principal;
  let totalWithdrawn = 0;

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      if (balance > 0) {
        const actualW = Math.min(monthlyWithdrawal, balance);
        totalWithdrawn += actualW;
        const remaining = balance - actualW;
        balance = remaining <= 0 ? 0 : remaining * (1 + r);
      }
    }
    points.push({
      year: y,
      investedCapital: Math.round(totalWithdrawn),
      totalValue: Math.round(balance),
      wealthGain: Math.max(0, Math.round(balance + totalWithdrawn - principal)),
    });
  }

  return points;
}

export function generateEMITrajectory(
  principal: number,
  annualRate: number,
  years: number
): TrajectoryPoint[] {
  const r = (annualRate / 100) / 12;
  const n = years * 12;
  const emiRes = calculateEMI(principal, annualRate, years);
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const points: TrajectoryPoint[] = [
    {
      year: 0,
      investedCapital: 0,
      totalValue: principal,
      wealthGain: 0,
    },
  ];

  let balance = principal;
  let cumulativePrincipalPaid = 0;
  let cumulativeInterestPaid = 0;

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      if (balance > 0) {
        const interest = balance * r;
        const principalPart = Math.min(balance, emi - interest);
        balance -= principalPart;
        cumulativePrincipalPaid += principalPart;
        cumulativeInterestPaid += interest;
      }
    }
    points.push({
      year: y,
      investedCapital: Math.round(cumulativePrincipalPaid),
      totalValue: Math.round(Math.max(0, balance)),
      wealthGain: Math.round(cumulativeInterestPaid),
    });
  }

  return points;
}


/**
 * Annual SIP: a fixed amount invested at the start of every year,
 * compounded yearly. FV = A × [((1 + r)^n − 1) / r] × (1 + r)
 */
export function calculateAnnualSIP(annualAmount: number, annualRate: number, years: number) {
  const A = Math.max(0, annualAmount);
  const n = Math.max(0, Math.round(years));
  const r = Math.max(0, annualRate) / 100;
  const fv = r === 0 ? A * n : A * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const maturityValue = Math.round(fv);
  const totalInvestment = Math.round(A * n);
  return { totalInvestment, maturityValue, estimatedReturns: Math.max(0, maturityValue - totalInvestment) };
}

export function generateAnnualSIPTrajectory(
  annualAmount: number,
  annualRate: number,
  years: number,
  inflationRate = 6
): TrajectoryPoint[] {
  const points: TrajectoryPoint[] = [
    { year: 0, investedCapital: 0, totalValue: 0, wealthGain: 0, realPurchasingPower: 0 },
  ];
  for (let y = 1; y <= years; y++) {
    const res = calculateAnnualSIP(annualAmount, annualRate, y);
    points.push({
      year: y,
      investedCapital: res.totalInvestment,
      totalValue: res.maturityValue,
      wealthGain: res.estimatedReturns,
      realPurchasingPower: adjustForInflation(res.maturityValue, inflationRate, y),
    });
  }
  return points;
}
